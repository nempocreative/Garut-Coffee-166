import React, { useState } from 'react';
import { Image, ImageSource } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, Screen } from '@/components/AppUI';
import { formatPrice, findCoffee, orderStatusLabels, type Coffee, type Order } from '@/data/coffees';
import { farmers } from '@/data/hub';
import { documents, extensionCases, extensionVisit } from '@/data/program';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { useColors } from '@/hooks/useColors';
import { BrandIcon, BrandIconName } from '@/components/BrandIcon';
import { FarmerQrCard } from '@/components/FarmerQrCard';

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
            onPress={() => router.push({ pathname: '/login', params: { returnTo: '/profile' } })}
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

  if (session.id === 'petani') {
    return <FarmerProfileScreen />;
  }

  if (session.id === 'penyuluh') {
    return <EducatorProfileScreen />;
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

function FarmerProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session, signOut } = useAuth();
  const farmer = farmers[0];

  if (!session || !farmer) return null;

  const locationName = farmer.location.split(',')[0];

  return (
    <Screen>
      <Header title="Akun petani" subtitle="RUANG PETANI" cart={false} notifications />

      <View style={[farmerStyles.hero, { backgroundColor: colors.foreground }]}>
        <Image source={farmer.image} contentFit="cover" style={farmerStyles.heroImage} />
        <LinearGradient
          colors={['transparent', colors.foreground]}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 0.55, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={farmerStyles.heroContent}>
          <View style={farmerStyles.heroTop}>
            <View style={[farmerStyles.verifiedBadge, { backgroundColor: colors.card }]}>
              <View style={[farmerStyles.verifiedDot, { backgroundColor: colors.accent }]} />
              <Text style={[farmerStyles.verifiedText, { color: colors.foreground }]}>PETANI TERVERIFIKASI</Text>
            </View>
            <View style={[farmerStyles.heroAvatar, { backgroundColor: colors.card }]}>
              <Text style={[farmerStyles.heroAvatarText, { color: colors.primary }]}>{session.initials}</Text>
            </View>
          </View>
          <View style={farmerStyles.heroCopy}>
            <Text style={[farmerStyles.heroKicker, { color: colors.accent }]}>RUANG KEBUN</Text>
            <Text style={[farmerStyles.heroTitle, { color: colors.card }]}>{session.name}</Text>
            <Text style={[farmerStyles.heroDescription, { color: colors.background }]}>
              {farmer.group} · {farmer.location}
            </Text>
          </View>
          <View style={[farmerStyles.heroFoot, { borderTopColor: colors.primaryForeground }]}>
            <View>
              <Text style={[farmerStyles.heroFootLabel, { color: colors.background }]}>ANGGOTA SEJAK</Text>
              <Text style={[farmerStyles.heroFootValue, { color: colors.card }]}>{farmer.joinedAt}</Text>
            </View>
            <BrandIcon name="coffee" size={25} color={colors.accent} />
          </View>
        </View>
      </View>

      <View style={[farmerStyles.identityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[farmerStyles.identityIcon, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="shield" size={19} color={colors.primary} />
        </View>
        <View style={farmerStyles.identityCopy}>
          <Text style={[farmerStyles.identityKicker, { color: colors.primary }]}>ID KEANGGOTAAN</Text>
          <Text style={[farmerStyles.identityValue, { color: colors.foreground }]}>{farmer.membershipId}</Text>
          <Text style={[farmerStyles.identityDescription, { color: colors.mutedForeground }]}>Profil aktif di ekosistem Kopi Garut</Text>
        </View>
        <Pressable
          testID="farmer-verification"
          accessibilityRole="button"
          accessibilityLabel="Buka status verifikasi"
          onPress={() => router.push('/verification')}
          style={({ pressed }) => [farmerStyles.identityAction, { backgroundColor: colors.secondary, opacity: pressed ? 0.68 : 1 }]}
        >
          <Feather name="arrow-up-right" size={16} color={colors.primary} />
        </Pressable>
      </View>

      <FarmerQrCard farmer={farmer} />

      <View style={[farmerStyles.statRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerStat value={farmer.landArea} label="Luas kebun" color={colors} />
        <View style={[farmerStyles.statDivider, { backgroundColor: colors.border }]} />
        <FarmerStat value={farmer.annualProduction.replace(' cherry', '')} label="Produksi / tahun" color={colors} />
        <View style={[farmerStyles.statDivider, { backgroundColor: colors.border }]} />
        <FarmerStat value="5 tahun" label="Bersama kami" color={colors} />
      </View>

      <View style={farmerStyles.sectionHeader}>
        <View>
          <Text style={[farmerStyles.sectionKicker, { color: colors.primary }]}>PROFIL KEBUN</Text>
          <Text style={[farmerStyles.sectionTitle, { color: colors.foreground }]}>Data yang siap dipercaya</Text>
        </View>
        <BrandIcon name="map-pin" size={21} color={colors.accent} />
      </View>

      <View style={[farmerStyles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerDetailRow icon="map-pin" label="Wilayah kebun" value={`${locationName} · 1.450 mdpl`} colors={colors} />
        <FarmerDetailRow icon="users" label="Kelompok tani" value={farmer.group} colors={colors} />
        <FarmerDetailRow icon="coffee" label="Varietas utama" value={farmer.coffeeType} colors={colors} />
        <FarmerDetailRow icon="package" label="Produk unggulan" value={farmer.products.join(' · ')} colors={colors} last />
      </View>

      <View style={[farmerStyles.readinessCard, { backgroundColor: colors.secondary }]}>
        <View style={farmerStyles.readinessTop}>
          <View style={farmerStyles.readinessCopy}>
            <Text style={[farmerStyles.sectionKicker, { color: colors.primary }]}>KESIAPAN PROFIL</Text>
            <Text style={[farmerStyles.readinessTitle, { color: colors.foreground }]}>Profil kebun 82% lengkap</Text>
            <Text style={[farmerStyles.readinessText, { color: colors.mutedForeground }]}>Tinggal lengkapi foto pascapanen untuk memperkuat kepercayaan pembeli.</Text>
          </View>
          <View style={[farmerStyles.readinessMark, { backgroundColor: colors.primary }]}>
            <Text style={[farmerStyles.readinessValue, { color: colors.primaryForeground }]}>82%</Text>
          </View>
        </View>
        <View style={[farmerStyles.progressTrack, { backgroundColor: colors.card }]}>
          <View style={[farmerStyles.progressFill, { backgroundColor: colors.primary, width: '82%' }]} />
        </View>
        <Pressable
          testID="farmer-complete-profile"
          accessibilityRole="button"
          accessibilityLabel="Lengkapi profil kebun"
          onPress={() => router.push('/documents')}
          style={({ pressed }) => [farmerStyles.readinessAction, { borderColor: colors.primary, opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={[farmerStyles.readinessActionText, { color: colors.primary }]}>Lengkapi profil</Text>
          <Feather name="arrow-up-right" size={14} color={colors.primary} />
        </Pressable>
      </View>

      <Text style={[farmerStyles.sectionKicker, { color: colors.primary }]}>AKSES PETANI</Text>
      <View style={farmerStyles.actionGrid}>
        <FarmerActionCard icon="shield" title="Verifikasi kebun" detail="Perbarui status dan dokumen" onPress={() => router.push('/verification')} colors={colors} testID="farmer-action-verification" />
        <FarmerActionCard icon="check" title="Cek standar kopi" detail="Ukur kesiapan mutu lot" onPress={() => router.push('/quality-check')} colors={colors} testID="farmer-action-quality-check" />
        <FarmerActionCard icon="calendar" title="Catatan panen" detail="Simpan hasil dan biaya kebun" onPress={() => router.push('/harvest-log')} colors={colors} testID="farmer-action-harvest" />
        <FarmerActionCard icon="send" title="Pengajuan penjualan" detail="Tawarkan lot dan terima permintaan" onPress={() => router.push('/sales-submissions')} colors={colors} testID="farmer-action-sales" />
        <FarmerActionCard icon="trending-up" title="Biaya kebun" detail="Catat biaya dan hitung laba bersih" onPress={() => router.push('/farm-costs')} colors={colors} testID="farmer-action-costs" />
        <FarmerActionCard icon="briefcase" title="Pembayaran" detail="Catat uang muka dan sisa transaksi" onPress={() => router.push('/payment-records')} colors={colors} testID="farmer-action-payments" />
        <FarmerActionCard icon="alert-circle" title="Laporan masalah kebun" detail="Kirim foto dan minta arahan penyuluh" onPress={() => router.push('/farm-issues')} colors={colors} testID="farmer-action-issues" />
        <FarmerActionCard icon="calendar" title="Kalender kegiatan kebun" detail="Atur agenda kerja dan kunjungan" onPress={() => router.push('/farm-calendar')} colors={colors} testID="farmer-action-calendar" />
        <FarmerActionCard icon="package" title="Lot & mutu" detail="Catat panen dan kualitas" onPress={() => router.push('/curation')} colors={colors} testID="farmer-action-lot" />
        <FarmerActionCard icon="users" title="Kelompok tani" detail="Lihat gerak kelompok" onPress={() => router.push('/group-dashboard')} colors={colors} testID="farmer-action-group" />
        <FarmerActionCard icon="bar-chart-2" title="Laporan kebun" detail="Pantau hasil dan peluang" onPress={() => router.push('/reports')} colors={colors} testID="farmer-action-reports" />
      </View>

      <View style={farmerStyles.sectionHeader}>
        <View>
          <Text style={[farmerStyles.sectionKicker, { color: colors.primary }]}>PERJALANAN TERBARU</Text>
          <Text style={[farmerStyles.sectionTitle, { color: colors.foreground }]}>Aktivitas kebun</Text>
        </View>
        <Text style={[farmerStyles.sectionLink, { color: colors.primary }]}>Maret 2026</Text>
      </View>

      <View style={[farmerStyles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerActivity icon="check" title="Profil petani terverifikasi" detail="Data dasar dan kelompok tani telah diperiksa" date="Selesai" colors={colors} positive />
        <FarmerActivity icon="package" title="Lot Papandayan Series diperbarui" detail="Arabika Typica · proses natural" date="12 Mar" colors={colors} />
        <FarmerActivity icon="calendar" title="Pendampingan pascapanen berikutnya" detail="Kelas sortasi dan pengeringan" date="17 Okt" colors={colors} last />
      </View>

      <Text style={[farmerStyles.sectionKicker, { color: colors.primary }]}>KEANGGOTAAN & BANTUAN</Text>
      <View style={[farmerStyles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerMenuRow icon="grid" title="Dokumen & legalitas" description="Kelola dokumen pendukung profil" onPress={() => router.push('/documents')} colors={colors} />
        <FarmerMenuRow icon="calendar" title="Catatan panen" description="Simpan tanggal, hasil, blok, dan biaya produksi" onPress={() => router.push('/harvest-log')} colors={colors} />
        <FarmerMenuRow icon="check" title="Cek standar kopi" description="Isi pemeriksaan mutu langsung dari handphone" onPress={() => router.push('/quality-check')} colors={colors} />
        <FarmerMenuRow icon="check" title="Standar mutu kopi" description="Lihat panduan kualitas dan kesiapan lot" onPress={() => router.push('/standards')} colors={colors} />
        <FarmerMenuRow icon="trending-up" title="Harga kopi terbaru" description="Lihat harga acuan per bentuk dan mutu" onPress={() => router.push('/prices')} colors={colors} />
        <FarmerMenuRow icon="send" title="Pengajuan penjualan" description="Tawarkan lot dan kelola permintaan pembeli" onPress={() => router.push('/sales-submissions')} colors={colors} />
        <FarmerMenuRow icon="trending-up" title="Pencatatan biaya kebun" description="Catat biaya dan lihat perkiraan keuntungan bersih" onPress={() => router.push('/farm-costs')} colors={colors} />
        <FarmerMenuRow icon="briefcase" title="Pencatatan pembayaran" description="Catat harga jual, uang muka, dan sisa pembayaran" onPress={() => router.push('/payment-records')} colors={colors} />
        <FarmerMenuRow icon="alert-circle" title="Laporan masalah kebun" description="Kirim foto, lokasi, dan keterangan ke penyuluh" onPress={() => router.push('/farm-issues')} colors={colors} />
        <FarmerMenuRow icon="calendar" title="Kalender kegiatan kebun" description="Atur pemupukan, panen, pengeringan, dan kunjungan" onPress={() => router.push('/farm-calendar')} colors={colors} />
        <FarmerMenuRow icon="briefcase" title="Kemitraan & pasar" description="Temukan peluang pembelian hasil kebun" onPress={() => router.push('/partnership')} colors={colors} />
        <FarmerMenuRow icon="repeat" title="Ganti akun" description="Beralih ke ruang pengguna lain" onPress={() => router.push('/login')} colors={colors} />
        <FarmerMenuRow icon="arrow-left" title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onPress={() => void signOut()} colors={colors} destructive />
      </View>
    </Screen>
  );
}

function EducatorProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session, signOut } = useAuth();

  if (!session) return null;

  return (
    <Screen>
      <Header title="Akun penyuluh" subtitle="RUANG PENDAMPINGAN" cart={false} notifications />

      <View style={[educatorStyles.hero, { backgroundColor: colors.foreground }]}>
        <Image source={require('../../assets/images/garut-mountains.png')} contentFit="cover" style={educatorStyles.heroImage} />
        <LinearGradient
          colors={['transparent', colors.foreground]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.62, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={educatorStyles.heroContent}>
          <View style={educatorStyles.heroTop}>
            <View style={[educatorStyles.activeBadge, { backgroundColor: colors.card }]}>
              <View style={[educatorStyles.activeDot, { backgroundColor: colors.accent }]} />
              <Text style={[educatorStyles.activeText, { color: colors.foreground }]}>PENDAMPING AKTIF</Text>
            </View>
            <View style={[educatorStyles.heroAvatar, { backgroundColor: colors.card }]}>
              <Text style={[educatorStyles.heroAvatarText, { color: colors.primary }]}>{session.initials}</Text>
            </View>
          </View>
          <View style={educatorStyles.heroCopy}>
            <Text style={[educatorStyles.heroKicker, { color: colors.accent }]}>RUANG BELAJAR KEBUN</Text>
            <Text style={[educatorStyles.heroTitle, { color: colors.card }]}>{session.name}</Text>
            <Text style={[educatorStyles.heroDescription, { color: colors.background }]}>Penyuluh Kopi Garut · Dinas Pertanian & tim pendamping</Text>
          </View>
          <View style={[educatorStyles.heroFoot, { borderTopColor: colors.primaryForeground }]}>
            <View>
              <Text style={[educatorStyles.heroFootLabel, { color: colors.background }]}>WILAYAH DAMPINGAN</Text>
              <Text style={[educatorStyles.heroFootValue, { color: colors.card }]}>Cikajang · Cisurupan</Text>
            </View>
            <BrandIcon name="users" size={25} color={colors.accent} />
          </View>
        </View>
      </View>

      <View style={[educatorStyles.statRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerStat value={extensionCases[0]?.value ?? '18'} label="Kunjungan bulan ini" color={colors} />
        <View style={[educatorStyles.statDivider, { backgroundColor: colors.border }]} />
        <FarmerStat value={extensionCases[2]?.value ?? '6'} label="Kasus terbuka" color={colors} />
        <View style={[educatorStyles.statDivider, { backgroundColor: colors.border }]} />
        <FarmerStat value={extensionCases[3]?.value ?? '3'} label="Jatuh tempo" color={colors} />
      </View>

      <View style={educatorStyles.sectionHeader}>
        <View>
          <Text style={[educatorStyles.sectionKicker, { color: colors.primary }]}>PRIORITAS HARI INI</Text>
          <Text style={[educatorStyles.sectionTitle, { color: colors.foreground }]}>Tindak lanjut lapangan</Text>
        </View>
        <Text style={[educatorStyles.sectionLink, { color: colors.primary }]}>3 catatan</Text>
      </View>

      <View style={[educatorStyles.priorityCard, { backgroundColor: colors.foreground }]}>
        <View style={educatorStyles.priorityTop}>
          <View style={[educatorStyles.priorityIcon, { backgroundColor: colors.accent }]}>
            <BrandIcon name="alert-circle" size={19} color={colors.accentForeground} />
          </View>
          <View style={educatorStyles.priorityCopy}>
            <Text style={[educatorStyles.priorityKicker, { color: colors.accent }]}>PERLU DIKUNJUNGI LAGI</Text>
            <Text style={[educatorStyles.priorityTitle, { color: colors.card }]}>{extensionVisit.farmer} · {extensionVisit.group}</Text>
          </View>
        </View>
        <Text style={[educatorStyles.priorityText, { color: colors.background }]}>
          {extensionVisit.issue} Rekomendasi: {extensionVisit.recommendation}
        </Text>
        <View style={[educatorStyles.priorityFoot, { borderTopColor: colors.primaryForeground }]}>
          <View>
            <Text style={[educatorStyles.priorityMetaLabel, { color: colors.background }]}>KUNJUNGAN BERIKUTNYA</Text>
            <Text style={[educatorStyles.priorityMetaValue, { color: colors.card }]}>{extensionVisit.nextVisit}</Text>
          </View>
          <Pressable
            testID="educator-open-dashboard"
            accessibilityRole="button"
            accessibilityLabel="Buka dashboard penyuluh"
            onPress={() => router.push('/extension-dashboard')}
            style={({ pressed }) => [educatorStyles.priorityAction, { backgroundColor: colors.card, opacity: pressed ? 0.76 : 1 }]}
          >
            <Text style={[educatorStyles.priorityActionText, { color: colors.foreground }]}>Buka catatan</Text>
            <Feather name="arrow-up-right" size={14} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <Text style={[educatorStyles.sectionKicker, { color: colors.primary }]}>AKSES KERJA LAPANGAN</Text>
      <View style={educatorStyles.actionGrid}>
        <EducatorActionCard icon="map-pin" title="Dashboard penyuluh" detail="Catat kunjungan dan tindak lanjut" onPress={() => router.push('/extension-dashboard')} colors={colors} testID="educator-action-dashboard" />
        <EducatorActionCard icon="coffee" title="Materi edukasi" detail="Bagikan panduan budidaya dan mutu" onPress={() => router.push('/documents')} colors={colors} testID="educator-action-materials" />
        <EducatorActionCard icon="bar-chart-2" title="Laporan wilayah" detail="Baca perkembangan kelompok dampingan" onPress={() => router.push('/reports')} colors={colors} testID="educator-action-reports" />
        <EducatorActionCard icon="send" title="Usulan dukungan" detail="Ajukan kebutuhan petani ke tim" onPress={() => router.push('/complaints')} colors={colors} testID="educator-action-support" />
      </View>

      <View style={educatorStyles.sectionHeader}>
        <View>
          <Text style={[educatorStyles.sectionKicker, { color: colors.primary }]}>MATERI UNTUK PETANI</Text>
          <Text style={[educatorStyles.sectionTitle, { color: colors.foreground }]}>Siap dibawa ke kebun</Text>
        </View>
        <Pressable
          testID="educator-all-materials"
          accessibilityRole="button"
          accessibilityLabel="Buka semua materi edukasi"
          onPress={() => router.push('/documents')}
          style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
        >
          <Text style={[educatorStyles.sectionLink, { color: colors.primary }]}>Lihat semua</Text>
        </Pressable>
      </View>

      <View style={[educatorStyles.materialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {documents.slice(0, 3).map((document, index) => (
          <Pressable
            key={document.id}
            testID={`educator-material-${document.id}`}
            accessibilityRole="button"
            accessibilityLabel={`Buka ${document.title}`}
            onPress={() => router.push('/documents')}
            style={({ pressed }) => [
              educatorStyles.materialRow,
              index < 2 && { borderBottomColor: colors.border, borderBottomWidth: 1 },
              { opacity: pressed ? 0.68 : 1 },
            ]}
          >
            <View style={[educatorStyles.materialIcon, { backgroundColor: colors.secondary }]}>
              <BrandIcon name={document.icon} size={16} color={colors.primary} />
            </View>
            <View style={educatorStyles.materialCopy}>
              <Text style={[educatorStyles.materialTitle, { color: colors.foreground }]}>{document.title}</Text>
              <Text style={[educatorStyles.materialMeta, { color: colors.mutedForeground }]}>{document.meta} · {document.category}</Text>
            </View>
            <Feather name="arrow-up-right" size={15} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>

      <View style={educatorStyles.sectionHeader}>
        <View>
          <Text style={[educatorStyles.sectionKicker, { color: colors.primary }]}>AGENDA PENDAMPINGAN</Text>
          <Text style={[educatorStyles.sectionTitle, { color: colors.foreground }]}>Berikutnya di lapangan</Text>
        </View>
        <BrandIcon name="calendar" size={21} color={colors.accent} />
      </View>

      <View style={[educatorStyles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerActivity icon="calendar" title="Pelatihan sortasi & defect" detail="Rumah produksi Cikuray · Besok 09.00" date="BESOK" colors={colors} positive />
        <FarmerActivity icon="map-pin" title={`Kunjungan ${extensionVisit.farmer}`} detail={`${extensionVisit.location} · tindak lanjut kebun`} date={extensionVisit.nextVisit} colors={colors} />
        <FarmerActivity icon="users" title="Forum kelompok tani" detail="Evaluasi kebutuhan alat dan program bantuan" date="20 Jun" colors={colors} last />
      </View>

      <Text style={[educatorStyles.sectionKicker, { color: colors.primary }]}>RUANG DINAS & TIM</Text>
      <View style={[educatorStyles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <FarmerMenuRow icon="package" title="Pusat dokumen" description="SOP, modul, formulir, dan regulasi" onPress={() => router.push('/documents')} colors={colors} />
        <FarmerMenuRow icon="check" title="Standar Kopi Garut" description="Rujukan mutu untuk edukasi petani" onPress={() => router.push('/standards')} colors={colors} />
        <FarmerMenuRow icon="bell" title="Notifikasi program" description="Pelatihan, panen, dan kebutuhan dukungan" onPress={() => router.push('/notifications')} colors={colors} />
        <FarmerMenuRow icon="repeat" title="Ganti akun" description="Beralih ke ruang pengguna lain" onPress={() => router.push('/login')} colors={colors} />
        <FarmerMenuRow icon="arrow-left" title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onPress={() => void signOut()} colors={colors} destructive />
      </View>
    </Screen>
  );
}

function EducatorActionCard({ icon, title, detail, onPress, colors, testID }: { icon: BrandIconName; title: string; detail: string; onPress: () => void; colors: ReturnType<typeof useColors>; testID: string }) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [educatorStyles.actionCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.74 : 1 }]}
    >
      <View style={[educatorStyles.actionIcon, { backgroundColor: colors.secondary }]}>
        <BrandIcon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[educatorStyles.actionTitle, { color: colors.foreground }]}>{title}</Text>
      <Text numberOfLines={2} style={[educatorStyles.actionDetail, { color: colors.mutedForeground }]}>{detail}</Text>
      <Feather name="arrow-up-right" size={14} color={colors.mutedForeground} style={educatorStyles.actionArrow} />
    </Pressable>
  );
}

function FarmerStat({ value, label, color }: { value: string; label: string; color: ReturnType<typeof useColors> }) {
  return (
    <View style={farmerStyles.stat}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={[farmerStyles.statValue, { color: color.foreground }]}>{value}</Text>
      <Text style={[farmerStyles.statLabel, { color: color.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function FarmerDetailRow({ icon, label, value, colors, last = false }: { icon: BrandIconName; label: string; value: string; colors: ReturnType<typeof useColors>; last?: boolean }) {
  return (
    <View style={[farmerStyles.detailRow, !last && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
      <View style={[farmerStyles.detailIcon, { backgroundColor: colors.secondary }]}>
        <BrandIcon name={icon} size={16} color={colors.primary} />
      </View>
      <View style={farmerStyles.detailCopy}>
        <Text style={[farmerStyles.detailLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <Text style={[farmerStyles.detailValue, { color: colors.foreground }]}>{value}</Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </View>
  );
}

function FarmerActionCard({ icon, title, detail, onPress, colors, testID }: { icon: BrandIconName; title: string; detail: string; onPress: () => void; colors: ReturnType<typeof useColors>; testID: string }) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [farmerStyles.actionCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.74 : 1 }]}
    >
      <View style={[farmerStyles.actionIcon, { backgroundColor: colors.secondary }]}>
        <BrandIcon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[farmerStyles.actionTitle, { color: colors.foreground }]}>{title}</Text>
      <Text numberOfLines={2} style={[farmerStyles.actionDetail, { color: colors.mutedForeground }]}>{detail}</Text>
      <Feather name="arrow-up-right" size={14} color={colors.mutedForeground} style={farmerStyles.actionArrow} />
    </Pressable>
  );
}

function FarmerActivity({ icon, title, detail, date, colors, positive = false, last = false }: { icon: BrandIconName; title: string; detail: string; date: string; colors: ReturnType<typeof useColors>; positive?: boolean; last?: boolean }) {
  return (
    <View style={[farmerStyles.activityRow, !last && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
      <View style={[farmerStyles.activityIcon, { backgroundColor: positive ? colors.primary : colors.secondary }]}>
        <BrandIcon name={icon} size={15} color={positive ? colors.primaryForeground : colors.primary} />
      </View>
      <View style={farmerStyles.activityCopy}>
        <Text style={[farmerStyles.activityTitle, { color: colors.foreground }]}>{title}</Text>
        <Text style={[farmerStyles.activityDetail, { color: colors.mutedForeground }]}>{detail}</Text>
      </View>
      <Text style={[farmerStyles.activityDate, { color: colors.primary }]}>{date}</Text>
    </View>
  );
}

function FarmerMenuRow({ icon, title, description, onPress, colors, destructive = false }: { icon: BrandIconName; title: string; description: string; onPress: () => void; colors: ReturnType<typeof useColors>; destructive?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [farmerStyles.menuRow, { opacity: pressed ? 0.68 : 1 }]}
    >
      <View style={[farmerStyles.menuIcon, { backgroundColor: destructive ? colors.muted : colors.secondary }]}>
        <BrandIcon name={icon} size={17} color={destructive ? colors.primary : colors.foreground} />
      </View>
      <View style={farmerStyles.menuCopy}>
        <Text style={[farmerStyles.menuTitle, { color: destructive ? colors.primary : colors.foreground }]}>{title}</Text>
        <Text style={[farmerStyles.menuDescription, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
      <Feather name="chevron-right" size={17} color={destructive ? colors.primary : colors.mutedForeground} />
    </Pressable>
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

const educatorStyles = StyleSheet.create({
  hero: { minHeight: 270, borderRadius: 23, overflow: 'hidden', position: 'relative' },
  heroImage: { position: 'absolute', top: 0, right: 0, width: '62%', height: '100%', opacity: 0.72 },
  heroContent: { minHeight: 270, padding: 17, justifyContent: 'space-between', gap: 15, position: 'relative' },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  activeBadge: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 6 },
  activeDot: { width: 6, height: 6, borderRadius: 3 },
  activeText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.55 },
  heroAvatar: { width: 48, height: 48, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  heroAvatarText: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '800' },
  heroCopy: { maxWidth: 275, gap: 6 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 31, fontWeight: '700', letterSpacing: -0.7 },
  heroDescription: { fontFamily: 'Manrope_400Regular', opacity: 0.86, fontSize: 11, lineHeight: 17 },
  heroFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 11 },
  heroFootLabel: { fontFamily: 'Manrope_700Bold', opacity: 0.7, fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  heroFootValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', marginTop: 2 },
  statRow: { borderRadius: 17, borderWidth: 1, minHeight: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 7 },
  statDivider: { width: 1, height: 31 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 23, fontWeight: '700', marginTop: 4 },
  sectionLink: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', paddingBottom: 2 },
  priorityCard: { borderRadius: 20, padding: 15, gap: 12 },
  priorityTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  priorityIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  priorityCopy: { flex: 1, gap: 4 },
  priorityKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  priorityTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 18, fontWeight: '700' },
  priorityText: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 16, opacity: 0.86 },
  priorityFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 11, gap: 8 },
  priorityMetaLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  priorityMetaValue: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '700', marginTop: 2 },
  priorityAction: { borderRadius: 11, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  priorityActionText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  actionCard: { width: '48.6%', minHeight: 116, borderRadius: 17, borderWidth: 1, padding: 11, gap: 5, position: 'relative' },
  actionIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  actionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 16, fontWeight: '700' },
  actionDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, maxWidth: 125 },
  actionArrow: { position: 'absolute', right: 11, top: 13 },
  materialCard: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 12, overflow: 'hidden' },
  materialRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', gap: 10 },
  materialIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  materialCopy: { flex: 1, gap: 3 },
  materialTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11.5, lineHeight: 16, fontWeight: '700' },
  materialMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  activityCard: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 12, overflow: 'hidden' },
  menuGroup: { borderRadius: 17, borderWidth: 1, paddingVertical: 3, overflow: 'hidden' },
});

const farmerStyles = StyleSheet.create({
  hero: { minHeight: 270, borderRadius: 23, overflow: 'hidden', position: 'relative' },
  heroImage: { position: 'absolute', top: 0, right: 0, width: '58%', height: '100%', opacity: 0.9 },
  heroContent: { minHeight: 270, padding: 17, justifyContent: 'space-between', gap: 15, position: 'relative' },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  verifiedBadge: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 6 },
  verifiedDot: { width: 6, height: 6, borderRadius: 3 },
  verifiedText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.55 },
  heroAvatar: { width: 48, height: 48, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  heroAvatarText: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '800' },
  heroCopy: { maxWidth: 265, gap: 6 },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.25 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 27, lineHeight: 31, fontWeight: '700', letterSpacing: -0.7 },
  heroDescription: { fontFamily: 'Manrope_400Regular', opacity: 0.86, fontSize: 11, lineHeight: 17 },
  heroFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 11 },
  heroFootLabel: { fontFamily: 'Manrope_700Bold', opacity: 0.7, fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  heroFootValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700', marginTop: 2 },
  identityCard: { borderRadius: 18, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  identityIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  identityCopy: { flex: 1, gap: 2 },
  identityKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  identityValue: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  identityDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  identityAction: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statRow: { borderRadius: 17, borderWidth: 1, minHeight: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 7 },
  stat: { flex: 1, alignItems: 'center', gap: 3, minWidth: 0 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 17, fontWeight: '700' },
  statLabel: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, textAlign: 'center' },
  statDivider: { width: 1, height: 31 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 23, fontWeight: '700', marginTop: 4 },
  sectionLink: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', paddingBottom: 2 },
  detailCard: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 12, overflow: 'hidden' },
  detailRow: { minHeight: 67, flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  detailCopy: { flex: 1, gap: 3 },
  detailLabel: { fontFamily: 'Manrope_400Regular', fontSize: 10 },
  detailValue: { fontFamily: 'Manrope_700Bold', fontSize: 12, lineHeight: 16, fontWeight: '700' },
  readinessCard: { borderRadius: 19, padding: 14, gap: 12 },
  readinessTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  readinessCopy: { flex: 1, gap: 4 },
  readinessTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 19, fontWeight: '700' },
  readinessText: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
  readinessMark: { width: 49, height: 49, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  readinessValue: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '800' },
  progressTrack: { height: 8, borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  readinessAction: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5 },
  readinessActionText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700' },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  actionCard: { width: '48.6%', minHeight: 116, borderRadius: 17, borderWidth: 1, padding: 11, gap: 5, position: 'relative' },
  actionIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  actionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  actionDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, maxWidth: 125 },
  actionArrow: { position: 'absolute', right: 11, top: 13 },
  activityCard: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 12, overflow: 'hidden' },
  activityRow: { minHeight: 73, flexDirection: 'row', alignItems: 'center', gap: 10 },
  activityIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activityCopy: { flex: 1, gap: 3 },
  activityTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11.5, lineHeight: 16, fontWeight: '700' },
  activityDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  activityDate: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  menuGroup: { borderRadius: 17, borderWidth: 1, paddingVertical: 3, overflow: 'hidden' },
  menuRow: { minHeight: 68, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuCopy: { flex: 1, gap: 3 },
  menuTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '700' },
  menuDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 15 },
});

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