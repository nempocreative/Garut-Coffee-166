import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide15Advantages() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#A8543B] text-[#FFF9F1]">
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#E7D9C8] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Keunggulan aplikasi</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Satu aplikasi,</span>
          <span className="text-[#D3A15F]">banyak nilai.</span>
        </h2>
        <p className="mt-[3vh] max-w-[38vw] text-[2vw] leading-[1.2] text-[#E7D9C8]">
          Garut Beans G-Beans tidak hanya menjual produk. Aplikasi ini membuat asal, manusia, proses, dan peluang kolaborasi ikut terlihat.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[43vw] space-y-[1.1vh]">
          <div className="flex gap-[1.2vw] border-b border-[#D3A15F]/60 pb-[1.25vh]"><span className="text-[2.55vw] font-extrabold text-[#D3A15F]">01</span><div><p className="text-[1.9vw] font-extrabold">Terhubung dari hulu ke hilir</p><p className="mt-[0.45vh] text-[2vw] leading-[1.12] text-[#F6F0E8]">Wilayah, petani, produk, pesanan, dan pelanggan berada dalam satu cerita.</p></div></div>
          <div className="flex gap-[1.2vw] border-b border-[#D3A15F]/60 pb-[1.25vh]"><span className="text-[2.55vw] font-extrabold text-[#D3A15F]">02</span><div><p className="text-[1.9vw] font-extrabold">Informasi lebih transparan</p><p className="mt-[0.45vh] text-[2vw] leading-[1.12] text-[#F6F0E8]">Traceability dan verifikasi membantu pengguna memahami kualitas sebelum memilih.</p></div></div>
          <div className="flex gap-[1.2vw] border-b border-[#D3A15F]/60 pb-[1.25vh]"><span className="text-[2.55vw] font-extrabold text-[#D3A15F]">03</span><div><p className="text-[1.9vw] font-extrabold">Berbasis peran dan kebutuhan</p><p className="mt-[0.45vh] text-[2vw] leading-[1.12] text-[#F6F0E8]">Pengguna, petani, dan penyuluh melihat ruang kerja yang relevan bagi mereka.</p></div></div>
          <div className="flex gap-[1.2vw]"><span className="text-[2.55vw] font-extrabold text-[#D3A15F]">04</span><div><p className="text-[1.9vw] font-extrabold">Mendorong nilai lokal</p><p className="mt-[0.45vh] text-[2vw] leading-[1.12] text-[#F6F0E8]">Kopi, wisata, produk turunan, dan kemitraan memperluas manfaat bagi Garut.</p></div></div>
      </div>

       <div className="absolute bottom-[5vh] left-[6.5vw] text-[1.6vw] font-bold uppercase tracking-[0.16em] text-[#D3A15F]">Asal yang jelas · pilihan yang percaya diri</div>
    </div>
  );
}