import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { coffeePrices, hubStats, regions } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function DashboardScreen() {
  const colors = useColors();
  return <Screen><Header title="Dashboard dinas" subtitle="DATA PERTANIAN KOPI" cart={false} back /><View style={[styles.adminBanner, { backgroundColor: colors.primary }]}><BrandIcon name="bar-chart-2" size={22} color={colors.primaryForeground} /><View><Text style={[styles.bannerTitle, { color: colors.primaryForeground }]}>G-Beans Hub</Text><Text style={[styles.bannerText, { color: colors.background }]}>Ringkasan ekosistem Garut Beans</Text></View></View><View style={styles.stats}>{hubStats.map((stat) => <View key={stat.label} style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.value, { color: colors.primary }]}>{stat.value}</Text><Text style={[styles.label, { color: colors.mutedForeground }]}>{stat.label}</Text></View>)}</View><View style={styles.heading}><Text style={[styles.section, { color: colors.foreground }]}>Sebaran wilayah</Text><Text style={[styles.updated, { color: colors.mutedForeground }]}>Diperbarui hari ini</Text></View>{regions.map((region) => <View key={region.id} style={styles.region}><View style={[styles.regionIcon, { backgroundColor: colors.secondary }]}><BrandIcon name="map-pin" size={16} color={colors.primary} /></View><View style={styles.regionCopy}><Text style={[styles.regionName, { color: colors.foreground }]}>{region.name}</Text><Text style={[styles.regionMeta, { color: colors.mutedForeground }]}>{region.farmerCount} petani · {region.elevation}</Text></View><Text style={[styles.regionValue, { color: colors.primary }]}>{region.specialty}</Text></View>)}<Text style={[styles.section, { color: colors.foreground }]}>Harga acuan</Text>{coffeePrices.slice(0, 3).map((item) => <View key={item.label} style={[styles.price, { borderBottomColor: colors.border }]}><Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>{item.label}</Text><Text style={[styles.priceValue, { color: colors.foreground }]}>{item.price} <Text style={[styles.priceUnit, { color: colors.mutedForeground }]}>{item.unit}</Text></Text></View>)}</Screen>;
}

const styles = StyleSheet.create({
  adminBanner: { borderRadius: 19, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  bannerTitle: { fontSize: 18, fontWeight: '700' },
  bannerText: { fontSize: 12, marginTop: 3, opacity: 0.85 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  stat: { width: '48.5%', borderWidth: 1, borderRadius: 16, padding: 13, gap: 3 },
  value: { fontSize: 22, fontWeight: '800' },
  label: { fontSize: 11 },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  section: { fontSize: 19, fontWeight: '700', marginTop: 2 },
  updated: { fontSize: 10 },
  region: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  regionIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  regionCopy: { flex: 1, gap: 2 },
  regionName: { fontSize: 14, fontWeight: '700' },
  regionMeta: { fontSize: 11 },
  regionValue: { maxWidth: 95, textAlign: 'right', fontSize: 10, fontWeight: '700' },
  price: { paddingVertical: 12, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' },
  priceLabel: { fontSize: 13 },
  priceValue: { fontSize: 13, fontWeight: '700' },
  priceUnit: { fontSize: 10, fontWeight: '400' },
});