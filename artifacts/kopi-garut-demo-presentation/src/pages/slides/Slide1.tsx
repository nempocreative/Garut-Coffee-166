import heroImage from '@assets/image_1789732998935.png';
import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide1() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroImage} crossOrigin="anonymous" alt="Kopi, biji kopi, dan lereng Garut" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,240,232,1)_0%,rgba(246,240,232,1)_47%,rgba(42,32,29,0.08)_65%,rgba(42,32,29,0.62)_100%),linear-gradient(0deg,rgba(42,32,29,0.52)_0%,transparent_45%)]" />
      </div>

      <div className="absolute inset-y-0 left-0 w-[50vw] bg-[#F6F0E8]" />
      <div className="absolute inset-y-0 left-[50vw] w-[0.12vw] bg-[#A8543B]/70" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.9vw]">
        <div className="flex h-[3.8vw] w-[3.8vw] items-center justify-center overflow-hidden rounded-[0.9vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[0.18vw] shadow-[0.25vw_0.3vw_0_rgba(42,32,29,0.12)]">
          <img src={logo} alt="Logo Garut Beans G-Beans" className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="text-[1.5vw] font-extrabold leading-none tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></p>
          <p className="mt-[0.4vw] text-[1.55vw] font-bold uppercase tracking-[0.21em] text-[#806E63]">G-BEANS · SPECIALTY COFFEE</p>
        </div>
      </div>

      <div className="absolute left-[6.5vw] top-[29vh] w-[39vw]">
        <p className="mb-[1.6vh] text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Platform ekosistem kopi</p>
        <h1 className="text-[6.8vw] font-extrabold leading-[0.91] tracking-[-0.08em] text-[#2A201D]">
          <span className="block">Panen rasa</span>
          <span className="text-[#A8543B]">dari Garut.</span>
        </h1>
        <p className="mt-[3.4vh] max-w-[34vw] text-[2vw] font-medium leading-[1.18] text-[#806E63]">
          Satu platform untuk mengenal asal kopi, petani, mitra, dan pelanggan.
        </p>
      </div>

      <div className="absolute bottom-[10vh] left-[6.5vw] text-[1.5vw] font-bold tracking-[0.08em] text-[#806E63]">
        Dinas Pertanian Kab. Garut
      </div>
      <div className="absolute bottom-[6vh] left-[6.5vw] text-[1.5vw] font-bold tracking-[0.08em] text-[#806E63]">
        Nempo.id x Kala Muda
      </div>
      <div className="absolute bottom-[6vh] right-[6.5vw] z-20 text-[1.5vw] font-bold tracking-[0.16em] text-[#FFF9F1]">01 / 34</div>

      <div className="absolute right-[10vw] top-[13vh] z-10 w-[20vw] rounded-[2.5vw] border-[0.52vw] border-[#2A201D] bg-[#2A201D] p-[0.5vw] shadow-[0.85vw_1vw_0_rgba(42,32,29,0.3)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.9vw] bg-[#F6F0E8]">
          <img src={`${base}demo-home-latest.jpg`} alt="Cuplikan beranda aplikasi Garut Beans G-Beans" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.25vw] w-[6.2vw] -translate-x-1/2 rounded-b-[0.85vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.65vw] top-[8vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.65vw] top-[12vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.65vw] top-[11vw] h-[4.2vw] w-[0.22vw] rounded-r-full bg-[#2A201D]" />
      </div>
    </div>
  );
}