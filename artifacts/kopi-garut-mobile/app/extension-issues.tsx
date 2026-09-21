import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { FilterChip, InfoRow, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { extensionVisit } from '@/data/program';
import { useColors } from '@/hooks/useColors';

const STORAGE_KEY = '@kopi-garut/farm-issues';
const filters = ['Semua', 'Perlu arahan', 'Dijadwalkan', 'Selesai'] as const;

type FarmIssueStatus = 'Menunggu arahan' | 'Sudah ditinjau';
type FollowUpStatus = 'Menunggu arahan' | 'Dijadwalkan' | 'Selesai';
type IssueFilter = (typeof filters)[number];

type FarmIssue = {
  id: string;
  photoUri: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  createdAt: string;
  status: FarmIssueStatus;
  followUpStatus?: FollowUpStatus;
  followUpDate?: string;
  followUpNote?: string;
};

function followUpStatus(issue: FarmIssue): FollowUpStatus {
  return issue.followUpStatus ?? (issue.status === 'Sudah ditinjau' ? 'Dijadwalkan' : 'Menunggu arahan');
}

function filterMatches(issue: FarmIssue, filter: IssueFilter) {
  if (filter === 'Semua') return true;
  if (filter === 'Perlu arahan') return followUpStatus(issue) === 'Menunggu arahan';
  return followUpStatus(issue) === filter;
}

export default function ExtensionIssuesScreen() {
  const colors = useColors();
  const router = useRouter();
  const [issues, setIssues] = useState<FarmIssue[]>([]);
  const [filter, setFilter] = useState<IssueFilter>('Semua');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const stored = JSON.parse(value) as FarmIssue[];
        if (Array.isArray(stored)) setIssues(stored);
      } catch {
        setFeedback('Laporan belum dapat dibaca. Coba buka kembali halaman ini.');
      }
    }).catch(() => setFeedback('Laporan belum dapat dimuat dari perangkat.'));
  }, []);

  const visibleIssues = useMemo(
    () => issues.filter((issue) => filterMatches(issue, filter)),
    [filter, issues],
  );
  const pendingCount = issues.filter((issue) => followUpStatus(issue) === 'Menunggu arahan').length;
  const scheduledCount = issues.filter((issue) => followUpStatus(issue) === 'Dijadwalkan').length;
  const completedCount = issues.filter((issue) => followUpStatus(issue) === 'Selesai').length;

  const persist = async (next: FarmIssue[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setFeedback('Status berubah di layar, tetapi belum tersimpan di perangkat.');
    }
  };

  const advanceIssue = async (issue: FarmIssue) => {
    const current = followUpStatus(issue);
    if (current === 'Selesai') return;
    const nextStatus: FollowUpStatus = current === 'Menunggu arahan' ? 'Dijadwalkan' : 'Selesai';
    const next = issues.map((item) => item.id === issue.id ? {
      ...item,
      status: nextStatus === 'Dijadwalkan' ? 'Sudah ditinjau' as const : item.status,
      followUpStatus: nextStatus,
      followUpDate: nextStatus === 'Dijadwalkan' ? '27 Sep 2026' : item.followUpDate,
      followUpNote: nextStatus === 'Dijadwalkan'
        ? 'Arahan awal sudah diberikan. Jadwalkan kunjungan ulang dan minta foto tindak lanjut.'
        : 'Tindak lanjut selesai ditinjau.',
    } : item);
    setIssues(next);
    await persist(next);
    setFeedback(nextStatus === 'Dijadwalkan' ? `Tindak lanjut ${issue.location} sudah dijadwalkan.` : `Tindak lanjut ${issue.location} sudah selesai.`);
  };

  return (
    <Screen>
      <Header back title="Masalah & tindak lanjut" subtitle="PENYULUH · PRIORITAS LAPANGAN" cart={false} notifications />
      <ProgramIntro
        eyebrow="RUANG TINDAK LANJUT"
        title="Masalah tidak berhenti di laporan."
        description="Baca kondisi kebun yang masuk, berikan arahan, lalu pastikan setiap catatan kembali menjadi tindakan di lapangan."
      />

      <View style={[styles.summary, { backgroundColor: colors.foreground }]}>
        <View style={styles.summaryTop}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.accent }]}><BrandIcon name="alert-circle" size={19} color={colors.accentForeground} /></View>
          <View style={styles.summaryCopy}>
            <Text style={[styles.summaryKicker, { color: colors.accent }]}>ANTREAN PENANGANAN</Text>
            <Text style={[styles.summaryTitle, { color: colors.card }]}>{pendingCount} laporan menunggu arahan</Text>
          </View>
        </View>
        <View style={styles.summaryStats}>
          <SummaryStat value={String(issues.length)} label="laporan masuk" colors={colors} />
          <SummaryStat value={String(scheduledCount)} label="dijadwalkan" colors={colors} />
          <SummaryStat value={String(completedCount)} label="selesai" colors={colors} />
        </View>
      </View>

      <ProgramSectionTitle eyebrow="PRIORITAS MINGGU INI" title="Kebun yang perlu dikunjungi lagi" />
      <ProgramCard>
        <View style={styles.priorityHeader}>
          <View style={[styles.priorityIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map-pin" size={18} color={colors.primary} /></View>
          <View style={styles.priorityCopy}>
            <Text style={[styles.priorityName, { color: colors.foreground }]}>{extensionVisit.farmer}</Text>
            <Text style={[styles.priorityMeta, { color: colors.primary }]}>{extensionVisit.group} · {extensionVisit.location}</Text>
          </View>
          <StatusPill label="Dijadwalkan" positive />
        </View>
        <InfoRow icon="alert-circle" label="Masalah utama" value={extensionVisit.issue} />
        <InfoRow icon="calendar" label="Jadwal berikutnya" value={extensionVisit.nextVisit} detail={extensionVisit.followUp} last />
        <Pressable testID="extension-issues-open-visits" accessibilityRole="button" accessibilityLabel="Buka catatan kunjungan lapangan" onPress={() => router.push('/extension-visits')} style={({ pressed }) => [styles.priorityButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.72 : 1 }]}>
          <Text style={[styles.priorityButtonText, { color: colors.primary }]}>Buka catatan kunjungan</Text>
          <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
        </Pressable>
      </ProgramCard>

      <ProgramSectionTitle eyebrow={`${issues.length} LAPORAN MASUK`} title="Antrean masalah kebun" />
      <View style={styles.filters}>
        {filters.map((item) => (
          <FilterChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} testID={`extension-issues-filter-${item.toLowerCase().replaceAll(' ', '-')}`} />
        ))}
      </View>

      {visibleIssues.length === 0 ? (
        <ProgramCard muted>
          <View style={styles.emptyRow}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.card }]}><BrandIcon name={filter === 'Semua' ? 'check' : 'alert-circle'} size={19} color={colors.primary} /></View>
            <View style={styles.emptyCopy}>
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{filter === 'Semua' ? 'Belum ada laporan masuk' : 'Tidak ada catatan di status ini'}</Text>
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>{filter === 'Semua' ? 'Laporan foto dan lokasi dari petani akan muncul di sini.' : 'Pilih status lain untuk melihat antrean yang berbeda.'}</Text>
            </View>
          </View>
        </ProgramCard>
      ) : (
        <View style={styles.issueList}>
          {visibleIssues.map((issue) => {
            const current = followUpStatus(issue);
            const actionLabel = current === 'Menunggu arahan' ? 'Jadwalkan tindak lanjut' : 'Tandai selesai';
            return (
              <ProgramCard key={issue.id}>
                <View style={styles.issueHeader}>
                  {issue.photoUri ? <Image source={{ uri: issue.photoUri }} contentFit="cover" style={styles.issuePhoto} /> : <View style={[styles.issuePhoto, styles.issuePhotoEmpty, { backgroundColor: colors.secondary }]}><BrandIcon name="coffee" size={17} color={colors.primary} /></View>}
                  <View style={styles.issueCopy}>
                    <Text style={[styles.issueLocation, { color: colors.foreground }]}>{issue.location}</Text>
                    <Text style={[styles.issueDate, { color: colors.mutedForeground }]}>{issue.createdAt}</Text>
                  </View>
                  <StatusPill label={current} positive={current === 'Selesai'} />
                </View>
                <Text style={[styles.issueDescription, { color: colors.foreground }]}>{issue.description}</Text>
                <View style={[styles.statusRow, { borderTopColor: colors.border }]}>
                  <View style={styles.statusCopy}>
                    <BrandIcon name={current === 'Selesai' ? 'check' : current === 'Dijadwalkan' ? 'calendar' : 'alert-circle'} size={14} color={current === 'Menunggu arahan' ? colors.accent : colors.primary} />
                    <View style={styles.statusTextCopy}>
                      <Text style={[styles.statusLabel, { color: colors.mutedForeground }]}>TINDAK LANJUT</Text>
                      <Text style={[styles.statusText, { color: colors.foreground }]}>{issue.followUpNote ?? 'Belum ada arahan yang dicatat.'}</Text>
                      {issue.followUpDate && <Text style={[styles.statusDate, { color: colors.primary }]}>Target {issue.followUpDate}</Text>}
                    </View>
                  </View>
                </View>
                {current !== 'Selesai' && <Pressable testID={`extension-issue-advance-${issue.id}`} accessibilityRole="button" accessibilityLabel={`${actionLabel} untuk ${issue.location}`} onPress={() => void advanceIssue(issue)} style={({ pressed }) => [styles.actionButton, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name={current === 'Menunggu arahan' ? 'calendar' : 'check'} size={14} color={colors.primaryForeground} /><Text style={[styles.actionButtonText, { color: colors.primaryForeground }]}>{actionLabel}</Text></Pressable>}
              </ProgramCard>
            );
          })}
        </View>
      )}
      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('sudah') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
    </Screen>
  );
}

function SummaryStat({ value, label, colors }: { value: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.summaryStat}>
      <Text style={[styles.summaryValue, { color: colors.card }]}>{value}</Text>
      <Text style={[styles.summaryLabel, { color: colors.background }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { borderRadius: 21, padding: 15, gap: 18 },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  summaryCopy: { flex: 1, gap: 3 },
  summaryKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.2 },
  summaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 21 },
  summaryStats: { flexDirection: 'row', gap: 18 },
  summaryStat: { flex: 1, gap: 3 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 20 },
  summaryLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9.5 },
  priorityHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  priorityIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  priorityCopy: { flex: 1, gap: 2 },
  priorityName: { fontFamily: 'Manrope_700Bold', fontSize: 14 },
  priorityMeta: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  priorityButton: { minHeight: 37, borderRadius: 11, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priorityButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 10.5 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  issueList: { gap: 10 },
  issueHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  issuePhoto: { width: 50, height: 50, borderRadius: 13 },
  issuePhotoEmpty: { alignItems: 'center', justifyContent: 'center' },
  issueCopy: { flex: 1, gap: 3 },
  issueLocation: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  issueDate: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  issueDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  statusRow: { borderTopWidth: 1, paddingTop: 10 },
  statusCopy: { flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  statusTextCopy: { flex: 1, gap: 2 },
  statusLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.8 },
  statusText: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  statusDate: { fontFamily: 'Manrope_700Bold', fontSize: 9.5, marginTop: 2 },
  actionButton: { minHeight: 36, borderRadius: 11, alignSelf: 'flex-start', paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  emptyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emptyIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  emptyCopy: { flex: 1, gap: 3 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});