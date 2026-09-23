import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide3Ecosystem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute left-0 top-0 h-full w-[21vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">03 / 23</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[49vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Pengguna utama</p>
        <h2 className="mt-[1.6vh] text-[4.7vw] font-extrabold leading-[1] tracking-[-0.075em]">
          <span className="block">Satu ekosistem,</span>
          <span className="text-[#A8543B]">empat kebutuhan.</span>
        </h2>
        <p className="mt-[3vh] max-w-[39vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Setiap pengguna datang dengan tujuan berbeda. Platform menyatukan tujuan itu tanpa menghilangkan konteks asalnya.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[17vh] w-[48vw] space-y-[1.25vh]">
        <div className="flex items-center gap-[1.3vw] border-b border-[#D8C7B5] pb-[1.3vh]">
          <span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">01</span>
          <div><p className="text-[2vw] font-extrabold">Petani dan kelompok tani</p><p className="mt-[0.5vh] text-[1.8vw] leading-[1.15] text-[#806E63]">Menyampaikan profil, wilayah, produk, dan perkembangan kebun.</p></div>
        </div>
        <div className="flex items-center gap-[1.3vw] border-b border-[#D8C7B5] pb-[1.3vh]">
          <span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">02</span>
          <div><p className="text-[2vw] font-extrabold">Pembeli dan penikmat kopi</p><p className="mt-[0.5vh] text-[1.8vw] leading-[1.15] text-[#806E63]">Menemukan pilihan yang sesuai sambil memahami asal dan prosesnya.</p></div>
        </div>
        <div className="flex items-center gap-[1.3vw] border-b border-[#D8C7B5] pb-[1.3vh]">
          <span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">03</span>
          <div><p className="text-[2vw] font-extrabold">Mitra dan pelaku usaha</p><p className="mt-[0.5vh] text-[1.8vw] leading-[1.15] text-[#806E63]">Membaca peluang kolaborasi, kemitraan, dan pengembangan produk.</p></div>
        </div>
        <div className="flex items-center gap-[1.3vw] pb-[1.3vh]">
          <span className="w-[4vw] text-[2.6vw] font-extrabold text-[#A8543B]">04</span>
          <div><p className="text-[2vw] font-extrabold">Pengelola ekosistem</p><p className="mt-[0.5vh] text-[1.8vw] leading-[1.15] text-[#806E63]">Menggunakan data, program, laporan, dan umpan balik untuk bertindak.</p></div>
        </div>
      </div>

      <div className="absolute bottom-[8vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[2vh] text-[1.7vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Informasi yang sama · keputusan yang lebih dekat
      </div>
    </div>
  );
}