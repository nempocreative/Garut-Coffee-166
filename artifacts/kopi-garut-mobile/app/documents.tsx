import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { FilterChip, ProgramCard, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { DocumentCategory, documentCategories, documents } from '@/data/program';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

export default function DocumentsScreen() {
  const colors = useColors();
  const [category, setCategory] = useState<DocumentCategory>('Semua');
  const [saved, setSaved] = useState<string[]>([]);
  const visibleDocuments = useMemo(() => category === 'Semua' ? documents : documents.filter((document) => document.category === category), [category]);
  return (
    <Screen>
      <Header back title="Pusat dokumen" subtitle="PROGRAM · RUJUKAN" />
      <ProgramIntro eyebrow="RUANG BELAJAR & KERJA" title="Bawa panduan ke lapangan." description="Materi yang ringkas untuk budidaya, pascapanen, pelatihan, regulasi, dan formulir program." />
      <ProgramSectionTitle eyebrow="PILIH KATEGORI" title="Dokumen tersedia" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{documentCategories.map((item) => <FilterChip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} testID={`document-category-${item}`} />)}</ScrollView>
      <View style={styles.list}>
        {visibleDocuments.map((document) => {
          const isSaved = saved.includes(document.id);
          return <Pressable key={document.id} testID={`document-${document.id}`} accessibilityRole="button" accessibilityLabel={`${isSaved ? 'Hapus simpanan' : 'Simpan'} ${document.title}`} onPress={() => setSaved((current) => isSaved ? current.filter((id) => id !== document.id) : [...current, document.id])} style={({ pressed }) => [styles.document, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}><View style={[styles.documentIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={document.icon} size={19} color={colors.primary} /></View><View style={styles.documentCopy}><Text style={[styles.documentTitle, { color: colors.foreground }]}>{document.title}</Text><Text style={[styles.documentMeta, { color: colors.primary }]}>{document.category} · {document.meta}</Text><Text style={[styles.documentDetail, { color: colors.mutedForeground }]}>{document.detail}</Text></View><View style={[styles.saveMark, { backgroundColor: isSaved ? colors.primary : colors.muted }]}><BrandIcon name={isSaved ? 'check' : 'plus'} size={14} color={isSaved ? colors.primaryForeground : colors.mutedForeground} /></View></Pressable>;
        })}
      </View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}><BrandIcon name="info" size={16} color={colors.primary} /><Text style={[styles.noteText, { color: colors.foreground }]}>Ketuk dokumen untuk menandainya sebagai rujukan cepat di perangkat ini.</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { gap: 8, paddingRight: 12 },
  list: { gap: 10 },
  document: { borderWidth: 1, borderRadius: 19, padding: 13, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  documentIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  documentCopy: { flex: 1, gap: 4 },
  documentTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17 },
  documentMeta: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  documentDetail: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  saveMark: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  note: { borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});