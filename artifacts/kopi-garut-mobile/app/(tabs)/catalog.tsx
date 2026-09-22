import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BrandIcon } from '@/components/BrandIcon';
import { CoffeeCard, Header, SearchBar, useBottomMenuPadding } from '@/components/AppUI';
import { coffees, type Coffee } from '@/data/coffees';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { useScrollVisibility } from '@/context/ScrollVisibilityContext';

const filters = ['Semua', 'Cerah', 'Buah', 'Harian', 'Nyaman'];
export default function CatalogScreen() {
  const colors = useColors();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding();
  const { notifyScroll } = useScrollVisibility();
  const listRef = useRef<FlatList<Coffee>>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const visible = useMemo(() => coffees.filter((coffee) => (filter === 'Semua' || coffee.category === filter) && `${coffee.name} ${coffee.origin} ${coffee.tastingNotes.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  // Keep the editorial banner distinct from the product grid below.
  // This avoids showing the same Papandayan pack twice in the first viewport.
  const featuredCoffee = coffees[0];
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [pathname]);
  return <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? 67 : insets.top }}>
    <FlatList
      ref={listRef}
      data={visible}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.content, { paddingBottom: bottomMenuPadding }]}
      columnWrapperStyle={styles.row}
      onScroll={notifyScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.headerContent}>
          <Header title="Jelajahi kopi" />
          <Pressable
            testID="catalog-featured-coffee"
            accessibilityRole="button"
            accessibilityLabel={`Buka ${featuredCoffee.name}`}
            onPress={() => router.push(`/product/${featuredCoffee.id}`)}
            style={({ pressed }) => [styles.featuredCard, { opacity: pressed ? 0.9 : 1, shadowColor: colors.foreground }]}
          >
            <Image source={require('../../assets/images/hero-coffee.webp')} contentFit="cover" style={styles.featuredImage} />
            <LinearGradient
              colors={[`${colors.foreground}E8`, `${colors.foreground}72`, `${colors.foreground}08`]}
              locations={[0, 0.62, 1]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.featuredCopy}>
              <View style={[styles.featuredEyebrow, { backgroundColor: colors.accent }]}>
                <Text style={[styles.featuredEyebrowText, { color: colors.accentForeground }]}>KURASI MINGGU INI</Text>
              </View>
              <Text style={[styles.featuredTitle, { color: colors.card }]}>Temukan rasa yang cocok dengan ritmemu</Text>
              <Text style={[styles.featuredDescription, { color: colors.card }]}>{featuredCoffee.name} · {featuredCoffee.tastingNotes.slice(0, 2).join(' dan ')}</Text>
              <View style={styles.featuredAction}>
                <Text style={[styles.featuredActionText, { color: colors.card }]}>Lihat kurasi</Text>
                <BrandIcon name="arrow-up-right" size={15} color={colors.accent} />
              </View>
            </View>
          </Pressable>
          <View style={styles.searchHeading}>
            <View>
              <Text style={[styles.searchTitle, { color: colors.foreground }]}>Cari kopi pilihanmu</Text>
              <Text style={[styles.searchHint, { color: colors.mutedForeground }]}>Dari kebun Garut, untuk ritualmu</Text>
            </View>
            <View style={[styles.searchBadge, { backgroundColor: colors.secondary }]}>
              <BrandIcon name="coffee" size={14} color={colors.primary} />
            </View>
          </View>
          <SearchBar value={query} onChangeText={setQuery} />
          <View style={styles.filterHeading}>
            <Text style={[styles.filterTitle, { color: colors.foreground }]}>Pilih suasana</Text>
            <Text style={[styles.filterHint, { color: colors.mutedForeground }]}>Geser untuk melihat semua</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {filters.map((item) => <Pressable testID={`filter-${item}`} key={item} onPress={() => setFilter(item)} style={({ pressed }) => [styles.filter, { backgroundColor: filter === item ? colors.primary : colors.secondary, borderColor: filter === item ? colors.primary : colors.border, opacity: pressed ? 0.72 : 1 }]}>
              {filter === item && <BrandIcon name="check" size={13} color={colors.primaryForeground} />}
              <Text style={{ color: filter === item ? colors.primaryForeground : colors.foreground, fontSize: 12, fontWeight: '700' }}>{item}</Text>
            </Pressable>)}
          </ScrollView>
          <View style={[styles.resultRow, { borderTopColor: colors.border }]}>
            <View>
              <Text style={[styles.result, { color: colors.foreground }]}>{visible.length} produk pilihan</Text>
              <Text style={[styles.resultHint, { color: colors.mutedForeground }]}>{filter === 'Semua' ? 'Siap menemani setiap ritual' : `Nuansa ${filter.toLowerCase()} untuk hari ini`}</Text>
            </View>
            <View style={styles.resultStatus}>
              <View style={[styles.statusDot, { backgroundColor: colors.accent }]} />
              <Text style={[styles.resultLabel, { color: colors.mutedForeground }]}>TERSEDIA</Text>
            </View>
          </View>
        </View>
      }
      renderItem={({ item, index }) => <CoffeeCard coffee={item} index={index} grid />}
      ListEmptyComponent={<Text style={[styles.noResults, { color: colors.mutedForeground }]}>Tidak ada kopi yang cocok. Coba cari nama, asal, atau catatan rasa lain.</Text>}
    />
  </View>;
}
const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 16, gap: 14 },
  headerContent: { gap: 14 },
  row: { gap: 12, alignItems: 'stretch' },
  featuredCard: { height: 184, borderRadius: 24, overflow: 'hidden', position: 'relative', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.16, shadowRadius: 12, elevation: 4 },
  featuredImage: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  featuredCopy: { flex: 1, justifyContent: 'flex-end', padding: 17, gap: 6 },
  featuredEyebrow: { alignSelf: 'flex-start', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5 },
  featuredEyebrowText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  featuredTitle: { maxWidth: 280, fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 26, fontWeight: '700', letterSpacing: -0.55 },
  featuredDescription: { fontFamily: 'Manrope_400Regular', fontSize: 12, opacity: 0.9 },
  featuredAction: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 },
  featuredActionText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  searchHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  searchTitle: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700', letterSpacing: -0.2 },
  searchHint: { fontFamily: 'Manrope_400Regular', fontSize: 11, marginTop: 3 },
  searchBadge: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  filterHeading: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2 },
  filterTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  filterHint: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  filterRow: { gap: 8, paddingRight: 20 },
  filter: { minHeight: 38, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  resultRow: { borderTopWidth: 1, paddingTop: 12, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  result: { fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '700' },
  resultHint: { fontFamily: 'Manrope_400Regular', fontSize: 11, marginTop: 3 },
  resultStatus: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  resultLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  noResults: { textAlign: 'center', marginTop: 50, paddingHorizontal: 30, lineHeight: 21 },
});