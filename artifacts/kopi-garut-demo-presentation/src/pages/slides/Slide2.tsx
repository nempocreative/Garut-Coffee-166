import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide2() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[25vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[56vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Satu ruang untuk ekosistem</p>
        <h2 className="mt-[1.6vh] text-[4.4vw] font-extrabold leading-[1.02] tracking-[-0.065em]"><span className="block">Satu platform untuk</span><span className="text-[#A8543B]">ekosistem Garut Beans.</span></h2>
        <p className="mt-[2.3vh] max-w-[40vw] text-[1.7vw] leading-[1.25] text-[#806E63]">Dari informasi asal hingga peluang kolaborasi, semua bertemu dalam satu pengalaman.</p>
      </div>

      <div className="absolute bottom-[10vh] left-[6.5vw] right-[8vw] grid grid-cols-4 gap-[1vw]">
        <div className="h-[22vh] min-h-0 rounded-[0.8vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[1.25vw] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.08)]">
          <p className="text-[2.6vw] font-extrabold leading-none text-[#A8543B]">01</p>
          <p className="mt-[2.3vh] text-[1.6vw] font-bold leading-[1.15]">Mengenalkan kopi berdasarkan asal dan ceritanya</p>
        </div>
        <div className="h-[22vh] min-h-0 rounded-[0.8vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[1.25vw] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.08)]">
          <p className="text-[2.6vw] font-extrabold leading-none text-[#A8543B]">02</p>
          <p className="mt-[2.3vh] text-[1.6vw] font-bold leading-[1.15]">Membuka akses informasi bagi petani dan mitra</p>
        </div>
        <div className="h-[22vh] min-h-0 rounded-[0.8vw] border border-[#DFD1C1] bg-[#FFF9F1] p-[1.25vw] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.08)]">
          <p className="text-[2.6vw] font-extrabold leading-none text-[#A8543B]">03</p>
          <p className="mt-[2.3vh] text-[1.6vw] font-bold leading-[1.15]">Menyatukan Kopi, Petani, Wilayah, dan Wisata</p>
        </div>
        <div className="h-[22vh] min-h-0 rounded-[0.8vw] border border-[#DFD1C1] bg-[#A8543B] p-[1.25vw] text-[#FFF9F1] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.14)]">
          <p className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">04</p>
          <p className="mt-[2.3vh] text-[1.6vw] font-bold leading-[1.15]">Membuat setiap cerita lebih mudah ditelusuri</p>
        </div>
      </div>
    </div>
  );
}