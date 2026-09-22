import logo from '@assets/kopi-garut-logo-presentation.png';
import traceabilityScreen from '@assets/kopi-garut-live-traceability.jpg';
import cartScreen from '@assets/kopi-garut-live-cart.jpg';

export default function Slide16QualityReporting() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[25vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" crossOrigin="anonymous" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#A8543B]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">16 / 23</span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[37vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Mutu dan akuntabilitas</p>
        <h2 className="mt-[1.6vh] text-[4.7vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Mutu dan pelaporan</span>
          <span className="text-[#A8543B]">dalam satu alur.</span>
        </h2>
        <p className="mt-[3vh] max-w-[33vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Cuplikan aplikasi memperlihatkan bagaimana asal produk dan perjalanan pesanan tetap terbaca.
        </p>
        <div className="mt-[4vh] border-t border-[#D8C7B5] pt-[2vh] text-[1.7vw] font-bold text-[#A8543B]">Jejak produk → Pesanan</div>
      </div>

      <div className="absolute right-[18vw] top-[14vh] w-[16.5vw] rounded-[2.1vw] border-[0.45vw] border-[#2A201D] bg-[#2A201D] p-[0.45vw] shadow-[0.65vw_0.75vw_0_rgba(42,32,29,0.18)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.6vw] bg-[#F6F0E8]">
          <img src={traceabilityScreen} alt="Cuplikan traceability Kopi Garut" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.1vw] w-[5.3vw] -translate-x-1/2 rounded-b-[0.8vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.6vw] top-[8vw] h-[2.8vw] w-[0.2vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.6vw] top-[12vw] h-[2.8vw] w-[0.2vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.6vw] top-[11vw] h-[4vw] w-[0.2vw] rounded-r-full bg-[#2A201D]" />
      </div>
      <div className="absolute right-[6.5vw] top-[20vh] w-[16.5vw] rounded-[2.1vw] border-[0.45vw] border-[#2A201D] bg-[#2A201D] p-[0.45vw] shadow-[0.65vw_0.75vw_0_rgba(42,32,29,0.18)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.6vw] bg-[#F6F0E8]">
          <img src={cartScreen} alt="Cuplikan keranjang kopi Kopi Garut" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.1vw] w-[5.3vw] -translate-x-1/2 rounded-b-[0.8vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.6vw] top-[8vw] h-[2.8vw] w-[0.2vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.6vw] top-[12vw] h-[2.8vw] w-[0.2vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.6vw] top-[11vw] h-[4vw] w-[0.2vw] rounded-r-full bg-[#2A201D]" />
      </div>
      <div className="absolute right-[18vw] bottom-[7vh] text-center text-[1.5vw] font-bold text-[#A8543B]">Jejak produk</div>
      <div className="absolute right-[6.5vw] bottom-[3vh] text-center text-[1.5vw] font-bold text-[#A8543B]">Keranjang kopi</div>

      <div className="absolute bottom-[8vh] left-[6.5vw] right-[6.5vw] border-t border-[#D8C7B5] pt-[2vh] text-[1.5vw] font-bold text-[#A8543B]">
        Data bukan hanya disimpan — data dipakai untuk menjaga kepercayaan
      </div>
    </div>
  );
}