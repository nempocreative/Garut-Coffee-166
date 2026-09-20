export default function Slide2() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f4eee3] text-[#18382b]">
      <div className="absolute -right-[8vw] -top-[15vh] h-[46vw] w-[46vw] rounded-full border-[0.12vw] border-[#d9b994] opacity-70" />
      <div className="absolute right-[10vw] top-[12vh] h-[14vw] w-[14vw] rounded-full bg-[#e5d7c1]" />
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#a45e3a]">
        Kopi Garut / 02
      </div>
      <div className="absolute left-[7vw] top-[19vh] w-[55vw]">
        <h2 className="font-display text-[4.25vw] font-bold leading-[1.04] tracking-[-0.04em]">
          Satu platform untuk ekosistem kopi Garut
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] bg-[#d36f45]" />
      </div>
      <div className="absolute bottom-[12vh] left-[7vw] right-[7vw] grid grid-cols-2 gap-x-[7vw] gap-y-[5vh]">
        <div className="flex items-start gap-[1.5vw]">
          <span className="font-display text-[2.8vw] font-bold text-[#d36f45]">01</span>
          <p className="max-w-[30vw] pt-[0.7vh] text-[2vw] font-medium leading-[1.15]">Mengenalkan kopi berdasarkan asal dan ceritanya</p>
        </div>
        <div className="flex items-start gap-[1.5vw]">
          <span className="font-display text-[2.8vw] font-bold text-[#d36f45]">02</span>
          <p className="max-w-[30vw] pt-[0.7vh] text-[2vw] font-medium leading-[1.15]">Membuka akses informasi bagi petani, kelompok, dan mitra</p>
        </div>
        <div className="flex items-start gap-[1.5vw]">
          <span className="font-display text-[2.8vw] font-bold text-[#d36f45]">03</span>
          <p className="max-w-[30vw] pt-[0.7vh] text-[2vw] font-medium leading-[1.15]">Menyatukan katalog, data wilayah, program, dan kemitraan</p>
        </div>
        <div className="flex items-start gap-[1.5vw]">
          <span className="font-display text-[2.8vw] font-bold text-[#d36f45]">04</span>
          <p className="max-w-[30vw] pt-[0.7vh] text-[2vw] font-medium leading-[1.15]">Menjadikan setiap interaksi lebih mudah ditelusuri</p>
        </div>
      </div>
    </div>
  );
}