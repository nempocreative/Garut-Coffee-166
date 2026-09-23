import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotData() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[37vw] bg-[#2A201D]" />
      <div className="absolute right-[37vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

      <div className="absolute left-[6.5vw] top-[6vh] flex items-center gap-[0.75vw]">
        <img
          src={logo}
          alt="Logo Garut Beans G-Beans"
          crossOrigin="anonymous"
          className="h-[2.45vw] w-[2.45vw] rounded-[0.65vw] border border-[#DFD1C1] bg-[#FFF9F1] object-contain p-[0.12vw]"
        />
        <span className="text-[1.5vw] font-extrabold tracking-[-0.04em]">
          Garut <span className="text-[#A8543B]">Beans</span>
        </span>
      </div>

      <div className="absolute left-[6.5vw] top-[18vh] w-[44vw]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#A8543B]">
          Fondasi baseline
        </p>
        <h2 className="mt-[1.5vh] text-[4.45vw] font-extrabold leading-[0.98] tracking-[-0.075em]">
          <span className="block">Kesepakatan data</span>
          <span className="text-[#A8543B]">yang dikumpulkan.</span>
        </h2>
        <p className="mt-[3vh] max-w-[39vw] text-[1.85vw] leading-[1.18] text-[#806E63]">
          Kumpulkan data yang cukup untuk mengambil keputusan, dengan tujuan dan akses yang dipahami bersama.
        </p>
      </div>

      <div className="absolute bottom-[9vh] left-[6.5vw] grid w-[49vw] grid-cols-2 gap-[0.9vw]">
        <div className="min-h-0 border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            01 · Profil & lokasi
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">
            Identitas kelompok, petani, kebun, dan wilayah.
          </p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            02 · Budidaya
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">
            Aktivitas kebun, proses, dan catatan pendampingan.
          </p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            03 · Panen & lot
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">
            Waktu panen, volume, lot, proses, dan mutu.
          </p>
        </div>
        <div className="min-h-0 border-t-[0.25vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            04 · Program & hasil
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">
            Kunjungan, pelatihan, isu, dan tindak lanjut.
          </p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[25vw] text-[#FFF9F1]">
        <p className="text-[1.3vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">
          Aturan kesepakatan
        </p>
        <p className="mt-[1.2vh] text-[1.65vw] font-semibold leading-[1.15] text-[#E7D9C8]">
          Data dikumpulkan seperlunya, dipahami pemiliknya, dan dipakai untuk perbaikan nyata.
        </p>
        <div className="mt-[2.5vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[1.55vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Tujuan
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Menetapkan baseline dan membaca progres pilot.
            </p>
          </div>
          <div className="border-b border-[#806E63] py-[1.55vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Akses
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Dilihat sesuai peran dan kebutuhan kerja.
            </p>
          </div>
          <div className="py-[1.55vh]">
            <p className="text-[1.05vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Output
            </p>
            <p className="mt-[0.65vh] text-[1.65vw] font-extrabold leading-[1.08]">
              Kamus data dan format baseline yang disepakati.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] right-[6.5vw] text-[1.1vw] font-bold uppercase tracking-[0.12em] text-[#D3A15F]">
        Data cukup · akses jelas · keputusan lebih cepat
      </div>
    </div>
  );
}