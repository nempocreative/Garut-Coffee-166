import React from 'react';
import { Image, ImageSource } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, Screen } from '@/components/AppUI';
import { formatPrice, findCoffee, orderStatusLabels } from '@/data/coffees';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session, signOut } = useAuth();
  const { orders, cart, favorites } = useStore();

  if (!session) {
    return (
      <Screen>
        <Header title="Ritualmu" subtitle="KOPI GARUT" />
        <LinearGradient
          colors={[colors.foreground, colors.secondaryForeground]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.loginHero}
        >
          <View style={[styles.loginIcon, { backgroundColor: colors.card }]}>
            <BrandIcon name="user" size={23} color={colors.primary} />
          </View>
          <Text style={[styles.loginKicker, { color: colors.accent }]}>RUANG KOPIMU</Text>
          <Text style={[styles.loginTitle, { color: colors.card }]}>Masuk untuk membuka ruangmu.</Text>
          <Text style={[styles.loginText, { color: colors.background }]}>
            Simpan kopi favorit, pantau pesanan, dan temukan cerita yang ingin kamu bawa pulang.
          </Text>
          <Pressable
            testID="profile-login"
            onPress={() => router.push('/login')}
            style={({ pressed }) => [
              styles.loginButton,
              { backgroundColor: colors.card, opacity: pressed ? 0.78 : 1 },
            ]}
          >
            <Text style={[styles.loginButtonText, { color: colors.foreground }]}>Pilih akun</Text>
            <BrandIcon name="arrow-up-right" size={16} color={colors.primary} />
          </Pressable>
        </LinearGradient>
        <View style={[styles.guestNote, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[styles.guestNoteIcon, { backgroundColor: colors.card }]}>
            <BrandIcon name="shield" size={17} color={colors.primary} />
          </View>
          <View style={styles.guestNoteCopy}>
            <Text style={[styles.guestNoteTitle, { color: colors.foreground }]}>Tetap bisa menjelajah</Text>
            <Text style={[styles.noteText, { color: colors.mutedForeground }]}>
              Katalog dan cerita Kopi Garut tetap terbuka tanpa masuk akun.
            </Text>
          </View>
        </View>
      </Screen>
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const latestOrders = orders.slice(0, 3);

  return (
    <Screen>
      <Header title="Ritualmu" subtitle="KOPI GARUT" />
      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHero}
      >
        <View style={styles.profileTop}>
          <View style={[styles.avatar, { backgroundColor: colors.card }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>{session.initials}</Text>
          </View>
          <View style={[styles.roleBadge, { backgroundColor: colors.card }]}>
            <View style={[styles.roleDot, { backgroundColor: colors.accent }]} />
            <Text style={[styles.roleText, { color: colors.foreground }]}>{session.label}</Text>
          </View>
        </View>
        <Text style={[styles.lightLabel, { color: colors.accent }]}>AKUN AKTIF</Text>
        <Text style={[styles.profileName, { color: colors.card }]}>{session.name}</Text>
        <Text style={[styles.profileSub, { color: colors.background }]}>{session.description}</Text>
        <View style={[styles.profileDivider, { backgroundColor: colors.primaryForeground }]} />
        <View style={styles.profileFoot}>
          <View>
            <Text style={[styles.profileFootLabel, { color: colors.background }]}>RUANG PERSONAL</Text>
            <Text style={[styles.profileFootValue, { color: colors.card }]}>Kopi Garut</Text>
          </View>
          <BrandIcon name="coffee" size={26} color={colors.accent} />
        </View>
      </LinearGradient>

      <View style={[styles.statRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ProfileStat value={orders.length.toString()} label="Pesanan" color={colors} />
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <ProfileStat value={favorites.length.toString()} label="Tersimpan" color={colors} />
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <ProfileStat value={cartCount.toString()} label="Di keranjang" color={colors} />
      </View>

      <Text style={[styles.sectionKicker, { color: colors.primary }]}>AKSES CEPAT</Text>
      <View style={styles.quickGrid}>
        <QuickAction
          icon="shopping-bag"
          title="Keranjang"
          description={cartCount ? `${cartCount} item siap dibayar` : 'Belum ada item'}
          onPress={() => router.push('/cart')}
          colors={colors}
          testID="profile-cart"
        />
        <QuickAction
          icon="heart"
          title="Kopi tersimpan"
          description={favorites.length ? `${favorites.length} kopi favorit` : 'Simpan untuk nanti'}
          onPress={() => router.push('/favorites')}
          colors={colors}
          testID="profile-favorites"
        />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={[styles.sectionKicker, { color: colors.primary }]}>AKTIVITAS</Text>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Pesanan terbaru</Text>
        </View>
        <Pressable
          testID="profile-all-orders"
          onPress={() => router.push('/orders')}
          style={({ pressed }) => [styles.seeAll, { opacity: pressed ? 0.65 : 1 }]}
        >
          <Text style={[styles.seeAllText, { color: colors.primary }]}>Lihat semua</Text>
          <Feather name="arrow-up-right" size={14} color={colors.primary} />
        </Pressable>
      </View>

      {latestOrders.length ? (
        <View style={styles.orderList}>
          {latestOrders.map((order, index) => {
            const firstCoffee = findCoffee(order.items[0]?.coffeeId);
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 70).duration(420)}
                key={order.id}
                style={[styles.order, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                {firstCoffee && <ImageThumb source={firstCoffee.image} />}
                <View style={styles.orderCopy}>
                  <Text numberOfLines={1} style={[styles.entryTitle, { color: colors.foreground }]}>
                    {order.items.map((item) => findCoffee(item.coffeeId)?.name).join(' · ')}
                  </Text>
                  <Text style={[styles.entrySub, { color: colors.mutedForeground }]}>
                    {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · {orderStatusLabels[order.status]}
                  </Text>
                </View>
                <Text style={[styles.orderTotal, { color: colors.primary }]}>{formatPrice(order.total)}</Text>
              </Animated.View>
            );
          })}
        </View>
      ) : (
        <View style={[styles.note, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="coffee" size={19} color={colors.primary} />
          <Text style={[styles.noteText, { color: colors.secondaryForeground }]}>
            Pesanan pertamamu akan muncul di sini. Mulai dengan kopi yang menemani pagi ini.
          </Text>
        </View>
      )}

      <Text style={[styles.sectionKicker, { color: colors.primary }]}>PREFERENSI</Text>
      <View style={[styles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <AccountMenuRow icon="grid" title="Jelajahi katalog" description="Temukan kopi dari berbagai wilayah Garut" onPress={() => router.push('/catalog')} colors={colors} />
        <AccountMenuRow icon="repeat" title="Ganti akun" description="Beralih ke ruang pengguna lain" onPress={() => router.push('/login')} colors={colors} />
        <AccountMenuRow icon="arrow-left" title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onPress={() => void signOut()} colors={colors} destructive />
      </View>
    </Screen>
  );
}

function ProfileStat({ value, label, color }: { value: string; label: string; color: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: color.foreground }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: color.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onPress,
  colors,
  testID,
}: {
  icon: BrandIconName;
  title: string;
  description: string;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
  testID: string;
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.72 : 1 },
      ]}
    >
      <View style={[styles.quickIcon, { backgroundColor: colors.secondary }]}>
        <BrandIcon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[styles.quickTitle, { color: colors.foreground }]}>{title}</Text>
      <Text numberOfLines={2} style={[styles.quickDescription, { color: colors.mutedForeground }]}>{description}</Text>
      <Feather name="arrow-up-right" size={14} color={colors.mutedForeground} style={styles.quickArrow} />
    </Pressable>
  );
}

function AccountMenuRow({
  icon,
  title,
  description,
  onPress,
  colors,
  destructive = false,
}: {
  icon: BrandIconName;
  title: string;
  description: string;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
  destructive?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.menuRow, { opacity: pressed ? 0.68 : 1 }]}
    >
      <View style={[styles.menuIcon, { backgroundColor: destructive ? colors.muted : colors.secondary }]}>
        <BrandIcon name={icon} size={17} color={destructive ? colors.primary : colors.foreground} />
      </View>
      <View style={styles.menuCopy}>
        <Text style={[styles.menuTitle, { color: destructive ? colors.primary : colors.foreground }]}>{title}</Text>
        <Text style={[styles.menuDescription, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
      <Feather name="chevron-right" size={17} color={destructive ? colors.primary : colors.mutedForeground} />
    </Pressable>
  );
}

function ImageThumb({ source }: { source: ImageSource }) {
  return <Image source={source} contentFit="cover" style={styles.orderImage} />;
}

const styles = StyleSheet.create({
  loginHero: { borderRadius: 22, padding: 19, gap: 11, overflow: 'hidden' },
  loginIcon: { width: 47, height: 47, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  loginKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  loginTitle: { fontFamily: 'Manrope_700Bold', fontSize: 23, lineHeight: 28, fontWeight: '700', letterSpacing: -0.4 },
  loginText: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, opacity: 0.86 },
  loginButton: { alignSelf: 'flex-start', borderRadius: 13, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2 },
  loginButtonText: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  guestNote: { borderRadius: 17, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  guestNoteIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  guestNoteCopy: { flex: 1, gap: 3 },
  guestNoteTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  profileHero: { borderRadius: 22, padding: 18, gap: 7, overflow: 'hidden' },
  profileTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700' },
  roleBadge: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 6 },
  roleDot: { width: 6, height: 6, borderRadius: 3 },
  roleText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  lightLabel: { opacity: 0.78, fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  profileName: { fontFamily: 'Manrope_700Bold', fontSize: 24, lineHeight: 29, fontWeight: '700', letterSpacing: -0.5 },
  profileSub: { fontFamily: 'Manrope_400Regular', opacity: 0.82, fontSize: 11, lineHeight: 17, maxWidth: 290 },
  profileDivider: { height: 1, opacity: 0.16, marginTop: 6 },
  profileFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 3 },
  profileFootLabel: { fontFamily: 'Manrope_700Bold', opacity: 0.7, fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  profileFootValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', marginTop: 2 },
  statRow: { borderRadius: 17, borderWidth: 1, minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 8 },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 19, fontWeight: '700' },
  statLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  statDivider: { width: 1, height: 30 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.35 },
  quickGrid: { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, minHeight: 128, borderRadius: 17, borderWidth: 1, padding: 12, gap: 6, position: 'relative' },
  quickIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  quickTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  quickDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15, maxWidth: 120 },
  quickArrow: { position: 'absolute', right: 12, top: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '700', marginTop: 4 },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 2 },
  seeAllText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  orderList: { gap: 9 },
  entryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  entrySub: { fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 4 },
  order: { borderRadius: 16, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  orderImage: { width: 52, height: 52, borderRadius: 14 },
  orderCopy: { flex: 1 },
  orderTotal: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
  note: { borderRadius: 16, padding: 15, flexDirection: 'row', gap: 11, alignItems: 'flex-start' },
  noteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13, lineHeight: 20 },
  menuGroup: { borderRadius: 17, borderWidth: 1, paddingVertical: 3, overflow: 'hidden' },
  menuRow: { minHeight: 68, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuCopy: { flex: 1, gap: 3 },
  menuTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  menuDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
});