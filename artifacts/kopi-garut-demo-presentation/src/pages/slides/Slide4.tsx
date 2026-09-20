import farmerAsep from '@assets/generated_images/farmer-asep-rahmat.jpg';
import farmerDeni from '@assets/generated_images/farmer-deni-suhendar.jpg';
import farmerIis from '@assets/generated_images/farmer-iis-nurhayati.jpg';
import farmerUjang from '@assets/generated_images/farmer-ujang-kusnadi.jpg';

export default function Slide4() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f4eee3] text-[#18382b]">
      <div className="absolute right-0 top-0 h-full w-[31vw] bg-[#e5d7c1]" />
      <div className="absolute left-[7vw] top-[8vh] text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#a45e3a]">
        Kopi Garut / 04
      </div>
      <div className="absolute left-[7vw] top-[20vh] w-[39vw]">
        <h2 className="font-display text-[4.6vw] font-bold leading-[1.02] tracking-[-0.04em]">
          Kenali kopi dari sumbernya
        </h2>
        <div className="mt-[3vh] h-[0.4vh] w-[7vw] bg-[#d36f45]" />
        <div className="mt-[5vh] space-y-[2.2vh] text-[1.9vw] font-medium leading-[1.13]">
          <p>Jelajahi wilayah penghasil kopi Garut</p>
          <p>Kenali profil petani dan kelompok tani</p>
          <p>Telusuri proses serta standar yang mendukung kualitas</p>
          <p>Bangun kepercayaan melalui informasi yang lebih terbuka</p>
        </div>
      </div>
      <div className="absolute right-[6vw] top-[16vh] grid w-[38vw] grid-cols-2 gap-[1.1vw]">
        <img src={farmerAsep} crossOrigin="anonymous" alt="Petani kopi Asep Rahmat" className="h-[27vh] w-full rounded-[1.2vw] object-cover" />
        <img src={farmerDeni} crossOrigin="anonymous" alt="Petani kopi Deni Suhendar" className="mt-[6vh] h-[27vh] w-full rounded-[1.2vw] object-cover" />
        <img src={farmerIis} crossOrigin="anonymous" alt="Petani kopi Iis Nurhayati" className="h-[27vh] w-full rounded-[1.2vw] object-cover" />
        <img src={farmerUjang} crossOrigin="anonymous" alt="Petani kopi Ujang Kusnadi" className="mt-[6vh] h-[27vh] w-full rounded-[1.2vw] object-cover" />
      </div>
      <div className="absolute bottom-[8vh] right-[7vw] text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-[#a45e3a]">
        Wilayah • Petani • Kualitas
      </div>
    </div>
  );
}