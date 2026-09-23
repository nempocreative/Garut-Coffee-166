import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide7() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#A8543B] text-[#FFF9F1]">
      <div className="absolute -right-[10vw] -top-[13vw] h-[42vw] w-[42vw] rounded-full border-[0.12vw] border-[#D3A15F]/45" />
      <div className="absolute bottom-[-15vw] left-[-8vw] h-[35vw] w-[35vw] rounded-full border-[0.12vw] border-[#FFF9F1]/20" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#E7D9C8] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>
      <div className="absolute left-[6.5vw] top-[19vh] w-[48vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Tumbuh bersama</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[1] tracking-[-0.075em]"><span className="block">Dari koneksi</span><span className="text-[#D3A15F]">menjadi kolaborasi.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#FFF9F1]" />
      </div>
      <div className="absolute bottom-[11vh] left-[6.5vw] right-[6.5vw] grid grid-cols-4 gap-[1vw]">
        <div className="min-h-[22vh] rounded-[0.8vw] border-t-[0.22vw] border-[#D3A15F] bg-[#8F4433]/55 p-[1.35vw]"><p className="text-[2.35vw] font-extrabold text-[#D3A15F]">01</p><p className="mt-[2.2vh] text-[1.7vw] font-bold leading-[1.15]">Temukan peluang kemitraan yang relevan</p></div>
        <div className="min-h-[22vh] rounded-[0.8vw] border-t-[0.22vw] border-[#D3A15F] bg-[#8F4433]/55 p-[1.35vw]"><p className="text-[2.35vw] font-extrabold text-[#D3A15F]">02</p><p className="mt-[2.2vh] text-[1.7vw] font-bold leading-[1.15]">Ikuti program dan agenda ekosistem</p></div>
        <div className="min-h-[22vh] rounded-[0.8vw] border-t-[0.22vw] border-[#D3A15F] bg-[#8F4433]/55 p-[1.35vw]"><p className="text-[2.35vw] font-extrabold text-[#D3A15F]">03</p><p className="mt-[2.2vh] text-[1.7vw] font-bold leading-[1.15]">Sampaikan pertanyaan atau keluhan</p></div>
        <div className="min-h-[22vh] rounded-[0.8vw] border-t-[0.22vw] border-[#D3A15F] bg-[#8F4433]/55 p-[1.35vw]"><p className="text-[2.35vw] font-extrabold text-[#D3A15F]">04</p><p className="mt-[2.2vh] text-[1.7vw] font-bold leading-[1.15]">Dorong pertumbuhan bersama secara terarah</p></div>
      </div>
      <div className="absolute right-[6.5vw] top-[11vh] rounded-full border border-[#D3A15F]/70 bg-[#8F4433] px-[1.25vw] py-[0.9vh] text-[1.5vw] font-bold text-[#D3A15F]">Jadi mitra</div>
    </div>
  );
}