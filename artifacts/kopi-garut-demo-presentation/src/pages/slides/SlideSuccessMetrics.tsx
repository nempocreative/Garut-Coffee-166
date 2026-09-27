import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideSuccessMetrics() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[31vw] bg-[#2A201D]" />
      <div className="absolute right-[31vw] top-0 h-full w-[0.18vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[54vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">Target & indikator</p>
        <h2 className="mt-[2vh] max-w-[50vw] text-[5.25vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Kinerja dibaca
          <span className="block text-[#A8543B]">dari hasil.</span>
        </h2>
        <p className="mt-[3.5vh] max-w-[41vw] text-[1.75vw] leading-[1.18] text-[#806E63]">
          Empat tanda bahwa data mulai bekerja di lapangan.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[58vh] w-[53vw] border-t-[0.2vw] border-[#A8543B]">
        <div className="grid grid-cols-4 divide-x divide-[#D8C7B5]">
          <div className="py-[1.5vh] pr-[1vw]">
            <span className="text-[2.45vw] font-extrabold leading-none text-[#A8543B]">01</span>
            <p className="mt-[1.2vh] text-[1.65vw] font-extrabold leading-[1.05]">Adopsi data</p>
            <p className="mt-[1vh] text-[1.3vw] leading-[1.15] text-[#806E63]">Profil terverifikasi.</p>
          </div>
          <div className="px-[1vw] py-[1.5vh]">
            <span className="text-[2.45vw] font-extrabold leading-none text-[#A8543B]">02</span>
            <p className="mt-[1.2vh] text-[1.65vw] font-extrabold leading-[1.05]">Keterlacakan</p>
            <p className="mt-[1vh] text-[1.3vw] leading-[1.15] text-[#806E63]">Lot sampai produk.</p>
          </div>
          <div className="px-[1vw] py-[1.5vh]">
            <span className="text-[2.45vw] font-extrabold leading-none text-[#A8543B]">03</span>
            <p className="mt-[1.2vh] text-[1.65vw] font-extrabold leading-[1.05]">Aktivasi mitra</p>
            <p className="mt-[1vh] text-[1.3vw] leading-[1.15] text-[#806E63]">Origin digunakan.</p>
          </div>
          <div className="px-[1vw] py-[1.5vh]">
            <span className="text-[2.45vw] font-extrabold leading-none text-[#A8543B]">04</span>
            <p className="mt-[1.2vh] text-[1.65vw] font-extrabold leading-[1.05]">Dampak program</p>
            <p className="mt-[1vh] text-[1.3vw] leading-[1.15] text-[#806E63]">Ada tindak lanjut.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[23vw] text-[#FFF9F1]">
        <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Baseline / review</p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#E7D9C8]">Mulai dari kondisi yang tercatat, lalu baca perubahannya.</p>
        <div className="mt-[3.5vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[2vh]">
            <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">Snapshot awal</p>
            <p className="mt-[0.8vh] text-[1.85vw] font-extrabold leading-[1.08]">125 petani<br />12 wilayah · 312 ton</p>
          </div>
          <div className="border-b border-[#806E63] py-[2vh]">
            <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">Target pilot</p>
            <p className="mt-[0.8vh] text-[1.75vw] font-extrabold leading-[1.08]">Disepakati bersama.</p>
          </div>
          <div className="py-[2vh]">
            <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">Review</p>
            <p className="mt-[0.8vh] text-[1.75vw] font-extrabold leading-[1.08]">Bulanan · wilayah · program</p>
          </div>
        </div>
      </div>
    </div>
  );
}