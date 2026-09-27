import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide5Explore() {
  return (
    <div className="footer-on-dark relative h-screen w-screen overflow-hidden bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute inset-y-0 left-0 w-[26vw] bg-[#A8543B]" />
      <div className="absolute inset-y-0 left-[24.5vw] w-[0.12vw] bg-[#D3A15F]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <section className="absolute left-[6.5vw] top-[18vh] w-[34vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Menu jelajah</p>
        <h2 className="mt-[1.5vh] text-[5vw] font-extrabold leading-[0.96] tracking-[-0.075em]">
          <span className="block">Lebih dari</span>
          <span className="text-[#D3A15F]">sekadar katalog.</span>
        </h2>
        <p className="mt-[3vh] max-w-[29vw] text-[1.8vw] leading-[1.18] text-[#E7D9C8]">Enam pintu masuk untuk menemukan rasa, manusia, tempat, dan peluang di balik Garut Beans G-Beans.</p>
        <div className="mt-[5vh] border-t border-[#D3A15F] pt-[1.7vh]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.18em] text-[#E7D9C8]">Urutan jelajah</p>
          <p className="mt-[1vh] text-[1.7vw] font-extrabold text-[#FFF9F1]">Temukan → Pahami → Terlibat</p>
        </div>
      </section>

      <section className="absolute right-[6.5vw] top-[14vh] w-[50vw]">
        <div className="mb-[1.8vh] flex items-center justify-between border-b border-[#59443B] pb-[1.2vh]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.18em] text-[#D3A15F]">Kategori jelajah</p>
          <span className="text-[1.2vw] font-bold text-[#E7D9C8]">01—06</span>
        </div>
        <div className="grid grid-cols-2 gap-x-[2.4vw]">
          <div className="flex items-baseline gap-[1vw] border-b border-[#59443B] py-[1.8vh]"><span className="text-[1.2vw] font-bold text-[#D3A15F]">01</span><div><p className="text-[2.2vw] font-extrabold">Kopi</p><p className="mt-[0.4vh] text-[1.15vw] text-[#E7D9C8]">Katalog kopi dan produk turunan</p></div></div>
          <div className="flex items-baseline gap-[1vw] border-b border-[#59443B] py-[1.8vh]"><span className="text-[1.2vw] font-bold text-[#D3A15F]">02</span><div><p className="text-[2.2vw] font-extrabold">Petani · Wilayah</p><p className="mt-[0.4vh] text-[1.15vw] text-[#E7D9C8]">Profil dan karakter wilayah</p></div></div>
          <div className="flex items-baseline gap-[1vw] border-b border-[#59443B] py-[1.8vh]"><span className="text-[1.2vw] font-bold text-[#D3A15F]">03</span><div><p className="text-[2.2vw] font-extrabold">Wisata · Event</p><p className="mt-[0.4vh] text-[1.15vw] text-[#E7D9C8]">Agenda, festival, dan perjalanan rasa</p></div></div>
          <div className="flex items-baseline gap-[1vw] border-b border-[#59443B] py-[1.8vh]"><span className="text-[1.2vw] font-bold text-[#D3A15F]">04</span><div><p className="text-[2.2vw] font-extrabold">Mitra · Ekosistem</p><p className="mt-[0.4vh] text-[1.15vw] text-[#E7D9C8]">Peluang kemitraan</p></div></div>
          <div className="flex items-baseline gap-[1vw] border-b border-[#59443B] py-[1.8vh]"><span className="text-[1.2vw] font-bold text-[#D3A15F]">05</span><div><p className="text-[2.2vw] font-extrabold">Program · Keluhan</p><p className="mt-[0.4vh] text-[1.15vw] text-[#E7D9C8]">Dukungan dan kebutuhan lapangan</p></div></div>
          <div className="flex items-baseline gap-[1vw] border-b border-[#59443B] py-[1.8vh]"><span className="text-[1.2vw] font-bold text-[#D3A15F]">06</span><div><p className="text-[2.2vw] font-extrabold">Produk turunan</p><p className="mt-[0.4vh] text-[1.15vw] text-[#E7D9C8]">Olahan yang memperluas nilai kopi</p></div></div>
        </div>
      </section>
    </div>
  );
}