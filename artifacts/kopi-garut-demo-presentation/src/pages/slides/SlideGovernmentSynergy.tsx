import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideGovernmentSynergy() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[39vw] bg-[#2A201D]" />
      <div className="absolute right-[39vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />
      <div className="absolute -right-[12vw] -bottom-[14vw] h-[39vw] w-[39vw] rounded-full border-[0.12vw] border-[#A8543B]/45" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">06 / 28</span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[48vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Yang kami mohon dari Dinas</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Satukan kekuatan</span>
          <span className="text-[#A8543B]">kopi Garut.</span>
        </h2>
        <p className="mt-[3vh] max-w-[44vw] text-[1.8vw] leading-[1.2] text-[#806E63]">
          Kekayaan alam kopi Garut besar. Dengan sinergi Dinas, petani, program, dan anak muda, potensi ini dapat tumbuh menjadi satu origin yang kuat—dikenal secara nasional dan dibawa menuju pasar internasional.
        </p>
      </div>

      <div className="absolute bottom-[7vh] left-[6.5vw] grid w-[50vw] grid-cols-2 gap-[1.2vw]">
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.25vw] py-[1.2vw]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Dinas Pertanian</p>
          <ul className="mt-[1.4vh] space-y-[0.8vh] text-[1.35vw] font-semibold leading-[1.16] text-[#2A201D]">
            <li>• Membuka akses kepada petani dan kelompok tani.</li>
            <li>• Menghubungkan program dan ruang kolaborasi.</li>
            <li>• Memfasilitasi kerja sama serta aturan yang diperlukan.</li>
          </ul>
        </div>
        <div className="border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.25vw] py-[1.2vw]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Nempo × Kala Muda</p>
          <ul className="mt-[1.4vh] space-y-[0.8vh] text-[1.35vw] font-semibold leading-[1.16] text-[#2A201D]">
            <li>• Membangun brand Garut Beans G-Beans secara konsisten.</li>
            <li>• Mengemas cerita dan kualitas kopi Garut secara relevan.</li>
            <li>• Membuka jalan ke promosi, pasar, dan peluang kerja baru.</li>
          </ul>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[20vh] w-[27vw] text-[#FFF9F1]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Tujuan bersama</p>
        <p className="mt-[1.4vh] text-[1.75vw] font-semibold leading-[1.15] text-[#E7D9C8]">Satu identitas yang memberi nilai lebih luas bagi Garut.</p>
        <div className="mt-[3.5vh] space-y-[2.1vh]">
          <div className="flex items-start gap-[1vw] border-b border-[#806E63] pb-[1.7vh]">
            <span className="text-[2.5vw] font-extrabold leading-none text-[#D3A15F]">01</span>
            <p className="text-[1.65vw] font-extrabold leading-[1.08]">Kopi Garut lebih dikenal.</p>
          </div>
          <div className="flex items-start gap-[1vw] border-b border-[#806E63] pb-[1.7vh]">
            <span className="text-[2.5vw] font-extrabold leading-none text-[#D3A15F]">02</span>
            <p className="text-[1.65vw] font-extrabold leading-[1.08]">Nilai kembali ke petani dan daerah.</p>
          </div>
          <div className="flex items-start gap-[1vw]">
            <span className="text-[2.5vw] font-extrabold leading-none text-[#D3A15F]">03</span>
            <p className="text-[1.65vw] font-extrabold leading-[1.08]">Lebih banyak peluang tumbuh dan bekerja.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] text-[1.15vw] font-bold uppercase tracking-[0.12em] text-[#D3A15F]">Bersinergi · Membesar · Berdampak</div>
    </div>
  );
}