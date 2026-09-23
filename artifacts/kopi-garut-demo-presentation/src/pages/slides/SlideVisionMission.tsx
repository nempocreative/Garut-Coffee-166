import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideVisionMission() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[40vw] bg-[linear-gradient(145deg,#2A201D_0%,#362720_100%)]" />
      <div className="absolute right-[40vw] top-0 h-full w-[0.12vw] bg-[#A8543B]/70" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>
      <div className="absolute right-[6.5vw] top-[6vh] text-[1.5vw] font-bold tracking-[0.16em] text-[#FFF9F1]/80">02 / 34</div>

      <div className="absolute left-[6.5vw] top-[24vh] w-[42vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Arah platform</p>
        <h2 className="mt-[1.5vh] text-[5.7vw] font-extrabold leading-[0.92] tracking-[-0.08em]">
          Visi dan <span className="text-[#A8543B]">misi.</span>
        </h2>
        <p className="mt-[3.5vh] max-w-[37vw] text-[2.05vw] font-semibold leading-[1.16] text-[#806E63]">
          Menjadikan kopi Garut sebagai origin yang dikenal, dipercaya, dan memberi nilai bagi seluruh ekosistem.
        </p>
        <p className="mt-[4.5vh] text-[1.5vw] font-bold uppercase tracking-[0.18em] text-[#806E63]">Asal · Mutu · Kolaborasi</p>
      </div>

      <div className="absolute right-[6.5vw] top-[20vh] w-[29vw] text-[#FFF9F1]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Misi kami</p>
        <div className="mt-[4vh] flex flex-col gap-[3.2vh]">
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.8vh] h-[0.55vw] w-[0.55vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[1.7vw] font-semibold leading-[1.16]">Menyatukan data asal, pelaku, produk, dan pengalaman Garut.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.8vh] h-[0.55vw] w-[0.55vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[1.7vw] font-semibold leading-[1.16]">Membuka akses petani dan mitra pada informasi, program, dan pasar.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.8vh] h-[0.55vw] w-[0.55vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[1.7vw] font-semibold leading-[1.16]">Menguatkan mutu, traceability, dan keputusan usaha.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="mt-[0.8vh] h-[0.55vw] w-[0.55vw] shrink-0 rounded-full bg-[#D3A15F]" />
            <p className="text-[1.7vw] font-semibold leading-[1.16]">Menumbuhkan nilai kopi melalui kolaborasi daerah.</p>
          </div>
        </div>
      </div>
    </div>
  );
}