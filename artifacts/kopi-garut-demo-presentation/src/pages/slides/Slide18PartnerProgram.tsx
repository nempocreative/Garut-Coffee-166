import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide18PartnerProgram() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[20vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#A8543B]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">22 / 23</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[45vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Program partner</p>
        <h2 className="mt-[1.6vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Dari satu outlet</span>
          <span className="text-[#A8543B]">menjadi jaringan kota.</span>
        </h2>
        <p className="mt-[3vh] max-w-[37vw] text-[1.9vw] leading-[1.2] text-[#806E63]">
          Aplikasi menjadi pusat pendaftaran, standar, materi branding, dan hubungan antara coffee shop dengan sumber kopi.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[20vh] w-[44vw]">
        <div className="flex items-start gap-[0.7vw]">
          <div className="h-[4.4vw] w-[4.4vw] rounded-full bg-[#A8543B] text-center text-[1.8vw] font-extrabold leading-[4.4vw] text-[#FFF9F1]">01</div>
          <div className="mt-[2.1vw] h-[0.2vw] w-[3vw] bg-[#D3A15F]" />
          <div className="h-[4.4vw] w-[4.4vw] rounded-full bg-[#A8543B] text-center text-[1.8vw] font-extrabold leading-[4.4vw] text-[#FFF9F1]">02</div>
          <div className="mt-[2.1vw] h-[0.2vw] w-[3vw] bg-[#D3A15F]" />
          <div className="h-[4.4vw] w-[4.4vw] rounded-full bg-[#A8543B] text-center text-[1.8vw] font-extrabold leading-[4.4vw] text-[#FFF9F1]">03</div>
          <div className="mt-[2.1vw] h-[0.2vw] w-[3vw] bg-[#D3A15F]" />
          <div className="h-[4.4vw] w-[4.4vw] rounded-full bg-[#A8543B] text-center text-[1.8vw] font-extrabold leading-[4.4vw] text-[#FFF9F1]">04</div>
        </div>
        <div className="mt-[1.6vh] grid grid-cols-4 gap-[0.7vw] text-[1.5vw] font-bold leading-[1.1] text-[#2A201D]">
          <p><span className="block">Daftar</span><span className="block">partner</span></p>
          <p><span className="block">Verifikasi</span><span className="block">asal & mutu</span></p>
          <p><span className="block">Dapatkan</span><span className="block">toolkit menu</span></p>
          <p><span className="block">Aktifkan</span><span className="block">cerita</span></p>
        </div>
        <div className="mt-[5vh] grid grid-cols-2 gap-[1vw]">
          <div className="border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.25vw]"><p className="text-[1.55vw] font-bold text-[#A8543B]">Untuk outlet</p><p className="mt-[1vh] text-[1.55vw] leading-[1.15] text-[#806E63]">Pembeda menu, cerita yang siap dipakai, akses pasokan, dan status partner yang mudah dipercaya.</p></div>
          <div className="border-t-[0.25vw] border-[#D3A15F] bg-[#A8543B] p-[1.25vw] text-[#FFF9F1]"><p className="text-[1.55vw] font-bold text-[#D3A15F]">Untuk Garut</p><p className="mt-[1vh] text-[1.55vw] leading-[1.15] text-[#F6F0E8]">Satu identitas origin yang hadir di banyak titik temu dengan pengunjung dan pembeli.</p></div>
        </div>
      </div>

      <div className="absolute bottom-[8vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[2vh] text-[1.5vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Target akhirnya: ketika orang memesan kopi di Garut, mereka mengenali satu asal yang kuat
      </div>
    </div>
  );
}