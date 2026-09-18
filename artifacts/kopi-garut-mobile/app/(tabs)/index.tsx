import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, CoffeeCard, Header, Screen } from '@/components/AppUI';
import { coffees } from '@/data/coffees';
import { useColors } from '@/hooks/useColors';

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  return <Screen>
    <Header title="Good morning, Aruna" subtitle="WEDNESDAY · GARUT" />
    <Animated.View entering={FadeInDown.duration(550)} style={styles.hero}>
      <ImageBackground source={require('../../assets/images/hero-coffee.jpg')} imageStyle={styles.heroImage} style={styles.heroImageContainer}>
        <View style={[styles.heroShade, { backgroundColor: colors.foreground }]} />
        <View style={styles.heroCopy}>
          <Text style={[styles.heroKicker, { color: colors.background }]}>THE MORNING EDIT</Text>
          <Text style={[styles.heroTitle, { color: colors.card }]}>Start with a cup that knows where it came from.</Text>
          <Text style={[styles.heroDescription, { color: colors.background }]}>Single-origin coffees from the volcanic highlands of Garut.</Text>
          <Pressable testID="hero-browse" onPress={() => router.push('/catalog')} style={[styles.heroButton, { backgroundColor: colors.primary }]}>
            <Text style={[styles.heroButtonText, { color: colors.primaryForeground }]}>Explore the collection</Text>
            <Feather name="arrow-up-right" size={16} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </ImageBackground>
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
  hero: { height: 355, borderRadius: 24, overflow: 'hidden' },
  heroImageContainer: { flex: 1, justifyContent: 'flex-end' },
  heroImage: { borderRadius: 24 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.35 },
  heroCopy: { padding: 22, gap: 9 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', letterSpacing: 1.7 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 29, lineHeight: 33, fontWeight: '700', letterSpacing: -0.8, maxWidth: 300 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 19, opacity: 0.9, maxWidth: 270 },
  heroButton: { height: 43, borderRadius: 13, paddingHorizontal: 14, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  heroButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
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