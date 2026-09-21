import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExtensionNotification, EXTENSION_NOTIFICATIONS_STORAGE_KEY } from '@/data/extension-support';

const STORAGE_KEY = '@kopi-garut/extension-visits';
const visitStatuses = ['Terjadwal', 'Selesai'] as const;
const filters = ['Semua', 'Terjadwal', 'Selesai'] as const;
const conditions = ['Baik', 'Baik dengan catatan', 'Perlu perhatian'] as const;

type VisitStatus = (typeof visitStatuses)[number];
type VisitCondition = (typeof conditions)[number];
type VisitFilter = (typeof filters)[number];

type FieldVisit = {
  id: string;
  farmerId?: string;
  farmer: string;
  group: string;
  location: string;
  date: string;
  time: string;
  purpose: string;
  condition: VisitCondition;
  issue: string;
  recommendation: string;
  followUp: string;
  status: VisitStatus;
};

const initialVisits: FieldVisit[] = [
  {
    id: 'visit-iis-20260919',
    farmerId: 'iis-nurhayati',
    farmer: 'Iis Nurhayati',
    group: 'KTH Cikuray Mandiri',
    location: 'Mekarsari, Cikajang',
    date: '2026-09-19',
    time: '08.00',
    purpose: 'Pemeriksaan blok setelah hujan panjang',
    condition: 'Baik dengan catatan',
    issue: 'Daun menguning di blok 2 dan aliran air belum lancar.',
    recommendation: 'Perbaiki drainase dan lakukan pemupukan berimbang setelah tanah tidak jenuh.',
    followUp: 'Minta foto tindak lanjut pada kunjungan berikutnya.',
    status: 'Selesai',
  },
  {
    id: 'visit-asep-20260923',
    farmerId: 'asep-rahmat',
    farmer: 'Asep Hidayat',
    group: 'KTH Papandayan Lestari',
    location: 'Sirnajaya, Cisurupan',
    date: '2026-09-23',
    time: '07.30',
    purpose: 'Pendampingan persiapan panen',
    condition: 'Baik',
    issue: 'Pemetikan cherry merah perlu diseragamkan per blok.',
    recommendation: 'Gunakan keranjang panen terpisah dan ulangi pengarahan sortasi.',
    followUp: 'Cek sampel hasil sortasi di rumah produksi.',
    status: 'Terjadwal',
  },
  {
    id: 'visit-deni-20260925',
    farmerId: 'deni-suhendar',
    farmer: 'Deni Suhendar',
    group: 'KTH Mekar Tani',
    location: 'Pakenjeng',
    date: '2026-09-25',
    time: '13.00',
    purpose: 'Evaluasi pengeringan lot',
    condition: 'Perlu perhatian',
    issue: 'Kadar air belum stabil saat sore hari.',
    recommendation: 'Atur ketebalan hamparan dan catat kadar air dua kali sehari.',
    followUp: 'Bawa alat ukur saat kunjungan berikutnya.',
    status: 'Terjadwal',
  },
  {
    id: 'visit-iis-20260912',
    farmerId: 'iis-nurhayati',
    farmer: 'Iis Nurhayati',
    group: 'KTH Cikuray Mandiri',
    location: 'Mekarsari, Cikajang',
    date: '2026-09-12',
    time: '09.00',
    purpose: 'Pemetaan kondisi kebun',
    condition: 'Baik',
    issue: 'Naungan kebun cukup dan tanaman produktif.',
    recommendation: 'Pertahankan sanitasi kebun dan siapkan catatan panen per blok.',
    followUp: 'Tidak ada catatan terbuka.',
    status: 'Selesai',
  },
];

function todayIso() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function displayDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ExtensionVisitsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const [visits, setVisits] = useState<FieldVisit[]>(initialVisits);
  const [filter, setFilter] = useState<VisitFilter>('Semua');
  const [farmer, setFarmer] = useState('');
  const [group, setGroup] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(todayIso());
  const [time, setTime] = useState('07.30');
  const [purpose, setPurpose] = useState('');
  const [condition, setCondition] = useState<VisitCondition>('Baik');
  const [issue, setIssue] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [status, setStatus] = useState<VisitStatus>('Terjadwal');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const stored = JSON.parse(value) as FieldVisit[];
        if (Array.isArray(stored)) setVisits(stored);
      } catch {
        setFeedback('Catatan kunjungan belum dapat dibaca. Data contoh tetap ditampilkan.');
      }
    }).catch(() => setFeedback('Catatan kunjungan belum dapat dimuat.'));
  }, []);

  const visibleVisits = useMemo(
    () => filter === 'Semua' ? visits : visits.filter((visit) => visit.status === filter),
    [filter, visits],
  );
  const completedCount = visits.filter((visit) => visit.status === 'Selesai').length;
  const scheduledCount = visits.filter((visit) => visit.status === 'Terjadwal').length;
  const attentionCount = visits.filter((visit) => visit.condition === 'Perlu perhatian').length;

  const persist = async (next: FieldVisit[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setFeedback('Perubahan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const saveVisit = async () => {
    if (!farmer.trim() || !location.trim() || !date.trim() || !purpose.trim()) {
      setFeedback('Lengkapi nama petani, lokasi, tanggal, dan tujuan kunjungan.');
      return;
    }

    const nextVisit: FieldVisit = {
      id: createId(),
      farmerId: farmer.trim().toLowerCase().includes('iis') ? 'iis-nurhayati' : farmer.trim().toLowerCase().includes('deni') ? 'deni-suhendar' : farmer.trim().toLowerCase().includes('ujang') ? 'ujang-kusnadi' : 'asep-rahmat',
      farmer: farmer.trim(),
      group: group.trim() || 'Kelompok tani belum diisi',
      location: location.trim(),
      date: date.trim(),
      time: time.trim() || '07.30',
      purpose: purpose.trim(),
      condition,
      issue: issue.trim() || 'Belum ada catatan masalah.',
      recommendation: recommendation.trim() || 'Belum ada rekomendasi lanjutan.',
      followUp: status === 'Selesai' ? 'Catatan kunjungan selesai ditinjau.' : 'Siapkan bahan pendampingan sebelum tanggal kunjungan.',
      status,
    };
    const next = [nextVisit, ...visits];
    setVisits(next);
    await persist(next);
    setFarmer('');
    setGroup('');
    setLocation('');
    setDate(todayIso());
    setTime('07.30');
    setPurpose('');
    setCondition('Baik');
    setIssue('');
    setRecommendation('');
    setStatus('Terjadwal');
    setFeedback('Kunjungan lapangan berhasil disimpan.');
    const notification: ExtensionNotification = {
      id: `${Date.now()}-visit`,
      audience: 'petani',
      farmerId: nextVisit.farmerId,
      title: status === 'Selesai' ? 'Riwayat kunjungan diperbarui' : 'Kunjungan penyuluh dijadwalkan',
      detail: `${nextVisit.date} · ${nextVisit.purpose}`,
      type: 'Tindak lanjut',
      time: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      icon: 'calendar',
      route: '/farm-issues',
      action: 'Lihat pendampingan',
      priority: status === 'Selesai' ? 'positive' : 'normal',
    };
    try {
      const storedNotifications = await AsyncStorage.getItem(EXTENSION_NOTIFICATIONS_STORAGE_KEY);
      const previous = storedNotifications ? JSON.parse(storedNotifications) as ExtensionNotification[] : [];
      await AsyncStorage.setItem(EXTENSION_NOTIFICATIONS_STORAGE_KEY, JSON.stringify([notification, ...previous]));
    } catch {
      setFeedback('Kunjungan tersimpan, tetapi notifikasi petani belum tersimpan.');
    }
  };

  const completeVisit = async (visit: FieldVisit) => {
    const next = visits.map((item) => item.id === visit.id ? { ...item, status: 'Selesai' as const } : item);
    setVisits(next);
    await persist(next);
    setFeedback(`Kunjungan ${visit.farmer} ditandai selesai.`);
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Kunjungan lapangan" subtitle="PENYULUH · AGENDA" cart={false} notifications />
      <ProgramIntro
        eyebrow="CATATAN PENDAMPINGAN"
        title="Setiap kunjungan punya tindak lanjut."
        description="Simpan temuan di kebun, rekomendasi yang diberikan, dan rencana kunjungan berikutnya dalam satu catatan."
      />

      <View style={styles.metrics}>
        <Metric icon="map-pin" value={String(visits.length)} label="Total kunjungan" colors={colors} />
        <Metric icon="calendar" value={String(scheduledCount)} label="Terjadwal" colors={colors} />
        <Metric icon="check" value={String(completedCount)} label="Selesai" colors={colors} />
        <Metric icon="alert-circle" value={String(attentionCount)} label="Perlu perhatian" colors={colors} />
      </View>

      <ProgramSectionTitle eyebrow="AGENDA PENYULUH" title="Daftar kunjungan" />
      <View style={styles.filters}>
        {filters.map((item) => (
          <FilterChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} testID={`extension-visits-filter-${item.toLowerCase()}`} />
        ))}
      </View>

      {visibleVisits.length === 0 ? (
        <ProgramCard muted>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada kunjungan di filter ini</Text>
          <Text style={[styles.helper, { color: colors.mutedForeground }]}>Tambahkan catatan baru untuk mulai membangun riwayat pendampingan.</Text>
        </ProgramCard>
      ) : (
        <View style={styles.visitList}>
          {visibleVisits.map((visit) => (
            <ProgramCard key={visit.id}>
              <View style={styles.visitTop}>
                <View style={[styles.visitIcon, { backgroundColor: visit.condition === 'Perlu perhatian' ? `${colors.accent}2A` : colors.secondary }]}>
                  <BrandIcon name={visit.condition === 'Perlu perhatian' ? 'alert-circle' : 'map-pin'} size={18} color={visit.condition === 'Perlu perhatian' ? colors.accent : colors.primary} />
                </View>
                <View style={styles.visitCopy}>
                  <Text style={[styles.visitFarmer, { color: colors.foreground }]}>{visit.farmer}</Text>
                  <Text style={[styles.visitGroup, { color: colors.primary }]}>{visit.group}</Text>
                  <Text style={[styles.visitMeta, { color: colors.mutedForeground }]}>{displayDate(visit.date)} · {visit.time}</Text>
                </View>
                <StatusPill label={visit.status} positive={visit.status === 'Selesai'} />
              </View>
              <View style={[styles.locationRow, { borderTopColor: colors.border }]}>
                <BrandIcon name="map-pin" size={13} color={colors.mutedForeground} />
                <Text style={[styles.locationText, { color: colors.mutedForeground }]}>{visit.location}</Text>
              </View>
              <Text style={[styles.purpose, { color: colors.foreground }]}>{visit.purpose}</Text>
              <View style={styles.noteStack}>
                <Note icon="alert-circle" label="Temuan" value={visit.issue} colors={colors} />
                <Note icon="check" label="Rekomendasi" value={visit.recommendation} colors={colors} />
                <Note icon="calendar" label="Tindak lanjut" value={visit.followUp} colors={colors} last />
              </View>
              {visit.status === 'Terjadwal' && (
                <Pressable testID={`extension-visit-complete-${visit.id}`} accessibilityRole="button" accessibilityLabel={`Tandai kunjungan ${visit.farmer} selesai`} onPress={() => void completeVisit(visit)} style={({ pressed }) => [styles.completeButton, { borderColor: colors.primary, opacity: pressed ? 0.7 : 1 }]}>
                  <BrandIcon name="check" size={14} color={colors.primary} />
                  <Text style={[styles.completeText, { color: colors.primary }]}>Tandai selesai</Text>
                </Pressable>
              )}
            </ProgramCard>
          ))}
        </View>
      )}

      <ProgramSectionTitle eyebrow="CATATAN BARU" title="Tambah kunjungan lapangan" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Nama petani</Text>
        <TextInput testID="extension-visit-farmer" accessibilityLabel="Nama petani" value={farmer} onChangeText={setFarmer} placeholder="Contoh: Asep Hidayat" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Kelompok tani</Text>
        <TextInput testID="extension-visit-group" accessibilityLabel="Kelompok tani" value={group} onChangeText={setGroup} placeholder="Contoh: KTH Cikuray Mandiri" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Lokasi kebun</Text>
        <TextInput testID="extension-visit-location" accessibilityLabel="Lokasi kebun" value={location} onChangeText={setLocation} placeholder="Contoh: Mekarsari, Cikajang" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Tanggal</Text>
            <TextInput testID="extension-visit-date" accessibilityLabel="Tanggal kunjungan" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={colors.mutedForeground} keyboardType="numbers-and-punctuation" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Jam</Text>
            <TextInput testID="extension-visit-time" accessibilityLabel="Jam kunjungan" value={time} onChangeText={setTime} placeholder="07.30" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Tujuan kunjungan</Text>
        <TextInput testID="extension-visit-purpose" accessibilityLabel="Tujuan kunjungan" value={purpose} onChangeText={setPurpose} placeholder="Contoh: Pemeriksaan blok setelah hujan" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Kondisi kebun</Text>
        <View style={styles.chipWrap}>
          {conditions.map((item) => <FilterChip key={item} label={item} selected={condition === item} onPress={() => setCondition(item)} testID={`extension-visit-condition-${item.toLowerCase().replaceAll(' ', '-')}`} />)}
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Status catatan</Text>
        <View style={styles.chipWrap}>
          {visitStatuses.map((item) => <FilterChip key={item} label={item} selected={status === item} onPress={() => setStatus(item)} testID={`extension-visit-status-${item.toLowerCase()}`} />)}
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Temuan di lapangan</Text>
        <TextInput testID="extension-visit-issue" accessibilityLabel="Temuan di lapangan" value={issue} onChangeText={setIssue} placeholder="Apa yang terlihat di kebun?" placeholderTextColor={colors.mutedForeground} multiline style={[styles.input, styles.notesInput, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Rekomendasi</Text>
        <TextInput testID="extension-visit-recommendation" accessibilityLabel="Rekomendasi kunjungan" value={recommendation} onChangeText={setRecommendation} placeholder="Arahan yang diberikan kepada petani" placeholderTextColor={colors.mutedForeground} multiline style={[styles.input, styles.notesInput, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
      </ProgramCard>

      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('berhasil') || feedback.includes('ditandai') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable testID="extension-visit-save" accessibilityRole="button" accessibilityLabel="Simpan kunjungan lapangan" onPress={() => void saveVisit()} style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
        <BrandIcon name="map-pin" size={17} color={colors.primaryForeground} />
        <Text style={[styles.saveText, { color: colors.primaryForeground }]}>Simpan kunjungan</Text>
      </Pressable>
    </KeyboardAwareScrollViewCompat>
  );
}

function Metric({ icon, value, label, colors }: { icon: BrandIconName; value: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[styles.metric, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.metricIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={16} color={colors.primary} /></View>
      <Text style={[styles.metricValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function Note({ icon, label, value, colors, last = false }: { icon: BrandIconName; label: string; value: string; colors: ReturnType<typeof useColors>; last?: boolean }) {
  return (
    <View style={[styles.note, !last && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
      <View style={[styles.noteIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={14} color={colors.primary} /></View>
      <View style={styles.noteCopy}>
        <Text style={[styles.noteLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <Text style={[styles.noteValue, { color: colors.foreground }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  metric: { width: '48.5%', borderWidth: 1, borderRadius: 17, padding: 12, gap: 4 },
  metricIcon: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  metricValue: { fontFamily: 'Manrope_700Bold', fontSize: 20 },
  metricLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  visitList: { gap: 10 },
  visitTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  visitIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  visitCopy: { flex: 1, gap: 2 },
  visitFarmer: { fontFamily: 'Manrope_700Bold', fontSize: 14 },
  visitGroup: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  visitMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  locationRow: { borderTopWidth: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  locationText: { fontFamily: 'Manrope_400Regular', fontSize: 10.5 },
  purpose: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  noteStack: { gap: 0 },
  note: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, paddingVertical: 9 },
  noteIcon: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  noteCopy: { flex: 1, gap: 2 },
  noteLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  noteValue: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  completeButton: { minHeight: 35, borderWidth: 1, borderRadius: 11, alignSelf: 'flex-start', paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 6 },
  completeText: { fontFamily: 'Manrope_700Bold', fontSize: 10.5 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 6 },
  input: { minHeight: 46, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_400Regular', fontSize: 12, marginBottom: 12 },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1 },
  notesInput: { minHeight: 75, paddingTop: 11, textAlignVertical: 'top' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 7 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  saveButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  saveText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, marginBottom: 4 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});