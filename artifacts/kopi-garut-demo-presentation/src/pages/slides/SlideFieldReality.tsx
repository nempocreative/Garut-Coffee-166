import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideFieldReality() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#F6F0E8]" />
      <div className="absolute right-[35vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[15vw] h-[39vw] w-[39vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">03 / 26</span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[49vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Masalah di lapangan</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Potensi besar,</span>
          <span className="text-[#D3A15F]">data belum satu.</span>
        </h2>
        <p className="mt-[3vh] max-w-[43vw] text-[1.9vw] leading-[1.18] text-[#E7D9C8]">
          Informasi asal, pelaku, produksi, dan pasar masih perlu disatukan agar keputusan dan cerita kopi Garut lebih mudah dipercaya.
        </p>
      </div>

      <div className="absolute bottom-[8vh] left-[6.5vw] grid w-[49vw] grid-cols-3 gap-[1vw]">
        <div className="min-h-[20vh] border-t-[0.25vw] border-[#A8543B] bg-[#3A2B27] px-[1.15vw] py-[1.25vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">01 · Asal</p>
          <p className="mt-[2vh] text-[1.6vw] font-bold leading-[1.12]">Profil petani, kebun, dan lot tersimpan di banyak tempat.</p>
        </div>
        <div className="min-h-[20vh] border-t-[0.25vw] border-[#A8543B] bg-[#3A2B27] px-[1.15vw] py-[1.25vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">02 · Keputusan</p>
          <p className="mt-[2vh] text-[1.6vw] font-bold leading-[1.12]">Produksi, harga, dan pendampingan sulit dibaca bersama.</p>
        </div>
        <div className="min-h-[20vh] border-t-[0.25vw] border-[#A8543B] bg-[#3A2B27] px-[1.15vw] py-[1.25vw]">
          <p className="text-[1.15vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">03 · Cerita</p>
          <p className="mt-[2vh] text-[1.6vw] font-bold leading-[1.12]">Asal dan kualitas belum selalu terlihat oleh pembeli.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[24vw] text-[#2A201D]">
        <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.18em] text-[#A8543B]">Snapshot data awal · demo</p>
        <p className="mt-[1.1vh] text-[1.35vw] font-semibold leading-[1.15] text-[#806E63]">Contoh ringkasan yang perlu divalidasi bersama Dinas dan kelompok tani.</p>
        <div className="mt-[3.2vh] border-t border-[#D8C7B5]">
          <div className="border-b border-[#D8C7B5] py-[2.4vh]">
            <p className="text-[4.4vw] font-extrabold leading-none tracking-[-0.08em] text-[#A8543B]">125</p>
            <p className="mt-[0.8vh] text-[1.45vw] font-extrabold uppercase tracking-[0.13em] text-[#806E63]">Petani terdaftar</p>
          </div>
          <div className="border-b border-[#D8C7B5] py-[2.4vh]">
            <p className="text-[4.4vw] font-extrabold leading-none tracking-[-0.08em] text-[#A8543B]">12</p>
            <p className="mt-[0.8vh] text-[1.45vw] font-extrabold uppercase tracking-[0.13em] text-[#806E63]">Wilayah aktif</p>
          </div>
          <div className="py-[2.4vh]">
            <p className="text-[4.4vw] font-extrabold leading-none tracking-[-0.08em] text-[#A8543B]">312 <span className="text-[2.1vw] tracking-[-0.03em]">ton</span></p>
            <p className="mt-[0.8vh] text-[1.45vw] font-extrabold uppercase tracking-[0.13em] text-[#806E63]">Produksi tahunan</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] left-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.16em] text-[#D3A15F]">Data sebagai titik mulai</div>
      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">Validasi bersama</div>
    </div>
  );
}