import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Defs, Ellipse, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';
import Animated, { Easing, FadeInDown, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CoffeeCard, Header, Screen } from '@/components/AppUI';
import { BrandIcon, type BrandIconName } from '@/components/BrandIcon';
import { coffees } from '@/data/coffees';
import { coffeePrices, coffeeTours, farmers, hubEvents, hubStats, regions } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const promoSlides = [
  {
    id: 'coffee-hub',
    kicker: 'PILIHAN HARI INI',
    title: 'Kopi pilihan Garut, siap dikirim.',
    description: 'Temukan single origin favoritmu.',
    cta: 'Belanja sekarang',
    route: '/catalog' as const,
    image: require('../../assets/images/hero-coffee.jpg'),
  },
  {
    id: 'traceability',
    kicker: 'JEJAK YANG TERBUKA',
    title: 'Kenali asal setiap cangkir.',
    description: 'Lihat petani, kebun, dan prosesnya.',
    cta: 'Lihat petani',
    route: '/farmers' as const,
    image: require('../../assets/images/origin-coffee.jpg'),
  },
  {
    id: 'coffee-tour',
    kicker: 'KOPI & WISATA',
    title: 'Datang dan bawa pulang cerita.',
    description: 'Temukan wisata kopi di Garut.',
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
  { icon: 'check' as const, label: 'Standar', route: '/standards' as const },
  { icon: 'package' as const, label: 'Dokumen', route: '/documents' as const },
  { icon: 'maximize' as const, label: 'Jejak', route: '/traceability' as const },
  { icon: 'alert-circle' as const, label: 'Keluhan', route: '/complaints' as const },
  { icon: 'shield' as const, label: 'Verifikasi', route: '/verification' as const },
  { icon: 'bar-chart-2' as const, label: 'Laporan', route: '/reports' as const },
];

const categoryPages = Array.from({ length: Math.ceil(categoryItems.length / 8) }, (_, pageIndex) =>
  categoryItems.slice(pageIndex * 8, pageIndex * 8 + 8),
);

function CoffeeBeanAnimation() {
  const beans = useSharedValue(0);

  useEffect(() => {
    beans.value = withRepeat(
      withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [beans]);

  const beansStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(beans.value, [0, 0.5, 1], [0, -4, 0]) },
      { rotate: `${interpolate(beans.value, [0, 0.5, 1], [-1.5, 1.5, -1.5])}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.coffeeBeanAnimation, beansStyle]}>
      <ExpoImage
        source={require('../../assets/images/coffee-beans-natural.png')}
        contentFit="contain"
        style={styles.coffeeBeanImage}
      />
    </Animated.View>
  );
}

function CoffeeCupAnimation() {
  const colors = useColors();
  const steam = useSharedValue(0);
  const cup = useSharedValue(0);

  useEffect(() => {
    steam.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
    cup.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [cup, steam]);

  const cupStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(cup.value, [0, 1], [2, -2]) }],
  }));
  const leftSteamStyle = useAnimatedStyle(() => ({
    opacity: interpolate(steam.value, [0, 0.5, 1], [0.2, 0.8, 0.2]),
    transform: [{ translateY: interpolate(steam.value, [0, 0.5, 1], [5, -5, 5]) }],
  }));
  const rightSteamStyle = useAnimatedStyle(() => ({
    opacity: interpolate(steam.value, [0, 0.5, 1], [0.75, 0.2, 0.75]),
    transform: [{ translateY: interpolate(steam.value, [0, 0.5, 1], [-2, 5, -2]) }],
  }));

  return (
    <View style={styles.coffeeCupAnimation}>
      <Animated.View style={[styles.coffeeSteam, styles.coffeeSteamLeft, leftSteamStyle]}>
        <View style={[styles.coffeeSteamLine, { backgroundColor: colors.primary }]} />
      </Animated.View>
      <Animated.View style={[styles.coffeeSteam, styles.coffeeSteamRight, rightSteamStyle]}>
        <View style={[styles.coffeeSteamLine, styles.coffeeSteamLineRight, { backgroundColor: colors.primary }]} />
      </Animated.View>
      <Animated.View style={[styles.coffeeCupGraphic, cupStyle]}>
        <Svg width={58} height={52} viewBox="0 0 28 25">
          <Ellipse cx="12.5" cy="8.5" rx="7.5" ry="2.2" fill={colors.accent} stroke={colors.primary} strokeWidth="0.9" />
          <Path d="M5 8.5h15v5.2A5.3 5.3 0 0 1 14.7 19h-4.4A5.3 5.3 0 0 1 5 13.7V8.5Z" fill={colors.card} stroke={colors.primary} strokeWidth="0.9" />
          <Path d="M20 10.5h1.3a2.7 2.7 0 0 1 0 5.4H20" fill="none" stroke={colors.primary} strokeWidth="0.9" strokeLinecap="round" />
          <Path d="M4 21h18" fill="none" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" />
          <Path d="M9.5 13.2h.01M15.2 13.2h.01M10.8 15.2c1.1.9 2.2.9 3.3 0" fill="none" stroke={colors.primary} strokeWidth="0.9" strokeLinecap="round" />
        </Svg>
      </Animated.View>
    </View>
  );
}

function HomeMenuIcon({ name, index }: { name: BrandIconName; index: number }) {
  const colors = useColors();
  const menuIconGlyphs: Partial<Record<BrandIconName, keyof typeof MaterialCommunityIcons.glyphMap>> = {
    coffee: 'coffee',
    users: 'account-group',
    map: 'map',
    compass: 'compass',
    'trending-up': 'chart-line',
    calendar: 'calendar-month',
    briefcase: 'briefcase',
    'bar-chart-2': 'chart-bar',
    grid: 'view-grid',
    shield: 'shield-check',
    check: 'check-circle',
    package: 'package-variant-closed',
    maximize: 'scan-helper',
    'alert-circle': 'alert-circle',
  };
  const palettes = [
    {
      gradient: [colors.accent, colors.secondary],
      icon: colors.foreground,
      iconSurface: colors.card,
      iconDepth: colors.border,
      iconHighlight: colors.background,
    },
    {
      gradient: [colors.primary, colors.accent],
      icon: colors.primaryForeground,
      iconSurface: colors.accent,
      iconDepth: colors.primary,
      iconHighlight: colors.card,
    },
    {
      gradient: [colors.secondary, colors.card],
      icon: colors.primary,
      iconSurface: colors.background,
      iconDepth: colors.border,
      iconHighlight: colors.card,
    },
    {
      gradient: [colors.muted, colors.accent],
      icon: colors.foreground,
      iconSurface: colors.card,
      iconDepth: colors.border,
      iconHighlight: colors.background,
    },
  ] as const;
  const palette = palettes[index % palettes.length];

  return (
    <View style={styles.menuIconStage}>
      <LinearGradient
        colors={palette.gradient}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.menuIconSurface}
      >
        <View style={styles.menuIconVisual}>
          <Svg width={46} height={46} viewBox="0 0 46 46" style={StyleSheet.absoluteFill}>
            <Defs>
              <SvgLinearGradient id={`menu-badge-${index}`} x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={palette.iconHighlight} stopOpacity={0.72} />
                <Stop offset="0.46" stopColor={palette.iconSurface} />
                <Stop offset="1" stopColor={palette.iconDepth} stopOpacity={0.92} />
              </SvgLinearGradient>
            </Defs>
            <Circle cx="23" cy="22.5" r="12.5" fill={palette.iconDepth} opacity={0.62} />
            <Circle cx="23" cy="20.5" r="12.5" fill={`url(#menu-badge-${index})`} />
            <Ellipse
              cx="19"
              cy="14.5"
              rx="5.8"
              ry="2.5"
              fill={palette.iconHighlight}
              opacity={0.34}
              transform="rotate(-14 19 14.5)"
            />
          </Svg>
          <MaterialCommunityIcons
            name={menuIconGlyphs[name] ?? 'circle-outline'}
            size={21}
            color={palette.icon}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(260, width - 40);
  const featuredCardWidth = Math.max(120, Math.floor((width - 40 - 12) / 2));
  const categoryPageWidth = Math.max(300, width);
  const categoryItemWidth = Math.max(58, Math.floor((categoryPageWidth - 40 - 24) / 4));
  const bannerRef = useRef<ScrollView>(null);
  const categoryRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategoryPage, setActiveCategoryPage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextSlide = (activeSlide + 1) % promoSlides.length;
      setActiveSlide(nextSlide);
      bannerRef.current?.scrollTo({ x: nextSlide * bannerWidth, animated: true });
    }, 4500);

    return () => clearTimeout(timer);
  }, [activeSlide, bannerWidth]);

  return <Screen>
    <Header title="Mau menikmati kopi apa hari ini?" subtitle="KOPI GARUT · JAWA BARAT" qr />
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
        decelerationRate="normal"
        bounces={false}
        onMomentumScrollEnd={(event) => setActiveSlide(Math.round(event.nativeEvent.contentOffset.x / bannerWidth))}
      >
        {promoSlides.map((slide, index) => (
          <ImageBackground key={slide.id} source={slide.image} imageStyle={styles.heroImage} style={[styles.heroImageContainer, { width: bannerWidth }]}>
            <LinearGradient colors={['transparent', colors.foreground]} locations={[0.18, 1]} style={styles.heroShade} />
            <View style={styles.heroCopy}>
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
            testID={`promo-dot-${index}`}
            accessibilityRole="button"
            accessibilityLabel={`Tampilkan promo ${index + 1}`}
            onPress={() => {
              setActiveSlide(index);
              bannerRef.current?.scrollTo({ x: index * bannerWidth, animated: true });
            }}
            style={styles.paginationTrack}
          >
            <View style={[styles.paginationDot, { backgroundColor: index === activeSlide ? colors.primary : colors.border, width: index === activeSlide ? 22 : 6 }]} />
          </Pressable>
        ))}
      </View>
    </Animated.View>
    <View>
      <ScrollView
        ref={categoryRef}
        horizontal
        pagingEnabled
        decelerationRate="normal"
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => setActiveCategoryPage(Math.round(event.nativeEvent.contentOffset.x / categoryPageWidth))}
        style={styles.categoryPager}
      >
        {categoryPages.map((page, pageIndex) => (
          <View key={`category-page-${pageIndex}`} style={[styles.categoryPage, { width: categoryPageWidth }]}>
            {[0, 1].map((rowIndex) => (
              <View key={`category-row-${rowIndex}`} style={styles.categoryRow}>
                {page.slice(rowIndex * 4, rowIndex * 4 + 4).map((item) => (
                  <Pressable
                    key={item.label}
                    accessibilityRole="button"
                    accessibilityLabel={`Buka ${item.label}`}
                    onPress={() => router.push(item.route)}
                    style={({ pressed }) => [styles.categoryItem, { width: categoryItemWidth, opacity: pressed ? 0.7 : 1 }]}
                  >
                    <HomeMenuIcon name={item.icon} index={pageIndex * 8 + rowIndex * 4 + page.slice(rowIndex * 4, rowIndex * 4 + 4).indexOf(item)} />
                    <Text numberOfLines={1} style={[styles.categoryLabel, { color: colors.foreground }]}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      {categoryPages.length > 1 && (
        <View style={styles.categoryPagination}>
          {categoryPages.map((_, index) => (
            <Pressable
              key={`category-dot-${index}`}
              testID={`category-dot-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`Tampilkan menu halaman ${index + 1}`}
              onPress={() => {
                setActiveCategoryPage(index);
                categoryRef.current?.scrollTo({ x: index * categoryPageWidth, animated: true });
              }}
              style={styles.categoryPaginationHit}
            >
              <View style={[styles.categoryPaginationDot, { backgroundColor: index === activeCategoryPage ? colors.primary : colors.border }]} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
    <Animated.View entering={FadeInDown.delay(180).duration(600)} style={styles.storyLeadWrap}>
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
        <ExpoImage
          source={require('../../assets/images/mountain-banner.png')}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card, opacity: 0.12 }]} />
        <View style={styles.storyLeadBody}>
          <View style={styles.storyLeadCopy}>
            <Text style={[styles.storyLeadTitle, { color: colors.foreground }]}>Kopi dari tanah pegunungan.</Text>
            <Text style={[styles.storyLeadText, { color: colors.mutedForeground }]}>Dari lereng Garut, setiap biji membawa cerita petani, ketinggian, dan proses yang dirawat dengan penuh perhatian.</Text>
            <CoffeeBeanAnimation />
          </View>
        </View>
      </Pressable>
    </Animated.View>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Untuk cangkir pertama</Text></View>
      <Link href="/catalog" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featured}><CoffeeCard coffee={coffees[0]} index={0} grid cardWidth={featuredCardWidth} /><CoffeeCard coffee={coffees[1]} index={1} grid cardWidth={featuredCardWidth} /></ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Tumbuh bersama</Text></View>
      <Link href="/dashboard" style={[styles.seeAll, { color: colors.primary }]}>Lihat data</Link>
    </View>
    <View style={[styles.statsGrid, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.statsIntro, { backgroundColor: colors.primary }]}>
        <View style={styles.statsIntroCopy}>
          <Text style={[styles.statsIntroTitle, { color: colors.primaryForeground }]}>Tumbuh dari kebun, terasa di setiap cangkir.</Text>
        </View>
        <CoffeeCupAnimation />
      </View>
      <View style={styles.statsList}>
        {hubStats.map((stat, index) => (
          <View
            key={stat.label}
            style={[
              styles.stat,
              index % 2 === 0 && styles.statDividerRight,
              index > 1 && styles.statDividerTop,
              index % 2 === 0 && { borderRightColor: colors.border },
              index > 1 && { borderTopColor: colors.border },
            ]}
          >
            <View style={[styles.statIcon, { backgroundColor: colors.secondary }]}>
              <BrandIcon name={index === 0 ? 'users' : index === 1 ? 'map' : index === 2 ? 'package' : 'compass'} size={16} color={colors.primary} />
            </View>
            <Text style={[styles.statValue, { color: colors.foreground }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mulai dari selera</Text></View>
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
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Orang di balik rasa</Text></View>
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
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Baca peta rasa Garut</Text></View>
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
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Selalu ada cerita baru</Text></View>
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
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Datang ke kebunnya</Text></View>
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
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Pantau nilai kopi</Text></View>
      <Link href="/prices" style={[styles.seeAll, { color: colors.primary }]}>Buka harga</Link>
    </View>
    <View style={[styles.pricePanel, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {coffeePrices.slice(0, 3).map((item, index) => <Pressable key={item.label} onPress={() => router.push('/prices')} style={[styles.priceRow, index < 2 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}><View><Text style={[styles.priceLabel, { color: colors.foreground }]}>{item.label}</Text><Text style={[styles.priceUnit, { color: colors.mutedForeground }]}>{item.unit}</Text></View><View style={styles.priceValueWrap}><Text style={[styles.priceValue, { color: colors.primary }]}>{item.price}</Text><Text style={[styles.priceChange, { color: colors.mutedForeground }]}>{item.change}</Text></View><BrandIcon name="chevron-right" size={16} color={colors.mutedForeground} /></Pressable>)}
    </View>
    <View style={styles.homeFooter}>
      <ExpoImage
        source={require('../../assets/images/garut-mountains.png')}
        contentFit="contain"
        style={[styles.footerMountain, { tintColor: colors.foreground }]}
      />
      <Text style={[styles.footerCaption, { color: colors.mutedForeground }]}>DARI KEBUN GARUT, UNTUK SETIAP CANGKIR</Text>
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  searchEntry: { height: 52, borderRadius: 17, borderWidth: 1, paddingLeft: 15, paddingRight: 7, flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchPlaceholder: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  searchFilter: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  heroSection: { height: 205, borderRadius: 27, overflow: 'hidden', marginTop: 0 },
  heroImageContainer: { flex: 1, justifyContent: 'flex-end' },
  heroImage: { borderRadius: 27 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.9 },
  heroCopy: { paddingHorizontal: 18, paddingBottom: 16, gap: 6 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 2 },
  promoDot: { width: 5, height: 5, borderRadius: 3 },
  promoPillText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 27, fontWeight: '700', letterSpacing: -0.6, maxWidth: 300 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, opacity: 0.9, maxWidth: 270 },
  heroButton: { height: 34, borderRadius: 11, paddingHorizontal: 12, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 },
  heroButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  pagination: { position: 'absolute', right: 15, top: 15, flexDirection: 'row', alignItems: 'center', gap: 0, paddingHorizontal: 5, paddingVertical: 3, borderRadius: 20, opacity: 0.92, zIndex: 2, elevation: 2 },
  paginationTrack: { width: 20, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  paginationDot: { height: 6, borderRadius: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 18, gap: 14 },
  headingCopy: { flexShrink: 1 },
  headingRule: { width: 42, height: 1, marginBottom: 7 },
  categoryHint: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, paddingBottom: 4, textAlign: 'right', maxWidth: 92 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', marginTop: 0, letterSpacing: -0.3 },
  seeAll: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', paddingBottom: 3 },
  categoryPager: { marginHorizontal: -20 },
  categoryPage: { paddingHorizontal: 20, gap: 16 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryItem: { alignItems: 'center', gap: 8 },
  menuIconStage: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  menuIconSurface: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  menuIconVisual: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, fontWeight: '600' },
  categoryPagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0, marginTop: 12 },
  categoryPaginationHit: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  categoryPaginationDot: { width: 6, height: 6, borderRadius: 3 },
  storyLead: { minHeight: 154, borderRadius: 20, borderWidth: 1, padding: 12, overflow: 'hidden', zIndex: 1 },
  storyLeadBody: { flex: 1, flexDirection: 'row', alignItems: 'stretch', gap: 12 },
  storyLeadCopy: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 4, paddingVertical: 4 },
  storyLeadKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.35, textAlign: 'center' },
  storyLeadTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 19, fontWeight: '700', textAlign: 'center' },
  storyLeadText: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13, marginTop: 1, textAlign: 'center' },
  coffeeBeanAnimation: { width: 64, height: 22, alignItems: 'center', justifyContent: 'center', marginTop: 7 },
  coffeeBeanImage: { width: '100%', height: '100%' },
  coffeeCupAnimation: { width: 58, height: 64, alignItems: 'center', justifyContent: 'flex-end', overflow: 'visible' },
  coffeeSteam: { position: 'absolute', top: 1, width: 9, height: 24, alignItems: 'center', justifyContent: 'flex-end' },
  coffeeSteamLeft: { left: 14 },
  coffeeSteamRight: { right: 14 },
  coffeeSteamLine: { width: 2, height: 14, borderRadius: 2, transform: [{ rotate: '18deg' }] },
  coffeeSteamLineRight: { transform: [{ rotate: '-18deg' }] },
  coffeeCupGraphic: { width: 58, height: 52, alignItems: 'center', justifyContent: 'center' },
  statsGrid: { borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  statsIntro: { minHeight: 78, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  statsIntroCopy: { flex: 1, gap: 4 },
  statsEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.35 },
  statsIntroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '700', maxWidth: 220 },
  statsList: { flexDirection: 'row', flexWrap: 'wrap' },
  stat: { width: '50%', minHeight: 78, padding: 10, gap: 4, justifyContent: 'center' },
  statIcon: { width: 24, height: 24, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  statDividerRight: { borderRightWidth: 1 },
  statDividerTop: { borderTopWidth: 1 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 21, fontWeight: '800' },
  statLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 12 },
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
  homeFooter: { alignItems: 'center', gap: 3, marginTop: 0, paddingTop: 0, paddingBottom: 8 },
  footerMountain: { width: '100%', height: 104, opacity: 0.42 },
  footerCaption: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.15, textAlign: 'center' },
  storyLeadWrap: { position: 'relative', marginTop: 10, zIndex: 1, overflow: 'visible' },
});