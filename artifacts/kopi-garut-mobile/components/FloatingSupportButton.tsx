import React, { useEffect, useState } from 'react';
import { Linking, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { BrandIcon } from '@/components/BrandIcon';
import { useScrollVisibility } from '@/context/ScrollVisibilityContext';
import { useColors } from '@/hooks/useColors';

const INSTAGRAM_URL = 'https://instagram.com/kopigarut';

type SupportAction = {
  key: 'live' | 'faq' | 'instagram';
  icon: 'users' | 'info' | 'arrow-up-right';
  title: string;
  description: string;
};

const supportActions: SupportAction[] = [
  {
    key: 'live',
    icon: 'users',
    title: 'Chat Live CS',
    description: 'Tanya langsung ke tim Kopi Garut',
  },
  {
    key: 'faq',
    icon: 'info',
    title: 'FAQ Chat AI',
    description: 'Cari jawaban cepat soal kopi dan pesanan',
  },
  {
    key: 'instagram',
    icon: 'arrow-up-right',
    title: 'Instagram',
    description: 'Ikuti cerita terbaru dari Garut',
  },
];

export function FloatingSupportButton() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { isScrolling } = useScrollVisibility();
  const [open, setOpen] = useState(false);
  const beanLift = useSharedValue(0);
  const beanTilt = useSharedValue(0);

  useEffect(() => {
    beanLift.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1050, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1050, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
    beanTilt.value = withRepeat(
      withSequence(
        withTiming(-2, { duration: 1300, easing: Easing.inOut(Easing.sin) }),
        withTiming(2, { duration: 1300, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1300, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [beanLift, beanTilt]);

  useEffect(() => {
    if (isScrolling && open) setOpen(false);
  }, [isScrolling, open]);

  const beanAnimation = useAnimatedStyle(() => ({
    transform: [
      { translateY: beanLift.value },
      { rotate: `${beanTilt.value}deg` },
    ],
  }));

  const isFarmerRoute = pathname === '/farmers' || pathname === '/extension-farmers' || pathname.startsWith('/farmer/');
  if (isScrolling || isFarmerRoute || pathname === '/login' || pathname === '/support') return null;

  const bottomInset = Platform.OS === 'web' ? 0 : insets.bottom;
  const bottomOffset = 91 + bottomInset;

  const handleAction = (key: SupportAction['key']) => {
    setOpen(false);
    if (key === 'instagram') {
      void Linking.openURL(INSTAGRAM_URL);
      return;
    }
    router.push({ pathname: '/support', params: { mode: key } });
  };

  return (
    <>
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <Pressable
          testID="floating-support-button"
          accessibilityRole="button"
          accessibilityLabel={open ? 'Tutup pusat bantuan' : 'Buka pusat bantuan'}
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen((current) => !current)}
          style={({ pressed }) => [
     styles.floatingButton,
            {
              bottom: bottomOffset,
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              shadowColor: colors.foreground,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Animated.View style={[styles.beanAnimationContainer, beanAnimation]}>
             <Image
               source={require('../assets/images/faq-live-chat.webp')}
              contentFit="contain"
              style={styles.coffeeBeanImage}
            />
          </Animated.View>
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            testID="floating-support-backdrop"
            accessibilityLabel="Tutup menu bantuan"
            onPress={() => setOpen(false)}
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.foreground, opacity: 0.26 }]}
          />
          <View
            style={[
              styles.menu,
              {
                bottom: bottomOffset - 10,
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.foreground,
              },
            ]}
          >
            <View style={styles.menuHeader}>
              <View style={styles.menuHeaderCopy}>
                <Text style={[styles.menuEyebrow, { color: colors.primary }]}>PUSAT BANTUAN</Text>
                <Text style={[styles.menuTitle, { color: colors.foreground }]}>Butuh bantuan?</Text>
                <Text style={[styles.menuDescription, { color: colors.mutedForeground }]}>
                  Pilih cara yang paling nyaman untuk terhubung dengan Kopi Garut.
                </Text>
              </View>
              <LinearGradient
                colors={[colors.accent, colors.primary]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={styles.menuBadge}
              >
                <BrandIcon name="info" size={20} color={colors.primaryForeground} />
              </LinearGradient>
            </View>

            <View style={styles.actionList}>
              {supportActions.map((action) => (
                <Pressable
                  key={action.key}
                  testID={`support-action-${action.key}`}
                  accessibilityRole="button"
                  accessibilityLabel={action.title}
                  onPress={() => handleAction(action.key)}
                  style={({ pressed }) => [
                    styles.action,
                    {
                      backgroundColor: pressed ? colors.secondary : colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                    <BrandIcon name={action.icon} size={19} color={colors.primary} />
                  </View>
                  <View style={styles.actionCopy}>
                    <Text style={[styles.actionTitle, { color: colors.foreground }]}>{action.title}</Text>
                    <Text style={[styles.actionDescription, { color: colors.mutedForeground }]}>{action.description}</Text>
                  </View>
                  <BrandIcon name="chevron-right" size={17} color={colors.mutedForeground} />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalRoot: { flex: 1, justifyContent: 'flex-end' },
  floatingButton: {
    position: 'absolute',
    right: 18,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    zIndex: 30,
  },
  beanAnimationContainer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeeBeanImage: { width: '100%', height: '100%' },
  menu: {
    marginHorizontal: 14,
    marginBottom: 12,
    borderRadius: 25,
    borderWidth: 1,
    padding: 16,
    gap: 16,
    elevation: 18,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  menuHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  menuHeaderCopy: { flex: 1, gap: 3 },
  menuEyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.35 },
  menuTitle: { fontFamily: 'Manrope_700Bold', fontSize: 21, letterSpacing: -0.4 },
  menuDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, maxWidth: 270 },
  menuBadge: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  actionList: { gap: 9 },
  action: { minHeight: 66, borderRadius: 16, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  actionCopy: { flex: 1, gap: 3 },
  actionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 13 },
  actionDescription: { fontFamily: 'Manrope_400Regular', fontSize: 10.5, lineHeight: 14 },
});