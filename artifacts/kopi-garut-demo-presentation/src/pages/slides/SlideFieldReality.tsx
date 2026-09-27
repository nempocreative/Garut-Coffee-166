import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideFieldReality() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[36vw] bg-[#F6F0E8]" />
      <div className="absolute right-[36vw] top-0 h-full w-[0.12vw] bg-[#D3A15F]" />
      <div className="absolute -bottom-[18vw] left-[27vw] h-[39vw] w-[39vw] rounded-full bg-[#A8543B]/10" />
      <div className="absolute bottom-[8vh] left-[31vw] h-[20vw] w-[20vw] rounded-full border-[0.12vw] border-[#D3A15F]/20" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] z-10 w-[49vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Masalah di lapangan</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Potensi besar,</span>
          <span className="text-[#D3A15F]">data belum satu.</span>
        </h2>
        <p className="mt-[3vh] max-w-[43vw] text-[2vw] leading-[1.18] text-[#E7D9C8]">
          Informasi asal, pelaku, produksi, dan pasar masih perlu disatukan agar keputusan dan cerita kopi Garut lebih mudah dipercaya.
        </p>
      </div>

      <div className="absolute bottom-[15vh] left-[6.5vw] z-10 grid w-[49vw] grid-cols-3 gap-[1vw]">
        <div className="h-[22vh] border-t-[0.25vw] border-[#A8543B] bg-[#3A2B27] px-[1.15vw] py-[1.1vw]">
           <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.12em] text-[#D3A15F]">Asal</p>
            <p className="mt-[1.45vh] text-[2vw] font-bold leading-[1.1]">Profil petani, kebun, dan lot tersebar.</p>
        </div>
        <div className="h-[22vh] border-t-[0.25vw] border-[#A8543B] bg-[#3A2B27] px-[1.15vw] py-[1.1vw]">
           <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.12em] text-[#D3A15F]">Keputusan</p>
            <p className="mt-[1.45vh] text-[2vw] font-bold leading-[1.1]">Harga dan pendampingan sulit dibaca bersama.</p>
        </div>
        <div className="h-[22vh] border-t-[0.25vw] border-[#A8543B] bg-[#3A2B27] px-[1.15vw] py-[1.1vw]">
           <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.12em] text-[#D3A15F]">Cerita</p>
            <p className="mt-[1.45vh] text-[2vw] font-bold leading-[1.1]">Asal dan kualitas belum terlihat pembeli.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] text-[#2A201D]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Snapshot data awal · demo</p>

        <div className="mt-[2.8vh] grid grid-cols-2 gap-[1.25vw] border-y border-[#D8C7B5] py-[2.5vh]">
          <div>
            <p className="text-[3.8vw] font-extrabold leading-none tracking-[-0.08em] text-[#A8543B]">125</p>
            <p className="mt-[0.8vh] text-[1.5vw] font-extrabold uppercase tracking-[0.09em] text-[#806E63]">Petani terdaftar</p>
          </div>
          <div>
            <p className="text-[3.8vw] font-extrabold leading-none tracking-[-0.08em] text-[#A8543B]">12</p>
            <p className="mt-[0.8vh] text-[1.5vw] font-extrabold uppercase tracking-[0.09em] text-[#806E63]">Wilayah aktif</p>
          </div>
        </div>

        <div className="mt-[3.2vh] border-l-[0.35vw] border-[#D3A15F] pl-[1.2vw]">
          <p className="text-[5vw] font-extrabold leading-none tracking-[-0.09em] text-[#A8543B]">312 <span className="text-[2.2vw] tracking-[-0.03em]">ton</span></p>
          <p className="mt-[0.8vh] text-[1.5vw] font-extrabold uppercase tracking-[0.1em] text-[#806E63]">Produksi tahunan</p>
        </div>
      </div>

    </div>
  );
}