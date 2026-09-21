import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrandIcon, type BrandIconName } from '@/components/BrandIcon';
import { Button, Header, Screen } from '@/components/AppUI';
import { ProgramSectionTitle } from '@/components/ProgramUI';
import { programLinks } from '@/data/program';
import { hubEvents } from '@/data/hub';
import { useAuth } from '@/context/AuthContext';
import { canAccessRoute } from '@/data/auth';
import { useColors } from '@/hooks/useColors';

const roleCards = [
  { id: 'farmer', role: 'petani', icon: 'coffee' as const, title: 'Petani', description: 'Verifikasi kebun, mutu lot, dan akses pasar.', route: '/verification' },
  { id: 'group', role: 'petani', icon: 'users' as const, title: 'Ketua kelompok', description: 'Pantau anggota, produksi, dan program bantuan.', route: '/group-dashboard' },
  { id: 'extension', role: 'penyuluh', icon: 'map-pin' as const, title: 'Penyuluh', description: 'Catat kunjungan dan tindak lanjut kebun.', route: '/extension-dashboard' },
];

const regularPrograms = [
  {
    id: 'coffee-talk-garut',
    icon: 'users' as const,
    title: 'Coffee Talk Garut',
    category: 'DIALOG & CERITA',
    cycle: 'Rutin setiap bulan',
    next: 'Sesi berikutnya · 10 Okt 2026',
    description: 'Obrolan santai bersama petani, roaster, barista, dan pelaku usaha kopi.',
    image: require('../assets/images/event-festival-garut.jpg'),
  },
  {
    id: 'sekolah-barista',
    icon: 'coffee' as const,
    title: 'Sekolah Barista Kopi Garut',
    category: 'KELAS KETERAMPILAN',
    cycle: 'Batch per kuartal',
    next: 'Batch 01 · 24 Okt 2026',
    description: 'Belajar espresso, manual brew, pelayanan, dan cerita asal kopi untuk barista baru.',
    image: require('../assets/images/origin-coffee.jpg'),
  },
  {
    id: 'cupping-kenal-asal',
    icon: 'trending-up' as const,
    title: 'Cupping & Kenal Asal',
    category: 'MUTU & RASA',
    cycle: 'Rutin setiap dua minggu',
    next: 'Papandayan · 14 Nov 2026',
    description: 'Membaca rasa, membandingkan proses, dan mengenal orang di balik setiap lot.',
    image: require('../assets/images/coffee-beans-natural.png'),
  },
  {
    id: 'kelas-pascapanen',
    icon: 'package' as const,
    title: 'Kelas Pascapanen',
    category: 'UNTUK PETANI',
    cycle: 'Menjelang musim panen',
    next: 'Cikajang · 17 Okt 2026',
    description: 'Praktik sortasi, pengeringan, dan pencatatan mutu untuk menjaga nilai jual kopi.',
    image: require('../assets/images/farmer-iis-nurhayati.jpg'),
  },
];

const derivativeProducts = [
  {
    id: 'essential-oil-kopi',
    icon: 'trending-up' as const,
    title: 'Essential oil kopi',
    description: 'Aroma kopi untuk ruang, relaksasi, dan produk wellness desa.',
  },
  {
    id: 'pewangi-sepatu',
    icon: 'package' as const,
    title: 'Pewangi sepatu',
    description: 'Produk harian berbahan kopi yang praktis dan mudah dipasarkan.',
  },
  {
    id: 'merchandise-desa',
    icon: 'shopping-bag' as const,
    title: 'Merchandise desa',
    description: 'Tote bag, pin, kartu cerita, dan suvenir dengan identitas Garut.',
  },
  {
    id: 'oleh-oleh-aroma',
    icon: 'coffee' as const,
    title: 'Oleh-oleh aroma',
    description: 'Lilin, sabun, dan paket aroma untuk memperluas cerita kopi.',
  },
];

type ProgramCategory = 'Semua' | 'CSR petani kopi' | 'Lingkungan kebun' | 'Keluarga petani' | 'Komunitas kopi';
type ProgramOffer = {
  id: string;
  category: Exclude<ProgramCategory, 'Semua'>;
  icon: BrandIconName;
  title: string;
  description: string;
  target: string;
  support: string;
  deadline: string;
};
type ProgramApplication = {
  programId: string;
  role: string;
  submittedAt: string;
};

const applicationStorageKey = '@kopi-garut/program-applications';
const programCategories: ProgramCategory[] = ['Semua', 'CSR petani kopi', 'Lingkungan kebun', 'Keluarga petani', 'Komunitas kopi'];
const derivativeProgramOffer: ProgramOffer = {
  id: 'pemberdayaan-produk-turunan',
  category: 'Komunitas kopi',
  icon: 'users',
  title: 'Pemberdayaan produk turunan kopi',
  description: 'Pendampingan desa untuk merancang, menguji, dan memasarkan produk baru berbasis kopi.',
  target: 'Desa & kelompok tani',
  support: 'Pendampingan 3 bulan',
  deadline: 'Pendaftaran dibuka',
};
const programOffers: ProgramOffer[] = [
  {
    id: 'beasiswa-anak-petani-kopi',
    category: 'Keluarga petani',
    icon: 'calendar',
    title: 'Beasiswa anak petani kopi',
    description: 'Dukungan pendidikan untuk anak keluarga petani kopi agar bisa melanjutkan sekolah.',
    target: 'Keluarga petani kopi',
    support: 'Beasiswa 1 semester',
    deadline: '30 Nov 2026',
  },
  {
    id: 'klinik-kesehatan-petani',
    category: 'CSR petani kopi',
    icon: 'heart',
    title: 'Klinik kesehatan petani kopi',
    description: 'Layanan pemeriksaan dasar dan edukasi kesehatan untuk petani kopi serta keluarganya.',
    target: 'Petani kopi & keluarga',
    support: 'Hari layanan kesehatan',
    deadline: 'Pendaftaran dibuka',
  },
  {
    id: 'pohon-penaung-kebun',
    category: 'Lingkungan kebun',
    icon: 'coffee',
    title: 'Pohon penaung kebun kopi',
    description: 'Penanaman pohon penaung dan tanaman pendamping untuk menjaga kelembapan serta mutu kebun kopi.',
    target: 'Petani kopi aktif',
    support: 'Bibit & pendampingan tanam',
    deadline: 'Musim hujan 2026',
  },
  {
    id: 'konservasi-mata-air-kebun',
    category: 'Lingkungan kebun',
    icon: 'map-pin',
    title: 'Konservasi mata air kebun',
    description: 'Menjaga sumber air di sekitar kebun kopi melalui aksi resapan dan perawatan bersama.',
    target: 'Kelompok tani kopi',
    support: 'Sarana konservasi',
    deadline: 'Seleksi desa',
  },
  {
    id: 'paket-panen-keluarga',
    category: 'Keluarga petani',
    icon: 'package',
    title: 'Paket panen keluarga',
    description: 'Dukungan kebutuhan dasar bagi keluarga petani kopi selama masa panen dan perawatan kebun.',
    target: 'Keluarga petani kopi',
    support: 'Paket kebutuhan dasar',
    deadline: 'Pendaftaran dibuka',
  },
];
const applicationOffers = [...programOffers, derivativeProgramOffer];

export default function ProgramScreen() {
  const colors = useColors();
  const router = useRouter();
  const { session } = useAuth();
  const [selectedCategory, setSelectedCategory] = React.useState<ProgramCategory>('Semua');
  const [applications, setApplications] = React.useState<ProgramApplication[]>([]);
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const visibleLinks = programLinks.filter((link) => canAccessRoute(link.route, session?.id));
  const visibleRoleCards = roleCards.filter((role) => role.role === session?.id);
  const filteredOffers = selectedCategory === 'Semua'
    ? programOffers
    : programOffers.filter((offer) => offer.category === selectedCategory);
  const myApplications = applications.filter((application) => application.role === session?.id);

  React.useEffect(() => {
    AsyncStorage.getItem(applicationStorageKey).then((value) => {
      if (!value) return;
      try {
        const saved = JSON.parse(value) as ProgramApplication[];
        if (Array.isArray(saved)) setApplications(saved);
      } catch {
        setApplications([]);
      }
    });
  }, []);

  const applyForProgram = async (offer: ProgramOffer) => {
    if (!session) {
      router.push('/login');
      return;
    }

    const alreadyApplied = applications.some((application) => application.programId === offer.id && application.role === session.id);
    if (alreadyApplied) {
      setFeedback('Pengajuan ini sudah tercatat dan sedang ditinjau.');
      return;
    }

    const nextApplications = [
      ...applications,
      { programId: offer.id, role: session.id, submittedAt: new Date().toISOString() },
    ];
    setApplications(nextApplications);
    setFeedback(`Pengajuan ${offer.title} sudah dikirim.`);
    try {
      await AsyncStorage.setItem(applicationStorageKey, JSON.stringify(nextApplications));
    } catch {
      setFeedback('Pengajuan tampil, tetapi belum tersimpan di perangkat.');
    }
  };

  return (
    <Screen>
      <Header back title="Program Kopi Garut" subtitle="PROGRAM · GARUT" />
      <Animated.View entering={FadeInDown.duration(500)} style={[styles.hero, { backgroundColor: colors.foreground }]}>
        <Image source={require('../assets/images/mountain-banner.png')} contentFit="cover" style={styles.heroImage} />
        <View style={[styles.heroShade, { backgroundColor: colors.foreground }]} />
        <View style={styles.heroContent}>
          <View style={styles.heroTopline}>
            <Text style={[styles.heroKicker, { color: colors.accent }]}>PROGRAM KOPI GARUT</Text>
            <View style={[styles.heroMark, { backgroundColor: colors.primary }]}>
              <BrandIcon name="shield" size={21} color={colors.primaryForeground} />
            </View>
          </View>
          <Text style={[styles.heroTitle, { color: colors.card }]}>Belajar, berbagi,{'\n'}tumbuh bersama.</Text>
          <View style={styles.heroBottom}>
            <View style={[styles.heroLine, { backgroundColor: colors.accent }]} />
            <Text style={[styles.heroMeta, { color: colors.background }]}>BELAJAR  ·  BERBAGI  ·  BERKARYA</Text>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.statsBar, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
        <View style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>{regularPrograms.length}</Text><Text style={[styles.statLabel, { color: colors.secondaryForeground }]}>PROGRAM RUTIN</Text></View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>{String(hubEvents.length).padStart(2, '0')}</Text><Text style={[styles.statLabel, { color: colors.secondaryForeground }]}>AGENDA KOPI</Text></View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}><Text style={[styles.statValue, { color: colors.primary }]}>01</Text><Text style={[styles.statLabel, { color: colors.secondaryForeground }]}>EKOSISTEM</Text></View>
      </View>

      <ProgramSectionTitle eyebrow="PROGRAM KAMI" title="Kegiatan rutin untuk yang mencintai kopi." />
      <Text style={[styles.programIntro, { color: colors.mutedForeground }]}>
        Bukan hanya menjual kopi. Kami membuat ruang untuk belajar, bertemu, dan membangun masa depan kopi Garut bersama-sama.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.regularProgramRail}>
        {regularPrograms.map((program, index) => (
          <Pressable
            key={program.id}
            testID={`regular-program-${program.id}`}
            accessibilityRole="button"
            accessibilityLabel={`Lihat jadwal ${program.title}`}
            onPress={() => router.push('/events')}
            style={({ pressed }) => [styles.regularProgramCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}
          >
            <View style={styles.regularProgramImageFrame}>
              <Image source={program.image} contentFit="cover" style={styles.regularProgramImage} />
              <View style={[styles.regularProgramShade, { backgroundColor: colors.foreground }]} />
              <View style={[styles.regularProgramBadge, { backgroundColor: colors.accent }]}>
                <BrandIcon name={program.icon} size={12} color={colors.accentForeground} />
                <Text style={[styles.regularProgramBadgeText, { color: colors.accentForeground }]}>{program.category}</Text>
              </View>
              <Text style={[styles.regularProgramIndex, { color: colors.card }]}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <View style={styles.regularProgramCopy}>
              <Text style={[styles.regularProgramTitle, { color: colors.foreground }]}>{program.title}</Text>
              <Text style={[styles.regularProgramCycle, { color: colors.primary }]}>{program.cycle}</Text>
              <Text numberOfLines={2} style={[styles.regularProgramDescription, { color: colors.mutedForeground }]}>{program.description}</Text>
              <View style={[styles.regularProgramNext, { borderTopColor: colors.border }]}>
                <Text numberOfLines={1} style={[styles.regularProgramNextText, { color: colors.foreground }]}>{program.next}</Text>
                <BrandIcon name="arrow-up-right" size={14} color={colors.primary} />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <ProgramSectionTitle eyebrow="PEMBERDAYAAN DESA" title="Dari kopi, lahir lebih banyak karya." />
      <Animated.View entering={FadeInDown.delay(120).duration(460)} style={[styles.derivativeFeature, { backgroundColor: colors.foreground }]}>
        <View style={styles.derivativeFeatureTop}>
          <View style={[styles.derivativeKicker, { backgroundColor: colors.accent }]}>
            <BrandIcon name="users" size={14} color={colors.accentForeground} />
            <Text style={[styles.derivativeKickerText, { color: colors.accentForeground }]}>PROGRAM DESA</Text>
          </View>
          <Text style={[styles.derivativeIndex, { color: colors.card }]}>04</Text>
        </View>
        <Text style={[styles.derivativeTitle, { color: colors.card }]}>Produk turunan kopi</Text>
        <Text style={[styles.derivativeDescription, { color: colors.background }]}>
          Mengubah potensi kopi dan hasil sampingnya menjadi produk bernilai tambah yang bisa dibuat, dikelola, dan dipasarkan bersama oleh warga desa.
        </Text>
        <View style={styles.derivativeProductGrid}>
          {derivativeProducts.map((product) => (
            <View key={product.id} style={[styles.derivativeProduct, { backgroundColor: colors.card }]}>
              <View style={[styles.derivativeProductIcon, { backgroundColor: colors.secondary }]}>
                <BrandIcon name={product.icon} size={17} color={colors.primary} />
              </View>
              <Text style={[styles.derivativeProductTitle, { color: colors.foreground }]}>{product.title}</Text>
              <Text style={[styles.derivativeProductDescription, { color: colors.mutedForeground }]}>{product.description}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.derivativeNote, { borderTopColor: colors.card }]}>
          <BrandIcon name="map-pin" size={15} color={colors.accent} />
          <Text style={[styles.derivativeNoteText, { color: colors.background }]}>Dikembangkan bersama desa, dari ide sampai siap dijual.</Text>
        </View>
        <Pressable
          testID="apply-program-pemberdayaan-produk-turunan"
          accessibilityRole="button"
          accessibilityLabel="Ajukan pendampingan produk turunan kopi"
          onPress={() => void applyForProgram(derivativeProgramOffer)}
          style={({ pressed }) => [styles.derivativeAction, { backgroundColor: colors.accent, opacity: pressed ? 0.78 : 1 }]}
        >
          <Text style={[styles.derivativeActionText, { color: colors.accentForeground }]}>Ajukan pendampingan desa</Text>
          <BrandIcon name="arrow-up-right" size={16} color={colors.accentForeground} />
        </Pressable>
      </Animated.View>

      <ProgramSectionTitle eyebrow="CSR KOPI GARUT" title="Kontribusi untuk petani & kebun kopi" />
      <Text style={[styles.programIntro, { color: colors.mutedForeground }]}>
        Dukungan CSR yang kembali ke ekosistem kopi: memperkuat keluarga petani, menjaga kebun, dan merawat lingkungan tempat kopi Garut tumbuh.
      </Text>
      <View style={styles.categoryList}>
        {programCategories.map((category) => {
          const selected = selectedCategory === category;
          return (
            <Pressable
              key={category}
              testID={`program-category-${category}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                styles.categoryChip,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  opacity: pressed ? 0.76 : 1,
                },
              ]}
            >
              <Text style={[styles.categoryText, { color: selected ? colors.primaryForeground : colors.foreground }]}>{category}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.offerList}>
        {filteredOffers.map((offer, index) => {
          const applied = myApplications.some((application) => application.programId === offer.id);
          return (
            <Animated.View key={offer.id} entering={FadeInDown.delay(80 + index * 45).duration(420)}>
              <View style={[styles.offerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.offerHeader}>
                  <View style={[styles.offerIcon, { backgroundColor: colors.secondary }]}>
                    <BrandIcon name={offer.icon} size={19} color={colors.primary} />
                  </View>
                  <View style={styles.offerHeading}>
                    <Text style={[styles.offerCategory, { color: colors.primary }]}>{offer.category}</Text>
                    <Text style={[styles.offerTitle, { color: colors.foreground }]}>{offer.title}</Text>
                  </View>
                  <View style={[styles.openPill, { backgroundColor: colors.secondary }]}>
                    <View style={[styles.openDot, { backgroundColor: colors.primary }]} />
                    <Text style={[styles.openText, { color: colors.primary }]}>Dibuka</Text>
                  </View>
                </View>
                <Text numberOfLines={2} style={[styles.offerDescription, { color: colors.mutedForeground }]}>{offer.description}</Text>
                <View style={[styles.offerMeta, { borderTopColor: colors.border }]}>
                  <View style={styles.offerMetaItem}>
                    <Text style={[styles.offerMetaLabel, { color: colors.mutedForeground }]}>UNTUK</Text>
                    <Text numberOfLines={1} style={[styles.offerMetaValue, { color: colors.foreground }]}>{offer.target}</Text>
                  </View>
                  <View style={styles.offerMetaItem}>
                    <Text style={[styles.offerMetaLabel, { color: colors.mutedForeground }]}>DUKUNGAN</Text>
                    <Text numberOfLines={1} style={[styles.offerMetaValue, { color: colors.foreground }]}>{offer.support}</Text>
                  </View>
                  <View style={styles.offerMetaItem}>
                    <Text style={[styles.offerMetaLabel, { color: colors.mutedForeground }]}>BATAS</Text>
                    <Text numberOfLines={1} style={[styles.offerMetaValue, { color: colors.foreground }]}>{offer.deadline}</Text>
                  </View>
                </View>
                <Pressable
                  testID={`apply-program-${offer.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={applied ? `Pengajuan ${offer.title} sudah dikirim` : `Ajukan ${offer.title}`}
                  onPress={() => void applyForProgram(offer)}
                  style={({ pressed }) => [
                    styles.offerAction,
                    {
                      backgroundColor: applied ? colors.secondary : colors.primary,
                      opacity: pressed ? 0.78 : 1,
                    },
                  ]}
                >
                  <BrandIcon name={applied ? 'check' : 'arrow-up-right'} size={15} color={applied ? colors.primary : colors.primaryForeground} />
                  <Text style={[styles.offerActionText, { color: applied ? colors.primary : colors.primaryForeground }]}>
                    {applied ? 'Sudah diajukan' : session ? 'Ajukan program' : 'Masuk untuk mengajukan'}
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          );
        })}
      </View>
      {feedback && (
        <View style={[styles.feedback, { backgroundColor: colors.secondary }]}>
          <BrandIcon name="check" size={16} color={colors.primary} />
          <Text style={[styles.feedbackText, { color: colors.secondaryForeground }]}>{feedback}</Text>
        </View>
      )}

      {session && myApplications.length > 0 && (
        <>
          <ProgramSectionTitle eyebrow="PENGAJUAN SAYA" title="Sedang ditinjau" />
          <View style={styles.applicationList}>
            {myApplications.map((application) => {
              const offer = applicationOffers.find((item) => item.id === application.programId);
              if (!offer) return null;
              return (
                <View key={`${application.role}-${application.programId}`} style={[styles.applicationCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                  <View style={[styles.applicationIcon, { backgroundColor: colors.primary }]}><BrandIcon name="calendar" size={16} color={colors.primaryForeground} /></View>
                  <View style={styles.applicationCopy}>
                    <Text style={[styles.applicationTitle, { color: colors.foreground }]}>{offer.title}</Text>
                    <Text style={[styles.applicationMeta, { color: colors.mutedForeground }]}>Pengajuan diterima · menunggu verifikasi</Text>
                  </View>
                  <View style={[styles.applicationStatus, { backgroundColor: colors.card }]}><Text style={[styles.applicationStatusText, { color: colors.primary }]}>PROSES</Text></View>
                </View>
              );
            })}
          </View>
        </>
      )}

      <ProgramSectionTitle eyebrow="MULAI DARI PERANMU" title="Pilih ruang kerja" />
      {!session ? (
        <View style={[styles.accessCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={[styles.accessIcon, { backgroundColor: colors.card }]}><BrandIcon name="lock" size={19} color={colors.primary} /></View>
          <View style={styles.accessCopy}>
            <Text style={[styles.accessTitle, { color: colors.foreground }]}>Buka akses program</Text>
            <Text style={[styles.accessText, { color: colors.mutedForeground }]}>Masuk untuk melihat ruang kerja yang sesuai.</Text>
          </View>
          <Button label="Masuk" onPress={() => router.push('/login')} secondary />
        </View>
      ) : (
        <View style={styles.roleList}>
          {visibleRoleCards.map((role) => (
            <Pressable key={role.id} testID={`program-role-${role.id}`} accessibilityRole="button" accessibilityLabel={`Buka ruang ${role.title}`} onPress={() => router.push(role.route as never)} style={({ pressed }) => [styles.roleCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
              <View style={[styles.roleIcon, { backgroundColor: colors.primary }]}><BrandIcon name={role.icon} size={21} color={colors.primaryForeground} /></View>
              <View style={styles.roleCopy}><Text style={[styles.roleLabel, { color: colors.primary }]}>RUANG KERJA</Text><Text style={[styles.roleTitle, { color: colors.foreground }]}>{role.title}</Text></View>
              <View style={[styles.roleArrow, { backgroundColor: colors.secondary }]}><BrandIcon name="arrow-up-right" size={16} color={colors.primary} /></View>
            </Pressable>
          ))}
        </View>
      )}
      <ProgramSectionTitle eyebrow="SEMUA LAYANAN" title="Jelajahi program" />
      {session ? <View style={styles.linkList}>
        {visibleLinks.map((link, index) => (
          <Animated.View key={link.id} entering={FadeInDown.delay(100 + index * 45).duration(420)} style={styles.serviceColumn}>
            <Pressable testID={`program-link-${link.id}`} accessibilityRole="button" accessibilityLabel={link.title} onPress={() => router.push(link.route as never)} style={({ pressed }) => [styles.serviceTile, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}>
              <View style={styles.serviceTop}>
                <View style={[styles.serviceIcon, { backgroundColor: colors.secondary }]}><BrandIcon name={link.icon} size={18} color={colors.primary} /></View>
                <BrandIcon name="arrow-up-right" size={15} color={colors.primary} />
              </View>
              <Text numberOfLines={2} style={[styles.serviceTitle, { color: colors.foreground }]}>{link.title}</Text>
              <View style={[styles.serviceNumber, { backgroundColor: colors.muted }]}><Text style={[styles.serviceNumberText, { color: colors.mutedForeground }]}>{String(index + 1).padStart(2, '0')}</Text></View>
            </Pressable>
          </Animated.View>
        ))}
      </View> : <Text style={[styles.hiddenHint, { color: colors.mutedForeground }]}>Layanan program akan muncul setelah kamu masuk.</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, minHeight: 238, overflow: 'hidden', position: 'relative' },
  heroImage: { ...StyleSheet.absoluteFill, opacity: 0.38 },
  heroShade: { ...StyleSheet.absoluteFill, opacity: 0.8 },
  heroContent: { minHeight: 238, padding: 18, justifyContent: 'space-between' },
  heroTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.35 },
  heroMark: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 29, lineHeight: 32, letterSpacing: -0.75 },
  heroBottom: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  heroLine: { width: 25, height: 2 },
  heroMeta: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.9, opacity: 0.82 },
  statsBar: { minHeight: 70, borderRadius: 18, borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontFamily: 'Manrope_700Bold', fontSize: 20, lineHeight: 22, fontWeight: '800' },
  statLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  statDivider: { width: 1, height: 30 },
  programIntro: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, maxWidth: 345 },
  regularProgramRail: { gap: 10, paddingRight: 20 },
  regularProgramCard: { width: 235, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  regularProgramImageFrame: { height: 122, position: 'relative', overflow: 'hidden' },
  regularProgramImage: { width: '100%', height: '100%' },
  regularProgramShade: { ...StyleSheet.absoluteFill, opacity: 0.12 },
  regularProgramBadge: { position: 'absolute', left: 9, top: 9, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  regularProgramBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.7 },
  regularProgramIndex: { position: 'absolute', right: 10, bottom: 7, fontFamily: 'Manrope_700Bold', fontSize: 21, fontWeight: '800', opacity: 0.72 },
  regularProgramCopy: { minHeight: 164, padding: 12, gap: 5 },
  regularProgramTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 19, fontWeight: '800' },
  regularProgramCycle: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  regularProgramDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 15 },
  regularProgramNext: { marginTop: 'auto', paddingTop: 8, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  regularProgramNextText: { flex: 1, fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '700' },
  derivativeFeature: { borderRadius: 22, padding: 14, gap: 13 },
  derivativeFeatureTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  derivativeKicker: { borderRadius: 9, paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  derivativeKickerText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  derivativeIndex: { fontFamily: 'Manrope_700Bold', fontSize: 24, fontWeight: '800', opacity: 0.76 },
  derivativeTitle: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '800', letterSpacing: -0.45 },
  derivativeDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17, opacity: 0.86 },
  derivativeProductGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  derivativeProduct: { width: '48.5%', minHeight: 126, borderRadius: 16, padding: 10, gap: 5 },
  derivativeProductIcon: { width: 31, height: 31, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 1 },
  derivativeProductTitle: { fontFamily: 'Manrope_700Bold', fontSize: 11, lineHeight: 15, fontWeight: '800' },
  derivativeProductDescription: { fontFamily: 'Manrope_400Regular', fontSize: 9, lineHeight: 13 },
  derivativeNote: { borderTopWidth: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'center', gap: 7 },
  derivativeNoteText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14, opacity: 0.85 },
  derivativeAction: { minHeight: 42, borderRadius: 13, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 9 },
  derivativeActionText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '800' },
  categoryList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 9 },
  categoryText: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '800' },
  offerList: { gap: 11 },
  offerCard: { borderWidth: 1, borderRadius: 20, padding: 13, gap: 11 },
  offerHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  offerIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  offerHeading: { flex: 1, gap: 2 },
  offerCategory: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  offerTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, lineHeight: 19, fontWeight: '800' },
  openPill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 6 },
  openDot: { width: 5, height: 5, borderRadius: 3 },
  openText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800' },
  offerDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  offerMeta: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, gap: 7 },
  offerMetaItem: { flex: 1, gap: 3 },
  offerMetaLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.8 },
  offerMetaValue: { fontFamily: 'Manrope_700Bold', fontSize: 10, lineHeight: 14 },
  offerAction: { minHeight: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  offerActionText: { fontFamily: 'Manrope_700Bold', fontSize: 11, fontWeight: '800' },
  feedback: { borderRadius: 15, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 8 },
  feedbackText: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  applicationList: { gap: 9 },
  applicationCard: { borderWidth: 1, borderRadius: 17, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 9 },
  applicationIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  applicationCopy: { flex: 1, gap: 3 },
  applicationTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12, fontWeight: '800' },
  applicationMeta: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  applicationStatus: { borderRadius: 8, paddingHorizontal: 7, paddingVertical: 5 },
  applicationStatusText: { fontFamily: 'Manrope_700Bold', fontSize: 7, fontWeight: '800', letterSpacing: 0.6 },
  roleList: { gap: 10 },
  roleCard: { minHeight: 72, borderRadius: 18, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  roleIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  roleCopy: { flex: 1, gap: 3 },
  roleLabel: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  roleTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, fontWeight: '800' },
  roleArrow: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  accessCard: { borderWidth: 1, borderRadius: 20, padding: 14, gap: 11 },
  accessIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  accessCopy: { gap: 4 },
  accessTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, fontWeight: '700' },
  accessText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 250 },
  hiddenHint: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 },
  linkList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceColumn: { width: '48.5%' },
  serviceTile: { minHeight: 132, borderWidth: 1, borderRadius: 18, padding: 12, justifyContent: 'space-between', overflow: 'hidden', position: 'relative' },
  serviceTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  serviceIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  serviceTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13, lineHeight: 17, fontWeight: '800', paddingRight: 4 },
  serviceNumber: { position: 'absolute', right: 11, bottom: 10, width: 25, height: 18, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  serviceNumberText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 0.6 },
});