import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, ProgramIntro, ProgramSectionTitle } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

type DiversificationCategory = 'Semua' | 'Olahan kopi' | 'Merchandise';

type DiversifiedProduct = {
  id: string;
  category: Exclude<DiversificationCategory, 'Semua'>;
  icon: BrandIconName;
  title: string;
  description: string;
  detail: string;
  price: string;
  status: string;
};

const categories: DiversificationCategory[] = ['Semua', 'Olahan kopi', 'Merchandise'];

const products: DiversifiedProduct[] = [
  {
    id: 'coffee-concentrate',
    category: 'Olahan kopi',
    icon: 'coffee',
    title: 'Konsentrat kopi gula aren',
    description: 'Kopi seduh dingin dengan gula aren dari Garut.',
    detail: 'Cocok untuk stok minuman di rumah atau menu kedai kecil.',
    price: 'Rp 28.000',
    status: 'Siap minum',
  },
  {
    id: 'coffee-cookies',
    category: 'Olahan kopi',
    icon: 'package',
    title: 'Cookies ampas kopi',
    description: 'Camilan renyah dengan aroma kopi yang ringan.',
    detail: 'Mengolah sisa kopi menjadi produk bernilai dan minim limbah.',
    price: 'Rp 35.000',
    status: 'Batch mingguan',
  },
  {
    id: 'coffee-soap',
    category: 'Olahan kopi',
    icon: 'repeat',
    title: 'Sabun scrub kopi',
    description: 'Perawatan tubuh dengan bubuk kopi pilihan.',
    detail: 'Dibuat bersama usaha lokal dengan formula yang lembut.',
    price: 'Rp 32.000',
    status: 'Produk UMKM',
  },
  {
    id: 'garut-tote-bag',
    category: 'Merchandise',
    icon: 'shopping-bag',
    title: 'Totebag lereng Garut',
    description: 'Tas kanvas dengan cerita wilayah kopi Garut.',
    detail: 'Edisi terbatas untuk membawa cerita kebun ke aktivitas harian.',
    price: 'Rp 79.000',
    status: 'Edisi petani',
  },
  {
    id: 'garut-mug',
    category: 'Merchandise',
    icon: 'coffee',
    title: 'Mug Kopi Garut',
    description: 'Teman seduh dengan ilustrasi lereng pilihan.',
    detail: 'Keramik lokal dengan ukuran pas untuk kopi pagi.',
    price: 'Rp 65.000',
    status: 'Stok terbatas',
  },
  {
    id: 'sticker-pack',
    category: 'Merchandise',
    icon: 'package',
    title: 'Paket pin & stiker',
    description: 'Set kecil untuk membawa identitas Kopi Garut.',
    detail: 'Isi tiga stiker dan satu pin enamel untuk koleksi.',
    price: 'Rp 25.000',
    status: 'Koleksi baru',
  },
];

export default function DiversificationScreen() {
  const colors = useColors();
  const router = useRouter();
  const [category, setCategory] = useState<DiversificationCategory>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const visibleProducts = useMemo(
    () => category === 'Semua' ? products : products.filter((product) => product.category === category),
    [category],
  );

  return (
    <Screen>
      <Header back title="Produk turunan" subtitle="KOLEKSI · DIVERSIFIKASI" cart={false} />
      <ProgramIntro
        eyebrow="LEBIH DARI BIJI KOPI"
        title="Ragam karya dari ekosistem kopi"
        description="Temukan olahan, kerajinan, dan merchandise yang memperpanjang nilai Kopi Garut sampai ke keseharian."
      />

      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroCopy}>
          <Text style={[styles.heroEyebrow, { color: colors.accent }]}>DIVERSIFIKASI PRODUK</Text>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Nilai kopi tumbuh lebih jauh.</Text>
          <Text style={[styles.heroDescription, { color: colors.primaryForeground }]}>
            Dari sisa produksi sampai karya UMKM, semuanya membuka peluang baru untuk ekosistem Garut.
          </Text>
        </View>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={[styles.heroValue, { color: colors.primaryForeground }]}>2</Text>
            <Text style={[styles.heroLabel, { color: colors.primaryForeground }]}>kategori</Text>
          </View>
          <View style={[styles.heroDivider, { backgroundColor: colors.primaryForeground }]} />
          <View style={styles.heroStat}>
            <Text style={[styles.heroValue, { color: colors.primaryForeground }]}>{products.length}</Text>
            <Text style={[styles.heroLabel, { color: colors.primaryForeground }]}>produk pilihan</Text>
          </View>
          <View style={[styles.heroMark, { backgroundColor: colors.primary }]}>
            <BrandIcon name="package" size={22} color={colors.primaryForeground} />
          </View>
        </View>
      </LinearGradient>

      <ProgramSectionTitle eyebrow="PILIH RAGAMNYA" title="Produk yang bisa dibawa pulang" />
      <View style={styles.filters}>
        {categories.map((item) => (
          <FilterChip
            key={item}
            label={item}
            selected={category === item}
            onPress={() => {
              setCategory(item);
              setSelectedProduct(null);
            }}
            testID={`diversification-filter-${item}`}
          />
        ))}
      </View>

      <View style={styles.productGrid}>
        {visibleProducts.map((product) => {
          const selected = selectedProduct === product.id;
          return (
            <Pressable
              key={product.id}
              testID={`diversification-product-${product.id}`}
              accessibilityRole="button"
              accessibilityLabel={`Lihat detail ${product.title}`}
              accessibilityState={{ expanded: selected }}
              onPress={() => setSelectedProduct(selected ? null : product.id)}
              style={({ pressed }) => [
                styles.productCard,
                {
                  backgroundColor: selected ? colors.secondary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View style={styles.productTop}>
                <View style={[styles.productIcon, { backgroundColor: selected ? colors.primary : colors.muted }]}>
                  <BrandIcon name={product.icon} size={19} color={selected ? colors.primaryForeground : colors.primary} />
                </View>
                <Text style={[styles.productCategory, { color: colors.primary }]}>{product.category}</Text>
              </View>
              <View style={styles.productCopy}>
                <Text style={[styles.productTitle, { color: colors.foreground }]}>{product.title}</Text>
                <Text numberOfLines={2} style={[styles.productDescription, { color: colors.mutedForeground }]}>{product.description}</Text>
              </View>
              <View style={styles.productFooter}>
                <Text style={[styles.productPrice, { color: colors.foreground }]}>{product.price}</Text>
                <Text style={[styles.productStatus, { color: colors.mutedForeground }]}>{product.status}</Text>
              </View>
              {selected && (
                <View style={[styles.productDetail, { borderTopColor: colors.border }]}>
                  <BrandIcon name="info" size={13} color={colors.primary} />
                  <Text style={[styles.productDetailText, { color: colors.mutedForeground }]}>{product.detail}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.note, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="users" size={16} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.foreground }]}>
          Ingin mengembangkan produk turunan? Buka halaman kemitraan untuk terhubung dengan tim Kopi Garut.
        </Text>
        <Pressable
          testID="diversification-partnership"
          accessibilityRole="button"
          accessibilityLabel="Buka kemitraan"
          onPress={() => router.push('/partnership')}
          hitSlop={8}
        >
          <BrandIcon name="arrow-up-right" size={17} color={colors.primary} />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 17, gap: 18, overflow: 'hidden' },
  heroCopy: { gap: 7 },
  heroEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.3 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, letterSpacing: -0.5, maxWidth: 260 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17, opacity: 0.78, maxWidth: 320 },
  heroStats: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroStat: { gap: 1 },
  heroValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 24 },
  heroLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9, opacity: 0.72 },
  heroDivider: { width: 1, height: 28, opacity: 0.3 },
  heroMark: { width: 43, height: 43, borderRadius: 15, marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  productCard: { width: '48.4%', borderWidth: 1, borderRadius: 19, padding: 12, gap: 12 },
  productTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  productIcon: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  productCategory: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.6, textTransform: 'uppercase' },
  productCopy: { gap: 4, minHeight: 66 },
  productTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 16 },
  productDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  productFooter: { gap: 3 },
  productPrice: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  productStatus: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  productDetail: { borderTopWidth: 1, paddingTop: 9, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  productDetailText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13 },
  note: { borderRadius: 17, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});