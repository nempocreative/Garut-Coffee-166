import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Coffee,
  Home,
  Package,
  ScanLine,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import "./_group.css";

export function Current() {
  const setLocation = (_path: string) => undefined;

  return (
    <div className="account-current-frame">
      <nav className="current-top-nav" aria-label="Navigasi halaman">
        <div className="current-top-brand">
          <img src="/__mockup/images/kopi-garut-logo.png" alt="" />
          <span>
            <strong>Garut Beans</strong>
            <small>G-BEANS · SPECIALTY COFFEE</small>
          </span>
        </div>
        <div className="current-top-links">
          <button><Home size={16} />Beranda</button>
          <button><Coffee size={16} />Kopi</button>
          <button><Package size={16} />Karya kopi</button>
          <button><ScanLine size={16} />Jejak</button>
          <button><ClipboardList size={16} />Pesanan</button>
          <button className="active" aria-current="page"><UserRound size={16} />Akun</button>
        </div>
      </nav>

      <div className="current-page-content">
        <main className="account-page">
          <header className="subpage-head">
            <button className="back-button" onClick={() => setLocation("/")} aria-label="Kembali">
              <ArrowLeft size={18} />
            </button>
            <div className="subpage-title-wrap"><h1 className="page-title">Akun</h1></div>
            <div className="header-actions">
              <button className="icon-orb" onClick={() => setLocation("/")} aria-label="Kembali ke beranda">
                <img className="header-home-image" src="/__mockup/images/home-coffee-house.png" alt="" />
              </button>
              <button className="icon-orb" onClick={() => setLocation("/cart")} aria-label="Buka keranjang">
                <ShoppingCart size={23} />
              </button>
            </div>
          </header>

          <section className="account-login-layout">
            <div className="account-login-visual">
              <div className="account-brand-line">
                <div className="account-brand-mark"><img src="/__mockup/images/kopi-garut-logo.png" alt="" /></div>
                <div><strong>Garut <em>Beans</em></strong><small>G-BEANS · SPECIALTY COFFEE</small></div>
              </div>
              <div className="account-visual-copy">
                <span>RUANG PERSONAL</span>
                <h1>Ritual yang<br /><em>punya cerita.</em></h1>
                <p>Kenali kopi, simpan pilihanmu, dan tetap dekat dengan orang-orang di balik setiap cangkir.</p>
              </div>
              <div className="account-visual-foot"><span>GARUT, JAWA BARAT</span><span>01 / 03</span></div>
            </div>
            <div className="account-login-form">
              <span className="section-kicker">AKUN G-BEANS</span>
              <h2>Masuk ke ruangmu.</h2>
              <p className="account-form-intro">Pilih akses untuk melanjutkan pengalaman Garut Beans.</p>
              <button className="account-login-button" onClick={() => setLocation("/login?returnTo=/profile")}>
                Masuk ke akun <ArrowRight size={16} />
              </button>
              <div className="account-role-line"><span>PILIHAN AKSES</span><strong>Pembeli · Petani · Penyuluh</strong></div>
              <div className="account-form-note"><span>Jelajah tetap terbuka</span><p>Katalog dan cerita kopi dapat diakses tanpa masuk akun.</p></div>
            </div>
          </section>
        </main>
      </div>

      <div className="current-floating game" aria-hidden="true"><img src="/__mockup/images/mini-games-icon.webp" alt="" /></div>
      <div className="current-floating chat" aria-hidden="true"><img src="/__mockup/images/faq-live-chat.webp" alt="" /></div>
      <nav className="current-bottom-nav" aria-label="Navigasi utama">
        <button><span className="current-bottom-icon"><Home size={20} /></span><span>Beranda</span></button>
        <button><span className="current-bottom-icon"><Coffee size={20} /></span><span>Kopi</span></button>
        <button className="center"><span className="current-bottom-icon"><ScanLine size={21} /></span><span>Jejak</span></button>
        <button><span className="current-bottom-icon"><Package size={20} /></span><span>Pesanan</span></button>
        <button className="active"><span className="current-bottom-icon"><UserRound size={20} /></span><span>Akun</span></button>
      </nav>
    </div>
  );
}