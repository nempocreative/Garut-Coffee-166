import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide5Explore() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute left-0 top-0 h-full w-[26vw] bg-[#A8543B]" />
      <div className="absolute left-[24.5vw] top-0 h-full w-[0.12vw] bg-[#D3A15F]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[38vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Menu jelajah</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Lebih dari</span>
          <span className="text-[#D3A15F]">sekadar katalog.</span>
        </h2>
        <p className="mt-[3vh] max-w-[32vw] text-[1.9vw] leading-[1.2] text-[#E7D9C8]">
          Beranda menghubungkan pengguna ke enam pintu masuk: rasa, manusia, tempat, dan peluang di balik Garut Beans G-Beans.
        </p>
        <div className="absolute top-[49vh] left-0 border-t border-[#D3A15F] pt-[2vh]">
          <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.18em] text-[#E7D9C8]">Dari rasa menuju ekosistem</p>
          <p className="mt-[1vh] text-[1.7vw] font-extrabold text-[#FFF9F1]">Temukan · Pahami · Terlibat</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[13vh] w-[48vw]">
        <div className="mb-[2.4vh] flex items-center justify-between border-b border-[#59443B] pb-[1.5vh]">
          <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.18em] text-[#D3A15F]">Enam pintu masuk</p>
          <span className="text-[1.35vw] font-bold text-[#E7D9C8]">JELAJAH / 01—06</span>
        </div>

        <div className="grid grid-cols-2 gap-[0.8vw]">
          <div className="relative min-h-[16vh] border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[0.9vw]">
            <span className="absolute right-[0.9vw] top-[0.45vh] text-[3.6vw] font-extrabold leading-none text-[#493630]">01</span>
            <p className="relative text-[1.4vw] font-bold text-[#D3A15F]">01 · PRODUK</p>
            <p className="relative mt-[0.7vh] text-[2vw] font-extrabold">Kopi</p>
            <p className="relative mt-[0.55vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Katalog kopi dan produk turunan untuk kebutuhan sehari-hari.</p>
          </div>
          <div className="relative min-h-[16vh] border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[0.9vw]">
            <span className="absolute right-[0.9vw] top-[0.45vh] text-[3.6vw] font-extrabold leading-none text-[#493630]">02</span>
            <p className="relative text-[1.4vw] font-bold text-[#D3A15F]">02 · ASAL</p>
            <p className="relative mt-[0.7vh] text-[2vw] font-extrabold">Petani · Wilayah</p>
            <p className="relative mt-[0.55vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Profil petani dan karakter wilayah penghasil kopi.</p>
          </div>
          <div className="relative min-h-[16vh] border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[0.9vw]">
            <span className="absolute right-[0.9vw] top-[0.45vh] text-[3.6vw] font-extrabold leading-none text-[#493630]">03</span>
            <p className="relative text-[1.4vw] font-bold text-[#D3A15F]">03 · PENGALAMAN</p>
            <p className="relative mt-[0.7vh] text-[2vw] font-extrabold">Wisata · Event</p>
            <p className="relative mt-[0.55vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Agenda, festival, dan perjalanan rasa di Garut.</p>
          </div>
          <div className="relative min-h-[16vh] border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[0.9vw]">
            <span className="absolute right-[0.9vw] top-[0.45vh] text-[3.6vw] font-extrabold leading-none text-[#493630]">04</span>
            <p className="relative text-[1.4vw] font-bold text-[#D3A15F]">04 · KOLABORASI</p>
            <p className="relative mt-[0.7vh] text-[2vw] font-extrabold">Mitra · Ekosistem</p>
            <p className="relative mt-[0.55vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Peluang kemitraan dan hubungan antar pelaku.</p>
          </div>
          <div className="relative min-h-[16vh] border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[0.9vw]">
            <span className="absolute right-[0.9vw] top-[0.45vh] text-[3.6vw] font-extrabold leading-none text-[#493630]">05</span>
            <p className="relative text-[1.4vw] font-bold text-[#D3A15F]">05 · DUKUNGAN</p>
            <p className="relative mt-[0.7vh] text-[2vw] font-extrabold">Program · Keluhan</p>
            <p className="relative mt-[0.55vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Program, bantuan, dan kanal kebutuhan lapangan.</p>
          </div>
          <div className="relative min-h-[16vh] border-t-[0.22vw] border-[#D3A15F] bg-[#3A2B27] p-[0.9vw]">
            <span className="absolute right-[0.9vw] top-[0.45vh] text-[3.6vw] font-extrabold leading-none text-[#493630]">06</span>
            <p className="relative text-[1.4vw] font-bold text-[#D3A15F]">06 · NILAI TAMBAH</p>
            <p className="relative mt-[0.7vh] text-[2vw] font-extrabold">Produk turunan</p>
            <p className="relative mt-[0.55vh] text-[1.7vw] leading-[1.12] text-[#E7D9C8]">Olahan yang memperluas nilai dari kopi.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[4vh] left-[6.5vw] right-[6.5vw] flex items-center justify-between border-t border-[#59443B] pt-[1.5vh]">
        <p className="text-[1.45vw] font-bold uppercase tracking-[0.15em] text-[#D3A15F]">Rasa · manusia · tempat · peluang</p>
        <p className="text-[1.45vw] font-bold text-[#E7D9C8]">Satu beranda, lebih banyak alasan untuk kembali</p>
      </div>
    </div>
  );
}