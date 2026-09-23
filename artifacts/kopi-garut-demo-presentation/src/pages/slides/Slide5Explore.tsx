import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide5Explore() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-0 top-0 h-full w-[23vw] bg-[#A8543B]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">10 / 34</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[44vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Menu jelajah</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Lebih dari</span>
          <span className="text-[#D3A15F]">sekadar katalog.</span>
        </h2>
        <p className="mt-[3vh] max-w-[36vw] text-[1.9vw] leading-[1.2] text-[#E7D9C8]">
          Beranda menghubungkan pengguna ke enam pintu masuk yang memperlihatkan rasa, manusia, tempat, dan peluang di balik Garut Beans G-Beans.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[20vh] grid w-[48vw] grid-cols-2 gap-[0.7vw]">
        <div className="border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[1.05vw]"><p className="text-[1.6vw] font-bold text-[#D3A15F]">01 · PRODUK</p><p className="mt-[0.9vh] text-[2vw] font-extrabold">Kopi</p><p className="mt-[0.5vh] text-[1.65vw] leading-[1.12] text-[#E7D9C8]">Katalog dan produk turunan untuk kebutuhan sehari-hari.</p></div>
        <div className="border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[1.05vw]"><p className="text-[1.6vw] font-bold text-[#D3A15F]">02 · ASAL</p><p className="mt-[0.9vh] text-[2vw] font-extrabold">Petani · Wilayah</p><p className="mt-[0.5vh] text-[1.65vw] leading-[1.12] text-[#E7D9C8]">Profil pelaku dan karakter wilayah penghasil kopi.</p></div>
        <div className="border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[1.05vw]"><p className="text-[1.6vw] font-bold text-[#D3A15F]">03 · PENGALAMAN</p><p className="mt-[0.9vh] text-[2vw] font-extrabold">Wisata · Event</p><p className="mt-[0.5vh] text-[1.65vw] leading-[1.12] text-[#E7D9C8]">Agenda, festival, dan perjalanan rasa di Garut.</p></div>
        <div className="border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[1.05vw]"><p className="text-[1.6vw] font-bold text-[#D3A15F]">04 · KOLABORASI</p><p className="mt-[0.9vh] text-[2vw] font-extrabold">Mitra · Ekosistem</p><p className="mt-[0.5vh] text-[1.65vw] leading-[1.12] text-[#E7D9C8]">Peluang kemitraan dan peta hubungan antar pelaku.</p></div>
        <div className="border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[1.05vw]"><p className="text-[1.6vw] font-bold text-[#D3A15F]">05 · DUKUNGAN</p><p className="mt-[0.9vh] text-[2vw] font-extrabold">Program · Keluhan</p><p className="mt-[0.5vh] text-[1.65vw] leading-[1.12] text-[#E7D9C8]">Akses program, bantuan, dan kanal kebutuhan lapangan.</p></div>
        <div className="border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[1.05vw]"><p className="text-[1.6vw] font-bold text-[#D3A15F]">06 · NILAI TAMBAH</p><p className="mt-[0.9vh] text-[2vw] font-extrabold">Produk turunan</p><p className="mt-[0.5vh] text-[1.65vw] leading-[1.12] text-[#E7D9C8]">Ragam olahan yang memperluas nilai dari komoditas kopi.</p></div>
      </div>
    </div>
  );
}