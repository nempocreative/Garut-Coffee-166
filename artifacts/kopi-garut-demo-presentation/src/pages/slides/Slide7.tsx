export default function Slide7() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#18382b] text-[#f8f0e4]">
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#e6b27c]">
        Kopi Garut / 07
      </div>
      <div className="absolute left-[7vw] top-[20vh] w-[47vw]">
        <h2 className="font-display text-[4.8vw] font-bold leading-[1.01] tracking-[-0.045em]">
          Dari koneksi menjadi kolaborasi
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] bg-[#d36f45]" />
      </div>
      <div className="absolute bottom-[12vh] left-[7vw] right-[7vw] grid grid-cols-4 gap-[1.3vw]">
        <div className="min-h-[24vh] border-t-[0.2vw] border-[#d36f45] pt-[2.2vh]">
          <p className="font-display text-[2.5vw] font-bold text-[#e6b27c]">01</p>
          <p className="mt-[2vh] text-[1.75vw] font-medium leading-[1.12]">Temukan peluang kemitraan yang relevan</p>
        </div>
        <div className="min-h-[24vh] border-t-[0.2vw] border-[#d36f45] pt-[2.2vh]">
          <p className="font-display text-[2.5vw] font-bold text-[#e6b27c]">02</p>
          <p className="mt-[2vh] text-[1.75vw] font-medium leading-[1.12]">Ikuti program dan agenda ekosistem</p>
        </div>
        <div className="min-h-[24vh] border-t-[0.2vw] border-[#d36f45] pt-[2.2vh]">
          <p className="font-display text-[2.5vw] font-bold text-[#e6b27c]">03</p>
          <p className="mt-[2vh] text-[1.75vw] font-medium leading-[1.12]">Sampaikan pertanyaan atau keluhan melalui kanal yang tersedia</p>
        </div>
        <div className="min-h-[24vh] border-t-[0.2vw] border-[#d36f45] pt-[2.2vh]">
          <p className="font-display text-[2.5vw] font-bold text-[#e6b27c]">04</p>
          <p className="mt-[2vh] text-[1.75vw] font-medium leading-[1.12]">Dorong pertumbuhan bersama secara lebih terarah</p>
        </div>
      </div>
      <div className="absolute right-[7vw] top-[11vh] h-[1.1vw] w-[1.1vw] rounded-full bg-[#e6b27c]" />
    </div>
  );
}