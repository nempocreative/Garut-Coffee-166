import logo from '@assets/kopi-garut-logo-presentation.png';

const base = import.meta.env.BASE_URL;

export default function Slide15Extension() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#A8543B] text-[#FFF9F1]">
      <div className="absolute -right-[10vw] -top-[13vw] h-[42vw] w-[42vw] rounded-full border-[0.12vw] border-[#D3A15F]/45" />
      <div className="absolute bottom-[-15vw] left-[-8vw] h-[35vw] w-[35vw] rounded-full border-[0.12vw] border-[#FFF9F1]/20" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" crossOrigin="anonymous" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#E7D9C8] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[19vh] w-[37vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Pendampingan lapangan</p>
        <h2 className="mt-[1.6vh] text-[4.7vw] font-extrabold leading-[0.99] tracking-[-0.075em]">
          <span className="block">Pendampingan</span>
          <span className="text-[#D3A15F]">yang terhubung.</span>
        </h2>
        <p className="mt-[3vh] max-w-[33vw] text-[2vw] leading-[1.2] text-[#F6E9DD]">
          Dashboard, program, dan ringkasan wilayah hadir dalam pengalaman mobile yang sama.
        </p>
      </div>

      <div className="absolute right-[8vw] top-[15vh] w-[22vw] rounded-[2.1vw] border-[0.45vw] border-[#2A201D] bg-[#2A201D] p-[0.45vw] shadow-[0.65vw_0.75vw_0_rgba(42,32,29,0.22)]">
        <div className="relative aspect-[402/874] w-full overflow-hidden rounded-[1.6vw] bg-[#F6F0E8]">
          <img src={`${base}demo-partnership.jpg`} alt="Cuplikan kemitraan Garut Beans G-Beans" crossOrigin="anonymous" className="h-full w-full object-cover object-top" />
          <div className="absolute left-1/2 top-0 z-10 h-[1.1vw] w-[5.3vw] -translate-x-1/2 rounded-b-[0.8vw] bg-[#2A201D]" />
        </div>
        <div className="absolute -left-[0.6vw] top-[8vw] h-[2.8vw] w-[0.2vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -left-[0.6vw] top-[12vw] h-[2.8vw] w-[0.2vw] rounded-l-full bg-[#2A201D]" />
        <div className="absolute -right-[0.6vw] top-[11vw] h-[4vw] w-[0.2vw] rounded-r-full bg-[#2A201D]" />
      </div>
      <div className="absolute left-[6.5vw] top-[59vh] w-[38vw] border-t border-[#D3A15F]/60 pt-[1.4vh]">
        <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.18em] text-[#D3A15F]">Ritme pendampingan</p>
        <div className="mt-[1.4vh] grid grid-cols-3 gap-[0.8vw]">
          <div className="border-t border-[#FFF9F1]/35 pt-[0.8vh]"><p className="text-[1.5vw] font-extrabold text-[#D3A15F]">01</p><p className="mt-[0.4vh] text-[1.45vw] font-bold">Kunjungan</p><p className="mt-[0.25vh] text-[1.2vw] text-[#F6E9DD]">Catatan lapangan</p></div>
          <div className="border-t border-[#FFF9F1]/35 pt-[0.8vh]"><p className="text-[1.5vw] font-extrabold text-[#D3A15F]">02</p><p className="mt-[0.4vh] text-[1.45vw] font-bold">Program</p><p className="mt-[0.25vh] text-[1.2vw] text-[#F6E9DD]">Rencana dukungan</p></div>
          <div className="border-t border-[#FFF9F1]/35 pt-[0.8vh]"><p className="text-[1.5vw] font-extrabold text-[#D3A15F]">03</p><p className="mt-[0.4vh] text-[1.45vw] font-bold">Review</p><p className="mt-[0.25vh] text-[1.2vw] text-[#F6E9DD]">Tindak lanjut</p></div>
        </div>
      </div>
    </div>
  );
}