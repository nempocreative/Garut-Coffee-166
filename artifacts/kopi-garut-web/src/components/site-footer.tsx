type SiteFooterProps = {
  onNavigate: (path: string) => void;
};

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer id="site-footer" className="gb-footer" data-testid="site-footer">
      <div className="gb-footer-inner">
        <div className="gb-footer-brand">
          <button className="gb-footer-logo" onClick={() => onNavigate('/')} aria-label="Kembali ke Beranda">
            <img src={asset('kopi-garut-logo.png')} alt="Logo Garut Beans" />
          </button>
          <div>
            <div className="gb-footer-name"><span>Garut</span> <strong>Beans</strong></div>
            <p>Kopi spesialti dari Garut.</p>
          </div>
        </div>
      </div>
      <div className="gb-footer-bottom">
        <span>© 2026 Garut Beans · Garut, Jawa Barat</span>
      </div>
    </footer>
  );
}