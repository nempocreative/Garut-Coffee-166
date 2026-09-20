import React, { useState } from 'react';
import { Image, ImageSource } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, Screen } from '@/components/AppUI';
import { formatPrice, findCoffee, orderStatusLabels, type Coffee, type Order } from '@/data/coffees';
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

  if (session.id === 'pengguna') {
    return <BuyerProfileScreen />;
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

function BuyerProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session, signOut } = useAuth();
  const { orders, cart, favorites } = useStore();
  const [voucherSaved, setVoucherSaved] = useState(false);

  if (!session) return null;

  const firstName = session.name.split(' ')[0];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find((order) => order.status !== 'Delivered');
  const latestOrder = activeOrder ?? orders[0];
  const firstCoffee = latestOrder ? findCoffee(latestOrder.items[0]?.coffeeId) : undefined;
  const activeStatusIndex = activeOrder ? statusSteps.indexOf(activeOrder.status) : -1;

  return (
    <Screen>
      <Header title="Akun pembeli" notifications />

      <LinearGradient
        colors={[colors.foreground, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={buyerStyles.hero}
      >
        <View style={buyerStyles.heroTop}>
          <View style={[buyerStyles.avatar, { backgroundColor: colors.card }]}>
            <Text style={[buyerStyles.avatarText, { color: colors.primary }]}>{session.initials}</Text>
          </View>
          <View style={[buyerStyles.memberBadge, { backgroundColor: colors.card }]}>
            <View style={[buyerStyles.memberDot, { backgroundColor: colors.accent }]} />
            <Text style={[buyerStyles.memberText, { color: colors.foreground }]}>MEMBER KOPI GARUT</Text>
          </View>
        </View>
        <Text style={[buyerStyles.heroKicker, { color: colors.accent }]}>RUANG BELANJAMU</Text>
        <Text style={[buyerStyles.heroTitle, { color: colors.card }]}>Halo, {firstName}.</Text>
        <Text style={[buyerStyles.heroText, { color: colors.background }]}>
          Pantau pesanan, gunakan voucher, dan temukan kopi untuk ritual berikutnya.
        </Text>
        <View style={[buyerStyles.heroFoot, { borderTopColor: colors.primaryForeground }]}>
          <View>
            <Text style={[buyerStyles.heroFootLabel, { color: colors.background }]}>AKUN AKTIF</Text>
            <Text style={[buyerStyles.heroFootValue, { color: colors.card }]}>Pembeli kopi pilihan</Text>
          </View>
          <BrandIcon name="shopping-bag" size={25} color={colors.accent} />
        </View>
      </LinearGradient>

      <View style={[buyerStyles.statRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <BuyerStat value={`${orders.length}`} label="Pesanan" color={colors} />
        <View style={[buyerStyles.statDivider, { backgroundColor: colors.border }]} />
        <BuyerStat value={`${cartCount}`} label="Keranjang" color={colors} />
        <View style={[buyerStyles.statDivider, { backgroundColor: colors.border }]} />
        <BuyerStat value={`${favorites.length}`} label="Favorit" color={colors} />
      </View>

      <View style={buyerStyles.sectionHeader}>
        <View>
          <Text style={[buyerStyles.sectionKicker, { color: colors.primary }]}>PESANANMU</Text>
          <Text style={[buyerStyles.sectionTitle, { color: colors.foreground }]}>Sedang berjalan</Text>
        </View>
        <Pressable
          testID="buyer-orders-all"
          onPress={() => router.push('/orders')}
          style={({ pressed }) => [buyerStyles.link, { opacity: pressed ? 0.65 : 1 }]}
        >
          <Text style={[buyerStyles.linkText, { color: colors.primary }]}>Riwayat</Text>
          <Feather name="arrow-up-right" size={14} color={colors.primary} />
        </Pressable>
      </View>

      {activeOrder ? (
        <BuyerActiveOrder
          order={activeOrder}
          firstCoffee={firstCoffee}
          statusIndex={activeStatusIndex}
          onPress={() => router.push('/orders')}
          colors={colors}
        />
      ) : (
        <View style={[buyerStyles.emptyOrder, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[buyerStyles.emptyOrderIcon, { backgroundColor: colors.card }]}>
            <BrandIcon name="package" size={20} color={colors.primary} />
          </View>
          <View style={buyerStyles.emptyOrderCopy}>
            <Text style={[buyerStyles.emptyOrderTitle, { color: colors.foreground }]}>Belum ada pesanan aktif</Text>
            <Text style={[buyerStyles.emptyOrderText, { color: colors.mutedForeground }]}>Kopi pilihanmu akan muncul di sini setelah checkout.</Text>
          </View>
          <Pressable
            testID="buyer-browse-coffee"
            accessibilityRole="button"
            accessibilityLabel="Jelajahi kopi"
            onPress={() => router.push('/catalog')}
            style={({ pressed }) => [buyerStyles.roundAction, { backgroundColor: colors.primary, opacity: pressed ? 0.72 : 1 }]}
          >
            <BrandIcon name="arrow-up-right" size={16} color={colors.primaryForeground} />
          </Pressable>
        </View>
      )}

      <View style={buyerStyles.sectionHeader}>
        <View>
          <Text style={[buyerStyles.sectionKicker, { color: colors.primary }]}>UNTUKMU</Text>
          <Text style={[buyerStyles.sectionTitle, { color: colors.foreground }]}>Voucher & keuntungan</Text>
        </View>
        <BrandIcon name="coffee" size={21} color={colors.accent} />
      </View>

      <LinearGradient
        colors={[colors.primary, colors.secondaryForeground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={buyerStyles.voucher}
      >
        <View style={[buyerStyles.voucherStamp, { backgroundColor: colors.accent }]}>
          <Text style={[buyerStyles.voucherDiscount, { color: colors.accentForeground }]}>15%</Text>
          <Text style={[buyerStyles.voucherOff, { color: colors.accentForeground }]}>OFF</Text>
        </View>
        <View style={buyerStyles.voucherCopy}>
          <Text style={[buyerStyles.voucherKicker, { color: colors.accent }]}>VOUCHER PILIHAN</Text>
          <Text style={[buyerStyles.voucherTitle, { color: colors.card }]}>Selamat datang di ritual baru.</Text>
          <Text style={[buyerStyles.voucherText, { color: colors.background }]}>Min. belanja Rp 150.000 · berlaku minggu ini</Text>
          <View style={[buyerStyles.voucherCode, { borderColor: colors.primaryForeground }]}>
            <Text style={[buyerStyles.voucherCodeText, { color: colors.card }]}>GARUT15</Text>
            <BrandIcon name={voucherSaved ? 'check' : 'plus'} size={14} color={colors.accent} />
          </View>
        </View>
        <Pressable
          testID="buyer-voucher-save"
          accessibilityRole="button"
          accessibilityLabel={voucherSaved ? 'Voucher sudah disimpan' : 'Simpan voucher'}
          onPress={() => setVoucherSaved((saved) => !saved)}
          style={({ pressed }) => [buyerStyles.voucherAction, { backgroundColor: colors.card, opacity: pressed ? 0.78 : 1 }]}
        >
          <Text style={[buyerStyles.voucherActionText, { color: colors.foreground }]}>{voucherSaved ? 'Tersimpan' : 'Simpan'}</Text>
        </Pressable>
      </LinearGradient>

      <Text style={[buyerStyles.sectionKicker, { color: colors.primary }]}>BELANJA & AKUN</Text>
      <View style={buyerStyles.actionGrid}>
        <BuyerActionCard icon="shopping-bag" title="Keranjang" detail={cartCount ? `${cartCount} item siap dibayar` : 'Belum ada item'} onPress={() => router.push('/cart')} colors={colors} testID="buyer-cart" />
        <BuyerActionCard icon="heart" title="Favorit" detail={favorites.length ? `${favorites.length} kopi tersimpan` : 'Simpan kopi favorit'} onPress={() => router.push('/favorites')} colors={colors} testID="buyer-favorites" />
        <BuyerActionCard icon="repeat" title="Belanja lagi" detail="Temukan kopi pilihan" onPress={() => router.push('/catalog')} colors={colors} testID="buyer-shop-again" />
        <BuyerActionCard icon="package" title="Semua pesanan" detail={`${orders.length} riwayat belanja`} onPress={() => router.push('/orders')} colors={colors} testID="buyer-orders" />
      </View>

      <View style={[buyerStyles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <BuyerMenuRow
          icon="map-pin"
          title="Alamat pengiriman"
          description="Atur alamat untuk pesanan berikutnya"
          onPress={() => Alert.alert('Alamat pengiriman', 'Alamat pengiriman akan tersedia saat checkout pesanan berikutnya.')}
          colors={colors}
        />
        <BuyerMenuRow
          icon="bell"
          title="Notifikasi pesanan"
          description="Lihat kabar terbaru tentang ritualmu"
          onPress={() => router.push('/notifications')}
          colors={colors}
        />
        <BuyerMenuRow
          icon="info"
          title="Pusat bantuan"
          description="Butuh bantuan dengan pesanan?"
          onPress={() => Alert.alert('Pusat bantuan', 'Tim Kopi Garut siap membantu melalui kanal dukungan yang tersedia.')}
          colors={colors}
        />
        <BuyerMenuRow
          icon="arrow-left"
          title="Keluar dari akun"
          description="Kembali menjelajah sebagai tamu"
          onPress={() => void signOut()}
          colors={colors}
          destructive
        />
      </View>
    </Screen>
  );
}

function BuyerStat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: ReturnType<typeof useColors>;
}) {
  return (
    <View style={buyerStyles.stat}>
      <Text style={[buyerStyles.statValue, { color: color.foreground }]}>{value}</Text>
      <Text style={[buyerStyles.statLabel, { color: color.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function BuyerActiveOrder({
  order,
  firstCoffee,
  statusIndex,
  onPress,
  colors,
}: {
  order: Order;
  firstCoffee?: Coffee;
  statusIndex: number;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
}) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemNames = order.items
    .map((item) => findCoffee(item.coffeeId)?.name)
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      testID="buyer-active-order"
      accessibilityRole="button"
      accessibilityLabel="Lihat proses pesanan aktif"
      onPress={onPress}
      style={({ pressed }) => [
        buyerStyles.activeOrder,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <View style={buyerStyles.activeOrderTop}>
        <View style={buyerStyles.activeOrderCopy}>
          <Text style={[buyerStyles.activeOrderKicker, { color: colors.primary }]}>PESANAN AKTIF · #{order.id.slice(-6)}</Text>
          <Text numberOfLines={1} style={[buyerStyles.activeOrderTitle, { color: colors.foreground }]}>
            {itemNames || 'Pesanan Kopi Garut'}
          </Text>
          <Text style={[buyerStyles.activeOrderDate, { color: colors.mutedForeground }]}>
            {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
          </Text>
        </View>
        <View style={[buyerStyles.activeStatus, { backgroundColor: colors.secondary }]}>
          <View style={[buyerStyles.activeStatusDot, { backgroundColor: colors.primary }]} />
          <Text style={[buyerStyles.activeStatusText, { color: colors.primary }]}>{orderStatusLabels[order.status]}</Text>
        </View>
      </View>

      <View style={[buyerStyles.statusSummary, { backgroundColor: colors.secondary }]}>
        <View style={[buyerStyles.statusSummaryIcon, { backgroundColor: colors.card }]}>
          <BrandIcon name={order.status === 'Preparing' ? 'coffee' : 'package'} size={16} color={colors.primary} />
        </View>
        <View style={buyerStyles.statusSummaryCopy}>
          <Text style={[buyerStyles.statusSummaryTitle, { color: colors.foreground }]}>{statusDescriptions[order.status]}</Text>
          <Text style={[buyerStyles.statusSummaryText, { color: colors.mutedForeground }]}>Kami akan memberi kabar di setiap tahap.</Text>
        </View>
        <BrandIcon name="arrow-up-right" size={15} color={colors.primary} />
      </View>

      <View style={buyerStyles.progress}>
        {statusSteps.map((step, stepIndex) => (
          <React.Fragment key={step}>
            <View style={buyerStyles.progressStep}>
              <View style={[buyerStyles.progressDot, { backgroundColor: stepIndex <= statusIndex ? colors.primary : colors.border }]}>
                {stepIndex <= statusIndex && <BrandIcon name="check" size={9} color={colors.primaryForeground} />}
              </View>
              <Text style={[buyerStyles.progressLabel, { color: stepIndex <= statusIndex ? colors.foreground : colors.mutedForeground }]}>
                {orderStatusLabels[step]}
              </Text>
            </View>
            {stepIndex < statusSteps.length - 1 && (
              <View style={[buyerStyles.progressLine, { backgroundColor: stepIndex < statusIndex ? colors.primary : colors.border }]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={[buyerStyles.productPreview, { borderTopColor: colors.border }]}>
        {firstCoffee ? (
          <Image source={firstCoffee.image} contentFit="cover" style={buyerStyles.productImage} />
        ) : (
          <View style={[buyerStyles.productPlaceholder, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="coffee" size={19} color={colors.primary} />
          </View>
        )}
        <View style={buyerStyles.productCopy}>
          <Text numberOfLines={1} style={[buyerStyles.productName, { color: colors.foreground }]}>{itemNames || 'Kopi Garut pilihan'}</Text>
          <Text style={[buyerStyles.productMeta, { color: colors.mutedForeground }]}>{itemCount} item · Total pesanan</Text>
        </View>
        <Text style={[buyerStyles.productTotal, { color: colors.primary }]}>{formatPrice(order.total)}</Text>
      </View>
    </Pressable>
  );
}

function BuyerActionCard({
  icon,
  title,
  detail,
  onPress,
  colors,
  testID,
}: {
  icon: BrandIconName;
  title: string;
  detail: string;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
  testID: string;
}) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        buyerStyles.actionCard,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.74 : 1 },
      ]}
    >
      <View style={[buyerStyles.actionIcon, { backgroundColor: colors.secondary }]}>
        <BrandIcon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[buyerStyles.actionTitle, { color: colors.foreground }]}>{title}</Text>
      <Text numberOfLines={2} style={[buyerStyles.actionDetail, { color: colors.mutedForeground }]}>{detail}</Text>
      <Feather name="arrow-up-right" size={14} color={colors.mutedForeground} style={buyerStyles.actionArrow} />
    </Pressable>
  );
}

function BuyerMenuRow({
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
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [buyerStyles.menuRow, { opacity: pressed ? 0.68 : 1 }]}
    >
      <View style={[buyerStyles.menuIcon, { backgroundColor: destructive ? colors.muted : colors.secondary }]}>
        <BrandIcon name={icon} size={17} color={destructive ? colors.primary : colors.foreground} />
      </View>
      <View style={buyerStyles.menuCopy}>
        <Text style={[buyerStyles.menuTitle, { color: destructive ? colors.primary : colors.foreground }]}>{title}</Text>
        <Text style={[buyerStyles.menuDescription, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
      <Feather name="chevron-right" size={17} color={destructive ? colors.primary : colors.mutedForeground} />
    </Pressable>
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

const statusSteps = ['Placed', 'Preparing', 'Delivered'] as const;
const statusDescriptions: Record<(typeof statusSteps)[number], string> = {
  Placed: 'Pesanan diterima dan menunggu diproses.',
  Preparing: 'Kopi sedang disiapkan dengan teliti.',
  Delivered: 'Pesanan sudah sampai di rumahmu.',
};

const buyerStyles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 18, gap: 7, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700' },
  memberBadge: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 6 },
  memberDot: { width: 6, height: 6, borderRadius: 3 },
  memberText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 26, lineHeight: 31, fontWeight: '700', letterSpacing: -0.65 },
  heroText: { fontFamily: 'Manrope_400Regular', opacity: 0.84, fontSize: 12, lineHeight: 18, maxWidth: 300 },
  heroFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 10, marginTop: 4 },
  heroFootLabel: { fontFamily: 'Manrope_700Bold', opacity: 0.68, fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  heroFootValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', marginTop: 2 },
  statRow: { borderRadius: 17, borderWidth: 1, minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 8 },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 19, fontWeight: '700' },
  statLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  statDivider: { width: 1, height: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.35 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '700', marginTop: 4 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 2 },
  linkText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  activeOrder: { borderRadius: 20, borderWidth: 1, padding: 13, gap: 12 },
  activeOrderTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  activeOrderCopy: { flex: 1, gap: 4 },
  activeOrderKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.05 },
  activeOrderTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '700' },
  activeOrderDate: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  activeStatus: { borderRadius: 99, paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  activeStatusDot: { width: 6, height: 6, borderRadius: 3 },
  activeStatusText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  statusSummary: { borderRadius: 15, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 9 },
  statusSummaryIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statusSummaryCopy: { flex: 1, gap: 3 },
  statusSummaryTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 16, fontWeight: '700' },
  statusSummaryText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  progress: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 2, marginTop: 1 },
  progressStep: { alignItems: 'center', gap: 5, width: 58 },
  progressDot: { width: 19, height: 19, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  progressLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, textAlign: 'center' },
  progressLine: { flex: 1, height: 2, marginTop: 9 },
  productPreview: { borderTopWidth: 1, paddingTop: 11, flexDirection: 'row', alignItems: 'center', gap: 10 },
  productImage: { width: 54, height: 54, borderRadius: 14 },
  productPlaceholder: { width: 54, height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  productCopy: { flex: 1, gap: 4 },
  productName: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 17, fontWeight: '700' },
  productMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  productTotal: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  emptyOrder: { borderRadius: 18, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  emptyOrderIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  emptyOrderCopy: { flex: 1, gap: 3 },
  emptyOrderTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  emptyOrderText: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  roundAction: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  voucher: { minHeight: 160, borderRadius: 20, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11, overflow: 'hidden' },
  voucherStamp: { width: 62, height: 72, borderRadius: 18, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-6deg' }] },
  voucherDiscount: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 24, fontWeight: '800' },
  voucherOff: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  voucherCopy: { flex: 1, gap: 4 },
  voucherKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  voucherTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '700' },
  voucherText: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13, opacity: 0.82 },
  voucherCode: { alignSelf: 'flex-start', borderWidth: 1, borderStyle: 'dashed', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  voucherCodeText: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.1 },
  voucherAction: { position: 'absolute', right: 13, bottom: 13, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 7 },
  voucherActionText: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  actionCard: { width: '48.6%', minHeight: 116, borderRadius: 17, borderWidth: 1, padding: 11, gap: 5, position: 'relative' },
  actionIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  actionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  actionDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, maxWidth: 125 },
  actionArrow: { position: 'absolute', right: 11, top: 13 },
  menuGroup: { borderRadius: 17, borderWidth: 1, paddingVertical: 3, overflow: 'hidden' },
  menuRow: { minHeight: 68, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuCopy: { flex: 1, gap: 3 },
  menuTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  menuDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
});

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