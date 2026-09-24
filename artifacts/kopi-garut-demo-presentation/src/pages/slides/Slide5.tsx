import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide5() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#FFF9F1] text-[#2A201D]">
      <div className="absolute left-0 top-0 h-full w-[35vw] bg-[#A8543B]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#E7D9C8] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em] text-[#FFF9F1]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>
      <div className="absolute left-[6.5vw] top-[22vh] w-[26vw] text-[#FFF9F1]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Katalog · pilihan rasa</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]"><span className="block">Katalog yang</span><span className="text-[#D3A15F]">membawa cerita.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#FFF9F1]" />
         <p className="mt-[3.8vh] max-w-[23vw] text-[2vw] font-medium leading-[1.18] text-[#F6F0E8]">Pilihan produk yang tetap dekat dengan asal, karakter, dan detailnya.</p>
      </div>
      <div className="absolute right-[7vw] top-[15vh] flex w-[51vw] items-end gap-[1.4vw]">
        <div className="h-[56vh] w-[16vw] rotate-[-4deg] overflow-hidden rounded-[0.95vw] border-[0.4vw] border-[#E7D9C8] bg-[#D3A15F] shadow-[0.9vw_1vw_0_rgba(42,32,29,0.13)]">
           <img src={`${base}demo-catalog.jpg`} crossOrigin="anonymous" alt="Cuplikan katalog Garut Beans G-Beans" className="h-full w-full object-cover" />
        </div>
        <div className="mb-[1vh] w-[31vw] rounded-[0.8vw] border border-[#DFD1C1] bg-[#F6F0E8] p-[1.65vw]">
          <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.18em] text-[#A8543B]">Katalog produk</p>
          <p className="mt-[1.2vh] text-[2.25vw] font-extrabold leading-[1.03] tracking-[-0.05em]"><span className="block">Dari kebun,</span><span>untuk pilihanmu.</span></p>
             <div className="mt-[2vh] space-y-[1.05vh] border-t border-[#DFD1C1] pt-[1.8vh] text-[2vw] font-semibold leading-[1.08] text-[#806E63]">
            <p><span className="mr-[0.6vw] text-[#A8543B]">01</span> Lihat kopi dan produk turunan</p>
            <p><span className="mr-[0.6vw] text-[#A8543B]">02</span> Baca karakter, asal, dan detail</p>
            <p><span className="mr-[0.6vw] text-[#A8543B]">03</span> Simpan pilihan favorit</p>
            <p><span className="mr-[0.6vw] text-[#A8543B]">04</span> Lanjutkan ke pesanan</p>
          </div>
            <div className="mt-[2vh] inline-flex rounded-full bg-[#A8543B] px-[1.1vw] py-[0.7vh] text-[1.4vw] font-bold text-[#FFF9F1]">Kopi · Produk turunan</div>
        </div>
      </div>
    </div>
  );
}