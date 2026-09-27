import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideLogoPhilosophy() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute left-0 right-0 top-0 h-[1.1vh] bg-[#A8543B]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] object-contain drop-shadow-[0_0.18vw_0.28vw_rgba(42,32,29,0.18)]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>
      <div className="absolute right-[6.5vw] top-[6.8vh] text-right text-[1.5vw] font-extrabold uppercase tracking-[0.18em] text-[#806E63]">
        <span className="text-[#A8543B]">03</span> · Filosofi identitas
      </div>

      <div className="absolute left-1/2 top-[14vh] w-[58vw] -translate-x-1/2 text-center">
        <p className="text-[1.45vw] font-extrabold uppercase tracking-[0.28em] text-[#A8543B]">Filosofi identitas</p>
        <h2 className="mt-[1.4vh] text-[4.25vw] font-extrabold leading-[0.95] tracking-[-0.08em]">
          Satu logo, <span className="text-[#A8543B]">satu ekosistem.</span>
        </h2>
        <div className="mx-auto mt-[2.2vh] h-[0.42vh] w-[6vw] rounded-full bg-[#D3A15F]" />
        <p className="mx-auto mt-[1.8vh] max-w-[50vw] text-[1.55vw] font-medium leading-[1.18] text-[#806E63]">
          Bukan sekadar tanda; logo ini merangkum asal, perjalanan, dan masa depan kopi Garut.
        </p>
      </div>

      <div className="absolute left-1/2 top-[53vh] flex h-[17vw] w-[17vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <img src={logo} crossOrigin="anonymous" alt="Logo utama Garut Beans G-Beans" className="h-full w-full object-contain drop-shadow-[0_0.32vw_0.3vw_rgba(42,32,29,0.2)]" />
      </div>

      <div className="absolute bottom-[9vh] left-[6.5vw] right-[6.5vw] grid grid-cols-3 gap-[1.2vw]">
        <div className="border-t-[0.16vw] border-[#A8543B] bg-[#FFF9F1]/55 px-[1.15vw] py-[1.1vh]">
          <div className="flex items-baseline justify-between">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">01</p>
            <p className="text-[1.6vw] font-extrabold">Akar nilai</p>
          </div>
          <p className="mt-[0.8vh] text-[1.5vw] leading-[1.15] text-[#806E63]">Biji menandai sumber nilai: tanah Garut, pengetahuan petani, dan potensi yang dirawat sejak awal.</p>
        </div>
        <div className="border-t-[0.16vw] border-[#D3A15F] bg-[#FFF9F1]/55 px-[1.15vw] py-[1.1vh]">
          <div className="flex items-baseline justify-between">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">02</p>
            <p className="text-[1.6vw] font-extrabold">Satu perjalanan</p>
          </div>
          <p className="mt-[0.8vh] text-[1.5vw] leading-[1.15] text-[#806E63]">Garis lengkung menyatukan kebun, manusia, proses, hingga cangkir dalam cerita yang dapat ditelusuri.</p>
        </div>
        <div className="border-t-[0.16vw] border-[#A8543B] bg-[#FFF9F1]/55 px-[1.15vw] py-[1.1vh]">
          <div className="flex items-baseline justify-between">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">03</p>
            <p className="text-[1.6vw] font-extrabold">Tumbuh berkelanjutan</p>
          </div>
          <p className="mt-[0.8vh] text-[1.5vw] leading-[1.15] text-[#806E63]">Warna bumi dan bentuk yang terbuka menyiratkan keberanian tumbuh tanpa kehilangan akar.</p>
        </div>
      </div>
    </div>
  );
}