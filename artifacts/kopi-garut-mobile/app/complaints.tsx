import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { Complaint, ComplaintCategory, complaintCategories } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/program-complaints';

export default function ComplaintsScreen() {
  const colors = useColors();
  const [category, setCategory] = useState<ComplaintCategory>('Hama & penyakit');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

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
      setFeedback('Lengkapi lokasi dan uraian masalah sebelum mengirim.');
      return;
    }
    const next: Complaint = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, category, location: location.trim(), description: description.trim(), status: 'Diterima', createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) };
    const updated = [next, ...complaints];
    setComplaints(updated);
    setLocation('');
    setDescription('');
    setFeedback('Laporan diterima. Tim program akan meninjau dan menghubungi kamu bila perlu.');
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { setFeedback('Laporan tampil di layar, tetapi belum tersimpan di perangkat.'); }
  };

  return (
    <Screen scroll={false} style={styles.screen}>
      <Header back title="Keluhan & masukan" subtitle="PROGRAM · DUKUNGAN" />
      <KeyboardAwareScrollViewCompat style={styles.formScroll} contentContainerStyle={styles.formContent} bottomOffset={28} keyboardShouldPersistTaps="handled">
        <ProgramIntro eyebrow="SUARA DARI LAPANGAN" title="Ceritakan yang perlu dibenahi." description="Masukan tentang kebun dan usaha membantu tim Kopi Garut menyiapkan dukungan yang lebih tepat." />
        <ProgramSectionTitle eyebrow="LAPORAN BARU" title="Apa yang terjadi?" />
        <Text style={[styles.label, { color: colors.foreground }]}>Kategori masalah</Text>
        <View style={styles.categoryWrap}>{complaintCategories.map((item) => <FilterChip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} testID={`complaint-category-${item}`} />)}</View>
        <Text style={[styles.label, { color: colors.foreground }]}>Lokasi kebun atau usaha</Text>
        <TextInput testID="complaint-location" accessibilityLabel="Lokasi kebun atau usaha" value={location} onChangeText={setLocation} placeholder="Contoh: Blok 2, Mekarsari" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Uraian masalah</Text>
        <TextInput testID="complaint-description" accessibilityLabel="Uraian masalah" value={description} onChangeText={setDescription} multiline numberOfLines={5} textAlignVertical="top" placeholder="Jelaskan kondisi, dampak, dan dukungan yang dibutuhkan." placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.textarea, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
        {feedback ? <View style={[styles.feedback, { backgroundColor: feedback.startsWith('Laporan diterima') ? colors.secondary : colors.muted }]}><BrandIcon name={feedback.startsWith('Laporan diterima') ? 'check' : 'info'} size={16} color={colors.primary} /><Text style={[styles.feedbackText, { color: colors.foreground }]}>{feedback}</Text></View> : null}
        <Pressable testID="submit-complaint" accessibilityRole="button" accessibilityLabel="Kirim keluhan dan masukan" onPress={submitComplaint} style={({ pressed }) => [styles.submit, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name="send" size={17} color={colors.primaryForeground} /><Text style={[styles.submitText, { color: colors.primaryForeground }]}>Kirim masukan</Text></Pressable>
        <ProgramSectionTitle eyebrow="RIWAYAT DI PERANGKAT INI" title="Laporan terbaru" />
        {loading ? <View style={[styles.loading, { backgroundColor: colors.muted }]}><View style={[styles.loadingLine, { backgroundColor: colors.border }]} /><View style={[styles.loadingLineShort, { backgroundColor: colors.border }]} /></View> : complaints.length > 0 ? <View style={styles.history}>{complaints.slice(0, 3).map((item) => <ProgramCard key={item.id}><View style={styles.historyTop}><View style={styles.historyCopy}><Text style={[styles.historyTitle, { color: colors.foreground }]}>{item.category}</Text><Text style={[styles.historyMeta, { color: colors.mutedForeground }]}>{item.location} · {item.createdAt}</Text></View><StatusPill label={item.status} /></View><Text style={[styles.historyDescription, { color: colors.mutedForeground }]}>{item.description}</Text></ProgramCard>)}</View> : <View style={[styles.empty, { borderColor: colors.border }]}><BrandIcon name="send" size={20} color={colors.primary} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada laporan</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Laporan yang kamu kirim akan muncul di sini.</Text></View>}
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
  input: { minHeight: 50, borderWidth: 1, borderRadius: 15, paddingHorizontal: 14, paddingVertical: 12, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  textarea: { minHeight: 126, lineHeight: 19 },
  feedback: { borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  feedbackText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  submit: { minHeight: 51, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 2 },
  submitText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  loading: { borderRadius: 18, padding: 16, gap: 9 },
  loadingLine: { height: 13, width: '72%', borderRadius: 7 },
  loadingLineShort: { height: 10, width: '45%', borderRadius: 5 },
  history: { gap: 10 },
  historyTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  historyCopy: { flex: 1, gap: 3 },
  historyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  historyMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  historyDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  empty: { minHeight: 120, borderWidth: 1, borderStyle: 'dashed', borderRadius: 19, alignItems: 'center', justifyContent: 'center', gap: 7, padding: 18 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
});