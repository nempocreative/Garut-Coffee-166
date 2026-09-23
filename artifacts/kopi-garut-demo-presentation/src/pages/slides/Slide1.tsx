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

      <div className="absolute bottom-[15vh] right-[28vw] z-[1] flex items-end gap-[0.9vw] opacity-75">
        <div className="relative h-[5.7vw] w-[3.9vw] rotate-[-22deg] rounded-[52%_48%_55%_45%/44%_58%_42%_56%] bg-[#6D3828]/75 shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.18)]">
          <span className="absolute left-1/2 top-[0.55vw] h-[4.7vw] w-[0.18vw] -translate-x-1/2 rotate-[18deg] rounded-full bg-[#E9C58E]/60" />
        </div>
        <div className="relative h-[7.2vw] w-[4.9vw] rotate-[12deg] rounded-[50%_50%_58%_42%/45%_58%_42%_55%] bg-[#A8543B]/80 shadow-[0.4vw_0.5vw_0_rgba(42,32,29,0.2)]">
          <span className="absolute left-1/2 top-[0.75vw] h-[5.9vw] w-[0.2vw] -translate-x-1/2 rotate-[-15deg] rounded-full bg-[#F4D5A1]/65" />
        </div>
        <div className="relative mb-[0.7vw] h-[4.5vw] w-[3.1vw] rotate-[28deg] rounded-[55%_45%_48%_52%/42%_56%_44%_58%] bg-[#D3A15F]/80 shadow-[0.3vw_0.35vw_0_rgba(42,32,29,0.15)]">
          <span className="absolute left-1/2 top-[0.5vw] h-[3.6vw] w-[0.16vw] -translate-x-1/2 rotate-[-12deg] rounded-full bg-[#FFF1CF]/70" />
        </div>
      </div>

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

      <div className="absolute bottom-[5.8vh] left-[6.5vw] flex flex-col gap-[2.6vh]">
        <p className="text-[1.5vw] font-bold leading-none tracking-[0.08em] text-[#806E63]">Dinas Pertanian Kab. Garut</p>
        <p className="text-[1.5vw] font-bold leading-none tracking-[0.08em] text-[#A8543B]">Nempo.id x Kala Muda</p>
      </div>

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