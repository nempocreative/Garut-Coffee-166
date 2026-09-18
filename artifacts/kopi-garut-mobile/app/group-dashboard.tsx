import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { InfoRow, MetricCard, ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { groupMetrics, groupRequests, groupSchedule } from '@/data/program';
import { useColors } from '@/hooks/useColors';

export default function GroupDashboardScreen() {
  const colors = useColors();
  return (
    <Screen>
      <Header back title="Dashboard kelompok" subtitle="KELOMPOK TANI · CIKURAY" />
      <ProgramIntro eyebrow="RUANG KETUA KELOMPOK" title="KTH Cikuray Mandiri" description="Ringkasan yang membantu ketua kelompok melihat gerak anggota, hasil kebun, dan peluang yang perlu ditindaklanjuti." />
      <View style={styles.metrics}>{groupMetrics.map((metric) => <MetricCard key={metric.label} icon={metric.icon} value={metric.value} label={metric.label} detail={metric.change} />)}</View>
      <ProgramSectionTitle eyebrow="PERLU PERHATIAN" title="Permintaan & bantuan" />
      <View style={styles.cards}>{groupRequests.map((item) => <ProgramCard key={item.title}><View style={styles.requestTop}><View style={styles.requestCopy}><Text style={[styles.requestTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.requestBuyer, { color: colors.mutedForeground }]}>{item.buyer}</Text></View><StatusPill label={item.status} positive={item.status === 'Menunggu respons'} /></View><Text style={[styles.requestDetail, { color: colors.mutedForeground }]}>{item.detail}</Text></ProgramCard>)}</View>
      <ProgramSectionTitle eyebrow="JADWAL KELOMPOK" title="Tiga agenda terdekat" />
      <ProgramCard>{groupSchedule.map((item, index) => <InfoRow key={item.title} icon={item.icon} label={item.date} value={item.title} detail={item.location} last={index === groupSchedule.length - 1} />)}</ProgramCard>
      <View style={[styles.footerSignal, { backgroundColor: colors.secondary }]}><Text style={[styles.footerKicker, { color: colors.primary }]}>RINGKASAN HARI INI</Text><Text style={[styles.footerText, { color: colors.foreground }]}>42 anggota aktif · 7 lot tercatat · 2 permintaan baru</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  cards: { gap: 10 },
  requestTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  requestCopy: { flex: 1, gap: 3 },
  requestTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  requestBuyer: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  requestDetail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  footerSignal: { borderRadius: 18, padding: 14, gap: 4 },
  footerKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  footerText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12 },
});