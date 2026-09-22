import heroImage from '@assets/generated_images/kopi-garut-promo-banner-wide-safe.jpg';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide1() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-y-0 right-0 w-[43vw] overflow-hidden">
        <img src={heroImage} crossOrigin="anonymous" alt="Lereng kopi Garut" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#F6F0E8_0%,rgba(246,240,232,0.66)_18%,rgba(42,32,29,0.14)_100%)]" />
      </div>
      <div className="absolute -right-[8vw] -top-[14vw] h-[37vw] w-[37vw] rounded-full border-[0.12vw] border-[#D3A15F]/35" />
      <div className="absolute bottom-[10vh] right-[6vw] h-[23vw] w-[23vw] rounded-full border-[0.12vw] border-[#FFF9F1]/40" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.9vw]">
        <div className="flex h-[3.4vw] w-[3.4vw] items-center justify-center overflow-hidden rounded-[0.9vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[0.18vw] shadow-[0.25vw_0.3vw_0_rgba(42,32,29,0.12)]">
          <img src={logo} alt="Logo Kopi Garut" className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="text-[1.35vw] font-extrabold leading-none tracking-[-0.04em]">Kopi <span className="text-[#A8543B]">Garut</span></p>
          <p className="mt-[0.35vw] text-[1.5vw] font-bold uppercase tracking-[0.22em] text-[#806E63]">KOPI SPESIALTI · GARUT</p>
        </div>
      </div>

      <div className="absolute left-[6.5vw] top-[30vh] w-[54vw]">
        <p className="mb-[2.6vh] text-[1.5vw] font-extrabold uppercase tracking-[0.22em] text-[#A8543B]">Demo platform aplikasi</p>
        <h1 className="text-[7.2vw] font-extrabold leading-[0.94] tracking-[-0.075em]"><span className="block">Panen rasa</span><span className="text-[#A8543B]">dari Garut.</span></h1>
        <div className="mt-[3.5vh] h-[0.42vh] w-[7vw] rounded-full bg-[#D3A15F]" />
        <p className="mt-[2.6vh] max-w-[39vw] text-[1.85vw] font-medium leading-[1.2] text-[#806E63]">
          Temukan kopi spesialti dari lereng pilihan.
        </p>
      </div>

      <div className="absolute bottom-[6vh] left-[6.5vw] flex items-center gap-[1vw] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#806E63]">
        <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-[#A8543B]" />
        Dari kebun sampai cangkir
      </div>
      <div className="absolute bottom-[6vh] right-[6.5vw] text-[1.5vw] font-bold tracking-[0.16em] text-[#FFF9F1]">01 / 23</div>
    </div>
  );
}