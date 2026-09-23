import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotFarmers() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#F6F0E8]" />
      <div className="absolute right-[37vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[16vw] h-[40vw] w-[40vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img
          src={logo}
          alt="Logo Garut Beans G-Beans"
          crossOrigin="anonymous"
          className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]"
        />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">
          Garut <span className="text-[#D3A15F]">Beans</span>
        </span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">
          Data awal pilot
        </p>
        <h2 className="mt-[1.5vh] text-[4.45vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Daftar kelompok tani</span>
          <span className="text-[#D3A15F]">dan petani awal.</span>
        </h2>
        <p className="mt-[3vh] max-w-[40vw] text-[1.85vw] leading-[1.18] text-[#E7D9C8]">
          Mulai dari daftar yang dapat diverifikasi, dihubungi, dan didampingi dalam satu siklus pilot.
        </p>
      </div>

      <div className="absolute bottom-[9vh] left-[6.5vw] grid w-[49vw] grid-cols-3 gap-[0.9vw]">
        <div className="min-h-0 border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.05vw] py-[1.05vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            01
          </p>
          <p className="mt-[1.3vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Kelompok tani
          </p>
          <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">
            Nama kelompok, wilayah, kontak, dan status kesiapan.
          </p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.05vw] py-[1.05vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            02
          </p>
          <p className="mt-[1.3vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Petani awal
          </p>
          <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">
            Profil petani, kebun, komoditas, dan kesediaan ikut pilot.
          </p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.05vw] py-[1.05vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            03
          </p>
          <p className="mt-[1.3vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Verifikasi awal
          </p>
          <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">
            Kontak, lokasi, dan data dasar siap ditinjau bersama.
          </p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] text-[#2A201D]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Format daftar awal
        </p>
        <p className="mt-[1.2vh] text-[1.65vw] font-semibold leading-[1.15] text-[#806E63]">
          Daftar ini menjadi dasar kunjungan pertama dan pengumpulan baseline.
        </p>
        <div className="mt-[2.5vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.55vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Disusun oleh
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Dinas, penyuluh, dan kelompok tani.
            </p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.55vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Disepakati bersama
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Kriteria peserta dan data minimum pilot.
            </p>
          </div>
          <div className="py-[1.55vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Output
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Daftar terverifikasi untuk kunjungan awal.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] right-[6.5vw] text-[1.1vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">
        Dari daftar awal · menuju baseline lapangan
      </div>
    </div>
  );
}