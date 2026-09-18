import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { coffeePrices } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

export default function PricesScreen() {
  const colors = useColors();
  return <Screen><Header title="Harga kopi" subtitle="TRANSPARANSI PASAR" cart={false} back /><View style={[styles.hero, { backgroundColor: colors.primary }]}><Feather name="trending-up" size={24} color={colors.primaryForeground} /><Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Harga yang terbuka, keputusan yang lebih baik.</Text><Text style={[styles.heroText, { color: colors.background }]}>Pantau rata-rata harga kopi Garut dari cherry sampai biji sangrai.</Text></View><Text style={[styles.section, { color: colors.foreground }]}>Harga rata-rata hari ini</Text><View style={styles.grid}>{coffeePrices.map((item) => <View key={item.label} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.label, { color: colors.mutedForeground }]}>{item.label}</Text><Text style={[styles.price, { color: colors.foreground }]}>{item.price}</Text><Text style={[styles.unit, { color: colors.mutedForeground }]}>{item.unit}</Text><View style={styles.change}><Feather name={item.change.startsWith('+') ? 'arrow-up-right' : 'minus'} size={13} color={colors.primary} /><Text style={[styles.changeText, { color: colors.primary }]}>{item.change}</Text></View></View>)}</View><View style={[styles.note, { backgroundColor: colors.secondary }]}><Feather name="shield" size={18} color={colors.primary} /><Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Data ditampilkan sebagai referensi pasar dan diperbarui bersama mitra ekosistem Kopi Garut.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  hero: { borderRadius: 21, padding: 18, gap: 10 },
  heroTitle: { fontSize: 22, lineHeight: 27, fontWeight: '700', maxWidth: 300 },
  heroText: { fontSize: 13, lineHeight: 19, opacity: 0.9 },
  section: { fontSize: 19, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: { width: '48.5%', borderWidth: 1, borderRadius: 17, padding: 13, gap: 4 },
  label: { fontSize: 11, lineHeight: 16 },
  price: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  unit: { fontSize: 10 },
  change: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 6 },
  changeText: { fontSize: 10, fontWeight: '700' },
  note: { borderRadius: 17, padding: 15, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  noteText: { flex: 1, fontSize: 12, lineHeight: 19 },
});