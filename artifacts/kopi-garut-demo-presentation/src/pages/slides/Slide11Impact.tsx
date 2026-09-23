import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide11Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[27vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[50vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Arah pengembangan</p>
        <h2 className="mt-[1.6vh] max-w-[43vw] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Platform yang</span>
          <span className="text-[#A8543B]">tumbuh bersama data.</span>
        </h2>
        <p className="mt-[3vh] max-w-[41vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Nilai platform bertambah ketika informasi semakin lengkap, terhubung, dan digunakan oleh lebih banyak pelaku ekosistem.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[41vw] space-y-[1.25vh]">
        <div className="flex gap-[1.2vw] border-b border-[#D8C7B5] pb-[1.35vh]">
          <span className="text-[2.35vw] font-extrabold text-[#A8543B]">01</span>
          <div><p className="text-[1.9vw] font-extrabold">Data semakin lengkap</p><p className="mt-[0.45vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Profil wilayah, petani, lot, produk, dan program berada dalam satu sumber.</p></div>
        </div>
        <div className="flex gap-[1.2vw] border-b border-[#D8C7B5] pb-[1.35vh]">
          <span className="text-[2.35vw] font-extrabold text-[#A8543B]">02</span>
          <div><p className="text-[1.9vw] font-extrabold">Kepercayaan semakin kuat</p><p className="mt-[0.45vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Cerita asal dan proses dapat dipahami sebelum keputusan dibuat.</p></div>
        </div>
        <div className="flex gap-[1.2vw] border-b border-[#D8C7B5] pb-[1.35vh]">
          <span className="text-[2.35vw] font-extrabold text-[#A8543B]">03</span>
          <div><p className="text-[1.9vw] font-extrabold">Kolaborasi semakin terarah</p><p className="mt-[0.45vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Mitra menemukan konteks yang dibutuhkan untuk masuk dan berkontribusi.</p></div>
        </div>
        <div className="flex gap-[1.2vw]">
          <span className="text-[2.35vw] font-extrabold text-[#A8543B]">04</span>
          <div><p className="text-[1.9vw] font-extrabold">Nilai kembali ke daerah</p><p className="mt-[0.45vh] text-[1.6vw] leading-[1.12] text-[#806E63]">Kopi, manusia, dan pengalaman Garut punya ruang lebih besar untuk ditemukan.</p></div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] left-[6.5vw] text-[1.6vw] font-bold uppercase tracking-[0.16em] text-[#A8543B]">Terukur · Terhubung · Berkelanjutan</div>
    </div>
  );
}