import heroImage from '@assets/image_1789732998935.png';
import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide1() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroImage} crossOrigin="anonymous" alt="Kopi, biji kopi, dan lereng Garut" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(42,32,29,0.46)_0%,transparent_34%,rgba(42,32,29,0.1)_100%)]" />
      </div>
      <div className="absolute inset-y-0 left-0 w-[46vw] bg-[#F6F0E8]" />
      <div className="absolute bottom-0 left-[46vw] top-0 w-[0.2vw] bg-[#A8543B]/65" />
      <div className="absolute -right-[9vw] -top-[16vw] h-[42vw] w-[42vw] rounded-full border-[0.12vw] border-[#D3A15F]/35" />
      <div className="absolute bottom-[-10vw] right-[19vw] h-[26vw] w-[26vw] rounded-full border-[0.12vw] border-[#FFF9F1]/35" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.9vw]">
        <div className="flex h-[3.4vw] w-[3.4vw] items-center justify-center overflow-hidden rounded-[0.9vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[0.18vw] shadow-[0.25vw_0.3vw_0_rgba(42,32,29,0.12)]">
          <img src={logo} alt="Logo Garut Beans G-Beans" className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="text-[1.35vw] font-extrabold leading-none tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></p>
          <p className="mt-[0.35vw] text-[1.5vw] font-bold uppercase tracking-[0.22em] text-[#806E63]">G-BEANS · SPECIALTY COFFEE</p>
        </div>
      </div>

      <div className="absolute left-[6.5vw] top-[28vh] w-[46vw]">
        <h1 className="text-[7vw] font-extrabold leading-[0.94] tracking-[-0.075em] text-[#2A201D]"><span className="block">Panen rasa</span><span className="text-[#A8543B]">dari Garut.</span></h1>
        <div className="mt-[3.5vh] h-[0.42vh] w-[7vw] rounded-full bg-[#D3A15F]" />
        <p className="mt-[2.6vh] max-w-[35vw] text-[1.85vw] font-medium leading-[1.2] text-[#806E63]">
          Temukan kopi spesialti dari lereng pilihan.
        </p>
        <p className="mt-[2.5vh] text-[1.35vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Dinas Pertanian Kab Garut</p>
      </div>

      <div className="absolute bottom-[6vh] left-[6.5vw] flex items-center gap-[1vw] text-[1.5vw] font-bold tracking-[0.08em] text-[#806E63]">
        <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-[#A8543B]" />
        Karya Nempo.id x Kala Muda
      </div>
      <div className="absolute bottom-[6vh] right-[6.5vw] z-20 text-[1.5vw] font-bold tracking-[0.16em] text-[#FFF9F1]">01 / 25</div>

      <div className="absolute right-[11vw] top-[14vh] z-10 w-[18vw] rounded-[2.35vw] border-[0.5vw] border-[#2A201D] bg-[#2A201D] p-[0.48vw] shadow-[0.8vw_0.95vw_0_rgba(42,32,29,0.3)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.78vw] bg-[#F6F0E8]">
          <img src={`${base}demo-home.jpg`} alt="Cuplikan live beranda aplikasi Garut Beans G-Beans" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.2vw] w-[5.8vw] -translate-x-1/2 rounded-b-[0.85vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.65vw] top-[8vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.65vw] top-[12vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.65vw] top-[11vw] h-[4.2vw] w-[0.22vw] rounded-r-full bg-[#2A201D]" />
      </div>
      <div className="absolute right-[30vw] top-[22vh] z-20 w-[12vw] rounded-[0.65vw] border border-[#FFF9F1]/45 bg-[#2A201D]/80 px-[0.9vw] py-[0.8vh] shadow-[0.3vw_0.4vw_0_rgba(42,32,29,0.22)]">
        <p className="text-[1.15vw] font-bold uppercase tracking-[0.14em] text-[#D3A15F]">Live preview</p>
        <span className="mt-[0.45vh] block text-[1.05vw] font-medium tracking-[0.02em] text-[#FFF9F1]">Beranda aplikasi</span>
      </div>
      <div className="absolute bottom-[10vh] right-[31vw] z-20 rounded-full border border-[#FFF9F1]/60 bg-[#2A201D]/35 px-[1.1vw] py-[0.65vh] text-[1.15vw] font-bold uppercase tracking-[0.14em] text-[#FFF9F1] backdrop-blur-[0.25vw]">
        Garut Beans G-Beans App
      </div>
    </div>
  );
}