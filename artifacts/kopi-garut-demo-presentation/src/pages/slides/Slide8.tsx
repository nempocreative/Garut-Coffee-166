import closingImage from '@assets/generated_images/kopi-garut-promo-banner.jpg';

export default function Slide8() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#18382b] text-[#f8f0e4]">
      <img
        src={closingImage}
        crossOrigin="anonymous"
        alt="Kopi Garut"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,30,21,0.94)_0%,rgba(10,30,21,0.68)_46%,rgba(10,30,21,0.24)_100%)]" />
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#f2c79c]">
        Kopi Garut / 08
      </div>
      <div className="absolute bottom-[13vh] left-[7vw] w-[67vw]">
        <p className="mb-[2.2vh] text-[1.5vw] font-semibold uppercase tracking-[0.22em] text-[#f2c79c]">
          Demo singkat, dampak yang berkelanjutan
        </p>
        <h2 className="font-display text-[5.5vw] font-bold leading-[0.99] tracking-[-0.05em] text-[#fff7ec]">
          Satu ruang untuk mengenal, menemukan, dan terhubung
        </h2>
        <p className="mt-[3vh] max-w-[57vw] text-[2vw] leading-[1.15] text-[#f4e5d3]">
          Pengalaman digital yang mendekatkan kopi Garut kepada lebih banyak orang
        </p>
        <div className="mt-[3vh] h-[0.35vh] w-[8vw] bg-[#d36f45]" />
        <p className="mt-[2.5vh] font-display text-[2.35vw] font-bold text-[#e6b27c]">
          Kopi Garut — tumbuh bersama dari kebun hingga pelanggan
        </p>
      </div>
    </div>
  );
}