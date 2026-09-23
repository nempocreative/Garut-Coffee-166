import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide17Branding() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[27vw] bg-[#A8543B]" />
      <div className="absolute right-[7vw] top-[15vh] h-[29vw] w-[29vw] rounded-full border-[0.12vw] border-[#D3A15F]/60" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">25 / 27</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[44vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Strategi identitas</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Garut Beans G-Beans</span>
          <span className="text-[#D3A15F]">sebagai origin signature.</span>
        </h2>
        <p className="mt-[3vh] max-w-[37vw] text-[1.9vw] leading-[1.2] text-[#E7D9C8]">
          Logikanya seperti nama kopi berbasis asal: daerah menjadi penanda cerita dan kualitas. Setiap coffee shop tetap memakai mereknya sendiri, dengan Garut Beans G-Beans sebagai identitas asal yang tampil di menu.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[20vh] w-[43vw] space-y-[1.35vh]">
         <div className="flex gap-[1.2vw] border-b border-[#806E63] pb-[1.4vh]"><span className="text-[2.6vw] font-extrabold text-[#D3A15F]">01</span><div><p className="text-[2vw] font-extrabold">Nama outlet tetap kuat</p><p className="mt-[0.5vh] text-[1.75vw] leading-[1.15] text-[#E7D9C8]">Bukan mengganti brand coffee shop. Garut Beans G-Beans hadir sebagai pilihan origin atau menu khas.</p></div></div>
         <div className="flex gap-[1.2vw] border-b border-[#806E63] pb-[1.4vh]"><span className="text-[2.6vw] font-extrabold text-[#D3A15F]">02</span><div><p className="text-[2vw] font-extrabold">Format nama yang konsisten</p><p className="mt-[0.5vh] text-[1.75vw] leading-[1.15] text-[#E7D9C8]">Contoh: “Garut Beans G-Beans · Cikuray · Honey” atau “Garut Beans G-Beans · House Pour Over”.</p></div></div>
         <div className="flex gap-[1.2vw] border-b border-[#806E63] pb-[1.4vh]"><span className="text-[2.6vw] font-extrabold text-[#D3A15F]">03</span><div><p className="text-[2vw] font-extrabold">Tanda asal yang mudah dikenali</p><p className="mt-[0.5vh] text-[1.75vw] leading-[1.15] text-[#E7D9C8]">Badge partner, kartu cerita di meja, materi barista, dan QR menuju profil asal.</p></div></div>
         <div className="flex gap-[1.2vw]"><span className="text-[2.6vw] font-extrabold text-[#D3A15F]">04</span><div><p className="text-[2vw] font-extrabold">Standar menjaga kepercayaan</p><p className="mt-[0.5vh] text-[1.75vw] leading-[1.15] text-[#E7D9C8]">Identitas bersama harus didukung data lot, mutu, dan pasokan yang dapat ditelusuri.</p></div></div>
      </div>

       <div className="absolute bottom-[8vh] left-[6.5vw] text-[1.7vw] font-bold uppercase tracking-[0.16em] text-[#D3A15F]">Satu asal · banyak interpretasi · identitas yang sama</div>
    </div>
  );
}