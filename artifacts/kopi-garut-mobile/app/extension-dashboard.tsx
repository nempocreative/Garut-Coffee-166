import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { InfoRow, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { extensionCases, extensionVisit } from '@/data/program';
import { useColors } from '@/hooks/useColors';

export default function ExtensionDashboardScreen() {
  const colors = useColors();
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
});