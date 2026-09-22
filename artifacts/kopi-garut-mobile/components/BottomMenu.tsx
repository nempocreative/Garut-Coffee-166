import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

function MenuIcon({ item, focused }: { item: BottomMenuItem; focused: boolean }) {
  const colors = useColors();

  if (item.icon === 'home') {
    return (
      <View style={[styles.icon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/home-coffee-house.png')}
          contentFit="contain"
          style={[styles.homeImage, { width: focused ? 36 : 33, height: focused ? 36 : 33 }]}
        />
      </View>
    );
  }

  if (item.icon === 'product') {
    return (
      <View style={[styles.icon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/product-coffee-basket.png')}
          contentFit="contain"
          style={[styles.productImage, { width: focused ? 36 : 33, height: focused ? 36 : 33 }]}
        />
      </View>
    );
  }

  if (item.icon === 'orders') {
    return (
      <View style={[styles.icon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/orders-coffee-checklist.png')}
          contentFit="contain"
          style={[styles.ordersImage, { width: focused ? 40 : 37, height: focused ? 40 : 37 }]}
        />
      </View>
    );
  }

  if (item.icon === 'account') {
    return (
      <View style={[styles.icon, focused && { backgroundColor: colors.secondary }]}>
        <Image
          source={require('../assets/images/account-coffee-settings.png')}
          contentFit="contain"
          style={[styles.accountImage, { width: focused ? 40 : 37, height: focused ? 40 : 37 }]}
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
      style={[styles.centerCircle, { borderColor: colors.card, shadowColor: colors.foreground }]}
    >
      <View style={[styles.centerHighlight, { backgroundColor: colors.primaryForeground }]} />
      <Image
        source={require('../assets/images/traceability-coffee-qr.png')}
        contentFit="contain"
        style={styles.traceImage}
      />
    </LinearGradient>
  );
}

export function BottomMenu() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  const bottomInset = Platform.OS === 'web' ? 0 : insets.bottom;
  const isFarmerRoute = pathname === '/extension-farmers' || pathname.startsWith('/farmer/');

  if (isFarmerRoute) return null;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        style={[
          styles.menu,
          {
            height: 90 + bottomInset,
            paddingBottom: bottomInset + 4,
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
        <View style={styles.items}>
          {menuItems.map((item) => {
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
                  item.icon === 'scan' && styles.centerItem,
                  { opacity: pressed ? 0.72 : 1 },
                ]}
              >
                <MenuIcon item={item} focused={focused} />
                <Text style={[styles.label, { color: focused ? colors.primary : colors.mutedForeground }]}>
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
  traceImage: {
    width: 52,
    height: 52,
    flexShrink: 0,
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