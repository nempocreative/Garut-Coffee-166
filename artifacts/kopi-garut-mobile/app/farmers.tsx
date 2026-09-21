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
      <Header title="Petani kopi" subtitle="ORANG DI BALIK RASA" cart={false} back />
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
          <View style={styles.featuredTopRow}>
            <View style={styles.featuredTag}><BrandIcon name="map-pin" size={12} color={colors.primaryForeground} /><Text style={[styles.featuredTagText, { color: colors.primaryForeground }]}>{featured.location}</Text></View>
            <View style={[styles.verifiedBadge, { backgroundColor: colors.accent }]}>
              <View style={styles.verifiedIcon}><BrandIcon name="shield" size={14} color={colors.accentForeground} /><View style={[styles.verifiedCheck, { backgroundColor: colors.accentForeground }]}><BrandIcon name="check" size={7} color={colors.accent} strokeWidth={2.5} /></View></View>
              <Text style={[styles.verifiedText, { color: colors.accentForeground }]}>TERVERIFIKASI</Text>
            </View>
          </View>
          <Text style={[styles.featuredName, { color: colors.card }]}>{featured.name}</Text>
          <Text style={[styles.featuredStory, { color: colors.background }]}>{featured.story}</Text>
          <View style={styles.featuredMeta}><Text style={[styles.featuredGroup, { color: colors.background }]}>{featured.group}</Text><BrandIcon name="arrow-up-right" size={17} color={colors.primaryForeground} /></View>
        </View>
      </Pressable> : <EmptyState icon="users" title="Petani tidak ditemukan" text="Coba ubah kata kunci atau pilih wilayah lain." action="Tampilkan semua" onAction={() => { setQuery(''); setFilter('Semua'); }} />}
      {visibleFarmers.length > 1 && <View style={styles.listHeading}><Text style={[styles.listHeadingText, { color: colors.foreground }]}>Profil lainnya</Text><Text style={[styles.listHeadingHint, { color: colors.mutedForeground }]}>Pilih untuk melihat perjalanan kebunnya</Text></View>}
      <View style={styles.list}>
        {visibleFarmers.slice(1).map((farmer, index) => <Animated.View key={farmer.id} entering={FadeInDown.delay(index * 70).duration(450)}>
          <Pressable onPress={() => router.push(`/farmer/${farmer.id}`)} style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
            <View style={[styles.cardAccent, { backgroundColor: index % 2 === 0 ? colors.primary : colors.accent }]} />
            <View style={[styles.cardGlow, { backgroundColor: colors.secondary }]} />
            <View style={styles.cardInner}>
              <View style={styles.photoFrame}>
                <Image source={farmer.image} contentFit="cover" style={styles.image} />
                <LinearGradient colors={['transparent', `${colors.foreground}B8`]} locations={[0.42, 1]} style={StyleSheet.absoluteFill} />
                <View style={[styles.photoLabel, { backgroundColor: `${colors.foreground}B8` }]}>
                  <BrandIcon name="user" size={10} color={colors.accent} />
                  <Text style={[styles.photoLabelText, { color: colors.card }]}>PROFIL PETANI</Text>
                </View>
                <View style={[styles.photoIndex, { backgroundColor: colors.foreground }]}>
                  <Text style={[styles.photoIndexText, { color: colors.accent }]}>{String(index + 2).padStart(2, '0')}</Text>
                </View>
              </View>
              <View style={styles.cardCopy}>
                <View style={styles.cardIdentity}>
                  <Text style={[styles.identityLabel, { color: colors.primary }]}>ORANG DI BALIK RASA</Text>
                  <View style={[styles.verifiedBadge, styles.compactVerifiedBadge, { backgroundColor: colors.primary }]}>
                    <View style={styles.verifiedIcon}>
                      <BrandIcon name="shield" size={12} color={colors.primaryForeground} />
                      <View style={[styles.verifiedCheck, styles.compactVerifiedCheck, { backgroundColor: colors.primaryForeground }]}>
                        <BrandIcon name="check" size={6} color={colors.primary} strokeWidth={2.5} />
                      </View>
                    </View>
                    <Text style={[styles.verifiedText, styles.compactVerifiedText, { color: colors.primaryForeground }]}>TERVERIFIKASI</Text>
                  </View>
                </View>
                <View style={styles.locationRow}><BrandIcon name="map-pin" size={11} color={colors.primary} /><Text style={[styles.location, { color: colors.primary }]}>{farmer.location}</Text></View>
                <Text style={[styles.name, { color: colors.foreground }]}>{farmer.name}</Text>
                <Text style={[styles.group, { color: colors.mutedForeground }]}>{farmer.group}</Text>
                <View style={[styles.productPill, { backgroundColor: colors.secondary }]}>
                  <BrandIcon name="coffee" size={11} color={colors.primary} />
                  <Text numberOfLines={1} style={[styles.productPillText, { color: colors.foreground }]}>{farmer.products[0]}</Text>
                </View>
                 <Text numberOfLines={2} style={[styles.storyPreview, { color: colors.mutedForeground }]}>{farmer.story}</Text>
                 <View style={[styles.productionHighlight, { backgroundColor: colors.secondary }]}>
                   <View style={[styles.productionIcon, { backgroundColor: colors.accent }]}><BrandIcon name="coffee" size={12} color={colors.accentForeground} /></View>
                   <View style={styles.productionCopy}><Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>PANEN TAHUNAN</Text><Text style={[styles.productionValue, { color: colors.foreground }]}>{farmer.annualProduction}</Text></View>
                 </View>
                <View style={[styles.idDivider, { backgroundColor: colors.border }]} />
                <View style={styles.profileGrid}>
                  <View style={styles.profileFact}><Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>JENIS KOPI</Text><Text numberOfLines={1} style={[styles.meta, { color: colors.foreground }]}>{farmer.coffeeType}</Text></View>
                  <View style={styles.profileFact}><Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>LUAS LAHAN</Text><Text style={[styles.meta, { color: colors.foreground }]}>{farmer.landArea}</Text></View>
                  <View style={styles.profileFact}><Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>ANGGOTA SEJAK</Text><Text numberOfLines={1} style={[styles.meta, { color: colors.foreground }]}>{farmer.joinedAt}</Text></View>
                  <View style={styles.profileFact}><Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>ID KEANGGOTAAN</Text><Text style={[styles.memberId, { color: colors.primary }]}>{farmer.membershipId}</Text></View>
                </View>
              </View>
              <View style={styles.cardAction}>
                <Text style={[styles.cardActionText, { color: colors.primary }]}>Buka profil</Text>
                <View style={[styles.arrow, { backgroundColor: colors.secondary }]}><BrandIcon name="chevron-right" size={16} color={colors.primary} /></View>
              </View>
            </View>
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
  featuredTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  featuredTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  featuredTagText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  verifiedBadge: { minHeight: 24, borderRadius: 8, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  verifiedIcon: { width: 16, height: 17, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  verifiedCheck: { position: 'absolute', right: -2, bottom: -1, width: 8, height: 8, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  verifiedText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.7 },
  featuredName: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 31, fontWeight: '800', letterSpacing: -0.7 },
  featuredStory: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 300 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  featuredGroup: { fontFamily: 'Manrope_700Bold', fontSize: 10, letterSpacing: 0.3 },
  listHeading: { gap: 3, marginTop: 2 },
  listHeadingText: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '700' },
  listHeadingHint: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  list: { gap: 11 },
   card: { minHeight: 278, borderWidth: 1, borderRadius: 23, overflow: 'hidden' },
  cardAccent: { height: 6, width: '100%' },
  cardGlow: { position: 'absolute', width: 150, height: 150, borderRadius: 75, right: -62, top: -66, opacity: 0.62 },
   cardInner: { flex: 1, padding: 14, flexDirection: 'row', alignItems: 'stretch', gap: 14 },
   photoFrame: { width: 118, height: 248, borderRadius: 17, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: '100%' },
  photoLabel: { position: 'absolute', top: 8, left: 8, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 4 },
  photoLabelText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.5 },
  photoIndex: { position: 'absolute', left: 6, bottom: 6, minWidth: 24, height: 20, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  photoIndexText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
   cardCopy: { flex: 1, gap: 4, minWidth: 0, justifyContent: 'flex-start', paddingVertical: 2 },
  cardIdentity: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5, marginBottom: 4 },
  compactVerifiedBadge: { minHeight: 18, borderRadius: 6, paddingHorizontal: 4, gap: 2 },
  compactVerifiedCheck: { width: 7, height: 7, right: -2, bottom: -1 },
  compactVerifiedText: { fontSize: 6, letterSpacing: 0.3 },
  identityLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.7, flexShrink: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.7, textTransform: 'uppercase' },
  name: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 22, fontWeight: '700', marginTop: 2 },
  group: { fontFamily: 'Manrope_400Regular', fontSize: 10.5 },
  productPill: { alignSelf: 'flex-start', maxWidth: '100%', borderRadius: 9, paddingHorizontal: 7, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  productPillText: { flexShrink: 1, fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
   storyPreview: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15, marginTop: 5 },
   productionHighlight: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 11, padding: 7, marginTop: 5 },
   productionIcon: { width: 25, height: 25, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
   productionCopy: { flex: 1, minWidth: 0, gap: 1 },
   productionValue: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
   idDivider: { height: 1, width: '100%', marginTop: 8, marginBottom: 6 },
  profileGrid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8 },
  profileFact: { width: '47%', minWidth: 0, gap: 1 },
  metaLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.7, marginBottom: 1 },
  meta: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  memberId: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  cardAction: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', gap: 7, marginTop: 'auto' },
  cardActionText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.2 },
  arrow: { width: 35, height: 35, borderRadius: 13, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
});