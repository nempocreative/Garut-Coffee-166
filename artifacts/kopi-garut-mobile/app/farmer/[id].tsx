import React from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState, Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { coffees } from '@/data/coffees';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

export default function FarmerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const farmer = farmers.find((item) => item.id === id);
  const colors = useColors();
  if (!farmer) return <Screen><EmptyState title="Petani tidak ditemukan" text="Profil petani yang kamu cari belum tersedia." action="Kembali ke daftar" onAction={() => router.replace('/farmers')} /></Screen>;
  const farmerCoffee = coffees.find((coffee) => farmer.products.includes(coffee.series));

  return (
    <Screen>
      <Header title="Profil petani" subtitle="CERITA DARI KEBUN" cart={false} back />
      <View style={styles.hero}>
        <Image source={farmer.image} contentFit="cover" style={StyleSheet.absoluteFill} />
        <LinearGradient colors={['transparent', colors.foreground]} locations={[0.1, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.heroCopy}>
          <View style={styles.heroTag}><BrandIcon name="map-pin" size={12} color={colors.primaryForeground} /><Text style={[styles.heroTagText, { color: colors.primaryForeground }]}>{farmer.location}</Text></View>
          <Text style={[styles.heroName, { color: colors.card }]}>{farmer.name}</Text>
          <Text style={[styles.heroGroup, { color: colors.background }]}>{farmer.group}</Text>
        </View>
      </View>
      <View style={styles.storyHeader}><Text style={[styles.kicker, { color: colors.primary }]}>CATATAN DARI KEBUN</Text><Text style={[styles.storyTitle, { color: colors.foreground }]}>Menjaga rasa dari sumbernya.</Text><Text style={[styles.story, { color: colors.mutedForeground }]}>{farmer.story}</Text></View>
      <View style={[styles.facts, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>LOKASI</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.location}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="grid" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>LUAS LAHAN</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.landArea}</Text></View>
        <View style={styles.fact}><View style={[styles.factIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="trending-up" size={16} color={colors.primary} /></View><Text style={[styles.label, { color: colors.mutedForeground }]}>PRODUKSI / TAHUN</Text><Text style={[styles.value, { color: colors.foreground }]}>{farmer.annualProduction}</Text></View>
      </View>
      <View style={styles.sectionHeading}><View><Text style={[styles.kicker, { color: colors.primary }]}>HASIL KEBUN</Text><Text style={[styles.section, { color: colors.foreground }]}>Produk yang dihasilkan</Text></View><BrandIcon name="coffee" size={21} color={colors.primary} /></View>
      <View style={styles.products}>
        {farmer.products.map((product) => <Pressable key={product} onPress={() => farmerCoffee && router.push(`/product/${farmerCoffee.id}`)} style={({ pressed }) => [styles.product, { backgroundColor: colors.accent, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name="coffee" size={16} color={colors.accentForeground} /><View style={styles.productCopy}><Text style={[styles.productText, { color: colors.accentForeground }]}>{product}</Text>{farmerCoffee && <Text style={[styles.productMeta, { color: colors.accentForeground }]}>Lihat profil kopi dan catatan rasanya</Text>}</View><BrandIcon name="arrow-up-right" size={15} color={colors.accentForeground} /></Pressable>)}
      </View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}>
        <View style={[styles.noteIcon, { backgroundColor: colors.primary }]}><BrandIcon name="heart" size={16} color={colors.primaryForeground} /></View>
        <View style={styles.noteCopy}><Text style={[styles.noteTitle, { color: colors.foreground }]}>Setiap pembelian mendukung kebun</Text><Text style={[styles.noteText, { color: colors.mutedForeground }]}>Kenali asalnya, nikmati rasanya, dan ikut menjaga cerita petani tetap berjalan.</Text></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { height: 286, borderRadius: 23, overflow: 'hidden' },
  heroCopy: { flex: 1, justifyContent: 'flex-end', padding: 17, gap: 5 },
  heroTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroTagText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  heroName: { fontFamily: 'Manrope_700Bold', fontSize: 30, lineHeight: 35, fontWeight: '800', letterSpacing: -0.8 },
  heroGroup: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  storyHeader: { gap: 5 },
  kicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  storyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', marginTop: 1 },
  story: { fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 22, marginTop: 4 },
  facts: { borderWidth: 1, borderRadius: 19, padding: 13, gap: 13 },
  fact: { minHeight: 42, paddingLeft: 47, justifyContent: 'center', position: 'relative', gap: 2 },
  factIcon: { position: 'absolute', left: 0, top: 1, width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1.1, fontWeight: '800' },
  value: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  section: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 25, fontWeight: '700', marginTop: 4 },
  products: { gap: 9 },
  product: { minHeight: 63, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  productCopy: { flex: 1, gap: 3 },
  productText: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  productMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  note: { borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  noteCopy: { flex: 1, gap: 3 },
  noteTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  noteText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});