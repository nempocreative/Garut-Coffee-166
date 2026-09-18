import React, { useMemo } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { CoffeeCard, EmptyState, Header, LoadingState } from '@/components/AppUI';
import { coffees } from '@/data/coffees';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites, ready } = useStore();
  const saved = useMemo(() => coffees.filter((coffee) => favorites.includes(coffee.id)), [favorites]);
  if (!ready) return <LoadingState />;
  return <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? 67 : insets.top }}><FlatList data={saved} numColumns={2} keyExtractor={(item) => item.id} contentContainerStyle={styles.content} columnWrapperStyle={styles.row} showsVerticalScrollIndicator={false} ListHeaderComponent={<><Header title="Your shortlist" subtitle="SAVED FOR LATER" /><Text style={[styles.intro, { color: colors.mutedForeground }]}>Keep the coffees that fit your rhythm close.</Text></>} renderItem={({ item, index }) => <CoffeeCard coffee={item} index={index} />} ListEmptyComponent={<EmptyState icon="heart" title="A quiet shelf" text="Save a coffee you want to return to, and it will be waiting here." action="Explore coffees" onAction={() => router.push('/catalog')} />} /></View>;
}
const styles = StyleSheet.create({ content: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 16, gap: 16 }, row: { gap: 12, alignItems: 'flex-start' }, intro: { fontSize: 14, lineHeight: 21, marginBottom: 4 } });