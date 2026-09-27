import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideVisionMission() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[38vw] bg-[#2A201D]" />
      <div className="absolute right-[38vw] top-0 h-full w-[0.18vw] bg-[#A8543B]" />
      <div className="absolute left-[44vw] top-[14vh] h-[0.12vw] w-[8vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[42vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">Visi platform</p>
        <h2 className="mt-[2.2vh] max-w-[40vw] text-[5.7vw] font-extrabold leading-[0.88] tracking-[-0.09em]">
          Dari Garut,
          <span className="block text-[#A8543B]">go internasional.</span>
        </h2>
        <p className="mt-[4vh] max-w-[34vw] text-[1.85vw] font-semibold leading-[1.2] text-[#806E63]">
          Satu platform untuk membawa cerita, manusia, dan kualitas kopi Garut dari asalnya menuju pasar dunia.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] text-[#FFF9F1]">
        <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Misi / tiga arah</p>
        <div className="mt-[3vh] divide-y divide-[#806E63]">
          <div className="flex gap-[1.1vw] py-[2vh] first:pt-0">
            <span className="text-[2.2vw] font-extrabold leading-none text-[#D3A15F]">01</span>
            <p className="text-[1.75vw] font-semibold leading-[1.12]">Nilai usaha dari hulu hingga hilir.</p>
          </div>
          <div className="flex gap-[1.1vw] py-[2vh]">
            <span className="text-[2.2vw] font-extrabold leading-none text-[#D3A15F]">02</span>
            <p className="text-[1.75vw] font-semibold leading-[1.12]">Origin Garut dikenal sampai pasar nasional dan internasional.</p>
          </div>
          <div className="flex gap-[1.1vw] py-[2vh]">
            <span className="text-[2.2vw] font-extrabold leading-none text-[#D3A15F]">03</span>
            <p className="text-[1.75vw] font-semibold leading-[1.12]">Ruang karya bagi anak muda dan seluruh ekosistem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}