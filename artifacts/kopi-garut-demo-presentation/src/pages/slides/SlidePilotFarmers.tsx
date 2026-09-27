import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotFarmers() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#F6F0E8]" />
      <div className="absolute right-[34vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

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

      <div className="absolute left-[6.5vw] top-[18vh] w-[46vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">
          Data awal pilot
        </p>
        <h2 className="mt-[2vh] text-[5vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Mulai dari
          <span className="block text-[#D3A15F]">daftar yang nyata.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[37vw] text-[1.8vw] leading-[1.18] text-[#E7D9C8]">
          Kelompok tani dan petani awal yang dapat diverifikasi, dihubungi, dan didampingi.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[58vh] w-[49vw] border-t-[0.2vw] border-[#D3A15F]">
        <div className="grid grid-cols-3 divide-x divide-[#806E63]">
          <div className="min-h-0 bg-[#3A2B27] px-[1.05vw] py-[1.3vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            01
          </p>
            <p className="mt-[1.3vh] text-[1.6vw] font-extrabold leading-[1.05]">Kelompok tani</p>
            <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">Nama · wilayah · kontak · kesiapan</p>
        </div>
          <div className="min-h-0 bg-[#3A2B27] px-[1.05vw] py-[1.3vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            02
          </p>
            <p className="mt-[1.3vh] text-[1.6vw] font-extrabold leading-[1.05]">Petani awal</p>
            <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">Profil · kebun · komoditas · kesediaan</p>
        </div>
          <div className="min-h-0 bg-[#3A2B27] px-[1.05vw] py-[1.3vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            03
          </p>
            <p className="mt-[1.3vh] text-[1.6vw] font-extrabold leading-[1.05]">Verifikasi awal</p>
            <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">Kontak · lokasi · data dasar</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[23vw] text-[#2A201D]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Format daftar awal
        </p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#806E63]">
          Dasar kunjungan pertama dan pengumpulan baseline.
        </p>
        <div className="mt-[2.5vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Disusun oleh
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Dinas · penyuluh · kelompok tani
            </p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Disepakati bersama
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Kriteria peserta & data minimum
            </p>
          </div>
          <div className="py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Output
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Daftar terverifikasi
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}