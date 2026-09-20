import promoImage from '@assets/generated_images/kopi-garut-promo-banner-with-text.jpg';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide3() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#D3A15F]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">07 / 16</span>
      </div>
      <div className="absolute left-[6.5vw] top-[21vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Beranda · pintu masuk</p>
        <h2 className="mt-[1.7vh] text-[4.5vw] font-extrabold leading-[1.01] tracking-[-0.07em]"><span className="block">Mulai dari</span><span className="text-[#D3A15F]">beranda yang informatif.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#A8543B]" />
        <div className="mt-[4.2vh] space-y-[1.6vh] text-[1.7vw] font-medium leading-[1.2] text-[#E7D9C8]">
          <p><span className="mr-[0.8vw] text-[#D3A15F]">01</span> Menemukan produk dan cerita kopi dengan cepat</p>
          <p><span className="mr-[0.8vw] text-[#D3A15F]">02</span> Melihat highlight wilayah, petani, dan agenda</p>
          <p><span className="mr-[0.8vw] text-[#D3A15F]">03</span> Mengakses menu sesuai kebutuhan pengguna</p>
          <p><span className="mr-[0.8vw] text-[#D3A15F]">04</span> Berpindah dari inspirasi ke aksi tanpa kehilangan konteks</p>
        </div>
      </div>
      <div className="absolute right-[6.5vw] top-[14vh] h-[72vh] w-[42vw] rounded-[1.2vw] border border-[#D3A15F]/55 bg-[#A8543B] p-[0.65vw] shadow-[0.9vw_1vw_0_rgba(0,0,0,0.22)]">
        <div className="relative h-full w-full overflow-hidden rounded-[0.85vw]">
          <img src={promoImage} crossOrigin="anonymous" alt="Beranda Kopi Garut" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,32,29,0.04)_30%,rgba(42,32,29,0.78)_100%)]" />
          <div className="absolute bottom-[3vh] left-[2.2vw] right-[2.2vw]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.18em] text-[#D3A15F]">KOPI GARUT</p>
            <p className="mt-[0.8vh] text-[2vw] font-extrabold leading-tight">Temukan cerita di setiap pilihan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}