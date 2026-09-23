import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide4MainMenu() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[24vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">09 / 28</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Navigasi utama</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Lima menu inti</span>
          <span className="text-[#A8543B]">untuk satu perjalanan.</span>
        </h2>
        <p className="mt-[3vh] max-w-[37vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Navigasi dibuat singkat agar pengguna dapat berpindah dari inspirasi, informasi asal, sampai pembelian tanpa kehilangan konteks.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[16vh] w-[43vw] space-y-[0.9vh]">
        <div className="flex items-center gap-[1.1vw] border-b border-[#D8C7B5] pb-[1.2vh]"><span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">01</span><div><p className="text-[2vw] font-extrabold">Beranda</p><p className="text-[1.7vw] leading-[1.15] text-[#806E63]">Ringkasan cerita, promo, kategori, petani, wilayah, dan agenda.</p></div></div>
        <div className="flex items-center gap-[1.1vw] border-b border-[#D8C7B5] pb-[1.2vh]"><span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">02</span><div><p className="text-[2vw] font-extrabold">Jelajah</p><p className="text-[1.7vw] leading-[1.15] text-[#806E63]">Cari kopi, baca detail produk, simpan favorit, dan lanjutkan ke keranjang.</p></div></div>
        <div className="flex items-center gap-[1.1vw] border-b border-[#D8C7B5] pb-[1.2vh]"><span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">03</span><div><p className="text-[2vw] font-extrabold">Jejak</p><p className="text-[1.7vw] leading-[1.15] text-[#806E63]">Membaca asal kopi melalui wilayah, petani, proses, lot, dan produk.</p></div></div>
        <div className="flex items-center gap-[1.1vw] border-b border-[#D8C7B5] pb-[1.2vh]"><span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">04</span><div><p className="text-[2vw] font-extrabold">Pesanan</p><p className="text-[1.7vw] leading-[1.15] text-[#806E63]">Keranjang, riwayat belanja, status proses, pengiriman, dan belanja lagi.</p></div></div>
        <div className="flex items-center gap-[1.1vw] pb-[1.2vh]"><span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">05</span><div><p className="text-[2vw] font-extrabold">Akun</p><p className="text-[1.7vw] leading-[1.15] text-[#806E63]">Ruang personal untuk pengguna, petani, dan penyuluh sesuai perannya.</p></div></div>
      </div>

      <div className="absolute bottom-[3vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[1.5vh] text-[1.7vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Sederhana untuk mulai · lengkap saat dibutuhkan
      </div>
    </div>
  );
}