import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

function FallingCoffeeBean({ bean, onCatch, onMiss }: { bean: FallingBean; onCatch: () => void; onMiss: () => void }) {
  const colors = useColors();
  const fall = useSharedValue(-58);
  const missRef = useRef(onMiss);
  missRef.current = onMiss;

  const notifyMiss = React.useCallback(() => {
    missRef.current();
  }, []);

  useEffect(() => {
    fall.value = -58;
    fall.value = withTiming(238, { duration: bean.duration }, (finished) => {
      if (finished) runOnJS(notifyMiss)();
    });
    return () => cancelAnimation(fall);
  }, [bean.duration, fall, notifyMiss]);

  const fallStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: fall.value }],
  }));

  return (
    <Animated.View style={[styles.fallingBean, { left: bean.left }, fallStyle]}>
      <Pressable
        testID={`falling-coffee-bean-${bean.id}`}
        accessibilityRole="button"
        accessibilityLabel="Tangkap biji kopi"
        hitSlop={10}
        onPress={onCatch}
        style={({ pressed }) => [
          styles.fallingBeanButton,
          {
            backgroundColor: colors.accent,
            borderColor: colors.primary,
            shadowColor: colors.foreground,
            opacity: pressed ? 0.68 : 1,
          },
        ]}
      >
        <Image source={require('../assets/images/coffee-bean-menu.png')} contentFit="contain" style={styles.beanImage} />
      </Pressable>
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
  const [feedback, setFeedback] = useState('Tekan mulai, lalu tangkap biji kopi yang jatuh.');
  const roundPointsRef = useRef(0);
  const beanIdRef = useRef(0);
  const playingRef = useRef(false);

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
    setFallingBean({
      id: beanIdRef.current,
      left: 12 + Math.floor(Math.random() * 240),
      duration: 1550 + Math.floor(Math.random() * 450),
    });
  };

  const startGame = () => {
    setTimeLeft(15);
    setRoundPoints(0);
    roundPointsRef.current = 0;
    playingRef.current = true;
    setFeedback('Tangkap biji kopi yang jatuh sebelum masuk keranjang.');
    spawnBean();
    setIsPlaying(true);
  };

  const collectBean = () => {
    if (!playingRef.current) return;
    setRoundPoints((current) => current + 10);
    spawnBean();
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const missBean = () => {
    if (!playingRef.current) return;
    setFeedback('Biji lolos. Tangkap yang berikutnya.');
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
        <View style={[styles.catchArea, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          {isPlaying && fallingBean && <FallingCoffeeBean key={fallingBean.id} bean={fallingBean} onCatch={collectBean} onMiss={missBean} />}
          {!isPlaying && (
            <View style={[styles.startHint, { backgroundColor: colors.card }]}>
              <BrandIcon name="coffee" size={18} color={colors.primary} />
              <Text style={[styles.startHintText, { color: colors.foreground }]}>Biji kopi akan jatuh dari atas</Text>
            </View>
          )}
          <View style={[styles.basket, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <BrandIcon name="shopping-bag" size={20} color={colors.primary} />
            <Text style={[styles.basketText, { color: colors.mutedForeground }]}>KERANJANG</Text>
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
  catchArea: { height: 282, borderRadius: 18, borderWidth: 1, overflow: 'hidden', position: 'relative' },
  fallingBean: { position: 'absolute', top: 0, width: 52, height: 52, zIndex: 3 },
  fallingBeanButton: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.22, shadowRadius: 6, elevation: 5 },
  beanImage: { width: 38, height: 38 },
  startHint: { position: 'absolute', top: 82, left: 30, right: 30, minHeight: 58, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 },
  startHintText: { fontFamily: 'Manrope_600SemiBold', fontSize: 11 },
  basket: { position: 'absolute', left: '29%', right: '29%', bottom: 14, height: 48, borderRadius: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  basketText: { fontFamily: 'Manrope_700Bold', fontSize: 7, letterSpacing: 1.1 },
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