import logo from '@assets/kopi-garut-logo-presentation.png';

export default function SlidePilotData() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#F6F0E8] text-[#2A201D]">
      <div className="absolute right-0 top-0 h-full w-[34vw] bg-[#2A201D]" />
      <div className="absolute right-[34vw] top-0 h-full w-[0.2vw] bg-[#D3A15F]" />

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

      <div className="absolute left-[6.5vw] top-[17vh] w-[45vw]">
        <p className="text-[1.35vw] font-extrabold uppercase tracking-[0.24em] text-[#A8543B]">
          Fondasi baseline / 32
        </p>
        <h2 className="mt-[2vh] text-[5vw] font-extrabold leading-[0.9] tracking-[-0.085em]">
          Data yang
          <span className="block text-[#A8543B]">cukup dan jelas.</span>
        </h2>
        <p className="mt-[3.8vh] max-w-[36vw] text-[1.8vw] leading-[1.18] text-[#806E63]">
          Kumpulkan yang dibutuhkan untuk mengambil keputusan, dengan tujuan dan akses yang dipahami bersama.
        </p>
      </div>

      <div className="absolute left-[6.5vw] top-[57vh] grid w-[49vw] grid-cols-2 gap-x-[1vw] gap-y-[1.2vh]">
        <div className="min-h-0 border-l-[0.22vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1.1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            01 · Profil & lokasi
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">Kelompok · petani · kebun · wilayah</p>
        </div>
        <div className="min-h-0 border-l-[0.22vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1.1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            02 · Budidaya
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">Aktivitas kebun · proses · pendampingan</p>
        </div>
        <div className="min-h-0 border-l-[0.22vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1.1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            03 · Panen & lot
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">Waktu panen · volume · lot · mutu</p>
        </div>
        <div className="min-h-0 border-l-[0.22vw] border-[#A8543B] bg-[#E7D9C8] px-[1.1vw] py-[1.1vw]">
          <p className="text-[1.1vw] font-extrabold uppercase tracking-[0.16em] text-[#A8543B]">
            04 · Program & hasil
          </p>
          <p className="mt-[1vh] text-[1.5vw] font-extrabold leading-[1.08]">Kunjungan · pelatihan · isu · tindak lanjut</p>
        </div>
      </div>

      <div className="absolute right-[6.5vw] top-[18vh] w-[23vw] text-[#FFF9F1]">
        <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.2em] text-[#D3A15F]">
          Aturan kesepakatan
        </p>
        <p className="mt-[2.5vh] text-[1.75vw] font-semibold leading-[1.14] text-[#E7D9C8]">
          Data seperlunya, pemiliknya paham, perbaikannya nyata.
        </p>
        <div className="mt-[2.5vh] border-t border-[#806E63]">
          <div className="border-b border-[#806E63] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Tujuan
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Baseline & progres pilot
            </p>
          </div>
          <div className="border-b border-[#806E63] py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Akses
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Sesuai peran dan kebutuhan kerja
            </p>
          </div>
          <div className="py-[1.5vh]">
            <p className="text-[1.5vw] font-extrabold uppercase tracking-[0.16em] text-[#D3A15F]">
              Output
            </p>
            <p className="mt-[0.65vh] text-[1.85vw] font-extrabold leading-[1.08]">
              Kamus data & format baseline
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}