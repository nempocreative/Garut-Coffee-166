import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideSuccessMetrics() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#2A201D]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[10vw] -bottom-[14vw] h-[37vw] w-[37vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">04 / 27</span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Target & indikator</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Kinerja platform</span>
          <span className="text-[#A8543B]">dibaca dari hasil.</span>
        </h2>
        <p className="mt-[3vh] max-w-[39vw] text-[1.9vw] leading-[1.18] text-[#806E63]">
          Ukur data yang terhubung, digunakan, dan membantu keputusan di lapangan.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[55vh] w-[48vw] space-y-[1.15vh]">
        <div className="flex items-start gap-[1.1vw] border-t border-[#D8C7B5] pt-[1.4vh]">
          <span className="text-[2.2vw] font-extrabold leading-none text-[#A8543B]">01</span>
          <div>
            <p className="text-[1.85vw] font-extrabold leading-none">Adopsi data</p>
            <p className="mt-[0.7vh] text-[1.45vw] leading-[1.15] text-[#806E63]">Profil petani, kebun, dan kelompok yang terverifikasi.</p>
          </div>
        </div>
        <div className="flex items-start gap-[1.1vw] border-t border-[#D8C7B5] pt-[1.4vh]">
          <span className="text-[2.2vw] font-extrabold leading-none text-[#A8543B]">02</span>
          <div>
            <p className="text-[1.85vw] font-extrabold leading-none">Keterlacakan</p>
            <p className="mt-[0.7vh] text-[1.45vw] leading-[1.15] text-[#806E63]">Lot panen dapat ditelusuri dari asal hingga produk.</p>
          </div>
        </div>
        <div className="flex items-start gap-[1.1vw] border-t border-[#D8C7B5] pt-[1.4vh]">
          <span className="text-[2.2vw] font-extrabold leading-none text-[#A8543B]">03</span>
          <div>
            <p className="text-[1.85vw] font-extrabold leading-none">Aktivasi mitra</p>
            <p className="mt-[0.7vh] text-[1.45vw] leading-[1.15] text-[#806E63]">Mitra dan coffee shop aktif menggunakan data origin.</p>
          </div>
        </div>
        <div className="flex items-start gap-[1.1vw] border-t border-[#D8C7B5] pt-[1.4vh]">
          <span className="text-[2.2vw] font-extrabold leading-none text-[#A8543B]">04</span>
          <div>
            <p className="text-[1.85vw] font-extrabold leading-none">Dampak program</p>
            <p className="mt-[0.7vh] text-[1.45vw] leading-[1.15] text-[#806E63]">Pendampingan, pelatihan, dan dukungan tercatat serta ditindaklanjuti.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[24vw] text-[#FFF9F1]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Kerangka pengukuran</p>
        <p className="mt-[1.4vh] text-[1.65vw] font-semibold leading-[1.15] text-[#E7D9C8]">Target pilot ditetapkan setelah baseline lapangan disepakati.</p>
        <div className="mt-[3vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[2.2vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.17em] text-[#D3A15F]">Baseline demo</p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.1]">125 petani · 12 wilayah · 312 ton</p>
          </div>
          <div className="border-b border-[#806E63] py-[2.2vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.17em] text-[#D3A15F]">Target pilot</p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.1]">Ditetapkan bersama Dinas dan kelompok tani.</p>
          </div>
          <div className="py-[2.2vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.17em] text-[#D3A15F]">Review</p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.1]">Bulanan · per wilayah · per program</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#D3A15F]">Target ditetapkan bersama</div>
    </div>
  );
}