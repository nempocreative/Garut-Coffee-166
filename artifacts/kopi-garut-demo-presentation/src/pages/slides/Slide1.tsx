import heroImage from '@assets/image_1789732998935.png';
import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide1() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroImage} crossOrigin="anonymous" alt="Kopi, biji kopi, dan lereng Garut" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,240,232,0.98)_0%,rgba(246,240,232,0.98)_40%,rgba(42,32,29,0.08)_59%,rgba(42,32,29,0.6)_100%),linear-gradient(0deg,rgba(42,32,29,0.54)_0%,transparent_38%,rgba(42,32,29,0.12)_100%)]" />
      </div>

      <div className="absolute inset-y-0 left-0 w-[51vw] bg-[#F6F0E8] [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%)]" />
      <div className="absolute inset-y-0 left-[47.2vw] w-[0.18vw] bg-[#A8543B]/80" />
      <div className="absolute inset-y-0 left-[48vw] w-[0.08vw] bg-[#D3A15F]/55" />
      <div className="absolute -right-[10vw] -top-[17vw] h-[44vw] w-[44vw] rounded-full border-[0.12vw] border-[#D3A15F]/45" />
      <div className="absolute bottom-[-12vw] right-[16vw] h-[30vw] w-[30vw] rounded-full border-[0.12vw] border-[#FFF9F1]/38" />
      <div className="absolute bottom-[4.5vh] right-[2.8vw] h-[0.12vw] w-[23vw] bg-[#FFF9F1]/40" />
      <div className="absolute right-[3vw] top-[5.5vh] flex items-center gap-[0.8vw] text-[1.5vw] font-bold uppercase tracking-[0.2em] text-[#FFF9F1]/85">
        <span className="h-[0.55vw] w-[0.55vw] rounded-full bg-[#D3A15F]" />
        Origin platform / Garut / 2026
      </div>

      <div className="absolute left-[6.5vw] top-[5.7vh] flex items-center gap-[0.9vw]">
        <div className="flex h-[3.8vw] w-[3.8vw] items-center justify-center overflow-hidden rounded-[0.9vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[0.18vw] shadow-[0.25vw_0.3vw_0_rgba(42,32,29,0.12)]">
          <img src={logo} alt="Logo Garut Beans G-Beans" className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="text-[1.5vw] font-extrabold leading-none tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></p>
          <p className="mt-[0.4vw] text-[1.55vw] font-bold uppercase tracking-[0.21em] text-[#806E63]">G-BEANS · SPECIALTY COFFEE</p>
        </div>
      </div>

      <div className="absolute left-[6.5vw] top-[26vh] w-[43vw]">
        <div className="mb-[1.5vh] flex items-center gap-[0.8vw] text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          <span className="h-[0.22vw] w-[3.2vw] bg-[#D3A15F]" />
          Platform ekosistem kopi
        </div>
        <h1 className="text-[6.6vw] font-extrabold leading-[0.91] tracking-[-0.08em] text-[#2A201D]"><span className="block">Panen rasa</span><span className="text-[#A8543B]">dari Garut.</span></h1>
        <div className="mt-[3.7vh] flex items-center gap-[0.8vw]">
          <div className="h-[0.55vh] w-[8vw] rounded-full bg-[#D3A15F]" />
          <span className="text-[1.5vw] font-bold uppercase tracking-[0.16em] text-[#806E63]">01 / origin story</span>
        </div>
        <p className="mt-[2.5vh] max-w-[34vw] text-[1.95vw] font-medium leading-[1.18] text-[#806E63]">
          Satu ruang untuk mengenal kopi, merawat data, dan menghubungkan Garut sampai pelanggan.
        </p>
        <div className="mt-[2.5vh] flex flex-wrap gap-[0.55vw] text-[1.5vw] font-extrabold uppercase tracking-[0.1em] text-[#806E63]">
          <span className="rounded-full border border-[#D8C7B5] bg-[#FFF9F1]/75 px-[0.75vw] py-[0.5vh]">Kebun</span>
          <span className="rounded-full border border-[#D8C7B5] bg-[#FFF9F1]/75 px-[0.75vw] py-[0.5vh]">Petani</span>
          <span className="rounded-full border border-[#D8C7B5] bg-[#FFF9F1]/75 px-[0.75vw] py-[0.5vh]">Data</span>
          <span className="rounded-full border border-[#D8C7B5] bg-[#FFF9F1]/75 px-[0.75vw] py-[0.5vh]">Mitra</span>
          <span className="rounded-full border border-[#D8C7B5] bg-[#FFF9F1]/75 px-[0.75vw] py-[0.5vh]">Pelanggan</span>
        </div>
        <p className="mt-[2.3vh] text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Dinas Pertanian Kab Garut</p>
      </div>

      <div className="absolute bottom-[5.5vh] left-[6.5vw] flex items-center gap-[1vw] text-[1.5vw] font-bold tracking-[0.08em] text-[#806E63]">
        <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-[#A8543B]" />
        Karya Nempo.id x Kala Muda
      </div>
      <div className="absolute bottom-[5.5vh] right-[6.5vw] z-20 text-[1.5vw] font-bold tracking-[0.16em] text-[#FFF9F1]">01 / 34</div>

      <div className="absolute right-[10vw] top-[12vh] z-10 w-[20vw] rounded-[2.5vw] border-[0.52vw] border-[#2A201D] bg-[#2A201D] p-[0.5vw] shadow-[0.85vw_1vw_0_rgba(42,32,29,0.3)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.9vw] bg-[#F6F0E8]">
          <img src={`${base}demo-home-latest.jpg`} alt="Cuplikan terbaru beranda aplikasi Garut Beans G-Beans" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.25vw] w-[6.2vw] -translate-x-1/2 rounded-b-[0.85vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.65vw] top-[8vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.65vw] top-[12vw] h-[2.9vw] w-[0.22vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.65vw] top-[11vw] h-[4.2vw] w-[0.22vw] rounded-r-full bg-[#2A201D]" />
      </div>
      <div className="absolute right-[30.6vw] top-[20vh] z-20 w-[15.5vw] rounded-[0.65vw] border border-[#FFF9F1]/45 bg-[#2A201D]/88 px-[1vw] py-[1vh] shadow-[0.3vw_0.4vw_0_rgba(42,32,29,0.22)]">
        <p className="text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#D3A15F]">Demo terbaru</p>
        <span className="mt-[0.5vh] block text-[1.5vw] font-medium tracking-[0.02em] text-[#FFF9F1]">Beranda aplikasi</span>
      </div>
      <div className="absolute bottom-[10vh] right-[22vw] z-20 rounded-full border border-[#FFF9F1]/60 bg-[#2A201D]/35 px-[1.2vw] py-[0.7vh] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#FFF9F1] backdrop-blur-[0.25vw]">
        Garut Beans G-Beans · Demo platform
      </div>
      <div className="absolute bottom-[10.2vh] right-[18.8vw] z-20 h-[0.1vw] w-[2.8vw] bg-[#D3A15F]" />
      <div className="absolute bottom-[16vh] right-[4vw] z-20 flex flex-col items-end gap-[0.7vh] text-[1.5vw] font-bold uppercase tracking-[0.18em] text-[#FFF9F1]/72">
        <span>People</span>
        <span>Place</span>
        <span className="text-[#D3A15F]">Proof</span>
      </div>
    </div>
  );
}