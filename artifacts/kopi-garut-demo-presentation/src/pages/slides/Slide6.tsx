import traceabilityImage from '@assets/generated_images/traceability-menu-ai.png';

export default function Slide6() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f4eee3] text-[#18382b]">
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#a45e3a]">
        Kopi Garut / 06
      </div>
      <div className="absolute left-[7vw] top-[19vh] w-[52vw]">
        <h2 className="font-display text-[4.45vw] font-bold leading-[1.03] tracking-[-0.045em]">
          Data yang membantu mengambil keputusan
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] bg-[#d36f45]" />
      </div>
      <div className="absolute bottom-[10vh] left-[7vw] flex w-[51vw] flex-col gap-[2.1vh]">
        <div className="flex items-center gap-[1.5vw] border-b-[0.12vw] border-[#cfc1ad] pb-[1.8vh]">
          <span className="font-display text-[2.3vw] font-bold text-[#d36f45]">01</span>
          <p className="text-[1.85vw] font-medium">Pantau informasi harga dan perkembangan wilayah</p>
        </div>
        <div className="flex items-center gap-[1.5vw] border-b-[0.12vw] border-[#cfc1ad] pb-[1.8vh]">
          <span className="font-display text-[2.3vw] font-bold text-[#d36f45]">02</span>
          <p className="text-[1.85vw] font-medium">Akses laporan, dokumen, dan program pendukung</p>
        </div>
        <div className="flex items-center gap-[1.5vw] border-b-[0.12vw] border-[#cfc1ad] pb-[1.8vh]">
          <span className="font-display text-[2.3vw] font-bold text-[#d36f45]">03</span>
          <p className="text-[1.85vw] font-medium">Gunakan traceability untuk memahami perjalanan produk</p>
        </div>
        <div className="flex items-center gap-[1.5vw]">
          <span className="font-display text-[2.3vw] font-bold text-[#d36f45]">04</span>
          <p className="text-[1.85vw] font-medium">Jadikan data sebagai dasar kolaborasi</p>
        </div>
      </div>
      <div className="absolute right-[8vw] top-[20vh] h-[58vh] w-[29vw] rotate-[3deg] overflow-hidden rounded-[1.5vw] border-[0.3vw] border-[#18382b] bg-[#d9c6aa] shadow-[1.1vw_1.2vw_0_rgba(24,56,43,0.16)]">
        <img src={traceabilityImage} crossOrigin="anonymous" alt="Traceability Kopi Garut" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}