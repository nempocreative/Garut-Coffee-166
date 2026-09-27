import promoImage from '@assets/generated_images/kopi-garut-promo-banner-with-text.jpg';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide3() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>
      <div className="absolute left-[6.5vw] top-[21vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Beranda · pintu masuk</p>
        <h2 className="mt-[1.7vh] text-[4.5vw] font-extrabold leading-[1.01] tracking-[-0.07em]"><span className="block">Mulai dari</span><span className="text-[#D3A15F]">beranda yang informatif.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#A8543B]" />
        <div className="mt-[4.2vh] max-w-[39vw] text-[2vw] font-medium leading-[1.16] text-[#E7D9C8]">
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-t border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">01</span>
            <span>Menemukan produk dan cerita kopi dengan cepat</span>
          </div>
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-t border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">02</span>
            <span>Melihat highlight wilayah, petani, dan agenda</span>
          </div>
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-t border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">03</span>
            <span>Mengakses menu sesuai kebutuhan pengguna</span>
          </div>
          <div className="grid grid-cols-[3.3vw_1fr] gap-x-[0.55vw] border-y border-[#806E63]/55 py-[1.35vh]">
            <span className="font-bold text-[#D3A15F]">04</span>
            <span>Berpindah dari inspirasi ke aksi tanpa kehilangan konteks</span>
          </div>
        </div>
      </div>
      <div className="absolute right-[6.5vw] top-[14vh] h-[72vh] w-[42vw] rounded-[1.2vw] border border-[#D3A15F]/55 bg-[#A8543B] p-[0.65vw] shadow-[0.9vw_1vw_0_rgba(0,0,0,0.22)]">
        <div className="relative h-full w-full overflow-hidden rounded-[0.85vw]">
          <img src={promoImage} crossOrigin="anonymous" alt="Beranda Garut Beans G-Beans" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}