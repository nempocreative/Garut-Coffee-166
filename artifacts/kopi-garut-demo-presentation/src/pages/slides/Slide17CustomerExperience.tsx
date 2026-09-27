import logo from '@assets/kopi-garut-logo-presentation.png';
import diversificationScreen from '@assets/kopi-garut-live-diversification.jpg';
import tourismScreen from '@assets/kopi-garut-live-tourism.jpg';

export default function Slide17CustomerExperience() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#A8543B] text-[#FFF9F1]">
      <div className="absolute right-[-11vw] top-[-12vw] h-[40vw] w-[40vw] rounded-full border-[0.12vw] border-[#D3A15F]/45" />
      <div className="absolute left-[-12vw] bottom-[-16vw] h-[39vw] w-[39vw] rounded-full border-[0.12vw] border-[#FFF9F1]/20" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" crossOrigin="anonymous" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#E7D9C8] bg-[#FFF9F1] object-contain p-[0.12vw]" />
         <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[37vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Pengalaman pengguna</p>
        <h2 className="mt-[1.6vh] text-[4.65vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Pengalaman pelanggan</span>
          <span className="text-[#D3A15F]">lebih lengkap.</span>
        </h2>
        <p className="mt-[3vh] max-w-[33vw] text-[2vw] leading-[1.2] text-[#F6E9DD]">
          Dari produk yang dibeli sampai pengalaman yang dibagikan.
        </p>
        <div className="mt-[4vh] border-t border-[#D3A15F]/60 pt-[2vh] text-[2vw] font-bold text-[#D3A15F]">Beli · kunjungi · bagikan</div>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] grid h-[53vh] w-[43vw] grid-cols-2 grid-rows-2 gap-[1vw]">
        <div className="relative overflow-hidden rounded-[0.9vw] border border-[#2A201D] bg-[#2A201D]">
          <img src={diversificationScreen} alt="Cuplikan produk turunan Garut Beans G-Beans" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 bg-[#2A201D]/85 px-[1vw] py-[1vh] text-[1.55vw] font-bold text-[#FFF9F1]">Produk turunan</div>
        </div>
        <div className="flex flex-col justify-end rounded-[0.9vw] bg-[#F6E9DD] p-[1.2vw] text-[#2A201D]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.12em] text-[#A8543B]">02 · Pesanan</p>
          <p className="mt-[1vh] text-[2vw] font-extrabold leading-[1.02]">Dari favorit ke checkout.</p>
        </div>
        <div className="relative overflow-hidden rounded-[0.9vw] border border-[#2A201D] bg-[#2A201D]">
          <img src={tourismScreen} alt="Cuplikan wisata kopi Garut Beans G-Beans" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 bg-[#2A201D]/85 px-[1vw] py-[1vh] text-[1.55vw] font-bold text-[#FFF9F1]">Wisata kopi</div>
        </div>
        <div className="flex flex-col justify-end rounded-[0.9vw] bg-[#D3A15F] p-[1.2vw] text-[#2A201D]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.12em] text-[#A8543B]">04 · Kunjungan</p>
          <p className="mt-[1vh] text-[2vw] font-extrabold leading-[1.02]">Cerita asal jadi pengalaman.</p>
        </div>
      </div>
    </div>
  );
}