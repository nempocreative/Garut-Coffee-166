import coffeeImage from '@assets/Coffee_bean_1789657246273.png';

export default function Slide5() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e9dfcf] text-[#18382b]">
      <div className="absolute left-0 top-0 h-full w-[43vw] bg-[#18382b]" />
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#e6b27c]">
        Kopi Garut / 05
      </div>
      <div className="absolute left-[7vw] top-[22vh] w-[32vw] text-[#f8f0e4]">
        <h2 className="font-display text-[5vw] font-bold leading-[1] tracking-[-0.05em]">
          Katalog yang membawa cerita
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] bg-[#d36f45]" />
        <p className="mt-[4vh] max-w-[27vw] text-[1.75vw] leading-[1.17] text-[#e4d6c3]">
          Pilihan produk yang tetap dekat dengan asal, karakter, dan detailnya.
        </p>
      </div>
      <div className="absolute right-[7vw] top-[15vh] w-[43vw]">
        <div className="flex items-end gap-[1.2vw]">
          <div className="h-[48vh] w-[15vw] rotate-[-5deg] overflow-hidden rounded-[1.2vw] bg-[#c49462] shadow-[0.9vw_1vw_0_rgba(79,55,34,0.15)]">
            <img src={coffeeImage} crossOrigin="anonymous" alt="Biji kopi natural" className="h-full w-full object-cover" />
          </div>
          <div className="w-[24vw] pb-[2vh]">
            <div className="border-b-[0.15vw] border-[#bcae99] pb-[2vh]">
              <p className="text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-[#a45e3a]">Katalog produk</p>
              <p className="mt-[1.5vh] font-display text-[3.1vw] font-bold leading-[1.02]">Dari kebun, untuk pilihanmu.</p>
            </div>
            <div className="mt-[3vh] space-y-[2.2vh] text-[1.75vw] font-medium leading-[1.15]">
              <p>Lihat pilihan kopi dan produk turunannya</p>
              <p>Baca karakter, asal, dan detail produk</p>
              <p>Simpan pilihan favorit untuk dilihat kembali</p>
              <p>Lanjutkan ke keranjang dan proses pesanan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}