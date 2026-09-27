import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide3() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>
      <div className="absolute left-[6.5vw] top-[21vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Beranda · pintu masuk</p>
        <h2 className="mt-[1.7vh] text-[4.5vw] font-extrabold leading-[1.01] tracking-[-0.07em]"><span className="block">Mulai dari</span><span className="text-[#D3A15F]">beranda yang informatif.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#A8543B]" />
        <div className="mt-[3.8vh] max-w-[39vw] text-[1.9vw] font-medium leading-[1.16] text-[#E7D9C8]">
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-t border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">01</span>
            <span>Temukan produk dan cerita kopi</span>
          </div>
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-t border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">02</span>
            <span>Lihat wilayah, petani, dan agenda</span>
          </div>
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-t border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">03</span>
            <span>Pilih menu sesuai kebutuhan</span>
          </div>
          <div className="border-t border-[#806E63]/55" />
        </div>
      </div>
      <div className="absolute right-[13vw] top-[10vh] z-10 w-[20vw] rounded-[2.35vw] border-[0.52vw] border-[#2A201D] bg-[#2A201D] p-[0.5vw] shadow-[0.85vw_1vw_0_rgba(0,0,0,0.3)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.75vw] bg-[#F6F0E8]">
          <img src={`${base}mobile-home-capture.jpg`} alt="Beranda aplikasi Garut Beans G-Beans di handphone" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.25vw] w-[6.2vw] -translate-x-1/2 rounded-b-[0.85vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.65vw] top-[8vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.65vw] top-[12vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.65vw] top-[11vw] h-[4.2vw] w-[0.22vw] rounded-r-full bg-[#2A201D]" />
      </div>
    </div>
  );
}