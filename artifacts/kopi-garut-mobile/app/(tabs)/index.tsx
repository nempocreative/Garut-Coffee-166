import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, CoffeeCard, Header, Screen } from '@/components/AppUI';
import { coffees } from '@/data/coffees';
import { useColors } from '@/hooks/useColors';

const promoSlides = [
  {
    id: 'morning-edit',
    kicker: 'THE MORNING EDIT',
    title: 'Start with a cup that knows where it came from.',
    description: 'Single-origin coffees from the volcanic highlands of Garut.',
    cta: 'Explore the collection',
    image: require('../../assets/images/hero-coffee.jpg'),
  },
  {
    id: 'origin-notes',
    kicker: 'FROM GARUT, WITH CARE',
    title: 'A little more character in every pour.',
    description: 'Meet small-batch coffees with bright, thoughtful tasting notes.',
    cta: 'Find your flavour',
    image: require('../../assets/images/origin-coffee.jpg'),
  },
  {
    id: 'weekend-ritual',
    kicker: 'WEEKEND RITUAL',
    title: 'Make room for a slower kind of morning.',
    description: 'Build a considered coffee ritual with beans roasted for clarity.',
    cta: 'Shop the ritual',
    image: require('../../assets/images/hero-coffee.jpg'),
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(280, width - 40);
  const bannerRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => {
        const next = (current + 1) % promoSlides.length;
        bannerRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, 5200);

    return () => clearInterval(interval);
  }, [bannerWidth]);

  const goToCatalog = () => router.push('/catalog');

  return <Screen>
    <Header title="Good morning, Aruna" subtitle="WEDNESDAY · GARUT" />
    <Animated.View entering={FadeInDown.duration(550)} style={styles.hero}>
      <ScrollView
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={bannerWidth}
        onMomentumScrollEnd={(event) => setActiveSlide(Math.round(event.nativeEvent.contentOffset.x / bannerWidth))}
      >
        {promoSlides.map((slide, index) => (
          <ImageBackground key={slide.id} source={slide.image} imageStyle={styles.heroImage} style={[styles.heroImageContainer, { width: bannerWidth }]}>
            <LinearGradient colors={['transparent', colors.foreground]} style={styles.heroShade} />
            <View style={styles.heroCopy}>
              <View style={[styles.promoPill, { backgroundColor: colors.card }]}>
                <View style={[styles.promoDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.promoPillText, { color: colors.foreground }]}>KOPI GARUT</Text>
              </View>
              <Text style={[styles.heroKicker, { color: colors.background }]}>{slide.kicker}</Text>
              <Text style={[styles.heroTitle, { color: colors.card }]}>{slide.title}</Text>
              <Text style={[styles.heroDescription, { color: colors.background }]}>{slide.description}</Text>
              <Pressable
                testID={index === 0 ? 'hero-browse' : `promo-browse-${index}`}
                onPress={goToCatalog}
                style={({ pressed }) => [styles.heroButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
              >
                <Text style={[styles.heroButtonText, { color: colors.primaryForeground }]}>{slide.cta}</Text>
                <Feather name="arrow-up-right" size={16} color={colors.primaryForeground} />
              </Pressable>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={[styles.pagination, { backgroundColor: colors.foreground }]}>
        {promoSlides.map((slide, index) => (
          <Pressable
            key={slide.id}
            accessibilityRole="button"
            accessibilityLabel={`Show promo ${index + 1}`}
            onPress={() => {
              setActiveSlide(index);
              bannerRef.current?.scrollTo({ x: index * bannerWidth, animated: true });
            }}
            style={[styles.paginationTrack, { backgroundColor: colors.card }]}
          >
            <View style={[styles.paginationDot, { backgroundColor: index === activeSlide ? colors.primary : colors.border, width: index === activeSlide ? 22 : 6 }]} />
          </Pressable>
        ))}
      </View>
    </Animated.View>
    <View style={styles.sectionHeading}>
      <View><Text style={[styles.sectionKicker, { color: colors.primary }]}>SELECTED FOR YOU</Text><Text style={[styles.sectionTitle, { color: colors.foreground }]}>A clear start</Text></View>
      <Link href="/catalog" style={[styles.seeAll, { color: colors.primary }]}>See all</Link>
    </View>
    <View style={styles.categoryRow}>
      {['Bright', 'Fruity', 'Everyday', 'Comfort'].map((category) => <Pressable testID={`home-category-${category}`} key={category} onPress={() => router.push('/catalog')} style={[styles.category, { backgroundColor: colors.secondary }]}><Text style={[styles.categoryText, { color: colors.foreground }]}>{category}</Text><Feather name="arrow-up-right" size={13} color={colors.primary} /></Pressable>)}
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featured}><CoffeeCard coffee={coffees[0]} index={0} /><CoffeeCard coffee={coffees[1]} index={1} /></ScrollView>
    <View style={styles.story}>
      <ImageBackground source={require('../../assets/images/origin-coffee.jpg')} imageStyle={styles.storyImage} style={styles.storyImageContainer}>
        <View style={[styles.storyShade, { backgroundColor: colors.foreground }]} />
        <View style={styles.storyCopy}>
          <Text style={[styles.heroKicker, { color: colors.background }]}>THE ORIGIN</Text>
          <Text style={[styles.storyTitle, { color: colors.card }]}>Between volcanic soil and cool mountain air.</Text>
          <Text style={[styles.storyText, { color: colors.background }]}>We work with small farms around Garut, West Java — roasting their character, never hiding it.</Text>
          <Button label="Read our approach" onPress={() => router.push('/catalog')} secondary />
        </View>
      </ImageBackground>
    </View>
    <View style={[styles.quote, { backgroundColor: colors.secondary }]}>
      <Text style={[styles.quoteMark, { color: colors.accent }]}>“</Text>
      <Text style={[styles.quoteText, { color: colors.foreground }]}>Coffee with a sense of place makes the day feel a little more intentional.</Text>
      <Text style={[styles.quoteByline, { color: colors.mutedForeground }]}>— Kopi Garut, West Java</Text>
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  hero: { height: 210, borderRadius: 24, overflow: 'hidden' },
  heroImageContainer: { flex: 1, justifyContent: 'flex-end' },
  heroImage: { borderRadius: 24 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.86 },
  heroCopy: { padding: 18, paddingBottom: 20, gap: 6 },
  promoPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 5, marginBottom: 1 },
  promoDot: { width: 5, height: 5, borderRadius: 3 },
  promoPillText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 1.1 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '700', letterSpacing: 1.5 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 25, fontWeight: '700', letterSpacing: -0.5, maxWidth: 320 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, opacity: 0.9, maxWidth: 290 },
  heroButton: { height: 36, borderRadius: 11, paddingHorizontal: 12, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2 },
  heroButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700' },
  pagination: { position: 'absolute', right: 14, top: 12, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 7, paddingVertical: 6, borderRadius: 20 },
  paginationTrack: { height: 6, borderRadius: 3, justifyContent: 'center', overflow: 'hidden' },
  paginationDot: { height: 6, borderRadius: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 3 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, fontWeight: '700', marginTop: 4 },
  seeAll: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', paddingBottom: 3 },
  categoryRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: -9 },
  category: { borderRadius: 13, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, fontWeight: '600' },
  featured: { flexDirection: 'row', gap: 12, marginHorizontal: -20, paddingHorizontal: 20 },
  story: { height: 300, borderRadius: 22, overflow: 'hidden' },
  storyImageContainer: { flex: 1, justifyContent: 'flex-end' },
  storyImage: { borderRadius: 22 },
  storyShade: { ...StyleSheet.absoluteFill, opacity: 0.48 },
  storyCopy: { padding: 20, gap: 8, alignItems: 'flex-start' },
  storyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 27, fontWeight: '700', maxWidth: 290 },
  storyText: { fontFamily: 'Manrope_400Regular', opacity: 0.9, fontSize: 13, lineHeight: 19, maxWidth: 300 },
  quote: { borderRadius: 22, padding: 20, gap: 7 },
  quoteMark: { fontFamily: 'Manrope_700Bold', fontSize: 40, lineHeight: 28, fontWeight: '700' },
  quoteText: { fontFamily: 'Manrope_600SemiBold', fontSize: 18, lineHeight: 25, fontWeight: '600' },
  quoteByline: { fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 4 },
});