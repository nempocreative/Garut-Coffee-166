import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotSchedule() {
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
          Ritme pelaksanaan
        </p>
        <h2 className="mt-[2vh] text-[5vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Mulai jelas.
          <span className="block text-[#D3A15F]">Review teratur.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[37vw] text-[1.8vw] leading-[1.18] text-[#E7D9C8]">
          Tetapkan kesepakatan, baca hasil, lalu putuskan langkah berikutnya.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[58vh] w-[49vw]">
        <div className="relative grid grid-cols-3 border-t-[0.25vw] border-[#D3A15F]">
          <div className="border-r border-[#806E63] py-[1.2vh] pr-[1vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              01 · Minggu 1
            </p>
            <p className="mt-[1.25vh] text-[1.75vw] font-extrabold leading-[1.05]">Kick-off</p>
            <p className="mt-[0.85vh] text-[1.35vw] leading-[1.12] text-[#E7D9C8]">Wilayah · PIC · data · agenda</p>
          </div>
          <div className="border-r border-[#806E63] px-[1vw] py-[1.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              02 · Minggu 1–2
            </p>
            <p className="mt-[1.25vh] text-[1.75vw] font-extrabold leading-[1.05]">Mulai baseline</p>
            <p className="mt-[0.85vh] text-[1.35vw] leading-[1.12] text-[#E7D9C8]">Verifikasi · kunjungan · input data</p>
          </div>
          <div className="py-[1.2vh] pl-[1vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              03 · Akhir bulan 1
            </p>
            <p className="mt-[1.25vh] text-[1.75vw] font-extrabold leading-[1.05]">Review pertama</p>
            <p className="mt-[0.85vh] text-[1.35vw] leading-[1.12] text-[#E7D9C8]">Kelengkapan · isu · keputusan</p>
          </div>
        </div>
        <div className="mt-[1.7vh] flex items-baseline gap-[1vw] border-t border-[#806E63] pt-[1.3vh]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">Prinsip jadwal</p>
          <p className="text-[1.45vw] font-semibold leading-[1.12] text-[#E7D9C8]">Tanggal ditetapkan bersama PIC setelah wilayah dan peserta disepakati.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[23vw] text-[#2A201D]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Output pertemuan
        </p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#806E63]">
          Setiap pertemuan menghasilkan keputusan yang bisa ditindaklanjuti.
        </p>
        <div className="mt-[2.5vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Kick-off
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Agenda · PIC · wilayah · data minimum
            </p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Review pertama
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Temuan awal · isu · penyesuaian alur
            </p>
          </div>
          <div className="py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
              Setelah review
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Jadwal tindak lanjut & pemilik keputusan
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}