import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide4MainMenu() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-y-0 right-0 w-[27vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <section className="absolute left-[6.5vw] top-[17vh] w-[86vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Navigasi utama</p>
        <div className="mt-[1.4vh] flex items-end justify-between gap-[3vw]">
          <h2 className="max-w-[50vw] text-[4.35vw] font-extrabold leading-[0.94] tracking-[-0.075em]"><span className="block">Lima menu inti</span><span className="text-[#A8543B]">untuk satu perjalanan.</span></h2>
          <p className="mb-[0.8vh] max-w-[25vw] text-[1.65vw] leading-[1.18] text-[#806E63]">Dari menemukan cerita sampai kembali membeli, setiap menu menjaga konteks kopi Garut.</p>
        </div>
      </section>

      <section className="absolute left-[6.5vw] right-[6.5vw] top-[51vh]">
        <div className="mb-[1.8vh] flex items-center justify-between border-b border-[#D8C7B5] pb-[1.2vh]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.18em] text-[#806E63]">Peta perjalanan pengguna</p>
          <span className="text-[1.2vw] font-bold text-[#A8543B]">G-BEANS / 01—05</span>
        </div>
        <div className="grid grid-cols-5 gap-[0.8vw]">
          <div className="border-t-[0.35vw] border-[#A8543B] bg-[#2A201D] p-[1.15vw] text-[#FFF9F1]"><span className="text-[2.7vw] font-extrabold text-[#D3A15F]">01</span><p className="mt-[2vh] text-[1.65vw] font-extrabold">Beranda</p><p className="mt-[0.8vh] text-[1.2vw] leading-[1.15] text-[#E7D9C8]">Cerita, promo, kategori, petani, wilayah, dan agenda.</p></div>
          <div className="border-t-[0.35vw] border-[#A8543B] bg-[#FFF9F1] p-[1.15vw]"><span className="text-[2.7vw] font-extrabold text-[#A8543B]">02</span><p className="mt-[2vh] text-[1.65vw] font-extrabold">Jelajah</p><p className="mt-[0.8vh] text-[1.2vw] leading-[1.15] text-[#806E63]">Cari kopi, baca detail produk, simpan favorit.</p></div>
          <div className="border-t-[0.35vw] border-[#D3A15F] bg-[#FFF9F1] p-[1.15vw]"><span className="text-[2.7vw] font-extrabold text-[#A8543B]">03</span><p className="mt-[2vh] text-[1.65vw] font-extrabold">Jejak</p><p className="mt-[0.8vh] text-[1.2vw] leading-[1.15] text-[#806E63]">Wilayah, petani, proses, lot, dan produk.</p></div>
          <div className="border-t-[0.35vw] border-[#A8543B] bg-[#A8543B] p-[1.15vw] text-[#FFF9F1]"><span className="text-[2.7vw] font-extrabold text-[#D3A15F]">04</span><p className="mt-[2vh] text-[1.65vw] font-extrabold">Pesanan</p><p className="mt-[0.8vh] text-[1.2vw] leading-[1.15] text-[#FFF9F1]/75">Keranjang, proses, pengiriman, dan riwayat.</p></div>
          <div className="border-t-[0.35vw] border-[#D3A15F] bg-[#D3A15F] p-[1.15vw]"><span className="text-[2.7vw] font-extrabold text-[#A8543B]">05</span><p className="mt-[2vh] text-[1.65vw] font-extrabold">Akun</p><p className="mt-[0.8vh] text-[1.2vw] leading-[1.15] text-[#2A201D]/75">Ruang personal sesuai peran pengguna.</p></div>
        </div>
      </section>
    </div>
  );
}