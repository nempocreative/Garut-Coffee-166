import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideSuccessMetrics() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#2A201D]" />
      <div className="absolute right-[37vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[10vw] -bottom-[14vw] h-[37vw] w-[37vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[47vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Target & indikator</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Kinerja platform</span>
          <span className="text-[#A8543B]">dibaca dari hasil.</span>
        </h2>
        <p className="mt-[3vh] max-w-[42vw] text-[2vw] leading-[1.18] text-[#806E63]">
          Ukur data yang terhubung, digunakan, dan membantu keputusan di lapangan.
        </p>
      </div>

      <div className="absolute bottom-[14vh] left-[6.5vw] grid w-[49vw] grid-cols-2 gap-[1vw]">
        <div className="h-[14vh] border-t-[0.16vw] border-[#A8543B] bg-[#FFF9F1]/82 px-[1vw] py-[1.05vw]">
          <div className="flex items-baseline gap-[0.7vw]">
            <span className="text-[1.5vw] font-extrabold leading-none text-[#A8543B]">01</span>
            <p className="text-[1.75vw] font-extrabold leading-none">Adopsi data</p>
          </div>
          <p className="mt-[1.1vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Profil petani, kebun, dan kelompok terverifikasi.</p>
        </div>
        <div className="h-[14vh] border-t-[0.16vw] border-[#A8543B] bg-[#FFF9F1]/82 px-[1vw] py-[1.05vw]">
          <div className="flex items-baseline gap-[0.7vw]">
            <span className="text-[1.5vw] font-extrabold leading-none text-[#A8543B]">02</span>
            <p className="text-[1.75vw] font-extrabold leading-none">Keterlacakan</p>
          </div>
          <p className="mt-[1.1vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Lot panen terlacak dari asal hingga produk.</p>
        </div>
        <div className="h-[14vh] border-t-[0.16vw] border-[#A8543B] bg-[#FFF9F1]/82 px-[1vw] py-[1.05vw]">
          <div className="flex items-baseline gap-[0.7vw]">
            <span className="text-[1.5vw] font-extrabold leading-none text-[#A8543B]">03</span>
            <p className="text-[1.75vw] font-extrabold leading-none">Aktivasi mitra</p>
          </div>
          <p className="mt-[1.1vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Mitra dan coffee shop aktif memakai data origin.</p>
        </div>
        <div className="h-[14vh] border-t-[0.16vw] border-[#A8543B] bg-[#FFF9F1]/82 px-[1vw] py-[1.05vw]">
          <div className="flex items-baseline gap-[0.7vw]">
            <span className="text-[1.5vw] font-extrabold leading-none text-[#A8543B]">04</span>
            <p className="text-[1.75vw] font-extrabold leading-none">Dampak program</p>
          </div>
          <p className="mt-[1.1vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Pendampingan dan dukungan tercatat serta ditindaklanjuti.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[26vw] text-[#FFF9F1]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">Kerangka pengukuran</p>
        <p className="mt-[1.4vh] text-[1.9vw] font-semibold leading-[1.15] text-[#E7D9C8]">Mulai dari baseline, lalu baca perubahan secara berkala.</p>
        <div className="mt-[3vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[2.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.12em] text-[#D3A15F]">Baseline lapangan</p>
            <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.1]">125 petani · 12 wilayah · 312 ton</p>
          </div>
          <div className="border-b border-[#806E63] py-[2.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.12em] text-[#D3A15F]">Target pilot</p>
            <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.1]">Disepakati bersama Dinas dan kelompok tani.</p>
          </div>
          <div className="py-[2.2vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.12em] text-[#D3A15F]">Review</p>
            <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.1]">Bulanan · wilayah · program</p>
          </div>
        </div>
      </div>
    </div>
  );
}