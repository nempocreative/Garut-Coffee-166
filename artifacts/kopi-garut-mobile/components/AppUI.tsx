import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Coffee, formatPrice } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';

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
  return <View style={styles.header}>
    {back ? <Pressable testID="header-back" onPress={() => router.back()} style={styles.iconButton}><Feather name="arrow-left" size={20} color={colors.foreground} /></Pressable> : <View style={styles.wordmark}><Image source={require('../assets/images/icon.png')} style={styles.logo} /><Text style={[styles.wordmarkText, { color: colors.foreground }]}>KOPI GARUT</Text></View>}
    <View style={styles.headerCopy}><Text style={[styles.eyebrow, { color: colors.primary }]}>{subtitle}</Text><Text style={[styles.headerTitle, { color: colors.foreground }]}>{title}</Text></View>
    {cart ? <Link href="/cart" testID="header-cart" style={[styles.iconButton, { backgroundColor: colors.secondary }]}><Feather name="shopping-bag" size={19} color={colors.foreground} />{items.length > 0 && <View style={[styles.count, { backgroundColor: colors.primary }]}><Text style={[styles.countText, { color: colors.primaryForeground }]}>{items.reduce((sum, item) => sum + item.quantity, 0)}</Text></View>}</Link> : <View style={{ width: 40 }} />}
  </View>;
}

export function Button({ label, onPress, icon, disabled = false, secondary = false, testID }: { label: string; onPress: () => void; icon?: keyof typeof Feather.glyphMap; disabled?: boolean; secondary?: boolean; testID?: string }) {
  const colors = useColors();
  return <Pressable testID={testID} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.secondary : colors.primary, opacity: disabled ? 0.45 : pressed ? 0.78 : 1 }]}>{icon && <Feather name={icon} size={16} color={secondary ? colors.foreground : colors.primaryForeground} />}<Text style={[styles.buttonText, { color: secondary ? colors.foreground : colors.primaryForeground }]}>{label}</Text></Pressable>;
}

export function CoffeeCard({ coffee, index = 0 }: { coffee: Coffee; index?: number }) {
  const colors = useColors();
  const router = useRouter();
  const { favorites, toggleFavorite, addToCart } = useStore();
  const saved = favorites.includes(coffee.id);
  return <Animated.View entering={FadeInDown.delay(index * 50).duration(450)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
    <Pressable testID={`coffee-card-${coffee.id}`} onPress={() => router.push(`/product/${coffee.id}`)} style={styles.cardImageWrap}><Image source={coffee.image} contentFit="cover" style={styles.cardImage} />{coffee.badge && <View style={[styles.badge, { backgroundColor: colors.accent }]}><Text style={[styles.badgeText, { color: colors.accentForeground }]}>{coffee.badge}</Text></View>}</Pressable>
    <View style={styles.cardBody}><View style={{ flex: 1 }}><Text style={[styles.cardTitle, { color: colors.foreground }]}>{coffee.name}</Text><Text numberOfLines={1} style={[styles.cardTagline, { color: colors.mutedForeground }]}>{coffee.tagline}</Text><Text style={[styles.price, { color: colors.primary }]}>{formatPrice(coffee.price)} <Text style={[styles.smallUnit, { color: colors.mutedForeground }]}>/ 200g</Text></Text></View><Pressable testID={`favorite-${coffee.id}`} onPress={() => toggleFavorite(coffee.id)} style={styles.favorite}><Ionicons name={saved ? 'heart' : 'heart-outline'} size={21} color={saved ? colors.primary : colors.mutedForeground} /></Pressable></View>
    <Pressable testID={`add-${coffee.id}`} onPress={() => addToCart(coffee.id)} style={[styles.addButton, { borderColor: colors.border }]}><Feather name="plus" size={16} color={colors.primary} /><Text style={[styles.addText, { color: colors.foreground }]}>Add to bag</Text></Pressable>
  </Animated.View>;
}

export function SearchBar({ value, onChangeText }: { value: string; onChangeText: (text: string) => void }) {
  const colors = useColors();
  return <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="search" size={18} color={colors.mutedForeground} /><TextInput testID="catalog-search" value={value} onChangeText={onChangeText} placeholder="Search by coffee or origin" placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} /></View>;
}

export function EmptyState({ icon = 'heart', title, text, action, onAction }: { icon?: keyof typeof Feather.glyphMap; title: string; text: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={[styles.empty, { borderColor: colors.border }]}><View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}><Feather name={icon} size={24} color={colors.primary} /></View><Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>{text}</Text>{action && onAction && <Button label={action} onPress={onAction} secondary />}</View>;
}

export function LoadingState() { const colors = useColors(); return <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.loadingText, { color: colors.mutedForeground }]}>Preparing your coffee ritual…</Text></View>; }

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120, gap: 24, minHeight: '100%' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52, marginBottom: 4 },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  logo: { width: 28, height: 28, borderRadius: 9 },
  wordmarkText: { fontSize: 11, fontWeight: '700', letterSpacing: 1.8 },
  headerCopy: { flex: 1, gap: 2 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
  headerTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  count: { position: 'absolute', top: -2, right: -2, minWidth: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  countText: { fontSize: 9, fontWeight: '700' },
  button: { height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, paddingHorizontal: 20 },
  buttonText: { fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  card: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', width: 254 },
  cardImageWrap: { height: 180, position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute', left: 12, top: 12, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8 },
  badgeText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.4 },
  cardBody: { flexDirection: 'row', padding: 14, paddingBottom: 10, gap: 8 },
  cardTitle: { fontSize: 17, fontWeight: '700', letterSpacing: -0.2 },
  cardTagline: { fontSize: 12, marginTop: 4 },
  price: { fontSize: 13, fontWeight: '700', marginTop: 10 },
  smallUnit: { fontSize: 10, fontWeight: '400' },
  favorite: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  addButton: { marginHorizontal: 14, marginBottom: 14, borderWidth: 1, height: 38, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  addText: { fontSize: 12, fontWeight: '700' },
  search: { height: 50, borderRadius: 15, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10 },
  searchInput: { flex: 1, fontSize: 14 },
  empty: { alignItems: 'center', borderWidth: 1, borderStyle: 'dashed', borderRadius: 22, padding: 28, gap: 10, marginTop: 10 },
  emptyIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  emptyText: { textAlign: 'center', lineHeight: 21, fontSize: 13, maxWidth: 270 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 500 },
  loadingText: { fontSize: 13 },
});