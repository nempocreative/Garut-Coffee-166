import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotPIC() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#2A201D]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

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

      <div className="absolute left-[6.5vw] top-[18vh] w-[45vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">
          Akuntabilitas pilot / 30
        </p>
        <h2 className="mt-[2vh] text-[5vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Satu nama.
          <span className="block text-[#A8543B]">Satu mandat.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[37vw] text-[1.8vw] leading-[1.18] text-[#806E63]">
          PIC menjaga data, koordinasi, dan tindak lanjut tetap bergerak.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[59vh] w-[49vw] border-t-[0.2vw] border-[#A8543B]">
        <div className="grid grid-cols-[1.05fr_1.55fr_1.4fr_1.35fr] divide-x divide-[#D8C7B5]">
          <div className="py-[1.3vh] pr-[1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Dinas
          </p>
            <p className="mt-[1.1vh] text-[1.35vw] font-extrabold leading-[1.08]">Akses & koordinasi</p>
        </div>
          <div className="px-[1vw] py-[1.3vh]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Kelompok tani
          </p>
            <p className="mt-[1.1vh] text-[1.35vw] font-extrabold leading-[1.08]">Data anggota, kebun, dan lot</p>
        </div>
          <div className="px-[1vw] py-[1.3vh]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Penyuluh
          </p>
            <p className="mt-[1.1vh] text-[1.35vw] font-extrabold leading-[1.08]">Catatan lapangan & tindak lanjut</p>
        </div>
          <div className="pl-[1vw] py-[1.3vh]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Tim platform
          </p>
            <p className="mt-[1.1vh] text-[1.35vw] font-extrabold leading-[1.08]">Produk, integrasi, laporan</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[24vw] text-[#FFF9F1]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">
          Format penetapan
        </p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#E7D9C8]">
          Ditetapkan saat kick-off, agar keputusan punya jalur yang jelas.
        </p>
        <div className="mt-[2.5vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Mandat
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Satu tanggung jawab utama.
            </p>
          </div>
          <div className="border-b border-[#806E63] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Ritme kerja
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Kanal komunikasi & jadwal review.
            </p>
          </div>
          <div className="py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Output
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Daftar PIC, mandat, jalur eskalasi.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}