import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { cancelAnimation, Easing, FadeInDown, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
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

const BEAN_SIZE = 44;
const BASKET_WIDTH = 118;
const BASKET_HEIGHT = 104;
const CATCH_AREA_HEIGHT = 280;
const FALL_END = CATCH_AREA_HEIGHT - BASKET_HEIGHT + 14;

function FallingCoffeeBean({
  bean,
  catching,
  catchTargetLeft,
  onReachBottom,
  onCatchAnimationComplete,
}: {
  bean: FallingBean;
  catching: boolean;
  catchTargetLeft: number;
  onReachBottom: (left: number, id: number) => void;
  onCatchAnimationComplete: (id: number) => void;
}) {
  const fall = useSharedValue(-58);
  const catchOffsetX = useSharedValue(0);
  const catchScale = useSharedValue(1);
  const catchOpacity = useSharedValue(1);
  const reachBottomRef = useRef(onReachBottom);
  const catchCompleteRef = useRef(onCatchAnimationComplete);
  reachBottomRef.current = onReachBottom;
  catchCompleteRef.current = onCatchAnimationComplete;

  const notifyReachBottom = useCallback((left: number, id: number) => {
    reachBottomRef.current(left, id);
  }, []);

  const notifyCatchAnimationComplete = useCallback((id: number) => {
    catchCompleteRef.current(id);
  }, []);

  useEffect(() => {
    fall.value = -58;
    catchOffsetX.value = 0;
    catchScale.value = 1;
    catchOpacity.value = 1;
    fall.value = withTiming(FALL_END, { duration: bean.duration }, (finished) => {
      if (finished) runOnJS(notifyReachBottom)(bean.left, bean.id);
    });
    return () => cancelAnimation(fall);
  }, [bean.duration, bean.left, catchOffsetX, catchOpacity, catchScale, fall, notifyReachBottom]);

  useEffect(() => {
    if (!catching) return undefined;
    const targetOffsetX = catchTargetLeft - bean.left;
    fall.value = withTiming(FALL_END + 24, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
    catchOffsetX.value = withTiming(targetOffsetX, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
    catchScale.value = withSequence(
      withTiming(0.86, { duration: 90, easing: Easing.out(Easing.quad) }),
      withTiming(0.48, { duration: 150, easing: Easing.in(Easing.quad) }),
    );
    catchOpacity.value = withTiming(0, {
      duration: 240,
      easing: Easing.in(Easing.quad),
    }, (finished) => {
      if (finished) runOnJS(notifyCatchAnimationComplete)(bean.id);
    });
    return undefined;
  }, [bean.id, bean.left, catchTargetLeft, catching, catchOffsetX, catchOpacity, catchScale, fall, notifyCatchAnimationComplete]);

  const fallStyle = useAnimatedStyle(() => ({
    opacity: catchOpacity.value,
    transform: [{ translateX: catchOffsetX.value }, { translateY: fall.value }, { scale: catchScale.value }],
  }));

  return (
    <Animated.View pointerEvents="none" testID={`falling-coffee-bean-${bean.id}`} style={[styles.fallingBean, { left: bean.left }, fallStyle]}>
      <Image source={require('../assets/images/games-coffee-beans.webp')} contentFit="contain" style={styles.beanImage} />
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
  const [catchingBeanId, setCatchingBeanId] = useState<number | null>(null);
  const [catchTargetLeft, setCatchTargetLeft] = useState(0);
  const [roundPoints, setRoundPoints] = useState(0);
  const [feedback, setFeedback] = useState('Siap');
  const roundPointsRef = useRef(0);
  const beanIdRef = useRef(0);
  const playingRef = useRef(false);
  const [basketX, setBasketX] = useState(94);
  const basketXRef = useRef(94);
  const catchAreaWidthRef = useRef(300);
  const dragStartRef = useRef(94);
  const basketInitializedRef = useRef(false);
  const basketBounce = useSharedValue(0);
  const basketScale = useSharedValue(1);

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
          setFeedback(earned > 0 ? `Selesai · +${earned}` : 'Selesai · coba lagi');
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [addPoints, isPlaying]);

  const spawnBean = useCallback(() => {
    beanIdRef.current += 1;
    const maxLeft = Math.max(12, catchAreaWidthRef.current - BEAN_SIZE - 12);
    setFallingBean({
      id: beanIdRef.current,
      left: 12 + Math.floor(Math.random() * Math.max(1, maxLeft - 12)),
      duration: 1550 + Math.floor(Math.random() * 450),
    });
  }, []);

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
    setCatchingBeanId(null);
    roundPointsRef.current = 0;
    playingRef.current = true;
    setFeedback('Geser keranjang');
    spawnBean();
    setIsPlaying(true);
  };

  const handleCatchAnimationComplete = useCallback((beanId: number) => {
    setCatchingBeanId((currentId) => {
      if (currentId !== beanId) return currentId;
      if (playingRef.current) spawnBean();
      return null;
    });
  }, [spawnBean]);

  const handleBeanDrop = useCallback((beanLeft: number, beanId: number) => {
    if (!playingRef.current) return;
    const beanRight = beanLeft + BEAN_SIZE;
    const basketRight = basketXRef.current + BASKET_WIDTH;
    const caught = beanRight >= basketXRef.current && beanLeft <= basketRight;
    if (caught) {
      setRoundPoints((current) => current + 10);
      setCatchingBeanId(beanId);
      setCatchTargetLeft(basketXRef.current + (BASKET_WIDTH - BEAN_SIZE) / 2);
      setFeedback('Hit · +10');
      basketBounce.value = withSequence(
        withTiming(-4, { duration: 90 }),
        withTiming(0, { duration: 170 }),
      );
      basketScale.value = withSequence(
        withTiming(1.04, { duration: 90 }),
        withTiming(1, { duration: 170 }),
      );
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      setFeedback('Miss');
      spawnBean();
    }
  }, [basketBounce, basketScale, spawnBean]);

  const basketAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: basketBounce.value }, { scale: basketScale.value }],
  }));

  const claimReward = (reward: (typeof rewards)[number]) => {
    if (points < reward.cost) {
      setFeedback(`Kurang ${reward.cost - points} PT`);
      return;
    }
    redeemPoints(reward.id, reward.cost);
     setFeedback('Voucher aktif');
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <Screen bottomGap={24}>
      <Header title="Games" cart={false} back />

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
              <Text style={[styles.eyebrow, { color: colors.accent }]}>PLAY TO EARN</Text>
            </View>
            <Text style={[styles.heroTitle, { color: colors.card }]}>Tangkap biji.</Text>
          </View>
          <View style={[styles.pointsOrb, { backgroundColor: colors.card }]}>
            <BrandIcon name="coffee" size={20} color={colors.primary} />
            <Text style={[styles.pointsValue, { color: colors.primary }]}>{ready ? points : '—'}</Text>
            <Text style={[styles.pointsLabel, { color: colors.mutedForeground }]}>POINTS</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={[styles.gameCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.gameHeader}>
          <View>
            <Text style={[styles.sectionKicker, { color: colors.primary }]}>MINI GAME</Text>
            <Text style={[styles.gameTitle, { color: colors.foreground }]}>Coffee Catch</Text>
          </View>
          <View style={[styles.timerPill, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="circle" size={8} color={isPlaying ? colors.primary : colors.mutedForeground} />
            <Text style={[styles.timerText, { color: colors.primary }]}>{isPlaying ? `${timeLeft}s` : '15s'}</Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: feedback === 'Miss' ? colors.destructive : colors.accent }]} />
          <Text style={[styles.feedback, { color: colors.mutedForeground }]}>{feedback}</Text>
        </View>
        <View
          {...panResponder.panHandlers}
          onLayout={handleCatchAreaLayout}
          accessibilityLabel="Area permainan. Geser keranjang ke kiri atau kanan untuk menangkap biji kopi."
          style={[styles.catchArea, { backgroundColor: colors.secondary, borderColor: colors.border }]}
        >
          {isPlaying && fallingBean && (
            <FallingCoffeeBean
              key={fallingBean.id}
              bean={fallingBean}
              catching={catchingBeanId === fallingBean.id}
              catchTargetLeft={catchTargetLeft}
              onReachBottom={handleBeanDrop}
              onCatchAnimationComplete={handleCatchAnimationComplete}
            />
          )}
          {!isPlaying && (
            <View style={[styles.startHint, { backgroundColor: colors.card }]}>
              <BrandIcon name="coffee" size={18} color={colors.primary} />
              <Text style={[styles.startHintText, { color: colors.foreground }]}>Geser untuk bermain</Text>
            </View>
          )}
          <Animated.View pointerEvents="none" style={[styles.basket, basketAnimation, { left: basketX }]}>
            <Image
              source={require('../assets/images/games-basket.webp')}
              contentFit="contain"
              style={styles.basketImage}
            />
          </Animated.View>
        </View>
        <View style={styles.scoreRow}>
          <Text style={[styles.scoreLabel, { color: colors.mutedForeground }]}>ROUND</Text>
          <Text style={[styles.scoreValue, { color: colors.primary }]}>+{roundPoints}</Text>
        </View>
        <Button testID="coffee-game-start" label={isPlaying ? 'Berjalan' : 'Mulai'} onPress={startGame} disabled={isPlaying} icon="coffee" />
      </View>

      <View style={styles.sectionHeading}>
        <View>
            <Text style={[styles.sectionKicker, { color: colors.primary }]}>REWARDS</Text>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Hadiah</Text>
        </View>
          <View style={[styles.balancePill, { backgroundColor: colors.secondary }]}>
            <BrandIcon name="coffee" size={13} color={colors.primary} />
            <Text style={[styles.balanceText, { color: colors.primary }]}>{ready ? points : '—'} PT</Text>
          </View>
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
                <Text style={[styles.rewardDetail, { color: colors.mutedForeground }]}>{reward.detail.replace('Min. belanja ', 'Min. ')} · {reward.cost} PT</Text>
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
          <Text style={[styles.voucherText, { color: colors.foreground }]}>{vouchers.length} voucher aktif</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 24, padding: 18, minHeight: 136, flexDirection: 'row', alignItems: 'flex-end', gap: 14, overflow: 'hidden' },
  heroCopy: { flex: 1, gap: 7 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eyebrow: { fontFamily: 'Manrope_700Bold', fontSize: 8.5, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { fontFamily: 'Manrope_700Bold', fontSize: 25, lineHeight: 29, letterSpacing: -0.6 },
  pointsOrb: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center', gap: 2 },
  pointsValue: { fontFamily: 'Manrope_700Bold', fontSize: 18, fontWeight: '800' },
  pointsLabel: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 1.1 },
  gameCard: { borderRadius: 22, borderWidth: 1, padding: 15, gap: 11 },
  gameHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  sectionKicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  gameTitle: { fontFamily: 'Manrope_700Bold', fontSize: 19, marginTop: 3 },
  timerPill: { borderRadius: 14, paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5 },
  timerText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  statusRow: { minHeight: 16, flexDirection: 'row', alignItems: 'center', gap: 7 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  feedback: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, lineHeight: 14 },
  catchArea: { height: CATCH_AREA_HEIGHT, borderRadius: 18, borderWidth: 1, overflow: 'hidden', position: 'relative' },
  fallingBean: { position: 'absolute', top: 0, width: BEAN_SIZE, height: BEAN_SIZE, zIndex: 3 },
  beanImage: { width: BEAN_SIZE, height: BEAN_SIZE },
  startHint: { position: 'absolute', top: 52, left: 26, right: 26, minHeight: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 },
  startHintText: { fontFamily: 'Manrope_600SemiBold', fontSize: 11 },
  basket: { position: 'absolute', bottom: 0, width: BASKET_WIDTH, height: BASKET_HEIGHT, alignItems: 'center', justifyContent: 'center' },
  basketImage: { width: BASKET_WIDTH, height: BASKET_HEIGHT },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scoreLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.1 },
  scoreValue: { fontFamily: 'Manrope_700Bold', fontSize: 18 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 19, marginTop: 3 },
  balancePill: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  balanceText: { fontFamily: 'Manrope_700Bold', fontSize: 10.5, letterSpacing: 0.2 },
  rewardList: { gap: 8 },
  rewardCard: { minHeight: 66, borderRadius: 17, borderWidth: 1, padding: 9, flexDirection: 'row', alignItems: 'center', gap: 9 },
  rewardIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rewardCopy: { flex: 1, gap: 2 },
  rewardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 12.5 },
  rewardDetail: { fontFamily: 'Manrope_400Regular', fontSize: 9.5, lineHeight: 13 },
  claimButton: { minWidth: 55, paddingHorizontal: 9, paddingVertical: 8, borderRadius: 11, alignItems: 'center' },
  claimText: { fontFamily: 'Manrope_700Bold', fontSize: 9.5 },
  voucherNote: { borderRadius: 16, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  voucherText: { flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 11, lineHeight: 16 },
});