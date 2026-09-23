import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideVisionMission() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#2A201D]" />
      <div className="absolute right-[34vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[8vw] -bottom-[15vw] h-[39vw] w-[39vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">02 / 28</span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[42vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Arah platform</p>
        <h2 className="mt-[1.5vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Visi dan</span>
          <span className="text-[#A8543B]">misi.</span>
        </h2>
        <div className="mt-[3.8vh] h-[0.42vh] w-[7vw] rounded-full bg-[#D3A15F]" />
        <p className="mt-[3vh] max-w-[38vw] text-[2.05vw] font-semibold leading-[1.15] text-[#806E63]">
          Menjadikan kopi Garut sebagai origin yang dikenal, dipercaya, dan memberi nilai bagi seluruh ekosistem.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[23vw] text-[#FFF9F1]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Misi kami</p>
        <div className="mt-[2.3vh] border-t border-[#806E63]">
          <div className="flex gap-[1vw] border-b border-[#806E63] py-[2.2vh]">
            <span className="text-[2.3vw] font-extrabold leading-none text-[#D3A15F]">01</span>
            <p className="text-[1.55vw] font-semibold leading-[1.15]">Menyatukan data asal, pelaku, produk, dan pengalaman Garut.</p>
          </div>
          <div className="flex gap-[1vw] border-b border-[#806E63] py-[2.2vh]">
            <span className="text-[2.3vw] font-extrabold leading-none text-[#D3A15F]">02</span>
            <p className="text-[1.55vw] font-semibold leading-[1.15]">Memperkuat akses petani dan mitra terhadap informasi, program, dan pasar.</p>
          </div>
          <div className="flex gap-[1vw] border-b border-[#806E63] py-[2.2vh]">
            <span className="text-[2.3vw] font-extrabold leading-none text-[#D3A15F]">03</span>
            <p className="text-[1.55vw] font-semibold leading-[1.15]">Mendorong mutu, traceability, dan keputusan usaha yang lebih terarah.</p>
          </div>
          <div className="flex gap-[1vw] py-[2.2vh]">
            <span className="text-[2.3vw] font-extrabold leading-none text-[#D3A15F]">04</span>
            <p className="text-[1.55vw] font-semibold leading-[1.15]">Membuka ruang kolaborasi agar nilai kopi tumbuh di daerah.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] left-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.16em] text-[#806E63]">Asal · Mutu · Kolaborasi</div>
      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.16em] text-[#D3A15F]">Arah yang menyatukan</div>
    </div>
  );
}