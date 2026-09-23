import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotPIC() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#2A201D]" />
      <div className="absolute right-[37vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[16vw] h-[40vw] w-[40vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

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
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">
          30 / 34
        </span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[43vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Akuntabilitas pilot
        </p>
        <h2 className="mt-[1.5vh] text-[4.5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Penunjukan PIC</span>
          <span className="text-[#A8543B]">dari tiap pihak.</span>
        </h2>
        <p className="mt-[3vh] max-w-[39vw] text-[1.85vw] leading-[1.18] text-[#806E63]">
          Satu nama yang jelas untuk menjaga data, koordinasi, dan tindak lanjut tetap bergerak.
        </p>
      </div>

      <div className="absolute bottom-[8vh] left-[6.5vw] grid w-[48vw] grid-cols-2 gap-[0.9vw]">
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.2vw] py-[1.15vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Dinas
          </p>
          <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Membuka akses dan menjaga koordinasi lintas program.
          </p>
        </div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.2vw] py-[1.15vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Kelompok tani
          </p>
          <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Mengawal data anggota, kebun, dan lot yang masuk.
          </p>
        </div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.2vw] py-[1.15vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Penyuluh
          </p>
          <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Menghubungkan catatan lapangan dengan tindak lanjut.
          </p>
        </div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.2vw] py-[1.15vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            Tim platform
          </p>
          <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
            Menjaga produk digital, integrasi, dan laporan.
          </p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] text-[#FFF9F1]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">
          Format penetapan
        </p>
        <p className="mt-[1.2vh] text-[1.65vw] font-semibold leading-[1.15] text-[#E7D9C8]">
          PIC ditetapkan saat kick-off agar setiap keputusan punya jalur yang jelas.
        </p>
        <div className="mt-[3.2vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[2.25vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Mandat
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Satu tanggung jawab utama per pihak.
            </p>
          </div>
          <div className="border-b border-[#806E63] py-[2.25vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Ritme kerja
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Kanal komunikasi dan jadwal review disepakati.
            </p>
          </div>
          <div className="py-[2.25vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Output
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Daftar PIC, mandat, dan jalur eskalasi.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#D3A15F]">
        Jelas siapa · jelas tindak lanjut
      </div>
    </div>
  );
}