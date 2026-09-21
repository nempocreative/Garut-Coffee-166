import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon } from '@/components/BrandIcon';
import { ProgramCard, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/quality-checks';
const processes = ['Natural', 'Washed', 'Honey'] as const;
type CoffeeProcess = (typeof processes)[number];
type CheckResult = 'Memenuhi standar' | 'Perlu perbaikan';

type QualityCheck = {
  id: string;
  lotName: string;
  moisture: string;
  defects: string;
  cupping: string;
  process: CoffeeProcess;
  photoUri?: string;
  result: CheckResult;
  createdAt: string;
};

function getResult(moisture: string, defects: string, cupping: string): CheckResult {
  const moistureValue = Number.parseFloat(moisture.replace(',', '.'));
  const defectsValue = Number.parseInt(defects, 10);
  const cuppingValue = cupping ? Number.parseFloat(cupping.replace(',', '.')) : 80;
  return moistureValue >= 10 && moistureValue <= 12 && defectsValue >= 0 && defectsValue <= 5 && cuppingValue >= 80
    ? 'Memenuhi standar'
    : 'Perlu perbaikan';
}

export default function QualityCheckScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const [lotName, setLotName] = useState('');
  const [moisture, setMoisture] = useState('');
  const [defects, setDefects] = useState('');
  const [cupping, setCupping] = useState('');
  const [process, setProcess] = useState<CoffeeProcess>('Natural');
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [checks, setChecks] = useState<QualityCheck[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        setChecks(JSON.parse(value) as QualityCheck[]);
      } catch {
        setFeedback('Riwayat pemeriksaan belum dapat dibaca.');
      }
    }).catch(() => setFeedback('Riwayat pemeriksaan belum dapat dimuat.'));
  }, []);

  const currentPreview = useMemo(() => {
    const moistureValue = Number.parseFloat(moisture.replace(',', '.'));
    const defectsValue = Number.parseInt(defects, 10);
    if (!moisture || !defects || !Number.isFinite(moistureValue) || !Number.isFinite(defectsValue)) return null;
    return getResult(moisture, defects, cupping);
  }, [cupping, defects, moisture]);

  const choosePhoto = async (source: 'camera' | 'library') => {
    const result = source === 'camera'
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.7 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    if (!result.canceled && result.assets[0]?.uri) setPhotoUri(result.assets[0].uri);
  };

  const saveCheck = async () => {
    const moistureValue = Number.parseFloat(moisture.replace(',', '.'));
    const defectsValue = Number.parseInt(defects, 10);
    if (!lotName.trim() || !moisture || !defects || !Number.isFinite(moistureValue) || !Number.isFinite(defectsValue)) {
      setFeedback('Lengkapi nama lot, kadar air, dan jumlah defect terlebih dahulu.');
      return;
    }
    const next: QualityCheck = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      lotName: lotName.trim(),
      moisture: moisture.replace(',', '.'),
      defects: String(defectsValue),
      cupping: cupping.trim(),
      process,
      photoUri,
      result: getResult(moisture, defects, cupping),
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    const updated = [next, ...checks];
    setChecks(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLotName('');
      setMoisture('');
      setDefects('');
      setCupping('');
      setPhotoUri(undefined);
      setFeedback(`Pemeriksaan ${next.result.toLowerCase()} dan tersimpan di handphone.`);
    } catch {
      setFeedback('Hasil tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Cek standar kopi" subtitle="PETANI · MUTU LOT" />
      <ProgramIntro
        eyebrow="PEMERIKSAAN AWAL"
        title="Tahu kondisi lot sebelum dijual."
        description="Masukkan hasil pengukuran sederhana dari kebun. Aplikasi akan membantu membaca apakah lot sudah mendekati standar Kopi Garut."
      />

      <LinearGradient colors={[colors.foreground, colors.secondaryForeground]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}><BrandIcon name="check" size={18} color={colors.primaryForeground} /></View>
        <View style={styles.heroCopy}>
          <Text style={[styles.heroKicker, { color: colors.accent }]}>TARGET MUTU</Text>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Kadar air 10–12% · maksimal 5 defect / 300 g</Text>
          <Text style={[styles.heroText, { color: colors.primaryForeground }]}>Cupping minimal 80 poin jika hasilnya sudah tersedia.</Text>
        </View>
      </LinearGradient>

      <ProgramSectionTitle eyebrow="01 · DATA LOT" title="Catat hasil pengukuran" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Nama atau kode lot</Text>
        <TextInput
          testID="quality-check-lot"
          accessibilityLabel="Nama atau kode lot"
          value={lotName}
          onChangeText={setLotName}
          placeholder="Contoh: Papandayan Natural 06"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
        />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Kadar air (%)</Text>
            <TextInput
              testID="quality-check-moisture"
              accessibilityLabel="Kadar air dalam persen"
              value={moisture}
              onChangeText={setMoisture}
              placeholder="Contoh: 11.5"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="decimal-pad"
              style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Defect / 300 g</Text>
            <TextInput
              testID="quality-check-defects"
              accessibilityLabel="Jumlah defect per 300 gram"
              value={defects}
              onChangeText={setDefects}
              placeholder="Contoh: 3"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="number-pad"
              style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
            />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Nilai cupping (opsional)</Text>
        <TextInput
          testID="quality-check-cupping"
          accessibilityLabel="Nilai cupping opsional"
          value={cupping}
          onChangeText={setCupping}
          placeholder="Isi jika sudah diuji, contoh: 82"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="decimal-pad"
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
        />
      </ProgramCard>

      <ProgramSectionTitle eyebrow="02 · PROSES" title="Bagaimana lot diproses?" />
      <View style={styles.optionRow}>
        {processes.map((item) => {
          const selected = process === item;
          return (
            <Pressable
              key={item}
              testID={`quality-process-${item.toLowerCase()}`}
              accessibilityRole="button"
              accessibilityLabel={`Pilih proses ${item}`}
              accessibilityState={{ selected }}
              onPress={() => setProcess(item)}
              style={({ pressed }) => [styles.option, { backgroundColor: selected ? colors.primary : colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}
            >
              <Text style={[styles.optionText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <ProgramSectionTitle eyebrow="03 · BUKTI" title="Tambahkan foto lot" />
      <ProgramCard>
        <Text style={[styles.helper, { color: colors.mutedForeground }]}>Foto membantu penyuluh melihat kondisi biji dan menjadi catatan pemeriksaan.</Text>
        {photoUri ? <Image source={{ uri: photoUri }} contentFit="cover" style={styles.photo} /> : <View style={[styles.photoEmpty, { backgroundColor: colors.secondary }]}><BrandIcon name="coffee" size={28} color={colors.primary} /><Text style={[styles.photoEmptyText, { color: colors.mutedForeground }]}>Belum ada foto</Text></View>}
        <View style={styles.photoActions}>
          <Pressable testID="quality-take-photo" accessibilityRole="button" accessibilityLabel="Ambil foto lot dengan kamera" onPress={() => void choosePhoto('camera')} style={({ pressed }) => [styles.photoButton, { backgroundColor: colors.foreground, opacity: pressed ? 0.78 : 1 }]}>
            <BrandIcon name="maximize" size={15} color={colors.primaryForeground} />
            <Text style={[styles.photoButtonText, { color: colors.primaryForeground }]}>Kamera</Text>
          </Pressable>
          <Pressable testID="quality-library-photo" accessibilityRole="button" accessibilityLabel="Pilih foto lot dari galeri" onPress={() => void choosePhoto('library')} style={({ pressed }) => [styles.photoButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.78 : 1 }]}>
            <BrandIcon name="grid" size={15} color={colors.foreground} />
            <Text style={[styles.photoButtonText, { color: colors.foreground }]}>Galeri</Text>
          </Pressable>
        </View>
      </ProgramCard>

      {currentPreview && (
        <View style={[styles.preview, { backgroundColor: currentPreview === 'Memenuhi standar' ? colors.secondary : colors.muted, borderColor: currentPreview === 'Memenuhi standar' ? colors.primary : colors.border }]}>
          <BrandIcon name={currentPreview === 'Memenuhi standar' ? 'check' : 'alert-circle'} size={20} color={currentPreview === 'Memenuhi standar' ? colors.primary : colors.destructive} />
          <View style={styles.previewCopy}>
            <Text style={[styles.previewKicker, { color: colors.mutedForeground }]}>HASIL SEMENTARA</Text>
            <Text style={[styles.previewTitle, { color: colors.foreground }]}>{currentPreview}</Text>
          </View>
        </View>
      )}

      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('tersimpan') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable testID="quality-save" accessibilityRole="button" accessibilityLabel="Simpan hasil pemeriksaan" onPress={() => void saveCheck()} style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
        <BrandIcon name="check" size={18} color={colors.primaryForeground} />
        <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>Simpan pemeriksaan</Text>
      </Pressable>

      <ProgramSectionTitle eyebrow={`${checks.length} PEMERIKSAAN TERSIMPAN`} title="Riwayat di handphone" />
      {checks.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada pemeriksaan</Text><Text style={[styles.helper, { color: colors.mutedForeground }]}>Hasil yang kamu simpan akan muncul di sini meski belum terhubung ke server.</Text></ProgramCard>
      ) : checks.slice(0, 5).map((item) => (
        <ProgramCard key={item.id}>
          <View style={styles.historyTop}>
            <View style={styles.historyCopy}>
              <Text style={[styles.historyTitle, { color: colors.foreground }]}>{item.lotName}</Text>
              <Text style={[styles.historyDetail, { color: colors.mutedForeground }]}>{item.process} · {item.moisture}% kadar air · {item.defects} defect · {item.createdAt}</Text>
            </View>
            <View style={[styles.status, { backgroundColor: item.result === 'Memenuhi standar' ? colors.secondary : colors.muted }]}>
              <Text style={[styles.statusText, { color: item.result === 'Memenuhi standar' ? colors.primary : colors.destructive }]}>{item.result === 'Memenuhi standar' ? 'Lolos' : 'Perbaiki'}</Text>
            </View>
          </View>
        </ProgramCard>
      ))}
      <Pressable testID="quality-back-standards" accessibilityRole="button" accessibilityLabel="Lihat panduan standar kopi" onPress={() => router.push('/standards')} style={styles.linkButton}>
        <Text style={[styles.linkText, { color: colors.primary }]}>Lihat panduan standar lengkap</Text>
        <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
      </Pressable>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  hero: { borderRadius: 20, padding: 16, flexDirection: 'row', gap: 12 },
  heroIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  heroCopy: { flex: 1, gap: 5 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.4 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 19 },
  heroText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.78 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 6 },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1 },
  input: { minHeight: 46, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_400Regular', fontSize: 13, marginBottom: 12 },
  optionRow: { flexDirection: 'row', gap: 8 },
  option: { flex: 1, borderWidth: 1, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  optionText: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  photo: { width: '100%', height: 150, borderRadius: 14, marginTop: 2 },
  photoEmpty: { height: 120, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 7 },
  photoEmptyText: { fontFamily: 'Manrope_600SemiBold', fontSize: 11 },
  photoActions: { flexDirection: 'row', gap: 8 },
  photoButton: { flex: 1, borderRadius: 13, minHeight: 42, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 },
  photoButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  preview: { borderWidth: 1, borderRadius: 17, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  previewCopy: { flex: 1, gap: 2 },
  previewKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.3 },
  previewTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  saveButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  saveButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  historyTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  historyCopy: { flex: 1, gap: 4 },
  historyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  historyDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  status: { borderRadius: 18, paddingHorizontal: 9, paddingVertical: 6 },
  statusText: { fontFamily: 'Manrope_700Bold', fontSize: 9 },
  linkButton: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  linkText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
});