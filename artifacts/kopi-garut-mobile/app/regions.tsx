import React from 'react';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { regions } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

export default function RegionsScreen() {
  const colors = useColors();
  return <Screen><Header title="Peta Kopi Garut" subtitle="WILAYAH DAN KEBUN" cart={false} back /><View style={[styles.mapCard, { backgroundColor: colors.secondary }]}><View style={styles.mapTop}><View><Text style={[styles.mapKicker, { color: colors.primary }]}>JEJAK WILAYAH</Text><Text style={[styles.mapTitle, { color: colors.foreground }]}>12 wilayah aktif</Text></View><View style={[styles.mapIcon, { backgroundColor: colors.card }]}><Feather name="map" size={22} color={colors.primary} /></View></View><View style={[styles.routeLine, { backgroundColor: colors.border }]}><View style={[styles.routeDot, { backgroundColor: colors.primary, borderColor: colors.background }]} /><View style={[styles.routeDot, { backgroundColor: colors.accent, borderColor: colors.background }]} /><View style={[styles.routeDot, { backgroundColor: colors.primary, borderColor: colors.background }]} /><View style={[styles.routeDot, { backgroundColor: colors.accent, borderColor: colors.background }]} /></View><Text style={[styles.mapText, { color: colors.mutedForeground }]}>Kebun, kelompok tani, pengolah, cafe mitra, dan roastery dalam satu peta.</Text></View><Text style={[styles.section, { color: colors.foreground }]}>Wilayah utama</Text><View style={styles.list}>{regions.map((region) => <View key={region.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}><Image source={region.image} contentFit="cover" style={styles.image} /><View style={styles.copy}><Text style={[styles.name, { color: colors.foreground }]}>{region.name}</Text><Text style={[styles.meta, { color: colors.primary }]}>{region.village} · {region.elevation}</Text><Text style={[styles.detail, { color: colors.mutedForeground }]}>{region.farmerCount} petani · {region.specialty}</Text></View><Feather name="arrow-up-right" size={18} color={colors.primary} /></View>)}</View></Screen>;
}

const styles = StyleSheet.create({
  mapCard: { borderRadius: 21, padding: 18, gap: 18 },
  mapTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mapKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  mapTitle: { fontSize: 22, fontWeight: '700', marginTop: 4 },
  mapIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  routeLine: { height: 3, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeDot: { width: 13, height: 13, borderRadius: 7, borderWidth: 3 },
  mapText: { fontSize: 13, lineHeight: 19 },
  section: { fontSize: 19, fontWeight: '700' },
  list: { gap: 10 },
  card: { borderRadius: 18, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  image: { width: 68, height: 68, borderRadius: 14 },
  copy: { flex: 1, gap: 3 },
  name: { fontSize: 15, fontWeight: '700' },
  meta: { fontSize: 11, fontWeight: '700' },
  detail: { fontSize: 11, lineHeight: 16 },
});