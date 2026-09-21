import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

const VISITS_KEY = '@kopi-garut/extension-visits';
const ISSUES_KEY = '@kopi-garut/farm-issues';
const TRAINING_KEY = '@kopi-garut/extension-training';
const filters = ['Semua', 'Bulan ini', 'Perlu tindak lanjut'] as const;

type ReportFilter = (typeof filters)[number];

type VisitRecord = {
  id: string;
  farmer: string;
  group: string;
  location: string;
  date: string;
  condition: 'Baik' | 'Baik dengan catatan' | 'Perlu perhatian';
  status: 'Terjadwal' | 'Selesai';
};

type IssueRecord = {
  id: string;
  location: string;
  description: string;
  createdAt: string;
  status: 'Menunggu arahan' | 'Sudah ditinjau';
  followUpStatus?: 'Menunggu arahan' | 'Dijadwalkan' | 'Selesai';
  followUpDate?: string;
};

type TrainingRecord = {
  id: string;
  title: string;
  date: string;
  group: string;
  status: 'Mendatang' | 'Selesai';
  participants: Array<{ attendance: 'Hadir' | 'Izin' | 'Belum diisi' }>;
};

type GroupReport = {
  group: string;
  location: string;
  visits: number;
  completed: number;
  attention: number;
  nextAction: string;
  action: 'Aman' | 'Perlu tindak lanjut';
};

const fallbackVisits: VisitRecord[] = [
  { id: 'report-visit-iis', farmer: 'Iis Nurhayati', group: 'KTH Cikuray Mandiri', location: 'Mekarsari, Cikajang', date: '2026-09-19', condition: 'Baik dengan catatan', status: 'Selesai' },
  { id: 'report-visit-asep', farmer: 'Asep Hidayat', group: 'KTH Papandayan Lestari', location: 'Sirnajaya, Cisurupan', date: '2026-09-23', condition: 'Baik', status: 'Terjadwal' },
  { id: 'report-visit-deni', farmer: 'Deni Suhendar', group: 'KTH Mekar Tani', location: 'Pakenjeng', date: '2026-09-25', condition: 'Perlu perhatian', status: 'Terjadwal' },
  { id: 'report-visit-ujang', farmer: 'Ujang Kusnadi', group: 'KTH Cikuray Mandiri', location: 'Mekarsari, Cikajang', date: '2026-09-12', condition: 'Baik', status: 'Selesai' },
];

const fallbackIssues: IssueRecord[] = [
  { id: 'report-issue-drainage', location: 'Mekarsari, Cikajang', description: 'Daun menguning dan aliran air belum lancar.', createdAt: '19 Sep 2026', status: 'Sudah ditinjau', followUpStatus: 'Dijadwalkan', followUpDate: '27 Sep 2026' },
  { id: 'report-issue-drying', location: 'Pakenjeng', description: 'Kadar air belum stabil saat sore hari.', createdAt: '18 Sep 2026', status: 'Menunggu arahan', followUpStatus: 'Menunggu arahan' },
];

const fallbackTrainings: TrainingRecord[] = [
  {
    id: 'report-training-sortasi',
    title: 'Sortasi & defect kopi',
    date: '29 September 2026',
    group: 'KTH Cikuray Mandiri',
    status: 'Mendatang',
    participants: [{ attendance: 'Hadir' }, { attendance: 'Hadir' }, { attendance: 'Belum diisi' }, { attendance: 'Belum diisi' }, { attendance: 'Izin' }],
  },
  {
    id: 'report-training-naungan',
    title: 'Perawatan naungan kebun',
    date: '18 September 2026',
    group: 'KTH Papandayan Lestari',
    status: 'Selesai',
    participants: [{ attendance: 'Hadir' }, { attendance: 'Hadir' }, { attendance: 'Hadir' }, { attendance: 'Izin' }],
  },
];

function parseDate(value: string) {
  const parsed = new Date(value.includes('-') ? `${value}T00:00:00` : value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function displayDate(value: string) {
  const parsed = parseDate(value);
  if (!parsed) return value;
  return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function issueStatus(issue: IssueRecord) {
  return issue.followUpStatus ?? (issue.status === 'Sudah ditinjau' ? 'Dijadwalkan' : 'Menunggu arahan');
}

function readArray<T>(value: string | null): T[] | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as T[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export default function ExtensionReportsScreen() {
  const colors = useColors();
  const router = useRouter();
  const [visits, setVisits] = useState<VisitRecord[]>(fallbackVisits);
  const [issues, setIssues] = useState<IssueRecord[]>(fallbackIssues);
  const [trainings, setTrainings] = useState<TrainingRecord[]>(fallbackTrainings);
  const [filter, setFilter] = useState<ReportFilter>('Semua');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(VISITS_KEY), AsyncStorage.getItem(ISSUES_KEY), AsyncStorage.getItem(TRAINING_KEY)])
      .then(([storedVisits, storedIssues, storedTrainings]) => {
        const nextVisits = readArray<VisitRecord>(storedVisits);
        const nextIssues = readArray<IssueRecord>(storedIssues);
        const nextTrainings = readArray<TrainingRecord>(storedTrainings);
        if (nextVisits) setVisits(nextVisits);
        if (nextIssues) setIssues(nextIssues);
        if (nextTrainings) setTrainings(nextTrainings);
      })
      .catch(() => setFeedback('Sebagian data laporan belum dapat dimuat. Data yang tersedia tetap ditampilkan.'));
  }, []);

  const pendingIssues = issues.filter((issue) => issueStatus(issue) !== 'Selesai');
  const completedVisits = visits.filter((visit) => visit.status === 'Selesai');
  const attentionVisits = visits.filter((visit) => visit.condition === 'Perlu perhatian' || visit.condition === 'Baik dengan catatan');
  const uniqueGroups = new Set(visits.map((visit) => visit.group));
  const allParticipants = trainings.reduce((sum, training) => sum + training.participants.length, 0);
  const presentParticipants = trainings.reduce((sum, training) => sum + training.participants.filter((participant) => participant.attendance === 'Hadir').length, 0);
  const attendanceRate = allParticipants > 0 ? Math.round((presentParticipants / allParticipants) * 100) : 0;

  const groupReports = useMemo<GroupReport[]>(() => {
    const groups = Array.from(new Set(visits.map((visit) => visit.group)));
    return groups.map((group) => {
      const groupVisits = visits.filter((visit) => visit.group === group);
      const attention = groupVisits.filter((visit) => visit.condition !== 'Baik').length;
      const relatedIssue = pendingIssues.find((issue) => issue.location.includes(group.includes('Cikuray') ? 'Cikuray' : group.includes('Papandayan') ? 'Cisurupan' : 'Pakenjeng'));
      return {
        group,
        location: groupVisits[0]?.location ?? 'Wilayah belum diisi',
        visits: groupVisits.length,
        completed: groupVisits.filter((visit) => visit.status === 'Selesai').length,
        attention,
        nextAction: relatedIssue ? `Tindak lanjut ${relatedIssue.followUpDate ? `target ${relatedIssue.followUpDate}` : 'belum dijadwalkan'}` : 'Pertahankan ritme kunjungan',
        action: attention > 0 || Boolean(relatedIssue) ? 'Perlu tindak lanjut' : 'Aman',
      };
    });
  }, [pendingIssues, visits]);

  const visibleGroups = groupReports.filter((report) => {
    if (filter === 'Semua' || filter === 'Bulan ini') return true;
    return report.action === 'Perlu tindak lanjut';
  });
  const recentActivities = [
    ...visits.map((visit) => ({ id: `visit-${visit.id}`, icon: 'map-pin' as BrandIconName, title: `Kunjungan ${visit.farmer}`, detail: `${visit.group} · ${displayDate(visit.date)}`, tone: visit.status === 'Selesai' ? 'positive' : 'neutral' })),
    ...issues.map((issue) => ({ id: `issue-${issue.id}`, icon: 'alert-circle' as BrandIconName, title: `Laporan ${issue.location}`, detail: `${issueStatus(issue)} · ${issue.createdAt}`, tone: issueStatus(issue) === 'Selesai' ? 'positive' : 'attention' })),
  ].slice(0, 5);

  return (
    <Screen>
      <Header back title="Laporan pendampingan" subtitle="PENYULUH · REKAP WILAYAH" cart={false} notifications />
      <ProgramIntro
        eyebrow="RINGKASAN KERJA LAPANGAN"
        title="Dari catatan lapangan menjadi arah kerja."
        description="Pantau ritme kunjungan, tindak lanjut masalah, dan keterlibatan kelompok tani dalam satu laporan pendampingan."
      />

      <View style={styles.metrics}>
        <MetricCard icon="map-pin" value={String(visits.length)} label="Kunjungan" />
        <MetricCard icon="check" value={String(completedVisits.length)} label="Selesai" />
        <MetricCard icon="alert-circle" value={String(pendingIssues.length)} label="Tindak lanjut" />
        <MetricCard icon="users" value={`${attendanceRate}%`} label="Kehadiran pelatihan" />
      </View>

      <View style={[styles.summary, { backgroundColor: colors.foreground }]}>
        <View style={styles.summaryTop}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.accent }]}>
            <BrandIcon name="bar-chart-2" size={19} color={colors.accentForeground} />
          </View>
          <View style={styles.summaryCopy}>
            <Text style={[styles.summaryKicker, { color: colors.accent }]}>STATUS PENDAMPINGAN</Text>
            <Text style={[styles.summaryTitle, { color: colors.card }]}>{uniqueGroups.size} kelompok aktif didampingi</Text>
          </View>
        </View>
        <Text style={[styles.summaryText, { color: colors.background }]}>
          {attentionVisits.length > 0 ? `${attentionVisits.length} catatan kunjungan perlu dibaca kembali sebelum agenda lapangan berikutnya.` : 'Semua kunjungan terakhir tercatat dalam kondisi baik.'}
        </Text>
        <View style={styles.summaryActions}>
          <Pressable testID="extension-reports-open-visits" accessibilityRole="button" accessibilityLabel="Buka catatan kunjungan" onPress={() => router.push('/extension-visits')} style={({ pressed }) => [styles.summaryAction, { backgroundColor: colors.card, opacity: pressed ? 0.76 : 1 }]}>
            <Text style={[styles.summaryActionText, { color: colors.foreground }]}>Kunjungan</Text>
            <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
          </Pressable>
          <Pressable testID="extension-reports-open-issues" accessibilityRole="button" accessibilityLabel="Buka tindak lanjut masalah" onPress={() => router.push('/extension-issues')} style={({ pressed }) => [styles.summaryAction, { backgroundColor: colors.card, opacity: pressed ? 0.76 : 1 }]}>
            <Text style={[styles.summaryActionText, { color: colors.foreground }]}>Masalah</Text>
            <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <ProgramSectionTitle eyebrow="REKAP PER KELOMPOK" title="Wilayah yang didampingi" />
      <View style={styles.filters}>
        {filters.map((item) => (
          <FilterChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} testID={`extension-reports-filter-${item.toLowerCase().replaceAll(' ', '-')}`} />
        ))}
      </View>
      <View style={styles.groupList}>
        {visibleGroups.map((report) => (
          <ProgramCard key={report.group}>
            <View style={styles.groupHeader}>
              <View style={[styles.groupIcon, { backgroundColor: report.action === 'Aman' ? colors.secondary : `${colors.accent}22` }]}>
                <BrandIcon name={report.action === 'Aman' ? 'users' : 'alert-circle'} size={17} color={report.action === 'Aman' ? colors.primary : colors.accent} />
              </View>
              <View style={styles.groupCopy}>
                <Text style={[styles.groupName, { color: colors.foreground }]}>{report.group}</Text>
                <Text style={[styles.groupLocation, { color: colors.mutedForeground }]}>{report.location}</Text>
              </View>
              <StatusPill label={report.action} positive={report.action === 'Aman'} />
            </View>
            <View style={[styles.groupStats, { borderTopColor: colors.border }]}>
              <SmallStat value={String(report.visits)} label="kunjungan" colors={colors} />
              <SmallStat value={String(report.completed)} label="selesai" colors={colors} />
              <SmallStat value={String(report.attention)} label="catatan" colors={colors} />
            </View>
            <View style={styles.nextAction}>
              <BrandIcon name={report.action === 'Aman' ? 'check' : 'calendar'} size={14} color={report.action === 'Aman' ? colors.primary : colors.accent} />
              <Text style={[styles.nextActionText, { color: colors.mutedForeground }]}>{report.nextAction}</Text>
            </View>
          </ProgramCard>
        ))}
      </View>

      <ProgramSectionTitle eyebrow="AKTIVITAS TERBARU" title="Jejak pendampingan" action="Buka agenda" onAction={() => router.push('/extension-visits')} />
      <ProgramCard>
        <View style={styles.activityList}>
          {recentActivities.map((activity, index) => (
            <View key={activity.id} style={[styles.activityRow, index < recentActivities.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
              <View style={[styles.activityIcon, { backgroundColor: activity.tone === 'attention' ? `${colors.accent}22` : colors.secondary }]}>
                <BrandIcon name={activity.icon} size={15} color={activity.tone === 'attention' ? colors.accent : colors.primary} />
              </View>
              <View style={styles.activityCopy}>
                <Text style={[styles.activityTitle, { color: colors.foreground }]}>{activity.title}</Text>
                <Text style={[styles.activityDetail, { color: colors.mutedForeground }]}>{activity.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </ProgramCard>

      <ProgramSectionTitle eyebrow="PEMBELAJARAN" title="Kehadiran pelatihan" action="Buka pelatihan" onAction={() => router.push('/extension-training')} />
      <ProgramCard>
        <View style={styles.trainingSummary}>
          <View style={[styles.trainingIcon, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="users" size={18} color={colors.primary} />
          </View>
          <View style={styles.trainingCopy}>
            <Text style={[styles.trainingTitle, { color: colors.foreground }]}>{presentParticipants} dari {allParticipants} kehadiran tercatat</Text>
            <Text style={[styles.trainingDetail, { color: colors.mutedForeground }]}>{trainings.filter((training) => training.status === 'Mendatang').length} sesi mendatang · {trainings.length} total sesi</Text>
          </View>
          <Text style={[styles.trainingRate, { color: colors.primary }]}>{attendanceRate}%</Text>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
          <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${Math.max(4, attendanceRate)}%` }]} />
        </View>
      </ProgramCard>

      {!!feedback && <Text style={[styles.feedback, { color: colors.destructive }]}>{feedback}</Text>}
    </Screen>
  );
}

function SmallStat({ value, label, colors }: { value: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.smallStat}>
      <Text style={[styles.smallStatValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.smallStatLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  summary: { borderRadius: 21, padding: 15, gap: 13 },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  summaryCopy: { flex: 1, gap: 3 },
  summaryKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.2 },
  summaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 21 },
  summaryText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.82 },
  summaryActions: { flexDirection: 'row', gap: 8 },
  summaryAction: { flex: 1, minHeight: 36, borderRadius: 11, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryActionText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  groupList: { gap: 10 },
  groupHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  groupIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  groupCopy: { flex: 1, gap: 3 },
  groupName: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  groupLocation: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  groupStats: { borderTopWidth: 1, paddingTop: 10, flexDirection: 'row', gap: 8 },
  smallStat: { flex: 1, gap: 2 },
  smallStatValue: { fontFamily: 'Manrope_700Bold', fontSize: 16 },
  smallStatLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9.5 },
  nextAction: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nextActionText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  activityList: { gap: 0 },
  activityRow: { minHeight: 56, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 9 },
  activityIcon: { width: 33, height: 33, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  activityCopy: { flex: 1, gap: 2 },
  activityTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11.5, lineHeight: 16 },
  activityDetail: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 14 },
  trainingSummary: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  trainingIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  trainingCopy: { flex: 1, gap: 3 },
  trainingTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  trainingDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  trainingRate: { fontFamily: 'Manrope_700Bold', fontSize: 18 },
  progressTrack: { height: 8, borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 8 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
});