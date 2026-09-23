import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export function AppLoading() {
  const logoScale = useSharedValue(1);
  const ringRotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0.35);

  useEffect(() => {
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1050, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1050, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 7200, easing: Easing.linear }),
      -1,
      false,
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.25, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [glowOpacity, logoScale, ringRotation]);

  const logoStyle = useAnimatedStyle(() => ({ transform: [{ scale: logoScale.value }] }));
  const ringStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${ringRotation.value}deg` }] }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 0.92 + glowOpacity.value * 0.13 }],
  }));

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <LinearGradient colors={['#F6F0E8', '#EDE3D6']} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <View style={styles.logoStage}>
          <Animated.View style={[styles.glow, glowStyle]} />
          <Animated.View style={[styles.ring, ringStyle]}>
            <View style={styles.ringAccent} />
          </Animated.View>
          <Animated.View style={[styles.logoFrame, logoStyle]}>
            <Image
              source={require('../assets/images/kopi-garut-logo.png')}
              contentFit="contain"
              style={styles.logo}
            />
          </Animated.View>
        </View>
        <View style={styles.copy}>
          <Text style={styles.brand}>Garut <Text style={styles.brandAccent}>Beans</Text></Text>
          <Text style={styles.caption}>MENYIAPKAN RITUAL KOPIMU</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <Text style={styles.footer}>DARI KEBUN GARUT, UNTUK SETIAP CANGKIR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, minHeight: '100%', backgroundColor: '#F6F0E8', alignItems: 'center', justifyContent: 'center' },
  content: { width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  logoStage: { width: 166, height: 166, alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', width: 132, height: 132, borderRadius: 66, backgroundColor: '#D3A15F' },
  ring: { position: 'absolute', width: 156, height: 156, borderRadius: 78, borderWidth: 1, borderColor: 'rgba(168, 84, 59, 0.28)', borderStyle: 'dashed', alignItems: 'flex-start', justifyContent: 'center' },
  ringAccent: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A8543B', marginLeft: -4 },
  logoFrame: { width: 108, height: 108, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 108, height: 108, borderRadius: 54 },
  copy: { alignItems: 'center', gap: 8, marginTop: 22 },
  brand: { color: '#2A201D', fontFamily: 'Manrope_700Bold', fontSize: 25, fontWeight: '800', letterSpacing: -0.7 },
  brandAccent: { color: '#A8543B' },
  caption: { color: '#806E63', fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.8 },
  progressTrack: { width: 136, height: 4, borderRadius: 4, backgroundColor: 'rgba(168, 84, 59, 0.15)', overflow: 'hidden', marginTop: 28 },
  progressFill: { width: '62%', height: '100%', borderRadius: 4, backgroundColor: '#A8543B' },
  dots: { flexDirection: 'row', gap: 5, marginTop: 15 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(128, 110, 99, 0.35)' },
  dotActive: { width: 17, backgroundColor: '#D3A15F' },
  footer: { position: 'absolute', bottom: 34, color: '#806E63', fontFamily: 'Manrope_700Bold', fontSize: 8, fontWeight: '800', letterSpacing: 1.25 },
});