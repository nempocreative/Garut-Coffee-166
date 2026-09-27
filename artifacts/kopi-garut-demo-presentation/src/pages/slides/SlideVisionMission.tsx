import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideVisionMission() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[40vw] bg-[linear-gradient(145deg,#2A201D_0%,#362720_100%)]" />
      <div className="absolute right-[40vw] top-0 h-full w-[0.12vw] bg-[#A8543B]/70" />
      <div className="absolute -bottom-[18vw] left-[30vw] h-[43vw] w-[43vw] rounded-full bg-[#D3A15F]/16" />
      <div className="absolute bottom-[9vh] left-[37vw] h-[17vw] w-[17vw] rounded-full border-[0.14vw] border-[#A8543B]/22" />
      <div className="absolute bottom-[13vh] left-[39vw] z-[1] flex items-end gap-[0.7vw] opacity-55">
        <div className="relative h-[4.5vw] w-[3.1vw] rotate-[-25deg] rounded-[52%_48%_55%_45%/44%_58%_42%_56%] bg-[#6D3828]/70">
          <span className="absolute left-1/2 top-[0.45vw] h-[3.7vw] w-[0.16vw] -translate-x-1/2 rotate-[18deg] rounded-full bg-[#F4D5A1]/60" />
        </div>
        <div className="relative h-[5.8vw] w-[3.9vw] rotate-[10deg] rounded-[50%_50%_58%_42%/45%_58%_42%_55%] bg-[#A8543B]/70">
          <span className="absolute left-1/2 top-[0.6vw] h-[4.7vw] w-[0.17vw] -translate-x-1/2 rotate-[-15deg] rounded-full bg-[#F4D5A1]/60" />
        </div>
        <div className="relative mb-[0.5vw] h-[3.8vw] w-[2.6vw] rotate-[28deg] rounded-[55%_45%_48%_52%/42%_56%_44%_58%] bg-[#D3A15F]/70">
          <span className="absolute left-1/2 top-[0.4vw] h-[3vw] w-[0.14vw] -translate-x-1/2 rotate-[-12deg] rounded-full bg-[#FFF1CF]/65" />
        </div>
      </div>

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[24vh] z-10 w-[42vw]">
        <p className="text-[1.6vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Arah platform</p>
        <h2 className="mt-[1.5vh] text-[5.7vw] font-extrabold leading-[0.92] tracking-[-0.08em]">
          Visi dan <span className="text-[#A8543B]">misi.</span>
        </h2>
        <p className="mt-[3.5vh] max-w-[37vw] text-[2.05vw] font-semibold leading-[1.16] text-[#806E63]">
          Menjadikan kopi Garut sebagai origin yang dikenal, dipercaya, dan memberi nilai bagi seluruh ekosistem.
        </p>
        <p className="mt-[4.5vh] text-[1.6vw] font-bold uppercase tracking-[0.18em] text-[#806E63]">Peluang · Pasar · Karya</p>
      </div>

      <div className="absolute right-[6.5vw] top-[20vh] w-[31vw] text-[#FFF9F1]">
        <p className="border-b border-[#D3A15F]/50 pb-[1.2vh] text-[1.8vw] font-extrabold uppercase tracking-[0.18em] text-[#D3A15F]">Misi kami</p>
        <div className="mt-[2.8vh] flex flex-col gap-[2.4vh]">
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.75vh] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[2vw] font-semibold leading-[1.16]">Membuka lebih banyak lapangan kerja dan peluang usaha dari hulu hingga hilir kopi Garut.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.75vh] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[2vw] font-semibold leading-[1.16]">Mengantar kopi Garut dikenal dan dipercaya di pasar nasional hingga internasional.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.75vh] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[2vw] font-semibold leading-[1.16]">Menjadi ruang bagi anak muda kreatif untuk berkarya dan berinovasi bersama.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.75vh] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[2vw] font-semibold leading-[1.16]">Menyatukan petani, pelaku usaha, pemerintah, dan mitra agar nilai kopi tumbuh bersama.</p>
          </div>
        </div>
      </div>
    </div>
  );
}