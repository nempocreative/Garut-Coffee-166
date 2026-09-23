import closingImage from '@assets/generated_images/kopi-garut-promo-banner.jpg';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide8() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-y-0 right-0 w-[49vw] overflow-hidden">
        <img src={closingImage} crossOrigin="anonymous" alt="Garut Beans G-Beans dari lereng ke cangkir" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#F6F0E8_0%,rgba(246,240,232,0.52)_20%,rgba(42,32,29,0.08)_100%)]" />
      </div>
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[3vw] w-[3vw] rounded-[0.8vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.14vw]" />
         <div><p className="text-[1.5vw] font-extrabold tracking-[-0.05em]">Garut <span className="text-[#A8543B]">Beans</span></p><p className="mt-[0.25vw] text-[1.5vw] font-bold uppercase tracking-[0.2em] text-[#806E63]">G-BEANS · SPECIALTY COFFEE</p></div>
        <span className="ml-[0.6vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">34 / 34</span>
      </div>
      <div className="absolute left-[6.5vw] top-[27vh] w-[51vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Penutup demo</p>
        <h2 className="mt-[1.6vh] text-[5.05vw] font-extrabold leading-[0.98] tracking-[-0.08em]"><span className="block">Dari lereng</span><span className="text-[#A8543B]">ke cangkir.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] rounded-full bg-[#D3A15F]" />
         <p className="mt-[3vh] max-w-[35vw] text-[1.7vw] font-medium leading-[1.2] text-[#806E63]">Satu ruang untuk mengenal, menemukan, dan terhubung dengan Garut Beans G-Beans.</p>
        <p className="mt-[4.2vh] text-[1.7vw] font-extrabold text-[#A8543B]">Tumbuh bersama, dari kebun hingga pelanggan.</p>
      </div>
       <div className="absolute bottom-[6vh] left-[6.5vw] flex items-center gap-[1vw] text-[1.6vw] font-bold uppercase tracking-[0.14em] text-[#806E63]">
        <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-[#A8543B]" />
        Kopi · Petani · Wilayah · Mitra
      </div>
        <div className="absolute bottom-[6vh] right-[6.5vw] rounded-full bg-[#A8543B] px-[1.45vw] py-[0.95vh] text-[1.6vw] font-extrabold text-[#FFF9F1]">Garut Beans G-Beans</div>
    </div>
  );
}