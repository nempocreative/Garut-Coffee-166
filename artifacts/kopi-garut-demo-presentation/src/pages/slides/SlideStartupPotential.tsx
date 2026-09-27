import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideStartupPotential() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[42vw] bg-[#2A201D]" />
      <div className="absolute right-[42vw] top-0 h-full w-[0.18vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[36vw]">
        <p className="text-[1.45vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">Potensi bersama</p>
        <h2 className="mt-[1.7vh] text-[4.65vw] font-extrabold leading-[0.91] tracking-[-0.09em]">
          Kalau saling
          <span className="block text-[#A8543B]">merangkul,</span>
          <span className="block">Garut bisa</span>
          <span className="block text-[#A8543B]">tumbuh besar.</span>
        </h2>
        <p className="mt-[3.2vh] max-w-[33vw] text-[1.85vw] font-medium leading-[1.18] text-[#806E63]">
          Bukan hanya sebagai daerah penghasil kopi, tetapi sebagai rumah bagi startup teknologi yang menghubungkan origin, data, pasar, dan manusia.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[30vw] text-[#FFF9F1]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Modal pertumbuhan</p>
        <div className="mt-[3vh] space-y-[2.5vh]">
          <div className="border-b border-[#806E63] pb-[2.5vh]">
            <div className="flex items-baseline gap-[1vw]">
              <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">01</span>
              <p className="text-[2vw] font-extrabold">Potensi origin</p>
            </div>
            <p className="mt-[1vh] pl-[3.6vw] text-[1.7vw] leading-[1.15] text-[#E7D9C8]">Wilayah, petani, dan cerita yang autentik menjadi keunggulan awal.</p>
          </div>
          <div className="border-b border-[#806E63] pb-[2.5vh]">
            <div className="flex items-baseline gap-[1vw]">
              <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">02</span>
              <p className="text-[2vw] font-extrabold">Teknologi yang menyatukan</p>
            </div>
            <p className="mt-[1vh] pl-[3.6vw] text-[1.7vw] leading-[1.15] text-[#E7D9C8]">Data dan pengalaman pasar bergerak dalam satu platform.</p>
          </div>
          <div>
            <div className="flex items-baseline gap-[1vw]">
              <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">03</span>
              <p className="text-[2vw] font-extrabold">Saling merangkul</p>
            </div>
            <p className="mt-[1vh] pl-[3.6vw] text-[1.7vw] leading-[1.15] text-[#E7D9C8]">Dinas, Nempo Kala Muda, dan pelaku ekosistem tumbuh dengan arah yang sama.</p>
          </div>
        </div>
      </div>
    </div>
  );
}