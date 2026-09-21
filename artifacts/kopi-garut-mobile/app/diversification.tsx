import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageSource } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FilterChip, ProgramSectionTitle } from '@/components/ProgramUI';
import { useColors } from '@/hooks/useColors';

type DiversificationCategory = 'Semua' | 'Olahan kopi' | 'Aroma & perawatan' | 'Merchandise' | 'Paket hadiah';

type DiversifiedProduct = {
  id: string;
  category: Exclude<DiversificationCategory, 'Semua'>;
  icon: BrandIconName;
  title: string;
  price: string;
  status: string;
  image: ImageSource;
  badge: string;
  description?: string;
  maker?: string;
  impact?: string;
  size?: string;
};

const categories: DiversificationCategory[] = ['Semua', 'Olahan kopi', 'Aroma & perawatan', 'Merchandise', 'Paket hadiah'];

const products: DiversifiedProduct[] = [
  {
    id: 'essential-oil-kopi',
    category: 'Aroma & perawatan',
    icon: 'trending-up',
    title: 'Essential oil kopi',
    price: 'Rp 55.000',
    status: 'Aroma kopi premium',
    image: require('../assets/images/origin-coffee.jpg'),
    badge: 'Produk baru',
  },
  {
    id: 'pewangi-sepatu-kopi',
    category: 'Aroma & perawatan',
    icon: 'package',
    title: 'Pewangi sepatu kopi',
    price: 'Rp 32.000',
    status: 'Aroma tahan lama',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Upcycle ampas',
  },
  {
    id: 'minyak-aroma-kopi',
    category: 'Aroma & perawatan',
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
  {
    id: 'cold-brew-concentrate',
    category: 'Olahan kopi',
    icon: 'coffee',
    title: 'Cold brew konsentrat',
    price: 'Rp 45.000',
    status: 'Seduh dingin 12 jam',
    image: require('../assets/images/hero-coffee.jpg'),
    badge: 'Siap racik',
    description: 'Kopi dingin dengan rasa cokelat dan karamel untuk campuran susu.',
    maker: 'Roastery Papandayan',
    impact: 'Biji dari lot petani terverifikasi',
    size: '500 ml',
  },
  {
    id: 'granola-ampas-kopi',
    category: 'Olahan kopi',
    icon: 'package',
    title: 'Granola ampas kopi',
    price: 'Rp 39.000',
    status: 'Sarapan renyah',
    image: require('../assets/images/origin-coffee.jpg'),
    badge: 'Zero waste',
    description: 'Granola oat, kelapa, dan kacang dengan sentuhan pahit kopi yang ringan.',
    maker: 'Dapur Pangan Cisurupan',
    impact: 'Mengurangi sisa ampas dari proses seduh',
    size: '180 g',
  },
  {
    id: 'lilin-aroma-kopi',
    category: 'Aroma & perawatan',
    icon: 'circle',
    title: 'Lilin aroma kopi',
    price: 'Rp 68.000',
    status: 'Waktu nyala 24 jam',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Ruang lebih hangat',
    description: 'Lilin soy wax dengan aroma kopi panggang untuk ruang istirahat.',
    maker: 'Rumah Aroma Cikuray',
    impact: 'Wadah dapat dipakai ulang sebagai pot kecil',
    size: '100 g',
  },
  {
    id: 'coffee-dripper-keramik',
    category: 'Merchandise',
    icon: 'coffee',
    title: 'Dripper keramik Garut',
    price: 'Rp 125.000',
    status: 'Buat seduhan manual',
    image: require('../assets/images/mountain-banner.png'),
    badge: 'Dibuat tangan',
    description: 'Dripper keramik dengan motif lereng untuk ritual seduh yang tenang.',
    maker: 'Keramik Cikajang',
    impact: 'Mendukung bengkel keramik keluarga',
    size: '1 dripper',
  },
  {
    id: 'gift-set-ritual-pagi',
    category: 'Paket hadiah',
    icon: 'shopping-bag',
    title: 'Paket ritual pagi',
    price: 'Rp 165.000',
    status: 'Kopi, mug, dan cerita',
    image: require('../assets/images/kopi-garut-promo-banner.jpg'),
    badge: 'Paling lengkap',
    description: 'Satu paket untuk memulai hari: kopi pilihan, mug, dan kartu cerita.',
    maker: 'Kolektif Kopi Garut',
    impact: 'Nilai belanja dibagi untuk petani dan perajin',
    size: '3 item',
  },
  {
    id: 'gift-set-upcycle',
    category: 'Paket hadiah',
    icon: 'repeat',
    title: 'Paket sirkular ampas',
    price: 'Rp 89.000',
    status: 'Aroma dan perawatan',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Pilihan sadar',
    description: 'Pewangi sepatu dan sabun scrub yang memulai hidup kedua ampas kopi.',
    maker: 'Koperasi Rasa Garut',
    impact: 'Dua produk dari satu alur pemanfaatan ampas',
    size: '2 item',
  },
];

export default function DiversificationScreen() {
  const colors = useColors();
  const [category, setCategory] = useState<DiversificationCategory>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);

  const visibleProducts = useMemo(
    () => category === 'Semua' ? products : products.filter((product) => product.category === category),
    [category],
  );
  const selected = products.find((product) => product.id === selectedProduct);
  const isSaved = selected ? savedProducts.includes(selected.id) : false;

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
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Cerita kopi dalam banyak bentuk.</Text>
          <Text style={[styles.heroDescription, { color: colors.primaryForeground }]}>Temukan olahan, aroma, hadiah, dan karya lokal yang tumbuh dari ekosistem kopi Garut.</Text>
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

      <ProgramSectionTitle eyebrow="PILIHAN BERDAMPAK" title="Koleksi pilihan" />
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

      {selected && (
        <View style={[styles.detailPanel, { backgroundColor: colors.secondary, borderColor: colors.primary }]}>
          <View style={styles.detailHeader}>
            <View style={styles.detailHeading}>
              <Text style={[styles.detailEyebrow, { color: colors.primary }]}>{selected.category.toUpperCase()}</Text>
              <Text style={[styles.detailTitle, { color: colors.foreground }]}>{selected.title}</Text>
            </View>
            <Pressable
              testID={`diversification-save-${selected.id}`}
              accessibilityRole="button"
              accessibilityLabel={isSaved ? `Hapus ${selected.title} dari koleksi` : `Simpan ${selected.title} ke koleksi`}
              onPress={() => setSavedProducts((current) => isSaved ? current.filter((id) => id !== selected.id) : [...current, selected.id])}
              style={({ pressed }) => [styles.saveButton, { backgroundColor: isSaved ? colors.primary : colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 }]}
            >
              <BrandIcon name="heart" size={17} color={isSaved ? colors.primaryForeground : colors.primary} />
            </Pressable>
          </View>
          <Text style={[styles.detailDescription, { color: colors.mutedForeground }]}>{selected.description ?? selected.status}</Text>
          <View style={styles.detailMeta}>
            <View style={styles.detailMetaItem}>
              <Text style={[styles.detailMetaLabel, { color: colors.mutedForeground }]}>DIBUAT OLEH</Text>
              <Text style={[styles.detailMetaValue, { color: colors.foreground }]}>{selected.maker ?? 'Pelaku usaha kopi Garut'}</Text>
            </View>
            <View style={styles.detailMetaItem}>
              <Text style={[styles.detailMetaLabel, { color: colors.mutedForeground }]}>UKURAN</Text>
              <Text style={[styles.detailMetaValue, { color: colors.foreground }]}>{selected.size ?? 'Produk pilihan'}</Text>
            </View>
          </View>
          <View style={[styles.impactNote, { backgroundColor: colors.card }]}>
            <BrandIcon name="trending-up" size={15} color={colors.primary} />
            <Text style={[styles.impactText, { color: colors.foreground }]}>{selected.impact ?? 'Membawa nilai tambah untuk ekosistem kopi lokal'}</Text>
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 17, gap: 16, overflow: 'hidden' },
  heroCopy: { gap: 5 },
  heroEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.3 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 28, letterSpacing: -0.5, maxWidth: 300 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.76, maxWidth: 310 },
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
  detailPanel: { borderWidth: 1, borderRadius: 20, padding: 15, gap: 12, marginTop: 16, marginBottom: 18 },
  detailHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  detailHeading: { flex: 1, gap: 4 },
  detailEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.1 },
  detailTitle: { fontFamily: 'Manrope_700Bold', fontSize: 19, lineHeight: 24 },
  saveButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  detailDescription: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 },
  detailMeta: { flexDirection: 'row', gap: 18 },
  detailMetaItem: { flex: 1, gap: 3 },
  detailMetaLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.9 },
  detailMetaValue: { fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 15 },
  impactNote: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 12, padding: 10 },
  impactText: { flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 10, lineHeight: 14 },
});