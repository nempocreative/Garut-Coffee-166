import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { BrandIcon } from '@/components/BrandIcon';
import { EmptyState, Header, Screen } from '@/components/AppUI';
import { regions } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const profileFields = [
  { label: 'KETINGGIAN', key: 'elevation' },
  { label: 'KARAKTER RASA', key: 'specialty' },
  { label: 'JUMLAH PETANI', key: 'farmerCount' },
] as const;

const detailFields = [
  { label: 'JENIS TANAH', value: 'Menunggu pendataan lapangan' },
  { label: 'CURAH HUJAN', value: 'Menunggu pendataan lapangan' },
  { label: 'LUAS LAHAN', value: 'Menunggu pendataan lapangan' },
];

export default function RegionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const region = regions.find((item) => item.id === id);

  if (!region) {
    return <Screen><EmptyState title="Wilayah tidak ditemukan" text="Profil wilayah yang kamu cari belum tersedia." /></Screen>;
  }

  return (
    <Screen>
      <Header title={`Profil ${region.name}`} subtitle="CERITA DARI WILAYAH" cart={false} back />
      <View style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="map-pin" size={22} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.kicker, { color: colors.accent }]}>PROFIL WILAYAH KOPI</Text>
        <Text style={[styles.heroTitle, { color: colors.card }]}>{region.name}, {region.village}</Text>
        <Text style={[styles.heroText, { color: colors.background }]}>
          Bukan hanya tentang petani, tetapi juga kondisi kebun, karakter rasa, dan musim yang membentuk kopi dari wilayah ini.
        </Text>
      </View>

      <View style={styles.stats}>
        {profileFields.map((field) => (
          <View key={field.label} style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {field.key === 'farmerCount' ? `${region[field.key]} petani` : region[field.key]}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{field.label}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.section, { color: colors.foreground }]}>Cerita wilayah</Text>
      <Text style={[styles.story, { color: colors.mutedForeground }]}>
        {region.name} dikenal dengan karakter {region.specialty.toLowerCase()}. Profil ini menjadi ruang untuk menghubungkan cerita kebun, kelompok tani, pengolah, cafe mitra, dan pembeli dalam satu asal yang jelas.
      </Text>

      <Text style={[styles.section, { color: colors.foreground }]}>Data yang perlu dilengkapi</Text>
      <View style={[styles.details, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {detailFields.map((field) => (
          <View key={field.label} style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>{field.label}</Text>
            <Text style={[styles.detailValue, { color: colors.foreground }]}>{field.value}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.section, { color: colors.foreground }]}>Kalender musim kopi</Text>
      <View style={styles.seasons}>
        {['Musim berbunga', 'Musim panen', 'Musim pemupukan', 'Musim perawatan'].map((season) => (
          <View key={season} style={[styles.season, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="calendar" size={16} color={colors.primary} />
            <Text style={[styles.seasonText, { color: colors.foreground }]}>{season}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, gap: 10 },
  heroIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  kicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontSize: 25, lineHeight: 30, fontWeight: '700' },
  heroText: { fontSize: 13, lineHeight: 20, opacity: 0.86 },
  stats: { flexDirection: 'row', gap: 9 },
  stat: { flex: 1, minHeight: 75, borderRadius: 16, borderWidth: 1, padding: 11, justifyContent: 'space-between' },
  statValue: { fontSize: 15, lineHeight: 20, fontWeight: '700' },
  statLabel: { fontSize: 9, letterSpacing: 0.7, fontWeight: '700' },
  section: { fontSize: 19, fontWeight: '700' },
  story: { fontSize: 13, lineHeight: 21, marginTop: -12 },
  details: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 14 },
  detailRow: { minHeight: 53, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(120, 90, 60, 0.12)' },
  detailLabel: { fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  detailValue: { fontSize: 12, marginTop: 4 },
  seasons: { gap: 8 },
  season: { borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  seasonText: { fontSize: 13, fontWeight: '700' },
});