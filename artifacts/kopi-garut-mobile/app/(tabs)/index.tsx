import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import Animated, { Easing, FadeInDown, SlideInRight, SlideOutLeft, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CoffeeCard, Header, Screen } from '@/components/AppUI';
import { BrandIcon, type BrandIconName } from '@/components/BrandIcon';
import { coffees } from '@/data/coffees';
import { diversifiedProducts } from '@/data/diversified-products';
import { coffeeTours, farmers, hubEvents, hubStats, regions } from '@/data/hub';
import { extensionTeam } from '@/data/extension-team';
import { useColors } from '@/hooks/useColors';
import { useStore } from '@/context/StoreContext';

const promoSlides = [
  {
    id: 'garut-promo',
    route: '/catalog' as const,
    image: require('../../assets/images/kopi-garut-panen-rasa-banner.webp'),
    eyebrow: 'KOPI GARUT',
    title: 'Panen rasa dari Garut',
    description: 'Temukan kopi spesialti dari lereng pilihan.',
    cta: 'Lihat koleksi',
  },
  {
    id: 'traceability',
    route: '/farmers' as const,
    image: require('../../assets/images/kopi-garut-kenali-kebun-pilihan-banner.webp'),
    eyebrow: 'ASAL YANG TERJAGA',
    title: 'Kenali kebun pilihan',
    description: 'Ikuti cerita kopi dari kebun sampai cangkir.',
    cta: 'Jelajahi asal',
  },
  {
    id: 'coffee-tour',
    route: '/tourism' as const,
    image: require('../../assets/images/kopi-garut-seduh-sambil-menjelajah-banner.webp'),
    eyebrow: 'PENGALAMAN KOPI',
    title: 'Seduh sambil menjelajah',
    description: 'Nikmati perjalanan rasa di dataran tinggi Garut.',
    cta: 'Lihat wisata',
  },
  {
    id: 'coffee-regions',
    route: '/regions' as const,
    image: require('../../assets/images/kopi-garut-dari-lereng-ke-cangkir-banner.webp'),
    eyebrow: 'WILAYAH KOPI',
    title: 'Dari lereng ke cangkir',
    description: 'Temukan karakter unik dari setiap wilayah.',
    cta: 'Buka wilayah',
  },
  {
    id: 'coffee-collective',
    route: '/collective' as const,
    image: require('../../assets/images/kopi-garut-banyak-orang-banner.webp'),
    eyebrow: 'TUMBUH BERSAMA',
    title: 'Kopi Garut untuk banyak orang',
    description: 'Satu ekosistem untuk petani dan penikmat kopi.',
    cta: 'Jelajah ekosistem',
  },
  {
    id: 'coffee-partnership',
    route: '/partnership' as const,
    image: require('../../assets/images/kopi-garut-bangun-rantai-kopi-banner.webp'),
    eyebrow: 'JADI MITRA',
    title: 'Bangun rantai kopi bersama',
    description: 'Temukan peluang kolaborasi dengan ekosistem Garut.',
    cta: 'Lihat kemitraan',
  },
];

const categoryItems = [
  { icon: 'coffee' as const, label: 'Kopi', route: '/catalog' as const },
  { icon: 'users' as const, label: 'Petani', route: '/farmers' as const },
  { icon: 'map' as const, label: 'Wilayah', route: '/regions' as const },
  { icon: 'compass' as const, label: 'Wisata', route: '/tourism' as const },
  { icon: 'calendar' as const, label: 'Event', route: '/events' as const },
  { icon: 'briefcase' as const, label: 'Mitra', route: '/partnership' as const },
  { icon: 'grid' as const, label: 'Ekosistem', route: '/collective' as const },
  { icon: 'shield' as const, label: 'Program', route: '/program' as const },
  { icon: 'alert-circle' as const, label: 'Keluhan', route: '/complaints' as const },
  { icon: 'package' as const, label: 'Produk turunan', route: '/diversification' as const },
];

const categoryPages = Array.from({ length: Math.ceil(categoryItems.length / 8) }, (_, pageIndex) =>
  categoryItems.slice(pageIndex * 8, pageIndex * 8 + 8),
);

const voucherSlides = [
  [
    { discount: '15%', title: 'Kopi pilihan', code: 'GARUT15', note: 'Min 150K', variant: 'primary' },
    { discount: '20%', title: 'Panen baru', code: 'PANEN20', note: 'Koleksi natural', variant: 'dark' },
  ],
  [
    { discount: '25K', title: 'Ongkir hemat', code: 'KIRIM25', note: 'Min 200K', variant: 'dark' },
    { discount: '10%', title: 'Teman ngopi', code: 'NGOPI10', note: 'Ajak teman', variant: 'primary' },
  ],
  [
    { discount: '30K', title: 'Kopi pertama', code: 'AWAL30', note: 'Pengguna baru', variant: 'primary' },
    { discount: '15%', title: 'Petani pilihan', code: 'PETANI15', note: 'Kopi Garut', variant: 'dark' },
  ],
  [
    { discount: '10%', title: 'Langganan', code: 'RUTIN10', note: 'Pesanan rutin', variant: 'dark' },
    { discount: '20%', title: 'Akhir pekan', code: 'WEEK20', note: 'Sabtu–Minggu', variant: 'primary' },
  ],
] as const;

const storyReelImages = [
  require('../../assets/images/event-festival-garut.jpg'),
  require('../../assets/images/origin-coffee.jpg'),
  require('../../assets/images/hero-coffee.jpg'),
  require('../../assets/images/farmer-asep-rahmat.jpg'),
  require('../../assets/images/farmer-iis-nurhayati.jpg'),
  require('../../assets/images/farmer-deni-suhendar.jpg'),
];

const storyReels = hubEvents.map((event, index) => ({
  ...event,
  image: storyReelImages[index],
}));

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

function SearchBeanAnimation() {
  const motion = useSharedValue(0);

  useEffect(() => {
    motion.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [motion]);

  const beanStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 240 },
      { translateY: interpolate(motion.value, [0, 0.5, 1], [1, -1, 1]) },
      { rotateY: `${interpolate(motion.value, [0, 0.5, 1], [-20, 20, -20])}deg` },
      { rotateZ: `${interpolate(motion.value, [0, 0.5, 1], [-4, 4, -4])}deg` },
      { scale: interpolate(motion.value, [0, 0.5, 1], [0.9, 1.04, 0.9]) },
    ],
  }));

  return (
    <Animated.View style={[styles.searchBeanAnimation, beanStyle]}>
      <ExpoImage
        source={require('../../assets/images/coffee-bean-menu.png')}
        contentFit="contain"
        style={styles.searchBeanImage}
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
          <Path d="M9.5 13.2h.01M15.2 13.2h.01M10.8 15.2c1.1.9 2.2.9 3.3 0" fill="none" stroke={colors.primary} strokeWidth="0.9" strokeLinecap="round" />
        </Svg>
      </Animated.View>
    </View>
  );
}

function RoadTrafficAnimation() {
  const colors = useColors();
  const traffic = useSharedValue(0);

  useEffect(() => {
    traffic.value = withRepeat(
      withTiming(1, { duration: 3200, easing: Easing.linear }),
      -1,
      false,
    );
  }, [traffic]);

  const forwardVehicleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(traffic.value, [0, 1], [-28, 96]) }],
  }));
  const returningVehicleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(traffic.value, [0, 1], [96, -28]) }],
  }));

  return (
    <View style={styles.roadTraffic}>
      <View style={[styles.roadHorizon, { backgroundColor: colors.accent }]} />
      <View style={[styles.roadTrack, { backgroundColor: colors.foreground }]}>
        <View style={styles.roadLaneMark}>
          <View style={[styles.roadLaneDash, { backgroundColor: colors.primaryForeground }]} />
          <View style={[styles.roadLaneDash, { backgroundColor: colors.primaryForeground }]} />
          <View style={[styles.roadLaneDash, { backgroundColor: colors.primaryForeground }]} />
        </View>
        <Animated.View style={[styles.trafficVehicle, styles.trafficCar, { backgroundColor: colors.accent }, forwardVehicleStyle]}>
          <View style={[styles.trafficWindow, { backgroundColor: colors.card }]} />
        </Animated.View>
        <Animated.View style={[styles.trafficVehicle, styles.trafficVan, { backgroundColor: colors.primaryForeground }, returningVehicleStyle]}>
          <View style={[styles.trafficWindow, { backgroundColor: colors.card }]} />
        </Animated.View>
      </View>
      <View style={[styles.roadShoulder, { backgroundColor: colors.accent }]} />
    </View>
  );
}

type MenuGlyphColors = {
  main: string;
  light: string;
  dark: string;
  accent: string;
};

function ThreeDMenuGlyph({ name, colors }: { name: BrandIconName; colors: MenuGlyphColors }) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      {name === 'coffee' && (
        <>
          <Path d="M6 11h15v7a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6v-7Z" fill={colors.dark} />
          <Path d="M6 9.5h15v7a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6v-7Z" fill={colors.main} />
          <Ellipse cx="13.5" cy="9.5" rx="7.5" ry="2.4" fill={colors.light} />
          <Ellipse cx="13.5" cy="9.5" rx="5.5" ry="1.2" fill={colors.accent} opacity={0.85} />
          <Path d="M21 12h1.2a3.2 3.2 0 0 1 0 6.4H21" fill={colors.accent} />
        </>
      )}
      {name === 'users' && (
        <>
          <Circle cx="10" cy="10" r="3.4" fill={colors.dark} />
          <Circle cx="10" cy="8.5" r="3.4" fill={colors.main} />
          <Circle cx="20" cy="11" r="2.7" fill={colors.accent} />
          <Path d="M3.5 23c.7-4.6 2.8-7 6.5-7s5.8 2.4 6.5 7Z" fill={colors.dark} />
          <Path d="M3.5 21.5c.7-4.6 2.8-7 6.5-7s5.8 2.4 6.5 7Z" fill={colors.main} />
          <Path d="M16 22c.4-3.2 1.8-5 4.2-5 2.2 0 3.7 1.7 4.3 5Z" fill={colors.accent} />
        </>
      )}
      {name === 'map' && (
        <>
          <Path d="m3 8 7-2 10 3 7-2v17l-7 2-10-3-7 2V8Z" fill={colors.dark} />
          <Path d="m3 6.5 7-2 10 3 7-2v17l-7 2-10-3-7 2V6.5Z" fill={colors.main} />
          <Path d="m10 4.5 10 3v17l-10-3v-17Z" fill={colors.light} />
          <Path d="m20 7.5 7-2v17l-7 2v-17Z" fill={colors.accent} />
          <Path d="m10 4.5-7 2v17l7-2v-17Z" fill={colors.main} opacity={0.84} />
        </>
      )}
      {name === 'compass' && (
        <>
          <Circle cx="15" cy="16" r="10" fill={colors.dark} />
          <Circle cx="15" cy="14.5" r="10" fill={colors.main} />
          <Circle cx="15" cy="14.5" r="7.2" fill={colors.light} />
          <Path d="m20.5 9-3.3 7.1-7.1 3.3 3.3-7.1L20.5 9Z" fill={colors.dark} />
          <Path d="m20.5 7.5-3.3 7.1-7.1 3.3 3.3-7.1 7.1-3.3Z" fill={colors.accent} />
          <Circle cx="15" cy="14.5" r="1.4" fill={colors.main} />
        </>
      )}
      {name === 'trending-up' && (
        <>
          <Path d="M5 24V15h5v9H5ZM12 24V9h5v15h-5ZM19 24V5h5v19h-5Z" fill={colors.dark} />
          <Path d="M5 22.5v-9h5v9H5ZM12 22.5V7.5h5v15h-5ZM19 22.5V3.5h5v19h-5Z" fill={colors.main} />
          <Path d="m4 9 5 5 4-4 4 3 7-8" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M20.5 5.5H24v3.5" fill="none" stroke={colors.light} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'calendar' && (
        <>
          <Rect x="5" y="6" width="20" height="19" rx="3" fill={colors.dark} />
          <Rect x="5" y="4.5" width="20" height="19" rx="3" fill={colors.main} />
          <Path d="M5 10h20V7.5a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3V10Z" fill={colors.accent} />
          <Path d="M10 3v4M20 3v4" stroke={colors.light} strokeWidth="2" strokeLinecap="round" />
          <Rect x="9" y="13" width="4" height="3" rx="1" fill={colors.light} />
          <Rect x="16" y="13" width="4" height="3" rx="1" fill={colors.accent} />
          <Rect x="9" y="18" width="4" height="3" rx="1" fill={colors.accent} />
          <Rect x="16" y="18" width="4" height="3" rx="1" fill={colors.light} />
        </>
      )}
      {name === 'briefcase' && (
        <>
          <Rect x="4" y="9" width="22" height="15" rx="3" fill={colors.dark} />
          <Rect x="4" y="7.5" width="22" height="15" rx="3" fill={colors.main} />
          <Path d="M10 7.5V5h10v2.5M4 13h22M12 13v3h6v-3" fill="none" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M4 14h22v2H4Z" fill={colors.accent} opacity={0.8} />
        </>
      )}
      {name === 'bar-chart-2' && (
        <>
          <Path d="M5 24V14h5v10H5ZM12 24V7h5v17h-5ZM19 24V11h5v13h-5Z" fill={colors.dark} />
          <Path d="M5 22.5v-10h5v10H5ZM12 22.5V5.5h5v17h-5ZM19 22.5V9.5h5v13h-5Z" fill={colors.main} />
          <Path d="M5 12.5h5v2H5ZM12 5.5h5v2h-5ZM19 9.5h5v2h-5Z" fill={colors.accent} />
        </>
      )}
      {name === 'grid' && (
        <>
          <Path d="m5 6 8-2 6 2-8 2-6-2ZM17 10l8-2v7l-8 2v-7ZM5 19l8-2v7l-8 2v-7ZM17 20l8-2v7l-8 2v-7Z" fill={colors.dark} />
          <Path d="m4 4.5 8-2 6 2-8 2-6-2ZM16 8.5l8-2v7l-8 2v-7ZM4 17.5l8-2v7l-8 2v-7ZM16 18.5l8-2v7l-8 2v-7Z" fill={colors.main} />
          <Path d="m4 4.5 6 2v7l-6-2v-7ZM16 8.5l8-2v7l-8 2v-7ZM4 17.5l8-2v7l-8 2v-7ZM16 18.5l8-2v7l-8 2v-7Z" fill={colors.accent} opacity={0.86} />
          <Path d="m12 2.5 6 2-8 2-6-2 8-2ZM24 6.5l-8 2 8-2ZM12 15.5l-8 2 8-2ZM24 16.5l-8 2 8-2Z" fill={colors.light} opacity={0.7} />
        </>
      )}
      {name === 'shield' && (
        <>
          <Path d="M15 3.5 24 7v6.5c0 5.5-3.7 9.5-9 11.5-5.3-2-9-6-9-11.5V7l9-3.5Z" fill={colors.dark} />
          <Path d="M15 2 24 5.5V12c0 5.5-3.7 9.5-9 11.5-5.3-2-9-6-9-11.5V5.5L15 2Z" fill={colors.main} />
          <Path d="M15 5 21 7.3V12c0 3.8-2.3 6.6-6 8.2-3.7-1.6-6-4.4-6-8.2V7.3L15 5Z" fill={colors.accent} />
          <Path d="m11 12.5 2.5 2.5 5-5" fill="none" stroke={colors.light} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'check' && (
        <>
          <Path d="m15 3 2 2.1 3-.3.9 2.8 2.6 1.6-1.2 2.7 1.2 2.8-2.6 1.6-.9 2.8-3-.3-2 2.1-2-2.1-3 .3-.9-2.8-2.6-1.6 1.2-2.8-1.2-2.7 2.6-1.6.9-2.8 3 .3L15 3Z" fill={colors.dark} />
          <Path d="m15 1.5 2 2.1 3-.3.9 2.8 2.6 1.6-1.2 2.7 1.2 2.8-2.6 1.6-.9 2.8-3-.3-2 2.1-2-2.1-3 .3-.9-2.8-2.6-1.6 1.2-2.8-1.2-2.7 2.6-1.6.9-2.8 3 .3L15 1.5Z" fill={colors.main} />
          <Path d="m10.5 13 3 3 6-6" fill="none" stroke={colors.light} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'package' && (
        <>
          <Path d="m4 9 11-5 11 5v13l-11 5-11-5V9Z" fill={colors.dark} />
          <Path d="m4 7.5 11-5 11 5v13l-11 5-11-5v-13Z" fill={colors.main} />
          <Path d="m4 7.5 11 5 11-5-11-5-11 5Z" fill={colors.light} />
          <Path d="M15 12.5v13M4 7.5l11 5 11-5" fill="none" stroke={colors.accent} strokeWidth="1.7" strokeLinejoin="round" />
        </>
      )}
      {name === 'maximize' && (
        <>
          <Path d="M8 5H4v5M22 5h4v5M26 19v5h-4M4 19v5h4" fill="none" stroke={colors.dark} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M8 3.5H4v5M22 3.5h4v5M26 17.5v5h-4M4 17.5v5h4" fill="none" stroke={colors.main} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M8 3.5h3v2H8ZM19 3.5h3v2h-3ZM23 17.5h3v3h-3ZM4 17.5h3v3H4Z" fill={colors.accent} />
        </>
      )}
      {name === 'alert-circle' && (
        <>
          <Path d="m15 4 11 20H4L15 4Z" fill={colors.dark} />
          <Path d="m15 2.5 11 20H4l11-20Z" fill={colors.main} />
          <Path d="m15 6 7.5 14h-15L15 6Z" fill={colors.accent} />
          <Path d="M15 10v5" stroke={colors.light} strokeWidth="2.2" strokeLinecap="round" />
          <Circle cx="15" cy="18" r="1.2" fill={colors.light} />
        </>
      )}
    </Svg>
  );
}

type MenuCoffeeOrnamentColors = {
  bean: string;
  shadow: string;
  highlight: string;
};

function MenuCoffeeOrnament({ colors }: { colors: MenuCoffeeOrnamentColors }) {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" style={styles.menuCoffeeOrnament}>
        <Ellipse cx="7.8" cy="8.2" rx="4" ry="5.7" fill={colors.shadow} opacity={0.34} transform="rotate(-35 7.8 8.2)" />
        <Ellipse cx="6.5" cy="6.5" rx="4" ry="5.7" fill={colors.bean} transform="rotate(-35 6.5 6.5)" />
        <Path d="M4.4 2.4c1.7 1.9 2 4.4 1.2 8" fill="none" stroke={colors.highlight} strokeWidth="1" strokeLinecap="round" opacity={0.92} />
        <Ellipse cx="48.2" cy="47.8" rx="4" ry="5.7" fill={colors.shadow} opacity={0.34} transform="rotate(-35 48.2 47.8)" />
        <Ellipse cx="49.5" cy="49.5" rx="4" ry="5.7" fill={colors.bean} transform="rotate(-35 49.5 49.5)" />
        <Path d="M51.6 53.6c-1.7-1.9-2-4.4-1.2-8" fill="none" stroke={colors.highlight} strokeWidth="1" strokeLinecap="round" opacity={0.92} />
        <Circle cx="26.5" cy="3.2" r="1.7" fill={colors.shadow} opacity={0.34} />
        <Circle cx="29.5" cy="3.2" r="1.7" fill={colors.bean} />
        <Circle cx="26.5" cy="52.8" r="1.7" fill={colors.shadow} opacity={0.34} />
        <Circle cx="29.5" cy="52.8" r="1.7" fill={colors.bean} />
    </Svg>
  );
}

function HomeMenuIcon({ index, icon }: { index: number; icon: BrandIconName }) {
  const colors = useColors();
  const iconMotion = useSharedValue(0);

  useEffect(() => {
    iconMotion.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [iconMotion]);

  const iconMotionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(iconMotion.value, [0, 0.5, 1], [0, -3, 0]) },
      { rotate: `${interpolate(iconMotion.value, [0, 0.5, 1], [-4, 4, -4])}deg` },
      { scale: interpolate(iconMotion.value, [0, 0.5, 1], [1, 1.04, 1]) },
    ],
  }));

  const palettes = [
    {
      gradient: [colors.primary, colors.accent],
      glyph: { main: colors.accent, light: colors.card, dark: colors.foreground, accent: colors.primaryForeground },
    },
    {
      gradient: [colors.foreground, colors.primary],
      glyph: { main: colors.accent, light: colors.card, dark: colors.foreground, accent: colors.accent },
    },
    {
      gradient: [colors.accent, colors.primary],
      glyph: { main: colors.primaryForeground, light: colors.card, dark: colors.foreground, accent: colors.primary },
    },
    {
      gradient: [colors.secondary, colors.foreground],
      glyph: { main: colors.accent, light: colors.card, dark: colors.foreground, accent: colors.primaryForeground },
    },
  ] as const;
  const palette = palettes[index % palettes.length];
  const extrusion = {
    main: colors.secondaryForeground,
    light: colors.secondary,
    dark: colors.secondaryForeground,
    accent: colors.secondaryForeground,
  };

  return (
    <View style={styles.menuIconStage}>
      <LinearGradient
        colors={palette.gradient}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.menuIconSurface, { borderColor: colors.primary, shadowColor: colors.foreground }]}
      />
      <MenuCoffeeOrnament colors={{ bean: colors.accent, shadow: colors.secondaryForeground, highlight: colors.card }} />
      <Animated.View pointerEvents="none" style={[styles.menuIconVisualOverlay, iconMotionStyle]}>
        <View style={styles.menuGlyphExtrusion}>
          <ThreeDMenuGlyph name={icon} colors={extrusion} />
        </View>
        <View style={styles.menuGlyphFront}>
          <ThreeDMenuGlyph name={icon} colors={palette.glyph} />
        </View>
      </Animated.View>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { addToCart } = useStore();
  const { width } = useWindowDimensions();
  const featuredCardWidth = Math.max(120, Math.floor((width - 40 - 12) / 2));
  const diversifiedCardWidth = Math.max(166, Math.floor((width - 40 - 12) / 2));
  const farmerCardWidth = Math.max(160, Math.floor((width - 40 - 8) / 2));
  const extensionCardWidth = Math.max(160, Math.floor((width - 40 - 8) / 2));
  const regionCardWidth = Math.max(150, Math.floor((width - 40 - 10) / 2));
  const storyCardWidth = Math.max(140, Math.floor((width - 40 - 8) / 2));
  const storyCardHeight = Math.round(storyCardWidth * 1.42);
  const categoryPageWidth = Math.max(300, width);
  const categoryItemWidth = Math.max(58, Math.floor((categoryPageWidth - 40 - 24) / 4));
  // Keep the carousel closer to the source images' square crop so people, cups,
  // and product packs stay visible instead of being cut off on narrow screens.
  const promoHeight = Math.round(Math.min(208, Math.max(174, (width - 40) * 0.64)));
  const categoryRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [displayedSlide, setDisplayedSlide] = useState(0);
  const [activeVoucherSlide, setActiveVoucherSlide] = useState(0);
  const [activeCategoryPage, setActiveCategoryPage] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const storyRef = useRef<ScrollView>(null);

  const currentSlide = promoSlides[displayedSlide];
  const pendingSlide = promoSlides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % promoSlides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVoucherSlide((current) => (current + 1) % voucherSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoryIndex((current) => {
        const lastStartIndex = Math.max(0, storyReels.length - 2);
        const next = current >= lastStartIndex ? 0 : current + 1;
        storyRef.current?.scrollTo({ x: next * (storyCardWidth + 8), animated: true });
        return next;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [storyCardWidth]);

  return <Screen>
    <Header title="Mau menikmati kopi apa hari ini?" notifications extendOrnament />
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
      <SearchBeanAnimation />
      <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground }]}>
        Cari kopi, petani, atau wilayah
      </Text>
      <View style={[styles.searchFilter, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="sliders" size={15} color={colors.primary} />
      </View>
    </Pressable>
    <Animated.View entering={FadeInDown.duration(550)} style={[styles.heroSection, { height: promoHeight }]}>
      <Animated.View
        key={`promo-scene-${displayedSlide}`}
        entering={SlideInRight.duration(680)}
        exiting={SlideOutLeft.duration(680)}
        style={[styles.promoScene, { height: promoHeight }]}
      >
        <View style={[styles.promoGallery, { height: promoHeight }]}>
        <View style={[styles.promoActive, { height: promoHeight, shadowColor: colors.foreground }]}>
          <Pressable
            testID={`promo-browse-${activeSlide}`}
            accessibilityRole="button"
            accessibilityLabel={`Buka promo ${activeSlide + 1}`}
            onPress={() => router.push(currentSlide.route)}
            style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.86 : 1 })}
          >
            <ExpoImage
              source={currentSlide.image}
              contentFit="cover"
              contentPosition="center"
              cachePolicy="memory-disk"
              transition={220}
              style={styles.promoImage}
            />
            {activeSlide !== displayedSlide && (
              <ExpoImage
                source={pendingSlide.image}
                contentFit="cover"
                contentPosition="center"
                cachePolicy="memory-disk"
                onLoad={() => setDisplayedSlide(activeSlide)}
                style={[styles.promoImage, styles.promoPreloadImage]}
              />
            )}
            <LinearGradient
              colors={[`${colors.foreground}E6`, `${colors.foreground}52`, `${colors.foreground}12`]}
              locations={[0, 0.58, 1]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.promoShade}
            />
            <View style={styles.promoCopy}>
              <Text style={[styles.promoEyebrow, { color: colors.accent }]}>{currentSlide.eyebrow}</Text>
              <Text numberOfLines={2} style={[styles.promoTitle, { color: colors.card }]}>{currentSlide.title}</Text>
              <Text numberOfLines={1} style={[styles.promoDescription, { color: colors.card }]}>{currentSlide.description}</Text>
              <Text style={[styles.promoCta, { color: colors.card }]}>{currentSlide.cta} <Text style={{ color: colors.accent }}>›</Text></Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.promoDots}>
          {promoSlides.map((slide, index) => (
            <Pressable
              key={slide.id}
              testID={`promo-dot-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`Tampilkan promo ${index + 1}`}
              onPress={() => setActiveSlide(index)}
              style={styles.promoDotHit}
            >
              <View style={[styles.promoDot, { backgroundColor: index === activeSlide ? colors.primary : colors.card, width: index === activeSlide ? 18 : 5 }]} />
            </Pressable>
          ))}
        </View>
      </View>
      </Animated.View>
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
            {Array.from({ length: Math.ceil(page.length / 4) }, (_, rowIndex) => (
              <View
                key={`category-row-${rowIndex}`}
                style={[
                  styles.categoryRow,
                  page.length < 4 && styles.categoryRowCompact,
                ]}
              >
                {page.slice(rowIndex * 4, rowIndex * 4 + 4).map((item) => (
                  <Pressable
                    key={item.label}
                    accessibilityRole="button"
                    accessibilityLabel={`Buka ${item.label}`}
                    onPress={() => router.push(item.route)}
                    style={({ pressed }) => [styles.categoryItem, { width: categoryItemWidth, opacity: pressed ? 0.7 : 1 }]}
                  >
                    <HomeMenuIcon icon={item.icon} index={pageIndex * 8 + rowIndex * 4 + page.slice(rowIndex * 4, rowIndex * 4 + 4).indexOf(item)} />
                    <Text numberOfLines={2} style={[styles.categoryLabel, { color: colors.foreground }]}>{item.label}</Text>
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
        accessibilityLabel="Buka cerita ekosistem Kopi Garut"
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
    <View style={styles.voucherCarousel}>
      <Animated.View
        key={`voucher-slide-${activeVoucherSlide}`}
        entering={SlideInRight.duration(500)}
        exiting={SlideOutLeft.duration(500)}
        style={styles.voucherSlide}
      >
        {voucherSlides[activeVoucherSlide].map((voucher) => (
          <Pressable
            key={voucher.code}
            testID={`home-voucher-${voucher.code}`}
            accessibilityRole="button"
            accessibilityLabel={`Pakai voucher ${voucher.code}`}
            onPress={() => router.push('/catalog')}
            style={({ pressed }) => [
              styles.voucherCard,
              {
                borderColor: colors.primaryForeground,
                shadowColor: colors.foreground,
                opacity: pressed ? 0.84 : 1,
              },
            ]}
          >
            <LinearGradient
              colors={voucher.variant === 'primary' ? [colors.primary, colors.accent] : [colors.foreground, colors.primary]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 0.9 }}
              style={StyleSheet.absoluteFill}
            />
            <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.voucherInnerBorder, { borderColor: colors.primaryForeground }]} />
            <View pointerEvents="none" style={[styles.voucherCutout, styles.voucherCutoutLeft, { backgroundColor: colors.background }]} />
            <View pointerEvents="none" style={[styles.voucherCutout, styles.voucherCutoutRight, { backgroundColor: colors.background }]} />
            <View style={styles.voucherCardTop}>
              <View style={styles.voucherEyebrowRow}>
                <BrandIcon name="shopping-bag" size={12} color={colors.primaryForeground} />
                <Text style={[styles.voucherEyebrow, { color: colors.primaryForeground }]}>VOUCHER</Text>
              </View>
              <Text style={[styles.voucherDiscount, { color: colors.card }]}>{voucher.discount}</Text>
              <Text style={[styles.voucherTitle, { color: colors.card }]}>{voucher.title}</Text>
              <Text style={[styles.voucherSubtitle, { color: colors.background }]}>{voucher.note}</Text>
            </View>
            <View style={[styles.voucherDivider, { borderColor: colors.primaryForeground }]} />
            <View style={styles.voucherAction}>
              <Text style={[styles.voucherCodeLabel, { color: colors.background }]}>KODE</Text>
              <Text style={[styles.voucherCode, { color: colors.card }]}>{voucher.code}</Text>
              <View style={[styles.voucherButton, { backgroundColor: colors.card }]}>
                <Text style={[styles.voucherButtonText, { color: colors.foreground }]}>Pakai</Text>
                <BrandIcon name="arrow-up-right" size={12} color={colors.foreground} />
              </View>
            </View>
          </Pressable>
        ))}
      </Animated.View>
      <View style={styles.voucherDots}>
        {voucherSlides.map((_, index) => (
          <Pressable
            key={`voucher-dot-${index}`}
            testID={`home-voucher-dot-${index}`}
            accessibilityRole="button"
            accessibilityLabel={`Tampilkan voucher halaman ${index + 1}`}
            onPress={() => setActiveVoucherSlide(index)}
            style={styles.voucherDotHit}
          >
            <View
              style={[
                styles.voucherDot,
                { backgroundColor: index === activeVoucherSlide ? colors.primary : colors.border },
                index === activeVoucherSlide && styles.voucherDotActive,
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Untuk cangkir pertama</Text></View>
      <Link href="/catalog" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featured}><CoffeeCard coffee={coffees[0]} index={0} grid cardWidth={featuredCardWidth} /><CoffeeCard coffee={coffees[1]} index={1} grid cardWidth={featuredCardWidth} /></ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Lebih dari secangkir</Text>
      </View>
      <Link href="/diversification" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.diversifiedRail}>
      {diversifiedProducts.slice(0, 5).map((product) => (
        <View
          key={product.id}
          style={[
            styles.diversifiedCard,
            { width: diversifiedCardWidth, backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Pressable
            testID={`home-diversified-product-${product.id}`}
            accessibilityRole="button"
            accessibilityLabel={`Lihat ${product.title}`}
            onPress={() => router.push('/diversification')}
            style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1 })}
          >
            <View style={styles.diversifiedImageWrap}>
              <ExpoImage source={product.image} contentFit="cover" style={styles.diversifiedImage} />
              <LinearGradient colors={['transparent', `${colors.foreground}68`]} locations={[0.35, 1]} style={StyleSheet.absoluteFill} />
              <View style={[styles.diversifiedBadge, { backgroundColor: colors.accent }]}>
                <Text numberOfLines={1} style={[styles.diversifiedBadgeText, { color: colors.accentForeground }]}>{product.badge}</Text>
              </View>
              <View style={[styles.diversifiedIcon, { backgroundColor: colors.card }]}>
                <BrandIcon name={product.icon} size={15} color={colors.primary} />
              </View>
            </View>
            <View style={styles.diversifiedBody}>
              <Text style={[styles.diversifiedCategory, { color: colors.primary }]}>{product.category}</Text>
              <Text numberOfLines={2} style={[styles.diversifiedTitle, { color: colors.foreground }]}>{product.title}</Text>
              <View style={styles.diversifiedFooter}>
                <Text style={[styles.diversifiedPrice, { color: colors.foreground }]}>{product.price}</Text>
                <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
              </View>
            </View>
          </Pressable>
          <Pressable
            testID={`home-diversified-add-${product.id}`}
            accessibilityRole="button"
            accessibilityLabel={`Tambah ${product.title} ke keranjang`}
            onPress={() => addToCart(product.id)}
            style={({ pressed }) => [
              styles.diversifiedAddButton,
              { backgroundColor: colors.primary, opacity: pressed ? 0.74 : 1 },
            ]}
          >
            <BrandIcon name="plus" size={13} color={colors.primaryForeground} strokeWidth={2.4} />
            <Text style={[styles.diversifiedAddText, { color: colors.primaryForeground }]}>Tambah</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Tumbuh bersama</Text>
      </View>
      <Link href="/dashboard" style={[styles.seeAll, { color: colors.primary }]}>Lihat data</Link>
    </View>
    <Pressable
      testID="home-growth-stats"
      accessibilityRole="button"
      accessibilityLabel="Buka data pertumbuhan Kopi Garut"
      onPress={() => router.push('/dashboard')}
      style={({ pressed }) => [
        styles.statsGrid,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <LinearGradient
        colors={[colors.foreground, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsRoadPanel}
      >
        <View style={[styles.statsRoadGlow, { backgroundColor: colors.accent }]} />
        <View style={[styles.statsRoadGlowSmall, { backgroundColor: colors.primaryForeground }]} />
        <View style={[styles.statsRoadDecor, { borderColor: colors.primaryForeground }]}>
          <View style={[styles.statsRoadDecorCircle, { backgroundColor: colors.accent }]}>
            <CoffeeCupAnimation />
          </View>
        </View>
        <View style={styles.statsRoadHeader}>
          <Text style={[styles.statsRoadTitle, { color: colors.card }]}>Tumbuh dari kebun, terasa di setiap cangkir.</Text>
        </View>
        <View style={styles.statsRoute}>
          <View style={[styles.statsRouteLine, { backgroundColor: colors.primaryForeground }]} />
          <View style={styles.statsStops}>
            {hubStats.map((stat, index) => (
              <View key={stat.label} style={styles.statsStop}>
                <View style={[styles.statsSign, { backgroundColor: index === 0 ? colors.accent : colors.card, borderColor: colors.primaryForeground }]}>
                  <Text style={[styles.statsSignValue, { color: index === 0 ? colors.foreground : colors.primary }]}>{stat.value}</Text>
                </View>
                <View style={[styles.statsSignPole, { backgroundColor: colors.primaryForeground }]} />
                <Text style={[styles.statsStopLabel, { color: colors.background }]}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.statsRoadFooter}>
          <Text style={[styles.statsRoadFooterText, { color: colors.primaryForeground }]}>DARI KEBUN <Text style={{ color: colors.accent }}>→</Text> KE CANGKIR</Text>
          <BrandIcon name="arrow-up-right" size={14} color={colors.primaryForeground} />
        </View>
      </LinearGradient>
    </Pressable>
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.farmerRail}
    >
      {farmers.slice(0, 4).map((farmer, index) => (
        <Pressable
          key={farmer.id}
          testID={index === 0 ? 'home-farmer-story' : `home-farmer-story-${farmer.id}`}
          accessibilityRole="button"
          accessibilityLabel={`Buka cerita ${farmer.name}`}
          onPress={() => router.push(`/farmer/${farmer.id}`)}
          style={({ pressed }) => [
            styles.farmerFeature,
            { width: farmerCardWidth, backgroundColor: colors.foreground, borderColor: colors.border, opacity: pressed ? 0.86 : 1 },
          ]}
        >
          <View style={[styles.farmerCardAccent, { backgroundColor: index === 0 ? colors.accent : colors.primary }]} />
          <View style={styles.farmerPortraitWrap}>
            <ExpoImage source={farmer.image} contentFit="cover" style={styles.farmerImage} />
            <LinearGradient colors={['transparent', colors.foreground]} locations={[0.35, 1]} style={StyleSheet.absoluteFill} />
            <View style={[styles.farmerPortraitBadge, { backgroundColor: colors.card, borderColor: colors.accent }]}>
              <ExpoImage
                source={require('../../assets/images/coffee-bean-menu.png')}
                contentFit="contain"
                style={styles.farmerBadgeImage}
              />
            </View>
          </View>
          <View style={styles.farmerFeatureCopy}>
            <View style={styles.farmerCardTop}>
              <View style={styles.farmerCardLabelWrap}>
                <View style={[styles.farmerCardDot, { backgroundColor: index === 0 ? colors.accent : colors.primary }]} />
                <Text style={[styles.farmerCardLabel, { color: colors.primaryForeground }]}>Petani pilihan</Text>
              </View>
              <Text style={[styles.farmerCardCode, { color: colors.mutedForeground }]}>{farmer.membershipId}</Text>
            </View>
            <Text numberOfLines={1} style={[styles.farmerName, { color: colors.card }]}>{farmer.name}</Text>
            <View style={styles.farmerMetaRow}>
              <View style={styles.farmerMetaItem}>
                <BrandIcon name="map-pin" size={12} color={colors.accent} />
                <Text numberOfLines={1} style={[styles.farmerMeta, { color: colors.background }]}>{farmer.location}</Text>
              </View>
              <View style={[styles.farmerArrow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <BrandIcon name="arrow-up-right" size={13} color={colors.primary} strokeWidth={2.2} />
              </View>
            </View>
             <View style={styles.farmerQuickMeta}>
               <Text numberOfLines={1} style={[styles.farmerQuickMetaText, { color: colors.background }]}>{farmer.coffeeType}</Text>
               <Text numberOfLines={1} style={[styles.farmerQuickMetaText, { color: colors.accent }]}>{farmer.landArea}</Text>
             </View>
             <Text numberOfLines={2} style={[styles.farmerStory, { color: colors.background }]}>{farmer.story}</Text>
            <View style={[styles.farmerCardRule, { backgroundColor: colors.border }]} />
             <View style={[styles.farmerVerification, { backgroundColor: colors.card, borderColor: colors.border }]}>
               <View style={[styles.farmerVerificationMark, { backgroundColor: colors.accent }]}>
                 <BrandIcon name="check" size={10} color={colors.foreground} strokeWidth={2.4} />
               </View>
               <Text style={[styles.farmerVerificationLabel, { color: colors.accentForeground }]}>Diverifikasi</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Penyuluh di lapangan</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Buka ruang kerja penyuluh"
        onPress={() => router.push('/extension-dashboard')}
        style={({ pressed }) => ({ opacity: pressed ? 0.68 : 1 })}
      >
        <Text style={[styles.seeAll, { color: colors.primary }]}>Ruang kerja</Text>
      </Pressable>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.extensionRail}
    >
      {extensionTeam.map((worker, index) => (
        <Pressable
          key={worker.id}
          testID={`home-extension-worker-${worker.id}`}
          accessibilityRole="button"
          accessibilityLabel={`Lihat ${worker.name}, penyuluh wilayah ${worker.regions.join(' dan ')}`}
          onPress={() => router.push('/extension-dashboard')}
          style={({ pressed }) => [
            styles.extensionCard,
            { width: extensionCardWidth, backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.84 : 1 },
          ]}
        >
          <View style={styles.extensionImageWrap}>
            <ExpoImage source={worker.image} contentFit="cover" style={styles.extensionImage} />
            <LinearGradient colors={['transparent', `${colors.foreground}E8`]} locations={[0.25, 1]} style={StyleSheet.absoluteFill} />
            <View style={[styles.extensionStatus, { backgroundColor: colors.accent }]}>
              <View style={[styles.extensionStatusDot, { backgroundColor: colors.foreground }]} />
              <Text style={[styles.extensionStatusText, { color: colors.foreground }]}>AKTIF</Text>
            </View>
            <Text style={[styles.extensionImageRole, { color: colors.card }]}>{worker.role}</Text>
          </View>
          <View style={styles.extensionCopy}>
            <Text numberOfLines={1} style={[styles.extensionName, { color: colors.foreground }]}>{worker.name}</Text>
            <View style={styles.extensionRegionRow}>
              <BrandIcon name="map-pin" size={12} color={colors.primary} />
              <Text numberOfLines={1} style={[styles.extensionRegion, { color: colors.primary }]}>Wilayah: {worker.regions.join(' · ')}</Text>
            </View>
            <Text numberOfLines={2} style={[styles.extensionFocus, { color: colors.mutedForeground }]}>{worker.focus}</Text>
            <View style={[styles.extensionCardFooter, { borderTopColor: colors.border }]}>
              <Text style={[styles.extensionFooterLabel, { color: colors.mutedForeground }]}>PENDAMPINGAN KEBUN</Text>
              <View style={[styles.extensionArrow, { backgroundColor: colors.secondary }]}>
                <BrandIcon name="arrow-up-right" size={13} color={colors.primary} />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Baca peta rasa Garut</Text></View>
      <Link href="/regions" style={[styles.seeAll, { color: colors.primary }]}>Lihat semua</Link>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={regionCardWidth + 10}
      decelerationRate="fast"
      contentContainerStyle={styles.regionRail}
    >
      {regions.slice(0, 3).map((region, index) => (
        <Pressable
          key={region.id}
          accessibilityRole="button"
          accessibilityLabel={`Buka wilayah ${region.name}`}
          onPress={() => router.push(`/region/${region.id}`)}
          style={({ pressed }) => [
            styles.regionCard,
            { width: regionCardWidth, backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 },
          ]}
        >
          <View style={styles.regionImageWrap}>
            <ExpoImage source={region.image} contentFit="cover" style={styles.regionImage} />
            <LinearGradient colors={['transparent', colors.foreground]} locations={[0.2, 1]} style={StyleSheet.absoluteFill} />
            <View style={styles.regionCardTop}>
              <View style={[styles.regionNumber, { backgroundColor: index === 0 ? colors.primary : colors.secondary }]}>
                <Text style={[styles.regionNumberText, { color: index === 0 ? colors.primaryForeground : colors.primary }]}>0{index + 1}</Text>
              </View>
              <View style={[styles.regionArrow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <BrandIcon name="arrow-up-right" size={14} color={colors.primary} strokeWidth={2.2} />
              </View>
            </View>
          </View>
          <View style={styles.regionCardBody}>
            <Text numberOfLines={1} style={[styles.regionName, { color: colors.foreground }]}>{region.name}</Text>
            <View style={styles.regionDetailRow}>
              <BrandIcon name="map-pin" size={12} color={colors.primary} />
              <Text style={[styles.regionDetail, { color: colors.mutedForeground }]}>{region.village}</Text>
              <View style={[styles.regionDetailDivider, { backgroundColor: colors.border }]} />
              <Text style={[styles.regionDetail, { color: colors.mutedForeground }]}>{region.elevation}</Text>
            </View>
            <View style={[styles.regionSpecialtyChip, { backgroundColor: colors.secondary }]}>
              <BrandIcon name="coffee" size={12} color={colors.primary} />
              <Text numberOfLines={1} style={[styles.regionSpecialty, { color: colors.primary }]}>{region.specialty}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Selalu ada cerita baru</Text></View>
      <Link href="/events" style={[styles.seeAll, { color: colors.primary }]}>Lihat agenda</Link>
    </View>
    <ScrollView
      ref={storyRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={storyCardWidth + 8}
      decelerationRate="fast"
      onMomentumScrollEnd={(event) => {
        const nextIndex = Math.round(event.nativeEvent.contentOffset.x / (storyCardWidth + 8));
        setActiveStoryIndex(Math.min(nextIndex, Math.max(0, storyReels.length - 2)));
      }}
      contentContainerStyle={styles.storyRail}
    >
      {storyReels.map((story, index) => (
        <Pressable
          key={story.id}
          testID={`home-story-reel-${story.id}`}
          accessibilityRole="button"
          accessibilityLabel={`Buka cerita ${story.title}`}
          onPress={() => router.push('/events')}
          style={({ pressed }) => [
            styles.storyReelCard,
            {
              width: storyCardWidth,
              height: storyCardHeight,
              borderColor: colors.border,
              opacity: pressed ? 0.86 : 1,
            },
          ]}
        >
          <ExpoImage source={story.image} contentFit="cover" style={StyleSheet.absoluteFill} />
          <LinearGradient colors={['transparent', colors.foreground]} locations={[0.18, 1]} style={StyleSheet.absoluteFill} />
          <View style={styles.storyReelTop}>
            <View style={[styles.storyReelTag, { backgroundColor: colors.card }]}>
              <BrandIcon name="calendar" size={11} color={colors.primary} />
              <Text style={[styles.storyReelTagText, { color: colors.foreground }]}>CERITA BARU</Text>
            </View>
            <View style={[styles.storyReelCount, { backgroundColor: colors.foreground }]}>
              <Text style={[styles.storyReelCountText, { color: colors.accent }]}>0{index + 1}</Text>
            </View>
          </View>
          <View style={styles.storyReelCopy}>
            <View style={styles.storyReelMeta}>
              <Text numberOfLines={1} style={[styles.storyReelDate, { color: colors.accent }]}>{story.date}</Text>
              <View style={[styles.storyReelMetaDot, { backgroundColor: colors.accent }]} />
              <Text numberOfLines={1} style={[styles.storyReelLocation, { color: colors.background }]}>{story.location}</Text>
            </View>
            <Text numberOfLines={3} style={[styles.storyReelTitle, { color: colors.card }]}>{story.title}</Text>
            <View style={styles.storyReelFooter}>
              <Text style={[styles.storyReelCta, { color: colors.primaryForeground }]}>{story.type}</Text>
              <View style={[styles.storyReelArrow, { backgroundColor: colors.card }]}>
                <BrandIcon name="arrow-up-right" size={14} color={colors.primary} strokeWidth={2.2} />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.sectionHeading}>
      <View style={styles.headingCopy}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Datang ke kebunnya</Text></View>
      <Link href="/tourism" style={[styles.seeAll, { color: colors.primary }]}>Lihat wisata</Link>
    </View>
    <View style={styles.tourGrid}>
      {coffeeTours.slice(0, 2).map((tour) => (
        <Pressable key={tour.id} onPress={() => router.push('/tourism')} style={({ pressed }) => [styles.tourCard, { opacity: pressed ? 0.8 : 1 }]}>
          <View style={styles.tourImageWrap}>
            <ExpoImage source={tour.image} contentFit="cover" style={[StyleSheet.absoluteFill, styles.tourImage]} />
            <LinearGradient colors={['transparent', colors.foreground]} locations={[0.15, 1]} style={StyleSheet.absoluteFill} />
            <View style={styles.tourCopy}><Text style={[styles.tourType, { color: colors.primaryForeground }]}>{tour.type}</Text><Text numberOfLines={2} style={[styles.tourTitle, { color: colors.card }]}>{tour.title}</Text><Text numberOfLines={1} style={[styles.tourMeta, { color: colors.background }]}>{tour.duration} · {tour.location}</Text></View>
          </View>
        </Pressable>
      ))}
    </View>
    <View style={[styles.homeFooter, { borderTopColor: colors.border }]}>
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
  searchEntry: { height: 52, borderRadius: 17, borderWidth: 1, paddingLeft: 15, paddingRight: 7, flexDirection: 'row', alignItems: 'center', gap: 10, position: 'relative', zIndex: 5 },
  searchBeanAnimation: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  searchBeanImage: { width: 32, height: 32 },
  searchPlaceholder: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  searchFilter: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  heroSection: { marginTop: 0 },
  promoScene: { position: 'absolute', left: 0, right: 0, top: 0 },
  promoGallery: { position: 'relative', overflow: 'hidden' },
  promoActive: { position: 'absolute', left: 0, top: 0, width: '100%', borderRadius: 22, overflow: 'hidden', zIndex: 3, shadowOpacity: 0.22, shadowRadius: 12, shadowOffset: { width: 0, height: 7 }, elevation: 7 },
  promoImage: { ...StyleSheet.absoluteFill },
  promoPreloadImage: { opacity: 0 },
  promoShade: { ...StyleSheet.absoluteFill },
  promoCopy: { ...StyleSheet.absoluteFill, justifyContent: 'flex-end', alignItems: 'flex-start', padding: 18, paddingBottom: 28, gap: 4 },
  promoEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.35 },
  promoTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 25, fontWeight: '800', letterSpacing: -0.35, maxWidth: 265 },
  promoDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, opacity: 0.9, maxWidth: 250 },
  promoCta: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '800', marginTop: 3 },
  promoDots: { position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1 },
  promoDotHit: { height: 20, minWidth: 10, alignItems: 'center', justifyContent: 'center' },
  promoDot: { height: 5, borderRadius: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 18, gap: 14 },
  headingCopy: { flexShrink: 1 },
  headingRule: { width: 42, height: 1, marginBottom: 7 },
  categoryHint: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, paddingBottom: 4, textAlign: 'right', maxWidth: 92 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', marginTop: 0, letterSpacing: -0.3 },
  seeAll: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', paddingBottom: 3 },
  diversifiedRail: { gap: 10, paddingTop: 12, paddingRight: 20 },
  diversifiedCard: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  diversifiedImageWrap: { aspectRatio: 1, position: 'relative' },
  diversifiedImage: { width: '100%', height: '100%' },
  diversifiedBadge: { position: 'absolute', left: 9, top: 9, maxWidth: '78%', borderRadius: 7, paddingHorizontal: 7, paddingVertical: 5 },
  diversifiedBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.15 },
  diversifiedIcon: { position: 'absolute', right: 9, top: 9, width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  diversifiedBody: { padding: 11, gap: 5 },
  diversifiedCategory: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.65, textTransform: 'uppercase' },
  diversifiedTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17, minHeight: 34 },
  diversifiedFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 2 },
  diversifiedPrice: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  diversifiedAddButton: { marginHorizontal: 12, marginBottom: 12, height: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 8 },
  diversifiedAddText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  categoryPager: { marginHorizontal: -20 },
  categoryPage: { paddingHorizontal: 20, gap: 12 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryRowCompact: { justifyContent: 'flex-start', columnGap: 14 },
  categoryItem: { alignItems: 'center', gap: 8 },
  menuIconStage: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  menuIconSurface: {
    width: 50,
    height: 50,
    borderRadius: 16,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
     shadowOpacity: 0.16,
     shadowRadius: 3,
     shadowOffset: { width: 0, height: 2 },
     elevation: 2,
  },
  menuCoffeeOrnament: { position: 'absolute', zIndex: 1 },
  menuIconVisualOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', zIndex: 2, elevation: 2 },
  menuGlyphExtrusion: { position: 'absolute', transform: [{ translateX: -0.5 }, { translateY: 2 }], opacity: 0.68 },
  menuGlyphFront: { position: 'absolute' },
  categoryLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, lineHeight: 14, fontWeight: '600', textAlign: 'center' },
  categoryPagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0, marginTop: 12, transform: [{ translateY: -8 }] },
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
  roadTraffic: { width: 96, height: 62, alignItems: 'center', justifyContent: 'center', gap: 5, overflow: 'hidden' },
  roadHorizon: { width: 54, height: 4, borderRadius: 2, opacity: 0.8 },
  roadTrack: { width: 96, height: 43, borderRadius: 14, overflow: 'hidden', justifyContent: 'center', transform: [{ rotate: '-7deg' }] },
  roadLaneMark: { position: 'absolute', left: 9, right: 9, top: 21, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: 0.75 },
  roadLaneDash: { width: 16, height: 2, borderRadius: 2 },
  trafficVehicle: { position: 'absolute', borderRadius: 4, justifyContent: 'center', paddingHorizontal: 3 },
  trafficCar: { width: 25, height: 11, top: 7 },
  trafficVan: { width: 30, height: 12, bottom: 6 },
  trafficWindow: { width: 8, height: 4, borderRadius: 2, opacity: 0.8 },
  roadShoulder: { width: 36, height: 3, borderRadius: 2, opacity: 0.7 },
  statsRoadPanel: { minHeight: 240, padding: 16, gap: 4, position: 'relative', overflow: 'hidden' },
  statsRoadGlow: { position: 'absolute', width: 142, height: 142, borderRadius: 71, top: -72, right: -40, opacity: 0.1 },
  statsRoadGlowSmall: { position: 'absolute', width: 68, height: 68, borderRadius: 34, bottom: -32, left: -22, opacity: 0.08 },
  statsRoadDecor: { position: 'absolute', top: 11, right: 12, width: 72, height: 72, borderRadius: 36, borderWidth: 1, alignItems: 'center', justifyContent: 'center', opacity: 0.92 },
  statsRoadDecorCircle: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  statsRoadHeader: { gap: 5 },
  statsRoadTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 21, fontWeight: '700', maxWidth: 238 },
  statsRoute: { position: 'relative', marginTop: 22, paddingTop: 28 },
  statsRouteLine: { position: 'absolute', left: 24, right: 24, top: 49, height: 2, opacity: 0.55 },
  statsStops: { flexDirection: 'row', alignItems: 'flex-start' },
  statsStop: { flex: 1, alignItems: 'center', gap: 3 },
  statsSign: { minWidth: 57, height: 42, borderRadius: 11, borderWidth: 1, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  statsSignValue: { fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 14, fontWeight: '800', textAlign: 'center' },
  statsSignPole: { width: 2, height: 7, opacity: 0.75 },
  statsStopLabel: { fontFamily: 'Manrope_400Regular', fontSize: 8, lineHeight: 11, textAlign: 'center', maxWidth: 76 },
  statsRoadFooter: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statsRoadFooterText: { fontFamily: 'Manrope_700Bold', fontSize: 7.5, fontWeight: '800', letterSpacing: 1.25 },
  voucherCarousel: { height: 124, gap: 8 },
  voucherSlide: { height: 104, flexDirection: 'row', gap: 8 },
  voucherCard: { flex: 1, height: 104, borderRadius: 17, borderWidth: 1, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, position: 'relative', shadowOpacity: 0.16, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  voucherInnerBorder: { margin: 4, borderWidth: 1, borderRadius: 13, opacity: 0.28 },
  voucherCutout: { position: 'absolute', top: '50%', width: 19, height: 19, borderRadius: 10, marginTop: -10 },
  voucherCutoutLeft: { left: -10 },
  voucherCutoutRight: { right: -10 },
  voucherCardTop: { flex: 1, gap: 1, paddingRight: 3 },
  voucherEyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 1 },
  voucherEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 1.35 },
  voucherDiscount: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 25, fontWeight: '800', letterSpacing: -0.7, marginTop: 2 },
  voucherTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 14, fontWeight: '800' },
  voucherSubtitle: { fontFamily: 'Manrope_400Regular', fontSize: 8, lineHeight: 11, marginTop: 2 },
  voucherDivider: { height: 66, borderLeftWidth: 1, borderTopWidth: 0, borderStyle: 'dashed', opacity: 0.68, marginHorizontal: 6, marginVertical: 0 },
  voucherAction: { width: 63, alignItems: 'flex-start', gap: 2 },
  voucherCodeLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 1.5 },
  voucherCode: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800', letterSpacing: 0.35 },
  voucherButton: { height: 25, borderRadius: 8, paddingHorizontal: 8, marginTop: 5, flexDirection: 'row', alignItems: 'center', gap: 3 },
  voucherButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 8.5, fontWeight: '800' },
  voucherDots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 12 },
  voucherDotHit: { width: 20, height: 18, alignItems: 'center', justifyContent: 'center' },
  voucherDot: { width: 5, height: 5, borderRadius: 3 },
  voucherDotActive: { width: 16 },
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
  farmerRail: { flexDirection: 'row', gap: 8, paddingRight: 20 },
  farmerFeature: { height: 286, borderRadius: 20, borderWidth: 1, overflow: 'hidden', flexDirection: 'column', alignItems: 'stretch' },
  farmerCardAccent: { position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 4 },
  farmerPortraitWrap: { width: '100%', height: 112, margin: 0, borderRadius: 0, overflow: 'hidden', position: 'relative' },
  farmerImage: { width: '100%', height: '100%' },
  farmerPortraitBadge: { position: 'absolute', left: 9, bottom: 9, width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 5 },
  farmerBadgeImage: { width: '100%', height: '100%' },
  farmerFeatureCopy: { flex: 1, minWidth: 0, padding: 11, gap: 4, justifyContent: 'space-between' },
  farmerCardTop: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  farmerCardLabelWrap: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 5 },
  farmerCardDot: { width: 6, height: 6, borderRadius: 3 },
  farmerCardLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, lineHeight: 10, fontWeight: '700', letterSpacing: 0.3 },
  farmerCardCode: { flexShrink: 0, fontFamily: 'Manrope_700Bold', fontSize: 7, lineHeight: 10, fontWeight: '800', letterSpacing: 0.4 },
  farmerName: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 18, fontWeight: '800', letterSpacing: -0.3 },
  farmerCardRule: { width: '100%', height: 1, opacity: 0.65 },
  farmerMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  farmerMetaItem: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 5 },
  farmerMeta: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 0.2 },
  farmerArrow: { width: 25, height: 25, borderRadius: 12.5, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  farmerQuickMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  farmerQuickMetaText: { flex: 1, fontFamily: 'Manrope_600SemiBold', fontSize: 8, lineHeight: 11 },
  farmerStory: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13, marginTop: 1 },
  farmerVerification: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 8, borderWidth: 1, paddingHorizontal: 6, paddingVertical: 4, alignSelf: 'flex-start' },
  farmerVerificationMark: { width: 17, height: 17, borderRadius: 8.5, alignItems: 'center', justifyContent: 'center' },
  farmerVerificationLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.55 },
  sectionSubtitle: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, marginTop: 2 },
  extensionRail: { flexDirection: 'row', gap: 8, paddingRight: 20 },
  extensionCard: { minHeight: 252, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  extensionImageWrap: { height: 142, position: 'relative', justifyContent: 'flex-end' },
  extensionImage: { width: '100%', height: '100%' },
  extensionStatus: { position: 'absolute', top: 10, left: 10, borderRadius: 9, paddingHorizontal: 7, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 4 },
  extensionStatusDot: { width: 5, height: 5, borderRadius: 3 },
  extensionStatusText: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 0.8 },
  extensionImageRole: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 0.2, marginHorizontal: 11, marginBottom: 10 },
  extensionCopy: { minHeight: 109, padding: 11, gap: 5, justifyContent: 'space-between' },
  extensionName: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 18, letterSpacing: -0.2 },
  extensionRegionRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  extensionRegion: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 9, lineHeight: 13 },
  extensionFocus: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 13, minHeight: 26 },
  extensionCardFooter: { borderTopWidth: 1, paddingTop: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  extensionFooterLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 0.8 },
  extensionArrow: { width: 25, height: 25, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  regionRail: { gap: 10, paddingRight: 20 },
  regionCard: { height: 226, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  regionImageWrap: { width: '100%', height: 116, position: 'relative' },
  regionImage: { width: '100%', height: '100%' },
  regionCardTop: { position: 'absolute', top: 10, left: 10, right: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  regionNumber: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  regionNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  regionArrow: { width: 30, height: 30, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  regionCardBody: { flex: 1, padding: 11, gap: 7, justifyContent: 'space-between' },
  regionName: { fontFamily: 'Manrope_700Bold', fontSize: 17, lineHeight: 20, fontWeight: '700' },
  regionDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  regionDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  regionDetailDivider: { width: 3, height: 3, borderRadius: 2, marginHorizontal: 1 },
  regionSpecialtyChip: { alignSelf: 'flex-start', maxWidth: '100%', flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 6 },
  regionSpecialty: { flexShrink: 1, fontFamily: 'Manrope_700Bold', fontSize: 9, lineHeight: 12, fontWeight: '700' },
  storyRail: { gap: 8, paddingRight: 20 },
  storyReelCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', position: 'relative' },
  storyReelTop: { position: 'absolute', top: 11, left: 11, right: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  storyReelTag: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 9, paddingHorizontal: 7, paddingVertical: 5 },
  storyReelTagText: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 0.8, textTransform: 'uppercase' },
  storyReelCount: { width: 27, height: 27, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  storyReelCountText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800' },
  storyReelCopy: { position: 'absolute', left: 12, right: 12, bottom: 12, gap: 6 },
  storyReelMeta: { height: 12, flexDirection: 'row', alignItems: 'center', gap: 5 },
  storyReelDate: { flexShrink: 1, fontFamily: 'Manrope_700Bold', fontSize: 8, lineHeight: 10, fontWeight: '800' },
  storyReelMetaDot: { width: 3, height: 3, borderRadius: 2 },
  storyReelLocation: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 8, lineHeight: 10 },
  storyReelTitle: { height: 57, fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 19, fontWeight: '700' },
  storyReelFooter: { height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  storyReelCta: { flexShrink: 1, fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 0.8, fontWeight: '800', textTransform: 'uppercase' },
  storyReelArrow: { width: 27, height: 27, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  tourGrid: { flexDirection: 'row', gap: 10 },
  tourCard: { flex: 1, height: 190, borderRadius: 20, overflow: 'hidden' },
  tourImageWrap: { flex: 1, justifyContent: 'flex-end' },
  tourImage: { borderRadius: 20 },
  tourCopy: { padding: 13, gap: 3 },
  tourType: { fontFamily: 'Manrope_700Bold', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' },
  tourTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 20, fontWeight: '700' },
  tourMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  homeFooter: { width: '100%', alignItems: 'center', gap: 1, marginTop: 14, paddingTop: 18, paddingBottom: 24, borderTopWidth: 1 },
  footerMountain: { width: '94%', height: 62, opacity: 0.42 },
  footerCaption: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.15, textAlign: 'center' },
  storyLeadWrap: { position: 'relative', marginTop: 2, zIndex: 1, overflow: 'visible' },
});