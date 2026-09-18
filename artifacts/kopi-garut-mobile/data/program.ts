import { BrandIconName } from '@/components/BrandIcon';

export type ProgramRoute =
  | '/verification'
  | '/standards'
  | '/curation'
  | '/group-dashboard'
  | '/extension-dashboard'
  | '/reports'
  | '/notifications'
  | '/documents'
  | '/complaints';

export type ProgramLink = {
  id: string;
  icon: BrandIconName;
  title: string;
  description: string;
  route: ProgramRoute;
};

export const programLinks: ProgramLink[] = [
  { id: 'verification', icon: 'shield', title: 'Verifikasi petani & produk', description: 'Pantau identitas, kelompok, kebun, dan produk yang tervalidasi.', route: '/verification' },
  { id: 'standards', icon: 'check', title: 'Standar Kopi Garut', description: 'Rujukan mutu internal untuk setiap lot kopi.', route: '/standards' },
  { id: 'curation', icon: 'repeat', title: 'Kurasi produk', description: 'Ikuti perjalanan produk sampai masuk katalog.', route: '/curation' },
  { id: 'group', icon: 'users', title: 'Dashboard kelompok tani', description: 'Kelola anggota, panen, penjualan, dan dukungan.', route: '/group-dashboard' },
  { id: 'extension', icon: 'map-pin', title: 'Dashboard penyuluh', description: 'Catat kunjungan, kondisi kebun, dan tindak lanjut.', route: '/extension-dashboard' },
  { id: 'reports', icon: 'bar-chart-2', title: 'Laporan digital', description: 'Baca perkembangan kopi Garut dengan filter yang jelas.', route: '/reports' },
  { id: 'notifications', icon: 'alert-circle', title: 'Notifikasi program', description: 'Pengingat pelatihan, permintaan pembeli, dan musim panen.', route: '/notifications' },
  { id: 'documents', icon: 'package', title: 'Pusat dokumen', description: 'Panduan, SOP, modul, regulasi, dan formulir program.', route: '/documents' },
  { id: 'complaints', icon: 'send', title: 'Keluhan & masukan', description: 'Sampaikan masalah kebun, alat, infrastruktur, atau pemasaran.', route: '/complaints' },
];

export type VerificationItem = {
  label: string;
  detail: string;
  status: 'Terverifikasi' | 'Dalam tinjauan';
  icon: BrandIconName;
};

export const verificationItems: VerificationItem[] = [
  { label: 'Terverifikasi', detail: 'Profil petani dan identitas usaha sudah cocok.', status: 'Terverifikasi', icon: 'user' },
  { label: 'Kelompok tani terverifikasi', detail: 'Keanggotaan tercatat di kelompok aktif.', status: 'Terverifikasi', icon: 'users' },
  { label: 'Lokasi kebun terverifikasi', detail: 'Titik kebun dan luas lahan sudah dipetakan.', status: 'Terverifikasi', icon: 'map-pin' },
  { label: 'Produk terverifikasi', detail: 'Lot Arabika Honey 2026 menunggu foto kemasan.', status: 'Dalam tinjauan', icon: 'package' },
];

export type StandardItem = {
  title: string;
  value: string;
  detail: string;
  icon: BrandIconName;
};

export const standards: StandardItem[] = [
  { title: 'Grade', value: 'Grade 1 · Specialty', detail: 'Biji seragam, bersih, dan dapat ditelusuri sampai lot panen.', icon: 'trending-up' },
  { title: 'Proses pascapanen', value: 'Tercatat per lot', detail: 'Natural, washed, honey, atau proses lain wajib memiliki catatan waktu dan metode.', icon: 'repeat' },
  { title: 'Kadar air', value: '10–12%', detail: 'Diukur sebelum penyimpanan dan dicatat pada lembar mutu.', icon: 'info' },
  { title: 'Defect', value: 'Maks. 5 defect / 300 g', detail: 'Sortasi fisik dilakukan sebelum cupping dan pengemasan.', icon: 'check' },
  { title: 'Cupping', value: 'Min. 80 poin', detail: 'Cupping memakai lembar penilaian Kopi Garut dan panel terlatih.', icon: 'coffee' },
  { title: 'Kemasan', value: 'Food grade + lot code', detail: 'Sertakan asal, proses, berat bersih, tanggal sangrai, dan kode lot.', icon: 'package' },
];

export const curationStages = ['Daftar', 'Verifikasi', 'Kurasi', 'Diterima', 'Masuk Katalog Kopi Garut'] as const;

export type CurationProduct = {
  id: string;
  name: string;
  producer: string;
  currentStage: number;
  note: string;
};

export const curationProducts: CurationProduct[] = [
  { id: 'arabica-honey', name: 'Arabika Honey Cikuray', producer: 'KTH Cikuray Mandiri', currentStage: 4, note: 'Siap tampil di katalog resmi.' },
  { id: 'papandayan-natural', name: 'Papandayan Natural Lot 06', producer: 'KTH Papandayan Lestari', currentStage: 2, note: 'Menunggu sesi cupping kurator.' },
  { id: 'kamojang-washed', name: 'Kamojang Washed 2026', producer: 'Kelompok Tani Talaga', currentStage: 1, note: 'Foto kebun dan dokumen sedang ditinjau.' },
];

export const groupMetrics = [
  { label: 'Anggota aktif', value: '42', change: '+3 bulan ini', icon: 'users' as const },
  { label: 'Produksi musim ini', value: '8,4 ton', change: '92% dari target', icon: 'coffee' as const },
  { label: 'Panen berjalan', value: '1,8 ton', change: 'Puncak 2 minggu lagi', icon: 'calendar' as const },
  { label: 'Penjualan tercatat', value: 'Rp 186 jt', change: '+12,4% vs musim lalu', icon: 'trending-up' as const },
];

export const groupRequests = [
  { title: 'Permintaan Arabika Grade 1', buyer: 'Ruang Seduh Roastery', detail: '300 kg · panen Juni · proses honey', status: 'Menunggu respons' },
  { title: 'Program dryer bersama', buyer: 'Dinas Pertanian Garut', detail: 'Pengajuan alat · 1 unit · proposal lengkap', status: 'Verifikasi dokumen' },
];

export const groupSchedule = [
  { title: 'Pelatihan sortasi & defect', date: 'Besok, 09.00', location: 'Rumah produksi Cikuray', icon: 'calendar' as const },
  { title: 'Kunjungan pembeli', date: '18 Juni 2026', location: 'Kebun blok utara', icon: 'briefcase' as const },
  { title: 'Batas pengumpulan data panen', date: '20 Juni 2026', location: 'Ruang kelompok tani', icon: 'bar-chart-2' as const },
];

export const extensionVisit = {
  farmer: 'Iis Nurhayati',
  group: 'KTH Cikuray Mandiri',
  location: 'Mekarsari, Cikajang',
  lastVisit: '12 Juni 2026',
  nextVisit: '19 Juni 2026',
  condition: 'Baik dengan catatan',
  issue: 'Daun menguning di blok 2 setelah hujan panjang.',
  recommendation: 'Perbaiki drainase dan lakukan pemupukan berimbang setelah tanah tidak jenuh.',
  followUp: 'Menunggu foto tindak lanjut',
};

export const extensionCases = [
  { label: 'Kunjungan bulan ini', value: '18', icon: 'map-pin' as const },
  { label: 'Kondisi kebun baik', value: '14', icon: 'check' as const },
  { label: 'Permasalahan terbuka', value: '6', icon: 'alert-circle' as const },
  { label: 'Tindak lanjut jatuh tempo', value: '3', icon: 'calendar' as const },
];

export type ReportFilterKey = 'Kecamatan' | 'Kelompok tani' | 'Komoditas' | 'Produksi' | 'Penjualan' | 'Program pendampingan';

export const reportFilterOptions: Record<ReportFilterKey, string[]> = {
  Kecamatan: ['Semua kecamatan', 'Cikajang', 'Cisurupan', 'Pakenjeng'],
  'Kelompok tani': ['Semua kelompok', 'KTH Cikuray Mandiri', 'KTH Papandayan Lestari', 'Kelompok Tani Talaga'],
  Komoditas: ['Semua komoditas', 'Arabika', 'Robusta'],
  Produksi: ['Semua produksi', 'Di atas target', 'Perlu pendampingan'],
  Penjualan: ['Semua penjualan', 'Naik bulan ini', 'Ada permintaan baru'],
  'Program pendampingan': ['Semua program', 'Pascapanen', 'Alat & mesin', 'Akses pasar'],
};

export const reports = [
  { id: 'cikajang', title: 'Produksi Arabika Cikajang', location: 'Cikajang', group: 'KTH Cikuray Mandiri', commodity: 'Arabika', production: 'Di atas target', sales: 'Ada permintaan baru', program: 'Pascapanen', value: '8,4 ton', note: 'Kenaikan 12,4% dibanding musim sebelumnya.' },
  { id: 'cisurupan', title: 'Panen Papandayan', location: 'Cisurupan', group: 'KTH Papandayan Lestari', commodity: 'Arabika', production: 'Perlu pendampingan', sales: 'Naik bulan ini', program: 'Alat & mesin', value: '5,1 ton', note: 'Dryer bersama dijadwalkan untuk puncak panen.' },
  { id: 'pakenjeng', title: 'Penjualan lot Kamojang', location: 'Pakenjeng', group: 'Kelompok Tani Talaga', commodity: 'Robusta', production: 'Di atas target', sales: 'Naik bulan ini', program: 'Akses pasar', value: 'Rp 74 jt', note: 'Dua pembeli baru masuk dalam 30 hari terakhir.' },
];

export const notifications = [
  { id: 'training', title: 'Pelatihan sortasi besok', detail: 'Besok, 09.00 di Rumah produksi Cikuray. Bawa sampel 300 gram.', type: 'Pelatihan', time: '1 jam lalu', icon: 'calendar' as const },
  { id: 'buyer', title: 'Permintaan pembeli baru', detail: 'Ruang Seduh Roastery mencari 300 kg Arabika Grade 1 proses honey.', type: 'Pasar', time: '3 jam lalu', icon: 'briefcase' as const },
  { id: 'harvest', title: 'Musim panen dimulai', detail: 'Puncak panen Arabika Garut diperkirakan mulai 2 minggu lagi.', type: 'Musim', time: 'Kemarin', icon: 'coffee' as const },
];

export type DocumentCategory = 'Semua' | 'Budidaya' | 'Pascapanen' | 'Pelatihan' | 'Regulasi' | 'Program';

export const documentCategories: DocumentCategory[] = ['Semua', 'Budidaya', 'Pascapanen', 'Pelatihan', 'Regulasi', 'Program'];

export const documents = [
  { id: 'guide', title: 'Panduan budidaya Arabika Garut', category: 'Budidaya' as const, meta: 'PDF · 24 halaman', detail: 'Panduan pemeliharaan naungan, pemupukan, pemangkasan, dan pengendalian hama terpadu.', icon: 'coffee' as const },
  { id: 'sop', title: 'SOP panen dan pascapanen', category: 'Pascapanen' as const, meta: 'PDF · 18 halaman', detail: 'Langkah kerja sortasi, fermentasi, pencucian, pengeringan, dan penyimpanan.', icon: 'package' as const },
  { id: 'module', title: 'Modul pelatihan cupping dasar', category: 'Pelatihan' as const, meta: 'Modul · 12 halaman', detail: 'Lembar latihan aroma, rasa, body, acidity, dan penilaian akhir.', icon: 'check' as const },
  { id: 'regulation', title: 'Regulasi label dan ketertelusuran', category: 'Regulasi' as const, meta: 'Panduan · 9 halaman', detail: 'Ketentuan kode lot, informasi kemasan, dan klaim Kopi Garut.', icon: 'shield' as const },
  { id: 'form', title: 'Formulir pengajuan program bantuan', category: 'Program' as const, meta: 'Formulir · dapat diisi', detail: 'Data kelompok, kebutuhan alat, rencana pemanfaatan, dan lampiran pendukung.', icon: 'briefcase' as const },
  { id: 'extension', title: 'Lembar kunjungan penyuluh', category: 'Program' as const, meta: 'Template · 1 lembar', detail: 'Template untuk mencatat kondisi kebun, masalah, rekomendasi, dan tindak lanjut.', icon: 'map-pin' as const },
];

export type ComplaintCategory = 'Hama & penyakit' | 'Infrastruktur' | 'Kebutuhan alat' | 'Pemasaran' | 'Lainnya';

export type Complaint = {
  id: string;
  category: ComplaintCategory;
  location: string;
  description: string;
  status: 'Diterima' | 'Ditinjau';
  createdAt: string;
};

export const complaintCategories: ComplaintCategory[] = ['Hama & penyakit', 'Infrastruktur', 'Kebutuhan alat', 'Pemasaran', 'Lainnya'];