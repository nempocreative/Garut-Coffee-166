import farmerAsep from '@assets/generated_images/farmer-asep-rahmat.jpg';
import farmerDeni from '@assets/generated_images/farmer-deni-suhendar.jpg';
import farmerIis from '@assets/generated_images/farmer-iis-nurhayati.jpg';
import farmerUjang from '@assets/generated_images/farmer-ujang-kusnadi.jpg';
import logo from '@assets/kopi-garut-logo-presentation.png';

export default function Slide4() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[29vw] bg-[#E7D9C8]" />
      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img src={logo} alt="Logo Kopi Garut" className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]" />
        <span className="text-[1.15vw] font-extrabold tracking-[-0.04em]">Kopi <span className="text-[#A8543B]">Garut</span></span>
        <span className="ml-[0.5vw] text-[1.5vw] font-bold tracking-[0.18em] text-[#806E63]">08 / 16</span>
      </div>
      <div className="absolute left-[6.5vw] top-[19vh] w-[39vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">Asal yang terjaga</p>
        <h2 className="mt-[1.6vh] text-[4.6vw] font-extrabold leading-[1.01] tracking-[-0.07em]"><span className="block">Kenali kopi</span><span className="text-[#A8543B]">dari sumbernya.</span></h2>
        <div className="mt-[3vh] h-[0.4vh] w-[6.5vw] rounded-full bg-[#D3A15F]" />
        <div className="mt-[4.4vh] space-y-[1.5vh] text-[1.7vw] font-medium leading-[1.2] text-[#806E63]">
          <p>Jelajahi wilayah penghasil kopi Garut</p>
          <p>Kenali profil petani dan kelompok tani</p>
          <p>Telusuri proses serta standar yang mendukung kualitas</p>
          <p>Bangun kepercayaan melalui informasi yang lebih terbuka</p>
        </div>
      </div>
      <div className="absolute right-[5.5vw] top-[17vh] grid w-[39vw] grid-cols-2 gap-[1vw]">
        <div className="rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={farmerAsep} crossOrigin="anonymous" alt="Petani kopi Asep Rahmat" className="h-[27vh] w-full rounded-[0.55vw] object-cover" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.5vw] font-bold text-[#806E63]">Petani · Garut</p>
        </div>
        <div className="mt-[5vh] rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={farmerDeni} crossOrigin="anonymous" alt="Petani kopi Deni Suhendar" className="h-[27vh] w-full rounded-[0.55vw] object-cover" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.5vw] font-bold text-[#806E63]">Kebun · Cikajang</p>
        </div>
        <div className="rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={farmerIis} crossOrigin="anonymous" alt="Petani kopi Iis Nurhayati" className="h-[27vh] w-full rounded-[0.55vw] object-cover" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.5vw] font-bold text-[#806E63]">Cerita · Petani</p>
        </div>
        <div className="mt-[5vh] rounded-[0.8vw] border border-[#FFF9F1] bg-[#FFF9F1] p-[0.38vw] shadow-[0.4vw_0.55vw_0_rgba(42,32,29,0.1)]">
          <img src={farmerUjang} crossOrigin="anonymous" alt="Petani kopi Ujang Kusnadi" className="h-[27vh] w-full rounded-[0.55vw] object-cover" />
          <p className="px-[0.45vw] py-[0.7vh] text-[1.5vw] font-bold text-[#806E63]">Wilayah · Garut</p>
        </div>
      </div>
      <p className="absolute bottom-[7vh] right-[6.5vw] text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">Wilayah · Petani · Kualitas</p>
    </div>
  );
}