import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { FilterChip, InfoRow, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { BrandIcon } from '@/components/BrandIcon';
import { extensionCases, extensionVisit } from '@/data/program';
import { useColors } from '@/hooks/useColors';

const FARM_ISSUES_STORAGE_KEY = '@kopi-garut/farm-issues';

type FarmIssue = {
  id: string;
  photoUri: string;
  location: string;
  description: string;
  createdAt: string;
  status: 'Menunggu arahan' | 'Sudah ditinjau';
};

export default function ExtensionDashboardScreen() {
  const colors = useColors();
  const router = useRouter();
  const [farmIssues, setFarmIssues] = useState<FarmIssue[]>([]);
  const [issueFilter, setIssueFilter] = useState<'Semua' | FarmIssue['status']>('Semua');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(FARM_ISSUES_STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        setFarmIssues(JSON.parse(value) as FarmIssue[]);
      } catch {
        setFarmIssues([]);
      }
    }).catch(() => setFarmIssues([]));
  }, []);

  const visibleIssues = useMemo(
    () => issueFilter === 'Semua' ? farmIssues : farmIssues.filter((issue) => issue.status === issueFilter),
    [farmIssues, issueFilter],
  );
  const pendingFollowups = Math.max(3, farmIssues.filter((issue) => issue.status === 'Menunggu arahan').length);

  const reviewIssue = async (issue: FarmIssue) => {
    const nextIssues = farmIssues.map((item) => item.id === issue.id ? { ...item, status: 'Sudah ditinjau' as const } : item);
    setFarmIssues(nextIssues);
    setFeedback(`Laporan ${issue.location} sudah ditandai ditinjau.`);
    try {
      await AsyncStorage.setItem(FARM_ISSUES_STORAGE_KEY, JSON.stringify(nextIssues));
    } catch {
      setFeedback('Status tampil berubah, tetapi belum tersimpan di perangkat.');
    }
  };

  return (
    <Screen>
      <Header back title="Dashboard penyuluh" subtitle="PENDAMPINGAN · CIKAJANG" />
      <ProgramIntro eyebrow="RUANG KERJA PENYULUH" title="Kunjungan yang berlanjut." description="Catat apa yang terlihat di kebun, ubah menjadi rekomendasi, lalu pastikan tindak lanjutnya kembali ke lapangan." />
      <View style={styles.metrics}>{extensionCases.map((item) => <MetricCard key={item.label} icon={item.icon} value={item.value} label={item.label} />)}</View>
      <View style={styles.quickGrid}>
        <Pressable testID="extension-open-farmers" accessibilityRole="button" accessibilityLabel="Buka daftar petani binaan" onPress={() => router.push('/extension-farmers')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="users" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Petani binaan</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Lihat profil dan wilayah</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
        <Pressable testID="extension-open-notifications" accessibilityRole="button" accessibilityLabel="Buka agenda dan pengingat" onPress={() => router.push('/notifications')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="bell" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Agenda & pengingat</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Pelatihan dan kunjungan</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
        <Pressable testID="extension-open-visits" accessibilityRole="button" accessibilityLabel="Buka catatan kunjungan lapangan" onPress={() => router.push('/extension-visits')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map-pin" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Kunjungan lapangan</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Catat temuan dan tindak lanjut</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
        <Pressable testID="extension-open-training" accessibilityRole="button" accessibilityLabel="Buka pelatihan dan kehadiran" onPress={() => router.push('/extension-training')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="users" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Pelatihan & kehadiran</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Atur agenda dan daftar hadir</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
        <Pressable testID="extension-open-reports" accessibilityRole="button" accessibilityLabel="Buka laporan pendampingan" onPress={() => router.push('/extension-reports')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="bar-chart-2" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Laporan pendampingan</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Rekap kerja dan kondisi wilayah</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
        <Pressable testID="extension-open-map" accessibilityRole="button" accessibilityLabel="Buka peta dan skor kebun" onPress={() => router.push('/extension-map')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Peta & skor kebun</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Pantau kondisi titik binaan</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
        <Pressable testID="extension-open-issues" accessibilityRole="button" accessibilityLabel="Buka masalah dan tindak lanjut" onPress={() => router.push('/extension-issues')} style={({ pressed }) => [styles.quickAction, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="alert-circle" size={18} color={colors.primary} /></View>
          <View style={styles.quickCopy}><Text style={[styles.quickTitle, { color: colors.foreground }]}>Masalah & tindak lanjut</Text><Text style={[styles.quickDetail, { color: colors.mutedForeground }]}>Atur prioritas laporan kebun</Text></View>
          <BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>
      </View>
      <ProgramSectionTitle eyebrow="KUNJUNGAN TERBARU" title={extensionVisit.farmer} />
      <ProgramCard>
        <View style={styles.visitHeader}><View style={styles.visitCopy}><Text style={[styles.visitGroup, { color: colors.primary }]}>{extensionVisit.group}</Text><Text style={[styles.visitLocation, { color: colors.mutedForeground }]}>{extensionVisit.location} · kunjungan {extensionVisit.lastVisit}</Text></View><StatusPill label={extensionVisit.condition} positive={false} /></View>
        <InfoRow icon="alert-circle" label="Permasalahan" value={extensionVisit.issue} />
        <InfoRow icon="check" label="Rekomendasi" value={extensionVisit.recommendation} />
        <InfoRow icon="calendar" label="Tindak lanjut" value={extensionVisit.followUp} detail={`Kunjungan berikutnya ${extensionVisit.nextVisit}`} last />
      </ProgramCard>
      <ProgramSectionTitle eyebrow={`${farmIssues.length} LAPORAN MASUK`} title="Masalah kebun petani" action="Lihat semua" onAction={() => router.push('/extension-issues')} />
      <View style={styles.filters}>
        {(['Semua', 'Menunggu arahan', 'Sudah ditinjau'] as const).map((item) => <FilterChip key={item} label={item} selected={issueFilter === item} onPress={() => setIssueFilter(item)} testID={`extension-issue-filter-${item.toLowerCase().replaceAll(' ', '-')}`} />)}
      </View>
      {visibleIssues.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada laporan baru</Text><Text style={[styles.followupText, { color: colors.mutedForeground }]}>Laporan foto dari petani akan muncul di sini untuk ditinjau.</Text></ProgramCard>
      ) : (
        <View style={styles.issueList}>
          {visibleIssues.slice(0, 4).map((issue) => (
            <ProgramCard key={issue.id}>
              <View style={styles.issueTop}>
                <Image source={{ uri: issue.photoUri }} contentFit="cover" style={styles.issuePhoto} />
                <View style={styles.issueCopy}>
                  <Text style={[styles.issueLocation, { color: colors.foreground }]}>{issue.location}</Text>
                  <Text style={[styles.issueDate, { color: colors.mutedForeground }]}>{issue.createdAt}</Text>
                </View>
                <StatusPill label={issue.status} positive={issue.status === 'Sudah ditinjau'} />
              </View>
              <Text style={[styles.issueDescription, { color: colors.mutedForeground }]}>{issue.description}</Text>
              <View style={[styles.issueFooter, { borderTopColor: colors.border }]}>
                <View style={styles.issueStatusCopy}><BrandIcon name={issue.status === 'Sudah ditinjau' ? 'check' : 'alert-circle'} size={14} color={issue.status === 'Sudah ditinjau' ? colors.primary : colors.accent} /><Text style={[styles.issueStatusText, { color: colors.mutedForeground }]}>{issue.status === 'Sudah ditinjau' ? 'Petani dapat melihat status terbaru.' : 'Perlu arahan dari penyuluh.'}</Text></View>
                {issue.status === 'Menunggu arahan' && <Pressable testID={`extension-review-${issue.id}`} accessibilityRole="button" accessibilityLabel={`Tandai laporan ${issue.location} sudah ditinjau`} onPress={() => void reviewIssue(issue)} style={({ pressed }) => [styles.reviewButton, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name="check" size={13} color={colors.primaryForeground} /><Text style={[styles.reviewText, { color: colors.primaryForeground }]}>Tinjau</Text></Pressable>}
              </View>
            </ProgramCard>
          ))}
        </View>
      )}
      {!!feedback && <Text style={[styles.feedback, { color: feedback.includes('sudah ditandai') ? colors.primary : colors.destructive }]}>{feedback}</Text>}
      <ProgramSectionTitle eyebrow="AGENDA LAPANGAN" title="Yang perlu ditindaklanjuti" />
      <View style={[styles.followup, { backgroundColor: colors.foreground }]}>
        <View style={styles.followupTop}><View style={[styles.followupIcon, { backgroundColor: colors.accent }]}><BrandIcon name="calendar" size={17} color={colors.accentForeground} /></View><View style={styles.followupCopy}><Text style={[styles.followupTitle, { color: colors.card }]}>{pendingFollowups} catatan jatuh tempo minggu ini</Text><Text style={[styles.followupText, { color: colors.background }]}>Prioritaskan kebun dengan masalah drainase sebelum puncak panen.</Text></View></View>
        <Pressable testID="extension-open-agenda" accessibilityRole="button" accessibilityLabel="Buka agenda pendampingan" onPress={() => router.push('/notifications')} style={({ pressed }) => [styles.followupAction, { backgroundColor: colors.card, opacity: pressed ? 0.78 : 1 }]}><Text style={[styles.followupActionText, { color: colors.foreground }]}>Lihat agenda</Text><BrandIcon name="arrow-up-right" size={14} color={colors.primary} /></Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  quickGrid: { gap: 9 },
  quickAction: { minHeight: 68, borderWidth: 1, borderRadius: 17, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 10 },
  quickIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickCopy: { flex: 1, gap: 3 },
  quickTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  quickDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  visitHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginBottom: 2 },
  visitCopy: { flex: 1, gap: 3 },
  visitGroup: { fontFamily: 'Manrope_700Bold', fontSize: 14 },
  visitLocation: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  issueFooter: { borderTopWidth: 1, marginTop: 11, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  issueStatusCopy: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  issueStatusText: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13 },
  reviewButton: { minHeight: 33, borderRadius: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  reviewText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 16 },
  followup: { borderRadius: 18, padding: 15, gap: 12 },
  followupTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  followupIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  followupCopy: { flex: 1, gap: 5 },
  followupTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  followupText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.82 },
  followupAction: { minHeight: 36, borderRadius: 11, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  followupActionText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, marginBottom: 4 },
  issueList: { gap: 10 },
  issueTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  issuePhoto: { width: 48, height: 48, borderRadius: 13 },
  issueCopy: { flex: 1, gap: 3 },
  issueLocation: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  issueDate: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  issueDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});