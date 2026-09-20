import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrandIcon, type BrandIconName } from '@/components/BrandIcon';
import { Header, Screen } from '@/components/AppUI';
import { useColors } from '@/hooks/useColors';

type HubRoute =
  | '/farmers'
  | '/regions'
  | '/traceability'
  | '/events'
  | '/partnership'
  | '/program'
  | '/catalog'
  | '/tourism'
  | '/standards';

type Journey = {
  icon: BrandIconName;
  eyebrow: string;
  title: string;
  description: string;
  links: Array<{ label: string; detail: string; route: HubRoute }>;
};

const journeys: Journey[] = [
  {
    icon: 'map',
    eyebrow: 'ASAL KOPI',
    title: 'Kenali dari mana kopi datang',
    description: 'Mulai dari orang, wilayah, dan perjalanan yang membuat setiap produk punya asal.',
    links: [
      { label: 'Petani & kebun', detail: 'Cerita orang di balik kopi', route: '/farmers' },
      { label: 'Wilayah kopi', detail: 'Karakter dari setiap lereng', route: '/regions' },
      { label: 'Jejak kopi', detail: 'Lacak dari lot sampai cangkir', route: '/traceability' },
    ],
  },
  {
    icon: 'users',
    eyebrow: 'TUMBUH BERSAMA',
    title: 'Temui orang-orangnya',
    description: 'Ruang untuk bertemu, belajar, dan membuka peluang bersama ekosistem Kopi Garut.',
    links: [
      { label: 'Event & pelatihan', detail: 'Agenda yang bisa diikuti', route: '/events' },
      { label: 'Jadi mitra', detail: 'Bawa kopi Garut ke usahamu', route: '/partnership' },
      { label: 'Program kopi', detail: 'Layanan sesuai peranmu', route: '/program' },
    ],
  },
  {
    icon: 'coffee',
    eyebrow: 'JELAJAHI RASANYA',
    title: 'Pilih cara menikmati',
    description: 'Temukan kopi, pengalaman, dan standar yang membuat perjalananmu lebih lengkap.',
    links: [
      { label: 'Katalog kopi', detail: 'Pilih produk untuk di rumah', route: '/catalog' },
      { label: 'Wisata kopi', detail: 'Datang dan rasakan langsung', route: '/tourism' },
      { label: 'Standar kopi', detail: 'Kenali mutu yang dijaga', route: '/standards' },
    ],
  },
];

export default function CollectiveScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <Screen>
      <Header title="Ekosistem Kopi" subtitle="JELAJAHI KOPI GARUT" cart={false} back />

      <Animated.View entering={FadeInDown.duration(500)} style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="coffee" size={24} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.heroKicker, { color: colors.accent }]}>SATU KOPI, BANYAK PERJALANAN</Text>
        <Text style={[styles.heroTitle, { color: colors.card }]}>Jelajah sesuai yang ingin kamu temukan.</Text>
        <Text style={[styles.heroText, { color: colors.background }]}>
          Kenali asalnya, temui orangnya, lalu pilih cara menikmati kopi Garut.
        </Text>
      </Animated.View>

      <View style={styles.intro}>
        <Text style={[styles.introKicker, { color: colors.primary }]}>PILIH PERJALANANMU</Text>
        <Text style={[styles.introTitle, { color: colors.foreground }]}>Tidak perlu mencari semuanya sekaligus.</Text>
        <Text style={[styles.introText, { color: colors.mutedForeground }]}>
          Setiap ruang punya tujuan yang jelas. Pilih yang paling dekat dengan kebutuhanmu hari ini.
        </Text>
      </View>

      <View style={styles.journeyList}>
        {journeys.map((journey, journeyIndex) => (
          <Animated.View key={journey.eyebrow} entering={FadeInDown.delay(100 + journeyIndex * 80).duration(500)} style={[styles.journey, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.journeyHeader}>
              <View style={[styles.journeyIcon, { backgroundColor: colors.secondary }]}>
                <BrandIcon name={journey.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.journeyHeading}>
                <Text style={[styles.journeyEyebrow, { color: colors.primary }]}>{journey.eyebrow}</Text>
                <Text style={[styles.journeyTitle, { color: colors.foreground }]}>{journey.title}</Text>
              </View>
            </View>
            <Text style={[styles.journeyDescription, { color: colors.mutedForeground }]}>{journey.description}</Text>
            <View style={styles.linkList}>
              {journey.links.map((link, linkIndex) => (
                <Pressable
                  key={link.label}
                  accessibilityRole="button"
                  accessibilityLabel={`Buka ${link.label}`}
                  onPress={() => router.push(link.route as never)}
                  style={({ pressed }) => [
                    styles.linkRow,
                    { borderTopColor: colors.border, opacity: pressed ? 0.62 : 1 },
                  ]}
                >
                  <View style={[styles.linkNumber, { backgroundColor: linkIndex === 0 ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.linkNumberText, { color: linkIndex === 0 ? colors.primaryForeground : colors.primary }]}>{String(linkIndex + 1).padStart(2, '0')}</Text>
                  </View>
                  <View style={styles.linkCopy}>
                    <Text style={[styles.linkLabel, { color: colors.foreground }]}>{link.label}</Text>
                    <Text style={[styles.linkDetail, { color: colors.mutedForeground }]}>{link.detail}</Text>
                  </View>
                  <BrandIcon name="arrow-up-right" size={16} color={colors.primary} />
                </Pressable>
              ))}
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={[styles.closing, { backgroundColor: colors.secondary }]}>
        <View style={[styles.closingIcon, { backgroundColor: colors.accent }]}>
          <BrandIcon name="heart" size={19} color={colors.accentForeground} />
        </View>
        <View style={styles.closingCopy}>
          <Text style={[styles.closingTitle, { color: colors.foreground }]}>Kopi Garut punya banyak pintu.</Text>
          <Text style={[styles.closingText, { color: colors.secondaryForeground }]}>
            Masuk dari mana saja, lalu temukan cerita yang membuatmu ingin kembali.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, gap: 10 },
  heroIcon: { width: 52, height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 25, lineHeight: 30, fontWeight: '800', letterSpacing: -0.55, maxWidth: 310 },
  heroText: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20, opacity: 0.86 },
  intro: { gap: 5, marginTop: 1 },
  introKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  introTitle: { fontFamily: 'Manrope_700Bold', fontSize: 21, lineHeight: 26, fontWeight: '800', letterSpacing: -0.45 },
  introText: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20, marginTop: 2 },
  journeyList: { gap: 11 },
  journey: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 11 },
  journeyHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  journeyIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  journeyHeading: { flex: 1, gap: 3 },
  journeyEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.25 },
  journeyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, lineHeight: 20, fontWeight: '800' },
  journeyDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17 },
  linkList: { gap: 0 },
  linkRow: { minHeight: 57, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 8 },
  linkNumber: { width: 29, height: 29, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  linkNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800' },
  linkCopy: { flex: 1, gap: 2 },
  linkLabel: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  linkDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  closing: { borderRadius: 19, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 11 },
  closingIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  closingCopy: { flex: 1, gap: 3 },
  closingTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '800' },
  closingText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});