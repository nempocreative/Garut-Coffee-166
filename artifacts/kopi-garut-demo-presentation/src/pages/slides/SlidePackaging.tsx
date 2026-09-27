import logo from '@assets/kopi-garut-logo-presentation.png';
import cikuray from '@assets/ChatGPT_Image_Sep_20,_2026,_02_15_53_AM_1789872310968.png';
import papandayan from '@assets/ChatGPT_Image_Sep_20,_2026,_02_17_35_AM_1789872310994.png';
import kamojang from '@assets/ChatGPT_Image_Sep_20,_2026,_02_20_25_AM_1789872310995.png';

export default function SlidePackaging() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[4.5vw] bg-[#A8543B]" />
      <div className="absolute left-[34vw] top-[19vh] h-[48vh] w-[0.12vw] bg-[#806E63]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[25vw]">
        <p className="text-[1.45vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Kemasan origin</p>
        <h2 className="mt-[1.7vh] text-[4.45vw] font-extrabold leading-[0.94] tracking-[-0.08em]">
          Dari logo
          <span className="block text-[#D3A15F]">menjadi pengalaman produk.</span>
        </h2>
        <p className="mt-[3.2vh] max-w-[23vw] text-[1.9vw] font-medium leading-[1.18] text-[#E7D9C8]">
          Satu identitas untuk seluruh lini, dengan ruang bagi setiap wilayah Garut untuk membawa cerita dan suasananya sendiri.
        </p>
      </div>

      <div className="absolute left-[37vw] right-[7.2vw] top-[20vh] grid grid-cols-3 gap-[1.15vw]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[1.25vw] border border-[#806E63] bg-[#E7D9C8] shadow-[0.45vw_0.55vw_0_rgba(0,0,0,0.18)]">
            <img src={cikuray} crossOrigin="anonymous" alt="Contoh kemasan Garut Beans Cikuray Series" className="h-[30vh] w-full object-cover" />
          </div>
          <p className="mt-[1.4vh] text-[1.45vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">01 · Cikuray</p>
          <p className="mt-[0.45vh] text-[1.8vw] font-extrabold">Cikuray Series</p>
          <p className="mt-[0.5vh] text-[1.5vw] leading-[1.15] text-[#E7D9C8]">Nuansa budaya, lanskap, dan karakter Garut dalam satu kemasan.</p>
        </div>
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[1.25vw] border border-[#806E63] bg-[#E7D9C8] shadow-[0.45vw_0.55vw_0_rgba(0,0,0,0.18)]">
            <img src={papandayan} crossOrigin="anonymous" alt="Contoh kemasan Garut Beans Papandayan Series" className="h-[30vh] w-full object-cover" />
          </div>
          <p className="mt-[1.4vh] text-[1.45vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">02 · Papandayan</p>
          <p className="mt-[0.45vh] text-[1.8vw] font-extrabold">Papandayan Series</p>
          <p className="mt-[0.5vh] text-[1.5vw] leading-[1.15] text-[#E7D9C8]">Ketinggian, petualangan, dan panorama menjadi bagian dari cerita.</p>
        </div>
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[1.25vw] border border-[#806E63] bg-[#E7D9C8] shadow-[0.45vw_0.55vw_0_rgba(0,0,0,0.18)]">
            <img src={kamojang} crossOrigin="anonymous" alt="Contoh kemasan Garut Beans Kamojang Series" className="h-[30vh] w-full object-cover" />
          </div>
          <p className="mt-[1.4vh] text-[1.45vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">03 · Kamojang</p>
          <p className="mt-[0.45vh] text-[1.8vw] font-extrabold">Kamojang Series</p>
          <p className="mt-[0.5vh] text-[1.5vw] leading-[1.15] text-[#E7D9C8]">Alam, pengalaman, dan kehangatan lokal hadir di titik pembelian.</p>
        </div>
      </div>
    </div>
  );
}