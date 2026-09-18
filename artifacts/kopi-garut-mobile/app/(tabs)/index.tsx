import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CoffeeCard, Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { coffees } from '@/data/coffees';
import { hubStats } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const promoSlides = [
  {
    id: 'coffee-hub',
    kicker: 'PILIHAN HARI INI',
    title: 'Kopi pilihan dari Garut, siap dikirim.',
    description: 'Temukan seri single origin, proses, dan rasa favoritmu.',
    cta: 'Belanja sekarang',
    route: '/catalog' as const,
    image: require('../../assets/images/hero-coffee.jpg'),
  },
  {
    id: 'traceability',
    kicker: 'JEJAK YANG TERBUKA',
    title: 'Kenali siapa di balik setiap cangkir.',
    description: 'Lihat petani, kebun, proses, dan cerita produknya.',
    cta: 'Lihat petani',
    route: '/farmers' as const,
    image: require('../../assets/images/origin-coffee.jpg'),
  },
  {
    id: 'coffee-tour',
    kicker: 'KOPI & WISATA',
    title: 'Datang, belajar, dan bawa pulang cerita.',
    description: 'Temukan coffee tour, event, dan mitra di Garut.',
    cta: 'Lihat wisata',
    route: '/tourism' as const,
    image: require('../../assets/images/hero-coffee.jpg'),
  },
];

const categoryItems = [
  { icon: 'coffee' as const, label: 'Produk', route: '/catalog' as const },
  { icon: 'users' as const, label: 'Petani', route: '/farmers' as const },
  { icon: 'map' as const, label: 'Wilayah', route: '/regions' as const },
  { icon: 'compass' as const, label: 'Wisata', route: '/tourism' as const },
  { icon: 'trending-up' as const, label: 'Harga', route: '/prices' as const },
  { icon: 'calendar' as const, label: 'Event', route: '/events' as const },
  { icon: 'briefcase' as const, label: 'Mitra', route: '/partnership' as const },
  { icon: 'bar-chart-2' as const, label: 'Data', route: '/dashboard' as const },
  { icon: 'grid' as const, label: 'Kolektif', route: '/collective' as const },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(280, width - 40);
  const bannerRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => {
        const next = (current + 1) % promoSlides.length;
        bannerRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, 5200);

    return () => clearInterval(interval);
  }, [bannerWidth]);

  return <Screen>
    <Header title="Mau cari apa hari ini?" subtitle="KOPI GARUT · JAWA BARAT" />
    <Pressable
      testID="home-search"
      accessibilityRole="button"
      accessibilityLabel="Cari kopi, petani, atau wilayah"
      onPress={() => router.push('/catalog')}
      style={({ pressed }) => [
        styles.searchEntry,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <BrandIcon name="search" size={18} color={colors.mutedForeground} />
      <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground }]}>
        Cari kopi, petani, atau wilayah
      </Text>
      <View style={[styles.searchFilter, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="sliders" size={15} color={colors.primary} />
      </View>
    </Pressable>
    <Animated.View entering={FadeInDown.duration(550)} style={styles.hero}>
      <ScrollView
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={bannerWidth}
        onMomentumScrollEnd={(event) => setActiveSlide(Math.round(event.nativeEvent.contentOffset.x / bannerWidth))}
      >
        {promoSlides.map((slide, index) => (
          <ImageBackground key={slide.id} source={slide.image} imageStyle={styles.heroImage} style={[styles.heroImageContainer, { width: bannerWidth }]}>
            <LinearGradient colors={['transparent', colors.foreground]} style={styles.heroShade} />
            <View style={styles.heroCopy}>
              <View style={[styles.promoPill, { backgroundColor: colors.card }]}>
                <View style={[styles.promoDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.promoPillText, { color: colors.foreground }]}>KOPI GARUT</Text>
              </View>
              <Text style={[styles.heroKicker, { color: colors.background }]}>{slide.kicker}</Text>
              <Text style={[styles.heroTitle, { color: colors.card }]}>{slide.title}</Text>
              <Text style={[styles.heroDescription, { color: colors.background }]}>{slide.description}</Text>
              <Pressable
                testID={index === 0 ? 'hero-browse' : `promo-browse-${index}`}
                onPress={() => router.push(slide.route)}
                style={({ pressed }) => [styles.heroButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
              >
                <Text style={[styles.heroButtonText, { color: colors.primaryForeground }]}>{slide.cta}</Text>
                <BrandIcon name="arrow-up-right" size={16} color={colors.primaryForeground} />
              </Pressable>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={[styles.pagination, { backgroundColor: colors.foreground }]}>
        {promoSlides.map((slide, index) => (
          <Pressable
            key={slide.id}
            accessibilityRole="button"
            accessibilityLabel={`Tampilkan promo ${index + 1}`}
            onPress={() => {
              setActiveSlide(index);
              bannerRef.current?.scrollTo({ x: index * bannerWidth, animated: true });
            }}
            style={[styles.paginationTrack, { backgroundColor: colors.card }]}
          >
            <View style={[styles.paginationDot, { backgroundColor: index === activeSlide ? colors.primary : colors.border, width: index === activeSlide ? 22 : 6 }]} />
          </Pressable>
        ))}
      </View>
    </Animated.View>
    <View style={styles.sectionHeading}>
      <View><Text style={[styles.sectionKicker, { color: colors.primary }]}>JELAJAH CEPAT</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mau lihat apa?</Text></View>
      <BrandIcon name="chevron-right" size={18} color={colors.mutedForeground} />
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRail}>
      {categoryItems.map((item) => (
        <Pressable
          key={item.label}
          accessibilityRole="button"
          accessibilityLabel={`Buka ${item.label}`}
          onPress={() => router.push(item.route)}
          style={({ pressed }) => [styles.categoryItem, { opacity: pressed ? 0.7 : 1 }]}
        >
          <View style={[styles.categoryIcon, { backgroundColor: colors.secondary }]}>
            <BrandIcon name={item.icon} size={19} color={colors.primary} />
          </View>
          <Text style={[styles.categoryLabel, { color: colors.foreground }]}>{item.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View><Text style={[styles.sectionKicker, { color: colors.primary }]}>REKOMENDASI UNTUKMU</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Kopi pilihan hari ini</Text></View>
      <Link href="/catalog" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featured}><CoffeeCard coffee={coffees[0]} index={0} /><CoffeeCard coffee={coffees[1]} index={1} /></ScrollView>
    <View style={[styles.traceCard, { backgroundColor: colors.secondary }]}>
      <View style={[styles.traceIcon, { backgroundColor: colors.card }]}><BrandIcon name="maximize" size={19} color={colors.primary} /></View>
      <View style={styles.traceCopy}><Text style={[styles.traceKicker, { color: colors.primary }]}>JEJAK PRODUK</Text><Text style={[styles.traceTitle, { color: colors.foreground }]}>Scan QR, kenali asalnya.</Text><Text style={[styles.traceText, { color: colors.mutedForeground }]}>Lihat petani, tanggal panen, dan proses pascapanen kopi.</Text></View>
      <Pressable onPress={() => router.push('/traceability')} style={[styles.traceButton, { backgroundColor: colors.primary }]}><BrandIcon name="arrow-up-right" size={16} color={colors.primaryForeground} /></Pressable>
    </View>
    <View style={styles.sectionHeading}>
      <View><Text style={[styles.sectionKicker, { color: colors.primary }]}>KOPI GARUT DALAM ANGKA</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Tumbuh bersama</Text></View>
      <Link href="/dashboard" style={[styles.seeAll, { color: colors.primary }]}>Lihat data</Link>
    </View>
    <View style={[styles.statsGrid, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {hubStats.map((stat) => <View key={stat.label} style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text></View>)}
    </View>
    <View style={[styles.quote, { backgroundColor: colors.secondary }]}>
      <Text style={[styles.quoteMark, { color: colors.accent }]}>“</Text>
      <Text style={[styles.quoteText, { color: colors.foreground }]}>Satu platform untuk petani, usaha, wisata, dan pecinta kopi Garut.</Text>
      <Text style={[styles.quoteByline, { color: colors.mutedForeground }]}>— Garut Coffee Hub, Jawa Barat</Text>
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  hero: { height: 210, borderRadius: 24, overflow: 'hidden' },
  searchEntry: { height: 52, borderRadius: 16, borderWidth: 1, paddingLeft: 15, paddingRight: 7, flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchPlaceholder: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  searchFilter: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  heroImageContainer: { flex: 1, justifyContent: 'flex-end' },
  heroImage: { borderRadius: 24 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.86 },
  heroCopy: { padding: 18, paddingBottom: 20, gap: 6 },
  promoPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 5, marginBottom: 1 },
  promoDot: { width: 5, height: 5, borderRadius: 3 },
  promoPillText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 1.1 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '700', letterSpacing: 1.5 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 25, fontWeight: '700', letterSpacing: -0.5, maxWidth: 290 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, opacity: 0.9, maxWidth: 275 },
  heroButton: { height: 36, borderRadius: 11, paddingHorizontal: 12, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2 },
  heroButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  pagination: { position: 'absolute', right: 14, top: 12, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 7, paddingVertical: 6, borderRadius: 20 },
  paginationTrack: { height: 6, borderRadius: 3, justifyContent: 'center', overflow: 'hidden' },
  paginationDot: { height: 6, borderRadius: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 3 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, fontWeight: '700', marginTop: 4 },
  seeAll: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', paddingBottom: 3 },
  categoryRail: { gap: 16, paddingRight: 12 },
  categoryItem: { width: 58, alignItems: 'center', gap: 7 },
  categoryIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, fontWeight: '600' },
  traceCard: { borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  traceIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  traceCopy: { flex: 1, gap: 3 },
  traceKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  traceTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  traceText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15 },
  traceButton: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statsGrid: { borderRadius: 18, borderWidth: 1, padding: 14, flexDirection: 'row', flexWrap: 'wrap', rowGap: 18 },
  stat: { width: '50%', gap: 3 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '800' },
  statLabel: { fontFamily: 'Manrope_400Regular', fontSize: 11 },
  categoryRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: -9 },
  category: { borderRadius: 13, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, fontWeight: '600' },
  featured: { flexDirection: 'row', gap: 12, marginHorizontal: -20, paddingHorizontal: 20 },
  story: { height: 300, borderRadius: 22, overflow: 'hidden' },
  storyImageContainer: { flex: 1, justifyContent: 'flex-end' },
  storyImage: { borderRadius: 22 },
  storyShade: { ...StyleSheet.absoluteFill, opacity: 0.48 },
  storyCopy: { padding: 20, gap: 8, alignItems: 'flex-start' },
  storyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 27, fontWeight: '700', maxWidth: 290 },
  storyText: { fontFamily: 'Manrope_400Regular', opacity: 0.9, fontSize: 13, lineHeight: 19, maxWidth: 300 },
  quote: { borderRadius: 22, padding: 20, gap: 7 },
  quoteMark: { fontFamily: 'Manrope_700Bold', fontSize: 40, lineHeight: 28, fontWeight: '700' },
  quoteText: { fontFamily: 'Manrope_600SemiBold', fontSize: 18, lineHeight: 25, fontWeight: '600' },
  quoteByline: { fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 4 },
});