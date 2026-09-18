import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { CoffeeCard, Header, SearchBar } from '@/components/AppUI';
import { coffees } from '@/data/coffees';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const filters = ['Semua', 'Cerah', 'Buah', 'Harian', 'Nyaman'];
export default function CatalogScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const visible = useMemo(() => coffees.filter((coffee) => (filter === 'Semua' || coffee.category === filter) && `${coffee.name} ${coffee.origin} ${coffee.tastingNotes.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'web' ? 67 : insets.top }}><FlatList data={visible} numColumns={2} keyExtractor={(item) => item.id} contentContainerStyle={styles.content} columnWrapperStyle={styles.row} showsVerticalScrollIndicator={false} ListHeaderComponent={<><Header title="Katalog" subtitle="KOPI GARUT" /><SearchBar value={query} onChangeText={setQuery} /><View style={styles.filterRow}>{filters.map((item) => <Pressable testID={`filter-${item}`} key={item} onPress={() => setFilter(item)} style={({ pressed }) => [styles.filter, { backgroundColor: filter === item ? colors.primary : colors.secondary, opacity: pressed ? 0.72 : 1 }]}><Text style={{ color: filter === item ? colors.primaryForeground : colors.foreground, fontSize: 12, fontWeight: '700' }}>{item}</Text></Pressable>)}</View><Text style={[styles.result, { color: colors.mutedForeground }]}>{visible.length} kopi, pilihan untuk pagi yang cerah</Text></>} renderItem={({ item, index }) => <CoffeeCard coffee={item} index={index} grid />} ListEmptyComponent={<Text style={[styles.noResults, { color: colors.mutedForeground }]}>Tidak ada kopi yang cocok. Coba cari asal atau catatan rasa lain.</Text>} /></View>;
}
const styles = StyleSheet.create({ content: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 16, gap: 16 }, row: { gap: 12, alignItems: 'flex-start', flex: 1 }, filterRow: { flexDirection: 'row', gap: 8, marginTop: 2, flexWrap: 'wrap' }, filter: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20 }, result: { fontSize: 12, marginTop: -5 }, noResults: { textAlign: 'center', marginTop: 50, paddingHorizontal: 30, lineHeight: 21 } });