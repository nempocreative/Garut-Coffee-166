import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide4() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[29vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>
      <div className="absolute left-[6.5vw] top-[19vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Asal yang terjaga</p>
        <h2 className="mt-[1.6vh] text-[4.6vw] font-extrabold leading-[1.01] tracking-[-0.07em]"><span className="block">Kenali kopi</span><span className="text-[#A8543B]">dari sumbernya.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#D3A15F]" />
        <div className="mt-[4.4vh] space-y-[1.5vh] text-[2vw] font-medium leading-[1.18] text-[#806E63]">
          <p>Wilayah penghasil kopi</p>
          <p>Profil petani dan kelompok</p>
          <p>Proses dan standar mutu</p>
          <p>Informasi asal yang terbuka</p>
        </div>
      </div>
      <div className="absolute right-[5.5vw] top-[17vh] grid w-[39vw] grid-cols-2 gap-[1vw]">
        <div className="rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={`${base}farmer-asep-rahmat.webp`} crossOrigin="anonymous" alt="Foto petani kopi Asep Rahmat di kebun" className="h-[24vh] w-full rounded-[0.55vw] object-cover object-[50%_25%]" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.65vw] font-bold text-[#806E63]">Petani · Garut</p>
        </div>
        <div className="mt-[5vh] rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={`${base}farmer-deni-suhendar.webp`} crossOrigin="anonymous" alt="Foto petani kopi Deni Suhendar saat memetik kopi" className="h-[24vh] w-full rounded-[0.55vw] object-cover" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.65vw] font-bold text-[#806E63]">Kebun · Cikajang</p>
        </div>
        <div className="rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={`${base}farmer-iis-nurhayati.webp`} crossOrigin="anonymous" alt="Foto petani kopi Iis Nurhayati di kebun" className="h-[24vh] w-full rounded-[0.55vw] object-cover object-[50%_10%]" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.65vw] font-bold text-[#806E63]">Cerita · Petani</p>
        </div>
        <div className="mt-[5vh] rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={`${base}farmer-ujang-kusnadi.webp`} crossOrigin="anonymous" alt="Foto petani kopi Ujang Kusnadi merawat tanaman kopi" className="h-[24vh] w-full rounded-[0.55vw] object-cover" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.65vw] font-bold text-[#806E63]">Wilayah · Garut</p>
        </div>
      </div>
    </div>
  );
}