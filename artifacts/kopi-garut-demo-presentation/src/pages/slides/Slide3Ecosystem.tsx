import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide3Ecosystem() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute inset-y-0 left-0 w-[21vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <section className="absolute left-[6.5vw] top-[18vh] w-[29vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Pengguna utama</p>
        <h2 className="mt-[1.5vh] text-[4.5vw] font-extrabold leading-[0.96] tracking-[-0.075em]">
          <span className="block">Empat pintu,</span>
          <span className="text-[#A8543B]">satu ekosistem.</span>
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] bg-[#D3A15F]" />
        <p className="mt-[3vh] max-w-[25vw] text-[1.7vw] leading-[1.2] text-[#806E63]">Platform bertemu dengan pengguna melalui tujuan yang berbeda.</p>
        <p className="mt-[6vh] text-[1.15vw] font-extrabold uppercase tracking-[0.17em] text-[#A8543B]">Peta kebutuhan</p>
      </section>

      <section className="absolute right-[6.5vw] top-[16vh] h-[62vh] w-[52vw]">
        <div className="absolute left-[20vw] top-[20vh] h-[20vw] w-[20vw] rounded-full border border-[#D3A15F]/60" />
        <div className="absolute left-[24.5vw] top-[24.5vh] flex h-[11vw] w-[11vw] items-center justify-center rounded-full bg-[#2A201D] text-center text-[#FFF9F1] shadow-[0.55vw_0.65vw_0_rgba(42,32,29,0.12)]">
          <span className="text-[1.6vw] font-extrabold leading-[1.02]">Garut<br /><span className="text-[#D3A15F]">Beans</span></span>
        </div>
        <div className="absolute left-[6vw] top-[3vh] w-[18vw] border-t-[0.2vw] border-[#A8543B] pt-[1.2vh]">
          <div className="flex items-baseline justify-between"><span className="text-[2.6vw] font-extrabold text-[#A8543B]">01</span><span className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Asal</span></div>
          <p className="mt-[1vh] text-[1.7vw] font-extrabold">Petani & kelompok tani</p>
          <p className="mt-[0.7vh] text-[1.25vw] leading-[1.15] text-[#806E63]">Profil, wilayah, produk, dan perkembangan kebun.</p>
        </div>
        <div className="absolute right-0 top-[8vh] w-[18vw] border-t-[0.2vw] border-[#D3A15F] pt-[1.2vh]">
          <div className="flex items-baseline justify-between"><span className="text-[2.6vw] font-extrabold text-[#A8543B]">02</span><span className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Rasa</span></div>
          <p className="mt-[1vh] text-[1.7vw] font-extrabold">Pembeli & penikmat kopi</p>
          <p className="mt-[0.7vh] text-[1.25vw] leading-[1.15] text-[#806E63]">Pilihan dengan asal dan proses yang dipahami.</p>
        </div>
        <div className="absolute left-[3vw] bottom-[2vh] w-[18vw] border-t-[0.2vw] border-[#A8543B] pt-[1.2vh]">
          <div className="flex items-baseline justify-between"><span className="text-[2.6vw] font-extrabold text-[#A8543B]">03</span><span className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Tumbuh</span></div>
          <p className="mt-[1vh] text-[1.7vw] font-extrabold">Mitra & pelaku usaha</p>
          <p className="mt-[0.7vh] text-[1.25vw] leading-[1.15] text-[#806E63]">Peluang kolaborasi, kemitraan, dan produk baru.</p>
        </div>
        <div className="absolute right-[1vw] bottom-[7vh] w-[18vw] border-t-[0.2vw] border-[#D3A15F] pt-[1.2vh]">
          <div className="flex items-baseline justify-between"><span className="text-[2.6vw] font-extrabold text-[#A8543B]">04</span><span className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Arah</span></div>
          <p className="mt-[1vh] text-[1.7vw] font-extrabold">Pengelola ekosistem</p>
          <p className="mt-[0.7vh] text-[1.25vw] leading-[1.15] text-[#806E63]">Data, program, laporan, dan umpan balik.</p>
        </div>
      </section>
    </div>
  );
}