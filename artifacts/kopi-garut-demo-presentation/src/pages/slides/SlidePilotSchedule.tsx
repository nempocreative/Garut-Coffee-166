import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotSchedule() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#F6F0E8]" />
      <div className="absolute right-[37vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

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
          Ritme pelaksanaan
        </p>
        <h2 className="mt-[1.5vh] text-[4.45vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Jadwal kick-off</span>
          <span className="text-[#D3A15F]">dan review pertama.</span>
        </h2>
        <p className="mt-[3vh] max-w-[41vw] text-[1.85vw] leading-[1.18] text-[#E7D9C8]">
          Mulai dengan kesepakatan yang jelas, lalu kembali membaca hasil sebelum pilot diperluas.
        </p>
      </div>

      <div className="absolute bottom-[9vh] left-[6.5vw] w-[49vw]">
        <div className="grid grid-cols-3 border-t-[0.25vw] border-[#D3A15F]">
          <div className="border-r border-[#806E63] px-[1.05vw] py-[1vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              01 · Minggu 1
            </p>
            <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
              Kick-off
            </p>
            <p className="mt-[0.85vh] text-[1.8vw] leading-[1.12] text-[#E7D9C8]">
              Tetapkan wilayah, PIC, data, dan agenda kerja.
            </p>
          </div>
          <div className="border-r border-[#806E63] px-[1.05vw] py-[1vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              02 · Minggu 1–2
            </p>
            <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
              Mulai baseline
            </p>
            <p className="mt-[0.85vh] text-[1.8vw] leading-[1.12] text-[#E7D9C8]">
              Verifikasi daftar, kunjungan awal, dan input data.
            </p>
          </div>
          <div className="px-[1.05vw] py-[1vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              03 · Akhir bulan 1
            </p>
            <p className="mt-[1.25vh] text-[1.6vw] font-extrabold leading-[1.05]">
              Review pertama
            </p>
            <p className="mt-[0.85vh] text-[1.8vw] leading-[1.12] text-[#E7D9C8]">
              Baca kelengkapan, isu, dan keputusan berikutnya.
            </p>
          </div>
        </div>
        <div className="mt-[1.7vh] bg-[#3A2B27] px-[1.1vw] py-[0.85vw]">
          <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
            Prinsip jadwal
          </p>
          <p className="mt-[0.75vh] text-[1.85vw] font-semibold leading-[1.12] text-[#E7D9C8]">
            Tanggal kalender ditetapkan bersama PIC setelah wilayah dan peserta pilot disepakati.
          </p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] text-[#2A201D]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Output pertemuan
        </p>
        <p className="mt-[1.2vh] text-[1.9vw] font-semibold leading-[1.14] text-[#806E63]">
          Setiap pertemuan menghasilkan keputusan yang bisa langsung ditindaklanjuti.
        </p>
        <div className="mt-[2.5vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Kick-off
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Agenda, PIC, wilayah, dan data minimum.
            </p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Review pertama
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Temuan awal, isu, dan penyesuaian alur.
            </p>
          </div>
          <div className="py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Setelah review
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Jadwal tindak lanjut dan pemilik keputusan.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] right-[6.5vw] text-[1.5vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">
        Mulai jelas · review teratur · bergerak bersama
      </div>
    </div>
  );
}