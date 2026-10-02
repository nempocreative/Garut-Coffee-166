import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  GraduationCap,
  House,
  MapPin,
  Sprout,
  UserRound,
  UsersRound,
} from "lucide-react";
import "./_group.css";
import "./Refined.css";

export function Refined() {
  return (
    <div className="refined-account">
      <div className="ra-shell">
        <header className="ra-header">
          <a className="ra-brand" href="#/beranda" aria-label="Garut Beans — beranda">
            <span className="ra-brand-mark">
              <img src="/__mockup/images/kopi-garut-logo.png" alt="" />
            </span>
            <span className="ra-brand-name">
              <strong>Garut Beans</strong>
              <small>G-BEANS · SPECIALTY COFFEE</small>
            </span>
          </a>

          <nav className="ra-nav" aria-label="Navigasi utama">
            <a href="#/beranda"><House size={15} />Beranda</a>
            <a href="#/kopi"><Coffee size={15} />Kopi</a>
            <a href="#/jejak"><MapPin size={15} />Jejak</a>
            <a className="ra-nav-account" href="#/akun" aria-current="page">
              <UserRound size={15} />Akun
            </a>
          </nav>
        </header>

        <main className="ra-page">
          <div className="ra-breadcrumb" aria-label="Lokasi halaman">
            Garut Beans <i /> Ruang komunitas <i /> Akun
          </div>

          <section className="ra-hero" aria-labelledby="ra-title">
            <div className="ra-copy">
              <span className="ra-eyebrow">Tempat cerita kopi bertemu</span>
              <h1 id="ra-title">
                Satu akun.
                <br />
                Banyak cara <em>tumbuh.</em>
              </h1>
              <p>
                Masuk ke komunitas kopi spesialti Garut—ruang untuk menemukan
                pilihanmu, berbagi pengetahuan, dan tumbuh bersama.
              </p>

              <div className="ra-landscape" aria-label="Ilustrasi kontur perbukitan Garut">
                <span className="ra-landscape-label">DATARAN TINGGI GARUT · JAWA BARAT</span>
                <span className="ra-landscape-mark"><MapPin size={13} /></span>
              </div>
              <div className="ra-location"><span /> KOPI DARI TANAH YANG KAMI SEBUT RUMAH</div>
            </div>

            <aside className="ra-access" aria-labelledby="ra-access-title">
              <div className="ra-access-top">
                <span className="ra-access-kicker">AKUN G-BEANS</span>
                <span className="ra-guest-badge"><span /> Akses tamu</span>
              </div>
              <h2 id="ra-access-title">Temukan ruangmu.</h2>
              <p className="ra-access-intro">
                Pilih akses sesuai peranmu di perjalanan kopi Garut.
              </p>

              <div className="ra-roles" aria-label="Pilihan akses komunitas">
                <div className="ra-role">
                  <span className="ra-role-icon"><UsersRound size={17} /></span>
                  <span>
                    <strong>Pembeli</strong>
                    <small>Temukan kopi untuk dinikmati</small>
                  </span>
                  <span className="ra-role-number">01</span>
                </div>
                <div className="ra-role">
                  <span className="ra-role-icon"><Sprout size={17} /></span>
                  <span>
                    <strong>Petani</strong>
                    <small>Kenalkan hasil panenmu</small>
                  </span>
                  <span className="ra-role-number">02</span>
                </div>
                <div className="ra-role">
                  <span className="ra-role-icon"><GraduationCap size={18} /></span>
                  <span>
                    <strong>Penyuluh pertanian</strong>
                    <small>Bagikan ilmu, tumbuhkan potensi</small>
                  </span>
                  <span className="ra-role-number">03</span>
                </div>
              </div>

              <a className="ra-primary" href="#/login?returnTo=/profile">
                <span>Masuk ke akun</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <div className="ra-card-foot">
                <span>Belum bergabung?</span>
                <strong>Semua peran punya tempat di sini.</strong>
              </div>
            </aside>
          </section>

          <section className="ra-browse" aria-label="Jelajah tanpa masuk">
            <div className="ra-browse-copy">
              <span className="ra-browse-icon"><Coffee size={18} /></span>
              <span>
                <strong>Belum ingin masuk? Tak apa.</strong>
                <p>Katalog dan cerita kopi tetap terbuka untuk dijelajahi.</p>
              </span>
            </div>
            <a className="ra-browse-link" href="#/kopi">
              Jelajahi kopi <ArrowUpRight size={16} />
            </a>
          </section>

          <footer className="ra-footer">
            <span>Garut Beans · G-BEANS</span>
            <span>Dirawat bersama, tumbuh dari Garut</span>
          </footer>
        </main>
      </div>
    </div>
  );
}