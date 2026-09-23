import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide2Context() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#2A201D] text-[#FFF9F1]">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#A8543B]" />
      <div className="absolute right-[31.5vw] top-0 h-full w-[0.18vw] bg-[#D3A15F]/50" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Garut Beans G-Beans" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#806E63] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">Garut <span className="text-[#D3A15F]">Beans</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#E7D9C8]">07 / 28</span>
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

      <div className="absolute bottom-[9vh] left-[6.5vw] grid w-[55vw] grid-cols-3 gap-[1vw]">
        <div className="min-h-[18vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.35vw] py-[1.15vw]">
          <div className="flex items-end justify-between">
            <p className="text-[2.5vw] font-extrabold leading-none text-[#D3A15F]">01</p>
            <span className="text-[1.05vw] font-bold uppercase tracking-[0.16em] text-[#B99C8E]">Asal</span>
          </div>
          <p className="mt-[2.2vh] text-[1.62vw] font-bold leading-[1.12]">Asal dan kualitas belum selalu terlihat oleh pembeli.</p>
        </div>
        <div className="min-h-[18vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.35vw] py-[1.15vw]">
          <div className="flex items-end justify-between">
            <p className="text-[2.5vw] font-extrabold leading-none text-[#D3A15F]">02</p>
            <span className="text-[1.05vw] font-bold uppercase tracking-[0.16em] text-[#B99C8E]">Akses</span>
          </div>
          <p className="mt-[2.2vh] text-[1.62vw] font-bold leading-[1.12]">Petani dan mitra membutuhkan akses informasi yang sama.</p>
        </div>
        <div className="min-h-[18vh] border-t-[0.25vw] border-[#D3A15F] bg-[#3A2B27] px-[1.35vw] py-[1.15vw]">
          <div className="flex items-end justify-between">
            <p className="text-[2.5vw] font-extrabold leading-none text-[#D3A15F]">03</p>
            <span className="text-[1.05vw] font-bold uppercase tracking-[0.16em] text-[#B99C8E]">Data</span>
          </div>
          <p className="mt-[2.2vh] text-[1.62vw] font-bold leading-[1.12]">Data yang rapi membuat keputusan lebih terarah.</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[14vh] w-[22vw]">
        <div className="flex items-center justify-between border-b border-[#F6D9B6]/40 pb-[1vh]">
          <p className="text-[1.2vw] font-extrabold uppercase tracking-[0.22em] text-[#F6D9B6]">Yang tersebar</p>
          <span className="text-[1.1vw] font-bold tracking-[0.12em] text-[#F6D9B6]/70">02</span>
        </div>
        <p className="mt-[1.4vh] max-w-[18vw] text-[1.35vw] font-medium leading-[1.2] text-[#FFF9F1]/75">Empat bagian penting. Belum satu cerita.</p>
      </div>

      <div className="absolute right-[9vw] top-[33vh] h-[27vw] w-[23vw]">
        <div className="absolute left-[5.2vw] top-[5.8vw] flex h-[12vw] w-[12vw] flex-col items-center justify-center rounded-full border-[0.2vw] border-[#F6D9B6] bg-[#2A201D] text-center shadow-[0.6vw_0.7vw_0_rgba(42,32,29,0.18)]">
          <span className="text-[1vw] font-bold uppercase tracking-[0.2em] text-[#D3A15F]">Pusat cerita</span>
          <span className="mt-[0.8vh] text-[2.25vw] font-extrabold leading-[0.95] tracking-[-0.06em]">Kopi<br />Garut</span>
        </div>

        <div className="absolute left-0 top-0 flex w-[7vw] flex-col">
          <span className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">01</span>
          <span className="mt-[0.35vh] text-[1.25vw] font-extrabold">Asal</span>
          <span className="text-[1vw] text-[#FFF9F1]/70">wilayah</span>
        </div>
        <div className="absolute right-0 top-[3vw] flex w-[7vw] flex-col text-right">
          <span className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">02</span>
          <span className="mt-[0.35vh] text-[1.25vw] font-extrabold">Pelaku</span>
          <span className="text-[1vw] text-[#FFF9F1]/70">petani & mitra</span>
        </div>
        <div className="absolute bottom-[1vw] left-[0.5vw] flex w-[7vw] flex-col">
          <span className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">03</span>
          <span className="mt-[0.35vh] text-[1.25vw] font-extrabold">Produk</span>
          <span className="text-[1vw] text-[#FFF9F1]/70">rasa & mutu</span>
        </div>
        <div className="absolute bottom-0 right-0 flex w-[7vw] flex-col text-right">
          <span className="text-[1vw] font-bold uppercase tracking-[0.18em] text-[#F6D9B6]">04</span>
          <span className="mt-[0.35vh] text-[1.25vw] font-extrabold">Pengalaman</span>
          <span className="text-[1vw] text-[#FFF9F1]/70">wisata & cerita</span>
        </div>
      </div>

      <div className="absolute bottom-[7vh] right-[6.5vw] flex items-center gap-[0.7vw] text-[1.1vw] font-bold uppercase tracking-[0.16em] text-[#F6D9B6]">
        <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-[#F6D9B6]" />
        Perlu satu alur
      </div>
    </div>
  );
}