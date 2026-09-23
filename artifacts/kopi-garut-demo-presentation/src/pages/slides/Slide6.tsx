import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide6() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[23vw] bg-[#EDE3D6]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">16 / 28</span>
      </div>
      <div className="absolute left-[6.5vw] top-[17vh] w-[54vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Asal yang terukur</p>
        <h2 className="mt-[1.6vh] text-[4.25vw] font-extrabold leading-[1.03] tracking-[-0.07em]"><span className="block">Data yang membantu</span><span className="text-[#A8543B]">mengambil keputusan.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#D3A15F]" />
      </div>
      <div className="absolute bottom-[10vh] left-[6.5vw] flex w-[51vw] flex-col gap-[1.25vh]">
        <div className="flex items-center gap-[1.3vw] border-b border-[#DFD1C1] pb-[1.4vh]"><span className="text-[2.2vw] font-extrabold text-[#A8543B]">01</span><p className="text-[1.7vw] font-semibold">Pantau informasi harga dan perkembangan wilayah</p></div>
        <div className="flex items-center gap-[1.3vw] border-b border-[#DFD1C1] pb-[1.4vh]"><span className="text-[2.2vw] font-extrabold text-[#A8543B]">02</span><p className="text-[1.7vw] font-semibold">Akses laporan, dokumen, dan program pendukung</p></div>
        <div className="flex items-center gap-[1.3vw] border-b border-[#DFD1C1] pb-[1.4vh]"><span className="text-[2.2vw] font-extrabold text-[#A8543B]">03</span><p className="text-[1.7vw] font-semibold">Gunakan traceability untuk memahami perjalanan produk</p></div>
        <div className="flex items-center gap-[1.3vw]"><span className="text-[2.2vw] font-extrabold text-[#A8543B]">04</span><p className="text-[1.7vw] font-semibold">Jadikan data sebagai dasar kolaborasi</p></div>
      </div>
      <div className="absolute right-[7vw] top-[17vh] h-[58vh] w-[29vw] rotate-[2deg] rounded-[1vw] border-[0.32vw] border-[#2A201D] bg-[#E7D9C8] p-[0.55vw] shadow-[0.8vw_0.9vw_0_rgba(42,32,29,0.14)]">
          <img src={`${base}demo-regions.jpg`} crossOrigin="anonymous" alt="Cuplikan data wilayah Garut Beans G-Beans" className="h-full w-full rounded-[0.58vw] object-cover" />
      </div>
        <div className="absolute bottom-[5vh] right-[6vw] rounded-full bg-[#FFF9F1] px-[1.2vw] py-[0.9vh] text-[1.6vw] font-bold text-[#A8543B] shadow-[0.25vw_0.3vw_0_rgba(42,32,29,0.08)]">Wilayah · Program · Traceability</div>
    </div>
  );
}