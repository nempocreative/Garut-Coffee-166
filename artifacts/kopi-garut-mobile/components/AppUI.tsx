import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Coffee, formatPrice } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';

export function Screen({ children, scroll = true, style }: { children: React.ReactNode; scroll?: boolean; style?: object }) {
  const { background } = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  return scroll ? <ScrollView style={[{ backgroundColor: background }, style]} contentContainerStyle={[styles.screen, { paddingTop: topInset + 18 }]} showsVerticalScrollIndicator={false}>{children}</ScrollView> : <View style={[styles.screen, { backgroundColor: background, paddingTop: topInset + 18 }, style]}>{children}</View>;
}

export function Header({ title, subtitle, cart = true, back = false }: { title: string; subtitle?: string; cart?: boolean; back?: boolean }) {
  const colors = useColors();
  const router = useRouter();
  const { cart: items } = useStore();
  const subtitleParts = subtitle?.split(' · ') ?? [];
  const titleParts = title.split(', ');
  return <View style={styles.header}>
    <View style={styles.headerTop}>
      {back ? <Pressable testID="header-back" onPress={() => router.back()} style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.65 : 1 }]}><BrandIcon name="arrow-left" size={20} color={colors.foreground} /></Pressable> : <View style={styles.wordmark}><Image source={require('../assets/images/kopi-garut-logo.png')} contentFit="contain" style={[styles.logo, { borderColor: colors.border }]} /><View><View style={styles.brandNameRow}><Text style={[styles.brandName, { color: colors.foreground }]}>Kopi</Text><Text style={[styles.brandName, { color: colors.primary }]}>Garut</Text></View><Text style={[styles.brandMeta, { color: colors.mutedForeground }]}>KOPI SPESIALTI · GARUT</Text></View></View>}
      {cart ? <Pressable testID="header-cart" accessibilityRole="button" accessibilityLabel="Buka keranjang" onPress={() => router.push('/cart')} style={({ pressed }) => [styles.cartButton, { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.65 : 1 }]}><BrandIcon name="shopping-bag" size={18} color={colors.foreground} />{items.length > 0 && <View style={[styles.count, { backgroundColor: colors.primary }]}><Text style={[styles.countText, { color: colors.primaryForeground }]}>{items.reduce((sum, item) => sum + item.quantity, 0)}</Text></View>}</Pressable> : <View style={styles.headerActionSpacer} />}
    </View>
    <View style={styles.headerBottom}>
      <View style={styles.headerCopy}>
        {subtitleParts.length === 2 ? <View style={styles.contextRow}><Text style={[styles.eyebrow, { color: colors.primary }]}>{subtitleParts[0]}</Text><View style={[styles.contextDot, { backgroundColor: colors.accent }]} /><View style={styles.locationInline}><BrandIcon name="compass" size={11} color={colors.primary} /><Text style={[styles.locationLabel, { color: colors.foreground }]}>{subtitleParts[1]}</Text></View></View> : <Text style={[styles.eyebrow, { color: colors.primary }]}>{subtitle}</Text>}
        <Text numberOfLines={2} style={[styles.headerTitle, { color: colors.foreground }]}>{titleParts.length === 2 ? <>{titleParts[0]}, <Text style={{ color: colors.primary }}>{titleParts[1]}</Text></> : title}</Text>
      </View>
    </View>
  </View>;
}

export function Button({ label, onPress, icon, disabled = false, secondary = false, testID }: { label: string; onPress: () => void; icon?: BrandIconName; disabled?: boolean; secondary?: boolean; testID?: string }) {
  const colors = useColors();
  return <Pressable testID={testID} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.secondary : colors.primary, opacity: disabled ? 0.45 : pressed ? 0.78 : 1 }]}>{icon && <BrandIcon name={icon} size={16} color={secondary ? colors.foreground : colors.primaryForeground} />}<Text style={[styles.buttonText, { color: secondary ? colors.foreground : colors.primaryForeground }]}>{label}</Text></Pressable>;
}

export function CoffeeCard({ coffee, index = 0, grid = false }: { coffee: Coffee; index?: number; grid?: boolean }) {
  const colors = useColors();
  const router = useRouter();
  const { favorites, toggleFavorite, addToCart } = useStore();
  const saved = favorites.includes(coffee.id);
  return <Animated.View entering={FadeInDown.delay(index * 50).duration(450)} style={[styles.card, grid && styles.gridCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
  screen: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120, gap: 24, minHeight: '100%' },
  header: { gap: 15, marginBottom: 2 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 50 },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  logo: { width: 44, height: 44, borderRadius: 15, borderWidth: 1 },
  brandNameRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  brandName: { fontFamily: 'Manrope_700Bold', fontSize: 19, lineHeight: 22, fontWeight: '800', letterSpacing: -0.6 },
  brandMeta: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '700', letterSpacing: 1.05, marginTop: 4 },
  headerBottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  headerCopy: { flex: 1, gap: 3 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800', letterSpacing: 1.6, textTransform: 'uppercase' },
  headerTitle: { fontFamily: 'Manrope_700Bold', fontSize: 27, fontWeight: '700', letterSpacing: -0.8 },
  contextRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contextDot: { width: 3, height: 3, borderRadius: 2 },
  locationInline: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationLabel: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cartButton: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
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