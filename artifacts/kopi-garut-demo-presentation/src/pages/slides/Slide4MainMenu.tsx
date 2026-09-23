import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide4MainMenu() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[27vw] bg-[#E7D9C8]" />
      <div className="absolute right-[4.8vw] top-[10vh] h-[80vh] w-[0.12vw] bg-[#D3A15F]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Navigasi utama</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Lima menu inti</span>
          <span className="text-[#A8543B]">untuk satu perjalanan.</span>
        </h2>
        <p className="mt-[3vh] max-w-[35vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Dari menemukan cerita sampai kembali membeli, setiap menu menjaga konteks perjalanan kopi Garut.
        </p>

        <div className="absolute top-[44vh] left-0 w-[36vw] border-t border-[#D8C7B5] pt-[2vh]">
          <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#806E63]">Satu alur, lima pintu</p>
          <div className="mt-[2vh] flex items-center gap-[0.7vw] text-[1.55vw] font-extrabold text-[#2A201D]">
            <span>Temukan</span>
            <span className="text-[1.7vw] text-[#A8543B]">→</span>
            <span>Kenali</span>
            <span className="text-[1.7vw] text-[#A8543B]">→</span>
            <span>Pilih</span>
            <span className="text-[1.7vw] text-[#A8543B]">→</span>
            <span>Tumbuh</span>
          </div>
          <div className="mt-[1.4vh] h-[0.42vh] w-[24vw] rounded-full bg-[#D3A15F]" />
        </div>
      </div>

      <div className="absolute right-[7vw] top-[13vh] w-[42vw]">
        <div className="mb-[2.4vh] flex items-center justify-between border-b border-[#D8C7B5] pb-[1.5vh]">
          <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.18em] text-[#806E63]">Peta perjalanan pengguna</p>
          <span className="text-[1.35vw] font-bold text-[#A8543B]">G-BEANS / 01—05</span>
        </div>

        <div className="relative">
          <div className="absolute left-[1.4vw] top-[1.25vh] bottom-[1.8vh] w-[0.12vw] bg-[#D3A15F]" />

          <div className="relative flex gap-[1.2vw] border-b border-[#D8C7B5] py-[1.05vh]">
            <span className="z-10 flex h-[2.85vw] w-[2.85vw] shrink-0 items-center justify-center rounded-full bg-[#A8543B] text-[1.5vw] font-extrabold text-[#FFF9F1]">01</span>
            <div className="pt-[0.1vh]">
              <p className="text-[1.95vw] font-extrabold leading-none">Beranda</p>
              <p className="mt-[0.65vh] text-[1.6vw] leading-[1.1] text-[#806E63]">Cerita, promo, kategori, petani, wilayah, dan agenda dalam satu pintu.</p>
            </div>
          </div>

          <div className="relative flex gap-[1.2vw] border-b border-[#D8C7B5] py-[1.05vh]">
            <span className="z-10 flex h-[2.85vw] w-[2.85vw] shrink-0 items-center justify-center rounded-full bg-[#F6F0E8] text-[1.5vw] font-extrabold text-[#A8543B] ring-[0.12vw] ring-[#A8543B]">02</span>
            <div className="pt-[0.1vh]">
              <p className="text-[1.95vw] font-extrabold leading-none">Jelajah</p>
              <p className="mt-[0.65vh] text-[1.6vw] leading-[1.1] text-[#806E63]">Cari kopi, baca detail produk, simpan favorit, lalu lanjutkan ke keranjang.</p>
            </div>
          </div>

          <div className="relative flex gap-[1.2vw] border-b border-[#D8C7B5] py-[1.05vh]">
            <span className="z-10 flex h-[2.85vw] w-[2.85vw] shrink-0 items-center justify-center rounded-full bg-[#F6F0E8] text-[1.5vw] font-extrabold text-[#A8543B] ring-[0.12vw] ring-[#A8543B]">03</span>
            <div className="pt-[0.1vh]">
              <p className="text-[1.95vw] font-extrabold leading-none">Jejak</p>
              <p className="mt-[0.65vh] text-[1.6vw] leading-[1.1] text-[#806E63]">Telusuri asal kopi melalui wilayah, petani, proses, lot, dan produk.</p>
            </div>
          </div>

          <div className="relative flex gap-[1.2vw] border-b border-[#D8C7B5] py-[1.05vh]">
            <span className="z-10 flex h-[2.85vw] w-[2.85vw] shrink-0 items-center justify-center rounded-full bg-[#F6F0E8] text-[1.5vw] font-extrabold text-[#A8543B] ring-[0.12vw] ring-[#A8543B]">04</span>
            <div className="pt-[0.1vh]">
              <p className="text-[1.95vw] font-extrabold leading-none">Pesanan</p>
              <p className="mt-[0.65vh] text-[1.6vw] leading-[1.1] text-[#806E63]">Pantau keranjang, proses, pengiriman, riwayat belanja, dan belanja lagi.</p>
            </div>
          </div>

          <div className="relative flex gap-[1.2vw] py-[1.05vh]">
            <span className="z-10 flex h-[2.85vw] w-[2.85vw] shrink-0 items-center justify-center rounded-full bg-[#D3A15F] text-[1.5vw] font-extrabold text-[#2A201D]">05</span>
            <div className="pt-[0.1vh]">
              <p className="text-[1.95vw] font-extrabold leading-none">Akun</p>
              <p className="mt-[0.65vh] text-[1.6vw] leading-[1.1] text-[#806E63]">Ruang personal untuk pengguna, petani, dan penyuluh sesuai perannya.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[1.5vh] text-[1.7vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Sederhana untuk mulai · lengkap saat dibutuhkan
      </div>
    </div>
  );
}