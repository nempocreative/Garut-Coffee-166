import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { InfoRow, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
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
  const [farmIssues, setFarmIssues] = useState<FarmIssue[]>([]);

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

  return (
    <Screen>
      <Header back title="Dashboard penyuluh" subtitle="PENDAMPINGAN · CIKAJANG" />
      <ProgramIntro eyebrow="RUANG KERJA PENYULUH" title="Kunjungan yang berlanjut." description="Catat apa yang terlihat di kebun, ubah menjadi rekomendasi, lalu pastikan tindak lanjutnya kembali ke lapangan." />
      <View style={styles.metrics}>{extensionCases.map((item) => <MetricCard key={item.label} icon={item.icon} value={item.value} label={item.label} />)}</View>
      <ProgramSectionTitle eyebrow="KUNJUNGAN TERBARU" title={extensionVisit.farmer} />
      <ProgramCard>
        <View style={styles.visitHeader}><View style={styles.visitCopy}><Text style={[styles.visitGroup, { color: colors.primary }]}>{extensionVisit.group}</Text><Text style={[styles.visitLocation, { color: colors.mutedForeground }]}>{extensionVisit.location} · kunjungan {extensionVisit.lastVisit}</Text></View><StatusPill label={extensionVisit.condition} positive={false} /></View>
        <InfoRow icon="alert-circle" label="Permasalahan" value={extensionVisit.issue} />
        <InfoRow icon="check" label="Rekomendasi" value={extensionVisit.recommendation} />
        <InfoRow icon="calendar" label="Tindak lanjut" value={extensionVisit.followUp} detail={`Kunjungan berikutnya ${extensionVisit.nextVisit}`} last />
      </ProgramCard>
      <ProgramSectionTitle eyebrow={`${farmIssues.length} LAPORAN MASUK`} title="Masalah kebun petani" />
      {farmIssues.length === 0 ? (
        <ProgramCard muted><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Belum ada laporan baru</Text><Text style={[styles.followupText, { color: colors.mutedForeground }]}>Laporan foto dari petani akan muncul di sini untuk ditinjau.</Text></ProgramCard>
      ) : (
        <View style={styles.issueList}>
          {farmIssues.slice(0, 4).map((issue) => (
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
            </ProgramCard>
          ))}
        </View>
      )}
      <ProgramSectionTitle eyebrow="AGENDA LAPANGAN" title="Yang perlu ditindaklanjuti" />
      <View style={[styles.followup, { backgroundColor: colors.foreground }]}><Text style={[styles.followupTitle, { color: colors.card }]}>3 catatan jatuh tempo minggu ini</Text><Text style={[styles.followupText, { color: colors.background }]}>Prioritaskan kebun dengan masalah drainase sebelum puncak panen.</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  visitHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginBottom: 2 },
  visitCopy: { flex: 1, gap: 3 },
  visitGroup: { fontFamily: 'Manrope_700Bold', fontSize: 14 },
  visitLocation: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  followup: { borderRadius: 18, padding: 15, gap: 5 },
  followupTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15 },
  followupText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.82 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, marginBottom: 4 },
  issueList: { gap: 10 },
  issueTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  issuePhoto: { width: 48, height: 48, borderRadius: 13 },
  issueCopy: { flex: 1, gap: 3 },
  issueLocation: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17 },
  issueDate: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  issueDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});