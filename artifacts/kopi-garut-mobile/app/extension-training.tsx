import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/extension-training';
const filters = ['Semua', 'Mendatang', 'Selesai'] as const;
const attendanceStatuses = ['Hadir', 'Izin', 'Belum diisi'] as const;

type TrainingFilter = (typeof filters)[number];
type AttendanceStatus = (typeof attendanceStatuses)[number];

type Participant = {
  id: string;
  name: string;
  group: string;
  attendance: AttendanceStatus;
};

type TrainingSession = {
  id: string;
  title: string;
  topic: string;
  date: string;
  time: string;
  location: string;
  group: string;
  facilitator: string;
  status: 'Mendatang' | 'Selesai';
  participants: Participant[];
};

const initialSessions: TrainingSession[] = [
  {
    id: 'training-sortasi-20260929',
    title: 'Sortasi & defect kopi',
    topic: 'Pascapanen',
    date: '29 September 2026',
    time: '09.00–11.30',
    location: 'Rumah Produksi Cikuray',
    group: 'KTH Cikuray Mandiri',
    facilitator: 'Rani Permata',
    status: 'Mendatang',
    participants: [
      { id: 'asep-hidayat', name: 'Asep Hidayat', group: 'KTH Cikuray Mandiri', attendance: 'Hadir' },
      { id: 'iis-nurhayati', name: 'Iis Nurhayati', group: 'KTH Cikuray Mandiri', attendance: 'Hadir' },
      { id: 'siti-maesaroh', name: 'Siti Maesaroh', group: 'KTH Cikuray Mandiri', attendance: 'Belum diisi' },
      { id: 'yayan-sobandi', name: 'Yayan Sobandi', group: 'KTH Cikuray Mandiri', attendance: 'Belum diisi' },
      { id: 'dede-suryana', name: 'Dede Suryana', group: 'KTH Cikuray Mandiri', attendance: 'Izin' },
    ],
  },
  {
    id: 'training-naungan-20260918',
    title: 'Perawatan naungan kebun',
    topic: 'Budidaya',
    date: '18 September 2026',
    time: '08.30–11.00',
    location: 'Balai Penyuluhan Cikajang',
    group: 'KTH Papandayan Lestari',
    facilitator: 'Rani Permata',
    status: 'Selesai',
    participants: [
      { id: 'deni-suhendar', name: 'Deni Suhendar', group: 'KTH Papandayan Lestari', attendance: 'Hadir' },
      { id: 'eni-kurniasih', name: 'Eni Kurniasih', group: 'KTH Papandayan Lestari', attendance: 'Hadir' },
      { id: 'asep-saputra', name: 'Asep Saputra', group: 'KTH Papandayan Lestari', attendance: 'Hadir' },
      { id: 'nina-herlina', name: 'Nina Herlina', group: 'KTH Papandayan Lestari', attendance: 'Izin' },
    ],
  },
  {
    id: 'training-panen-20260912',
    title: 'Pemetikan cherry merah',
    topic: 'Panen',
    date: '12 September 2026',
    time: '09.00–11.00',
    location: 'Kebun Blok Utara',
    group: 'KTH Cikuray Mandiri',
    facilitator: 'Rani Permata',
    status: 'Selesai',
    participants: [
      { id: 'ujang-kusnadi', name: 'Ujang Kusnadi', group: 'KTH Cikuray Mandiri', attendance: 'Hadir' },
      { id: 'wati-sulastri', name: 'Wati Sulastri', group: 'KTH Cikuray Mandiri', attendance: 'Hadir' },
      { id: 'asep-hidayat-2', name: 'Asep Hidayat', group: 'KTH Cikuray Mandiri', attendance: 'Hadir' },
    ],
  },
];

function cycleAttendance(status: AttendanceStatus): AttendanceStatus {
  const index = attendanceStatuses.indexOf(status);
  return attendanceStatuses[(index + 1) % attendanceStatuses.length];
}

function statusIcon(status: AttendanceStatus): BrandIconName {
  if (status === 'Hadir') return 'check';
  if (status === 'Izin') return 'info';
  return 'circle';
}

export default function ExtensionTrainingScreen() {
  const colors = useColors();
  const [sessions, setSessions] = useState<TrainingSession[]>(initialSessions);
  const [filter, setFilter] = useState<TrainingFilter>('Semua');
  const [selectedId, setSelectedId] = useState(initialSessions[0].id);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const stored = JSON.parse(value) as TrainingSession[];
        if (Array.isArray(stored) && stored.length > 0) {
          setSessions(stored);
          setSelectedId(stored[0].id);
        }
      } catch {
        setFeedback('Data pelatihan belum dapat dibaca. Data contoh tetap ditampilkan.');
      }
    }).catch(() => setFeedback('Data pelatihan belum dapat dimuat dari perangkat.'));
  }, []);

  const visibleSessions = useMemo(
    () => filter === 'Semua' ? sessions : sessions.filter((session) => session.status === filter),
    [filter, sessions],
  );
  const selectedSession = sessions.find((session) => session.id === selectedId) ?? visibleSessions[0] ?? sessions[0];
  const upcomingCount = sessions.filter((session) => session.status === 'Mendatang').length;
  const allParticipants = sessions.reduce((sum, session) => sum + session.participants.length, 0);
  const presentParticipants = sessions.reduce((sum, session) => sum + session.participants.filter((participant) => participant.attendance === 'Hadir').length, 0);
  const selectedPresent = selectedSession?.participants.filter((participant) => participant.attendance === 'Hadir').length ?? 0;
  const selectedExcused = selectedSession?.participants.filter((participant) => participant.attendance === 'Izin').length ?? 0;
  const selectedPending = selectedSession?.participants.filter((participant) => participant.attendance === 'Belum diisi').length ?? 0;

  const persist = async (next: TrainingSession[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setFeedback('Kehadiran berubah di layar, tetapi belum tersimpan di perangkat.');
    }
  };

  const updateAttendance = async (participantId: string) => {
    if (!selectedSession) return;
    const current = selectedSession.participants.find((participant) => participant.id === participantId);
    if (!current) return;
    const nextStatus = cycleAttendance(current.attendance);
    const next = sessions.map((session) => session.id === selectedSession.id
      ? {
          ...session,
          participants: session.participants.map((participant) => participant.id === participantId
            ? { ...participant, attendance: nextStatus }
            : participant),
        }
      : session);
    setSessions(next);
    await persist(next);
    setFeedback(`${current.name} ditandai ${nextStatus.toLowerCase()}.`);
  };

  const markAllPresent = async () => {
    if (!selectedSession) return;
    const next = sessions.map((session) => session.id === selectedSession.id
      ? { ...session, participants: session.participants.map((participant) => ({ ...participant, attendance: 'Hadir' as const })) }
      : session);
    setSessions(next);
    await persist(next);
    setFeedback(`Semua peserta ${selectedSession.group} ditandai hadir.`);
  };

  if (!selectedSession) return null;

  return (
    <Screen>
      <Header back title="Pelatihan & kehadiran" subtitle="PENYULUH · PEMBELAJARAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="RUANG BELAJAR LAPANGAN"
        title="Pelatihan yang tercatat, kehadiran yang terbaca."
        description="Atur agenda pembelajaran untuk kelompok binaan dan simpan daftar hadir tanpa membawa lembar terpisah ke setiap sesi."
      />

      <View style={styles.metrics}>
        <MetricCard icon="calendar" value={String(sessions.length)} label="Sesi pelatihan" />
        <MetricCard icon="briefcase" value={String(upcomingCount)} label="Akan datang" />
        <MetricCard icon="users" value={String(allParticipants)} label="Peserta terdaftar" />
        <MetricCard icon="check" value={String(presentParticipants)} label="Kehadiran tercatat" />
      </View>

      <ProgramSectionTitle eyebrow="AGENDA PENYULUH" title="Daftar pelatihan" />
      <View style={styles.filters}>
        {filters.map((item) => (
          <FilterChip
            key={item}
            label={item}
            selected={filter === item}
            onPress={() => {
              setFilter(item);
              const firstVisible = item === 'Semua' ? sessions[0] : sessions.find((session) => session.status === item);
              if (firstVisible) setSelectedId(firstVisible.id);
            }}
            testID={`extension-training-filter-${item.toLowerCase()}`}
          />
        ))}
      </View>

      {visibleSessions.length === 0 ? (
        <ProgramCard muted>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada sesi di filter ini</Text>
          <Text style={[styles.helper, { color: colors.mutedForeground }]}>Tambahkan agenda pelatihan untuk mulai mencatat peserta.</Text>
        </ProgramCard>
      ) : (
        <View style={styles.sessionList}>
          {visibleSessions.map((session) => {
            const present = session.participants.filter((participant) => participant.attendance === 'Hadir').length;
            const isSelected = session.id === selectedSession.id;
            return (
              <Pressable
                key={session.id}
                testID={`extension-training-session-${session.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Pilih pelatihan ${session.title}`}
                onPress={() => setSelectedId(session.id)}
                style={({ pressed }) => [
                  styles.sessionCard,
                  { backgroundColor: colors.card, borderColor: isSelected ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 },
                ]}
              >
                <View style={[styles.sessionIcon, { backgroundColor: isSelected ? colors.primary : colors.secondary }]}>
                  <BrandIcon name="calendar" size={17} color={isSelected ? colors.primaryForeground : colors.primary} />
                </View>
                <View style={styles.sessionCopy}>
                  <View style={styles.sessionTitleRow}>
                    <Text style={[styles.sessionTitle, { color: colors.foreground }]}>{session.title}</Text>
                    <StatusPill label={session.status} positive={session.status === 'Selesai'} />
                  </View>
                  <Text style={[styles.sessionMeta, { color: colors.primary }]}>{session.topic} · {session.group}</Text>
                  <Text style={[styles.sessionDetail, { color: colors.mutedForeground }]}>{session.date} · {session.time}</Text>
                  <View style={styles.sessionAttendance}>
                    <BrandIcon name="users" size={13} color={colors.mutedForeground} />
                    <Text style={[styles.sessionAttendanceText, { color: colors.mutedForeground }]}>{present}/{session.participants.length} hadir</Text>
                    <Text style={[styles.sessionOpen, { color: colors.primary }]}>{isSelected ? 'Dipilih' : 'Buka daftar'}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      <ProgramSectionTitle eyebrow="DAFTAR HADIR" title={selectedSession.title} />
      <ProgramCard>
        <View style={styles.selectedHeader}>
          <View style={[styles.selectedIcon, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="users" size={19} color={colors.primary} />
          </View>
          <View style={styles.selectedCopy}>
            <Text style={[styles.selectedGroup, { color: colors.primary }]}>{selectedSession.group}</Text>
            <Text style={[styles.selectedMeta, { color: colors.mutedForeground }]}>{selectedSession.date} · {selectedSession.location}</Text>
          </View>
          <StatusPill label={`${selectedSession.participants.length} peserta`} positive />
        </View>

        <View style={[styles.attendanceSummary, { backgroundColor: colors.secondary }]}>
          <AttendanceStat value={String(selectedPresent)} label="Hadir" color={colors.primary} labelColor={colors.mutedForeground} />
          <AttendanceStat value={String(selectedExcused)} label="Izin" color={colors.accent} labelColor={colors.mutedForeground} />
          <AttendanceStat value={String(selectedPending)} label="Belum diisi" color={colors.mutedForeground} labelColor={colors.mutedForeground} />
        </View>

        {selectedSession.status === 'Mendatang' && (
          <Pressable
            testID="extension-training-mark-all"
            accessibilityRole="button"
            accessibilityLabel="Tandai semua peserta hadir"
            onPress={() => void markAllPresent()}
            style={({ pressed }) => [styles.markAllButton, { borderColor: colors.primary, opacity: pressed ? 0.7 : 1 }]}
          >
            <BrandIcon name="check" size={14} color={colors.primary} />
            <Text style={[styles.markAllText, { color: colors.primary }]}>Tandai semua hadir</Text>
          </Pressable>
        )}

        <View style={styles.participantList}>
          {selectedSession.participants.map((participant, index) => (
            <View key={participant.id} style={[styles.participantRow, index < selectedSession.participants.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
              <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.avatarText, { color: colors.primary }]}>{participant.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</Text>
              </View>
              <View style={styles.participantCopy}>
                <Text style={[styles.participantName, { color: colors.foreground }]}>{participant.name}</Text>
                <Text style={[styles.participantGroup, { color: colors.mutedForeground }]}>{participant.group}</Text>
              </View>
              <Pressable
                testID={`extension-training-attendance-${participant.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Ubah kehadiran ${participant.name}`}
                onPress={() => void updateAttendance(participant.id)}
                style={({ pressed }) => [styles.attendanceButton, { backgroundColor: participant.attendance === 'Hadir' ? colors.secondary : participant.attendance === 'Izin' ? `${colors.accent}22` : colors.muted, opacity: pressed ? 0.7 : 1 }]}
              >
                <BrandIcon name={statusIcon(participant.attendance)} size={13} color={participant.attendance === 'Hadir' ? colors.primary : participant.attendance === 'Izin' ? colors.accent : colors.mutedForeground} />
                <Text style={[styles.attendanceButtonText, { color: participant.attendance === 'Hadir' ? colors.primary : participant.attendance === 'Izin' ? colors.accent : colors.mutedForeground }]}>{participant.attendance}</Text>
              </Pressable>
            </View>
          ))}
        </View>
        <Text style={[styles.attendanceHint, { color: colors.mutedForeground }]}>Ketuk status peserta untuk beralih: Hadir, Izin, lalu Belum diisi.</Text>
      </ProgramCard>

      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('ditandai') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
    </Screen>
  );
}

function AttendanceStat({ value, label, color, labelColor }: { value: string; label: string; color: string; labelColor: string }) {
  return (
    <View style={styles.attendanceStat}>
      <Text style={[styles.attendanceValue, { color }]}>{value}</Text>
      <Text style={[styles.attendanceLabel, { color: labelColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  sessionList: { gap: 9 },
  sessionCard: { borderWidth: 1, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  sessionIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sessionCopy: { flex: 1, gap: 3 },
  sessionTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  sessionTitle: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  sessionMeta: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  sessionDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  sessionAttendance: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  sessionAttendanceText: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  sessionOpen: { marginLeft: 'auto', fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  selectedHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  selectedIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  selectedCopy: { flex: 1, gap: 3 },
  selectedGroup: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  selectedMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  attendanceSummary: { borderRadius: 14, padding: 11, flexDirection: 'row', gap: 8 },
  attendanceStat: { flex: 1, gap: 2 },
  attendanceValue: { fontFamily: 'Manrope_700Bold', fontSize: 18 },
  attendanceLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  markAllButton: { minHeight: 35, borderWidth: 1, borderRadius: 11, alignSelf: 'flex-start', paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 6 },
  markAllText: { fontFamily: 'Manrope_700Bold', fontSize: 10.5 },
  participantList: { gap: 0 },
  participantRow: { minHeight: 58, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 9 },
  avatar: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  participantCopy: { flex: 1, gap: 2 },
  participantName: { fontFamily: 'Manrope_700Bold', fontSize: 11.5 },
  participantGroup: { fontFamily: 'Manrope_400Regular', fontSize: 9.5 },
  attendanceButton: { minHeight: 31, borderRadius: 10, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  attendanceButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  attendanceHint: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 14 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, marginBottom: 4 },
  helper: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});