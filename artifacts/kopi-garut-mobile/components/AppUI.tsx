import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { ClipPath, Defs, Image as SvgImage, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';
import { Coffee, formatPrice } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useScrollVisibility } from '@/context/ScrollVisibilityContext';
import { useColors } from '@/hooks/useColors';
import { BrandIcon, BrandIconName, ThreeDNavIcon } from '@/components/BrandIcon';
import { BottomMenu } from '@/components/BottomMenu';

const homeWeekdays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const homeMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function getHomeDateLabel() {
  const date = new Date();
  return `${homeWeekdays[date.getDay()]}, ${date.getDate()} ${homeMonths[date.getMonth()]} ${date.getFullYear()}`;
}

export function useBottomMenuPadding(gap = 32) {
  const insets = useSafeAreaInsets();
  if (Platform.OS === 'web') {
    return gap;
  }
  return 90 + insets.bottom + gap;
}

export function Screen({ children, scroll = true, style, bottomGap = 32, bottomMenu = true }: { children: React.ReactNode; scroll?: boolean; style?: object; bottomGap?: number; bottomMenu?: boolean }) {
  const { background } = useColors();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const scrollRef = useRef<ScrollView>(null);
  const { notifyScroll } = useScrollVisibility();
  const topInset = Platform.OS === 'web' ? 0 : insets.top;
  const contentBottomPadding = bottomMenu ? useBottomMenuPadding(bottomGap) : 20 + (Platform.OS === 'web' ? 0 : insets.bottom);
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [pathname]);
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webScreenShell, { backgroundColor: background, paddingBottom: bottomMenu ? 90 : 0 }]}>
        <ScrollView
          ref={scrollRef}
          nativeID="kopi-garut-web-scroll"
          onScroll={notifyScroll}
          scrollEventThrottle={16}
          style={[
            styles.webScroll,
            bottomMenu ? styles.webScrollWithMenu : styles.webScrollFull,
            { backgroundColor: background },
          ]}
          contentContainerStyle={[
            styles.screen,
            styles.webScreen,
            { backgroundColor: background, paddingTop: topInset + 18, paddingBottom: bottomMenu ? contentBottomPadding : 28 },
            style,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {bottomMenu && <BottomMenu />}
      </View>
    );
  }
  return scroll ? <ScrollView ref={scrollRef} onScroll={notifyScroll} scrollEventThrottle={16} style={[{ backgroundColor: background }, style]} contentContainerStyle={[styles.screen, { paddingTop: topInset + 18, paddingBottom: contentBottomPadding }]} showsVerticalScrollIndicator={false}>{children}</ScrollView> : <View style={[styles.screen, { backgroundColor: background, paddingTop: topInset + 18, paddingBottom: contentBottomPadding }, style]}>{children}</View>;
}

export function Header({ title, cart = true, notifications = false, back = false, extendOrnament = false }: { title: string; subtitle?: string; cart?: boolean; notifications?: boolean; back?: boolean; extendOrnament?: boolean }) {
  const colors = useColors();
  const router = useRouter();
  const pathname = usePathname();
  const { cart: items } = useStore();
  const titleParts = title.split(', ');
  const isHomeGreeting = title === 'Mau menikmati kopi apa hari ini?';
  const isHomeRoute = pathname === '/' || pathname === '/(tabs)';
  const showBack = back || !isHomeRoute;
  const ornamentTextColor = colors.primaryForeground;
  const titleTextColor = extendOrnament ? colors.primaryForeground : colors.foreground;
  const homeTitleShadow = isHomeGreeting ? { textShadowColor: colors.foreground, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 } : null;
  const homeDateLabel = isHomeGreeting ? getHomeDateLabel() : null;
  return <View style={styles.header}>
    <View pointerEvents="none" style={[styles.headerOrnament, extendOrnament && styles.headerOrnamentExtended]}>
      <Svg width="100%" height="100%" viewBox="0 0 400 170" preserveAspectRatio="none" style={StyleSheet.absoluteFill}>
        <Defs>
          <ClipPath id="headerImageClip">
            <Path d={extendOrnament ? "M0 0h400v151c-43-12-77-12-116 1-46 16-77 20-124 12-57-10-107-4-160 13V0Z" : "M0 0h400v116c-40-10-76-8-112 6-47 18-80 25-127 17-58-10-103-2-161 20V0Z"} />
          </ClipPath>
          <SvgLinearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.foreground} />
            <Stop offset="100%" stopColor={colors.secondaryForeground} />
          </SvgLinearGradient>
        </Defs>
        <SvgImage
          href={require('../assets/images/header-garut-pattern.webp')}
          x="0"
          y="0"
          width="400"
          height="170"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#headerImageClip)"
        />
        <Path d={extendOrnament ? "M0 0h400v151c-43-12-77-12-116 1-46 16-77 20-124 12-57-10-107-4-160 13V0Z" : "M0 0h400v116c-40-10-76-8-112 6-47 18-80 25-127 17-58-10-103-2-161 20V0Z"} fill="url(#headerGradient)" opacity={0.2} />
        <Path d={extendOrnament ? "M0 0h400v66c-48-9-86-4-123 9-44 16-75 18-119 9C100 74 51 77 0 93V0Z" : "M0 0h400v38c-44-7-83-1-119 12-48 17-79 20-126 11C98 51 52 53 0 70V0Z"} fill={colors.primary} opacity={0.18} />
        <Path d={extendOrnament ? "M0 0h400v108c-45-10-81-8-119 5-45 15-78 17-123 9-56-10-106-5-158 13V0Z" : "M0 0h400v78c-42-9-77-7-114 6-45 16-77 19-123 12C99 86 51 88 0 103V0Z"} fill={colors.accent} opacity={0.1} />
      </Svg>
    </View>
    <View style={styles.headerContent}>
      <View style={styles.headerTop}>
        {showBack ? <Pressable testID="header-back" accessibilityRole="button" accessibilityLabel="Kembali ke halaman sebelumnya" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.65 : 1 }]}><BrandIcon name="arrow-left" size={20} color={colors.foreground} /></Pressable> : <View style={styles.wordmark}><View style={[styles.logoFrame, { backgroundColor: colors.card, borderColor: colors.primaryForeground }]}><Image source={require('../assets/images/kopi-garut-logo.png')} contentFit="contain" style={styles.logo} /></View><View><View style={styles.brandNameRow}><Text style={[styles.brandName, { color: ornamentTextColor }]}>Kopi</Text><Text style={[styles.brandName, { color: colors.brandHighlight }]}>Garut</Text></View><Text style={[styles.brandMeta, { color: ornamentTextColor, opacity: 0.72 }]}>KOPI SPESIALTI · GARUT</Text></View></View>}
        <View style={styles.headerActions}>
          {showBack && <Pressable testID="header-home" accessibilityRole="button" accessibilityLabel="Kembali ke Beranda" onPress={() => router.replace('/')} style={({ pressed }) => [styles.headerActionButton, { opacity: pressed ? 0.72 : 1 }]}><LinearGradient colors={[colors.card, colors.secondary]} start={{ x: 0.15, y: 0 }} end={{ x: 0.9, y: 1 }} style={[styles.headerActionSurface, { borderColor: colors.border, shadowColor: colors.foreground }]}><View style={[styles.headerActionShine, { backgroundColor: colors.primaryForeground }]} /><Image source={require('../assets/images/home-coffee-house.png')} contentFit="contain" style={styles.headerHomeImage} /></LinearGradient></Pressable>}
          {notifications && <Pressable testID="header-notifications" accessibilityRole="button" accessibilityLabel="Buka notifikasi" onPress={() => router.push('/notifications')} style={({ pressed }) => [styles.headerActionButton, { opacity: pressed ? 0.72 : 1 }]}><LinearGradient colors={[colors.card, colors.secondary]} start={{ x: 0.15, y: 0 }} end={{ x: 0.9, y: 1 }} style={[styles.headerActionSurface, { borderColor: colors.border, shadowColor: colors.foreground }]}><View style={[styles.headerActionShine, { backgroundColor: colors.primaryForeground }]} /><ThreeDNavIcon name="bell" size={24} mainColor={colors.primary} lightColor={colors.accent} shadowColor={colors.foreground} accentColor={colors.primaryForeground} /></LinearGradient></Pressable>}
          {cart ? <Pressable testID="header-cart" accessibilityRole="button" accessibilityLabel="Buka keranjang" onPress={() => router.push('/cart')} style={({ pressed }) => [styles.headerActionButton, { opacity: pressed ? 0.72 : 1 }]}><LinearGradient colors={[colors.card, colors.secondary]} start={{ x: 0.15, y: 0 }} end={{ x: 0.9, y: 1 }} style={[styles.headerActionSurface, { borderColor: colors.border, shadowColor: colors.foreground }]}><View style={[styles.headerActionShine, { backgroundColor: colors.primaryForeground }]} /><ThreeDNavIcon name="shopping-cart" size={24} mainColor={colors.primary} lightColor={colors.accent} shadowColor={colors.foreground} accentColor={colors.primaryForeground} /></LinearGradient>{items.length > 0 && <View style={[styles.count, { backgroundColor: colors.primary }]}><Text style={[styles.countText, { color: colors.primaryForeground }]}>{items.reduce((sum, item) => sum + item.quantity, 0)}</Text></View>}</Pressable> : <View style={styles.headerActionSpacer} />}
        </View>
      </View>
      <View style={[styles.headerBottomSurface, { backgroundColor: extendOrnament ? 'transparent' : colors.background }]}>
        <View style={styles.headerBottom}>
          <View style={[styles.headerCopy, isHomeGreeting && styles.homeHeaderCopy]}>
            {isHomeGreeting ? <View style={styles.homeGreetingLines}>
              <Text numberOfLines={1} style={[styles.headerTitle, styles.homeHeaderTitle, { color: titleTextColor }, homeTitleShadow]}>Mau <Text style={[styles.homeGreetingHighlight, { color: colors.brandHighlight }, homeTitleShadow]}>menikmati{'\u00A0'}</Text></Text>
              <Text numberOfLines={1} style={[styles.headerTitle, styles.homeHeaderTitle, { color: colors.primaryForeground }, homeTitleShadow]}>kopi apa hari ini?</Text>
              <Text numberOfLines={1} style={[styles.homeDate, { color: colors.primaryForeground }, homeTitleShadow]}>{homeDateLabel}</Text>
            </View> : <Text numberOfLines={2} style={[styles.headerTitle, { color: titleTextColor }, homeTitleShadow]}>{titleParts.length === 2 ? <>{titleParts[0]}, <Text style={{ color: colors.primary }}>{titleParts[1]}</Text></> : title}</Text>}
          </View>
        </View>
      </View>
    </View>
  </View>;
}

export function Button({ label, onPress, icon, disabled = false, secondary = false, testID }: { label: string; onPress: () => void; icon?: BrandIconName; disabled?: boolean; secondary?: boolean; testID?: string }) {
  const colors = useColors();
  return <Pressable testID={testID} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.secondary : colors.primary, opacity: disabled ? 0.45 : pressed ? 0.78 : 1 }]}>{icon && <BrandIcon name={icon} size={16} color={secondary ? colors.foreground : colors.primaryForeground} />}<Text style={[styles.buttonText, { color: secondary ? colors.foreground : colors.primaryForeground }]}>{label}</Text></Pressable>;
}

export function CoffeeCard({ coffee, index = 0, grid = false, cardWidth }: { coffee: Coffee; index?: number; grid?: boolean; cardWidth?: number }) {
  const colors = useColors();
  const router = useRouter();
  const { favorites, toggleFavorite, addToCart } = useStore();
  const saved = favorites.includes(coffee.id);
  return <Animated.View entering={FadeInDown.delay(index * 50).duration(450)} style={[styles.card, grid && styles.gridCard, cardWidth ? { width: cardWidth } : null, { backgroundColor: colors.card, borderColor: colors.border }]}>
    <Pressable testID={`coffee-card-${coffee.id}`} onPress={() => router.push(`/product/${coffee.id}`)} style={[styles.cardImageWrap, grid && styles.gridCardImageWrap]}><Image source={coffee.image} contentFit="cover" style={styles.cardImage} />{coffee.badge && <View style={[styles.badge, { backgroundColor: colors.accent }]}><Text style={[styles.badgeText, { color: colors.accentForeground }]}>{coffee.badge}</Text></View>}</Pressable>
    <View style={[styles.cardBody, grid && styles.gridCardBody]}><View style={styles.cardInfo}><Text numberOfLines={grid ? 2 : 1} style={[styles.cardTitle, grid && styles.gridCardTitle, { color: colors.foreground }]}>{coffee.name}</Text><Text numberOfLines={grid ? 2 : 1} style={[styles.cardTagline, grid && styles.gridCardTagline, { color: colors.mutedForeground }]}>{coffee.tagline}</Text><Text style={[styles.price, grid && styles.gridPrice, { color: colors.primary }]}>{formatPrice(coffee.price)} <Text style={[styles.smallUnit, { color: colors.mutedForeground }]}>/ 200g</Text></Text></View><Pressable testID={`favorite-${coffee.id}`} onPress={() => toggleFavorite(coffee.id)} style={({ pressed }) => [styles.favorite, { opacity: pressed ? 0.55 : 1 }]}><BrandIcon name="heart" size={21} color={saved ? colors.primary : colors.mutedForeground} /></Pressable></View>
    <Pressable testID={`add-${coffee.id}`} accessibilityRole="button" accessibilityLabel={`Tambah ${coffee.name} ke keranjang`} onPress={() => addToCart(coffee.id)} style={({ pressed }) => [styles.addButton, { backgroundColor: colors.primary, borderColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}><BrandIcon name="plus" size={16} color={colors.primaryForeground} /><Text style={[styles.addText, { color: colors.primaryForeground }]}>{grid ? 'Tambah' : 'Tambah ke keranjang'}</Text></Pressable>
  </Animated.View>;
}

export function SearchBar({ value, onChangeText }: { value: string; onChangeText: (text: string) => void }) {
  const colors = useColors();
  return <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}><BrandIcon name="search" size={18} color={colors.mutedForeground} /><TextInput testID="catalog-search" value={value} onChangeText={onChangeText} placeholder="Cari nama, asal, atau rasa" placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} /></View>;
}

export function HubTile({ icon, title, description, onPress, compact = false }: { icon: BrandIconName; title: string; description: string; onPress: () => void; compact?: boolean }) {
  const colors = useColors();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.hubTile, compact && styles.hubTileCompact, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}><View style={[styles.hubTileIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={19} color={colors.primary} /></View><View style={[styles.hubTileCopy, compact && styles.hubTileCopyCompact]}><Text numberOfLines={compact ? 2 : 1} style={[styles.hubTileTitle, { color: colors.foreground }]}>{title}</Text><Text numberOfLines={2} style={[styles.hubTileDescription, { color: colors.mutedForeground }]}>{description}</Text></View><BrandIcon name="chevron-right" size={17} color={colors.mutedForeground} /></Pressable>;
}

export function EmptyState({ icon = 'heart', title, text, action, onAction }: { icon?: BrandIconName; title: string; text: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={[styles.empty, { borderColor: colors.border }]}><View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={icon} size={24} color={colors.primary} /></View><Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>{text}</Text>{action && onAction && <Button label={action} onPress={onAction} secondary />}</View>;
}

export function LoadingState() { const colors = useColors(); return <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.loadingText, { color: colors.mutedForeground }]}>Menyiapkan ritual kopimu…</Text></View>; }

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120, gap: 20, minHeight: '100%' },
  webScreen: { flexGrow: 1 },
  webScreenShell: { width: '100%', flex: 1, height: 'var(--kg-viewport-height, 100dvh)' as any, minHeight: 'var(--kg-viewport-height, 100dvh)' as any, overflow: 'visible' },
  webScroll: { width: '100%' },
  webScrollWithMenu: { flex: 0, height: 'calc(var(--kg-viewport-height, 100dvh) - 90px)' as any },
  webScrollFull: { flex: 1, height: 'var(--kg-viewport-height, 100dvh)' as any },
  header: { marginBottom: 0, position: 'relative', zIndex: 1 },
  headerOrnament: { position: 'absolute', left: -20, right: -20, top: -18, height: 92, overflow: 'hidden' },
  headerOrnamentExtended: { height: 225 },
  headerContent: { position: 'relative', zIndex: 3, gap: 14 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, position: 'relative', zIndex: 4 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  logoFrame: { width: 36, height: 36, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  logo: { width: 31, height: 31, borderRadius: 10 },
  brandNameRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  brandName: { fontFamily: 'Manrope_700Bold', fontSize: 17, lineHeight: 20, fontWeight: '800', letterSpacing: -0.45 },
  brandMeta: { fontFamily: 'Manrope_700Bold', fontSize: 7.5, fontWeight: '700', letterSpacing: 1.1, marginTop: 3 },
  headerBottomSurface: { marginHorizontal: -20, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 12 },
  headerBottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, position: 'relative', zIndex: 3 },
  headerCopy: { flex: 1, minWidth: 0, gap: 5, paddingRight: 6 },
  homeHeaderCopy: { paddingLeft: 56, paddingRight: 28 },
  homeGreetingLines: { alignItems: 'flex-end', gap: 0, paddingRight: 12 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9.5, fontWeight: '800', letterSpacing: 1.8, textTransform: 'uppercase' },
  headerTitle: { fontFamily: 'Manrope_700Bold', fontSize: 27, fontWeight: '700', letterSpacing: -0.8 },
  homeHeaderTitle: { fontSize: 18, lineHeight: 22, letterSpacing: -0.45, textAlign: 'right' },
  homeDate: { fontFamily: 'Manrope_700Bold', fontSize: 8.5, lineHeight: 12, fontWeight: '700', letterSpacing: 0.15, textAlign: 'right', opacity: 0.9, marginTop: 1 },
  homeGreetingHighlight: { fontStyle: 'italic', fontWeight: '800' },
  contextRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  contextDivider: { width: 18, height: 1 },
  locationLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.7 },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  headerActionButton: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  headerActionSurface: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.16, shadowRadius: 5, elevation: 3 },
  headerActionShine: { position: 'absolute', width: 19, height: 6, borderRadius: 5, top: 7, left: 11, opacity: 0.35, transform: [{ rotate: '-24deg' }] },
  headerHomeImage: { width: 30, height: 30 },
  headerActionSpacer: { width: 46, height: 46 },
  count: { position: 'absolute', top: -2, right: -2, minWidth: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  countText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  button: { height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, paddingHorizontal: 20 },
  buttonText: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  card: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', width: 254 },
  gridCard: { width: '100%', flex: 1, borderRadius: 17 },
  cardImageWrap: { aspectRatio: 1, position: 'relative' },
  gridCardImageWrap: { aspectRatio: 1 },
  cardImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute', left: 12, top: 12, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8 },
  badgeText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700', letterSpacing: 0.4 },
  cardBody: { flexDirection: 'row', padding: 14, paddingBottom: 10, gap: 8 },
  cardInfo: { flex: 1 },
  gridCardBody: { flex: 1, minHeight: 124, padding: 11, paddingBottom: 8, gap: 4 },
  gridCardTitle: { lineHeight: 20, minHeight: 40 },
  gridCardTagline: { lineHeight: 16, minHeight: 32, marginTop: 3 },
  gridPrice: { marginTop: 8 },
  cardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700', letterSpacing: -0.2 },
  cardTagline: { fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 4 },
  price: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700', marginTop: 10 },
  smallUnit: { fontFamily: 'Manrope_400Regular', fontSize: 10, fontWeight: '400' },
  favorite: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  addButton: { marginHorizontal: 12, marginBottom: 12, borderWidth: 1, height: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 8 },
  addText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  search: { height: 50, borderRadius: 15, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10 },
  searchInput: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 14 },
  hubTile: { width: '100%', minHeight: 78, borderRadius: 17, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  hubTileCompact: { width: '48.5%', minHeight: 126, alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', gap: 8 },
  hubTileIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  hubTileCopy: { flex: 1, gap: 3 },
  hubTileCopyCompact: { width: '100%', flex: 0, paddingRight: 5 },
  hubTileTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  hubTileDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15 },
  hubTileArrowCompact: { position: 'absolute', top: 14, right: 12 },
  empty: { alignItems: 'center', borderWidth: 1, borderStyle: 'dashed', borderRadius: 22, padding: 28, gap: 10, marginTop: 10 },
  emptyIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '700' },
  emptyText: { fontFamily: 'Manrope_400Regular', textAlign: 'center', lineHeight: 21, fontSize: 13, maxWidth: 270 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 500 },
  loadingText: { fontFamily: 'Manrope_400Regular', fontSize: 13 },
});