import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide12Programs() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[25vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#A8543B]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">12 / 23</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[46vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Program dan ruang kerja</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Fitur berbeda</span>
          <span className="text-[#A8543B]">sesuai peran.</span>
        </h2>
        <p className="mt-[3vh] max-w-[37vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Pengguna umum dapat menjelajah. Petani dan penyuluh mendapatkan ruang kerja untuk mengelola data, mutu, program, dan tindak lanjut.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[17vh] grid w-[44vw] grid-cols-3 gap-[0.7vw]">
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[0.95vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.06em] text-[#A8543B]">Mutu dan asal</p><p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Verifikasi · Standar · Kurasi</p><p className="mt-[0.6vh] text-[1.55vw] leading-[1.1] text-[#806E63]">Menjaga identitas petani, lot, produk, dan rujukan mutu tetap terbaca.</p></div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[0.95vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.06em] text-[#A8543B]">Ruang kelompok</p><p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Dashboard kelompok tani</p><p className="mt-[0.6vh] text-[1.55vw] leading-[1.1] text-[#806E63]">Anggota, produksi, penjualan, permintaan pembeli, dan agenda dalam satu tampilan.</p></div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[0.95vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.06em] text-[#A8543B]">Pendampingan</p><p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Dashboard penyuluh</p><p className="mt-[0.6vh] text-[1.55vw] leading-[1.1] text-[#806E63]">Kunjungan, kondisi kebun, rekomendasi, dan tindak lanjut lapangan.</p></div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[0.95vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.06em] text-[#A8543B]">Pengetahuan</p><p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Laporan · Dokumen · Notifikasi</p><p className="mt-[0.6vh] text-[1.55vw] leading-[1.1] text-[#806E63]">Panduan, SOP, regulasi, pelatihan, pengingat, dan perkembangan ekosistem.</p></div>
        <div className="col-span-2 border-t-[0.25vw] border-[#D3A15F] bg-[#A8543B] p-[0.95vw] text-[#FFF9F1]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.06em] text-[#D3A15F]">Suara lapangan</p><p className="mt-[0.9vh] text-[1.65vw] font-extrabold leading-[1.05]">Usulan dan kebutuhan dukungan</p><p className="mt-[0.6vh] text-[1.55vw] leading-[1.1] text-[#F6F0E8]">Petani dapat menyampaikan kebutuhan data, bibit, lahan, pendampingan, atau dukungan lain untuk ditinjau.</p></div>
      </div>
    </div>
  );
}