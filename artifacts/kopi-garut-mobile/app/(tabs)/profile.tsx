import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Button, Header, Screen } from '@/components/AppUI';
import { formatPrice, findCoffee, orderStatusLabels } from '@/data/coffees';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session, signOut } = useAuth();
  const { orders, cart } = useStore();

  if (!session) {
    return (
      <Screen>
        <Header title="Ritualmu" subtitle="KOPI GARUT" />
        <View style={[styles.loginCard, { backgroundColor: colors.primary }]}>
          <View style={[styles.loginIcon, { backgroundColor: colors.card }]}><Feather name="user" size={21} color={colors.primary} /></View>
          <Text style={[styles.loginTitle, { color: colors.primaryForeground }]}>Masuk untuk membuka ruangmu</Text>
          <Text style={[styles.loginText, { color: colors.background }]}>Pesanan, favorit, keluhan, dan menu program akan mengikuti akun yang kamu pilih.</Text>
          <Button label="Pilih akun" onPress={() => router.push('/login')} secondary />
        </View>
        <View style={[styles.note, { backgroundColor: colors.secondary }]}>
          <Feather name="shield" size={17} color={colors.primary} />
          <Text style={[styles.noteText, { color: colors.mutedForeground }]}>Kamu tetap bisa menjelajah katalog dan cerita Kopi Garut tanpa login.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Ritualmu" subtitle="KOPI GARUT" />
      <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
        <View style={[styles.avatar, { backgroundColor: colors.card }]}><Text style={[styles.avatarText, { color: colors.primary }]}>{session.initials}</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.lightLabel, { color: colors.background }]}>AKUN AKTIF</Text>
          <Text style={[styles.profileName, { color: colors.primaryForeground }]}>{session.name}</Text>
          <Text style={[styles.profileSub, { color: colors.background }]}>{session.label} · {session.description}</Text>
        </View>
        <Feather name="settings" size={20} color={colors.primaryForeground} />
      </View>
      <Pressable testID="profile-cart" onPress={() => router.push('/cart')} style={[styles.cartEntry, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.cartIcon, { backgroundColor: colors.secondary }]}><Feather name="shopping-bag" size={18} color={colors.primary} /></View>
        <View style={{ flex: 1 }}><Text style={[styles.entryTitle, { color: colors.foreground }]}>Keranjang kopimu</Text><Text style={[styles.entrySub, { color: colors.mutedForeground }]}>{cart.length ? `${cart.length} kopi siap untuk dibayar` : 'Belum ada yang menunggu di sini'}</Text></View>
        <Feather name="arrow-up-right" size={18} color={colors.primary} />
      </Pressable>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Pesanan terbaru</Text>
      {orders.length ? orders.slice(0, 3).map((order) => (
        <View key={order.id} style={[styles.order, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={{ flex: 1 }}><Text style={[styles.entryTitle, { color: colors.foreground }]}>{order.items.map((item) => findCoffee(item.coffeeId)?.name).join(' · ')}</Text><Text style={[styles.entrySub, { color: colors.mutedForeground }]}>{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · {orderStatusLabels[order.status]}</Text></View>
          <Text style={[styles.orderTotal, { color: colors.primary }]}>{formatPrice(order.total)}</Text>
        </View>
      )) : <View style={[styles.note, { backgroundColor: colors.secondary }]}><Feather name="coffee" size={18} color={colors.primary} /><Text style={[styles.noteText, { color: colors.secondaryForeground }]}>Pesanan pertamamu akan muncul di sini. Mulai dengan kopi yang menemani pagi ini.</Text></View>}
      <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 4 }]}>Preferensi</Text>
      <Link href="/catalog" style={[styles.preference, { borderBottomColor: colors.border }]}><Text style={[styles.entryTitle, { color: colors.foreground }]}>Jelajahi katalog</Text><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></Link>
      <Link href="/favorites" style={[styles.preference, { borderBottomColor: colors.border }]}><Text style={[styles.entryTitle, { color: colors.foreground }]}>Kopi tersimpan</Text><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></Link>
      <Pressable testID="profile-switch-account" onPress={() => router.push('/login')} style={[styles.preference, { borderBottomColor: colors.border }]}>
        <Text style={[styles.entryTitle, { color: colors.foreground }]}>Ganti akun</Text><Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      </Pressable>
      <Pressable testID="profile-sign-out" onPress={() => void signOut()} style={[styles.preference, { borderBottomColor: colors.border }]}>
        <Text style={[styles.entryTitle, { color: colors.primary }]}>Keluar</Text><Feather name="log-out" size={18} color={colors.primary} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loginCard: { borderRadius: 22, padding: 18, gap: 11 },
  loginIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  loginTitle: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '700' },
  loginText: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, opacity: 0.86 },
  profileCard: { borderRadius: 22, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 13 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '700' },
  lightLabel: { opacity: 0.75, fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  profileName: { fontFamily: 'Manrope_700Bold', fontSize: 20, fontWeight: '700', marginTop: 2 },
  profileSub: { fontFamily: 'Manrope_400Regular', opacity: 0.8, fontSize: 11, lineHeight: 16, marginTop: 4 },
  cartEntry: { borderRadius: 18, borderWidth: 1, flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  cartIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  entryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  entrySub: { fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 4 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700', marginTop: 2 },
  order: { borderRadius: 16, borderWidth: 1, padding: 14, flexDirection: 'row', gap: 10 },
  orderTotal: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  note: { borderRadius: 16, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20 },
  preference: { paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 },
});