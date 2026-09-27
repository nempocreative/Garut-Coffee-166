import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide15Advantages() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#A8543B] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[31vw] bg-[#2A201D]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#E7D9C8] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[42vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Keunggulan aplikasi</p>
        <h2 className="mt-[2vh] text-[5.25vw] font-extrabold leading-[0.89] tracking-[-0.09em]">
          Satu aplikasi.
          <span className="block text-[#D3A15F]">Banyak nilai.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[33vw] text-[1.8vw] leading-[1.18] text-[#E7D9C8]">
          Asal, manusia, proses, dan peluang kolaborasi ikut terlihat.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] space-y-[1.5vh]">
        <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.22em] text-[#D3A15F]">Empat alasan</p>
        <div className="border-t border-[#806E63] pt-[1.4vh]">
          <p className="text-[1.85vw] font-extrabold">01 / Hulu ke hilir</p>
          <p className="mt-[0.6vh] text-[1.45vw] leading-[1.15] text-[#E7D9C8]">Wilayah, petani, produk, pesanan, pelanggan.</p>
        </div>
        <div className="border-t border-[#806E63] pt-[1.4vh]">
          <p className="text-[1.85vw] font-extrabold">02 / Lebih transparan</p>
          <p className="mt-[0.6vh] text-[1.45vw] leading-[1.15] text-[#E7D9C8]">Traceability dan verifikasi sebelum memilih.</p>
        </div>
        <div className="border-t border-[#806E63] pt-[1.4vh]">
          <p className="text-[1.85vw] font-extrabold">03 / Sesuai peran</p>
          <p className="mt-[0.6vh] text-[1.45vw] leading-[1.15] text-[#E7D9C8]">Ruang kerja untuk pengguna, petani, penyuluh.</p>
        </div>
        <div className="border-t border-[#806E63] pt-[1.4vh]">
          <p className="text-[1.85vw] font-extrabold">04 / Nilai lokal</p>
          <p className="mt-[0.6vh] text-[1.45vw] leading-[1.15] text-[#E7D9C8]">Kopi, wisata, produk turunan, kemitraan.</p>
        </div>
      </div>
    </div>
  );
}