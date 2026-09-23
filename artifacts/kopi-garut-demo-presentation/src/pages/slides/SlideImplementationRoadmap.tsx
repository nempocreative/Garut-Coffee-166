import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideImplementationRoadmap() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#F6F0E8]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[15vw] h-[39vw] w-[39vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">05 / 28</span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[47vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Roadmap implementasi</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Mulai dari pilot,</span>
          <span className="text-[#D3A15F]">tumbuh terukur.</span>
        </h2>
        <p className="mt-[3vh] max-w-[42vw] text-[1.9vw] leading-[1.18] text-[#E7D9C8]">
          Bangun fondasi data yang bisa diuji bersama sebelum memperluas fitur, wilayah, dan mitra.
        </p>
      </div>

      <div className="absolute bottom-[8vh] left-[6.5vw] grid w-[49vw] grid-cols-3 gap-[1vw]">
        <div className="min-h-[20vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.15vw] py-[1.25vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">01 · 0–3 bulan</p>
          <p className="mt-[2vh] text-[1.6vw] font-bold leading-[1.12]">Baseline dan pilot</p>
          <p className="mt-[1.2vh] text-[1.35vw] leading-[1.18] text-[#E7D9C8]">Validasi petani, wilayah, lot, dan kebutuhan peran.</p>
        </div>
        <div className="min-h-[20vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.15vw] py-[1.25vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">02 · 3–6 bulan</p>
          <p className="mt-[2vh] text-[1.6vw] font-bold leading-[1.12]">Operasional terhubung</p>
          <p className="mt-[1.2vh] text-[1.35vw] leading-[1.18] text-[#E7D9C8]">Aktifkan kebun, pendampingan, mutu, dan traceability.</p>
        </div>
        <div className="min-h-[20vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.15vw] py-[1.25vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">03 · 6–12 bulan</p>
          <p className="mt-[2vh] text-[1.6vw] font-bold leading-[1.12]">Perluasan ekosistem</p>
          <p className="mt-[1.2vh] text-[1.35vw] leading-[1.18] text-[#E7D9C8]">Perluas mitra, origin signature, dan pengalaman pelanggan.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[24vw] text-[#2A201D]">
        <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.18em] text-[#A8543B]">Fokus awal</p>
        <p className="mt-[1.1vh] text-[1.35vw] font-semibold leading-[1.15] text-[#806E63]">Contoh urutan pilot yang perlu disepakati bersama pemangku kepentingan.</p>
        <div className="mt-[3.2vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[2.4vh]">
            <p className="text-[3.2vw] font-extrabold leading-none text-[#A8543B]">1</p>
            <p className="mt-[0.8vh] text-[1.45vw] font-extrabold uppercase tracking-[0.13em] text-[#806E63]">Wilayah pilot</p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[2.4vh]">
            <p className="text-[3.2vw] font-extrabold leading-none text-[#A8543B]">1</p>
            <p className="mt-[0.8vh] text-[1.45vw] font-extrabold uppercase tracking-[0.13em] text-[#806E63]">Alur lot ke produk</p>
          </div>
          <div className="py-[2.4vh]">
            <p className="text-[3.2vw] font-extrabold leading-none text-[#A8543B]">1</p>
            <p className="mt-[0.8vh] text-[1.45vw] font-extrabold uppercase tracking-[0.13em] text-[#806E63]">Siklus review</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">Contoh urutan pilot</div>
    </div>
  );
}