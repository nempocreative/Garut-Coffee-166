import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { FilterChip, InfoRow, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { Complaint, ComplaintCategory, complaintCategories } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/program-complaints';

const categoryGuidance: Record<ComplaintCategory, { icon: 'users' | 'map' | 'package' | 'briefcase' | 'info'; title: string; description: string }> = {
  'Petani belum terdata': { icon: 'users', title: 'Kenalkan petani atau kelompoknya', description: 'Sebutkan nama petani atau kelompok, lokasi kebun, dan apakah mereka sudah pernah mendapat pendampingan.' },
  'Bantuan bibit': { icon: 'package', title: 'Jelaskan rencana penanamannya', description: 'Tuliskan luas lahan, jenis kopi yang dibutuhkan, perkiraan jumlah bibit, dan waktu tanam.' },
  'Lahan siap dikembangkan': { icon: 'map', title: 'Ceritakan potensi lahannya', description: 'Sebutkan lokasi, perkiraan luas, kondisi lahan, dan bentuk bantuan yang paling dibutuhkan.' },
  Pendampingan: { icon: 'briefcase', title: 'Sampaikan pendampingan yang dibutuhkan', description: 'Contoh: budidaya, pascapanen, pembentukan kelompok, akses program, atau pemasaran.' },
  Lainnya: { icon: 'info', title: 'Berikan konteks selengkap mungkin', description: 'Tuliskan siapa yang perlu dibantu, lokasinya, dan dukungan yang paling dibutuhkan.' },
};

export default function ComplaintsScreen() {
  const colors = useColors();
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
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        try { setComplaints(JSON.parse(value) as Complaint[]); } catch { setFeedback('Riwayat laporan belum dapat dibaca.'); }
      }
      setLoading(false);
    }).catch(() => { setFeedback('Riwayat laporan belum dapat dimuat.'); setLoading(false); });
  }, []);

  const submitComplaint = async () => {
    if (!location.trim() || !description.trim()) {
      setFeedback('Lengkapi lokasi dan kebutuhan dukungan sebelum mengirim.');
      return;
    }
    const next: Complaint = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, category, location: location.trim(), description: description.trim(), status: 'Diterima', createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) };
    const updated = [next, ...complaints];
    setComplaints(updated);
    setLocation('');
    setDescription('');
    setFeedback('Usulan diterima. Tim program akan meninjau dan menghubungi kamu bila perlu.');
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { setFeedback('Laporan tampil di layar, tetapi belum tersimpan di perangkat.'); }
  };

  const selectedGuidance = categoryGuidance[category];

  return (
    <Screen scroll={false} style={styles.screen}>
        <Header back title="Usulan dukungan" subtitle="PROGRAM · JANGKAUAN" />
      <KeyboardAwareScrollViewCompat style={styles.formScroll} contentContainerStyle={styles.formContent} bottomOffset={28} keyboardShouldPersistTaps="handled">
        <ProgramIntro eyebrow="JANGKAUAN & DUKUNGAN" title="Ada petani atau lahan yang perlu dibantu?" description="Sampaikan petani yang belum terdata, lahan yang siap dikembangkan, atau kebutuhan dukungan agar program Kopi Garut bisa menjangkau lebih banyak orang." />
        <ProgramCard muted>
          <View style={styles.promiseRow}>
            <View style={[styles.promiseIcon, { backgroundColor: colors.card }]}>
              <BrandIcon name="shield" size={18} color={colors.primary} />
            </View>
            <View style={styles.promiseCopy}>
              <Text style={[styles.promiseTitle, { color: colors.foreground }]}>Usulanmu membuka akses dukungan</Text>
              <Text style={[styles.promiseText, { color: colors.mutedForeground }]}>Informasi dari lapangan membantu tim menemukan petani, lahan, dan kebutuhan yang belum terjangkau program.</Text>
            </View>
          </View>
        </ProgramCard>

        <ProgramSectionTitle eyebrow="SEBELUM MENGIRIM" title="Berikan informasi yang membantu tim bergerak" />
        <ProgramCard>
          <InfoRow icon="users" label="Petani atau kelompok" value="Sebutkan siapa yang perlu dijangkau" detail="Nama petani, kelompok, atau calon penerima manfaat bila tersedia." />
          <InfoRow icon="map-pin" label="Lokasi" value="Sebutkan desa, blok, atau titik lahan" detail="Lokasi yang spesifik memudahkan verifikasi lapangan." />
          <InfoRow icon="package" label="Kebutuhan" value="Jelaskan bantuan yang diharapkan" detail="Misalnya bibit, pendampingan, alat, atau akses program." last />
        </ProgramCard>

        <ProgramSectionTitle eyebrow="USULAN BARU" title="Dukungan apa yang dibutuhkan?" />
        <Text style={[styles.label, { color: colors.foreground }]}>Jenis usulan</Text>
        <View style={styles.categoryWrap}>{complaintCategories.map((item) => <FilterChip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} testID={`complaint-category-${item}`} />)}</View>
        <View style={[styles.categoryHint, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[styles.categoryHintIcon, { backgroundColor: colors.card }]}><BrandIcon name={selectedGuidance.icon} size={16} color={colors.primary} /></View>
          <View style={styles.categoryHintCopy}>
            <Text style={[styles.categoryHintTitle, { color: colors.foreground }]}>{selectedGuidance.title}</Text>
            <Text style={[styles.categoryHintText, { color: colors.mutedForeground }]}>{selectedGuidance.description}</Text>
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Lokasi petani atau lahan</Text>
        <TextInput testID="complaint-location" accessibilityLabel="Lokasi petani atau lahan" value={location} onChangeText={setLocation} placeholder="Contoh: Desa Mekarsari, Blok 2" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Ceritakan kebutuhan dukungan</Text>
        <TextInput testID="complaint-description" accessibilityLabel="Kebutuhan dukungan" value={description} onChangeText={setDescription} multiline numberOfLines={5} textAlignVertical="top" placeholder="Contoh: Ada 12 petani kopi yang belum terdata dan membutuhkan bibit Arabika untuk lahan baru." placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.textarea, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
        <Text style={[styles.fieldNote, { color: colors.mutedForeground }]}>Boleh sertakan nama kelompok atau perkiraan jumlah penerima. Hindari data pribadi yang tidak diperlukan.</Text>
        {feedback ? <View style={[styles.feedback, { backgroundColor: feedback.startsWith('Usulan diterima') ? colors.secondary : colors.muted }]}><BrandIcon name={feedback.startsWith('Usulan diterima') ? 'check' : 'info'} size={16} color={colors.primary} /><Text style={[styles.feedbackText, { color: colors.foreground }]}>{feedback}</Text></View> : null}
        <Pressable testID="submit-complaint" accessibilityRole="button" accessibilityLabel="Kirim usulan dukungan" accessibilityHint="Menyimpan usulan di perangkat ini" onPress={submitComplaint} style={({ pressed }) => [styles.submit, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name="send" size={17} color={colors.primaryForeground} /><Text style={[styles.submitText, { color: colors.primaryForeground }]}>Kirim usulan</Text></Pressable>
        <ProgramSectionTitle eyebrow="RIWAYAT DI PERANGKAT INI" title="Usulan terbaru" />
        {loading ? <View style={[styles.loading, { backgroundColor: colors.muted }]}><View style={[styles.loadingLine, { backgroundColor: colors.border }]} /><View style={[styles.loadingLineShort, { backgroundColor: colors.border }]} /></View> : <><View style={styles.summaryRow}><View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.summaryValue, { color: colors.foreground }]}>{summary.total}</Text><Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Total usulan</Text></View><View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.summaryValue, { color: colors.primary }]}>{summary.received}</Text><Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Diterima</Text></View><View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.summaryValue, { color: colors.accent }]}>{summary.reviewed}</Text><Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Ditinjau</Text></View></View>{complaints.length > 0 ? <View style={styles.history}>{complaints.slice(0, 3).map((item) => <ProgramCard key={item.id}><View style={styles.historyTop}><View style={styles.historyCopy}><Text style={[styles.historyTitle, { color: colors.foreground }]}>{item.category}</Text><Text style={[styles.historyMeta, { color: colors.mutedForeground }]}>{item.location} · {item.createdAt}</Text></View><StatusPill label={item.status} positive={item.status === 'Diterima'} /></View><View style={[styles.historyDivider, { backgroundColor: colors.border }]} /><Text style={[styles.historyDescription, { color: colors.mutedForeground }]}>{item.description}</Text><View style={styles.historyFooter}><BrandIcon name={item.status === 'Diterima' ? 'check' : 'info'} size={13} color={item.status === 'Diterima' ? colors.primary : colors.accent} /><Text style={[styles.historyStatusText, { color: colors.mutedForeground }]}>{item.status === 'Diterima' ? 'Tersimpan dan menunggu peninjauan.' : 'Usulan sedang dipelajari oleh tim.'}</Text></View></ProgramCard>)}</View> : <View style={[styles.empty, { borderColor: colors.border }]}><BrandIcon name="send" size={20} color={colors.primary} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada usulan</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Usulan tentang petani, lahan, atau kebutuhan bantuan akan tersimpan di perangkat ini.</Text></View>}</>}
      </KeyboardAwareScrollViewCompat>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  formScroll: { flex: 1 },
  formContent: { paddingBottom: 80, gap: 12 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 12, marginTop: 3 },
  categoryWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  promiseRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  promiseIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  promiseCopy: { flex: 1, gap: 3 },
  promiseTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
  promiseText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  categoryHint: { borderRadius: 16, borderWidth: 1, padding: 11, flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  categoryHintIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  categoryHintCopy: { flex: 1, gap: 2 },
  categoryHintTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 16 },
  categoryHintText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  input: { minHeight: 50, borderWidth: 1, borderRadius: 15, paddingHorizontal: 14, paddingVertical: 12, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  textarea: { minHeight: 126, lineHeight: 19 },
  fieldNote: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15, marginTop: -3 },
  feedback: { borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  feedbackText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  submit: { minHeight: 51, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 2 },
  submitText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  loading: { borderRadius: 18, padding: 16, gap: 9 },
  loadingLine: { height: 13, width: '72%', borderRadius: 7 },
  loadingLineShort: { height: 10, width: '45%', borderRadius: 5 },
  summaryRow: { flexDirection: 'row', gap: 8 },
  summaryCard: { flex: 1, borderRadius: 15, borderWidth: 1, padding: 11, gap: 3 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 19, lineHeight: 23 },
  summaryLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13 },
  history: { gap: 10 },
  historyTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  historyCopy: { flex: 1, gap: 3 },
  historyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  historyMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  historyDivider: { height: 1, marginVertical: 1 },
  historyDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  historyFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyStatusText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  empty: { minHeight: 120, borderWidth: 1, borderStyle: 'dashed', borderRadius: 19, alignItems: 'center', justifyContent: 'center', gap: 7, padding: 18 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
});