import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { SvgXml } from 'react-native-svg';
import * as QRCode from 'qrcode/lib/browser';
import { Feather } from '@expo/vector-icons';
import { BrandIcon } from '@/components/BrandIcon';
import type { Farmer } from '@/data/hub';
import { getFarmerQrValue } from '@/data/qr';
import { useColors } from '@/hooks/useColors';

export function FarmerQrCard({ farmer }: { farmer: Farmer }) {
  const colors = useColors();
  const qrValue = getFarmerQrValue(farmer);
  const [qrSvg, setQrSvg] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    let active = true;
    void QRCode.toString(qrValue, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: colors.foreground, light: colors.card },
    }).then((svg) => {
      if (active) setQrSvg(svg);
    }).catch(() => {
      if (active) setQrSvg('');
    });

    return () => {
      active = false;
    };
  }, [colors.card, colors.foreground, qrValue]);

  const downloadQr = async () => {
    if (!qrSvg || isSharing) return;
    setIsSharing(true);
    try {
      if (Platform.OS === 'web') {
        await Linking.openURL(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}`);
        return;
      }

      const cacheDirectory = FileSystem.cacheDirectory;
      if (!cacheDirectory) throw new Error('Direktori penyimpanan belum tersedia.');
      const fileUri = `${cacheDirectory}kopi-garut-${farmer.id}-qr.svg`;
      await FileSystem.writeAsStringAsync(fileUri, qrSvg, { encoding: FileSystem.EncodingType.UTF8 });
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert('QR sudah dibuat', 'Bagikan file ini dari perangkat untuk mencetaknya.');
        return;
      }
      await Sharing.shareAsync(fileUri, {
        mimeType: 'image/svg+xml',
        dialogTitle: `Simpan QR ${farmer.name}`,
        UTI: 'public.svg-image',
      });
    } catch {
      Alert.alert('Belum bisa mengunduh', 'Coba lagi beberapa saat atau gunakan tombol bagikan dari perangkat.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.foreground }]}>
      <View style={styles.copy}>
        <View style={styles.kickerRow}>
          <BrandIcon name="maximize" size={14} color={colors.accent} />
          <Text style={[styles.kicker, { color: colors.accent }]}>IDENTITAS KEBUN</Text>
        </View>
        <Text style={[styles.title, { color: colors.card }]}>QR petani siap dicetak</Text>
        <Text style={[styles.description, { color: colors.background }]}>
          Tempelkan di kemasan atau titik kebun. Saat dipindai, profil petani dan informasi kebun ini akan terbuka.
        </Text>
        <Text numberOfLines={1} style={[styles.id, { color: colors.primaryForeground }]}>
          {farmer.membershipId} · {farmer.name}
        </Text>
      </View>

      <View style={[styles.qrFrame, { backgroundColor: colors.card }]}>
        {qrSvg ? <SvgXml accessibilityLabel={`QR profil ${farmer.name}`} xml={qrSvg} width={148} height={148} /> : <View style={styles.qrLoading}><Feather name="loader" size={22} color={colors.primary} /></View>}
      </View>

      <Pressable
        testID="farmer-download-qr"
        accessibilityRole="button"
        accessibilityLabel="Unduh QR petani untuk dicetak"
        onPress={() => void downloadQr()}
        style={({ pressed }) => [styles.downloadButton, { backgroundColor: colors.accent, opacity: pressed || isSharing ? 0.76 : 1 }]}
      >
        <Feather name="download" size={16} color={colors.accentForeground} />
        <Text style={[styles.downloadText, { color: colors.accentForeground }]}>{isSharing ? 'Menyiapkan…' : 'Unduh untuk cetak'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 22, padding: 16, gap: 15, overflow: 'hidden' },
  copy: { gap: 6 },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  kicker: { fontFamily: 'Manrope_700Bold', fontSize: 9, fontWeight: '800', letterSpacing: 1.35 },
  title: { fontFamily: 'Manrope_700Bold', fontSize: 22, lineHeight: 27, fontWeight: '700', letterSpacing: -0.55 },
  description: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 17, opacity: 0.82 },
  id: { fontFamily: 'Manrope_700Bold', fontSize: 10, fontWeight: '700', marginTop: 2 },
  qrFrame: { alignSelf: 'center', width: 180, height: 180, borderRadius: 18, alignItems: 'center', justifyContent: 'center', padding: 14 },
  qrLoading: { width: 148, height: 148, alignItems: 'center', justifyContent: 'center' },
  downloadButton: { minHeight: 48, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  downloadText: { fontFamily: 'Manrope_700Bold', fontSize: 13, fontWeight: '700' },
});