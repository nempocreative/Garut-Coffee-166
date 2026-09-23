import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlideGovernmentSynergy() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[39vw] bg-[#2A201D]" />
      <div className="absolute right-[39vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#A8543B]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[48vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Yang kami mohon dari Dinas</p>
        <h2 className="mt-[1.5vh] text-[4.8vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Satukan kekuatan</span>
          <span className="text-[#A8543B]">kopi Garut.</span>
        </h2>
        <p className="mt-[3vh] max-w-[44vw] text-[1.8vw] leading-[1.2] text-[#806E63]">
          Dengan sinergi Dinas, petani, program, dan anak muda, kopi Garut dapat tumbuh menjadi satu origin yang dikenal, dipercaya, dan siap masuk pasar.
        </p>
      </div>

      <div className="absolute bottom-[7vh] left-[6.5vw] w-[50vw] border-t-[0.25vw] border-[#A8543B] pt-[1.5vh]">
        <div className="flex items-center justify-between">
          <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.18em] text-[#A8543B]">Dua kekuatan · satu arah</p>
          <p className="text-[1.25vw] font-bold uppercase tracking-[0.12em] text-[#806E63]">Kolaborasi yang bisa dijalankan</p>
        </div>

        <div className="relative mt-[2.2vh] flex items-stretch">
          <div className="w-[21vw] border-l-[0.2vw] border-[#A8543B] pl-[1.1vw]">
            <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">01 · Dinas Pertanian</p>
            <p className="mt-[1vh] text-[1.8vw] font-extrabold leading-[1.05]">Akses & koordinasi</p>
            <p className="mt-[0.8vh] text-[1.55vw] leading-[1.15] text-[#806E63]">Petani, program, ruang kolaborasi, dan aturan yang dibutuhkan.</p>
          </div>

          <div className="flex w-[6vw] shrink-0 items-center justify-center">
            <span className="flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full bg-[#D3A15F] text-[2vw] font-extrabold text-[#2A201D]">+</span>
          </div>

          <div className="w-[21vw] border-l-[0.2vw] border-[#D3A15F] pl-[1.1vw]">
            <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.14em] text-[#A8543B]">02 · Nempo × Kala Muda</p>
            <p className="mt-[1vh] text-[1.8vw] font-extrabold leading-[1.05]">Cerita & pasar</p>
            <p className="mt-[0.8vh] text-[1.55vw] leading-[1.15] text-[#806E63]">Brand, kualitas, promosi, dan peluang kerja baru yang relevan.</p>
          </div>
        </div>

        <div className="mt-[2.1vh] flex items-center gap-[1vw] border-t border-[#D8C7B5] pt-[1.2vh]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.14em] text-[#806E63]">Hasil bersama</p>
          <p className="text-[1.55vw] font-extrabold text-[#2A201D]">Dikenal <span className="text-[#A8543B]">·</span> Bernilai <span className="text-[#A8543B]">·</span> Tumbuh</p>
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