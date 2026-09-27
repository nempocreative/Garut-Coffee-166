import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideWhyTogether() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[41vw] bg-[#2A201D]" />
      <div className="absolute right-[41vw] top-0 h-full w-[0.18vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} crossOrigin="anonymous" alt="Logo Garut Beans G-Beans" className="h-[2.8vw] w-[2.8vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>
      <div className="absolute left-[6.5vw] top-[18vh] w-[36vw]">
        <p className="text-[1.45vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">Alasan kolaborasi</p>
        <h2 className="mt-[1.7vh] text-[5vw] font-extrabold leading-[0.9] tracking-[-0.09em]">
          Satu visi
          <span className="block text-[#A8543B]">perlu dua kekuatan.</span>
        </h2>
        <p className="mt-[3.5vh] max-w-[33vw] text-[1.9vw] font-medium leading-[1.18] text-[#806E63]">
          Dinas memahami ekosistem dan mandat pembangunan. Nempo Kala Muda membawa kemampuan merancang produk digital, cerita, dan pengalaman pasar.
        </p>
        <div className="mt-[4vh] border-l-[0.2vw] border-[#D3A15F] pl-[1.1vw]">
          <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Hasil yang dituju</p>
          <p className="mt-[0.7vh] text-[1.8vw] font-extrabold leading-[1.08]">Platform yang menjadi infrastruktur origin Garut.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[29vw] text-[#FFF9F1]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Pembagian kekuatan</p>
        <div className="mt-[3vh] space-y-[2.4vh]">
          <div className="border-b border-[#806E63] pb-[2.4vh]">
            <div className="flex items-baseline gap-[1vw]">
              <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">01</span>
              <p className="text-[2vw] font-extrabold">Dinas Pertanian Kab. Garut</p>
            </div>
            <p className="mt-[1vh] pl-[3.6vw] text-[1.7vw] leading-[1.15] text-[#E7D9C8]">Akses, koordinasi, konteks daerah, dan kepercayaan lintas pelaku.</p>
          </div>
          <div className="border-b border-[#806E63] pb-[2.4vh]">
            <div className="flex items-baseline gap-[1vw]">
              <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">02</span>
              <p className="text-[2vw] font-extrabold">Nempo Kala Muda</p>
            </div>
            <p className="mt-[1vh] pl-[3.6vw] text-[1.7vw] leading-[1.15] text-[#E7D9C8]">Produk digital, pengemasan cerita, dan pengalaman yang bisa dipakai pasar.</p>
          </div>
          <div>
            <div className="flex items-baseline gap-[1vw]">
              <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">03</span>
              <p className="text-[2vw] font-extrabold">Dikembangkan bersama</p>
            </div>
            <p className="mt-[1vh] pl-[3.6vw] text-[1.7vw] leading-[1.15] text-[#E7D9C8]">Data, kualitas, pasar, dan dampak bergerak dalam satu arah.</p>
          </div>
        </div>
      </div>

    </div>
  );
}