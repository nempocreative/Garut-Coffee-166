import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide11Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[30vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[40vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">Arah pengembangan</p>
        <h2 className="mt-[2vh] max-w-[37vw] text-[5.15vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Data tumbuh.
          <span className="block text-[#A8543B]">Dampak ikut.</span>
        </h2>
        <p className="mt-[3.5vh] max-w-[34vw] text-[1.8vw] leading-[1.18] text-[#806E63]">
          Saat informasi terhubung, keputusan dan kolaborasi punya pijakan yang lebih jelas.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[37vw]">
        <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.22em] text-[#A8543B]">Tangga dampak</p>
        <div className="mt-[2.5vh] space-y-[1.25vh]">
          <div className="flex items-center gap-[1.2vw] bg-[#FFF9F1] px-[1.2vw] py-[1.5vh]">
            <span className="text-[2.2vw] font-extrabold text-[#A8543B]">01</span>
            <p className="text-[1.85vw] font-extrabold">Data semakin lengkap</p>
          </div>
          <div className="ml-[2vw] flex items-center gap-[1.2vw] bg-[#FFF9F1] px-[1.2vw] py-[1.5vh]">
            <span className="text-[2.2vw] font-extrabold text-[#A8543B]">02</span>
            <p className="text-[1.85vw] font-extrabold">Kepercayaan semakin kuat</p>
          </div>
          <div className="ml-[4vw] flex items-center gap-[1.2vw] bg-[#FFF9F1] px-[1.2vw] py-[1.5vh]">
            <span className="text-[2.2vw] font-extrabold text-[#A8543B]">03</span>
            <p className="text-[1.85vw] font-extrabold">Kolaborasi semakin terarah</p>
          </div>
          <div className="ml-[6vw] flex items-center gap-[1.2vw] bg-[#A8543B] px-[1.2vw] py-[1.5vh] text-[#FFF9F1]">
            <span className="text-[2.2vw] font-extrabold text-[#D3A15F]">04</span>
            <p className="text-[1.85vw] font-extrabold">Nilai kembali ke daerah</p>
          </div>
        </div>
      </div>
    </div>
  );
}