import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandIcon } from '@/components/BrandIcon';
import { Button, Header, Screen } from '@/components/AppUI';
import { useAuth } from '@/context/AuthContext';
import { roleProfiles } from '@/data/auth';
import { useColors } from '@/hooks/useColors';

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session, signIn } = useAuth();
  const [selectedRole, setSelectedRole] = useState(session?.id ?? 'pengguna');
  const selectedProfile = roleProfiles.find((profile) => profile.id === selectedRole) ?? roleProfiles[0];

  const submit = async () => {
    await signIn(selectedProfile.id);
    router.replace('/program');
  };

  return (
    <Screen>
      <Header title={session ? 'Ganti akun' : 'Masuk ke Kopi Garut'} subtitle="AKSES PROGRAM" cart={false} />
      <View style={styles.intro}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>PILIH PERANMU</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Ruang yang tepat untuk setiap orang.</Text>
        <Text style={[styles.description, { color: colors.mutedForeground }]}>
          Menu program akan menyesuaikan akun yang kamu gunakan. Pilihan ini tersimpan di perangkat untuk keperluan demo.
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
      <View style={[styles.note, { backgroundColor: colors.muted }]}>
        <BrandIcon name="info" size={16} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.mutedForeground }]}>Akun ini masih lokal di perangkat. Login server dan akun lintas perangkat dapat disambungkan kemudian.</Text>
      </View>
      <Button testID="login-submit" label={session ? 'Simpan peran ini' : 'Masuk sebagai akun ini'} onPress={submit} icon="arrow-up-right" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 7 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.45 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 32, letterSpacing: -0.7 },
  description: { fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20 },
  list: { gap: 10 },
  roleCard: { borderWidth: 1, borderRadius: 19, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11 },
  avatar: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '800' },
  roleCopy: { flex: 1, gap: 2 },
  roleLabel: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  roleName: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  roleDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 15, marginTop: 2 },
  note: { borderRadius: 16, padding: 13, flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
});