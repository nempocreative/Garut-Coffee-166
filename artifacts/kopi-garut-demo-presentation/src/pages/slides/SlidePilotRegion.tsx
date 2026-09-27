import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotRegion() {
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

      <div className="absolute left-[6.5vw] top-[18vh] w-[48vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">
          Keputusan pertama
        </p>
        <h2 className="mt-[2vh] text-[5.1vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Penetapan
          <span className="block text-[#D3A15F]">wilayah pilot.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[39vw] text-[1.8vw] leading-[1.18] text-[#E7D9C8]">
          Pilih wilayah yang mewakili keragaman dan siap didampingi sampai menghasilkan data.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[59vh] grid w-[49vw] grid-cols-3 gap-[0.9vw]">
        <div className="min-h-0 border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.05vw] py-[1.2vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            01
          </p>
          <p className="mt-[1.3vh] text-[1.65vw] font-extrabold leading-[1.05]">Keterwakilan</p>
          <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">Variasi wilayah, kebun, dan proses kopi.</p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.05vw] py-[1.05vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            02
          </p>
          <p className="mt-[1.3vh] text-[1.65vw] font-extrabold leading-[1.05]">Kesiapan data</p>
          <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">Kelompok, kontak, dan baseline terverifikasi.</p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.05vw] py-[1.05vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            03
          </p>
          <p className="mt-[1.3vh] text-[1.65vw] font-extrabold leading-[1.05]">Pendampingan</p>
          <p className="mt-[0.9vh] text-[1.3vw] leading-[1.15] text-[#E7D9C8]">Penyuluh dan PIC hadir untuk review rutin.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[23vw] text-[#2A201D]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Hasil keputusan
        </p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#806E63]">
          Titik awal kerja yang dapat dipertanggungjawabkan.
        </p>
        <div className="mt-[2.5vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Wilayah & kelompok
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Daftar wilayah dan kelompok.
            </p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Penanggung jawab
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              PIC Dinas, kelompok tani, penyuluh, platform.
            </p>
          </div>
          <div className="py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Langkah berikutnya
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Kunjungan awal & baseline.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}