import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrandIcon } from '@/components/BrandIcon';
import { Header, Screen } from '@/components/AppUI';
import { collectiveModules } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

export default function CollectiveScreen() {
  const colors = useColors();

  return (
    <Screen>
      <Header title="Garut Coffee Collective" subtitle="SATU EKOSISTEM KOPI" cart={false} back />
      <View style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="coffee" size={24} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.heroKicker, { color: colors.accent }]}>KOPI GARUT UNTUK BANYAK ORANG</Text>
        <Text style={[styles.heroTitle, { color: colors.card }]}>Satu ekosistem untuk tumbuh bersama.</Text>
        <Text style={[styles.heroText, { color: colors.background }]}>
          Semua petani, cafe mitra, roastery, wisata, dan event kopi Garut dalam satu ruang yang dikelola bersama.
        </Text>
      </View>

      <View style={styles.intro}>
        <Text style={[styles.sectionKicker, { color: colors.primary }]}>RUANG EKOSISTEM</Text>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Dari kebun sampai pasar</Text>
        <Text style={[styles.sectionText, { color: colors.mutedForeground }]}>
          Temukan informasi produksi, pembelajaran, peluang kerja sama, dan pengalaman kopi Garut dalam satu perjalanan.
        </Text>
      </View>

      <View style={styles.grid}>
        {collectiveModules.map((module) => (
          <View
            key={module.id}
            style={[
              styles.module,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.moduleIcon, { backgroundColor: colors.secondary }]}>
              <BrandIcon name={module.icon} size={19} color={colors.primary} />
            </View>
            <Text style={[styles.moduleTitle, { color: colors.foreground }]}>{module.title}</Text>
            <Text style={[styles.moduleDescription, { color: colors.mutedForeground }]}>{module.description}</Text>
            <View style={styles.itemList}>
              {module.items.slice(0, 4).map((item) => (
                <View key={item} style={styles.item}>
                  <View style={[styles.itemDot, { backgroundColor: colors.accent }]} />
                  <Text style={[styles.itemText, { color: colors.foreground }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.closing, { backgroundColor: colors.secondary }]}>
        <BrandIcon name="users" size={22} color={colors.primary} />
        <View style={styles.closingCopy}>
          <Text style={[styles.closingTitle, { color: colors.foreground }]}>Cari kopi Garut, temukan ekosistemnya.</Text>
          <Text style={[styles.closingText, { color: colors.secondaryForeground }]}>
            Bukan hanya puluhan brand yang berjalan sendiri, tetapi satu gerakan bersama untuk data, promosi, edukasi, dan pengembangan ekonomi kopi Garut.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, gap: 10 },
  heroIcon: { width: 52, height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  heroKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontSize: 25, lineHeight: 30, fontWeight: '700', maxWidth: 300 },
  heroText: { fontSize: 13, lineHeight: 20, opacity: 0.86 },
  intro: { gap: 5 },
  sectionKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  sectionTitle: { fontSize: 21, lineHeight: 26, fontWeight: '700' },
  sectionText: { fontSize: 13, lineHeight: 20, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  module: { width: '48.5%', borderWidth: 1, borderRadius: 18, padding: 13, gap: 8 },
  moduleIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  moduleTitle: { fontSize: 14, lineHeight: 18, fontWeight: '700' },
  moduleDescription: { fontSize: 11, lineHeight: 16, minHeight: 48 },
  itemList: { gap: 5, marginTop: 2 },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  itemDot: { width: 5, height: 5, borderRadius: 3, marginTop: 5 },
  itemText: { flex: 1, fontSize: 10, lineHeight: 14 },
  closing: { borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  closingCopy: { flex: 1, gap: 5 },
  closingTitle: { fontSize: 15, lineHeight: 20, fontWeight: '700' },
  closingText: { fontSize: 12, lineHeight: 18 },
});