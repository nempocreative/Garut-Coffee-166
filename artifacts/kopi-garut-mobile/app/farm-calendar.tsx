import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { healthCheck, useSyncFarmCalendar } from '@workspace/api-client-react';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEY = '@kopi-garut/farm-calendar';
const SYNC_STATUS_KEY = '@kopi-garut/farm-calendar-sync-status';
const activityTypes = ['Pemupukan', 'Pemangkasan', 'Panen', 'Pengeringan', 'Pengumpulan lot', 'Kunjungan penyuluh'] as const;
const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

type ActivityType = (typeof activityTypes)[number];

type FarmActivity = {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  done: boolean;
};

type SyncStatus = {
  pending: boolean;
  lastSyncedAt: string | null;
};

type ConnectionStatus = 'checking' | 'online' | 'offline';

const activityMeta: Record<ActivityType, { icon: BrandIconName; description: string }> = {
  Pemupukan: { icon: 'trending-up', description: 'Nutrisi dan perawatan tanah' },
  Pemangkasan: { icon: 'grid', description: 'Perawatan tajuk tanaman' },
  Panen: { icon: 'coffee', description: 'Petik buah yang matang' },
  Pengeringan: { icon: 'calendar', description: 'Jaga kadar air dan mutu' },
  'Pengumpulan lot': { icon: 'package', description: 'Satukan hasil berdasarkan lot' },
  'Kunjungan penyuluh': { icon: 'users', description: 'Pendampingan di kebun' },
};

const initialActivities: FarmActivity[] = [
  { id: 'activity-fertilizer', type: 'Pemupukan', title: 'Pemupukan blok utara', date: '2026-09-23', time: '07.00', location: 'Blok Utara', notes: 'Gunakan pupuk organik sesuai catatan kebun.', done: false },
  { id: 'activity-pruning', type: 'Pemangkasan', title: 'Pemangkasan tanaman tua', date: '2026-09-26', time: '07.30', location: 'Blok Selatan', notes: 'Prioritaskan tanaman dengan tajuk terlalu rapat.', done: false },
  { id: 'activity-harvest', type: 'Panen', title: 'Panen Papandayan Series', date: '2026-09-29', time: '06.30', location: 'Blok Utara', notes: 'Petik cherry merah dan pisahkan dari buah cacat.', done: false },
  { id: 'activity-drying', type: 'Pengeringan', title: 'Mulai pengeringan lot', date: '2026-10-01', time: '09.00', location: 'Rumah jemur', notes: 'Catat kadar air setiap sore.', done: false },
  { id: 'activity-collection', type: 'Pengumpulan lot', title: 'Pengumpulan lot panen', date: '2026-10-05', time: '10.00', location: 'Ruang produksi', notes: 'Siapkan label lot dan catatan asal blok.', done: false },
  { id: 'activity-extension', type: 'Kunjungan penyuluh', title: 'Kunjungan Rani Permata', date: '2026-10-07', time: '13.30', location: 'Kebun Asep Hidayat', notes: 'Bahas kondisi daun dan rencana pemupukan.', done: false },
];

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
}

function displayDate(value: string) {
  const date = parseDate(value);
  return date ? date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : value;
}

function monthTitle(date: Date) {
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function syncTimeLabel(value: string | null) {
  if (!value) return 'Belum pernah tersinkron';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Belum pernah tersinkron'
    : `Terakhir terkirim ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
}

export default function FarmCalendarScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const today = toIsoDate(new Date());
  const syncMutation = useSyncFarmCalendar();
  const [activities, setActivities] = useState<FarmActivity[]>(initialActivities);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(today);
  const [type, setType] = useState<ActivityType>('Pemupukan');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('07.00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ pending: false, lastSyncedAt: null });

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(SYNC_STATUS_KEY)]).then(([value, syncValue]) => {
      if (value) {
        try {
          const stored = JSON.parse(value) as FarmActivity[];
          if (Array.isArray(stored)) setActivities(stored);
        } catch {
          setFeedback('Agenda kebun belum dapat dibaca. Agenda contoh tetap ditampilkan.');
        }
      }
      if (syncValue) {
        try {
          const stored = JSON.parse(syncValue) as Partial<SyncStatus>;
          setSyncStatus({
            pending: stored.pending === true,
            lastSyncedAt: typeof stored.lastSyncedAt === 'string' ? stored.lastSyncedAt : null,
          });
        } catch {
          setSyncStatus({ pending: true, lastSyncedAt: null });
        }
      }
    }).catch(() => setFeedback('Agenda kebun belum dapat dimuat.'));
  }, []);

  useEffect(() => {
    let mounted = true;
    const checkConnection = async () => {
      try {
        await healthCheck();
        if (mounted) setConnectionStatus('online');
      } catch {
        if (mounted) setConnectionStatus('offline');
      }
    };

    void checkConnection();
    const interval = setInterval(() => void checkConnection(), 15000);
    const appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void checkConnection();
    });

    return () => {
      mounted = false;
      clearInterval(interval);
      appStateSubscription.remove();
    };
  }, []);

  const calendarCells = useMemo(() => {
    const firstDay = (new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay() + 6) % 7;
    const dayCount = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
    return Array.from({ length: Math.ceil((firstDay + dayCount) / 7) * 7 }, (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= dayCount ? toIsoDate(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day)) : null;
    });
  }, [visibleMonth]);

  const selectedActivities = activities.filter((item) => item.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));
  const upcomingActivities = activities.filter((item) => item.date >= today && !item.done).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 4);

  const persist = async (next: FarmActivity[]) => {
    const queuedStatus: SyncStatus = { pending: true, lastSyncedAt: syncStatus.lastSyncedAt };
    setSyncStatus(queuedStatus);
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)),
        AsyncStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(queuedStatus)),
      ]);
    } catch {
      setFeedback('Perubahan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  const syncSnapshot = useCallback(async (candidate: FarmActivity[]) => {
    if (syncMutation.isPending) return;
    try {
      setFeedback('Mengirim agenda ke server…');
      const result = await syncMutation.mutateAsync({ data: { activities: candidate } });
      const nextStatus: SyncStatus = { pending: false, lastSyncedAt: result.syncedAt };
      setSyncStatus(nextStatus);
      await AsyncStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(nextStatus));
      setConnectionStatus('online');
      setFeedback(`Agenda tersinkron · ${result.acceptedCount} kegiatan terkirim.`);
    } catch {
      setConnectionStatus('offline');
      setSyncStatus((current) => ({ ...current, pending: true }));
      setFeedback('Agenda tersimpan offline. Akan dikirim saat koneksi tersedia.');
    }
  }, [syncMutation]);

  useEffect(() => {
    if (connectionStatus === 'online' && syncStatus.pending && !syncMutation.isPending) {
      void syncSnapshot(activities);
    }
  }, [activities, connectionStatus, syncSnapshot, syncMutation.isPending, syncStatus.pending]);

  const changeMonth = (offset: number) => {
    const next = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + offset, 1);
    setVisibleMonth(next);
    setSelectedDate(toIsoDate(next));
  };

  const addActivity = async () => {
    if (!title.trim() || !parseDate(date)) {
      setFeedback('Lengkapi nama kegiatan dan tanggal dengan format YYYY-MM-DD.');
      return;
    }
    const nextActivity: FarmActivity = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: title.trim(),
      date,
      time: time.trim() || '07.00',
      location: location.trim() || 'Kebun',
      notes: notes.trim(),
      done: false,
    };
    const next = [...activities, nextActivity].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
    setActivities(next);
    setSelectedDate(date);
    const parsed = parseDate(date);
    if (parsed) setVisibleMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    setTitle('');
    setLocation('');
    setNotes('');
    setFeedback('Kegiatan kebun ditambahkan ke kalender.');
    await persist(next);
  };

  const toggleActivity = async (activity: FarmActivity) => {
    const next = activities.map((item) => item.id === activity.id ? { ...item, done: !item.done } : item);
    setActivities(next);
    setFeedback(activity.done ? 'Kegiatan dibuka kembali.' : 'Kegiatan ditandai selesai.');
    await persist(next);
  };

  const syncAccent = connectionStatus === 'offline' ? colors.accent : colors.primary;
  const syncTitle = connectionStatus === 'offline'
    ? 'Mode offline'
    : syncMutation.isPending
      ? 'Mengirim agenda'
      : syncStatus.pending
        ? 'Menunggu sinkronisasi'
        : connectionStatus === 'checking'
          ? 'Memeriksa koneksi'
          : 'Kalender tersinkron';
  const syncDescription = connectionStatus === 'offline'
    ? 'Data tetap tersimpan di perangkat dan akan dikirim otomatis saat sinyal tersedia.'
    : syncMutation.isPending
      ? 'Jangan tutup halaman sampai pengiriman selesai.'
      : syncStatus.pending
        ? 'Agenda lokal siap dikirim saat koneksi kembali.'
        : syncTimeLabel(syncStatus.lastSyncedAt);

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding }]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title="Kalender kebun" subtitle="PETANI · AGENDA" cart={false} notifications />
      <ProgramIntro
        eyebrow="RITME KEBUN"
        title="Satu kalender untuk setiap langkah."
        description="Atur pekerjaan kebun dari pemupukan sampai lot siap dikumpulkan, tanpa kehilangan jadwal kunjungan penyuluh."
      />
      <View style={[styles.syncCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.syncIcon, { backgroundColor: `${syncAccent}1A` }]}>
          <BrandIcon name={connectionStatus === 'offline' ? 'alert-circle' : syncStatus.pending ? 'repeat' : 'check'} size={18} color={syncAccent} />
        </View>
        <View style={styles.syncCopy}>
          <View style={styles.syncTitleRow}>
            <Text style={[styles.syncTitle, { color: colors.foreground }]}>{syncTitle}</Text>
            <View style={[styles.syncDot, { backgroundColor: syncAccent }]} />
          </View>
          <Text style={[styles.syncDescription, { color: colors.mutedForeground }]}>{syncDescription}</Text>
        </View>
      </View>

      <View style={[styles.monthCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.monthHeader}>
          <View>
            <Text style={[styles.monthKicker, { color: colors.primary }]}>AGENDA BULAN INI</Text>
            <Text style={[styles.monthTitle, { color: colors.foreground }]}>{monthTitle(visibleMonth)}</Text>
          </View>
          <View style={styles.monthActions}>
            <Pressable testID="farm-calendar-previous" accessibilityRole="button" accessibilityLabel="Bulan sebelumnya" onPress={() => changeMonth(-1)} style={({ pressed }) => [styles.monthButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.7 : 1 }]}><BrandIcon name="arrow-left" size={16} color={colors.foreground} /></Pressable>
            <Pressable testID="farm-calendar-next" accessibilityRole="button" accessibilityLabel="Bulan berikutnya" onPress={() => changeMonth(1)} style={({ pressed }) => [styles.monthButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.7 : 1 }]}><BrandIcon name="chevron-right" size={16} color={colors.foreground} /></Pressable>
          </View>
        </View>
        <View style={styles.weekRow}>{weekDays.map((day) => <Text key={day} style={[styles.weekDay, { color: colors.mutedForeground }]}>{day}</Text>)}</View>
        <View style={styles.calendarGrid}>
          {calendarCells.map((cell, index) => {
            const dayActivities = cell ? activities.filter((item) => item.date === cell) : [];
            const selected = cell === selectedDate;
            const isToday = cell === today;
            return (
              <Pressable
                key={`${cell ?? 'empty'}-${index}`}
                disabled={!cell}
                testID={cell ? `farm-calendar-day-${cell}` : undefined}
                accessibilityRole={cell ? 'button' : undefined}
                accessibilityLabel={cell ? `Pilih ${displayDate(cell)}` : undefined}
                onPress={() => cell && setSelectedDate(cell)}
                style={({ pressed }) => [styles.dayCell, selected && { backgroundColor: colors.primary }, isToday && !selected && { borderColor: colors.primary, borderWidth: 1 }, { opacity: pressed ? 0.72 : 1 }]}
              >
                {cell && <Text style={[styles.dayNumber, { color: selected ? colors.primaryForeground : colors.foreground }]}>{Number(cell.slice(-2))}</Text>}
                {cell && dayActivities.length > 0 && <View style={styles.dayDots}>{dayActivities.slice(0, 3).map((item) => <View key={item.id} style={[styles.dayDot, { backgroundColor: selected ? colors.primaryForeground : item.done ? colors.mutedForeground : colors.accent }]} />)}</View>}
              </Pressable>
            );
          })}
        </View>
        <View style={styles.calendarLegend}><View style={[styles.legendDot, { backgroundColor: colors.accent }]} /><Text style={[styles.legendText, { color: colors.mutedForeground }]}>Ada kegiatan</Text><View style={[styles.legendDot, { backgroundColor: colors.primary }]} /><Text style={[styles.legendText, { color: colors.mutedForeground }]}>Hari ini</Text></View>
      </View>

      <ProgramSectionTitle eyebrow={`AGENDA ${displayDate(selectedDate).toUpperCase()}`} title="Kegiatan hari ini" />
      {selectedActivities.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada kegiatan</Text><Text style={[styles.helper, { color: colors.mutedForeground }]}>Pilih hari lain atau tambahkan kegiatan baru di bawah.</Text></ProgramCard>
      ) : (
        <View style={styles.activityList}>
          {selectedActivities.map((activity) => (
            <ProgramCard key={activity.id}>
              <View style={styles.activityTop}>
                <View style={[styles.activityIcon, { backgroundColor: activity.done ? colors.muted : colors.secondary }]}><BrandIcon name={activityMeta[activity.type].icon} size={17} color={activity.done ? colors.mutedForeground : colors.primary} /></View>
                <View style={styles.activityCopy}>
                  <Text style={[styles.activityType, { color: activity.done ? colors.mutedForeground : colors.primary }]}>{activity.type}</Text>
                  <Text style={[styles.activityTitle, { color: colors.foreground }, activity.done && styles.doneText]}>{activity.title}</Text>
                  <Text style={[styles.activityMeta, { color: colors.mutedForeground }]}>{activity.time} · {activity.location}</Text>
                </View>
                <StatusPill label={activity.done ? 'Selesai' : 'Terjadwal'} positive={activity.done} />
              </View>
              {!!activity.notes && <Text style={[styles.activityNotes, { color: colors.mutedForeground }]}>{activity.notes}</Text>}
              <Pressable testID={`farm-calendar-toggle-${activity.id}`} accessibilityRole="button" accessibilityLabel={activity.done ? `Buka kembali ${activity.title}` : `Tandai ${activity.title} selesai`} onPress={() => void toggleActivity(activity)} style={({ pressed }) => [styles.toggleButton, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}>
                <BrandIcon name={activity.done ? 'repeat' : 'check'} size={14} color={colors.primary} />
                <Text style={[styles.toggleText, { color: colors.primary }]}>{activity.done ? 'Buka kembali' : 'Tandai selesai'}</Text>
              </Pressable>
            </ProgramCard>
          ))}
        </View>
      )}

      <ProgramSectionTitle eyebrow="01 · AGENDA BARU" title="Tambah kegiatan kebun" />
      <ProgramCard>
        <Text style={[styles.label, { color: colors.foreground }]}>Jenis kegiatan</Text>
        <View style={styles.typeWrap}>{activityTypes.map((item) => <FilterChip key={item} label={item} selected={type === item} onPress={() => setType(item)} testID={`farm-calendar-type-${item.toLowerCase().replaceAll(' ', '-')}`} />)}</View>
        <Text style={[styles.label, { color: colors.foreground }]}>Nama kegiatan</Text>
        <TextInput testID="farm-calendar-title" accessibilityLabel="Nama kegiatan kebun" value={title} onChangeText={setTitle} placeholder={activityMeta[type].description} placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Tanggal</Text>
            <TextInput testID="farm-calendar-date" accessibilityLabel="Tanggal kegiatan kebun" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={colors.mutedForeground} keyboardType="numbers-and-punctuation" style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
          <View style={styles.inputHalf}>
            <Text style={[styles.label, { color: colors.foreground }]}>Jam</Text>
            <TextInput testID="farm-calendar-time" accessibilityLabel="Jam kegiatan kebun" value={time} onChangeText={setTime} placeholder="07.00" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.foreground }]}>Lokasi</Text>
        <TextInput testID="farm-calendar-location" accessibilityLabel="Lokasi kegiatan kebun" value={location} onChangeText={setLocation} placeholder="Contoh: Blok Utara" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.foreground }]}>Catatan (opsional)</Text>
        <TextInput testID="farm-calendar-notes" accessibilityLabel="Catatan kegiatan kebun" value={notes} onChangeText={setNotes} placeholder="Hal yang perlu disiapkan" placeholderTextColor={colors.mutedForeground} multiline style={[styles.input, styles.notesInput, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]} />
      </ProgramCard>
      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('ditambahkan') || feedback.includes('selesai') || feedback.includes('dibuka') || feedback.includes('tersinkron') || feedback.includes('offline') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <Pressable testID="farm-calendar-save" accessibilityRole="button" accessibilityLabel="Simpan kegiatan kebun" onPress={() => void addActivity()} style={({ pressed }) => [styles.saveButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
        <BrandIcon name="calendar" size={17} color={colors.primaryForeground} />
        <Text style={[styles.saveText, { color: colors.primaryForeground }]}>Simpan ke kalender</Text>
      </Pressable>

      <ProgramSectionTitle eyebrow="AGENDA BERIKUTNYA" title="Yang perlu disiapkan" />
      {upcomingActivities.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Semua agenda selesai</Text><Text style={[styles.helper, { color: colors.mutedForeground }]}>Tambahkan kegiatan baru untuk menjaga ritme kebun.</Text></ProgramCard>
      ) : (
        <View style={styles.upcomingList}>
          {upcomingActivities.map((activity) => <Pressable key={activity.id} onPress={() => { setSelectedDate(activity.date); const parsed = parseDate(activity.date); if (parsed) setVisibleMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1)); }} style={({ pressed }) => [styles.upcomingItem, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}><View style={[styles.upcomingDate, { backgroundColor: colors.secondary }]}><Text style={[styles.upcomingDay, { color: colors.primary }]}>{parseDate(activity.date)?.getDate()}</Text><Text style={[styles.upcomingMonth, { color: colors.primary }]}>{parseDate(activity.date)?.toLocaleDateString('id-ID', { month: 'short' })}</Text></View><View style={styles.upcomingCopy}><Text style={[styles.upcomingType, { color: colors.primary }]}>{activity.type}</Text><Text style={[styles.upcomingTitle, { color: colors.foreground }]}>{activity.title}</Text><Text style={[styles.upcomingMeta, { color: colors.mutedForeground }]}>{activity.time} · {activity.location}</Text></View><BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} /></Pressable>)}
        </View>
      )}
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 17, gap: 12 },
  monthCard: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 13 },
  syncCard: { borderWidth: 1, borderRadius: 17, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  syncIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  syncCopy: { flex: 1, gap: 3 },
  syncTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  syncTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  syncDot: { width: 6, height: 6, borderRadius: 3 },
  syncDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  monthHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  monthKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.2 },
  monthTitle: { fontFamily: 'Manrope_700Bold', fontSize: 20, marginTop: 3 },
  monthActions: { flexDirection: 'row', gap: 7 },
  monthButton: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  weekRow: { flexDirection: 'row' },
  weekDay: { flex: 1, textAlign: 'center', fontFamily: 'Manrope_700Bold', fontSize: 9 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 5 },
  dayCell: { width: `${100 / 7}%`, height: 41, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 3 },
  dayNumber: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  dayDots: { flexDirection: 'row', gap: 2 },
  dayDot: { width: 4, height: 4, borderRadius: 2 },
  calendarLegend: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 6, height: 6, borderRadius: 3, marginLeft: 4 },
  legendText: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  activityList: { gap: 10 },
  activityTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  activityIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activityCopy: { flex: 1, gap: 2 },
  activityType: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 0.8 },
  activityTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  doneText: { textDecorationLine: 'line-through' },
  activityMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  activityNotes: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  toggleButton: { minHeight: 33, borderWidth: 1, borderRadius: 11, alignSelf: 'flex-start', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  toggleText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  typeWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 5 },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 11, marginBottom: 6 },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1 },
  input: { minHeight: 46, borderWidth: 1, borderRadius: 13, paddingHorizontal: 12, fontFamily: 'Manrope_400Regular', fontSize: 12, marginBottom: 12 },
  notesInput: { minHeight: 74, paddingTop: 11, textAlignVertical: 'top' },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  saveButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  saveText: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  upcomingList: { gap: 9 },
  upcomingItem: { minHeight: 72, borderWidth: 1, borderRadius: 17, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 10 },
  upcomingDate: { width: 43, height: 45, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  upcomingDay: { fontFamily: 'Manrope_700Bold', fontSize: 16 },
  upcomingMonth: { fontFamily: 'Manrope_700Bold', fontSize: 9, textTransform: 'uppercase' },
  upcomingCopy: { flex: 1, gap: 2 },
  upcomingType: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 0.8 },
  upcomingTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 16 },
  upcomingMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 18 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});