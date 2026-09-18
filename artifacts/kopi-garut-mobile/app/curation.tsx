import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { ProgramCard, ProgramIntro, ProgramSectionTitle, StatusPill } from '@/components/ProgramUI';
import { curationProducts, curationStages } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

export default function CurationScreen() {
  const colors = useColors();
  return (
    <Screen>
      <Header back title="Kurasi produk" subtitle="PROGRAM · KATALOG" />
      <ProgramIntro eyebrow="JALUR PRODUK" title="Dari daftar sampai katalog." description="Setiap produk melewati pemeriksaan yang sama agar pembeli menemukan kopi dengan cerita dan mutu yang jelas." />
      <ProgramCard muted>
        <Text style={[styles.pipelineEyebrow, { color: colors.primary }]}>ALUR KURASI</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pipeline}>
          {curationStages.map((stage, index) => <View key={stage} style={styles.stageWrap}><View style={[styles.stageDot, { backgroundColor: index === curationStages.length - 1 ? colors.primary : colors.card, borderColor: colors.primary }]}>{index < 4 && <BrandIcon name="check" size={13} color={colors.primary} />}</View><Text style={[styles.stageText, { color: colors.foreground }]}>{stage}</Text>{index < curationStages.length - 1 && <View style={[styles.stageLine, { backgroundColor: colors.border }]} />}</View>)}
        </ScrollView>
      </ProgramCard>
      <ProgramSectionTitle eyebrow="LOT YANG BERJALAN" title="Status produk" />
      <View style={styles.products}>
        {curationProducts.map((product) => <ProgramCard key={product.id}><View style={styles.productHeader}><View style={styles.productCopy}><Text style={[styles.productName, { color: colors.foreground }]}>{product.name}</Text><Text style={[styles.productProducer, { color: colors.mutedForeground }]}>{product.producer}</Text></View><StatusPill label={product.currentStage === 4 ? 'Diterima' : curationStages[product.currentStage]} positive={product.currentStage === 4} /></View><View style={styles.miniProgress}>{curationStages.map((stage, index) => <View key={stage} style={[styles.miniStep, { backgroundColor: index <= product.currentStage ? colors.primary : colors.muted }]} />)}</View><Text style={[styles.productNote, { color: colors.mutedForeground }]}>{product.note}</Text></ProgramCard>)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pipelineEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  pipeline: { paddingTop: 12, paddingBottom: 3, alignItems: 'flex-start' },
  stageWrap: { width: 112, alignItems: 'flex-start', position: 'relative', paddingRight: 12, gap: 7 },
  stageDot: { width: 27, height: 27, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  stageText: { fontFamily: 'Manrope_700Bold', fontSize: 10, lineHeight: 14 },
  stageLine: { position: 'absolute', top: 13, left: 27, right: 7, height: 1 },
  products: { gap: 10 },
  productHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  productCopy: { flex: 1, gap: 3 },
  productName: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18 },
  productProducer: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  miniProgress: { flexDirection: 'row', gap: 4, marginTop: 4 },
  miniStep: { flex: 1, height: 5, borderRadius: 3 },
  productNote: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});