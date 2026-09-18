import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { verificationItems } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

export default function VerificationScreen() {
  const colors = useColors();
  const verified = verificationItems.filter((item) => item.status === 'Terverifikasi').length;
  return (
    <Screen>
      <Header back title="Verifikasi" subtitle="PROGRAM · MUTU" />
      <ProgramIntro eyebrow="KEPERCAYAAN DIMULAI DARI DATA" title="Profil yang siap dipercaya." description="Empat lapis verifikasi membantu pembeli mengenali petani, kebun, dan produk Kopi Garut dengan lebih yakin." />
      <ProgramCard muted>
        <View style={styles.summaryTop}><View><Text style={[styles.summaryEyebrow, { color: colors.primary }]}>KELENGKAPAN PROFIL</Text><Text style={[styles.summaryValue, { color: colors.foreground }]}>{verified} dari {verificationItems.length} status</Text></View><View style={[styles.summaryMark, { backgroundColor: colors.primary }]}><BrandIcon name="shield" size={21} color={colors.primaryForeground} /></View></View>
        <View style={[styles.progressTrack, { backgroundColor: colors.card }]}><View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(verified / verificationItems.length) * 100}%` }]} /></View>
        <Text style={[styles.summaryText, { color: colors.mutedForeground }]}>Selesaikan produk untuk membuka label Terverifikasi di katalog.</Text>
      </ProgramCard>
      <ProgramSectionTitle eyebrow="EMPAT LAPIS VERIFIKASI" title="Yang sudah diperiksa" />
      <View style={styles.list}>
        {verificationItems.map((item) => (
          <ProgramCard key={item.label}>
            <View style={styles.row}><View style={[styles.rowIcon, { backgroundColor: item.status === 'Terverifikasi' ? colors.secondary : colors.muted }]}><BrandIcon name={item.icon} size={18} color={item.status === 'Terverifikasi' ? colors.primary : colors.mutedForeground} /></View><View style={styles.rowCopy}><Text style={[styles.rowTitle, { color: colors.foreground }]}>{item.label}</Text><Text style={[styles.rowDetail, { color: colors.mutedForeground }]}>{item.detail}</Text></View><StatusPill label={item.status} positive={item.status === 'Terverifikasi'} /></View>
          </ProgramCard>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  summaryValue: { fontFamily: 'Manrope_700Bold', fontSize: 22, marginTop: 4 },
  summaryMark: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 8, borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  summaryText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  list: { gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  rowCopy: { flex: 1, gap: 3 },
  rowTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  rowDetail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15 },
});