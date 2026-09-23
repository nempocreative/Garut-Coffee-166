import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotPlan() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#2A201D]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[15vw] h-[40vw] w-[40vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

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

      <div className="absolute left-[6.5vw] top-[17vh] w-[51vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Rencana pilot, peran, dan output
        </p>
        <h2 className="mt-[1.5vh] text-[4.4vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Uji bersama,</span>
          <span className="text-[#A8543B]">ukur hasilnya.</span>
        </h2>
        <p className="mt-[2.5vh] max-w-[45vw] text-[1.75vw] leading-[1.18] text-[#806E63]">
          Pilot dibuat cukup kecil untuk dikawal, cukup nyata untuk menghasilkan keputusan.
        </p>
      </div>

      <div className="absolute bottom-[10vh] left-[6.5vw] w-[52vw]">
        <div className="grid grid-cols-[1.15fr_1.45fr_1.5fr] border-t-[0.2vw] border-[#A8543B]">
          <div className="border-r border-[#D8C7B5] px-[1.1vw] py-[1vw]">
            <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              01 · 0–1 bulan
            </p>
            <p className="mt-[1.2vh] text-[1.6vw] font-extrabold leading-[1.05]">
              Siapkan baseline
            </p>
            <p className="mt-[0.8vh] text-[1.3vw] leading-[1.15] text-[#806E63]">
              Pilih wilayah, petani, lot, dan indikator.
            </p>
          </div>
          <div className="border-r border-[#D8C7B5] px-[1.1vw] py-[1vw]">
            <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              02 · 2–3 bulan
            </p>
            <p className="mt-[1.2vh] text-[1.6vw] font-extrabold leading-[1.05]">
              Jalankan alur
            </p>
            <p className="mt-[0.8vh] text-[1.3vw] leading-[1.15] text-[#806E63]">
              Catat kebun, pendampingan, mutu, dan lot.
            </p>
          </div>
          <div className="px-[1.1vw] py-[1vw]">
            <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              03 · 4–6 bulan
            </p>
            <p className="mt-[1.2vh] text-[1.6vw] font-extrabold leading-[1.05]">
              Review & perluas
            </p>
            <p className="mt-[0.8vh] text-[1.3vw] leading-[1.15] text-[#806E63]">
              Baca hasil, perbaiki alur, putuskan scale-up.
            </p>
          </div>
        </div>
        <div className="mt-[1.6vh] grid grid-cols-3 gap-[0.8vw]">
          <div className="bg-[#E7D9C8] px-[1vw] py-[0.75vw]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">
              Output awal
            </p>
            <p className="mt-[0.7vh] text-[1.35vw] font-semibold leading-[1.15]">
              Daftar pilot & baseline data
            </p>
          </div>
          <div className="bg-[#E7D9C8] px-[1vw] py-[0.75vw]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">
              Output kerja
            </p>
            <p className="mt-[0.7vh] text-[1.35vw] font-semibold leading-[1.15]">
              Alur lot ke produk yang tercatat
            </p>
          </div>
          <div className="bg-[#E7D9C8] px-[1vw] py-[0.75vw]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">
              Output keputusan
            </p>
            <p className="mt-[0.7vh] text-[1.35vw] font-semibold leading-[1.15]">
              Laporan evaluasi & rencana perluasan
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[24vw] text-[#FFF9F1]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">
          Peran kunci
        </p>
        <p className="mt-[1.2vh] text-[1.6vw] font-semibold leading-[1.15] text-[#E7D9C8]">
          Setiap pihak memegang bagian yang jelas dari satu alur kerja.
        </p>
        <div className="mt-[2.5vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[1.4vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Dinas
            </p>
            <p className="mt-[0.6vh] text-[1.55vw] font-extrabold leading-[1.08]">
              Akses, legitimasi, dan koordinasi program.
            </p>
          </div>
          <div className="border-b border-[#806E63] py-[1.4vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Petani & kelompok
            </p>
            <p className="mt-[0.6vh] text-[1.55vw] font-extrabold leading-[1.08]">
              Data kebun, aktivitas, dan validasi lapangan.
            </p>
          </div>
          <div className="border-b border-[#806E63] py-[1.4vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Penyuluh
            </p>
            <p className="mt-[0.6vh] text-[1.55vw] font-extrabold leading-[1.08]">
              Pendampingan, kunjungan, dan tindak lanjut.
            </p>
          </div>
          <div className="py-[1.4vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Tim platform
            </p>
            <p className="mt-[0.6vh] text-[1.55vw] font-extrabold leading-[1.08]">
              Produk digital, integrasi, dan laporan review.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#D3A15F]">
        Satu pilot · tiga keputusan
      </div>
    </div>
  );
}