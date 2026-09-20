import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide2Context() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#A8543B]" />
      <div className="absolute right-[7vw] top-[16vh] h-[29vw] w-[29vw] rounded-full border-[0.12vw] border-[#D3A15F]/60" />
      <div className="absolute right-[11vw] bottom-[12vh] h-[12vw] w-[12vw] rounded-full border-[0.12vw] border-[#FFF9F1]/25" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#D3A15F]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">02 / 12</span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[52vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Konteks ekosistem</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Potensi besar,</span>
          <span className="text-[#D3A15F]">cerita yang tersebar.</span>
        </h2>
        <p className="mt-[3vh] max-w-[42vw] text-[2vw] leading-[1.2] text-[#E7D9C8]">
          Kopi Garut memiliki asal, pelaku, produk, dan pengalaman yang beragam. Informasi itu perlu hadir dalam satu alur yang mudah dipahami.
        </p>
      </div>

      <div className="absolute bottom-[10vh] left-[6.5vw] grid w-[55vw] grid-cols-3 gap-[1vw]">
        <div className="border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] p-[1.35vw]">
          <p className="text-[2.5vw] font-extrabold text-[#D3A15F]">01</p>
          <p className="mt-[2.2vh] text-[1.55vw] font-bold leading-[1.15]">Asal dan kualitas belum selalu terlihat oleh pembeli.</p>
        </div>
        <div className="border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] p-[1.35vw]">
          <p className="text-[2.5vw] font-extrabold text-[#D3A15F]">02</p>
          <p className="mt-[2.2vh] text-[1.55vw] font-bold leading-[1.15]">Petani dan mitra membutuhkan akses informasi yang sama.</p>
        </div>
        <div className="border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] p-[1.35vw]">
          <p className="text-[2.5vw] font-extrabold text-[#D3A15F]">03</p>
          <p className="mt-[2.2vh] text-[1.55vw] font-bold leading-[1.15]">Data yang rapi membuat keputusan lebih terarah.</p>
        </div>
      </div>
    </div>
  );
}