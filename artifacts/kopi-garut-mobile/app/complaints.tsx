import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { InfoRow, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { Complaint, ComplaintCategory, complaintCategories } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useAuth } from '@/context/AuthContext';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/program-complaints';
const DRAFT_STORAGE_KEY = '@kopi-garut/program-complaint-draft';

const categoryGuidance: Record<ComplaintCategory, { icon: 'users' | 'map' | 'package' | 'briefcase' | 'info'; title: string; description: string; shortDescription: string }> = {
  'Petani belum terdata': {
    icon: 'users',
    title: 'Kenalkan petani atau kelompoknya',
    shortDescription: 'Jangkau petani atau kelompok yang belum tercatat.',
    description: 'Sebutkan nama petani atau kelompok, lokasi kebun, dan apakah mereka sudah pernah mendapat pendampingan.',
  },
  'Bantuan bibit': {
    icon: 'package',
    title: 'Jelaskan rencana penanamannya',
    shortDescription: 'Ajukan kebutuhan bibit untuk lahan yang siap ditanam.',
    description: 'Tuliskan luas lahan, jenis kopi yang dibutuhkan, perkiraan jumlah bibit, dan waktu tanam.',
  },
  'Lahan siap dikembangkan': {
    icon: 'map',
    title: 'Ceritakan potensi lahannya',
    shortDescription: 'Usulkan lahan yang siap masuk tahap pengembangan.',
    description: 'Sebutkan lokasi, perkiraan luas, kondisi lahan, dan bentuk bantuan yang paling dibutuhkan.',
  },
  Pendampingan: {
    icon: 'briefcase',
    title: 'Sampaikan pendampingan yang dibutuhkan',
    shortDescription: 'Minta kunjungan atau arahan dari tim lapangan.',
    description: 'Contoh: budidaya, pascapanen, pembentukan kelompok, akses program, atau pemasaran.',
  },
  Lainnya: {
    icon: 'info',
    title: 'Berikan konteks selengkap mungkin',
    shortDescription: 'Sampaikan kebutuhan lain yang belum tercantum.',
    description: 'Tuliskan siapa yang perlu dibantu, lokasinya, dan dukungan yang paling dibutuhkan.',
  },
};

export default function ComplaintsScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session } = useAuth();
  const [category, setCategory] = useState<ComplaintCategory>('Petani belum terdata');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  const summary = useMemo(() => ({
    total: complaints.length,
    received: complaints.filter((item) => item.status === 'Diterima').length,
    reviewed: complaints.filter((item) => item.status === 'Ditinjau').length,
  }), [complaints]);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(DRAFT_STORAGE_KEY)]).then(([value, draft]) => {
      if (value) {
        try {
          setComplaints(JSON.parse(value) as Complaint[]);
        } catch {
          setFeedback('Riwayat usulan belum dapat dibaca.');
        }
      }
      if (draft) {
        try {
          const savedDraft = JSON.parse(draft) as Partial<Complaint>;
          if (savedDraft.category && complaintCategories.includes(savedDraft.category as ComplaintCategory)) {
            setCategory(savedDraft.category as ComplaintCategory);
          }
          if (typeof savedDraft.location === 'string') setLocation(savedDraft.location);
          if (typeof savedDraft.description === 'string') setDescription(savedDraft.description);
        } catch {
          setFeedback('Draf usulan belum dapat dipulihkan.');
        }
      }
      setLoading(false);
    }).catch(() => {
      setFeedback('Riwayat usulan belum dapat dimuat.');
      setLoading(false);
    });
  }, []);

  const submitComplaint = async () => {
    if (!location.trim() || !description.trim()) {
      setFeedback('Lengkapi lokasi dan kebutuhan dukungan sebelum mengirim.');
      return;
    }
    if (!session) {
      try {
        await AsyncStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
          category,
          location: location.trim(),
          description: description.trim(),
        }));
        router.push({ pathname: '/login', params: { returnTo: '/complaints' } });
      } catch {
        setFeedback('Usulan belum bisa disiapkan. Coba lagi sebelum masuk.');
      }
      return;
    }
    const next: Complaint = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category,
      location: location.trim(),
      description: description.trim(),
      status: 'Diterima',
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    const updated = [next, ...complaints];
    setComplaints(updated);
    setLocation('');
    setDescription('');
    setFeedback('Usulan diterima. Tim program akan meninjau dan menghubungi kamu bila perlu.');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      setFeedback('Usulan tampil di layar, tetapi belum tersimpan di perangkat.');
    }
  };

  const selectedGuidance = categoryGuidance[category];
  const isSuccess = feedback.startsWith('Usulan diterima');

  return (
    <Screen scroll={false} style={styles.screen}>
      <Header back title="Usulan dukungan" subtitle="PROGRAM · JANGKAUAN" />
      <KeyboardAwareScrollViewCompat
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        bottomOffset={28}
        keyboardShouldPersistTaps="handled"
      >
        <ProgramIntro
          eyebrow="JANGKAUAN & DUKUNGAN"
          title="Bantu kami menjangkau yang belum terjangkau"
          description="Sampaikan kebutuhan nyata dari lapangan agar dukungan Kopi Garut dapat sampai kepada petani, kelompok, dan lahan yang tepat."
        />

        <ProgramCard muted>
          <View style={styles.promiseRow}>
            <View style={[styles.promiseIcon, { backgroundColor: colors.card }]}>
              <BrandIcon name="shield" size={18} color={colors.primary} />
            </View>
            <View style={styles.promiseCopy}>
              <Text style={[styles.promiseKicker, { color: colors.primary }]}>UNTUK TIM PROGRAM</Text>
              <Text style={[styles.promiseTitle, { color: colors.foreground }]}>Informasi lapangan, langkah yang lebih tepat</Text>
              <Text style={[styles.promiseText, { color: colors.mutedForeground }]}>
                Usulan ini membantu tim menemukan kebutuhan yang belum masuk jangkauan. Sampaikan informasi seperlunya, tanpa data pribadi yang sensitif.
              </Text>
            </View>
          </View>
        </ProgramCard>

        <ProgramSectionTitle eyebrow="01 · TUJUAN USULAN" title="Dukungan apa yang dibutuhkan?" />
        <Text style={[styles.sectionHint, { color: colors.mutedForeground }]}>Pilih satu tujuan agar usulan dapat diarahkan ke tim yang sesuai.</Text>
        <View style={styles.categoryList}>
          {complaintCategories.map((item, index) => {
            const guidance = categoryGuidance[item];
            const selected = category === item;
            return (
              <Pressable
                key={item}
                testID={`complaint-category-${item}`}
                accessibilityRole="button"
                accessibilityLabel={`Pilih jenis usulan: ${item}`}
                accessibilityHint={guidance.shortDescription}
                accessibilityState={{ selected }}
                onPress={() => setCategory(item)}
                style={({ pressed }) => [
                  styles.categoryCard,
                  {
                    backgroundColor: selected ? colors.secondary : colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                    opacity: pressed ? 0.82 : 1,
                  },
                ]}
              >
                <View style={[styles.categoryNumber, { backgroundColor: selected ? colors.primary : colors.muted }]}>
                  <Text style={[styles.categoryNumberText, { color: selected ? colors.primaryForeground : colors.mutedForeground }]}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>
                <View style={styles.categoryIconWrap}>
                  <BrandIcon name={guidance.icon} size={18} color={selected ? colors.primary : colors.mutedForeground} />
                </View>
                <View style={styles.categoryCopy}>
                  <Text style={[styles.categoryTitle, { color: colors.foreground }]}>{item}</Text>
                  <Text style={[styles.categoryDescription, { color: colors.mutedForeground }]}>{guidance.shortDescription}</Text>
                </View>
                <View style={styles.categoryState}>
                  {selected ? (
                    <>
                      <BrandIcon name="check" size={16} color={colors.primary} />
                      <Text style={[styles.selectedLabel, { color: colors.primary }]}>Dipilih</Text>
                    </>
                  ) : (
                    <BrandIcon name="chevron-right" size={17} color={colors.mutedForeground} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.guidanceCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[styles.guidanceIcon, { backgroundColor: colors.card }]}>
            <BrandIcon name={selectedGuidance.icon} size={17} color={colors.primary} />
          </View>
          <View style={styles.guidanceCopy}>
            <Text style={[styles.guidanceEyebrow, { color: colors.primary }]}>INFORMASI YANG MEMBANTU</Text>
            <Text style={[styles.guidanceTitle, { color: colors.foreground }]}>{selectedGuidance.title}</Text>
            <Text style={[styles.guidanceText, { color: colors.mutedForeground }]}>{selectedGuidance.description}</Text>
          </View>
        </View>

        <ProgramSectionTitle eyebrow="02 · DETAIL LAPANGAN" title="Ceritakan titik dukungannya" />
        <ProgramCard>
          <InfoRow
            icon="map-pin"
            label="Lokasi"
            value="Desa, blok, atau titik lahan"
            detail="Lokasi yang spesifik membantu tim menyiapkan verifikasi lapangan."
          />
          <InfoRow
            icon="briefcase"
            label="Kebutuhan"
            value="Bantuan yang paling dibutuhkan"
            detail="Misalnya bibit, pendampingan, alat, atau akses program."
            last
          />
        </ProgramCard>

        <View style={styles.fieldsGroup}>
          <View style={styles.fieldHeader}>
            <Text style={[styles.label, { color: colors.foreground }]}>Lokasi petani atau lahan</Text>
            <Text style={[styles.required, { color: colors.primary }]}>Wajib diisi</Text>
          </View>
          <TextInput
            testID="complaint-location"
            accessibilityLabel="Lokasi petani atau lahan"
            accessibilityHint="Masukkan desa, blok, atau titik lahan"
            value={location}
            onChangeText={setLocation}
            placeholder="Contoh: Desa Mekarsari, Blok 2"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
          />

          <View style={styles.fieldHeader}>
            <Text style={[styles.label, { color: colors.foreground }]}>Kebutuhan dukungan</Text>
            <Text style={[styles.required, { color: colors.primary }]}>Wajib diisi</Text>
          </View>
          <TextInput
            testID="complaint-description"
            accessibilityLabel="Kebutuhan dukungan"
            accessibilityHint="Jelaskan siapa yang perlu dibantu dan dukungan yang dibutuhkan"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            placeholder="Contoh: Ada 12 petani kopi yang belum terdata dan membutuhkan bibit Arabika untuk lahan baru."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, styles.textarea, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
          />
          <Text style={[styles.fieldNote, { color: colors.mutedForeground }]}>
            Boleh sertakan nama kelompok, perkiraan jumlah penerima, atau waktu yang diharapkan. Hindari NIK, nomor telepon, dan data pribadi lain.
          </Text>
        </View>

        {feedback ? (
          <View style={[styles.feedback, { backgroundColor: isSuccess ? colors.secondary : colors.muted, borderColor: isSuccess ? colors.border : colors.accent }]}>
            <BrandIcon name={isSuccess ? 'check' : 'info'} size={16} color={isSuccess ? colors.primary : colors.accent} />
            <Text style={[styles.feedbackText, { color: colors.foreground }]}>{feedback}</Text>
          </View>
        ) : null}

        <View style={styles.submitGroup}>
          <Pressable
            testID="submit-complaint"
            accessibilityRole="button"
            accessibilityLabel="Kirim usulan dukungan"
            accessibilityHint={session ? 'Menyimpan usulan di perangkat ini' : 'Masuk sebelum mengirim usulan'}
            onPress={submitComplaint}
            style={({ pressed }) => [styles.submit, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}
          >
            <Text style={[styles.submitText, { color: colors.primaryForeground }]}>{session ? 'Kirim usulan dukungan' : 'Masuk untuk mengirim usulan'}</Text>
            <BrandIcon name={session ? 'send' : 'lock'} size={17} color={colors.primaryForeground} />
          </Pressable>
          <Text style={[styles.submitNote, { color: colors.mutedForeground }]}>
            {session ? 'Usulan akan tersimpan di perangkat ini dan masuk ke riwayat.' : 'Draf akan tetap tersimpan saat kamu masuk ke akun.'}
          </Text>
        </View>

        <ProgramSectionTitle eyebrow="03 · RIWAYAT DI PERANGKAT INI" title="Usulan terbaru" />
        {loading ? (
          <View style={[styles.loading, { backgroundColor: colors.muted }]}>
            <View style={[styles.loadingLine, { backgroundColor: colors.border }]} />
            <View style={[styles.loadingLineShort, { backgroundColor: colors.border }]} />
          </View>
        ) : (
          <>
            <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.summaryIntro}>
                <BrandIcon name="send" size={16} color={colors.primary} />
                <Text style={[styles.summaryIntroText, { color: colors.mutedForeground }]}>Ringkasan usulanmu</Text>
              </View>
              <View style={styles.summaryStats}>
                <View style={styles.summaryStat}>
                  <Text style={[styles.summaryValue, { color: colors.foreground }]}>{summary.total}</Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Total</Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryStat}>
                  <Text style={[styles.summaryValue, { color: colors.primary }]}>{summary.received}</Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Diterima</Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryStat}>
                  <Text style={[styles.summaryValue, { color: colors.accent }]}>{summary.reviewed}</Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Ditinjau</Text>
                </View>
              </View>
            </View>

            {complaints.length > 0 ? (
              <View style={styles.history}>
                {complaints.slice(0, 3).map((item) => (
                  <ProgramCard key={item.id}>
                    <View style={styles.historyTop}>
                      <View style={[styles.historyIcon, { backgroundColor: colors.secondary }]}>
                         <BrandIcon name={categoryGuidance[item.category]?.icon ?? categoryGuidance.Lainnya.icon} size={17} color={colors.primary} />
                      </View>
                      <View style={styles.historyCopy}>
                        <Text style={[styles.historyTitle, { color: colors.foreground }]}>{item.category}</Text>
                        <Text style={[styles.historyMeta, { color: colors.mutedForeground }]}>{item.location} · {item.createdAt}</Text>
                      </View>
                      <StatusPill label={item.status} positive={item.status === 'Diterima'} />
                    </View>
                    <View style={[styles.historyDivider, { backgroundColor: colors.border }]} />
                    <Text style={[styles.historyDescription, { color: colors.mutedForeground }]}>{item.description}</Text>
                    <View style={styles.historyFooter}>
                      <BrandIcon name={item.status === 'Diterima' ? 'check' : 'info'} size={13} color={item.status === 'Diterima' ? colors.primary : colors.accent} />
                      <Text style={[styles.historyStatusText, { color: colors.mutedForeground }]}>
                        {item.status === 'Diterima' ? 'Tersimpan dan menunggu peninjauan.' : 'Usulan sedang dipelajari oleh tim.'}
                      </Text>
                    </View>
                  </ProgramCard>
                ))}
              </View>
            ) : (
              <View style={[styles.empty, { borderColor: colors.border }]}>
                <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
                  <BrandIcon name="send" size={19} color={colors.primary} />
                </View>
                <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada usulan</Text>
                <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Usulan tentang petani, lahan, atau kebutuhan bantuan akan tersimpan di perangkat ini.</Text>
              </View>
            )}
          </>
        )}
      </KeyboardAwareScrollViewCompat>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  formScroll: { flex: 1 },
  formContent: { paddingBottom: 80, gap: 14 },
  promiseRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  promiseIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  promiseCopy: { flex: 1, gap: 3 },
  promiseKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.1 },
  promiseTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
  promiseText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  sectionHint: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, marginTop: -7 },
  categoryList: { gap: 8 },
  categoryCard: { minHeight: 72, borderWidth: 1, borderRadius: 17, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 9 },
  categoryNumber: { width: 29, height: 29, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  categoryNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 10, letterSpacing: 0.3 },
  categoryIconWrap: { width: 30, alignItems: 'center', justifyContent: 'center' },
  categoryCopy: { flex: 1, gap: 2 },
  categoryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  categoryDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  categoryState: { minWidth: 44, alignItems: 'center', justifyContent: 'center', gap: 2 },
  selectedLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.2 },
  guidanceCard: { borderRadius: 17, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  guidanceIcon: { width: 31, height: 31, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  guidanceCopy: { flex: 1, gap: 2 },
  guidanceEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1.05 },
  guidanceTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  guidanceText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  fieldsGroup: { gap: 8 },
  fieldHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 2 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  required: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 0.2 },
  input: { minHeight: 51, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  textarea: { minHeight: 127, lineHeight: 19 },
  fieldNote: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15, marginTop: -1 },
  feedback: { borderRadius: 15, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  feedbackText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  submitGroup: { alignItems: 'center', gap: 7, marginTop: 1 },
  submit: { width: '100%', minHeight: 53, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  submitText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  submitNote: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, textAlign: 'center' },
  loading: { borderRadius: 18, padding: 16, gap: 9 },
  loadingLine: { height: 13, width: '72%', borderRadius: 7 },
  loadingLineShort: { height: 10, width: '45%', borderRadius: 5 },
  summaryCard: { borderRadius: 18, borderWidth: 1, padding: 13, gap: 12 },
  summaryIntro: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  summaryIntroText: { fontFamily: 'Manrope_700Bold', fontSize: 10, letterSpacing: 0.2 },
  summaryStats: { flexDirection: 'row', alignItems: 'center' },
  summaryStat: { flex: 1, alignItems: 'center', gap: 2 },
  summaryDivider: { width: 1, height: 27 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 19, lineHeight: 23 },
  summaryLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13 },
  history: { gap: 10 },
  historyTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  historyIcon: { width: 31, height: 31, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  historyCopy: { flex: 1, gap: 3 },
  historyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  historyMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  historyDivider: { height: 1, marginVertical: 1 },
  historyDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  historyFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyStatusText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  empty: { minHeight: 140, borderWidth: 1, borderStyle: 'dashed', borderRadius: 19, alignItems: 'center', justifyContent: 'center', gap: 7, padding: 18 },
  emptyIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 1 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, textAlign: 'center' },
});