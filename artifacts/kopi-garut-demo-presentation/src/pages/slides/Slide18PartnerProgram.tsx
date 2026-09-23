import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide18PartnerProgram() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[20vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">23 / 24</span>
      </div>

      <div className="absolute left-[6.5vw] top-[17vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Program partner</p>
        <h2 className="mt-[1.6vh] text-[4.35vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Dari satu outlet</span>
          <span className="text-[#A8543B]">menjadi jaringan kota.</span>
        </h2>
        <p className="mt-[3vh] max-w-[34vw] text-[1.8vw] leading-[1.2] text-[#806E63]">
          Aplikasi menjadi pusat pendaftaran, standar, materi branding, dan hubungan antara coffee shop dengan sumber kopi.
        </p>
      </div>

      <div className="absolute right-[6.5vw] top-[19vh] w-[43vw]">
        <div className="grid grid-cols-4 gap-[0.7vw]">
          <div className="relative">
            <div className="h-[3.8vw] w-[3.8vw] rounded-full bg-[#A8543B] text-center text-[1.55vw] font-extrabold leading-[3.8vw] text-[#FFF9F1]">01</div>
            <div className="absolute left-[4.35vw] top-[1.8vw] h-[0.18vw] w-[5.8vw] bg-[#D3A15F]" />
            <p className="mt-[1.2vh] text-[1.5vw] font-bold leading-[1.08]">Daftar<br />partner</p>
          </div>
          <div className="relative">
            <div className="h-[3.8vw] w-[3.8vw] rounded-full bg-[#A8543B] text-center text-[1.55vw] font-extrabold leading-[3.8vw] text-[#FFF9F1]">02</div>
            <div className="absolute left-[4.35vw] top-[1.8vw] h-[0.18vw] w-[5.8vw] bg-[#D3A15F]" />
            <p className="mt-[1.2vh] text-[1.5vw] font-bold leading-[1.08]">Verifikasi<br />asal &amp; mutu</p>
          </div>
          <div className="relative">
            <div className="h-[3.8vw] w-[3.8vw] rounded-full bg-[#A8543B] text-center text-[1.55vw] font-extrabold leading-[3.8vw] text-[#FFF9F1]">03</div>
            <div className="absolute left-[4.35vw] top-[1.8vw] h-[0.18vw] w-[5.8vw] bg-[#D3A15F]" />
            <p className="mt-[1.2vh] text-[1.5vw] font-bold leading-[1.08]">Dapatkan<br />toolkit menu</p>
          </div>
          <div>
            <div className="h-[3.8vw] w-[3.8vw] rounded-full bg-[#A8543B] text-center text-[1.55vw] font-extrabold leading-[3.8vw] text-[#FFF9F1]">04</div>
            <p className="mt-[1.2vh] text-[1.5vw] font-bold leading-[1.08]">Aktifkan<br />cerita</p>
          </div>
        </div>
        <div className="mt-[3vh] grid grid-cols-2 gap-[1vw]">
          <div className="min-h-[15vh] border-t-[0.25vw] border-[#A8543B] bg-[#FFF9F1] p-[1.1vw]">
            <p className="text-[1.45vw] font-bold text-[#A8543B]">Untuk outlet</p>
            <p className="mt-[1vh] text-[1.5vw] leading-[1.16] text-[#806E63]">Pembeda menu, cerita yang siap dipakai, akses pasokan, dan status partner yang mudah dipercaya.</p>
          </div>
          <div className="min-h-[15vh] border-t-[0.25vw] border-[#D3A15F] bg-[#A8543B] p-[1.1vw] text-[#FFF9F1]">
            <p className="text-[1.45vw] font-bold text-[#D3A15F]">Untuk Garut</p>
            <p className="mt-[1vh] text-[1.5vw] leading-[1.16] text-[#F6F0E8]">Satu identitas origin yang hadir di banyak titik temu dengan pengunjung dan pembeli.</p>
          </div>
        </div>
      </div>

       <div className="absolute bottom-[8vh] left-[6.5vw] right-[6.5vw] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[2vh] text-[1.7vw] font-bold text-[#A8543B]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#D3A15F]" />
        Target akhirnya: ketika orang memesan kopi di Garut, mereka mengenali satu asal yang kuat
      </div>
    </div>
  );
}