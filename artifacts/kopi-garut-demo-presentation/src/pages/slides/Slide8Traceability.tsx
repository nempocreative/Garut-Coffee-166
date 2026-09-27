import traceabilityImage from '@assets/generated_images/traceability-menu-ai.png';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide8Traceability() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Traceability</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Dari lot panen</span>
          <span className="text-[#D3A15F]">ke pilihan pelanggan.</span>
        </h2>
        <p className="mt-[3vh] max-w-[38vw] text-[2vw] leading-[1.18] text-[#E7D9C8]">
          Setiap lot punya cerita: wilayah, petani, proses, lalu produk.
        </p>
      </div>

       <div className="absolute left-[6.5vw] bottom-[15vh] w-[43vw]">
        <div className="flex items-center justify-between gap-[0.55vw]">
          <div className="flex h-[4.2vw] w-[4.2vw] shrink-0 items-center justify-center rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-[1.7vw] font-extrabold">01</div>
          <div className="h-[0.18vw] min-w-0 flex-1 bg-[#D3A15F]" />
          <div className="flex h-[4.2vw] w-[4.2vw] shrink-0 items-center justify-center rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-[1.7vw] font-extrabold">02</div>
          <div className="h-[0.18vw] min-w-0 flex-1 bg-[#D3A15F]" />
          <div className="flex h-[4.2vw] w-[4.2vw] shrink-0 items-center justify-center rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-[1.7vw] font-extrabold">03</div>
          <div className="h-[0.18vw] min-w-0 flex-1 bg-[#D3A15F]" />
          <div className="flex h-[4.2vw] w-[4.2vw] shrink-0 items-center justify-center rounded-full border-[0.2vw] border-[#D3A15F] bg-[#3A2B27] text-[1.7vw] font-extrabold">04</div>
        </div>
        <div className="mt-[1.3vh] grid grid-cols-4 gap-[0.8vw] text-[1.7vw] font-bold leading-[1.1] text-[#E7D9C8]">
          <p>Wilayah</p><p>Petani</p><p>Proses</p><p>Produk</p>
        </div>
      </div>

      <div className="absolute right-[5.5vw] top-[14vh] h-[62vh] w-[29vw] rotate-[2deg] rounded-[1vw] border-[0.32vw] border-[#D3A15F] bg-[#E7D9C8] p-[0.55vw] shadow-[0.8vw_0.9vw_0_rgba(0,0,0,0.2)]">
        <img src={traceabilityImage} crossOrigin="anonymous" alt="Tampilan traceability Garut Beans G-Beans" className="h-full w-full rounded-[0.58vw] object-cover" />
      </div>
    </div>
  );
}