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
  { icon: 'shield' as const, label: 'Program', route: '/program' as const },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(260, width - 40);
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
    <Header title="Mau menikmati kopi apa hari ini?" subtitle="KOPI GARUT · JAWA BARAT" />
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
    <Animated.View entering={FadeInDown.duration(550)} style={styles.heroSection}>
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
            <LinearGradient colors={['transparent', colors.foreground]} locations={[0.18, 1]} style={styles.heroShade} />
            <View style={styles.heroCopy}>
              <View style={styles.heroMeta}>
                <View style={[styles.promoDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.promoPillText, { color: colors.background }]}>KOPI GARUT / {slide.kicker}</Text>
              </View>
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
      <View style={styles.headingCopy}>
        <Text style={[styles.sectionKicker, { color: colors.primary }]}>JELAJAH GARUT</Text>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mulai dari yang dekat</Text>
      </View>
      <View style={[styles.headingRule, { backgroundColor: colors.border }]} />
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
    <Pressable
      testID="collective-story"
      accessibilityRole="button"
      accessibilityLabel="Buka cerita kolektif Kopi Garut"
      onPress={() => router.push('/collective')}
      style={({ pressed }) => [
        styles.storyLead,
        { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.84 : 1 },
      ]}
    >
      <View style={[styles.storyLeadMark, { backgroundColor: colors.primary }]}>
        <BrandIcon name="compass" size={19} color={colors.primaryForeground} />
      </View>
      <View style={styles.storyLeadCopy}>
        <Text style={[styles.storyLeadKicker, { color: colors.primary }]}>CATATAN DARI GARUT</Text>
        <Text style={[styles.storyLeadTitle, { color: colors.foreground }]}>Satu wilayah, banyak cara menikmati kopi.</Text>
        <Text style={[styles.storyLeadText, { color: colors.mutedForeground }]}>Temui petani, usaha, dan pengalaman di balik setiap seri.</Text>
      </View>
      <BrandIcon name="arrow-up-right" size={17} color={colors.primary} />
    </Pressable>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>REKOMENDASI UNTUKMU</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Untuk cangkir pertama</Text></View>
      <Link href="/catalog" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featured}><CoffeeCard coffee={coffees[0]} index={0} /><CoffeeCard coffee={coffees[1]} index={1} /></ScrollView>
    <View style={[styles.traceCard, { backgroundColor: colors.secondary }]}>
      <View style={[styles.traceIcon, { backgroundColor: colors.card }]}><BrandIcon name="maximize" size={19} color={colors.primary} /></View>
      <View style={styles.traceCopy}><Text style={[styles.traceKicker, { color: colors.primary }]}>JEJAK PRODUK</Text><Text style={[styles.traceTitle, { color: colors.foreground }]}>Scan QR, kenali asalnya.</Text><Text style={[styles.traceText, { color: colors.mutedForeground }]}>Lihat petani, tanggal panen, dan proses pascapanen kopi.</Text></View>
      <Pressable onPress={() => router.push('/traceability')} style={[styles.traceButton, { backgroundColor: colors.primary }]}><BrandIcon name="arrow-up-right" size={16} color={colors.primaryForeground} /></Pressable>
    </View>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>KOPI GARUT DALAM ANGKA</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Tumbuh bersama</Text></View>
      <Link href="/dashboard" style={[styles.seeAll, { color: colors.primary }]}>Lihat data</Link>
    </View>
    <View style={[styles.statsGrid, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {hubStats.map((stat) => <View key={stat.label} style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text></View>)}
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  searchEntry: { height: 52, borderRadius: 17, borderWidth: 1, paddingLeft: 15, paddingRight: 7, flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchPlaceholder: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  searchFilter: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  heroSection: { height: 306, borderRadius: 27, overflow: 'hidden', marginTop: -3 },
  heroImageContainer: { flex: 1, justifyContent: 'flex-end' },
  heroImage: { borderRadius: 27 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.9 },
  heroCopy: { paddingHorizontal: 20, paddingBottom: 21, gap: 8 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 2 },
  promoDot: { width: 5, height: 5, borderRadius: 3 },
  promoPillText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 31, fontWeight: '700', letterSpacing: -0.7, maxWidth: 310 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 17, opacity: 0.9, maxWidth: 290 },
  heroButton: { height: 38, borderRadius: 12, paddingHorizontal: 13, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2 },
  heroButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  pagination: { position: 'absolute', right: 15, top: 15, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 7, paddingVertical: 6, borderRadius: 20, opacity: 0.92 },
  paginationTrack: { height: 6, borderRadius: 3, justifyContent: 'center', overflow: 'hidden' },
  paginationDot: { height: 6, borderRadius: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 1, gap: 14 },
  headingCopy: { flexShrink: 1 },
  headingRule: { width: 42, height: 1, marginBottom: 7 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', marginTop: 4, letterSpacing: -0.3 },
  seeAll: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', paddingBottom: 3 },
  categoryRail: { gap: 18, paddingRight: 12, paddingTop: 2 },
  categoryItem: { width: 59, alignItems: 'center', gap: 8 },
  categoryIcon: { width: 50, height: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, fontWeight: '600' },
  storyLead: { minHeight: 108, borderRadius: 20, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  storyLeadMark: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  storyLeadCopy: { flex: 1, gap: 3 },
  storyLeadKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.35 },
  storyLeadTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 19, fontWeight: '700' },
  storyLeadText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, marginTop: 1 },
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
  featured: { flexDirection: 'row', gap: 12, marginHorizontal: -20, paddingHorizontal: 20 },
});