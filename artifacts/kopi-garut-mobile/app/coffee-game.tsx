import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { cancelAnimation, FadeInDown, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Button, Header, Screen } from '@/components/AppUI';
import { BrandIcon } from '@/components/BrandIcon';
import { useCoffeeGame } from '@/context/CoffeeGameContext';
import { useColors } from '@/hooks/useColors';

const rewards = [
  { id: 'discount-10k', cost: 100, title: 'Potongan Rp10.000', detail: 'Min. belanja Rp100.000' },
  { id: 'discount-25k', cost: 220, title: 'Potongan Rp25.000', detail: 'Min. belanja Rp180.000' },
  { id: 'discount-50k', cost: 400, title: 'Potongan Rp50.000', detail: 'Min. belanja Rp300.000' },
];
type FallingBean = {
  id: number;
  left: number;
  duration: number;
};

const BEAN_SIZE = 52;
const BASKET_WIDTH = 132;
const FALL_END = 154;

function FallingCoffeeBean({ bean, onReachBottom }: { bean: FallingBean; onReachBottom: (left: number) => void }) {
  const fall = useSharedValue(-58);
  const reachBottomRef = useRef(onReachBottom);
  reachBottomRef.current = onReachBottom;

  const notifyReachBottom = useCallback((left: number) => {
    reachBottomRef.current(left);
  }, []);

  useEffect(() => {
    fall.value = -58;
    fall.value = withTiming(FALL_END, { duration: bean.duration }, (finished) => {
      if (finished) runOnJS(notifyReachBottom)(bean.left);
    });
    return () => cancelAnimation(fall);
  }, [bean.duration, bean.left, fall, notifyReachBottom]);

  const fallStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: fall.value }],
  }));

  return (
    <Animated.View pointerEvents="none" testID={`falling-coffee-bean-${bean.id}`} style={[styles.fallingBean, { left: bean.left }, fallStyle]}>
      <Image source={require('../assets/images/coffee-bean-menu.png')} contentFit="contain" style={styles.beanImage} />
    </Animated.View>
  );
}

export default function CoffeeGameScreen() {
  const colors = useColors();
  const router = useRouter();
  const { points, vouchers, ready, addPoints, redeemPoints } = useCoffeeGame();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [fallingBean, setFallingBean] = useState<FallingBean | null>(null);
  const [roundPoints, setRoundPoints] = useState(0);
  const [feedback, setFeedback] = useState('Tekan mulai, lalu geser keranjang untuk menangkap kopi.');
  const roundPointsRef = useRef(0);
  const beanIdRef = useRef(0);
  const playingRef = useRef(false);
  const [basketX, setBasketX] = useState(94);
  const basketXRef = useRef(94);
  const catchAreaWidthRef = useRef(300);
  const dragStartRef = useRef(94);
  const basketInitializedRef = useRef(false);

  useEffect(() => {
    roundPointsRef.current = roundPoints;
  }, [roundPoints]);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          const earned = roundPointsRef.current;
          if (earned > 0) addPoints(earned);
          setRoundPoints(0);
          setFallingBean(null);
          playingRef.current = false;
          setIsPlaying(false);
          setFeedback(earned > 0 ? `Putaran selesai. Kamu menangkap ${earned / 10} biji dan mendapat ${earned} poin.` : 'Putaran selesai. Coba tangkap bijinya lebih cepat.');
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [addPoints, isPlaying]);

  const spawnBean = () => {
    beanIdRef.current += 1;
    const maxLeft = Math.max(12, catchAreaWidthRef.current - BEAN_SIZE - 12);
    setFallingBean({
      id: beanIdRef.current,
      left: 12 + Math.floor(Math.random() * Math.max(1, maxLeft - 12)),
      duration: 1550 + Math.floor(Math.random() * 450),
    });
  };

  const clampBasketX = (nextX: number) => Math.max(0, Math.min(nextX, Math.max(0, catchAreaWidthRef.current - BASKET_WIDTH)));

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gesture) => isPlaying && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onPanResponderGrant: () => {
      dragStartRef.current = basketXRef.current;
    },
    onPanResponderMove: (_, gesture) => {
      const nextX = clampBasketX(dragStartRef.current + gesture.dx);
      basketXRef.current = nextX;
      setBasketX(nextX);
    },
  }), [isPlaying]);

  const handleCatchAreaLayout = (event: { nativeEvent: { layout: { width: number } } }) => {
    const width = event.nativeEvent.layout.width;
    catchAreaWidthRef.current = width;
    if (!basketInitializedRef.current) {
      const centeredX = Math.max(0, (width - BASKET_WIDTH) / 2);
      basketXRef.current = centeredX;
      setBasketX(centeredX);
      dragStartRef.current = centeredX;
      basketInitializedRef.current = true;
    }
  };

  const startGame = () => {
    setTimeLeft(15);
    setRoundPoints(0);
    roundPointsRef.current = 0;
    playingRef.current = true;
    setFeedback('Geser keranjang ke kiri atau kanan untuk menangkap biji kopi.');
    spawnBean();
    setIsPlaying(true);
  };

  const handleBeanDrop = (beanLeft: number) => {
    if (!playingRef.current) return;
    const beanRight = beanLeft + BEAN_SIZE;
    const basketRight = basketXRef.current + BASKET_WIDTH;
    const caught = beanRight >= basketXRef.current && beanLeft <= basketRight;
    if (caught) {
      setRoundPoints((current) => current + 10);
      setFeedback('Mantap! Kopi masuk keranjang.');
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      setFeedback('Kopi terlewat. Geser keranjang ke posisi berikutnya.');
    }
    spawnBean();
  };

  const claimReward = (reward: (typeof rewards)[number]) => {
    if (points < reward.cost) {
      setFeedback(`Butuh ${reward.cost - points} poin lagi untuk ${reward.title.toLowerCase()}.`);
      return;
    }
    redeemPoints(reward.id, reward.cost);
    setFeedback(`${reward.title} sudah masuk ke voucher kamu.`);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <Screen bottomGap={24}>
      <Header title="Games Kopi" subtitle="PANEN POIN" cart={false} back />

      <Animated.View entering={FadeInDown.duration(450)}>
        <LinearGradient
          colors={[colors.foreground, colors.secondaryForeground]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroCopy}>
            <View style={styles.eyebrowRow}>
              <BrandIcon name="coffee" size={14} color={colors.accent} />
              <Text style={[styles.eyebrow, { color: colors.accent }]}>GAMES KOPI GARUT</Text>
            </View>
            <Text style={[styles.heroTitle, { color: colors.card }]}>Tangkap biji, kumpulkan poin.</Text>
            <Text style={[styles.heroDescription, { color: colors.background }]}>
              Main sebentar setiap hari dan tukarkan poinmu menjadi potongan untuk pesanan kopi.
            </Text>
          </View>
          <View style={[styles.pointsOrb, { backgroundColor: colors.card }]}>
            <BrandIcon name="coffee" size={20} color={colors.primary} />
            <Text style={[styles.pointsValue, { color: colors.primary }]}>{ready ? points : '—'}</Text>
            <Text style={[styles.pointsLabel, { color: colors.mutedForeground }]}>POIN</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={[styles.gameCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.gameHeader}>
          <View>
            <Text style={[styles.sectionKicker, { color: colors.primary }]}>PUTARAN HARI INI</Text>
            <Text style={[styles.gameTitle, { color: colors.foreground }]}>Panen biji kopi</Text>
          </View>
          <View style={[styles.timerPill, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="calendar" size={14} color={colors.primary} />
            <Text style={[styles.timerText, { color: colors.primary }]}>{isPlaying ? `${timeLeft}s` : '15s'}</Text>
          </View>
        </View>
        <Text style={[styles.feedback, { color: colors.mutedForeground }]}>{feedback}</Text>
        <View
          {...panResponder.panHandlers}
          onLayout={handleCatchAreaLayout}
          accessibilityLabel="Area permainan. Geser keranjang ke kiri atau kanan untuk menangkap biji kopi."
          style={[styles.catchArea, { backgroundColor: colors.secondary, borderColor: colors.border }]}
        >
          {isPlaying && fallingBean && <FallingCoffeeBean key={fallingBean.id} bean={fallingBean} onReachBottom={handleBeanDrop} />}
          {!isPlaying && (
            <View style={[styles.startHint, { backgroundColor: colors.card }]}>
              <BrandIcon name="coffee" size={18} color={colors.primary} />
              <Text style={[styles.startHintText, { color: colors.foreground }]}>Geser keranjang untuk menangkap kopi</Text>
            </View>
          )}
          <View pointerEvents="none" style={[styles.basket, { left: basketX }]}>
            <Image
              source={require('../assets/images/games-basket.png')}
              contentFit="contain"
              style={styles.basketImage}
            />
          </View>
        </View>
        <View style={styles.scoreRow}>
          <Text style={[styles.scoreLabel, { color: colors.mutedForeground }]}>POIN PUTARAN</Text>
          <Text style={[styles.scoreValue, { color: colors.primary }]}>+{roundPoints}</Text>
        </View>
        <Button testID="coffee-game-start" label={isPlaying ? 'Tangkap biji yang jatuh' : 'Mulai bermain'} onPress={startGame} disabled={isPlaying} icon="coffee" />
      </View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={[styles.sectionKicker, { color: colors.primary }]}>TUKARKAN POIN</Text>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Hadiah untuk belanjamu</Text>
        </View>
        <BrandIcon name="shopping-bag" size={22} color={colors.accent} />
      </View>

      <View style={styles.rewardList}>
        {rewards.map((reward, index) => {
          const claimed = vouchers.includes(reward.id);
          const canClaim = points >= reward.cost;
          return (
            <Animated.View key={reward.id} entering={FadeInDown.delay(index * 60).duration(400)} style={[styles.rewardCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.rewardIcon, { backgroundColor: colors.secondary }]}>
                <BrandIcon name="shopping-bag" size={18} color={colors.primary} />
              </View>
              <View style={styles.rewardCopy}>
                <Text style={[styles.rewardTitle, { color: colors.foreground }]}>{reward.title}</Text>
                <Text style={[styles.rewardDetail, { color: colors.mutedForeground }]}>{reward.detail} · {reward.cost} poin</Text>
              </View>
              <Pressable
                testID={`coffee-reward-${reward.id}`}
                accessibilityRole="button"
                accessibilityLabel={claimed ? `${reward.title} sudah ditukar` : `Tukar ${reward.title}`}
                disabled={claimed}
                onPress={() => claimReward(reward)}
                style={({ pressed }) => [
                  styles.claimButton,
                  {
                    backgroundColor: claimed ? colors.muted : canClaim ? colors.primary : colors.secondary,
                    opacity: pressed ? 0.72 : 1,
                  },
                ]}
              >
                <Text style={[styles.claimText, { color: claimed || !canClaim ? colors.mutedForeground : colors.primaryForeground }]}>{claimed ? 'Tersimpan' : canClaim ? 'Tukar' : 'Kurang'}</Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      {vouchers.length > 0 && (
        <View style={[styles.voucherNote, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <BrandIcon name="check" size={18} color={colors.primary} />
          <Text style={[styles.voucherText, { color: colors.foreground }]}>Voucher tersimpan: {vouchers.length}. Gunakan saat checkout untuk mendapatkan potongan belanja.</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 24, padding: 18, minHeight: 178, flexDirection: 'row', alignItems: 'flex-end', gap: 14, overflow: 'hidden' },
  heroCopy: { flex: 1, gap: 9 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 8.5, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 25, lineHeight: 29, letterSpacing: -0.6 },
  heroDescription: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  pointsOrb: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center', gap: 2 },
  pointsValue: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '800' },
  pointsLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 1.1 },
  gameCard: { borderRadius: 22, borderWidth: 1, padding: 16, gap: 13 },
  gameHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  gameTitle: { fontFamily: 'Manrope_700Bold', fontSize: 19, marginTop: 3 },
  timerPill: { borderRadius: 14, paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5 },
  timerText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  feedback: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16 },
  catchArea: { height: 224, borderRadius: 18, borderWidth: 1, overflow: 'hidden', position: 'relative' },
  fallingBean: { position: 'absolute', top: 0, width: 52, height: 52, zIndex: 3 },
  beanImage: { width: 38, height: 38 },
  startHint: { position: 'absolute', top: 58, left: 30, right: 30, minHeight: 58, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 },
  startHintText: { fontFamily: 'Manrope_600SemiBold', fontSize: 11 },
  basket: { position: 'absolute', bottom: 0, width: BASKET_WIDTH, height: 116, alignItems: 'center', justifyContent: 'center' },
  basketImage: { width: BASKET_WIDTH, height: 116 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scoreLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.1 },
  scoreValue: { fontFamily: 'Manrope_700Bold', fontSize: 18 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 19, marginTop: 3 },
  rewardList: { gap: 9 },
  rewardCard: { minHeight: 70, borderRadius: 17, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  rewardIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  rewardCopy: { flex: 1, gap: 3 },
  rewardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12.5 },
  rewardDetail: { fontFamily: 'Manrope_400Regular', fontSize: 10, lineHeight: 14 },
  claimButton: { minWidth: 57, paddingHorizontal: 9, paddingVertical: 9, borderRadius: 12, alignItems: 'center' },
  claimText: { fontFamily: 'Manrope_700Bold', fontSize: 10 },
  voucherNote: { borderRadius: 16, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  voucherText: { flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 11, lineHeight: 16 },
});