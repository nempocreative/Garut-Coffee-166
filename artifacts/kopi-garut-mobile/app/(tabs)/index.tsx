import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CoffeeCard, Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { coffees } from '@/data/coffees';
import { coffeePrices, coffeeTours, farmers, hubEvents, hubStats, regions } from '@/data/hub';
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

const quickStartItems = [
  { icon: 'coffee' as const, label: 'Belanja kopi', description: 'Temukan rasa dan produk pilihan', route: '/catalog' as const },
  { icon: 'maximize' as const, label: 'Scan QR kopi', description: 'Lihat asal dan cerita lot', route: '/traceability' as const },
  { icon: 'users' as const, label: 'Untuk petani', description: 'Program, data, dan pendampingan', route: '/program' as const },
  { icon: 'briefcase' as const, label: 'Untuk bisnis', description: 'Cari kopi dan peluang kemitraan', route: '/partnership' as const },
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
        <Text style={[styles.sectionKicker, { color: colors.primary }]}>MULAI DARI SINI</Text>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Kamu sedang mencari apa?</Text>
      </View>
    </View>
    <View style={styles.quickStartGrid}>
      {quickStartItems.map((item, index) => (
        <Pressable
          key={item.label}
          testID={`quick-start-${index}`}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          onPress={() => router.push(item.route)}
          style={({ pressed }) => [
            styles.quickStartCard,
            {
              backgroundColor: index === 0 ? colors.primary : colors.card,
              borderColor: index === 0 ? colors.primary : colors.border,
              opacity: pressed ? 0.78 : 1,
            },
          ]}
        >
          <View style={[styles.quickStartIcon, { backgroundColor: index === 0 ? colors.primaryForeground : colors.secondary }]}>
            <BrandIcon name={item.icon} size={18} color={colors.primary} />
          </View>
          <Text style={[styles.quickStartTitle, { color: index === 0 ? colors.primaryForeground : colors.foreground }]}>{item.label}</Text>
          <Text style={[styles.quickStartDescription, { color: index === 0 ? colors.background : colors.mutedForeground }]}>{item.description}</Text>
          <View style={styles.quickStartArrow}>
            <BrandIcon name="arrow-up-right" size={15} color={index === 0 ? colors.primaryForeground : colors.primary} />
          </View>
        </Pressable>
      ))}
    </View>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}>
        <Text style={[styles.sectionKicker, { color: colors.primary }]}>JELAJAHI SEMUA</Text>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Temukan lebih banyak</Text>
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
    <Animated.View entering={FadeInDown.delay(180).duration(600)}>
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
      <View style={styles.storyLeadBody}>
        <View style={styles.storyLeadCopy}>
          <Text style={[styles.storyLeadKicker, { color: colors.primary }]}>CERITA KOPI GARUT</Text>
          <Text style={[styles.storyLeadTitle, { color: colors.foreground }]}>Kopi dari tanah pegunungan.</Text>
          <Text style={[styles.storyLeadText, { color: colors.mutedForeground }]}>Dari lereng Garut, setiap biji membawa cerita petani, ketinggian, dan proses yang dirawat dengan penuh perhatian.</Text>
        </View>
        <Animated.View entering={FadeInDown.delay(330).duration(500)} style={[styles.storyLeadArt, { backgroundColor: colors.accent }]}>
          <View style={[styles.storyLeadSun, { backgroundColor: colors.card }]} />
          <View style={[styles.storyLeadMountainBack, { borderBottomColor: colors.secondary }]} />
          <View style={[styles.storyLeadMountainFront, { borderBottomColor: colors.primary }]} />
          <View style={[styles.storyLeadMountainPeak, { borderBottomColor: colors.card }]} />
          <View style={[styles.storyLeadGround, { backgroundColor: colors.foreground }]} />
          <View style={[styles.storyLeadBean, { backgroundColor: colors.card }]}>
            <View style={[styles.storyLeadBeanLine, { backgroundColor: colors.primary }]} />
          </View>
          <View style={[styles.storyLeadBeanSmall, { backgroundColor: colors.primary }]} />
        </Animated.View>
      </View>
      </Pressable>
    </Animated.View>
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
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>TEMUKAN PROFIL RASA</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mulai dari selera</Text></View>
      <Link href="/catalog" style={[styles.seeAll, { color: colors.primary }]}>Jelajahi</Link>
    </View>
    <View style={styles.tasteGrid}>
      {[
        { label: 'Cerah & manis', detail: 'Lemon, melati, gula merah', icon: 'trending-up' as const, route: '/product/papandayan-honey' as const },
        { label: 'Buah & juicy', detail: 'Stroberi, kakao, molase', icon: 'heart' as const, route: '/product/cikajang-natural' as const },
        { label: 'Hangat & nyaman', detail: 'Karamel, cokelat, rempah', icon: 'coffee' as const, route: '/product/samarang-dark' as const },
      ].map((taste, index) => (
        <Pressable
          key={taste.label}
          accessibilityRole="button"
          accessibilityLabel={`Lihat kopi ${taste.label}`}
          onPress={() => router.push(taste.route)}
          style={({ pressed }) => [styles.tasteCard, { backgroundColor: index === 1 ? colors.primary : colors.card, borderColor: index === 1 ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}
        >
          <ExpoImage source={coffees[index === 0 ? 0 : index === 1 ? 1 : 3].image} contentFit="cover" style={[StyleSheet.absoluteFill, styles.tasteImage]} />
          <View style={[StyleSheet.absoluteFill, styles.tasteImageShade, { backgroundColor: index === 1 ? colors.foreground : colors.card }]} />
          <View style={[styles.tasteIcon, { backgroundColor: index === 1 ? colors.primaryForeground : colors.secondary }]}><BrandIcon name={taste.icon} size={17} color={index === 1 ? colors.primary : colors.primary} /></View>
          <Text style={[styles.tasteLabel, { color: index === 1 ? colors.primaryForeground : colors.foreground }]}>{taste.label}</Text>
          <Text style={[styles.tasteDetail, { color: index === 1 ? colors.background : colors.mutedForeground }]}>{taste.detail}</Text>
          <BrandIcon name="arrow-up-right" size={15} color={index === 1 ? colors.primaryForeground : colors.primary} />
        </Pressable>
      ))}
    </View>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>CERITA DARI KEBUN</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Orang di balik rasa</Text></View>
      <Link href="/farmers" style={[styles.seeAll, { color: colors.primary }]}>Semua petani</Link>
    </View>
    <Pressable
      testID="home-farmer-story"
      accessibilityRole="button"
      accessibilityLabel={`Buka cerita ${farmers[0].name}`}
      onPress={() => router.push(`/farmer/${farmers[0].id}`)}
      style={({ pressed }) => [styles.farmerFeature, { backgroundColor: colors.foreground, opacity: pressed ? 0.86 : 1 }]}
    >
      <View style={styles.farmerImageWrap}>
        <ExpoImage source={farmers[0].image} contentFit="cover" style={[StyleSheet.absoluteFill, styles.farmerImage]} />
        <LinearGradient colors={['transparent', colors.foreground]} locations={[0.2, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.farmerFeatureCopy}>
          <View style={styles.farmerTag}><BrandIcon name="map-pin" size={12} color={colors.primaryForeground} /><Text style={[styles.farmerTagText, { color: colors.primaryForeground }]}>{farmers[0].location}</Text></View>
          <Text style={[styles.farmerName, { color: colors.card }]}>{farmers[0].name}</Text>
          <Text style={[styles.farmerStory, { color: colors.background }]}>{farmers[0].story}</Text>
          <View style={styles.farmerMetaRow}><Text style={[styles.farmerMeta, { color: colors.background }]}>{farmers[0].group}</Text><BrandIcon name="arrow-up-right" size={16} color={colors.primaryForeground} /></View>
        </View>
      </View>
    </Pressable>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>WILAYAH ASAL</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Baca peta rasa Garut</Text></View>
      <Link href="/regions" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.regionRail}>
      {regions.slice(0, 3).map((region, index) => (
        <Pressable key={region.id} onPress={() => router.push(`/region/${region.id}`)} style={({ pressed }) => [styles.regionCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
          <ExpoImage source={region.image} contentFit="cover" style={styles.regionImage} />
          <View style={[styles.regionNumber, { backgroundColor: index === 0 ? colors.primary : colors.secondary }]}><Text style={[styles.regionNumberText, { color: index === 0 ? colors.primaryForeground : colors.primary }]}>0{index + 1}</Text></View>
          <Text style={[styles.regionName, { color: colors.foreground }]}>{region.name}</Text>
          <Text style={[styles.regionDetail, { color: colors.mutedForeground }]}>{region.elevation} · {region.village}</Text>
          <Text style={[styles.regionSpecialty, { color: colors.primary }]}>{region.specialty}</Text>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>AGENDA TERDEKAT</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Selalu ada cerita baru</Text></View>
      <Link href="/events" style={[styles.seeAll, { color: colors.primary }]}>Lihat agenda</Link>
    </View>
    <Pressable
      testID="home-event"
      accessibilityRole="button"
      accessibilityLabel={`Buka ${hubEvents[0].title}`}
      onPress={() => router.push('/events')}
      style={({ pressed }) => [styles.eventFeature, { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.8 : 1 }]}
    >
      <View style={[styles.eventDate, { backgroundColor: colors.primary }]}><BrandIcon name="calendar" size={17} color={colors.primaryForeground} /><Text style={[styles.eventDateText, { color: colors.primaryForeground }]}>{hubEvents[0].date}</Text></View>
      <View style={styles.eventCopy}><Text style={[styles.eventType, { color: colors.primary }]}>{hubEvents[0].type}</Text><Text style={[styles.eventTitle, { color: colors.foreground }]}>{hubEvents[0].title}</Text><Text style={[styles.eventLocation, { color: colors.mutedForeground }]}>{hubEvents[0].location}</Text></View>
      <BrandIcon name="arrow-up-right" size={18} color={colors.primary} />
    </Pressable>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>PENGALAMAN LANGSUNG</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Datang ke kebunnya</Text></View>
      <Link href="/tourism" style={[styles.seeAll, { color: colors.primary }]}>Lihat wisata</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tourRail}>
      {coffeeTours.slice(0, 2).map((tour) => (
        <Pressable key={tour.id} onPress={() => router.push('/tourism')} style={({ pressed }) => [styles.tourCard, { opacity: pressed ? 0.8 : 1 }]}>
          <View style={styles.tourImageWrap}>
            <ExpoImage source={tour.image} contentFit="cover" style={[StyleSheet.absoluteFill, styles.tourImage]} />
            <LinearGradient colors={['transparent', colors.foreground]} locations={[0.15, 1]} style={StyleSheet.absoluteFill} />
            <View style={styles.tourCopy}><Text style={[styles.tourType, { color: colors.primaryForeground }]}>{tour.type}</Text><Text style={[styles.tourTitle, { color: colors.card }]}>{tour.title}</Text><Text style={[styles.tourMeta, { color: colors.background }]}>{tour.duration} · {tour.location}</Text></View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionKicker, { color: colors.primary }]}>HARGA ACUAN</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Pantau nilai kopi</Text></View>
      <Link href="/prices" style={[styles.seeAll, { color: colors.primary }]}>Buka harga</Link>
    </View>
    <View style={[styles.pricePanel, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {coffeePrices.slice(0, 3).map((item, index) => <Pressable key={item.label} onPress={() => router.push('/prices')} style={[styles.priceRow, index < 2 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}><View><Text style={[styles.priceLabel, { color: colors.foreground }]}>{item.label}</Text><Text style={[styles.priceUnit, { color: colors.mutedForeground }]}>{item.unit}</Text></View><View style={styles.priceValueWrap}><Text style={[styles.priceValue, { color: colors.primary }]}>{item.price}</Text><Text style={[styles.priceChange, { color: colors.mutedForeground }]}>{item.change}</Text></View><BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} /></Pressable>)}
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
  quickStartGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickStartCard: { width: '48.5%', minHeight: 126, borderRadius: 18, borderWidth: 1, padding: 12, gap: 6, position: 'relative' },
  quickStartIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  quickStartTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17, fontWeight: '700', paddingRight: 19 },
  quickStartDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, paddingRight: 4 },
  quickStartArrow: { position: 'absolute', right: 12, top: 13 },
  storyLead: { minHeight: 154, borderRadius: 20, borderWidth: 1, padding: 12, overflow: 'hidden' },
  storyLeadBody: { flex: 1, flexDirection: 'row', alignItems: 'stretch', gap: 12 },
  storyLeadCopy: { flex: 1, justifyContent: 'center', gap: 4, paddingVertical: 4 },
  storyLeadArt: { width: 108, minHeight: 130, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  storyLeadSun: { position: 'absolute', top: 15, right: 14, width: 20, height: 20, borderRadius: 10, opacity: 0.82 },
  storyLeadMountainBack: { position: 'absolute', right: -27, bottom: 22, width: 0, height: 0, borderLeftWidth: 68, borderRightWidth: 68, borderBottomWidth: 86, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  storyLeadMountainFront: { position: 'absolute', left: -42, bottom: 15, width: 0, height: 0, borderLeftWidth: 67, borderRightWidth: 67, borderBottomWidth: 76, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  storyLeadMountainPeak: { position: 'absolute', left: 19, bottom: 69, width: 0, height: 0, borderLeftWidth: 18, borderRightWidth: 18, borderBottomWidth: 25, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  storyLeadGround: { position: 'absolute', left: -8, right: -8, bottom: -15, height: 45, borderRadius: 30 },
  storyLeadBean: { position: 'absolute', right: 17, bottom: 12, width: 27, height: 40, borderRadius: 22, transform: [{ rotate: '28deg' }] },
  storyLeadBeanLine: { position: 'absolute', left: 12, top: 4, width: 3, height: 31, borderRadius: 3, transform: [{ rotate: '-16deg' }] },
  storyLeadBeanSmall: { position: 'absolute', right: 52, bottom: 11, width: 14, height: 22, borderRadius: 12, transform: [{ rotate: '-24deg' }] },
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
  tasteGrid: { flexDirection: 'row', gap: 8 },
  tasteCard: { flex: 1, minHeight: 151, borderRadius: 17, borderWidth: 1, padding: 11, gap: 7, overflow: 'hidden' },
  tasteImage: { opacity: 0.38 },
  tasteImageShade: { opacity: 0.62 },
  tasteIcon: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  tasteLabel: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17, fontWeight: '700' },
  tasteDetail: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  farmerFeature: { height: 258, borderRadius: 22, overflow: 'hidden' },
  farmerImageWrap: { flex: 1, justifyContent: 'flex-end' },
  farmerImage: { borderRadius: 22 },
  farmerFeatureCopy: { padding: 16, gap: 6 },
  farmerTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  farmerTagText: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 0.9, textTransform: 'uppercase' },
  farmerName: { fontFamily: 'Manrope_700Bold', fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  farmerStory: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 290 },
  farmerMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  farmerMeta: { fontFamily: 'Manrope_700Bold', fontSize: 10, letterSpacing: 0.3 },
  regionRail: { gap: 10, paddingRight: 20 },
  regionCard: { width: 154, minHeight: 176, borderRadius: 18, borderWidth: 1, padding: 10, gap: 5, overflow: 'hidden' },
  regionImage: { width: '100%', height: 55, borderRadius: 12, marginBottom: 2 },
  regionNumber: { width: 29, height: 29, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  regionNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  regionName: { fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '700' },
  regionDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  regionSpecialty: { fontFamily: 'Manrope_700Bold', fontSize: 10, lineHeight: 14, marginTop: 2 },
  eventFeature: { borderRadius: 18, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  eventDate: { width: 56, minHeight: 58, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 4, paddingHorizontal: 4 },
  eventDateText: { fontFamily: 'Manrope_700Bold', textAlign: 'center', fontSize: 8, lineHeight: 11 },
  eventCopy: { flex: 1, gap: 3 },
  eventType: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1.2, textTransform: 'uppercase' },
  eventTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '700' },
  eventLocation: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  tourRail: { gap: 10, paddingRight: 20 },
  tourCard: { width: 245, height: 170, borderRadius: 20, overflow: 'hidden' },
  tourImageWrap: { flex: 1, justifyContent: 'flex-end' },
  tourImage: { borderRadius: 20 },
  tourCopy: { padding: 13, gap: 3 },
  tourType: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' },
  tourTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 20, fontWeight: '700' },
  tourMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  pricePanel: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 14 },
  priceRow: { minHeight: 65, flexDirection: 'row', alignItems: 'center', gap: 10 },
  priceLabel: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  priceUnit: { fontFamily: 'Manrope_400Regular', fontSize: 10, marginTop: 2 },
  priceValueWrap: { flex: 1, alignItems: 'flex-end', gap: 2 },
  priceValue: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '800' },
  priceChange: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
});