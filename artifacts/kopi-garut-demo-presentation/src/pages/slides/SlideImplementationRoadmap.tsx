import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideImplementationRoadmap() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#F6F0E8]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[15vw] h-[39vw] w-[39vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[50vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Roadmap implementasi</p>
        <h2 className="mt-[1.5vh] text-[4.35vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Dari pilot Garut</span>
          <span className="text-[#D3A15F]">menuju pasar dunia.</span>
        </h2>
        <p className="mt-[2.5vh] max-w-[45vw] text-[1.8vw] leading-[1.18] text-[#E7D9C8]">
          Naik level hanya setelah data, mutu, pasokan, dan mitra siap dibawa ke skala berikutnya.
        </p>
      </div>

      <div className="absolute bottom-[7vh] left-[6.5vw] grid w-[51vw] grid-cols-5 gap-[0.55vw]">
        <div className="min-h-[25vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[0.8vw] py-[1vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">01 · 0–3 bulan</p>
          <p className="mt-[1.7vh] text-[1.45vw] font-bold leading-[1.08]">Pilot & baseline</p>
          <p className="mt-[1vh] text-[1.15vw] leading-[1.18] text-[#E7D9C8]">Wilayah, petani, lot, dan data minimum.</p>
        </div>
        <div className="min-h-[25vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[0.8vw] py-[1vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">02 · 3–6 bulan</p>
          <p className="mt-[1.7vh] text-[1.45vw] font-bold leading-[1.08]">Buktikan alur</p>
          <p className="mt-[1vh] text-[1.15vw] leading-[1.18] text-[#E7D9C8]">Kebun, pendampingan, mutu, dan traceability.</p>
        </div>
        <div className="min-h-[25vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[0.8vw] py-[1vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">03 · 6–12 bulan</p>
          <p className="mt-[1.7vh] text-[1.45vw] font-bold leading-[1.08]">Skala Garut</p>
          <p className="mt-[1vh] text-[1.15vw] leading-[1.18] text-[#E7D9C8]">Tambah kelompok, mitra, dan origin signature.</p>
        </div>
        <div className="min-h-[25vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[0.8vw] py-[1vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">04 · 12–24 bulan</p>
          <p className="mt-[1.7vh] text-[1.45vw] font-bold leading-[1.08]">Pasar nasional</p>
          <p className="mt-[1vh] text-[1.15vw] leading-[1.18] text-[#E7D9C8]">Perluas roaster, coffee shop, distribusi, dan promosi.</p>
        </div>
        <div className="min-h-[25vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[0.8vw] py-[1vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">05 · 24+ bulan</p>
          <p className="mt-[1.7vh] text-[1.45vw] font-bold leading-[1.08]">Pasar internasional</p>
          <p className="mt-[1vh] text-[1.15vw] leading-[1.18] text-[#E7D9C8]">Kesiapan ekspor, buyer, kepatuhan, dan pasokan.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[24vw] text-[#2A201D]">
        <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.18em] text-[#A8543B]">Gerbang naik level</p>
        <p className="mt-[1.1vh] text-[1.4vw] font-semibold leading-[1.15] text-[#806E63]">Perluasan dilakukan setelah fondasi di level sebelumnya terbukti.</p>
        <div className="mt-[3.2vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.7vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Dari pilot ke Garut</p>
            <p className="mt-[0.7vh] text-[1.45vw] font-extrabold leading-[1.08]">Data dan alur kerja konsisten.</p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.7vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Dari Garut ke nasional</p>
            <p className="mt-[0.7vh] text-[1.45vw] font-extrabold leading-[1.08]">Mutu, volume, dan mitra siap.</p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.7vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Dari nasional ke dunia</p>
            <p className="mt-[0.7vh] text-[1.45vw] font-extrabold leading-[1.08]">Kepatuhan ekspor dan buyer siap.</p>
          </div>
          <div className="py-[1.7vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Ukuran keberhasilan</p>
            <p className="mt-[0.7vh] text-[1.45vw] font-extrabold leading-[1.08]">Review per fase, bukan sekadar target.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">Pilot · Garut · Nasional · Internasional</div>
    </div>
  );
}