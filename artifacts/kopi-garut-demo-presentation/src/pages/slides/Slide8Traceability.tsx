import traceabilityImage from '@assets/generated_images/traceability-menu-ai.png';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide8Traceability() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#D3A15F]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">10 / 23</span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Traceability</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Dari lot panen</span>
          <span className="text-[#D3A15F]">ke pilihan pelanggan.</span>
        </h2>
        <p className="mt-[3vh] max-w-[38vw] text-[1.9vw] leading-[1.2] text-[#E7D9C8]">
          Setiap produk dapat dibaca melalui rangkaian informasi yang menjelaskan siapa, dari mana, dan bagaimana kopi diproses.
        </p>
      </div>

       <div className="absolute left-[6.5vw] bottom-[8vh] w-[43vw]">
        <div className="flex items-center gap-[0.7vw]">
          <div className="h-[4.6vw] w-[4.6vw] rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-center text-[1.75vw] font-extrabold leading-[4.2vw]">01</div>
          <div className="h-[0.18vw] w-[4vw] bg-[#D3A15F]" />
          <div className="h-[4.6vw] w-[4.6vw] rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-center text-[1.75vw] font-extrabold leading-[4.2vw]">02</div>
          <div className="h-[0.18vw] w-[4vw] bg-[#D3A15F]" />
          <div className="h-[4.6vw] w-[4.6vw] rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-center text-[1.75vw] font-extrabold leading-[4.2vw]">03</div>
          <div className="h-[0.18vw] w-[4vw] bg-[#D3A15F]" />
          <div className="h-[4.6vw] w-[4.6vw] rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-center text-[1.75vw] font-extrabold leading-[4.2vw]">04</div>
        </div>
        <div className="mt-[1.3vh] grid grid-cols-4 gap-[0.8vw] text-[1.6vw] font-bold leading-[1.1] text-[#E7D9C8]">
          <p>Wilayah</p><p>Petani</p><p>Proses</p><p>Produk</p>
        </div>
      </div>

      <div className="absolute right-[5.5vw] top-[14vh] h-[62vh] w-[29vw] rotate-[2deg] rounded-[1vw] border-[0.32vw] border-[#D3A15F] bg-[#E7D9C8] p-[0.55vw] shadow-[0.8vw_0.9vw_0_rgba(0,0,0,0.2)]">
        <img src={traceabilityImage} crossOrigin="anonymous" alt="Tampilan traceability Kopi Garut" className="h-full w-full rounded-[0.58vw] object-cover" />
      </div>
    </div>
  );
}