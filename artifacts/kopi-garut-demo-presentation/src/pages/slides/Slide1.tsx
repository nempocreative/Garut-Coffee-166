import heroImage from '@assets/generated_images/kopi-garut-promo-banner-wide-safe.jpg';

export default function Slide1() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#18382b] text-[#f8f0e4]">
      <img
        src={heroImage}
        crossOrigin="anonymous"
        alt="Perkebunan kopi Garut"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,25,0.92)_0%,rgba(18,48,35,0.74)_43%,rgba(18,48,35,0.1)_100%)]" />
      <div className="absolute left-[7vw] top-[7vh] flex items-center gap-[1vw] text-[1.5vw] font-semibold uppercase tracking-[0.25em] text-[#e6b27c]">
        <span className="h-[0.65vw] w-[0.65vw] rounded-full bg-[#e6b27c]" />
        Kopi Garut
      </div>
      <div className="absolute bottom-[12vh] left-[7vw] w-[57vw]">
        <p className="mb-[2.5vh] text-[1.5vw] font-semibold uppercase tracking-[0.22em] text-[#f2c79c]">
          Demo platform aplikasi
        </p>
        <h1 className="font-display text-[7vw] font-bold leading-[0.96] tracking-[-0.055em] text-[#fff7ec]">
          Kopi Garut
        </h1>
        <div className="mt-[3vh] h-[0.35vh] w-[8vw] bg-[#d36f45]" />
        <p className="mt-[2.5vh] max-w-[42vw] text-[2.25vw] font-medium leading-[1.18] text-[#f8eadb]">
          Platform digital untuk menghubungkan asal kopi, petani, mitra, dan pengalaman Garut.
        </p>
      </div>
      <div className="absolute bottom-[6vh] right-[7vw] text-right text-[1.5vw] uppercase tracking-[0.18em] text-[#f2c79c]">
        01 / 08
      </div>
    </div>
  );
}