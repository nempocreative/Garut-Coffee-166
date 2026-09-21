import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useCoffeeGame } from '@/context/CoffeeGameContext';
import { useColors } from '@/hooks/useColors';

export function FloatingCoffeeGameButton() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { points } = useCoffeeGame();
  const beanLift = useSharedValue(0);
  const beanTilt = useSharedValue(0);

  useEffect(() => {
    beanLift.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 950, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 950, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
    beanTilt.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1150, easing: Easing.inOut(Easing.sin) }),
        withTiming(3, { duration: 1150, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1150, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [beanLift, beanTilt]);

  const beanAnimation = useAnimatedStyle(() => ({
    transform: [
      { translateY: beanLift.value },
      { rotate: `${beanTilt.value}deg` },
    ],
  }));

  if (pathname === '/login' || pathname === '/support' || pathname === '/coffee-game') return null;

  const bottomInset = Platform.OS === 'web' ? 34 : insets.bottom;
  const bottomOffset = 91 + bottomInset;
  const pointLabel = points > 999 ? '999+' : String(points);

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Pressable
        testID="floating-coffee-game-button"
        accessibilityRole="button"
        accessibilityLabel={`Buka Games Kopi, ${points} poin`}
        onPress={() => router.push('/coffee-game')}
        style={({ pressed }) => [
          styles.floatingButton,
          {
            bottom: bottomOffset,
            opacity: pressed ? 0.78 : 1,
            shadowColor: colors.foreground,
          },
        ]}
      >
        <Animated.View style={[styles.beanAnimationContainer, beanAnimation]}>
          <Image
            source={require('../assets/images/coffee-bean-menu.png')}
            contentFit="contain"
            style={styles.coffeeBeanImage}
          />
        </Animated.View>
        <View style={[styles.pointBadge, { backgroundColor: colors.primary, borderColor: colors.card }]}>
          <Text style={[styles.pointBadgeText, { color: colors.primaryForeground }]}>{pointLabel}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    left: 18,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 29,
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 9,
  },
  beanAnimationContainer: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeeBeanImage: { width: '100%', height: '100%' },
  pointBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800' },
});