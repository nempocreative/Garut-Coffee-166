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
import { coffeePrices, coffeeTours, farmers, hubEvents, hubStats, regions } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const promoSlides = [
  {
    id: 'coffee-hub',
    route: '/catalog' as const,
    image: require('../../assets/images/hero-coffee.jpg'),
  },
  {
    id: 'traceability',
    route: '/farmers' as const,
    image: require('../../assets/images/origin-coffee.jpg'),
  },
  {
    id: 'coffee-tour',
    route: '/tourism' as const,
    image: require('../../assets/images/hero-coffee.jpg'),
  },
  {
    id: 'coffee-regions',
    route: '/regions' as const,
    image: require('../../assets/images/origin-coffee.jpg'),
  },
  {
    id: 'coffee-collective',
    route: '/collective' as const,
    image: require('../../assets/images/hero-coffee.jpg'),
  },
  {
    id: 'coffee-partnership',
    route: '/partnership' as const,
    image: require('../../assets/images/origin-coffee.jpg'),
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

const voucherSlides = [
  [
    { discount: '15%', title: 'Kopi pilihan', code: 'GARUT15', note: 'Min. belanja 150K', variant: 'primary' },
    { discount: '20%', title: 'Panen baru', code: 'PANEN20', note: 'Untuk koleksi natural', variant: 'dark' },
  ],
  [
    { discount: '25K', title: 'Ongkir hemat', code: 'KIRIM25', note: 'Min. belanja 200K', variant: 'dark' },
    { discount: '10%', title: 'Teman ngopi', code: 'NGOPI10', note: 'Ajak satu teman', variant: 'primary' },
  ],
  [
    { discount: '30K', title: 'Kopi pertama', code: 'PERTAMA30', note: 'Khusus pengguna baru', variant: 'primary' },
    { discount: '15%', title: 'Petani pilihan', code: 'PETANI15', note: 'Dukung kebun Garut', variant: 'dark' },
  ],
  [
    { discount: '10%', title: 'Langganan rasa', code: 'RUTIN10', note: 'Untuk pesanan berulang', variant: 'dark' },
    { discount: '20%', title: 'Akhir pekan', code: 'WEEKEND20', note: 'Berlaku Sabtu–Minggu', variant: 'primary' },
  ],
] as const;

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
  const { width } = useWindowDimensions();
  const featuredCardWidth = Math.max(120, Math.floor((width - 40 - 12) / 2));
  const categoryPageWidth = Math.max(300, width);
  const categoryItemWidth = Math.max(58, Math.floor((categoryPageWidth - 40 - 24) / 4));
  const promoHeight = Math.round(Math.min(176, Math.max(145, (width - 40) * 0.86 * 9 / 16)));
  const categoryRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVoucherSlide, setActiveVoucherSlide] = useState(0);
  const [activeCategoryPage, setActiveCategoryPage] = useState(0);

  const currentSlide = promoSlides[activeSlide];

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
        key={`promo-scene-${activeSlide}`}
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
            <ExpoImage source={currentSlide.image} contentFit="cover" style={styles.promoImage} />
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
                    <HomeMenuIcon icon={item.icon} index={pageIndex * 8 + rowIndex * 4 + page.slice(rowIndex * 4, rowIndex * 4 + 4).indexOf(item)} />
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
    <View style={styles.voucherCarousel}>
      <Animated.View
        key={`voucher-slide-${activeVoucherSlide}`}
        entering={FadeInDown.duration(500)}
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
              { opacity: pressed ? 0.84 : 1 },
            ]}
          >
            <LinearGradient
              colors={voucher.variant === 'primary' ? [colors.primary, colors.accent] : [colors.foreground, colors.primary]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 0.9 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.voucherCutout, styles.voucherCutoutTop, { backgroundColor: colors.background }]} />
            <View style={[styles.voucherCutout, styles.voucherCutoutBottom, { backgroundColor: colors.background }]} />
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
  searchBeanAnimation: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  searchBeanImage: { width: 32, height: 32 },
  searchPlaceholder: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  searchFilter: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  heroSection: { marginTop: 0 },
  promoScene: { position: 'absolute', left: 0, right: 0, top: 0 },
  promoGallery: { position: 'relative', overflow: 'hidden' },
  promoActive: { position: 'absolute', left: 0, top: 0, width: '100%', borderRadius: 22, overflow: 'hidden', zIndex: 3, shadowOpacity: 0.22, shadowRadius: 12, shadowOffset: { width: 0, height: 7 }, elevation: 7 },
  promoImage: { ...StyleSheet.absoluteFill },
  promoDots: { position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1 },
  promoDotHit: { height: 20, minWidth: 10, alignItems: 'center', justifyContent: 'center' },
  promoDot: { height: 5, borderRadius: 3 },
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
  categoryLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 11, fontWeight: '600' },
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
  voucherCarousel: { gap: 8 },
  voucherSlide: { flexDirection: 'row', gap: 8 },
  voucherCard: { flex: 1, minHeight: 104, borderRadius: 17, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, position: 'relative' },
  voucherCutout: { position: 'absolute', width: 19, height: 19, borderRadius: 10, left: -10 },
  voucherCutoutTop: { top: -1 },
  voucherCutoutBottom: { bottom: -1 },
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
  storyLeadWrap: { position: 'relative', marginTop: 2, zIndex: 1, overflow: 'visible' },
});