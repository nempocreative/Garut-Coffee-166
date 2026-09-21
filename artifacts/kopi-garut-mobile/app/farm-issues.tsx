import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import { Linking, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon } from '@/components/BrandIcon';
import { ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { EXTENSION_NOTIFICATIONS_STORAGE_KEY, FARM_ISSUES_STORAGE_KEY, ExtensionNotification, FarmIssue, notificationTime, supportId } from '@/data/extension-support';

const STORAGE_KEY = FARM_ISSUES_STORAGE_KEY;

function createdDate() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function FarmIssuesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const { session } = useAuth();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();
  const [photoUri, setPhotoUri] = useState<string>();
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>();
  const [description, setDescription] = useState('');
  const [issues, setIssues] = useState<FarmIssue[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        setIssues(JSON.parse(value) as FarmIssue[]);
      } catch {
        setFeedback('Riwayat laporan belum dapat dibaca.');
      }
    }).catch(() => setFeedback('Riwayat laporan belum dapat dimuat.'));
  }, []);

  const choosePhoto = async (source: 'camera' | 'library') => {
    try {
      const permission = source === 'camera' ? cameraPermission : mediaPermission;
      const requestPermission = source === 'camera' ? requestCameraPermission : requestMediaPermission;
      if (!permission?.granted) {
        const nextPermission = await requestPermission();
        if (!nextPermission.granted) {
          setFeedback(source === 'camera' ? 'Akses kamera diperlukan untuk mengambil foto masalah.' : 'Akses galeri diperlukan untuk memilih foto masalah.');
          return;
        }
      }
      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.7 })
        : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
      if (!result.canceled && result.assets[0]?.uri) {
        setPhotoUri(result.assets[0].uri);
        setFeedback('');
      }
    } catch {
      setFeedback(source === 'camera' ? 'Kamera belum bisa dibuka. Coba pilih foto dari galeri.' : 'Galeri belum bisa dibuka. Coba lagi.');
    }
  };

  const captureLocation = async () => {
    try {
      if (!locationPermission?.granted) {
        const nextPermission = await requestLocationPermission();
        if (!nextPermission.granted) {
          setFeedback('Akses lokasi ditolak. Kamu tetap bisa mengetik lokasi kebun secara manual.');
          return;
        }
      }
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const nextCoordinates = { latitude: current.coords.latitude, longitude: current.coords.longitude };
      setCoordinates(nextCoordinates);
      setLocation(`Titik kebun · ${nextCoordinates.latitude.toFixed(5)}, ${nextCoordinates.longitude.toFixed(5)}`);
      setFeedback('Lokasi kebun berhasil ditambahkan.');
    } catch {
      setFeedback('Lokasi belum bisa didapatkan. Masukkan nama desa atau blok kebun secara manual.');
    }
  };

  const submitIssue = async () => {
    if (!photoUri || !location.trim() || !description.trim()) {
      setFeedback('Lengkapi foto, lokasi kebun, dan keterangan masalah sebelum mengirim.');
      return;
    }
    const next: FarmIssue = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      farmerId: session?.id === 'petani' ? 'asep-rahmat' : undefined,
      farmerName: session?.id === 'petani' ? session.name : undefined,
      assignedTo: 'Rani Permata',
      photoUri,
      location: location.trim(),
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
      description: description.trim(),
      createdAt: createdDate(),
      status: 'Menunggu arahan',
    };
    const updated = [next, ...issues];
    setIssues(updated);
    setPhotoUri(undefined);
    setLocation('');
    setCoordinates(undefined);
    setDescription('');
    setFeedback('Laporan terkirim ke penyuluh. Arahan akan muncul setelah ditinjau.');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const notification: ExtensionNotification = {
        id: supportId('issue'),
        audience: 'penyuluh',
        farmerId: next.farmerId,
        issueId: next.id,
        title: 'Laporan masalah baru dari petani',
        detail: `${next.location}: ${next.description}`,
        type: 'Laporan masalah',
        time: notificationTime(),
        icon: 'alert-circle',
        route: '/extension-issues',
        action: 'Buka daftar tugas',
        priority: 'urgent',
      };
      const storedNotifications = await AsyncStorage.getItem(EXTENSION_NOTIFICATIONS_STORAGE_KEY);
      const previous = storedNotifications ? JSON.parse(storedNotifications) as ExtensionNotification[] : [];
      await AsyncStorage.setItem(EXTENSION_NOTIFICATIONS_STORAGE_KEY, JSON.stringify([notification, ...previous]));
    } catch {
      setFeedback('Laporan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const cameraSettingsRequired = cameraPermission?.status === 'denied' && cameraPermission.canAskAgain === false;
  const mediaSettingsRequired = mediaPermission?.status === 'denied' && mediaPermission.canAskAgain === false;
  const locationSettingsRequired = locationPermission?.status === 'denied' && locationPermission.canAskAgain === false;

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Masalah kebun" subtitle="PETANI · PENYULUHAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="LAPORAN LAPANGAN"
        title="Kirim kondisi kebun dari tempatnya."
        description="Foto, lokasi, dan keterangan yang jelas membantu penyuluh memberi arahan yang lebih tepat."
      />

      <View style={[styles.signalCard, { backgroundColor: colors.foreground }]}>
        <View style={[styles.signalIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="send" size={18} color={colors.primaryForeground} />
        </View>
        <View style={styles.signalCopy}>
          <Text style={[styles.signalKicker, { color: colors.accent }]}>TERHUBUNG KE PENYULUH</Text>
          <Text style={[styles.signalTitle, { color: colors.primaryForeground }]}>Laporanmu masuk ke ruang tindak lanjut.</Text>
          <Text style={[styles.signalText, { color: colors.primaryForeground }]}>Sertakan detail yang terlihat agar penyuluh bisa menyiapkan arahan sebelum kunjungan.</Text>
        </View>
      </View>

      <ProgramSectionTitle eyebrow="01 · BUKTI KONDISI" title="Ambil atau pilih foto" />
      <ProgramCard>
        <Text style={[styles.helper, { color: colors.mutedForeground }]}>Foto daun, buah, hama, atau kerusakan yang paling jelas terlihat.</Text>
        {photoUri ? (
          <Image source={{ uri: photoUri }} contentFit="cover" style={styles.photo} />
        ) : (
          <View style={[styles.photoEmpty, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="coffee" size={29} color={colors.primary} />
            <Text style={[styles.photoEmptyTitle, { color: colors.foreground }]}>Belum ada foto</Text>
            <Text style={[styles.photoEmptyText, { color: colors.mutedForeground }]}>Tambahkan minimal satu foto masalah.</Text>
          </View>
        )}
        <View style={styles.photoActions}>
          <Pressable testID="farm-issue-camera" accessibilityRole="button" accessibilityLabel="Ambil foto masalah dengan kamera" onPress={() => void choosePhoto('camera')} style={({ pressed }) => [styles.photoButton, { backgroundColor: colors.foreground, opacity: pressed ? 0.78 : 1 }]}>
            <BrandIcon name="maximize" size={15} color={colors.primaryForeground} />
            <Text style={[styles.photoButtonText, { color: colors.primaryForeground }]}>Kamera</Text>
          </Pressable>
          <Pressable testID="farm-issue-library" accessibilityRole="button" accessibilityLabel="Pilih foto masalah dari galeri" onPress={() => void choosePhoto('library')} style={({ pressed }) => [styles.photoButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.78 : 1 }]}>
            <BrandIcon name="grid" size={15} color={colors.foreground} />
            <Text style={[styles.photoButtonText, { color: colors.foreground }]}>Galeri</Text>
          </Pressable>
        </View>
        {(cameraSettingsRequired || mediaSettingsRequired) && Platform.OS !== 'web' && (
          <Pressable testID="farm-issue-open-photo-settings" accessibilityRole="button" accessibilityLabel="Buka pengaturan izin foto" onPress={() => void Linking.openSettings()} style={({ pressed }) => [styles.settingsButton, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}>
            <BrandIcon name="settings" size={14} color={colors.primary} />
            <Text style={[styles.settingsText, { color: colors.primary }]}>Buka pengaturan foto</Text>
          </Pressable>
        )}
      </ProgramCard>

      <ProgramSectionTitle eyebrow="02 · LOKASI KEBUN" title="Tandai tempat masalah" />
      <ProgramCard>
        <Text style={[styles.helper, { color: colors.mutedForeground }]}>Gunakan lokasi perangkat atau tulis desa dan blok kebun secara manual.</Text>
        <Pressable testID="farm-issue-location" accessibilityRole="button" accessibilityLabel="Gunakan lokasi perangkat" onPress={() => void captureLocation()} style={({ pressed }) => [styles.locationButton, { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
          <BrandIcon name="map-pin" size={17} color={colors.primary} />
          <Text style={[styles.locationButtonText, { color: colors.foreground }]}>{location ? 'Perbarui lokasi perangkat' : 'Gunakan lokasi saya'}</Text>
          <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
        </Pressable>
        {locationSettingsRequired && Platform.OS !== 'web' && (
          <Pressable testID="farm-issue-open-location-settings" accessibilityRole="button" accessibilityLabel="Buka pengaturan lokasi" onPress={() => void Linking.openSettings()} style={({ pressed }) => [styles.settingsButton, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}>
            <BrandIcon name="settings" size={14} color={colors.primary} />
            <Text style={[styles.settingsText, { color: colors.primary }]}>Buka pengaturan lokasi</Text>
          </Pressable>
        )}
        <TextInput testID="farm-issue-location-text" accessibilityLabel="Lokasi kebun" value={location} onChangeText={(value) => { setLocation(value); setCoordinates(undefined); }} placeholder="Contoh: Desa Mekarsari · Blok Utara" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        {coordinates && <Text style={[styles.coordinateText, { color: colors.primary }]}>Koordinat tersimpan bersama laporan.</Text>}
      </ProgramCard>

      <ProgramSectionTitle eyebrow="03 · KETERANGAN" title="Ceritakan masalahnya" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Apa yang terlihat di kebun?</Text>
        <TextInput testID="farm-issue-description" accessibilityLabel="Keterangan masalah kebun" value={description} onChangeText={setDescription} multiline numberOfLines={6} textAlignVertical="top" placeholder="Contoh: Daun kopi menguning dan terdapat bintik hitam sejak tiga hari terakhir. Terlihat di sekitar 10 pohon pada blok utara." placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.textarea, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.fieldNote, { color: colors.mutedForeground }]}>Sebutkan bagian tanaman yang terdampak, perkiraan luas atau jumlah pohon, dan sejak kapan masalah terlihat.</Text>
      </ProgramCard>

      {!!feedback && <View style={[styles.feedback, { backgroundColor: feedback.startsWith('Laporan terkirim') ? colors.secondary : colors.muted, borderColor: colors.border }]}><BrandIcon name={feedback.startsWith('Laporan terkirim') ? 'check' : 'info'} size={16} color={feedback.startsWith('Laporan terkirim') ? colors.primary : colors.accent} /><Text style={[styles.feedbackText, { color: colors.foreground }]}>{feedback}</Text></View>}
      <Pressable testID="farm-issue-submit" accessibilityRole="button" accessibilityLabel="Kirim laporan masalah kebun ke penyuluh" onPress={() => void submitIssue()} style={({ pressed }) => [styles.submitButton, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}>
        <Text style={[styles.submitText, { color: colors.primaryForeground }]}>Kirim ke penyuluh</Text>
        <BrandIcon name="send" size={17} color={colors.primaryForeground} />
      </Pressable>
      <Text style={[styles.submitNote, { color: colors.mutedForeground }]}>Laporan tersimpan di perangkat ini dan masuk ke antrean tindak lanjut penyuluh.</Text>

      <ProgramSectionTitle eyebrow={`${issues.length} LAPORAN DIKIRIM`} title="Riwayat laporan" />
      {issues.length === 0 ? (
        <ProgramCard muted>
          <View style={styles.emptyRow}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.card }]}><BrandIcon name="send" size={18} color={colors.primary} /></View>
            <View style={styles.emptyCopy}>
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada laporan</Text>
              <Text style={[styles.helper, { color: colors.mutedForeground }]}>Laporan yang kamu kirim akan muncul di sini bersama status tindak lanjutnya.</Text>
            </View>
          </View>
        </ProgramCard>
      ) : (
        <View style={styles.history}>
          {issues.slice(0, 4).map((item) => (
            <ProgramCard key={item.id}>
              <View style={styles.historyTop}>
                <Image source={{ uri: item.photoUri }} contentFit="cover" style={styles.historyPhoto} />
                <View style={styles.historyCopy}>
                  <Text style={[styles.historyLocation, { color: colors.foreground }]}>{item.location}</Text>
                  <Text style={[styles.historyDate, { color: colors.mutedForeground }]}>{item.createdAt}</Text>
                </View>
                <StatusPill label={item.status} positive={item.status === 'Sudah ditinjau'} />
              </View>
              <Text style={[styles.historyDescription, { color: colors.mutedForeground }]}>{item.description}</Text>
              <View style={styles.historyFooter}><BrandIcon name="users" size={13} color={colors.primary} /><Text style={[styles.historyFooterText, { color: colors.mutedForeground }]}>{item.status === 'Menunggu arahan' ? 'Menunggu arahan dari penyuluh.' : 'Arahan penyuluh sudah tersedia.'}</Text></View>
               {item.recommendation && <View style={[styles.guidanceRow, { borderTopColor: colors.border }]}><BrandIcon name="check" size={13} color={colors.primary} /><View style={styles.guidanceCopy}><Text style={[styles.guidanceLabel, { color: colors.primary }]}>REKOMENDASI PENYULUH</Text><Text style={[styles.guidanceText, { color: colors.foreground }]}>{item.recommendation}</Text>{item.followUpDate && <Text style={[styles.guidanceFollowUp, { color: colors.mutedForeground }]}>Target {item.followUpDate} · {item.followUpNote}</Text>}</View></View>}
            </ProgramCard>
          ))}
        </View>
      )}
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  signalCard: { borderRadius: 20, padding: 15, flexDirection: 'row', gap: 10 },
  signalIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  signalCopy: { flex: 1, gap: 4 },
  signalKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.1 },
  signalTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 21 },
  signalText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15, opacity: 0.78 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  photo: { width: '100%', height: 188, borderRadius: 15, marginTop: 4 },
  photoEmpty: { minHeight: 155, borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 4 },
  photoEmptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  photoEmptyText: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  photoActions: { flexDirection: 'row', gap: 8, marginTop: 2 },
  photoButton: { flex: 1, minHeight: 41, borderRadius: 13, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  photoButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  settingsButton: { minHeight: 34, borderWidth: 1, borderRadius: 11, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  settingsText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  locationButton: { minHeight: 45, borderRadius: 13, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 3, marginBottom: 5 },
  locationButtonText: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 11 },
  input: { minHeight: 47, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, paddingVertical: 11, fontFamily: 'Manrope_400Regular', fontSize: 12 },
  coordinateText: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, marginTop: 2 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 5 },
  textarea: { minHeight: 132, lineHeight: 18 },
  fieldNote: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15, marginTop: 7 },
  feedback: { borderRadius: 15, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  feedbackText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  submitButton: { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9 },
  submitText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  submitNote: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, textAlign: 'center', marginTop: -5 },
  history: { gap: 10 },
  historyTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  historyPhoto: { width: 48, height: 48, borderRadius: 13 },
  historyCopy: { flex: 1, gap: 3 },
  historyLocation: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  historyDate: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  historyDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  historyFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyFooterText: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  guidanceRow: { borderTopWidth: 1, paddingTop: 9, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  guidanceCopy: { flex: 1, gap: 3 },
  guidanceLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.8 },
  guidanceText: { fontFamily: 'Manrope_600SemiBold', fontSize: 10.5, lineHeight: 15 },
  guidanceFollowUp: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 14 },
  emptyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emptyIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  emptyCopy: { flex: 1, gap: 3 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
});