import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { coffeePrices, CoffeePrice } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

const ALERT_STORAGE_KEY = '@kopi-garut/price-alert-enabled';
const SNAPSHOT_STORAGE_KEY = '@kopi-garut/price-snapshot';
const grades = ['Semua', 'Grade 1', 'Grade 2', 'Standar'] as const;
type GradeFilter = (typeof grades)[number];

function getPriceSnapshot() {
  return coffeePrices.reduce<Record<string, string>>((snapshot, item) => {
    snapshot[item.label] = item.price;
    return snapshot;
  }, {});
}

export default function PricesScreen() {
  const colors = useColors();
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter>('Semua');
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [changedPrices, setChangedPrices] = useState<string[]>([]);

  useEffect(() => {
    const currentSnapshot = getPriceSnapshot();
    Promise.all([
      AsyncStorage.getItem(ALERT_STORAGE_KEY),
      AsyncStorage.getItem(SNAPSHOT_STORAGE_KEY),
    ]).then(([alertValue, snapshotValue]) => {
      const enabled = alertValue === 'true';
      setAlertsEnabled(enabled);
      if (enabled && snapshotValue) {
        try {
          const previous = JSON.parse(snapshotValue) as Record<string, string>;
          const changed = coffeePrices
            .filter((item) => previous[item.label] && previous[item.label] !== item.price)
            .map((item) => item.label);
          if (changed.length) {
            setChangedPrices(changed);
            Alert.alert('Harga kopi berubah', `${changed.join(', ')} memiliki harga acuan baru.`);
          }
        } catch {
          // A malformed local snapshot is replaced below with the current data.
        }
      }
      void AsyncStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(currentSnapshot));
    }).catch(() => {
      // The page remains useful with the current in-app price data if storage is unavailable.
    });
  }, []);

  const visibleGrades = useMemo(
    () => selectedGrade === 'Semua' ? grades.slice(1) : [selectedGrade],
    [selectedGrade],
  );

  const toggleAlerts = async () => {
    const next = !alertsEnabled;
    setAlertsEnabled(next);
    try {
      await AsyncStorage.setItem(ALERT_STORAGE_KEY, String(next));
      Alert.alert(next ? 'Notifikasi diaktifkan' : 'Notifikasi dimatikan', next
        ? 'Kamu akan melihat pemberitahuan saat acuan harga berubah.'
        : 'Pemberitahuan perubahan harga tidak akan ditampilkan.');
    } catch {
      setAlertsEnabled(!next);
    }
  };

  return (
    <Screen>
      <Header title="Harga kopi" subtitle="PETANI · REFERENSI PASAR" cart={false} back />
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <BrandIcon name="trending-up" size={24} color={colors.primaryForeground} />
        <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Bandingkan harga sebelum melepas hasil panen.</Text>
        <Text style={[styles.heroText, { color: colors.background }]}>Gunakan harga acuan ini untuk membaca nilai cherry, gabah, green bean, dan roasted bean.</Text>
      </View>

      <View style={[styles.alertCard, { backgroundColor: alertsEnabled ? colors.secondary : colors.card, borderColor: alertsEnabled ? colors.primary : colors.border }]}>
        <View style={[styles.alertIcon, { backgroundColor: alertsEnabled ? colors.primary : colors.secondary }]}>
          <BrandIcon name="bell" size={18} color={alertsEnabled ? colors.primaryForeground : colors.primary} />
        </View>
        <View style={styles.alertCopy}>
          <Text style={[styles.alertTitle, { color: colors.foreground }]}>Notifikasi perubahan harga</Text>
          <Text style={[styles.alertDescription, { color: colors.mutedForeground }]}>Beri tahu saya jika acuan harga di aplikasi berubah.</Text>
        </View>
        <Pressable testID="price-alert-toggle" accessibilityRole="switch" accessibilityLabel="Aktifkan notifikasi perubahan harga" accessibilityState={{ checked: alertsEnabled }} onPress={() => void toggleAlerts()} style={({ pressed }) => [styles.toggle, { backgroundColor: alertsEnabled ? colors.primary : colors.muted, opacity: pressed ? 0.75 : 1 }]}>
          <View style={[styles.toggleKnob, { backgroundColor: alertsEnabled ? colors.primaryForeground : colors.mutedForeground, alignSelf: alertsEnabled ? 'flex-end' : 'flex-start' }]} />
        </Pressable>
      </View>

      {changedPrices.length > 0 && (
        <View style={[styles.changedBanner, { backgroundColor: colors.accent }]}>
          <BrandIcon name="alert-circle" size={18} color={colors.accentForeground} />
          <Text style={[styles.changedText, { color: colors.accentForeground }]}>Harga berubah: {changedPrices.join(', ')}. Periksa acuan terbaru sebelum menjual.</Text>
        </View>
      )}

      <Text style={[styles.section, { color: colors.foreground }]}>Harga acuan Kopi Garut</Text>
      <Text style={[styles.updated, { color: colors.mutedForeground }]}>Pembaruan terakhir: data acuan platform</Text>

      <View style={styles.gradeFilters}>
        {grades.map((grade) => {
          const selected = selectedGrade === grade;
          return <Pressable key={grade} testID={`price-grade-${grade.toLowerCase().replace(' ', '-')}`} accessibilityRole="button" accessibilityLabel={`Tampilkan harga ${grade}`} accessibilityState={{ selected }} onPress={() => setSelectedGrade(grade)} style={({ pressed }) => [styles.gradeFilter, { backgroundColor: selected ? colors.primary : colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}><Text style={[styles.gradeFilterText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{grade}</Text></Pressable>;
        })}
      </View>

      <View style={styles.grid}>
        {coffeePrices.map((item) => <PriceCard key={item.label} item={item} visibleGrades={visibleGrades} colors={colors} />)}
      </View>

      <View style={[styles.note, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="info" size={18} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Harga di layar adalah acuan, bukan jaminan harga transaksi. Konfirmasi dengan koperasi atau pembeli sebelum menjual.</Text>
      </View>
    </Screen>
  );
}

function PriceCard({ item, visibleGrades, colors }: { item: CoffeePrice; visibleGrades: readonly string[]; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>{item.label}</Text>
      <Text style={[styles.currentPrice, { color: colors.foreground }]}>{item.price}</Text>
      <Text style={[styles.unit, { color: colors.mutedForeground }]}>{item.unit} · {item.change}</Text>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      {visibleGrades.map((grade) => {
        const gradePrice = item.grades.find((entry) => entry.label === grade);
        return <View key={grade} style={styles.gradeRow}><Text style={[styles.gradeLabel, { color: colors.mutedForeground }]}>{grade}</Text><Text style={[styles.gradePrice, { color: colors.primary }]}>{gradePrice?.price ?? '—'}</Text></View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 21, padding: 18, gap: 10 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, maxWidth: 300 },
  heroText: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 19, opacity: 0.9 },
  alertCard: { borderWidth: 1, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  alertIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  alertCopy: { flex: 1, gap: 3 },
  alertTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12 },
  alertDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  toggle: { width: 42, height: 25, borderRadius: 14, padding: 3, justifyContent: 'center' },
  toggleKnob: { width: 19, height: 19, borderRadius: 10 },
  changedBanner: { borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  changedText: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 16 },
  section: { fontFamily: 'Manrope_700Bold', fontSize: 19 },
  updated: { fontFamily: 'Manrope_400Regular', fontSize: 10, marginTop: -7 },
  gradeFilters: { flexDirection: 'row', gap: 7 },
  gradeFilter: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 11, paddingVertical: 8 },
  gradeFilterText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  grid: { gap: 10 },
  card: { borderWidth: 1, borderRadius: 17, padding: 13, gap: 4 },
  label: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  currentPrice: { fontFamily: 'Manrope_700Bold', fontSize: 18, marginTop: 4 },
  unit: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  divider: { height: 1, marginVertical: 6 },
  gradeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3 },
  gradeLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  gradePrice: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  note: { borderRadius: 17, padding: 15, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 19 },
});