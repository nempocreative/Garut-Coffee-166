import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideGovernmentSynergy() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[43vw] bg-[#2A201D]" />
      <div className="absolute right-[43vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[44vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">Permohonan kolaborasi / 06</p>
        <h2 className="mt-[2vh] text-[5vw] font-extrabold leading-[0.9] tracking-[-0.08em]">
          <span className="block">Dua kekuatan.</span>
          <span className="text-[#A8543B]">Satu arah.</span>
        </h2>
        <p className="mt-[4vh] max-w-[38vw] text-[1.85vw] leading-[1.18] text-[#806E63]">
          Dinas membuka jalan. Tim platform membawa cerita dan pasar.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[59vh] w-[49vw] border-t-[0.18vw] border-[#A8543B] pt-[1.5vh]">
        <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Persamaan kerja</p>
        <div className="mt-[1.8vh] flex items-center gap-[1.2vw]">
          <div className="w-[18vw]">
            <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Dinas Pertanian</p>
            <p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Akses & koordinasi</p>
          </div>
          <span className="text-[2.8vw] font-extrabold text-[#D3A15F]">+</span>
          <div className="w-[18vw]">
            <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">Nempo × Kala Muda</p>
            <p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Cerita & pasar</p>
          </div>
          <span className="text-[2.8vw] font-extrabold text-[#D3A15F]">=</span>
          <p className="w-[11vw] text-[1.65vw] font-extrabold leading-[1.05]">Origin Garut yang bernilai.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[30vw] text-[#FFF9F1]">
        <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.24em] text-[#D3A15F]">Hasil bersama</p>
        <div className="mt-[3vh] space-y-[2.5vh]">
          <div className="flex items-baseline gap-[1vw] border-b border-[#806E63] pb-[2vh]">
            <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">01</span>
            <p className="text-[2vw] font-extrabold leading-[1.05]">Dikenal</p>
          </div>
          <div className="flex items-baseline gap-[1vw] border-b border-[#806E63] pb-[2vh]">
            <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">02</span>
            <p className="text-[2vw] font-extrabold leading-[1.05]">Bernilai bagi petani dan daerah</p>
          </div>
          <div className="flex items-baseline gap-[1vw]">
            <span className="text-[2.6vw] font-extrabold leading-none text-[#D3A15F]">03</span>
            <p className="text-[2vw] font-extrabold leading-[1.05]">Tumbuh bersama</p>
          </div>
        </div>
      </div>
    </div>
  );
}