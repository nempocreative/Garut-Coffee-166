import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide16Market() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[22vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[41vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Pasar sasaran</p>
        <h2 className="mt-[1.6vh] text-[4.9vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Pasar awalnya</span>
          <span className="text-[#A8543B]">ada di Garut.</span>
        </h2>
        <p className="mt-[3vh] max-w-[34vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Mulai dari pelaku yang sudah dekat dengan kopi, wisata, dan produk lokal.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] grid w-[49vw] grid-cols-2 gap-[1vw]">
           <div className="min-h-[19vh] border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.1vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">01 · Kanal utama</p><p className="mt-[1.05vh] text-[1.9vw] font-extrabold">Coffee shop & roastery</p><p className="mt-[0.65vh] text-[1.7vw] leading-[1.12] text-[#806E63]">Origin signature di menu dan rak produk.</p></div>
           <div className="min-h-[19vh] border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.1vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">02 · Kanal pengalaman</p><p className="mt-[1.05vh] text-[1.9vw] font-extrabold">Hotel, resto & wisata</p><p className="mt-[0.65vh] text-[1.7vw] leading-[1.12] text-[#806E63]">Cerita asal, paket perjalanan, dan pengalaman seduh.</p></div>
           <div className="min-h-[19vh] border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.1vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">03 · Kanal komunitas</p><p className="mt-[1.05vh] text-[1.9vw] font-extrabold">Event & komunitas kopi</p><p className="mt-[0.65vh] text-[1.7vw] leading-[1.12] text-[#806E63]">Cupping, festival, pelatihan, dan aktivasi.</p></div>
           <div className="min-h-[19vh] border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.1vw]"><p className="text-[1.5vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">04 · Kanal perluasan</p><p className="mt-[1.05vh] text-[1.9vw] font-extrabold">Kantor, hadiah & rumah tangga</p><p className="mt-[0.65vh] text-[1.7vw] leading-[1.12] text-[#806E63]">Kemasan, hampers, dan pembelian berulang.</p></div>
      </div>

        <div className="absolute bottom-[12vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[1.5vh] text-[1.45vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Mulai dari ekosistem lokal · tumbuh melalui jaringan outlet
      </div>
    </div>
  );
}