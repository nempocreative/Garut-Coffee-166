import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { useColors } from '@/hooks/useColors';

const partnerTypes = ['Cafe & restoran', 'Roastery', 'Hotel & kantor'];

const activePartners = [
  {
    name: 'Ruang Seduh Roastery',
    type: 'CAFE & ROASTERY',
    location: 'Garut Kota',
    detail: 'Menyajikan Papandayan Series sebagai pilihan pour-over untuk pelanggan.',
    image: require('../assets/images/origin-coffee.jpg'),
    icon: 'coffee' as const,
  },
  {
    name: 'Dapur Lereng',
    type: 'RESTORAN',
    location: 'Cisurupan',
    detail: 'Memasangkan kopi Garut dengan menu rumahan dan hasil kebun lokal.',
    image: require('../assets/images/event-festival-garut.jpg'),
    icon: 'users' as const,
  },
  {
    name: 'Hotel Darajat View',
    type: 'HOTEL',
    location: 'Samarang',
    detail: 'Menghadirkan kopi asal Garut sebagai sambutan hangat untuk setiap tamu.',
    image: require('../assets/images/mountain-banner.png'),
    icon: 'briefcase' as const,
  },
  {
    name: 'Kedai Pagi Garut',
    type: 'CAFE',
    location: 'Tarogong',
    detail: 'Menjadikan kopi petani Garut bagian dari ritual pagi warga kota.',
    image: require('../assets/images/kopi-garut-promo-banner.jpg'),
    icon: 'coffee' as const,
  },
];

const benefits = [
  { icon: 'coffee' as const, title: 'Sumber yang jelas', text: 'Kopi pilihan dengan cerita kebun yang bisa kamu bagikan.' },
  { icon: 'users' as const, title: 'Tumbuh bersama', text: 'Terhubung langsung dengan petani dan ekosistem Garut.' },
  { icon: 'shield' as const, title: 'Mitra resmi', text: 'Bangun kepercayaan pelanggan bersama identitas Kopi Garut.' },
];

export default function PartnershipScreen() {
  const colors = useColors();
  const [cafeName, setCafeName] = useState('');
  const [city, setCity] = useState('');
  const [partnerType, setPartnerType] = useState(partnerTypes[0]);

  const submit = () => {
    if (!cafeName.trim() || !city.trim()) {
      Alert.alert('Lengkapi data', 'Isi nama usaha dan kota terlebih dahulu.');
      return;
    }
    Alert.alert('Pengajuan terkirim', `Terima kasih, ${cafeName}. Tim Kopi Garut akan menghubungi kamu di ${city}.`);
    setCafeName('');
    setCity('');
  };

  return (
    <Screen>
      <Header title="Kemitraan cafe" subtitle="TUMBUH BERSAMA" cart={false} back />

      <Animated.View entering={FadeInDown.duration(500)} style={styles.heroWrap}>
        <View style={styles.hero}>
          <ExpoImage source={require('../assets/images/kopi-garut-promo-banner.jpg')} contentFit="cover" style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={['rgba(35, 22, 15, 0.08)', 'rgba(35, 22, 15, 0.94)']}
            locations={[0.1, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.heroBadge, { backgroundColor: colors.accent }]}>
            <BrandIcon name="briefcase" size={13} color={colors.accentForeground} />
            <Text style={[styles.heroBadgeText, { color: colors.accentForeground }]}>PROGRAM MITRA</Text>
          </View>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroKicker, { color: colors.accent }]}>DARI KEBUN GARUT</Text>
            <Text style={[styles.heroTitle, { color: colors.card }]}>Bawa cerita kopi ke lebih banyak meja.</Text>
            <Text style={[styles.heroText, { color: colors.background }]}>Jadikan usahamu bagian dari perjalanan Kopi Garut.</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(90).duration(500)} style={[styles.trustRow, { borderColor: colors.border }]}>
        <View style={styles.trustItem}>
          <Text style={[styles.trustValue, { color: colors.primary }]}>01</Text>
          <Text style={[styles.trustLabel, { color: colors.mutedForeground }]}>Asal terjaga</Text>
        </View>
        <View style={[styles.trustDivider, { backgroundColor: colors.border }]} />
        <View style={styles.trustItem}>
          <Text style={[styles.trustValue, { color: colors.primary }]}>100%</Text>
          <Text style={[styles.trustLabel, { color: colors.mutedForeground }]}>Cerita nyata</Text>
        </View>
        <View style={[styles.trustDivider, { backgroundColor: colors.border }]} />
        <View style={styles.trustItem}>
          <Text style={[styles.trustValue, { color: colors.primary }]}>GARUT</Text>
          <Text style={[styles.trustLabel, { color: colors.mutedForeground }]}>Satu ekosistem</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(140).duration(500)} style={styles.partnerShowcase}>
        <View style={styles.partnerHeading}>
          <View style={styles.headingCopy}>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>SUDAH BERJALAN BERSAMA</Text>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Dari meja sarapan sampai lobi hotel.</Text>
          </View>
          <View style={[styles.partnerHeadingIcon, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="arrow-up-right" size={17} color={colors.primary} />
          </View>
        </View>
        <Text style={[styles.partnerIntro, { color: colors.mutedForeground }]}>
          Mereka membawa cerita kebun Garut lebih dekat ke pelanggan, tamu, dan keluarga di berbagai meja.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.partnerRail}>
          {activePartners.map((partner, index) => (
            <View key={partner.name} style={[styles.partnerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.partnerImageFrame}>
                <ExpoImage source={partner.image} contentFit="cover" style={styles.partnerImage} />
                <LinearGradient colors={['transparent', `${colors.foreground}D9`]} locations={[0.3, 1]} style={StyleSheet.absoluteFill} />
                <View style={[styles.partnerType, { backgroundColor: colors.accent }]}>
                  <BrandIcon name={partner.icon} size={11} color={colors.accentForeground} />
                  <Text style={[styles.partnerTypeText, { color: colors.accentForeground }]}>{partner.type}</Text>
                </View>
                <Text style={[styles.partnerIndex, { color: colors.card }]}>{String(index + 1).padStart(2, '0')}</Text>
              </View>
              <View style={styles.partnerCardCopy}>
                <Text numberOfLines={1} style={[styles.partnerName, { color: colors.foreground }]}>{partner.name}</Text>
                <View style={styles.partnerLocation}>
                  <BrandIcon name="map-pin" size={11} color={colors.primary} />
                  <Text style={[styles.partnerLocationText, { color: colors.primary }]}>{partner.location}</Text>
                </View>
                <Text numberOfLines={3} style={[styles.partnerDetail, { color: colors.mutedForeground }]}>{partner.detail}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={styles.sectionHeading}>
        <View style={styles.headingCopy}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>KENAPA BERGABUNG</Text>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Partner yang baik terasa di setiap cangkir.</Text>
        </View>
      </View>

      <View style={styles.benefits}>
        {benefits.map((benefit, index) => (
          <Animated.View key={benefit.title} entering={FadeInDown.delay(140 + index * 70).duration(450)} style={[styles.benefitCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.benefitIcon, { backgroundColor: colors.secondary }]}>
              <BrandIcon name={benefit.icon} size={19} color={colors.primary} />
            </View>
            <View style={styles.benefitCopy}>
              <Text style={[styles.benefitTitle, { color: colors.foreground }]}>{benefit.title}</Text>
              <Text style={[styles.benefitText, { color: colors.mutedForeground }]}>{benefit.text}</Text>
            </View>
            <Text style={[styles.benefitNumber, { color: colors.border }]}>{String(index + 1).padStart(2, '0')}</Text>
          </Animated.View>
        ))}
      </View>

      <View style={styles.sectionHeading}>
        <View style={styles.headingCopy}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>CARA KERJA</Text>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mulai dari percakapan sederhana.</Text>
        </View>
      </View>

      <View style={[styles.steps, { backgroundColor: colors.foreground }]}>
        <View style={styles.step}>
          <Text style={[styles.stepNumber, { color: colors.accent }]}>01</Text>
          <Text style={[styles.stepTitle, { color: colors.card }]}>Kenalan</Text>
          <Text style={[styles.stepText, { color: colors.background }]}>Ceritakan usaha dan kebutuhan kopimu.</Text>
        </View>
        <View style={[styles.stepLine, { backgroundColor: colors.primaryForeground }]} />
        <View style={styles.step}>
          <Text style={[styles.stepNumber, { color: colors.accent }]}>02</Text>
          <Text style={[styles.stepTitle, { color: colors.card }]}>Pilih rasa</Text>
          <Text style={[styles.stepText, { color: colors.background }]}>Kami carikan profil yang cocok untuk pelangganmu.</Text>
        </View>
        <View style={[styles.stepLine, { backgroundColor: colors.primaryForeground }]} />
        <View style={styles.step}>
          <Text style={[styles.stepNumber, { color: colors.accent }]}>03</Text>
          <Text style={[styles.stepTitle, { color: colors.card }]}>Tumbuh</Text>
          <Text style={[styles.stepText, { color: colors.background }]}>Bangun pengalaman ngopi yang punya asal.</Text>
        </View>
      </View>

      <View style={styles.formHeading}>
        <View>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>LANGKAH PERTAMA</Text>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mari ngobrol soal usahamu.</Text>
        </View>
        <View style={[styles.formIcon, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="send" size={18} color={colors.primary} />
        </View>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.fieldLabel, { color: colors.foreground }]}>Kamu bergerak di bidang apa?</Text>
        <View style={styles.typeRail}>
          {partnerTypes.map((type) => {
            const selected = partnerType === type;
            return (
              <Pressable
                key={type}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setPartnerType(type)}
                style={({ pressed }) => [
                  styles.typeChip,
                  { backgroundColor: selected ? colors.primary : colors.background, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.72 : 1 },
                ]}
              >
                <Text style={[styles.typeChipText, { color: selected ? colors.primaryForeground : colors.mutedForeground }]}>{type}</Text>
              </Pressable>
            );
          })}
        </View>
        <TextInput
          value={cafeName}
          onChangeText={setCafeName}
          placeholder="Nama usaha"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.foreground }]}
        />
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Kota dan area"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.foreground }]}
        />
        <Button label="Kirim pengajuan" onPress={submit} icon="send" />
        <Text style={[styles.formNote, { color: colors.mutedForeground }]}>Tim Kopi Garut akan menghubungi kamu untuk percakapan berikutnya.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroWrap: { borderRadius: 22, overflow: 'hidden' },
  hero: { height: 255, borderRadius: 22, overflow: 'hidden', justifyContent: 'space-between' },
  heroBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, margin: 13, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 6 },
  heroBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 1.05 },
  heroCopy: { padding: 16, gap: 5 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.45 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 26, lineHeight: 29, fontWeight: '800', letterSpacing: -0.7, maxWidth: 340 },
  heroText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  trustRow: { minHeight: 67, borderRadius: 17, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 8 },
  trustItem: { flex: 1, alignItems: 'center', gap: 3 },
  trustValue: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '800', letterSpacing: 0.2 },
  trustLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9 },
  trustDivider: { width: 1, height: 28 },
  partnerShowcase: { gap: 10 },
  partnerHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  partnerHeadingIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  partnerIntro: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17, maxWidth: 340 },
  partnerRail: { gap: 10, paddingRight: 20 },
  partnerCard: { width: 220, borderRadius: 19, borderWidth: 1, overflow: 'hidden' },
  partnerImageFrame: { height: 116, position: 'relative' },
  partnerImage: { width: '100%', height: '100%' },
  partnerType: { position: 'absolute', left: 9, top: 9, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  partnerTypeText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.65 },
  partnerIndex: { position: 'absolute', right: 11, bottom: 8, fontFamily: 'Manrope_700Bold', fontSize: 21, fontWeight: '800', opacity: 0.75 },
  partnerCardCopy: { minHeight: 108, padding: 12, gap: 5 },
  partnerName: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '800' },
  partnerLocation: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  partnerLocationText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  partnerDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  sectionHeading: { marginTop: 3 },
  headingCopy: { gap: 4 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.45 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 21, lineHeight: 25, fontWeight: '800', letterSpacing: -0.45, maxWidth: 335 },
  benefits: { gap: 9 },
  benefitCard: { minHeight: 76, borderRadius: 17, borderWidth: 1, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 10 },
  benefitIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  benefitCopy: { flex: 1, gap: 3 },
  benefitTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '800' },
  benefitText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  benefitNumber: { fontFamily: 'Manrope_700Bold', fontSize: 16, fontWeight: '800', alignSelf: 'flex-start', marginTop: 1 },
  steps: { borderRadius: 19, padding: 14, gap: 12 },
  step: { gap: 3 },
  stepNumber: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  stepTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '800' },
  stepText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  stepLine: { height: 1, opacity: 0.3 },
  formHeading: { marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  formIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  formCard: { borderRadius: 19, borderWidth: 1, padding: 14, gap: 10 },
  fieldLabel: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  typeRail: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  typeChip: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 8 },
  typeChipText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  input: { height: 50, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, fontFamily: 'Manrope_400Regular', fontSize: 13 },
  formNote: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15, textAlign: 'center', paddingHorizontal: 9 },
});