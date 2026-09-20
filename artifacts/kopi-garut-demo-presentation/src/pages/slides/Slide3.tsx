import promoImage from '@assets/generated_images/kopi-garut-promo-banner-with-text.jpg';

export default function Slide3() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#18382b] text-[#f8f0e4]">
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#e6b27c]">
        Kopi Garut / 03
      </div>
      <div className="absolute left-[7vw] top-[21vh] w-[40vw]">
        <h2 className="font-display text-[4.55vw] font-bold leading-[1.03] tracking-[-0.04em]">
          Mulai dari beranda yang informatif
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] bg-[#d36f45]" />
        <div className="mt-[5vh] space-y-[2.15vh] text-[1.85vw] leading-[1.15] text-[#e4d6c3]">
          <p>Menemukan produk dan cerita kopi dengan cepat</p>
          <p>Melihat highlight wilayah, petani, program, dan agenda</p>
          <p>Mengakses menu sesuai kebutuhan pengguna</p>
          <p>Berpindah dari inspirasi ke aksi tanpa kehilangan konteks</p>
        </div>
      </div>
      <div className="absolute right-[7vw] top-[12vh] h-[75vh] w-[42vw] overflow-hidden rounded-[1.8vw] border-[0.18vw] border-[#e4b886]/50 bg-[#31533f] p-[0.7vw] shadow-[1.4vw_1.6vw_0_rgba(10,27,19,0.28)]">
        <img
          src={promoImage}
          crossOrigin="anonymous"
          alt="Pengalaman Kopi Garut"
          className="h-full w-full rounded-[1.25vw] object-cover"
        />
        <div className="absolute bottom-[4vh] left-[3vw] rounded-full bg-[#f4eee3] px-[1.5vw] py-[1.1vh] text-[1.5vw] font-bold text-[#18382b]">
          Temukan cerita di setiap pilihan
        </div>
      </div>
    </div>
  );
}