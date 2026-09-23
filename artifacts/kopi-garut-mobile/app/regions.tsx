import React from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { regions } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function RegionsScreen() {
  const colors = useColors();
  const router = useRouter();
  return (
    <Screen>
      <Header title="Peta Garut Beans" subtitle="WILAYAH DAN KEBUN" cart={false} back />
      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mapCard}
      >
        <Image source={require('../assets/images/mountain-banner.webp')} contentFit="cover" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.foreground, opacity: 0.58 }]} />
        <View style={[styles.mapGlow, { backgroundColor: colors.accent }]} />
        <View style={styles.mapTop}>
          <View style={styles.mapHeading}>
            <View style={[styles.mapKickerRow, { backgroundColor: colors.primaryForeground }]}>
              <BrandIcon name="map" size={12} color={colors.primary} />
              <Text style={[styles.mapKicker, { color: colors.primary }]}>JEJAK WILAYAH</Text>
            </View>
            <Text style={[styles.mapTitle, { color: colors.primaryForeground }]}>Dari lereng ke cangkir.</Text>
            <Text style={[styles.mapText, { color: colors.primaryForeground }]}>Kenali kebun, petani, dan karakter rasa dari tiap sudut Garut.</Text>
          </View>
          <View style={[styles.mapIcon, { backgroundColor: colors.card }]}>
            <BrandIcon name="compass" size={22} color={colors.primary} />
          </View>
        </View>
        <View style={styles.routeBlock}>
          <View style={[styles.routeLine, { backgroundColor: colors.primaryForeground }]} />
          <View style={styles.routeDots}>
            <View style={[styles.routeDot, { backgroundColor: colors.primary, borderColor: colors.primaryForeground }]} />
            <View style={[styles.routeDot, { backgroundColor: colors.accent, borderColor: colors.primaryForeground }]} />
            <View style={[styles.routeDot, { backgroundColor: colors.primary, borderColor: colors.primaryForeground }]} />
            <View style={[styles.routeDot, { backgroundColor: colors.accent, borderColor: colors.primaryForeground }]} />
          </View>
        </View>
        <View style={styles.mapStats}>
          <View style={styles.mapStat}>
            <Text style={[styles.mapStatValue, { color: colors.primaryForeground }]}>4</Text>
            <Text style={[styles.mapStatLabel, { color: colors.primaryForeground }]}>wilayah kurasi</Text>
          </View>
          <View style={[styles.mapStatDivider, { backgroundColor: colors.primaryForeground }]} />
          <View style={styles.mapStat}>
            <Text style={[styles.mapStatValue, { color: colors.primaryForeground }]}>125+</Text>
            <Text style={[styles.mapStatLabel, { color: colors.primaryForeground }]}>petani terhubung</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.sectionHeading}>
        <View>
          <Text style={[styles.sectionEyebrow, { color: colors.primary }]}>PILIH DESTINASIMU</Text>
          <Text style={[styles.section, { color: colors.foreground }]}>Wilayah utama</Text>
        </View>
        <View style={[styles.sectionCount, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.sectionCountText, { color: colors.primary }]}>{regions.length} zona</Text>
        </View>
      </View>
      <Text style={[styles.sectionDescription, { color: colors.mutedForeground }]}>Setiap wilayah punya elevasi, petani, dan profil rasa yang berbeda.</Text>
      <View style={styles.list}>
        {regions.map((region) => (
          <Pressable
            key={region.id}
            testID={`region-card-${region.id}`}
            accessibilityRole="button"
            accessibilityLabel={`Buka profil wilayah ${region.name}`}
            onPress={() => router.push(`/region/${region.id}`)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 },
            ]}
          >
            <Image source={region.image} contentFit="cover" style={styles.image} />
            <View style={styles.copy}>
              <View style={styles.cardHeading}>
                <Text style={[styles.name, { color: colors.foreground }]}>{region.name}</Text>
                <View style={[styles.farmerPill, { backgroundColor: colors.secondary }]}>
                  <BrandIcon name="users" size={11} color={colors.primary} />
                  <Text style={[styles.farmerPillText, { color: colors.primary }]}>{region.farmerCount}</Text>
                </View>
              </View>
              <Text style={[styles.specialty, { color: colors.primary }]}>{region.specialty}</Text>
              <View style={styles.metaRow}>
                <BrandIcon name="map-pin" size={12} color={colors.mutedForeground} />
                <Text style={[styles.meta, { color: colors.mutedForeground }]}>{region.village}</Text>
                <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
                <Text style={[styles.meta, { color: colors.mutedForeground }]}>{region.elevation}</Text>
              </View>
            </View>
            <View style={[styles.cardArrow, { backgroundColor: colors.secondary }]}>
              <BrandIcon name="arrow-up-right" size={17} color={colors.primary} />
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mapCard: { minHeight: 286, borderRadius: 24, padding: 18, overflow: 'hidden', justifyContent: 'space-between', gap: 18 },
  mapGlow: { position: 'absolute', width: 160, height: 160, borderRadius: 80, right: -48, top: -48, opacity: 0.18 },
  mapTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  mapHeading: { flex: 1, gap: 9 },
  mapKickerRow: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6 },
  mapKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  mapTitle: { fontFamily: 'Manrope_700Bold', fontSize: 25, lineHeight: 29, letterSpacing: -0.7, maxWidth: 245 },
  mapIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '8deg' }] },
  mapText: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, opacity: 0.8, maxWidth: 250 },
  routeBlock: { height: 20, justifyContent: 'center' },
  routeLine: { height: 2, opacity: 0.32 },
  routeDots: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeDot: { width: 13, height: 13, borderRadius: 7, borderWidth: 3 },
  mapStats: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  mapStat: { gap: 2 },
  mapStatValue: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '800' },
  mapStatLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10, opacity: 0.72 },
  mapStatDivider: { width: 1, height: 30, opacity: 0.24 },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 },
  sectionEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.5, marginBottom: 5 },
  section: { fontFamily: 'Manrope_700Bold', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
  sectionCount: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 1 },
  sectionCountText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  sectionDescription: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, marginTop: -12 },
  list: { gap: 11 },
  card: { minHeight: 102, borderRadius: 20, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  image: { width: 82, height: 82, borderRadius: 15 },
  copy: { flex: 1, gap: 5, minWidth: 0 },
  cardHeading: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  name: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '800', letterSpacing: -0.2 },
  farmerPill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 15, paddingHorizontal: 7, paddingVertical: 5 },
  farmerPillText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  specialty: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  meta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  metaDot: { width: 3, height: 3, borderRadius: 2, marginHorizontal: 1 },
  cardArrow: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
});