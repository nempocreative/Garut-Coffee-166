import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image as ExpoImage, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { hubEvents } from '@/data/hub';
import { useColors } from '@/hooks/useColors';

const eventImages: Record<string, ImageSource> = {
  'coffee-talk-garut': require('../assets/images/event-festival-garut.jpg'),
  'festival-kopi': require('../assets/images/event-festival-garut.jpg'),
  'kelas-pascapanen': require('../assets/images/origin-coffee.jpg'),
  'sekolah-barista': require('../assets/images/origin-coffee.jpg'),
  'temu-cafe': require('../assets/images/hero-coffee.jpg'),
  'cupping-papandayan': require('../assets/images/coffee-beans-natural.png'),
  'pasar-kopi-garut': require('../assets/images/event-festival-garut.jpg'),
  'kelas-brew-di-rumah': require('../assets/images/hero-coffee.jpg'),
};

const eventFilters = ['Semua', ...Array.from(new Set(hubEvents.map((event) => event.type)))];

export default function EventsScreen() {
  const colors = useColors();
  const [activeFilter, setActiveFilter] = useState('Semua');

  const visibleEvents = useMemo(
    () => activeFilter === 'Semua' ? hubEvents : hubEvents.filter((event) => event.type === activeFilter),
    [activeFilter],
  );
  const featuredEvent = visibleEvents[0] ?? hubEvents[0];
  const upcomingEvents = visibleEvents.slice(1);

  return (
    <Screen>
      <Header title="Event & pelatihan" subtitle="AGENDA EKOSISTEM KOPI" cart={false} back />

      <Animated.View entering={FadeInDown.duration(500)} style={styles.introBlock}>
        <View style={[styles.introKicker, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="calendar" size={13} color={colors.primary} />
          <Text style={[styles.introKickerText, { color: colors.primary }]}>CATAT AGENDA</Text>
        </View>
        <Text style={[styles.introTitle, { color: colors.foreground }]}>Temukan alasan untuk datang ke Garut.</Text>
        <Text style={[styles.intro, { color: colors.mutedForeground }]}>
          Festival, kelas, dan pertemuan yang mempertemukan petani, usaha, dan pecinta kopi.
        </Text>
      </Animated.View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRail}>
        {eventFilters.map((filter) => {
          const selected = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setActiveFilter(filter)}
              style={({ pressed }) => [
                styles.filter,
                { backgroundColor: selected ? colors.primary : colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.72 : 1 },
              ]}
            >
              <Text style={[styles.filterText, { color: selected ? colors.primaryForeground : colors.mutedForeground }]}>{filter}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Animated.View entering={FadeInDown.delay(100).duration(550)} style={styles.featuredWrap}>
        <View style={styles.featuredCard}>
          <ExpoImage source={eventImages[featuredEvent.id]} contentFit="cover" style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={['transparent', 'rgba(28, 18, 12, 0.94)']}
            locations={[0.2, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.featuredTop}>
            <View style={[styles.featuredBadge, { backgroundColor: colors.accent }]}>
              <BrandIcon name="calendar" size={12} color={colors.accentForeground} />
              <Text style={[styles.featuredBadgeText, { color: colors.accentForeground }]}>AGENDA PILIHAN</Text>
            </View>
            <View style={[styles.featuredArrow, { backgroundColor: colors.card }]}>
              <BrandIcon name="arrow-up-right" size={16} color={colors.primary} />
            </View>
          </View>
          <View style={styles.featuredCopy}>
            <View style={styles.featuredMeta}>
              <Text style={[styles.featuredType, { color: colors.accent }]}>{featuredEvent.type}</Text>
              <View style={[styles.metaDot, { backgroundColor: colors.accent }]} />
              <Text style={[styles.featuredLocation, { color: colors.card }]}>{featuredEvent.location}</Text>
            </View>
            <Text style={[styles.featuredTitle, { color: colors.card }]}>{featuredEvent.title}</Text>
            <View style={styles.featuredDate}>
              <BrandIcon name="calendar" size={14} color={colors.primaryForeground} />
              <Text style={[styles.featuredDateText, { color: colors.primaryForeground }]}>{featuredEvent.date}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Agenda berikutnya</Text>
          <Text style={[styles.sectionCaption, { color: colors.mutedForeground }]}>{visibleEvents.length} agenda untuk kamu jelajahi</Text>
        </View>
        <View style={[styles.countBadge, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.countText, { color: colors.primary }]}>{String(visibleEvents.length).padStart(2, '0')}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {upcomingEvents.map((event, index) => (
          <Animated.View key={event.id} entering={FadeInDown.delay(160 + index * 60).duration(450)}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.dateBlock, { backgroundColor: colors.secondary }]}>
                <BrandIcon name="calendar" size={18} color={colors.primary} />
                <Text style={[styles.dateText, { color: colors.primary }]}>{event.date}</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardMeta}>
                  <Text style={[styles.type, { color: colors.primary }]}>{event.type}</Text>
                  <View style={[styles.locationPill, { backgroundColor: colors.background }]}>
                    <BrandIcon name="map-pin" size={11} color={colors.mutedForeground} />
                    <Text style={[styles.locationText, { color: colors.mutedForeground }]}>{event.location}</Text>
                  </View>
                </View>
                <Text style={[styles.title, { color: colors.foreground }]}>{event.title}</Text>
                <Text numberOfLines={2} style={[styles.description, { color: colors.mutedForeground }]}>{event.description}</Text>
              </View>
              <View style={[styles.cardArrow, { borderColor: colors.border }]}>
                <BrandIcon name="chevron-right" size={16} color={colors.primary} />
              </View>
            </View>
          </Animated.View>
        ))}
        {upcomingEvents.length === 0 && (
          <View style={[styles.empty, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
              <BrandIcon name="calendar" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Ini agenda terdepannya</Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Pilih kategori lain untuk melihat agenda berikutnya.</Text>
          </View>
        )}
      </View>

      <View style={[styles.closingCard, { backgroundColor: colors.foreground }]}>
        <View style={[styles.closingIcon, { backgroundColor: colors.accent }]}>
          <BrandIcon name="coffee" size={21} color={colors.accentForeground} />
        </View>
        <View style={styles.closingCopy}>
          <Text style={[styles.closingTitle, { color: colors.card }]}>Datang, belajar, tumbuh bersama.</Text>
          <Text style={[styles.closingText, { color: colors.background }]}>Setiap pertemuan membawa cerita baru dari kebun Garut.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  introBlock: { gap: 8, marginTop: -8 },
  introKicker: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6 },
  introKickerText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  introTitle: { fontFamily: 'Manrope_700Bold', fontSize: 25, lineHeight: 30, fontWeight: '800', letterSpacing: -0.65, maxWidth: 335 },
  intro: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 19, maxWidth: 345 },
  filterRail: { gap: 8, paddingRight: 20 },
  filter: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 9 },
  filterText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  featuredWrap: { marginHorizontal: 0, borderRadius: 22, overflow: 'hidden' },
  featuredCard: { height: 244, borderRadius: 22, overflow: 'hidden', justifyContent: 'space-between' },
  featuredTop: { padding: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  featuredBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 6 },
  featuredBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.9 },
  featuredArrow: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  featuredCopy: { padding: 15, gap: 7 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  featuredType: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  metaDot: { width: 3, height: 3, borderRadius: 2 },
  featuredLocation: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  featuredTitle: { fontFamily: 'Manrope_700Bold', fontSize: 24, lineHeight: 27, fontWeight: '800', letterSpacing: -0.6, maxWidth: 330 },
  featuredDate: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.14)' },
  featuredDateText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 2 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 24, fontWeight: '800', letterSpacing: -0.35 },
  sectionCaption: { fontFamily: 'Manrope_400Regular', fontSize: 11, marginTop: 3 },
  countBadge: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  countText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  list: { gap: 10 },
  card: { borderRadius: 18, borderWidth: 1, padding: 12, gap: 10 },
  dateBlock: { alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  cardBody: { gap: 5 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  type: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.15, textTransform: 'uppercase' },
  locationPill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 4 },
  locationText: { fontFamily: 'Manrope_600SemiBold', fontSize: 9 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 17, lineHeight: 21, fontWeight: '800', letterSpacing: -0.2 },
  description: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17 },
  cardArrow: { position: 'absolute', right: 12, bottom: 12, width: 28, height: 28, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', borderRadius: 18, borderWidth: 1, padding: 24, gap: 8 },
  emptyIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '800' },
  emptyText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17, textAlign: 'center', maxWidth: 250 },
  closingCard: { borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 4 },
  closingIcon: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  closingCopy: { flex: 1, gap: 3 },
  closingTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '800' },
  closingText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
});