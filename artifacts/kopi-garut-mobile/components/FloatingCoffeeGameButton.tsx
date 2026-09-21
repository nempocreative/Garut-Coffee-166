import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useCoffeeGame } from '@/context/CoffeeGameContext';
import { useScrollVisibility } from '@/context/ScrollVisibilityContext';
import { useColors } from '@/hooks/useColors';

export function FloatingCoffeeGameButton() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { points } = useCoffeeGame();
  const { isScrolling } = useScrollVisibility();
  const basketLift = useSharedValue(0);
  const basketTilt = useSharedValue(0);

  useEffect(() => {
    basketLift.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 950, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 950, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
    basketTilt.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1150, easing: Easing.inOut(Easing.sin) }),
        withTiming(3, { duration: 1150, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1150, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [basketLift, basketTilt]);

  const basketAnimation = useAnimatedStyle(() => ({
    transform: [
      { translateY: basketLift.value },
      { rotate: `${basketTilt.value}deg` },
    ],
  }));

  const isFarmerRoute = pathname === '/farmers' || pathname === '/extension-farmers' || pathname.startsWith('/farmer/');
  if (isScrolling || isFarmerRoute || pathname === '/login' || pathname === '/support' || pathname === '/coffee-game') return null;

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
        <Animated.View style={[styles.basketAnimationContainer, basketAnimation]}>
          <Image
            source={require('../assets/images/mini-games-icon.png')}
            contentFit="contain"
            style={styles.gamesCartImage}
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
    left: 14,
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 29,
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 9,
  },
  basketAnimationContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gamesCartImage: { width: 48, height: 48 },
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