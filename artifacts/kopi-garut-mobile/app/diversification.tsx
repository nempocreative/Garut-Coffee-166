import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageSource } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, ProgramSectionTitle } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

type DiversificationCategory = 'Semua' | 'Olahan kopi' | 'Aroma kopi' | 'Merchandise';

type DiversifiedProduct = {
  id: string;
  category: Exclude<DiversificationCategory, 'Semua'>;
  icon: BrandIconName;
  title: string;
  price: string;
  status: string;
  image: ImageSource;
  badge: string;
};

const categories: DiversificationCategory[] = ['Semua', 'Olahan kopi', 'Aroma kopi', 'Merchandise'];

const products: DiversifiedProduct[] = [
  {
    id: 'essential-oil-kopi',
    category: 'Aroma kopi',
    icon: 'trending-up',
    title: 'Essential oil kopi',
    price: 'Rp 55.000',
    status: 'Aroma kopi premium',
    image: require('../assets/images/origin-coffee.jpg'),
    badge: 'Produk baru',
  },
  {
    id: 'pewangi-sepatu-kopi',
    category: 'Aroma kopi',
    icon: 'package',
    title: 'Pewangi sepatu kopi',
    price: 'Rp 32.000',
    status: 'Aroma tahan lama',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Upcycle ampas',
  },
  {
    id: 'minyak-aroma-kopi',
    category: 'Aroma kopi',
    icon: 'repeat',
    title: 'Minyak aroma kopi',
    price: 'Rp 42.000',
    status: 'Blend lokal Garut',
    image: require('../assets/images/hero-coffee.jpg'),
    badge: 'Produk UMKM',
  },
  {
    id: 'coffee-concentrate',
    category: 'Olahan kopi',
    icon: 'coffee',
    title: 'Konsentrat kopi gula aren',
    price: 'Rp 28.000',
    status: 'Siap minum',
    image: require('../assets/images/hero-coffee.jpg'),
    badge: 'Favorit baru',
  },
  {
    id: 'coffee-cookies',
    category: 'Olahan kopi',
    icon: 'package',
    title: 'Cookies ampas kopi',
    price: 'Rp 35.000',
    status: 'Batch mingguan',
    image: require('../assets/images/origin-coffee.jpg'),
    badge: 'Batch kecil',
  },
  {
    id: 'coffee-soap',
    category: 'Olahan kopi',
    icon: 'repeat',
    title: 'Sabun scrub kopi',
    price: 'Rp 32.000',
    status: 'Produk UMKM',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Terbuat dari ampas',
  },
  {
    id: 'garut-tote-bag',
    category: 'Merchandise',
    icon: 'shopping-bag',
    title: 'Totebag lereng Garut',
    price: 'Rp 79.000',
    status: 'Edisi petani',
    image: require('../assets/images/mountain-banner.png'),
    badge: 'Edisi terbatas',
  },
  {
    id: 'garut-mug',
    category: 'Merchandise',
    icon: 'coffee',
    title: 'Mug Kopi Garut',
    price: 'Rp 65.000',
    status: 'Stok terbatas',
    image: require('../assets/images/event-festival-garut.jpg'),
    badge: 'Koleksi rumah',
  },
  {
    id: 'sticker-pack',
    category: 'Merchandise',
    icon: 'package',
    title: 'Paket pin & stiker',
    price: 'Rp 25.000',
    status: 'Koleksi baru',
    image: require('../assets/images/kopi-garut-promo-banner.jpg'),
    badge: 'Koleksi baru',
  },
];

export default function DiversificationScreen() {
  const colors = useColors();
  const [category, setCategory] = useState<DiversificationCategory>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const visibleProducts = useMemo(
    () => category === 'Semua' ? products : products.filter((product) => product.category === category),
    [category],
  );

  return (
    <Screen>
      <Header back title="Produk turunan" subtitle="KOLEKSI · DIVERSIFIKASI" cart={false} />

      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroCopy}>
          <Text style={[styles.heroEyebrow, { color: colors.accent }]}>DIVERSIFIKASI PRODUK</Text>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Lebih dari biji kopi.</Text>
        </View>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={[styles.heroValue, { color: colors.primaryForeground }]}>{categories.length - 1}</Text>
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

      <ProgramSectionTitle title="Koleksi pilihan" />
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
              <View style={styles.productImageWrap}>
                <Image source={product.image} contentFit="cover" style={styles.productImage} />
                <LinearGradient
                  colors={['transparent', `${colors.foreground}54`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.productImageShade}
                />
                <View style={[styles.productBadge, { backgroundColor: colors.accent }]}>
                  <Text style={[styles.productBadgeText, { color: colors.accentForeground }]}>{product.badge}</Text>
                </View>
                <View style={[styles.productSelected, { backgroundColor: selected ? colors.primary : colors.card }]}>
                  <BrandIcon name={selected ? 'check' : product.icon} size={15} color={selected ? colors.primaryForeground : colors.primary} />
                </View>
              </View>
              <View style={styles.productBody}>
                <View style={styles.productTop}>
                  <Text style={[styles.productCategory, { color: colors.primary }]}>{product.category}</Text>
                  <BrandIcon name="arrow-up-right" size={14} color={colors.mutedForeground} />
                </View>
                <Text numberOfLines={2} style={[styles.productTitle, { color: colors.foreground }]}>{product.title}</Text>
                <Text numberOfLines={1} style={[styles.productStatus, { color: colors.mutedForeground }]}>{product.status}</Text>
                <View style={[styles.productDivider, { backgroundColor: colors.border }]} />
                <View style={styles.productFooter}>
                  <Text style={[styles.productPrice, { color: colors.foreground }]}>{product.price}</Text>
                  <Text style={[styles.productAction, { color: selected ? colors.primary : colors.mutedForeground }]}>{selected ? 'Dipilih' : 'Lihat'}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 17, gap: 18, overflow: 'hidden' },
  heroCopy: { gap: 5 },
  heroEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.3 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 28, letterSpacing: -0.5 },
  heroStats: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroStat: { gap: 1 },
  heroValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 24 },
  heroLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9, opacity: 0.72 },
  heroDivider: { width: 1, height: 28, opacity: 0.3 },
  heroMark: { width: 43, height: 43, borderRadius: 15, marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  productCard: { width: '48.4%', borderWidth: 1, borderRadius: 19, overflow: 'hidden' },
  productImageWrap: { height: 126, position: 'relative' },
  productImage: { width: '100%', height: '100%' },
  productImageShade: StyleSheet.absoluteFill,
  productBadge: { position: 'absolute', left: 9, top: 9, borderRadius: 7, paddingHorizontal: 7, paddingVertical: 5, maxWidth: '78%' },
  productBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.15 },
  productSelected: { position: 'absolute', right: 9, top: 9, width: 31, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, shadowRadius: 4, elevation: 3 },
  productBody: { padding: 11, gap: 6 },
  productTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5 },
  productCategory: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.6, textTransform: 'uppercase' },
  productTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17, minHeight: 34 },
  productStatus: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  productDivider: { height: 1, marginTop: 2 },
  productFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  productPrice: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  productAction: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
});