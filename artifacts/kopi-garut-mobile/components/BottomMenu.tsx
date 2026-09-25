import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { ThreeDNavIcon, ThreeDNavIconName } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

type BottomMenuItem = {
  label: string;
  icon: ThreeDNavIconName;
  route: '/' | '/catalog' | '/traceability' | '/orders' | '/profile';
  matches: (pathname: string) => boolean;
};

const menuItems: BottomMenuItem[] = [
  { label: 'Beranda', icon: 'home', route: '/', matches: (pathname) => pathname === '/' || pathname === '/index' || pathname.startsWith('/(tabs)') && pathname.endsWith('/index') },
  { label: 'Produk', icon: 'product', route: '/catalog', matches: (pathname) => pathname === '/catalog' || pathname.startsWith('/product') || pathname === '/favorites' },
  { label: 'Jejak', icon: 'scan', route: '/traceability', matches: (pathname) => pathname === '/traceability' },
  { label: 'Pesanan', icon: 'orders', route: '/orders', matches: (pathname) => pathname === '/orders' || pathname === '/cart' },
  { label: 'Akun', icon: 'account', route: '/profile', matches: (pathname) => pathname === '/profile' || pathname === '/login' || pathname === '/notifications' },
];

function MenuIconGraphic({ item, focused, desktop = false }: { item: BottomMenuItem; focused: boolean; desktop?: boolean }) {
  const colors = useColors();

  if (item.icon === 'home') {
    return (
      <View style={[styles.icon, desktop && styles.webDesktopNavIcon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/home-coffee-house.png')}
          contentFit="contain"
          style={[styles.homeImage, { width: desktop ? (focused ? 31 : 28) : (focused ? 36 : 33), height: desktop ? (focused ? 31 : 28) : (focused ? 36 : 33) }]}
        />
      </View>
    );
  }

  if (item.icon === 'product') {
    return (
      <View style={[styles.icon, desktop && styles.webDesktopNavIcon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/product-coffee-basket.png')}
          contentFit="contain"
          style={[styles.productImage, { width: desktop ? (focused ? 31 : 28) : (focused ? 36 : 33), height: desktop ? (focused ? 31 : 28) : (focused ? 36 : 33) }]}
        />
      </View>
    );
  }

  if (item.icon === 'orders') {
    return (
      <View style={[styles.icon, desktop && styles.webDesktopNavIcon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/orders-coffee-checklist.png')}
          contentFit="contain"
          style={[styles.ordersImage, { width: desktop ? (focused ? 34 : 31) : (focused ? 40 : 37), height: desktop ? (focused ? 34 : 31) : (focused ? 40 : 37) }]}
        />
      </View>
    );
  }

  if (item.icon === 'account') {
    return (
      <View style={[styles.icon, desktop && styles.webDesktopNavIcon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/account-coffee-settings.png')}
          contentFit="contain"
          style={[styles.accountImage, { width: desktop ? (focused ? 34 : 31) : (focused ? 40 : 37), height: desktop ? (focused ? 34 : 31) : (focused ? 40 : 37) }]}
        />
      </View>
    );
  }

  if (item.icon !== 'scan') {
    return (
      <View style={[styles.icon, focused && { backgroundColor: colors.secondary }]}>
        <ThreeDNavIcon
          name={item.icon}
          size={focused ? 31 : 29}
          mainColor={focused ? colors.primary : colors.mutedForeground}
          lightColor={focused ? colors.accent : colors.secondary}
          shadowColor={focused ? colors.foreground : colors.border}
          accentColor={focused ? colors.primaryForeground : colors.card}
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.accent, colors.primary]}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={[styles.centerCircle, desktop && styles.desktopCenterCircle, { borderColor: colors.card, shadowColor: colors.foreground }]}
    >
      <View style={[styles.centerHighlight, { backgroundColor: colors.primaryForeground }]} />
      <Image
        source={require('../assets/images/traceability-coffee-qr.png')}
        contentFit="contain"
        style={[styles.traceImage, desktop && styles.desktopTraceImage]}
      />
    </LinearGradient>
  );
}

function MenuIcon({ item, focused, desktop = false, index }: { item: BottomMenuItem; focused: boolean; desktop?: boolean; index: number }) {
  const { width } = useWindowDimensions();
  const motion = useSharedValue(0);
  const animateForMobile = Platform.OS !== 'web' || width < 768;

  useEffect(() => {
    if (!animateForMobile) {
      cancelAnimation(motion);
      motion.value = 0;
      return;
    }

    motion.value = withDelay(
      index * 120,
      withRepeat(
        withTiming(1, { duration: 1900, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );

    return () => cancelAnimation(motion);
  }, [animateForMobile, index, motion]);

  const motionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(motion.value, [0, 0.5, 1], [0, -2, 0]) },
      { rotate: `${interpolate(motion.value, [0, 0.5, 1], [-1.5, 1.5, -1.5])}deg` },
      { scale: interpolate(motion.value, [0, 0.5, 1], [1, 1.035, 1]) },
    ],
  }));

  return (
    <Animated.View style={[styles.menuIconMotion, motionStyle]}>
      <MenuIconGraphic item={item} focused={focused} desktop={desktop} />
    </Animated.View>
  );
}

export function BottomMenu() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  const isWeb = Platform.OS === 'web';
  const isDesktopWeb = isWeb && width >= 1024;
  const isTabletWeb = isWeb && width >= 640 && width < 1024;
  const bottomInset = Platform.OS === 'web' ? 0 : insets.bottom;
  const isFarmerRoute = pathname === '/extension-farmers' || pathname.startsWith('/farmer/');
  const menuHeight = isWeb
    ? (isDesktopWeb ? 68 : isTabletWeb ? 86 : 'calc(90px + env(safe-area-inset-bottom, 0px))' as any)
    : 90 + bottomInset;
  const menuPaddingBottom = isWeb
    ? (isDesktopWeb ? 4 : isTabletWeb ? 8 : 'calc(4px + env(safe-area-inset-bottom, 0px))' as any)
    : bottomInset + 4;

  if (isFarmerRoute) return null;

  return (
    <View
      pointerEvents="box-none"
      style={[
        Platform.OS === 'web' ? styles.webMenuHost : StyleSheet.absoluteFill,
        isDesktopWeb && styles.webMenuHostDesktop,
        isTabletWeb && styles.webMenuHostTablet,
      ]}
    >
      <View
        style={[
          styles.menu,
          Platform.OS === 'web' && styles.webMenu,
          isDesktopWeb && styles.webMenuDesktop,
          isTabletWeb && styles.webMenuTablet,
          {
            height: menuHeight,
            paddingBottom: menuPaddingBottom,
            shadowColor: colors.foreground,
            shadowOpacity: isDark ? 0.22 : 0.08,
          },
        ]}
      >
        {Platform.OS === 'ios' ? (
          <BlurView intensity={92} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]} />
        )}
        <View style={[styles.topBorder, { backgroundColor: colors.border }]} />
        <View style={[styles.items, isDesktopWeb && styles.webDesktopNavItems]}>
          {menuItems.map((item, index) => {
            const focused = item.matches(pathname);
            return (
              <Pressable
                key={item.label}
                testID={`footer-menu-${item.label.toLowerCase()}`}
                accessibilityRole="button"
                accessibilityLabel={`Buka ${item.label}`}
                accessibilityState={{ selected: focused }}
                onPress={() => router.replace(item.route)}
                style={({ pressed }) => [
                  styles.item,
                   isDesktopWeb && styles.webMenuDesktopItem,
                   item.icon === 'scan' && styles.centerItem,
                   isDesktopWeb && item.icon === 'scan' && styles.webMenuDesktopCenterItem,
                  { opacity: pressed ? 0.72 : 1 },
                ]}
              >
                <MenuIcon item={item} focused={focused} desktop={isDesktopWeb} index={index} />
                <Text style={[styles.label, isDesktopWeb && styles.webDesktopNavLabel, { color: focused ? colors.primary : colors.mutedForeground }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 8,
    elevation: 12,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 18,
    zIndex: 20,
  },
  webMenuHost: {
    width: '100%',
    position: 'fixed' as any,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  webMenuHostTablet: {
    paddingHorizontal: 14,
  },
  webMenuHostDesktop: {
    position: 'relative' as any,
    left: undefined,
    right: undefined,
    bottom: undefined,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
  },
  webMenu: {
    position: 'relative',
    left: undefined,
    right: undefined,
    bottom: undefined,
    width: '100%',
    zIndex: 1,
  },
  webMenuTablet: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  webMenuDesktop: {
    borderRadius: 22,
    paddingTop: 0,
  },
  webDesktopNavItems: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  webDesktopNavIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  item: {
    flex: 1,
    minWidth: 58,
    height: 78,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 18,
  },
  webMenuDesktopItem: {
    minWidth: 84,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 14,
  },
  webMenuDesktopCenterItem: {
    marginTop: 0,
  },
  webDesktopNavLabel: {
    fontSize: 11,
    marginTop: 0,
  },
  centerItem: {
    marginTop: -25,
    zIndex: 4,
  },
  icon: {
    width: 44,
    height: 38,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeImage: {
    flexShrink: 0,
  },
  productImage: {
    flexShrink: 0,
  },
  ordersImage: {
    flexShrink: 0,
  },
  accountImage: {
    flexShrink: 0,
    borderRadius: 14,
  },
  menuIconMotion: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
  },
  desktopCenterCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
  },
  traceImage: {
    width: 52,
    height: 52,
    flexShrink: 0,
  },
  desktopTraceImage: {
    width: 28,
    height: 28,
  },
  centerHighlight: {
    position: 'absolute',
    width: 18,
    height: 7,
    borderRadius: 5,
    top: 9,
    left: 14,
    opacity: 0.28,
    transform: [{ rotate: '-24deg' }],
  },
  label: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
});