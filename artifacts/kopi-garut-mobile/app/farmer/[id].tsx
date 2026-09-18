import React from 'react';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState, Header, Screen } from '@/components/AppUI';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function FarmerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const farmer = farmers.find((item) => item.id === id);
  const colors = useColors();
  if (!farmer) return <Screen><EmptyState title="Petani tidak ditemukan" text="Profil petani yang kamu cari belum tersedia." /></Screen>;
  return <Screen><Header title="Profil petani" subtitle="CERITA DARI KEBUN" cart={false} back /><Image source={farmer.image} contentFit="cover" style={styles.image} /><Text style={[styles.name, { color: colors.foreground }]}>{farmer.name}</Text><Text style={[styles.group, { color: colors.primary }]}>{farmer.group}</Text><Text style={[styles.story, { color: colors.mutedForeground }]}>{farmer.story}</Text><View style={[styles.facts, { backgroundColor: colors.card, borderColor: colors.border }]}><View><Text style={[styles.label, { color: colors.mutedForeground }]}>LOKASI</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.location}</Text></View><View><Text style={[styles.label, { color: colors.mutedForeground }]}>LUAS LAHAN</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.landArea}</Text></View><View><Text style={[styles.label, { color: colors.mutedForeground }]}>PRODUKSI / TAHUN</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.annualProduction}</Text></View></View><Text style={[styles.section, { color: colors.foreground }]}>Produk yang dihasilkan</Text><View style={styles.products}>{farmer.products.map((product) => <View key={product} style={[styles.product, { backgroundColor: colors.accent }]}><BrandIcon name="coffee" size={15} color={colors.accentForeground} /><Text style={[styles.productText, { color: colors.accentForeground }]}>{product}</Text></View>)}</View></Screen>;
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 230, borderRadius: 22, marginBottom: 18 },
  name: { fontSize: 27, fontWeight: '700' },
  group: { fontSize: 13, fontWeight: '700', marginTop: 4 },
  story: { fontSize: 14, lineHeight: 22, marginTop: 14 },
  facts: { borderWidth: 1, borderRadius: 18, padding: 14, gap: 13, marginTop: 18 },
  label: { fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  value: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 2 },
  products: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  product: { borderRadius: 11, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 6 },
  productText: { fontSize: 12, fontWeight: '700' },
});