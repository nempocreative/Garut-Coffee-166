import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide17Branding() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[27vw] bg-[#A8543B]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[44vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Strategi identitas</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Garut Beans G-Beans</span>
          <span className="text-[#D3A15F]">sebagai origin signature.</span>
        </h2>
        <p className="mt-[3vh] max-w-[37vw] text-[2vw] leading-[1.2] text-[#E7D9C8]">
          Asal menjadi penanda cerita dan kualitas. Brand outlet tetap utama.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[43vw] space-y-[1.1vh]">
          <div className="flex gap-[1.2vw] border-b border-[#806E63] pb-[1.2vh]"><span className="text-[2.5vw] font-extrabold text-[#D3A15F]">01</span><div><p className="text-[1.9vw] font-extrabold">Brand outlet tetap utama</p><p className="mt-[0.45vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Garut Beans hadir sebagai origin atau menu khas.</p></div></div>
          <div className="flex gap-[1.2vw] border-b border-[#806E63] pb-[1.2vh]"><span className="text-[2.5vw] font-extrabold text-[#D3A15F]">02</span><div><p className="text-[1.9vw] font-extrabold">Format nama konsisten</p><p className="mt-[0.45vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Contoh: origin · wilayah · proses.</p></div></div>
          <div className="flex gap-[1.2vw] border-b border-[#806E63] pb-[1.2vh]"><span className="text-[2.5vw] font-extrabold text-[#D3A15F]">03</span><div><p className="text-[1.9vw] font-extrabold">Tanda asal mudah dikenali</p><p className="mt-[0.45vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Badge partner, kartu cerita, dan QR asal.</p></div></div>
          <div className="flex gap-[1.2vw]"><span className="text-[2.5vw] font-extrabold text-[#D3A15F]">04</span><div><p className="text-[1.9vw] font-extrabold">Standar menjaga percaya</p><p className="mt-[0.45vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Lot, mutu, dan pasokan terlacak.</p></div></div>
      </div>

       <div className="absolute bottom-[11vh] left-[6.5vw] text-[1.6vw] font-bold uppercase tracking-[0.16em] text-[#D3A15F]">Satu asal · banyak interpretasi</div>
    </div>
  );
}