import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { ProgramCard, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { standards } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

export default function StandardsScreen() {
  const colors = useColors();
  return (
    <Screen>
      <Header back title="Standar Kopi Garut" subtitle="PROGRAM · MUTU" />
      <ProgramIntro eyebrow="RUJUKAN MUTU INTERNAL" title="Satu bahasa untuk kualitas." description="Standar ini menjadi acuan bersama sebelum sebuah lot diberi label Kopi Garut dan masuk ke katalog." />
      <View style={[styles.notice, { backgroundColor: colors.foreground }]}><BrandIcon name="info" size={19} color={colors.accent} /><Text style={[styles.noticeText, { color: colors.card }]}>Standar dibaca bersama catatan lot, hasil cupping, dan kondisi panen. Bukan sekadar angka.</Text></View>
      <ProgramSectionTitle eyebrow="ENAM PINTU PENILAIAN" title="Checklist mutu" />
      <View style={styles.grid}>
        {standards.map((item) => <ProgramCard key={item.title}><View style={styles.cardTop}><View style={[styles.icon, { backgroundColor: colors.secondary }]}><BrandIcon name={item.icon} size={17} color={colors.primary} /></View><Text style={[styles.itemTitle, { color: colors.foreground }]}>{item.title}</Text></View><Text style={[styles.value, { color: colors.primary }]}>{item.value}</Text><Text style={[styles.detail, { color: colors.mutedForeground }]}>{item.detail}</Text></ProgramCard>)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notice: { borderRadius: 19, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 10 },
  noticeText: { flex: 1, fontFamily: 'Manrope_600SemiBold', fontSize: 12, lineHeight: 18 },
  grid: { gap: 10 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  icon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14 },
  value: { fontFamily: 'Manrope_700Bold', fontSize: 17, marginTop: 3 },
  detail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});