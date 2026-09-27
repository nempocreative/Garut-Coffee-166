import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide2Context() {
  return (
    <div className="footer-on-dark w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#A8543B]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[52vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">Konteks ekosistem</p>
        <h2 className="mt-[1.6vh] text-[5vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Potensi besar,</span>
          <span className="text-[#D3A15F]">cerita yang tersebar.</span>
        </h2>
        <p className="mt-[3vh] max-w-[42vw] text-[2vw] leading-[1.2] text-[#E7D9C8]">
          Garut Beans G-Beans memiliki asal, pelaku, produk, dan pengalaman yang beragam. Informasi itu perlu hadir dalam satu alur yang mudah dipahami.
        </p>
        <div className="mt-[3.6vh] h-[0.42vh] w-[7vw] rounded-full bg-[#D3A15F]" />
      </div>

      <div className="absolute bottom-[11vh] left-[6.5vw] w-[55vw] border-t-[0.25vw] border-[#D3A15F]">
        <div className="flex items-center justify-between py-[0.8vh]">
          <p className="text-[1.25vw] font-extrabold uppercase tracking-[0.18em] text-[#D3A15F]">Yang perlu disatukan</p>
          <p className="text-[1.25vw] font-bold uppercase tracking-[0.12em] text-[#B99C8E]">Tiga sinyal utama</p>
        </div>

        <div className="flex items-start gap-[1.2vw] py-[0.8vh]">
          <span className="w-[2.5vw] shrink-0 text-[1.8vw] font-extrabold leading-none text-[#D3A15F]">01</span>
          <p className="w-[8vw] shrink-0 text-[1.4vw] font-extrabold uppercase tracking-[0.12em] text-[#F6D9B6]">Asal</p>
          <p className="min-w-0 flex-1 text-[1.55vw] font-semibold leading-[1.12] text-[#E7D9C8]">Kualitas dan cerita belum selalu terlihat oleh pembeli.</p>
        </div>

        <div className="flex items-start gap-[1.2vw] py-[0.8vh]">
          <span className="w-[2.5vw] shrink-0 text-[1.8vw] font-extrabold leading-none text-[#D3A15F]">02</span>
          <p className="w-[8vw] shrink-0 text-[1.4vw] font-extrabold uppercase tracking-[0.12em] text-[#F6D9B6]">Akses</p>
          <p className="min-w-0 flex-1 text-[1.55vw] font-semibold leading-[1.12] text-[#E7D9C8]">Petani dan mitra belum membaca informasi dari sumber yang sama.</p>
        </div>

        <div className="flex items-start gap-[1.2vw] py-[0.8vh]">
          <span className="w-[2.5vw] shrink-0 text-[1.8vw] font-extrabold leading-none text-[#D3A15F]">03</span>
          <p className="w-[8vw] shrink-0 text-[1.4vw] font-extrabold uppercase tracking-[0.12em] text-[#F6D9B6]">Data</p>
          <p className="min-w-0 flex-1 text-[1.55vw] font-semibold leading-[1.12] text-[#E7D9C8]">Data yang rapi membuat keputusan lebih terarah.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[14vh] w-[22vw]">
        <div className="flex items-center justify-between border-b border-[#F6D9B6]/40 pb-[1vh]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.22em] text-[#F6D9B6]">Yang tersebar</p>
          <span className="text-[1.1vw] font-bold tracking-[0.12em] text-[#F6D9B6]/70">02</span>
        </div>
        <p className="mt-[1.4vh] max-w-[18vw] text-[1.35vw] font-medium leading-[1.2] text-[#FFF9F1]/75">Empat bagian penting. Belum satu cerita.</p>
      </div>

      <div className="absolute right-[6.5vw] top-[30vh] w-[22vw]">
        <div className="flex justify-center">
          <div className="flex h-[11.5vw] w-[11.5vw] flex-col items-center justify-center rounded-full border-[0.2vw] border-[#F6D9B6] bg-[#2A201D] text-center shadow-[0.6vw_0.7vw_0_rgba(42,32,29,0.18)]">
            <span className="text-[2.2vw] font-extrabold leading-[0.95] tracking-[-0.06em]">Kopi<br />Garut</span>
          </div>
        </div>

        <div className="mt-[3vh] grid grid-cols-2 gap-x-[1.2vw] gap-y-[2vh]">
          <div className="border-t border-[#F6D9B6]/60 pt-[0.9vh]">
            <p className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">01</p>
            <p className="mt-[0.35vh] text-[1.25vw] font-extrabold">Asal</p>
            <p className="text-[1vw] text-[#FFF9F1]/70">Wilayah</p>
          </div>
          <div className="border-t border-[#F6D9B6]/60 pt-[0.9vh]">
            <p className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">02</p>
            <p className="mt-[0.35vh] text-[1.25vw] font-extrabold">Pelaku</p>
            <p className="text-[1vw] text-[#FFF9F1]/70">Petani & mitra</p>
          </div>
          <div className="border-t border-[#F6D9B6]/60 pt-[0.9vh]">
            <p className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">03</p>
            <p className="mt-[0.35vh] text-[1.25vw] font-extrabold">Produk</p>
            <p className="text-[1vw] text-[#FFF9F1]/70">Rasa & mutu</p>
          </div>
          <div className="border-t border-[#F6D9B6]/60 pt-[0.9vh]">
            <p className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">04</p>
            <p className="mt-[0.35vh] text-[1.25vw] font-extrabold">Pengalaman</p>
            <p className="text-[1vw] text-[#FFF9F1]/70">Wisata & cerita</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[11vh] right-[6.5vw] flex items-center gap-[0.7vw] text-[1.1vw] font-bold uppercase tracking-[0.16em] text-[#F6D9B6]">
        <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-[#F6D9B6]" />
        Perlu satu alur
      </div>
    </div>
  );
}