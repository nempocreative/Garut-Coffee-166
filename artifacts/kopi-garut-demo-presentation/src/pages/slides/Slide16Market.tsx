import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide16Market() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[22vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#A8543B]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">20 / 23</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[41vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Pasar sasaran</p>
        <h2 className="mt-[1.6vh] text-[4.9vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Pasar awalnya</span>
          <span className="text-[#A8543B]">ada di Garut.</span>
        </h2>
        <p className="mt-[3vh] max-w-[34vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Platform dimulai dari pelaku yang sudah bersentuhan dengan kopi, wisata, dan produk lokal—lalu memperluas jangkauan melalui cerita yang mereka bawa.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] grid w-[49vw] grid-cols-2 gap-[1vw]">
         <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.25vw]"><p className="text-[1.6vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">01 · Kanal utama</p><p className="mt-[1.3vh] text-[2vw] font-extrabold">Coffee shop & roastery</p><p className="mt-[0.7vh] text-[1.7vw] leading-[1.15] text-[#806E63]">Menjadikan Kopi Garut sebagai origin signature di menu dan rak produk.</p></div>
         <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.25vw]"><p className="text-[1.6vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">02 · Kanal pengalaman</p><p className="mt-[1.3vh] text-[2vw] font-extrabold">Hotel, resto & wisata</p><p className="mt-[0.7vh] text-[1.7vw] leading-[1.15] text-[#806E63]">Membawa cerita asal Garut ke tamu, paket perjalanan, dan pengalaman seduh.</p></div>
         <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.25vw]"><p className="text-[1.6vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">03 · Kanal komunitas</p><p className="mt-[1.3vh] text-[2vw] font-extrabold">Event & komunitas kopi</p><p className="mt-[0.7vh] text-[1.7vw] leading-[1.15] text-[#806E63]">Cupping, festival, pelatihan, dan aktivasi yang mempertemukan pelaku.</p></div>
         <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.25vw]"><p className="text-[1.6vw] font-bold uppercase tracking-[0.08em] text-[#A8543B]">04 · Kanal perluasan</p><p className="mt-[1.3vh] text-[2vw] font-extrabold">Kantor, hadiah & rumah tangga</p><p className="mt-[0.7vh] text-[1.7vw] leading-[1.15] text-[#806E63]">Produk kemasan, hampers, konsumsi kantor, dan pembelian berulang.</p></div>
      </div>

        <div className="absolute bottom-[3vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[1.5vh] text-[1.7vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Mulai dari ekosistem lokal · tumbuh melalui jaringan outlet
      </div>
    </div>
  );
}