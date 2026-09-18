import React, { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { EmptyState, Header, Screen, SearchBar } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { farmers, hubStats } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const filters = ['Semua', 'Cisurupan', 'Cikajang', 'Pakenjeng', 'Samarang'];

export default function FarmersScreen() {
  const colors = useColors();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const visibleFarmers = useMemo(() => farmers.filter((farmer) => {
    const matchesFilter = filter === 'Semua' || farmer.location.startsWith(filter);
    const searchable = `${farmer.name} ${farmer.group} ${farmer.location} ${farmer.products.join(' ')}`.toLowerCase();
    return matchesFilter && searchable.includes(query.toLowerCase());
  }), [filter, query]);
  const featured = visibleFarmers[0];

  return (
    <Screen>
      <Header title="Petani kopi" subtitle="ORANG DI BALIK CANGKIR" cart={false} back />
      <Text style={[styles.intro, { color: colors.mutedForeground }]}>Kenali petani dan kelompok tani yang menjaga setiap proses dari kebun sampai ke cangkir.</Text>
      <Animated.View entering={FadeInDown.duration(500)} style={[styles.statsPanel, { backgroundColor: colors.foreground }]}>
        <View style={styles.statsIntro}><Text style={[styles.statsKicker, { color: colors.accent }]}>EKOSISTEM KOPI GARUT</Text><Text style={[styles.statsTitle, { color: colors.card }]}>Tumbuh dari banyak tangan.</Text></View>
        <View style={styles.statsRow}>
          {[hubStats[0], hubStats[3], hubStats[2]].map((stat) => <View key={stat.label} style={styles.stat}><Text style={[styles.statValue, { color: colors.card }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: colors.background }]}>{stat.label}</Text></View>)}
        </View>
      </Animated.View>
      <View style={styles.sectionHeading}><View><Text style={[styles.kicker, { color: colors.primary }]}>PETA CERITA</Text><Text style={[styles.title, { color: colors.foreground }]}>Kenali orangnya</Text></View><Text style={[styles.resultCount, { color: colors.mutedForeground }]}>{visibleFarmers.length} profil</Text></View>
      <SearchBar value={query} onChangeText={setQuery} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={({ pressed }) => [styles.filter, { backgroundColor: filter === item ? colors.primary : colors.secondary, opacity: pressed ? 0.72 : 1 }]}><Text style={[styles.filterText, { color: filter === item ? colors.primaryForeground : colors.foreground }]}>{item}</Text></Pressable>)}
      </ScrollView>
      {featured ? <Pressable
        testID={`featured-farmer-${featured.id}`}
        accessibilityRole="button"
        accessibilityLabel={`Buka cerita ${featured.name}`}
        onPress={() => router.push(`/farmer/${featured.id}`)}
        style={({ pressed }) => [styles.featured, { backgroundColor: colors.foreground, opacity: pressed ? 0.86 : 1 }]}
      >
        <Image source={featured.image} contentFit="cover" style={StyleSheet.absoluteFill} />
        <LinearGradient colors={['transparent', colors.foreground]} locations={[0.16, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.featuredCopy}>
          <View style={styles.featuredTag}><BrandIcon name="map-pin" size={12} color={colors.primaryForeground} /><Text style={[styles.featuredTagText, { color: colors.primaryForeground }]}>{featured.location}</Text></View>
          <Text style={[styles.featuredName, { color: colors.card }]}>{featured.name}</Text>
          <Text style={[styles.featuredStory, { color: colors.background }]}>{featured.story}</Text>
          <View style={styles.featuredMeta}><Text style={[styles.featuredGroup, { color: colors.background }]}>{featured.group}</Text><BrandIcon name="arrow-up-right" size={17} color={colors.primaryForeground} /></View>
        </View>
      </Pressable> : <EmptyState icon="users" title="Petani tidak ditemukan" text="Coba ubah kata kunci atau pilih wilayah lain." action="Tampilkan semua" onAction={() => { setQuery(''); setFilter('Semua'); }} />}
      {visibleFarmers.length > 1 && <View style={styles.listHeading}><Text style={[styles.listHeadingText, { color: colors.foreground }]}>Profil lainnya</Text><Text style={[styles.listHeadingHint, { color: colors.mutedForeground }]}>Pilih untuk melihat perjalanan kebunnya</Text></View>}
      <View style={styles.list}>
        {visibleFarmers.slice(1).map((farmer, index) => <Animated.View key={farmer.id} entering={FadeInDown.delay(index * 70).duration(450)}>
          <Pressable onPress={() => router.push(`/farmer/${farmer.id}`)} style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
            <Image source={farmer.image} contentFit="cover" style={styles.image} />
            <View style={styles.cardCopy}>
              <View style={styles.locationRow}><BrandIcon name="map-pin" size={11} color={colors.primary} /><Text style={[styles.location, { color: colors.primary }]}>{farmer.location}</Text></View>
              <Text style={[styles.name, { color: colors.foreground }]}>{farmer.name}</Text>
              <Text style={[styles.group, { color: colors.mutedForeground }]}>{farmer.group}</Text>
              <Text numberOfLines={2} style={[styles.story, { color: colors.mutedForeground }]}>{farmer.story}</Text>
              <View style={styles.cardMeta}><Text style={[styles.meta, { color: colors.foreground }]}>{farmer.annualProduction}</Text><Text style={[styles.product, { color: colors.primary }]}>{farmer.products[0]}</Text></View>
            </View>
            <View style={[styles.arrow, { backgroundColor: colors.secondary }]}><BrandIcon name="chevron-right" size={16} color={colors.primary} /></View>
          </Pressable>
        </Animated.View>)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 21, marginTop: -8 },
  statsPanel: { borderRadius: 22, padding: 17, gap: 18 },
  statsIntro: { gap: 4 },
  statsKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  statsTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', letterSpacing: -0.4 },
  statsRow: { flexDirection: 'row', gap: 17 },
  stat: { flex: 1, gap: 3 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '800' },
  statLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  kicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', marginTop: 4 },
  resultCount: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, paddingBottom: 3 },
  filterRow: { gap: 8, paddingRight: 20 },
  filter: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  filterText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  featured: { height: 262, borderRadius: 22, overflow: 'hidden' },
  featuredCopy: { flex: 1, justifyContent: 'flex-end', padding: 17, gap: 6 },
  featuredTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  featuredTagText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  featuredName: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 31, fontWeight: '800', letterSpacing: -0.7 },
  featuredStory: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 300 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  featuredGroup: { fontFamily: 'Manrope_700Bold', fontSize: 10, letterSpacing: 0.3 },
  listHeading: { gap: 3, marginTop: 2 },
  listHeadingText: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '700' },
  listHeadingHint: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  list: { gap: 11 },
  card: { minHeight: 137, borderWidth: 1, borderRadius: 19, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  image: { width: 90, height: 116, borderRadius: 14 },
  cardCopy: { flex: 1, gap: 3 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.7, textTransform: 'uppercase' },
  name: { fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '700', marginTop: 1 },
  group: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  story: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, marginTop: 3 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 4 },
  meta: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  product: { fontFamily: 'Manrope_700Bold', fontSize: 9, textAlign: 'right', flexShrink: 1 },
  arrow: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
});