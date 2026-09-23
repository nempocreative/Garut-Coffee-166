import React, { useMemo, useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandIcon } from '@/components/BrandIcon';
import { Header, useBottomMenuPadding } from '@/components/AppUI';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';

const INSTAGRAM_URL = 'https://instagram.com/kopigarut';

type SupportMode = 'live' | 'faq';
type Message = { id: string; text: string; sender: 'user' | 'assistant' };

const faqItems = [
  { question: 'Bagaimana cara memilih Garut Beans?', answer: 'Mulai dari rasa yang kamu suka: floral dan ringan cocok dengan Arabika; body lebih tebal dan bold bisa memilih Robusta. Kamu juga bisa melihat profil rasa di halaman Jelajah.' },
  { question: 'Berapa lama pesanan diproses?', answer: 'Pesanan biasanya diproses dalam 1–2 hari kerja setelah pembayaran terkonfirmasi. Tim akan memberi kabar jika ada perubahan pada status pesanan.' },
  { question: 'Apa arti kode lot pada kopi?', answer: 'Kode lot membantu melacak asal kebun, proses pascapanen, dan waktu panen. Buka menu Jejak untuk melihat detail lot yang tersedia.' },
  { question: 'Apakah bisa berdiskusi soal program petani?', answer: 'Bisa. Gunakan Chat Live CS untuk pertanyaan yang membutuhkan bantuan tim, atau sampaikan usulan melalui Ruang Keluhan.' },
];

function getFaqAnswer(question: string) {
  return faqItems.find((item) => item.question === question)?.answer ?? 'Saya belum menemukan jawaban yang pas. Coba pilih salah satu FAQ di atas atau lanjutkan ke Chat Live CS.';
}

export default function SupportScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomMenuPadding = useBottomMenuPadding(18);
  const params = useLocalSearchParams<{ mode?: string }>();
  const initialMode: SupportMode = params.mode === 'live' ? 'live' : 'faq';
  const [mode, setMode] = useState<SupportMode>(initialMode);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: initialMode === 'live'
        ? 'Halo, saya Dira dari tim Garut Beans. Ceritakan yang ingin kamu tanyakan, ya.'
        : 'Halo, saya asisten Garut Beans. Pilih pertanyaan yang sering ditanyakan atau tulis pertanyaanmu.',
    },
  ]);

  const topInset = Platform.OS === 'web' ? 0 : insets.top;
  const title = mode === 'live' ? 'Chat Live CS' : 'FAQ Chat AI';
  const subtitle = mode === 'live' ? 'BANTUAN · TIM G-BEANS' : 'BANTUAN · JAWABAN CEPAT';

  const visibleFaqs = useMemo(() => faqItems.slice(0, 4), []);

  const addMessage = (text: string, sender: Message['sender']) => {
    setMessages((current) => [...current, { id: `${Date.now()}-${current.length}`, text, sender }]);
  };

  const askQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'user');
    setInput('');
    if (mode === 'faq') {
      addMessage(getFaqAnswer(trimmed), 'assistant');
    } else {
      addMessage('Pesanmu sudah masuk ke antrean tim CS. Sambil menunggu, kamu bisa melihat katalog atau mengirim detail pesanan agar kami dapat membantu lebih cepat.', 'assistant');
    }
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { backgroundColor: colors.background, paddingTop: topInset + 18, paddingBottom: bottomMenuPadding },
      ]}
      bottomOffset={28}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Header back title={title} subtitle={subtitle} cart={false} />

      <View style={[styles.modeSwitch, { backgroundColor: colors.muted, borderColor: colors.border }]}>
        {(['faq', 'live'] as SupportMode[]).map((item) => {
          const selected = mode === item;
          return (
            <Pressable
              key={item}
              testID={`support-mode-${item}`}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => setMode(item)}
              style={[styles.modeTab, selected && { backgroundColor: colors.card, shadowColor: colors.foreground }]}
            >
              <BrandIcon name={item === 'faq' ? 'info' : 'users'} size={16} color={selected ? colors.primary : colors.mutedForeground} />
              <Text style={[styles.modeTabText, { color: selected ? colors.foreground : colors.mutedForeground }]}>
                {item === 'faq' ? 'FAQ Chat AI' : 'Live CS'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.introCard, { backgroundColor: colors.foreground }]}>
        <View style={[styles.introIcon, { backgroundColor: colors.primary }]}>
          <BrandIcon name={mode === 'faq' ? 'info' : 'users'} size={20} color={colors.primaryForeground} />
        </View>
        <View style={styles.introCopy}>
          <Text style={[styles.introKicker, { color: colors.accent }]}>{mode === 'faq' ? 'JAWABAN DALAM HITUNGAN DETIK' : 'TIM SIAP MEMBANTU'}</Text>
          <Text style={[styles.introTitle, { color: colors.card }]}>{mode === 'faq' ? 'Tanya apa saja soal Garut Beans' : 'Mari cari solusi bersama'}</Text>
          <Text style={[styles.introText, { color: colors.card }]}>
            {mode === 'faq' ? 'Pilih FAQ atau tulis pertanyaan dengan bahasamu sendiri.' : 'Sampaikan nomor pesanan atau kebutuhanmu secara singkat. Hindari mengirim data sensitif.'}
          </Text>
        </View>
      </View>

      {mode === 'faq' && (
        <View style={styles.faqList}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>PERTANYAAN POPULER</Text>
          {visibleFaqs.map((item) => (
            <Pressable
              key={item.question}
              testID={`faq-${item.question}`}
              accessibilityRole="button"
              accessibilityLabel={item.question}
              onPress={() => askQuestion(item.question)}
              style={({ pressed }) => [styles.faqItem, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 }]}
            >
              <Text style={[styles.faqQuestion, { color: colors.foreground }]}>{item.question}</Text>
              <BrandIcon name="chevron-right" size={16} color={colors.primary} />
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.chatSection}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>PERCAKAPAN</Text>
        <View style={styles.messageList}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user'
                  ? { backgroundColor: colors.primary, alignSelf: 'flex-end' }
                  : { backgroundColor: colors.card, borderColor: colors.border, alignSelf: 'flex-start', borderWidth: 1 },
              ]}
            >
              <Text style={[styles.messageText, { color: message.sender === 'user' ? colors.primaryForeground : colors.foreground }]}>
                {message.text}
              </Text>
            </View>
          ))}
        </View>
        <View style={[styles.composer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TextInput
            testID="support-message-input"
            accessibilityLabel={mode === 'faq' ? 'Tulis pertanyaan FAQ' : 'Tulis pesan untuk CS'}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => askQuestion(input)}
            placeholder={mode === 'faq' ? 'Tulis pertanyaan…' : 'Tulis pesan untuk CS…'}
            placeholderTextColor={colors.mutedForeground}
            returnKeyType="send"
            style={[styles.input, { color: colors.foreground }]}
          />
          <Pressable
            testID="support-send-message"
            accessibilityRole="button"
            accessibilityLabel="Kirim pesan"
            onPress={() => askQuestion(input)}
            style={({ pressed }) => [styles.sendButton, { backgroundColor: colors.primary, opacity: pressed ? 0.75 : 1 }]}
          >
            <BrandIcon name="send" size={17} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </View>

      <Pressable
        testID="support-instagram"
        accessibilityRole="button"
        accessibilityLabel="Buka Instagram Garut Beans"
        onPress={() => void Linking.openURL(INSTAGRAM_URL)}
        style={({ pressed }) => [styles.instagramLink, { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}
      >
        <BrandIcon name="arrow-up-right" size={17} color={colors.primary} />
        <Text style={[styles.instagramText, { color: colors.foreground }]}>Lihat cerita kami di Instagram</Text>
      </Pressable>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 20, gap: 18 },
  modeSwitch: { minHeight: 48, borderRadius: 16, borderWidth: 1, padding: 4, flexDirection: 'row', gap: 4 },
  modeTab: { flex: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  modeTabText: { fontFamily: 'Manrope_700Bold', fontSize: 11 },
  introCard: { borderRadius: 21, padding: 16, flexDirection: 'row', gap: 12 },
  introIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  introCopy: { flex: 1, gap: 4 },
  introKicker: { fontFamily: 'Manrope_700Bold', fontSize: 8.5, letterSpacing: 1.1 },
  introTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, lineHeight: 23 },
  introText: { fontFamily: 'Manrope_400Regular', fontSize: 11, lineHeight: 16, opacity: 0.72 },
  faqList: { gap: 9 },
  sectionLabel: { fontFamily: 'Manrope_700Bold', fontSize: 9, letterSpacing: 1.3 },
  faqItem: { minHeight: 55, borderRadius: 15, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  faqQuestion: { flex: 1, fontFamily: 'Manrope_600SemiBold', fontSize: 12, lineHeight: 17 },
  chatSection: { gap: 10 },
  messageList: { gap: 9 },
  messageBubble: { maxWidth: '88%', borderRadius: 16, paddingHorizontal: 13, paddingVertical: 10 },
  messageText: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 },
  composer: { minHeight: 52, borderRadius: 17, borderWidth: 1, paddingLeft: 14, paddingRight: 6, flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, fontFamily: 'Manrope_400Regular', fontSize: 13, minHeight: 40 },
  sendButton: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  instagramLink: { minHeight: 48, borderRadius: 15, borderWidth: 1, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 8 },
  instagramText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12 },
});