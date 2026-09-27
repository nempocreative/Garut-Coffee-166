import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotPlan() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[32vw] bg-[#2A201D]" />
      <div className="absolute right-[32vw] top-0 h-full w-[0.18vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img
          src={logo}
          alt="Logo Garut Beans G-Beans"
          crossOrigin="anonymous"
          className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]"
        />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">
          Garut <span className="text-[#A8543B]">Beans</span>
        </span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[46vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">
          Rencana pilot / 28
        </p>
        <h2 className="mt-[2vh] text-[5.1vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Uji bersama,
          <span className="block text-[#A8543B]">ukur hasilnya.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[38vw] text-[1.8vw] leading-[1.18] text-[#806E63]">
          Pilot yang cukup kecil untuk dikawal, cukup nyata untuk menghasilkan keputusan.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[58vh] w-[52vw]">
        <div className="grid grid-cols-3 border-t-[0.2vw] border-[#A8543B]">
          <div className="border-r border-[#D8C7B5] py-[1.2vh] pr-[1.2vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              01 · 0–1 bulan
            </p>
            <p className="mt-[1.1vh] text-[1.8vw] font-extrabold leading-[1.05]">Siapkan baseline</p>
            <p className="mt-[0.8vh] text-[1.35vw] leading-[1.15] text-[#806E63]">Wilayah · petani · lot · indikator</p>
          </div>
          <div className="border-r border-[#D8C7B5] px-[1.2vw] py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              02 · 2–3 bulan
            </p>
            <p className="mt-[1.1vh] text-[1.8vw] font-extrabold leading-[1.05]">Jalankan alur</p>
            <p className="mt-[0.8vh] text-[1.35vw] leading-[1.15] text-[#806E63]">Kebun · pendampingan · mutu · lot</p>
          </div>
          <div className="py-[1.2vh] pl-[1.2vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              03 · 4–6 bulan
            </p>
            <p className="mt-[1.1vh] text-[1.8vw] font-extrabold leading-[1.05]">Review & perluas</p>
            <p className="mt-[0.8vh] text-[1.35vw] leading-[1.15] text-[#806E63]">Hasil · alur · keputusan scale-up</p>
          </div>
        </div>
        <div className="mt-[2vh] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[1.2vh]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Output</p>
          <p className="text-[1.55vw] font-semibold leading-[1.1]">Baseline · alur lot ke produk · laporan evaluasi</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[22vw] text-[#FFF9F1]">
        <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.22em] text-[#D3A15F]">Peran kunci</p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#E7D9C8]">Satu alur kerja, empat pemegang mandat.</p>
        <div className="mt-[3vh] border-t border-[#806E63]">
          <p className="border-b border-[#806E63] py-[1.4vh] text-[1.55vw] font-extrabold"><span className="text-[#D3A15F]">Dinas</span> / akses & koordinasi</p>
          <p className="border-b border-[#806E63] py-[1.4vh] text-[1.55vw] font-extrabold"><span className="text-[#D3A15F]">Petani</span> / data & validasi</p>
          <p className="border-b border-[#806E63] py-[1.4vh] text-[1.55vw] font-extrabold"><span className="text-[#D3A15F]">Penyuluh</span> / pendampingan</p>
          <p className="py-[1.4vh] text-[1.55vw] font-extrabold"><span className="text-[#D3A15F]">Platform</span> / integrasi & laporan</p>
        </div>
      </div>
    </div>
  );
}