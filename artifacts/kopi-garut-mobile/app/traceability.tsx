import React, { useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, Screen } from '@/components/AppUI';
import { coffeeLots, coffees } from '@/data/coffees';
import { farmers } from '@/data/hub';
import { useColors } from '@/hooks/useColors';
import { BrandIcon } from '@/components/BrandIcon';

export default function TraceabilityScreen() {
  const colors = useColors();
  const router = useRouter();
  const { lotId } = useLocalSearchParams<{ lotId?: string }>();
  const [scanned, setScanned] = useState(Boolean(lotId));
  const lot = coffeeLots.find((item) => item.id === lotId) ?? coffeeLots[0];
  const coffee = coffees.find((item) => item.id === lot.coffeeId) ?? coffees[0];
  const farmer = farmers.find((item) => item.group === coffee.farmerGroup) ?? farmers[0];
  return (
    <Screen>
      <Header title="Jejak produk" cart={false} back />
      <View style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <View style={styles.heroTop}>
          <View style={[styles.qr, { backgroundColor: colors.card }]}>
            <BrandIcon name="maximize" size={42} color={colors.primary} />
          </View>
          <View style={[styles.heroBadge, { backgroundColor: colors.secondary }]}>
            <View style={[styles.heroBadgeDot, { backgroundColor: colors.accent }]} />
            <Text style={[styles.heroBadgeText, { color: colors.secondaryForeground }]}>TERLACAK</Text>
          </View>
        </View>
        <Text style={[styles.heroKicker, { color: colors.accent }]}>SCAN QR KEMASAN</Text>
        <Text style={[styles.heroTitle, { color: colors.card }]}>Satu scan, satu cerita utuh.</Text>
        <Text style={[styles.heroText, { color: colors.background }]}>
          Kenali kebun, proses, dan rasa yang akhirnya sampai di cangkir.
        </Text>
        <Pressable
          testID="traceability-scan"
          onPress={() => setScanned(true)}
          style={({ pressed }) => [styles.scanButton, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}
        >
          <BrandIcon name={scanned ? 'check' : 'maximize'} size={16} color={colors.primaryForeground} />
          <Text style={[styles.scanText, { color: colors.primaryForeground }]}>
            {scanned ? 'Cerita terbuka' : 'Buka cerita kopi'}
          </Text>
        </Pressable>
      </View>

      {scanned && (
        <Animated.View entering={FadeInDown.duration(500)} style={styles.result}>
          <View style={[styles.scanSuccess, { backgroundColor: colors.secondary }]}>
            <View style={[styles.successIcon, { backgroundColor: colors.primary }]}>
              <BrandIcon name="check" size={17} color={colors.primaryForeground} />
            </View>
            <View style={styles.successCopy}>
              <Text style={[styles.resultKicker, { color: colors.primary }]}>SCAN BERHASIL</Text>
              <Text style={[styles.successTitle, { color: colors.foreground }]}>Kemasan ini punya cerita.</Text>
            </View>
            <Text style={[styles.successLot, { color: colors.mutedForeground }]}>{lot.id}</Text>
          </View>

          <View style={styles.imageFrame}>
            <Image source={coffee.image} contentFit="cover" style={styles.image} />
            <LinearGradient colors={['transparent', colors.foreground]} style={styles.imageShade} />
            <View style={styles.imageOverlay}>
              <View>
                <Text style={[styles.imageKicker, { color: colors.accent }]}>ASAL KOPI</Text>
                <Text style={[styles.imageTitle, { color: colors.card }]}>{lot.region}, Garut</Text>
              </View>
              <View style={[styles.verifiedPill, { backgroundColor: colors.card }]}>
                <BrandIcon name="shield" size={13} color={colors.primary} />
                <Text style={[styles.verifiedText, { color: colors.foreground }]}>TERVERIFIKASI</Text>
              </View>
            </View>
          </View>

          <View style={styles.resultCopy}>
            <Text style={[styles.resultKicker, { color: colors.primary }]}>LOT {lot.id}</Text>
            <Text style={[styles.resultTitle, { color: colors.foreground }]}>{coffee.name}</Text>
            <Text style={[styles.resultMeta, { color: colors.mutedForeground }]}>
              {lot.variety} · {farmer.name} · {farmer.group}
            </Text>
          </View>

          <View style={[styles.storyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.storyHeader}>
              <View style={[styles.storyIcon, { backgroundColor: colors.accent }]}>
                <BrandIcon name="coffee" size={18} color={colors.accentForeground} />
              </View>
              <Text style={[styles.sectionKicker, { color: colors.primary }]}>CERITA DI BALIK CANGKIR</Text>
            </View>
            <Text style={[styles.storyTitle, { color: colors.foreground }]}>{lot.storyTitle}</Text>
            <Text style={[styles.storyText, { color: colors.mutedForeground }]}>{lot.story}</Text>
            <View style={[styles.storyQuote, { borderTopColor: colors.border }]}>
              <Text style={[styles.quoteText, { color: colors.foreground }]}>
                “Setiap tegukan membawa sedikit udara sejuk Papandayan.”
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={[styles.sectionKicker, { color: colors.primary }]}>PERJALANAN LOT</Text>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Dari kebun sampai cangkir</Text>
            </View>
            <Text style={[styles.sectionMeta, { color: colors.mutedForeground }]}>3 tahap</Text>
          </View>

          <View style={[styles.timeline, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {lot.journey.map((step, index) => (
              <View key={step.label} style={styles.timelineRow}>
                <View style={styles.timelineRail}>
                  <View style={[styles.timelineDot, { backgroundColor: index === lot.journey.length - 1 ? colors.primary : colors.accent }]}>
                    <Text style={[styles.timelineIndex, { color: colors.primaryForeground }]}>{index + 1}</Text>
                  </View>
                  {index < lot.journey.length - 1 && <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />}
                </View>
                <View style={styles.timelineCopy}>
                  <Text style={[styles.timelineLabel, { color: colors.primary }]}>{step.label.toUpperCase()}</Text>
                  <Text style={[styles.timelineTitle, { color: colors.foreground }]}>{step.title}</Text>
                  <Text style={[styles.timelineDetail, { color: colors.mutedForeground }]}>{step.detail}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.tastingCard, { backgroundColor: colors.primary }]}>
            <View style={styles.tastingTop}>
              <View>
                <Text style={[styles.sectionKicker, { color: colors.accent }]}>SAAT KAMU MENIKMATINYA</Text>
                <Text style={[styles.tastingTitle, { color: colors.primaryForeground }]}>Yang terasa di cangkir</Text>
              </View>
              <BrandIcon name="coffee" size={25} color={colors.primaryForeground} />
            </View>
            <Text style={[styles.tastingText, { color: colors.primaryForeground }]}>
              Rasa cerah lemon Meyer membuka tegukan, lalu gula merah dan melati tinggal lebih lama di akhir.
            </Text>
            <View style={styles.tastingNotes}>
              {coffee.tastingNotes.map((note) => (
                <View key={note} style={[styles.tastingNote, { backgroundColor: colors.primaryForeground }]}>
                  <Text style={[styles.tastingNoteText, { color: colors.primary }]}>{note}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.finalCard, { backgroundColor: colors.secondary }]}>
            <View style={styles.finalCopy}>
              <Text style={[styles.sectionKicker, { color: colors.primary }]}>SIAP MENYEDUH?</Text>
              <Text style={[styles.finalTitle, { color: colors.foreground }]}>Bawa cerita ini ke rumah.</Text>
              <Text style={[styles.finalText, { color: colors.mutedForeground }]}>
                Paling nikmat sebagai {coffee.recommendedBrew.toLowerCase()}.
              </Text>
            </View>
            <Pressable
              testID="traceability-open-product"
              onPress={() => router.push(`/product/${coffee.id}`)}
              style={({ pressed }) => [styles.productButton, { backgroundColor: colors.foreground, opacity: pressed ? 0.76 : 1 }]}
            >
              <Text style={[styles.productButtonText, { color: colors.card }]}>Lihat kopi</Text>
              <BrandIcon name="arrow-up-right" size={15} color={colors.card} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, alignItems: 'flex-start', gap: 10, overflow: 'hidden' },
  heroTop: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 },
  qr: { width: 70, height: 70, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  heroBadgeDot: { width: 6, height: 6, borderRadius: 3 },
  heroBadgeText: { fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  heroKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontSize: 24, lineHeight: 29, fontWeight: '700' },
  heroText: { fontSize: 13, lineHeight: 19, opacity: 0.85 },
  scanButton: { borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 3 },
  scanText: { fontSize: 11, fontWeight: '700' },
  result: { gap: 16 },
  scanSuccess: { borderRadius: 17, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  successIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  successCopy: { flex: 1, gap: 2 },
  successTitle: { fontSize: 13, fontWeight: '700' },
  successLot: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  imageFrame: { width: '100%', height: 218, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: '100%' },
  imageShade: { ...StyleSheet.absoluteFill },
  imageOverlay: { position: 'absolute', left: 15, right: 15, bottom: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  imageKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  imageTitle: { fontSize: 20, fontWeight: '700', marginTop: 3 },
  verifiedPill: { borderRadius: 12, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5 },
  verifiedText: { fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  resultCopy: { gap: 3 },
  resultKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  resultTitle: { fontSize: 22, fontWeight: '700' },
  resultMeta: { fontSize: 12 },
  storyCard: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 11 },
  storyHeader: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  storyIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sectionKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.15 },
  storyTitle: { fontSize: 20, lineHeight: 25, fontWeight: '700', letterSpacing: -0.3 },
  storyText: { fontSize: 13, lineHeight: 20 },
  storyQuote: { borderTopWidth: 1, paddingTop: 12, marginTop: 2 },
  quoteText: { fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  sectionTitle: { fontSize: 19, lineHeight: 24, fontWeight: '700', marginTop: 4 },
  sectionMeta: { fontSize: 11, marginBottom: 2 },
  timeline: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 2 },
  timelineRow: { flexDirection: 'row', gap: 12, minHeight: 79 },
  timelineRail: { width: 22, alignItems: 'center' },
  timelineDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  timelineIndex: { fontSize: 10, fontWeight: '800' },
  timelineLine: { width: 1, flex: 1, marginVertical: 4 },
  timelineCopy: { flex: 1, gap: 3, paddingBottom: 13 },
  timelineLabel: { fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  timelineTitle: { fontSize: 14, fontWeight: '700' },
  timelineDetail: { fontSize: 12, lineHeight: 17 },
  tastingCard: { borderRadius: 20, padding: 17, gap: 12 },
  tastingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tastingTitle: { fontSize: 20, lineHeight: 24, fontWeight: '700', marginTop: 4 },
  tastingText: { fontSize: 13, lineHeight: 20, opacity: 0.92 },
  tastingNotes: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  tastingNote: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 10 },
  tastingNoteText: { fontSize: 10, fontWeight: '700' },
  finalCard: { borderRadius: 20, padding: 16, gap: 14, flexDirection: 'row', alignItems: 'center' },
  finalCopy: { flex: 1, gap: 4 },
  finalTitle: { fontSize: 17, lineHeight: 21, fontWeight: '700' },
  finalText: { fontSize: 11, lineHeight: 16 },
  productButton: { borderRadius: 12, paddingHorizontal: 11, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  productButtonText: { fontSize: 10, fontWeight: '800' },
});