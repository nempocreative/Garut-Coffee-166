import React from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert as NativeAlert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/AppUI';
import { coffeeTours } from '@/data/hub';
import { formatPrice } from '@/data/coffees';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function TourismScreen() {
  const colors = useColors();
  const book = (title: string) => NativeAlert.alert('Minat dicatat', `Tim kami akan menghubungi kamu untuk paket ${title}.`);
  return (
    <Screen>
      <Header title="Wisata kopi" subtitle="DATANG DAN BAWA CERITA" cart={false} back />
      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Image source={coffeeTours[0].image} contentFit="cover" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.foreground, opacity: 0.58 }]} />
        <View style={[styles.heroGlow, { backgroundColor: colors.accent }]} />
        <View style={styles.heroTop}>
          <View style={[styles.heroKicker, { backgroundColor: colors.primaryForeground }]}>
            <BrandIcon name="compass" size={13} color={colors.primary} />
            <Text style={[styles.heroKickerText, { color: colors.primary }]}>PENGALAMAN PILIHAN</Text>
          </View>
          <View style={[styles.heroCount, { backgroundColor: colors.primary }]}>
            <Text style={[styles.heroCountText, { color: colors.primaryForeground }]}>3 rute</Text>
          </View>
        </View>
        <View style={styles.heroCopy}>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>Datang sebagai tamu, pulang bawa cerita.</Text>
          <Text style={[styles.heroDescription, { color: colors.primaryForeground }]}>Rasakan Garut dari kebunnya: belajar, tinggal lebih lama, dan bertemu orang-orang di balik kopi.</Text>
        </View>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={[styles.heroStatValue, { color: colors.primaryForeground }]}>3</Text>
            <Text style={[styles.heroStatLabel, { color: colors.primaryForeground }]}>pengalaman</Text>
          </View>
          <View style={[styles.heroDivider, { backgroundColor: colors.primaryForeground }]} />
          <View style={styles.heroStat}>
            <Text style={[styles.heroStatValue, { color: colors.primaryForeground }]}>1–2</Text>
            <Text style={[styles.heroStatLabel, { color: colors.primaryForeground }]}>hari perjalanan</Text>
          </View>
          <View style={[styles.heroDivider, { backgroundColor: colors.primaryForeground }]} />
          <View style={styles.heroStat}>
            <Text style={[styles.heroStatValue, { color: colors.primaryForeground }]}>Garut</Text>
            <Text style={[styles.heroStatLabel, { color: colors.primaryForeground }]}>dataran tinggi</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.sectionHeading}>
        <View>
          <Text style={[styles.sectionEyebrow, { color: colors.primary }]}>PILIH PERJALANANMU</Text>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Cerita yang bisa kamu datangi.</Text>
        </View>
      </View>
      <View style={styles.list}>
        {coffeeTours.map((tour, index) => (
          <View key={tour.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.imageWrap}>
              <Image source={tour.image} contentFit="cover" style={styles.image} />
              <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.foreground, opacity: 0.16 }]} />
              <View style={[styles.typeBadge, { backgroundColor: colors.primaryForeground }]}>
                <Text style={[styles.type, { color: colors.primary }]}>{tour.type}</Text>
              </View>
              <View style={[styles.durationBadge, { backgroundColor: colors.foreground }]}>
                <BrandIcon name="calendar" size={12} color={colors.primaryForeground} />
                <Text style={[styles.duration, { color: colors.primaryForeground }]}>{tour.duration}</Text>
              </View>
              {index === 0 && <View style={[styles.featuredBadge, { backgroundColor: colors.accent }]}><Text style={[styles.featuredText, { color: colors.accentForeground }]}>PALING DICARI</Text></View>}
            </View>
            <View style={styles.copy}>
              <Text style={[styles.title, { color: colors.foreground }]}>{tour.title}</Text>
              <View style={styles.locationRow}>
                <BrandIcon name="map-pin" size={13} color={colors.primary} />
                <Text style={[styles.location, { color: colors.primary }]}>{tour.location}, Garut</Text>
              </View>
              <Text style={[styles.detail, { color: colors.mutedForeground }]}>{tour.description}</Text>
              <View style={[styles.footer, { borderTopColor: colors.border }]}>
                <View style={styles.priceCopy}>
                  <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>MULAI DARI</Text>
                  <Text style={[styles.price, { color: colors.primary }]}>{formatPrice(tour.price)}<Text style={[styles.unit, { color: colors.mutedForeground }]}> / orang</Text></Text>
                </View>
                <Pressable testID={`tour-book-${tour.id}`} accessibilityRole="button" accessibilityLabel={`Pesan ${tour.title}`} onPress={() => book(tour.title)} style={({ pressed }) => [styles.book, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}>
                  <Text style={[styles.bookText, { color: colors.primaryForeground }]}>Pesan</Text>
                  <BrandIcon name="arrow-up-right" size={14} color={colors.primaryForeground} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}>
        <View style={[styles.noteIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="users" size={16} color={colors.primaryForeground} />
        </View>
        <View style={styles.noteCopy}>
          <Text style={[styles.noteTitle, { color: colors.foreground }]}>Datang bersama rombongan?</Text>
          <Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Paket dapat disesuaikan untuk komunitas, sekolah, cafe, dan rombongan.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 300, borderRadius: 24, padding: 18, overflow: 'hidden', justifyContent: 'space-between', gap: 16 },
  heroGlow: { position: 'absolute', width: 155, height: 155, borderRadius: 78, right: -48, top: -50, opacity: 0.2 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  heroKicker: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6 },
  heroKickerText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.05 },
  heroCount: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  heroCountText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  heroCopy: { gap: 8, maxWidth: 300 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 26, lineHeight: 31, letterSpacing: -0.7 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, opacity: 0.82 },
  heroStats: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  heroStat: { gap: 2 },
  heroStatValue: { fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '800' },
  heroStatLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9, opacity: 0.7 },
  heroDivider: { width: 1, height: 28, opacity: 0.25 },
  sectionHeading: { gap: 5 },
  sectionEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.5, marginBottom: 5 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 21, lineHeight: 26, letterSpacing: -0.45 },
  list: { gap: 14 },
  card: { borderWidth: 1, borderRadius: 21, overflow: 'hidden' },
  imageWrap: { height: 168, position: 'relative' },
  image: { width: '100%', height: '100%' },
  typeBadge: { position: 'absolute', left: 12, top: 12, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6 },
  type: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.75, textTransform: 'uppercase' },
  durationBadge: { position: 'absolute', right: 12, top: 12, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  duration: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  featuredBadge: { position: 'absolute', bottom: 11, left: 12, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 5 },
  featuredText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  copy: { padding: 15, gap: 8 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 23, fontWeight: '800', letterSpacing: -0.25 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  location: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  detail: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, paddingTop: 11, borderTopWidth: 1, gap: 10 },
  priceCopy: { gap: 2, flex: 1 },
  priceLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  price: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '800' },
  unit: { fontFamily: 'Manrope_400Regular', fontSize: 10, fontWeight: '400' },
  book: { borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  bookText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  note: { borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  noteCopy: { flex: 1, gap: 3 },
  noteTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  noteText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});