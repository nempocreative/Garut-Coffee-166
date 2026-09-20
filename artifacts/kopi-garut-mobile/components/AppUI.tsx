import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Ellipse, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';
import { Coffee, formatPrice } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';
import { BrandIcon, BrandIconName, ThreeDNavIcon } from '@/components/BrandIcon';

export function Screen({ children, scroll = true, style }: { children: React.ReactNode; scroll?: boolean; style?: object }) {
  const { background } = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  return scroll ? <ScrollView style={[{ backgroundColor: background }, style]} contentContainerStyle={[styles.screen, { paddingTop: topInset + 18 }]} showsVerticalScrollIndicator={false}>{children}</ScrollView> : <View style={[styles.screen, { backgroundColor: background, paddingTop: topInset + 18 }, style]}>{children}</View>;
}

export function Header({ title, cart = true, notifications = false, back = false, extendOrnament = false }: { title: string; subtitle?: string; cart?: boolean; notifications?: boolean; back?: boolean; extendOrnament?: boolean }) {
  const colors = useColors();
  const router = useRouter();
  const { cart: items } = useStore();
  const titleParts = title.split(', ');
  const isHomeGreeting = title === 'Mau menikmati kopi apa hari ini?';
  const ornamentTextColor = colors.primaryForeground;
  const titleTextColor = extendOrnament ? colors.primaryForeground : colors.foreground;
  return <View style={styles.header}>
    <View pointerEvents="none" style={[styles.headerOrnament, extendOrnament && styles.headerOrnamentExtended]}>
      <Svg width="100%" height="100%" viewBox="0 0 400 170" preserveAspectRatio="none" style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgLinearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.foreground} />
            <Stop offset="100%" stopColor={colors.secondaryForeground} />
          </SvgLinearGradient>
        </Defs>
        <Path d={extendOrnament ? "M0 0h400v151c-43-12-77-12-116 1-46 16-77 20-124 12-57-10-107-4-160 13V0Z" : "M0 0h400v116c-40-10-76-8-112 6-47 18-80 25-127 17-58-10-103-2-161 20V0Z"} fill="url(#headerGradient)" />
        <Path d={extendOrnament ? "M0 0h400v66c-48-9-86-4-123 9-44 16-75 18-119 9C100 74 51 77 0 93V0Z" : "M0 0h400v38c-44-7-83-1-119 12-48 17-79 20-126 11C98 51 52 53 0 70V0Z"} fill={colors.primary} opacity={0.18} />
        <Path d={extendOrnament ? "M0 0h400v108c-45-10-81-8-119 5-45 15-78 17-123 9-56-10-106-5-158 13V0Z" : "M0 0h400v78c-42-9-77-7-114 6-45 16-77 19-123 12C99 86 51 88 0 103V0Z"} fill={colors.accent} opacity={0.1} />
        <Path d={extendOrnament ? "M20 105c38-22 74-25 111-15 34 9 59 8 92-3 36-12 72-14 112-4" : "M8 77c34-18 68-20 101-11 33 9 59 8 91-3 34-12 68-13 104-5"} fill="none" stroke={colors.primaryForeground} strokeWidth="1.25" strokeLinecap="round" opacity={0.2} />
        <Path d={extendOrnament ? "M300 16c22 10 37 27 44 50M313 10c21 12 36 29 42 49" : "M314 14c19 12 31 29 36 50M326 10c19 12 31 28 37 45"} fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" opacity={0.42} />
        <Path d={extendOrnament ? "M313 10c21 12 36 29 42 49" : "M326 10c19 12 31 28 37 45"} fill="none" stroke={colors.primaryForeground} strokeWidth="1" strokeLinecap="round" opacity={0.28} />
        <Ellipse cx={extendOrnament ? 43 : 30} cy={extendOrnament ? 43 : 34} rx="7" ry="3.6" fill={colors.accent} opacity={0.26} transform={`rotate(-34 ${extendOrnament ? 43 : 30} ${extendOrnament ? 43 : 34})`} />
        <Path d={extendOrnament ? "M39 36c4 4 5 9 3 15" : "M26 27c4 4 5 8 3 13"} fill="none" stroke={colors.primaryForeground} strokeWidth="1.2" strokeLinecap="round" opacity={0.35} />
        <Circle cx={extendOrnament ? 69 : 57} cy={extendOrnament ? 31 : 25} r="2.4" fill={colors.accent} opacity={0.7} />
        <Circle cx={extendOrnament ? 79 : 67} cy={extendOrnament ? 24 : 19} r="1.2" fill={colors.primaryForeground} opacity={0.48} />
      </Svg>
    </View>
    <View style={styles.headerContent}>
      <View style={styles.headerTop}>
        {back ? <Pressable testID="header-back" onPress={() => router.back()} style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.65 : 1 }]}><BrandIcon name="arrow-left" size={20} color={colors.foreground} /></Pressable> : <View style={styles.wordmark}><Image source={require('../assets/images/kopi-garut-logo.png')} contentFit="contain" style={[styles.logo, { borderColor: colors.primaryForeground }]} /><View><View style={styles.brandNameRow}><Text style={[styles.brandName, { color: ornamentTextColor }]}>Kopi</Text><Text style={[styles.brandName, { color: colors.accent }]}>Garut</Text></View><Text style={[styles.brandMeta, { color: ornamentTextColor, opacity: 0.72 }]}>KOPI SPESIALTI · GARUT</Text></View></View>}
        <View style={styles.headerActions}>
          {notifications && <Pressable testID="header-notifications" accessibilityRole="button" accessibilityLabel="Buka notifikasi" onPress={() => router.push('/notifications')} style={({ pressed }) => [styles.headerActionButton, { opacity: pressed ? 0.72 : 1 }]}><LinearGradient colors={[colors.card, colors.secondary]} start={{ x: 0.15, y: 0 }} end={{ x: 0.9, y: 1 }} style={[styles.headerActionSurface, { borderColor: colors.border, shadowColor: colors.foreground }]}><View style={[styles.headerActionShine, { backgroundColor: colors.primaryForeground }]} /><ThreeDNavIcon name="bell" size={24} mainColor={colors.primary} lightColor={colors.accent} shadowColor={colors.foreground} accentColor={colors.primaryForeground} /></LinearGradient></Pressable>}
          {cart ? <Pressable testID="header-cart" accessibilityRole="button" accessibilityLabel="Buka keranjang" onPress={() => router.push('/cart')} style={({ pressed }) => [styles.headerActionButton, { opacity: pressed ? 0.72 : 1 }]}><LinearGradient colors={[colors.card, colors.secondary]} start={{ x: 0.15, y: 0 }} end={{ x: 0.9, y: 1 }} style={[styles.headerActionSurface, { borderColor: colors.border, shadowColor: colors.foreground }]}><View style={[styles.headerActionShine, { backgroundColor: colors.primaryForeground }]} /><ThreeDNavIcon name="shopping-cart" size={24} mainColor={colors.primary} lightColor={colors.accent} shadowColor={colors.foreground} accentColor={colors.primaryForeground} /></LinearGradient>{items.length > 0 && <View style={[styles.count, { backgroundColor: colors.primary }]}><Text style={[styles.countText, { color: colors.primaryForeground }]}>{items.reduce((sum, item) => sum + item.quantity, 0)}</Text></View>}</Pressable> : <View style={styles.headerActionSpacer} />}
        </View>
      </View>
      <View style={[styles.headerBottomSurface, { backgroundColor: extendOrnament ? 'transparent' : colors.background }]}>
        <View style={styles.headerBottom}>
          <View style={styles.headerCopy}>
            <Text numberOfLines={2} style={[styles.headerTitle, isHomeGreeting && styles.homeHeaderTitle, { color: titleTextColor }]}>{isHomeGreeting ? <>Mau menikmati{'\n'}<Text style={{ color: extendOrnament ? colors.accent : colors.primary }}>kopi apa hari ini?</Text></> : titleParts.length === 2 ? <>{titleParts[0]}, <Text style={{ color: colors.primary }}>{titleParts[1]}</Text></> : title}</Text>
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
    <Pressable testID={`add-${coffee.id}`} onPress={() => addToCart(coffee.id)} style={({ pressed }) => [styles.addButton, { borderColor: colors.border, opacity: pressed ? 0.65 : 1 }, grid && styles.gridAddButton]}><BrandIcon name="plus" size={16} color={colors.primary} /><Text style={[styles.addText, { color: colors.foreground }]}>{grid ? 'Tambah' : 'Tambah ke keranjang'}</Text></Pressable>
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
  header: { marginBottom: 0, position: 'relative', zIndex: 1 },
  headerOrnament: { position: 'absolute', left: -20, right: -20, top: -18, height: 92 },
  headerOrnamentExtended: { height: 225 },
  headerContent: { position: 'relative', zIndex: 3, gap: 14 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, position: 'relative', zIndex: 4 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  logo: { width: 36, height: 36, borderRadius: 12, borderWidth: 1 },
  brandNameRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  brandName: { fontFamily: 'Manrope_700Bold', fontSize: 17, lineHeight: 20, fontWeight: '800', letterSpacing: -0.45 },
  brandMeta: { fontFamily: 'Manrope_700Bold', fontSize: 7.5, fontWeight: '700', letterSpacing: 1.1, marginTop: 3 },
  headerBottomSurface: { marginHorizontal: -20, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 12 },
  headerBottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, position: 'relative', zIndex: 3 },
  headerCopy: { flex: 1, minWidth: 0, gap: 5, paddingRight: 6 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9.5, fontWeight: '800', letterSpacing: 1.8, textTransform: 'uppercase' },
  headerTitle: { fontFamily: 'Manrope_700Bold', fontSize: 27, fontWeight: '700', letterSpacing: -0.8 },
  homeHeaderTitle: { fontSize: 25, lineHeight: 29, letterSpacing: -0.65 },
  contextRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  contextDivider: { width: 18, height: 1 },
  locationLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.7 },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  headerActionButton: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  headerActionSurface: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.16, shadowRadius: 5, elevation: 3 },
  headerActionShine: { position: 'absolute', width: 19, height: 6, borderRadius: 5, top: 7, left: 11, opacity: 0.35, transform: [{ rotate: '-24deg' }] },
  headerActionSpacer: { width: 46, height: 46 },
  count: { position: 'absolute', top: -2, right: -2, minWidth: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  countText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  button: { height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, paddingHorizontal: 20 },
  buttonText: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  card: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', width: 254 },
  gridCard: { width: '100%', flex: 1, borderRadius: 17 },
  cardImageWrap: { height: 180, position: 'relative' },
  gridCardImageWrap: { height: 132 },
  cardImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute', left: 12, top: 12, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8 },
  badgeText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700', letterSpacing: 0.4 },
  cardBody: { flexDirection: 'row', padding: 14, paddingBottom: 10, gap: 8 },
  cardInfo: { flex: 1 },
  gridCardBody: { minHeight: 124, padding: 11, paddingBottom: 8, gap: 4 },
  gridCardTitle: { lineHeight: 20, minHeight: 40 },
  gridCardTagline: { lineHeight: 16, minHeight: 32, marginTop: 3 },
  gridPrice: { marginTop: 8 },
  cardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700', letterSpacing: -0.2 },
  cardTagline: { fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 4 },
  price: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700', marginTop: 10 },
  smallUnit: { fontFamily: 'Manrope_400Regular', fontSize: 10, fontWeight: '400' },
  favorite: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  addButton: { marginHorizontal: 14, marginBottom: 14, borderWidth: 1, height: 38, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  gridAddButton: { marginHorizontal: 11, marginBottom: 11, height: 35, borderRadius: 10 },
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