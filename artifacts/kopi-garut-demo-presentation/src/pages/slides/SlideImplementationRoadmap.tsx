import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideImplementationRoadmap() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#F6F0E8]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

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
        <p className="mt-[2.5vh] max-w-[45vw] text-[2vw] leading-[1.18] text-[#E7D9C8]">
          Naik level hanya setelah data, mutu, pasokan, dan mitra siap dibawa ke skala berikutnya.
        </p>
      </div>

      <div className="absolute bottom-[8vh] left-[6.5vw] w-[53vw] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.25vw] pb-[2vh] pt-[1.1vw]">
        <div className="flex items-center justify-between border-b border-[#59443B] pb-[1.2vh]">
           <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.14em] text-[#D3A15F]">Lima fase</p>
           <p className="text-[1.5vw] font-bold uppercase tracking-[0.1em] text-[#E7D9C8]">Satu arah pertumbuhan</p>
        </div>

        <div className="relative mt-[2.3vh] grid grid-cols-5 gap-[0.8vw]">
          <div className="absolute left-[1.1vw] right-[1.1vw] top-[1.55vw] h-[0.16vw] bg-[#D3A15F]" />

          <div className="relative">
             <div className="relative z-10 flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full bg-[#D3A15F] text-[1.5vw] font-extrabold text-[#2A201D]">01</div>
             <p className="mt-[1.35vh] text-[1.5vw] font-extrabold uppercase tracking-[0.08em] text-[#D3A15F]">0—3 bln</p>
             <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.05]">Pilot</p>
             <p className="mt-[0.55vh] text-[1.8vw] leading-[1.08] text-[#E7D9C8]">Data minimum</p>
          </div>

          <div className="relative">
             <div className="relative z-10 flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full border-[0.12vw] border-[#D3A15F] bg-[#3A2B27] text-[1.5vw] font-extrabold text-[#D3A15F]">02</div>
             <p className="mt-[1.35vh] text-[1.5vw] font-extrabold uppercase tracking-[0.08em] text-[#D3A15F]">3—6 bln</p>
             <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.05]">Buktikan</p>
             <p className="mt-[0.55vh] text-[1.8vw] leading-[1.08] text-[#E7D9C8]">Mutu & jejak</p>
          </div>

          <div className="relative">
             <div className="relative z-10 flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full border-[0.12vw] border-[#D3A15F] bg-[#3A2B27] text-[1.5vw] font-extrabold text-[#D3A15F]">03</div>
             <p className="mt-[1.35vh] text-[1.5vw] font-extrabold uppercase tracking-[0.08em] text-[#D3A15F]">6—12 bln</p>
             <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.05]">Skala Garut</p>
             <p className="mt-[0.55vh] text-[1.8vw] leading-[1.08] text-[#E7D9C8]">Kelompok & mitra</p>
          </div>

          <div className="relative">
             <div className="relative z-10 flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full border-[0.12vw] border-[#D3A15F] bg-[#3A2B27] text-[1.5vw] font-extrabold text-[#D3A15F]">04</div>
             <p className="mt-[1.35vh] text-[1.5vw] font-extrabold uppercase tracking-[0.08em] text-[#D3A15F]">12—24 bln</p>
             <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.05]">Nasional</p>
             <p className="mt-[0.55vh] text-[1.8vw] leading-[1.08] text-[#E7D9C8]">Distribusi</p>
          </div>

          <div className="relative">
             <div className="relative z-10 flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full bg-[#A8543B] text-[1.5vw] font-extrabold text-[#FFF9F1]">05</div>
             <p className="mt-[1.35vh] text-[1.5vw] font-extrabold uppercase tracking-[0.08em] text-[#D3A15F]">24+ bln</p>
             <p className="mt-[0.65vh] text-[1.9vw] font-extrabold leading-[1.05]">Dunia</p>
             <p className="mt-[0.55vh] text-[1.8vw] leading-[1.08] text-[#E7D9C8]">Buyer & ekspor</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[24vw] text-[#2A201D]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Gerbang naik level</p>
        <p className="mt-[1.1vh] text-[1.8vw] font-semibold leading-[1.15] text-[#806E63]">Perluasan dilakukan setelah fondasi di level sebelumnya terbukti.</p>
        <div className="mt-[3.2vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[1.7vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.1em] text-[#A8543B]">Dari pilot ke Garut</p>
            <p className="mt-[0.55vh] text-[1.8vw] font-extrabold leading-[1.08]">Data dan alur kerja konsisten.</p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.7vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.1em] text-[#A8543B]">Dari Garut ke nasional</p>
            <p className="mt-[0.55vh] text-[1.8vw] font-extrabold leading-[1.08]">Mutu, volume, dan mitra siap.</p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[1.7vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.1em] text-[#A8543B]">Dari nasional ke dunia</p>
            <p className="mt-[0.55vh] text-[1.8vw] font-extrabold leading-[1.08]">Kepatuhan ekspor dan buyer siap.</p>
          </div>
          <div className="py-[1.7vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.1em] text-[#A8543B]">Ukuran keberhasilan</p>
            <p className="mt-[0.55vh] text-[1.8vw] font-extrabold leading-[1.08]">Review per fase, bukan sekadar target.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] border-t border-[#D8C7B5] pt-[1.2vh] text-[1.5vw] font-bold uppercase tracking-[0.1em] text-[#A8543B]">Fondasi dulu · skala kemudian</div>
    </div>
  );
}