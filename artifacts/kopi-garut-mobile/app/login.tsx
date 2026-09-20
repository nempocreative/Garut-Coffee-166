import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandIcon } from '@/components/BrandIcon';
import { Button, Header, Screen } from '@/components/AppUI';
import { useAuth } from '@/context/AuthContext';
import { roleProfiles } from '@/data/auth';
import { useColors } from '@/hooks/useColors';

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ returnTo?: string }>();
  const { session, signIn } = useAuth();
  const returnTo = params.returnTo === '/complaints'
    ? '/complaints'
    : params.returnTo === '/profile'
      ? '/profile'
      : '/program';
  const isSubmittingUsulan = returnTo === '/complaints';
  const isAccountLogin = returnTo === '/profile';
  const [selectedRole, setSelectedRole] = useState(session?.id ?? 'pengguna');
  const selectedProfile = roleProfiles.find((profile) => profile.id === selectedRole) ?? roleProfiles[0];

  const submit = async () => {
    await signIn(selectedProfile.id);
    router.replace(returnTo);
  };

  return (
    <Screen>
      <Header
        title={isSubmittingUsulan ? 'Masuk untuk kirim usulan' : isAccountLogin ? 'Masuk ke akun' : session ? 'Ganti akun' : 'Masuk ke Kopi Garut'}
        subtitle={isAccountLogin ? 'AKUN PEMBELI' : 'AKSES PROGRAM'}
        cart={false}
        back
      />
      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={[styles.heroGlow, { backgroundColor: colors.accent }]} />
        <View style={styles.heroCopy}>
          <View style={[styles.heroKicker, { backgroundColor: colors.primaryForeground }]}>
            <BrandIcon name="coffee" size={13} color={colors.accent} />
            <Text style={[styles.heroKickerText, { color: colors.primaryForeground }]}>EKOSISTEM KOPI GARUT</Text>
          </View>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>{isSubmittingUsulan ? 'Satu langkah untuk mengirim usulan.' : 'Satu ruang untuk cerita kopi.'}</Text>
          <Text style={[styles.heroDescription, { color: colors.primaryForeground }]}>{isSubmittingUsulan ? 'Pilih peran agar tim bisa menindaklanjuti petani, lahan, atau kebutuhan dukungan yang kamu sampaikan.' : 'Masuk untuk menemukan asal, rasa, dan orang-orang di balik setiap cangkir.'}</Text>
        </View>
        <View style={[styles.heroLogoFrame, { backgroundColor: colors.card, borderColor: colors.primaryForeground }]}>
          <Image source={require('../assets/images/kopi-garut-logo.png')} contentFit="contain" style={styles.heroLogo} />
        </View>
      </LinearGradient>
      <View style={styles.intro}>
        <View style={styles.introHeading}>
          <View style={[styles.introMark, { backgroundColor: colors.accent }]} />
          <Text style={[styles.eyebrow, { color: colors.primary }]}>PILIH AKSES</Text>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Kamu masuk sebagai siapa?</Text>
        <Text style={[styles.description, { color: colors.mutedForeground }]}>
          Pilih ruang yang paling sesuai. Menu dan pengalamanmu akan menyesuaikan peran ini.
        </Text>
      </View>
      <View style={styles.list}>
        {roleProfiles.map((profile) => {
          const selected = profile.id === selectedProfile.id;
          return (
            <Pressable
              key={profile.id}
              testID={`login-role-${profile.id}`}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setSelectedRole(profile.id)}
              style={({ pressed }) => [
                styles.roleCard,
                {
                  backgroundColor: selected ? colors.secondary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  opacity: pressed ? 0.78 : 1,
                },
              ]}
            >
              <View style={[styles.avatar, { backgroundColor: selected ? colors.primary : colors.secondary }]}>
                <Text style={[styles.avatarText, { color: selected ? colors.primaryForeground : colors.primary }]}>{profile.initials}</Text>
              </View>
              <View style={styles.roleCopy}>
                <Text style={[styles.roleLabel, { color: colors.foreground }]}>{profile.label}</Text>
                <Text style={[styles.roleName, { color: colors.primary }]}>{profile.name}</Text>
                <Text style={[styles.roleDescription, { color: colors.mutedForeground }]}>{profile.description}</Text>
              </View>
              <BrandIcon name={selected ? 'check' : 'circle'} size={19} color={selected ? colors.primary : colors.mutedForeground} />
            </Pressable>
          );
        })}
      </View>
      <View style={[styles.selectedAccess, { backgroundColor: colors.secondary }]}>
        <View style={[styles.selectedAccessIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name="check" size={14} color={colors.primaryForeground} />
        </View>
        <View style={styles.selectedAccessCopy}>
          <Text style={[styles.selectedAccessLabel, { color: colors.mutedForeground }]}>AKSES TERPILIH</Text>
          <Text style={[styles.selectedAccessName, { color: colors.foreground }]}>{selectedProfile.label} · {selectedProfile.name}</Text>
        </View>
        <BrandIcon name="arrow-up-right" size={17} color={colors.primary} />
      </View>
      <View style={[styles.note, { backgroundColor: colors.muted }]}>
        <BrandIcon name="info" size={16} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.mutedForeground }]}>Akun ini masih lokal di perangkat. Login server dan akun lintas perangkat dapat disambungkan kemudian.</Text>
      </View>
      <Button testID="login-submit" label={session ? 'Simpan peran ini' : 'Masuk sebagai akun ini'} onPress={submit} icon="arrow-up-right" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 184, borderRadius: 24, padding: 19, overflow: 'hidden', flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  heroGlow: { position: 'absolute', width: 150, height: 150, borderRadius: 75, right: -45, top: -52, opacity: 0.24 },
  heroCopy: { flex: 1, gap: 9, zIndex: 2 },
  heroKicker: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6, opacity: 0.96 },
  heroKickerText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.05 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 28, letterSpacing: -0.6, maxWidth: 220 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17, opacity: 0.78, maxWidth: 225 },
  heroLogoFrame: { width: 75, height: 75, borderRadius: 25, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 3, transform: [{ rotate: '7deg' }] },
  heroLogo: { width: 62, height: 62, transform: [{ rotate: '-7deg' }] },
  intro: { gap: 7, paddingTop: 2 },
  introHeading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  introMark: { width: 7, height: 7, borderRadius: 4 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.45 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 32, letterSpacing: -0.7 },
  description: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20 },
  list: { gap: 11 },
  roleCard: { borderWidth: 1, borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 78 },
  avatar: { width: 48, height: 48, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '800' },
  roleCopy: { flex: 1, gap: 2 },
  roleLabel: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  roleName: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  roleDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, marginTop: 2 },
  selectedAccess: { borderRadius: 17, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 10 },
  selectedAccessIcon: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  selectedAccessCopy: { flex: 1, gap: 2 },
  selectedAccessLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.3 },
  selectedAccessName: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  note: { borderRadius: 16, padding: 13, flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});