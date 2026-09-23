import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide3Ecosystem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute left-0 top-0 h-full w-[21vw] bg-[#E7D9C8]" />
      <div className="absolute left-[40.6vw] top-[44vh] h-[0.16vw] w-[3.7vw] bg-[#D3A15F]/70" />
      <div className="absolute left-[40.1vw] top-[43.55vh] h-[0.9vw] w-[0.9vw] rounded-full border-[0.18vw] border-[#D3A15F] bg-[#F6F0E8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[46vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Pengguna utama</p>
        <h2 className="mt-[1.6vh] text-[4.5vw] font-extrabold leading-[1] tracking-[-0.075em]">
          <span className="block">Satu ekosistem,</span>
          <span className="text-[#A8543B]">empat kebutuhan.</span>
        </h2>
        <div className="mt-[3.2vh] h-[0.4vh] w-[7vw] bg-[#D3A15F]" />
        <p className="mt-[3.2vh] max-w-[35vw] text-[1.8vw] leading-[1.22] text-[#806E63]">
          Setiap pengguna datang dengan tujuan berbeda. Platform menyatukan tujuan itu tanpa menghilangkan konteks asalnya.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[15vh] w-[49vw]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.7vw]">
            <span className="h-[0.65vw] w-[0.65vw] rounded-full bg-[#D3A15F]" />
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.18em] text-[#A8543B]">Empat pintu masuk</p>
          </div>
          <p className="text-[1.5vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">01—04 · satu ekosistem</p>
        </div>

        <div className="mt-[2vh] grid grid-cols-2 gap-[1.1vw]">
          <div className="min-h-[21vh] border border-[#2A201D] bg-[#2A201D] p-[1.25vw] text-[#FFF9F1] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.12)]">
            <div className="flex items-start justify-between">
              <p className="text-[3vw] font-extrabold leading-none text-[#D3A15F]">01</p>
              <p className="pt-[0.4vh] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#E7D9C8]">Asal</p>
            </div>
            <p className="mt-[2.2vh] text-[1.8vw] font-extrabold leading-[1.05]">Petani & kelompok tani</p>
            <p className="mt-[1vh] text-[1.55vw] leading-[1.15] text-[#E7D9C8]">Profil, wilayah, produk, dan perkembangan kebun.</p>
          </div>

          <div className="min-h-[21vh] border border-[#C29451] bg-[#D3A15F] p-[1.25vw] text-[#2A201D] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.12)]">
            <div className="flex items-start justify-between">
              <p className="text-[3vw] font-extrabold leading-none text-[#A8543B]">02</p>
              <p className="pt-[0.4vh] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#2A201D]/70">Rasa</p>
            </div>
            <p className="mt-[2.2vh] text-[1.8vw] font-extrabold leading-[1.05]">Pembeli & penikmat kopi</p>
            <p className="mt-[1vh] text-[1.55vw] leading-[1.15] text-[#2A201D]/75">Pilihan yang sesuai, dengan asal dan proses yang dipahami.</p>
          </div>

          <div className="min-h-[21vh] border border-[#A8543B] bg-[#A8543B] p-[1.25vw] text-[#FFF9F1] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.12)]">
            <div className="flex items-start justify-between">
              <p className="text-[3vw] font-extrabold leading-none text-[#F6D9B6]">03</p>
              <p className="pt-[0.4vh] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#F6D9B6]">Tumbuh</p>
            </div>
            <p className="mt-[2.2vh] text-[1.8vw] font-extrabold leading-[1.05]">Mitra & pelaku usaha</p>
            <p className="mt-[1vh] text-[1.55vw] leading-[1.15] text-[#FFF9F1]/80">Peluang kolaborasi, kemitraan, dan produk baru.</p>
          </div>

          <div className="min-h-[21vh] border border-[#D8C7B5] bg-[#E7D9C8] p-[1.25vw] text-[#2A201D] shadow-[0.35vw_0.45vw_0_rgba(42,32,29,0.1)]">
            <div className="flex items-start justify-between">
              <p className="text-[3vw] font-extrabold leading-none text-[#A8543B]">04</p>
              <p className="pt-[0.4vh] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-[#806E63]">Arah</p>
            </div>
            <p className="mt-[2.2vh] text-[1.8vw] font-extrabold leading-[1.05]">Pengelola ekosistem</p>
            <p className="mt-[1vh] text-[1.55vw] leading-[1.15] text-[#806E63]">Data, program, laporan, dan umpan balik untuk bertindak.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[6vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[2vh] text-[1.7vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Informasi yang sama · keputusan yang lebih dekat
      </div>
    </div>
  );
}