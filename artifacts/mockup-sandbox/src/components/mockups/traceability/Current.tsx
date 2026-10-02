import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Coffee,
  Home,
  Map,
  MapPin,
  Package,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { coffeeCatalog, farmers } from '@workspace/kopi-garut-shared';
import './_group.css';
import './Current.css';

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

const traceabilityLot = {
  id: 'KG-26001',
  coffeeId: 'papandayan-honey',
  variety: 'Arabika',
  region: 'Papandayan',
  weightKg: 350,
  process: 'Madu',
  harvestDate: '12 September 2026',
  productionDate: '20 September 2026',
  storyTitle: 'Satu cangkir, banyak kehidupan.',
  story:
    'Di lereng Papandayan, kopi dipetik saat kulitnya merah penuh oleh keluarga tani yang merawat kebun dari musim ke musim. Setelah melalui proses madu dan pengeringan perlahan, biji ini disangrai ringan–sedang agar rasa lemon, gula merah, dan melatinya tetap terasa jernih. Bagi mereka, kopi bukan sekadar panen: kopi adalah pekerjaan yang menghidupkan rumah, menjaga kebun tetap terawat, dan membuka kesempatan bagi tangan-tangan lain untuk ikut bekerja.',
  impact:
    'Saat kamu memilih lot ini, kamu ikut menjaga pekerjaan di kebun, rumah pengeringan, proses sortir, hingga pengiriman. Jadi, yang sampai ke cangkir bukan hanya rasa—tetapi juga kesempatan untuk tumbuh bersama.',
  journey: [
    {
      label: 'Kebun',
      title: 'Dipetik saat matang',
      detail: 'Buah merah dipilih satu per satu di ketinggian 1.650 mdpl.',
    },
    {
      label: 'Proses',
      title: 'Dikeringkan dengan sabar',
      detail: 'Lapisan madu dijaga selama pengeringan untuk membangun rasa manis.',
    },
    {
      label: 'Cangkir',
      title: 'Diseduh untuk dinikmati',
      detail: 'Sangrai ringan–sedang menjaga akhir rasa tetap bersih dan hangat.',
    },
  ],
} as const;

const coffee = {
  ...coffeeCatalog[0],
  notes: coffeeCatalog[0].tastingNotes,
};
const farmer = farmers.find((item) => item.group === coffee.farmerGroup) ?? farmers[0];

function DesktopNavigation() {
  return (
    <nav className="trc-desktop-nav" aria-label="Navigasi halaman">
      <div className="trc-desktop-nav-inner">
        <button className="trc-desktop-brand" aria-label="Garut Beans">
          <img src={asset('kopi-garut-logo.png')} alt="" />
          <span>
            <strong>Garut Beans</strong>
            <small>G-BEANS · SPECIALTY COFFEE</small>
          </span>
        </button>
        <div className="trc-desktop-links">
          <button><Home size={17} />Beranda</button>
          <button><Coffee size={17} />Kopi</button>
          <button><Package size={17} />Karya kopi</button>
          <button className="active" aria-current="page"><ScanLine size={17} />Jejak</button>
          <button><Package size={17} />Pesanan</button>
          <button><Users size={17} />Akun</button>
        </div>
      </div>
    </nav>
  );
}

function PageHeader() {
  return (
    <header className="trc-subpage-head">
      <button className="trc-back-button" aria-label="Kembali"><ArrowLeft size={18} /></button>
      <div className="trc-subpage-title-wrap">
        <h1>Jejak produk</h1>
      </div>
      <div className="trc-header-actions">
        <button className="trc-icon-orb" aria-label="Kembali ke beranda"><Home size={20} /></button>
        <button className="trc-icon-orb" aria-label="Buka keranjang"><ShoppingCart size={20} /></button>
      </div>
    </header>
  );
}

function BottomNavigation() {
  return (
    <nav className="trc-bottom-nav" aria-label="Navigasi utama">
      <button><span><Home size={20} /></span><span>Beranda</span></button>
      <button><span><Coffee size={20} /></span><span>Kopi</span></button>
      <button className="active center" aria-current="page"><span><ScanLine size={23} /></span><span>Jejak</span></button>
      <button><span><Package size={20} /></span><span>Pesanan</span></button>
      <button><span><Users size={20} /></span><span>Akun</span></button>
    </nav>
  );
}

export function Current() {
  const [scanned, setScanned] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lotId'),
  );
  const originRows = [
    { icon: Map, label: 'ASAL KEBUN', value: farmer.location, meta: `Wilayah ${traceabilityLot.region}, Garut · ${coffee.altitude}` },
    { icon: Users, label: 'PETANI PRODUSEN', value: farmer.name, meta: farmer.group },
    { icon: Coffee, label: 'JENIS KOPI', value: farmer.coffeeType, meta: `${traceabilityLot.variety} · Proses ${traceabilityLot.process}` },
    { icon: CalendarDays, label: 'TANGGAL PANEN', value: traceabilityLot.harvestDate, meta: 'Buah kopi dipetik saat matang' },
    { icon: Package, label: 'TANGGAL PRODUKSI', value: traceabilityLot.productionDate, meta: 'Lot disiapkan dan dikemas untuk dijual' },
  ];

  return (
    <div className="trc-current">
      <DesktopNavigation />
      <main className="trc-page-shell">
        <PageHeader />
        <section className="trace-hero">
          <div className="trace-hero-top">
            <div className="qr-mark"><ScanLine size={42} strokeWidth={1.7} /></div>
            <div className="trace-hero-badge"><span /> TERLACAK</div>
          </div>
          <span className="section-kicker">SCAN QR KEMASAN</span>
          <h1>Satu scan, satu cerita utuh.</h1>
          <p>Kenali kebun, proses, dan rasa yang akhirnya sampai di cangkir.</p>
          <button className="primary-button trace-scan-button" onClick={() => setScanned(true)} data-testid="button-trace-scan">
            {scanned ? <CheckCircle2 size={16} /> : <ScanLine size={16} />}
            {scanned ? 'Cerita terbuka' : 'Buka cerita kopi'}
          </button>
        </section>
        {scanned && (
          <div className="trace-result">
            <div className="success-banner">
              <span className="trace-success-icon"><CheckCircle2 size={17} /></span>
              <div><span className="section-kicker">SCAN BERHASIL</span><strong>Kemasan ini punya cerita.</strong></div>
              <code>{traceabilityLot.id}</code>
            </div>

            <section className="trace-photo">
              <img src={asset(farmer.image)} alt={farmer.name} />
              <div className="trace-photo-shade" />
              <div className="trace-photo-copy"><span className="section-kicker">PETANI PRODUSEN</span><h2>{farmer.name}</h2></div>
              <span className="status-chip"><ShieldCheck size={13} /> TERVERIFIKASI</span>
            </section>

            <div className="trace-result-copy">
              <span className="section-kicker">LOT {traceabilityLot.id}</span>
              <h2>{coffee.name}</h2>
              <p>{traceabilityLot.variety} · {traceabilityLot.process} · {traceabilityLot.weightKg} kg</p>
            </div>

            <section className="trace-origin-card">
              <div className="trace-card-heading"><span className="trace-card-icon"><MapPin size={17} /></span><div><span className="section-kicker">ASAL & PRODUSEN</span><h2>Kenali kebun dan petaninya</h2></div></div>
              {originRows.map(({ icon: Icon, label, value, meta }) => (
                <div className="trace-origin-row" key={label}>
                  <span className="trace-row-icon"><Icon size={15} /></span>
                  <div><small>{label}</small><strong>{value}</strong><em>{meta}</em></div>
                </div>
              ))}
            </section>

            <section className="trace-story-card">
              <div className="trace-story-heading"><span className="trace-story-icon"><Coffee size={18} /></span><span className="section-kicker">CERITA DI BALIK CANGKIR</span></div>
              <h2>{traceabilityLot.storyTitle}</h2>
              <p>{traceabilityLot.story}</p>
              <blockquote>“Yang menghangatkan cangkir ini bukan hanya kopi, tetapi juga kehidupan yang dijaganya.”</blockquote>
              <div className="trace-impact"><span><BriefcaseBusiness size={16} /></span><div><small>DAMPAK DI BALIK RASA</small><strong>{traceabilityLot.impact}</strong></div></div>
            </section>

            <div className="trace-section-heading"><div><span className="section-kicker">PERJALANAN LOT</span><h2>Dari kebun sampai cangkir</h2></div><span>3 tahap</span></div>
            <section className="trace-timeline">
              {traceabilityLot.journey.map((step, index) => (
                <div className="trace-timeline-row" key={step.label}>
                  <div className="trace-timeline-rail"><span className={index === traceabilityLot.journey.length - 1 ? 'final' : ''}>{index + 1}</span>{index < traceabilityLot.journey.length - 1 && <i />}</div>
                  <div><small>{step.label.toUpperCase()}</small><strong>{step.title}</strong><p>{step.detail}</p></div>
                </div>
              ))}
            </section>

            <section className="trace-tasting-card">
              <div className="trace-tasting-top"><div><span className="section-kicker">SAAT KAMU MENIKMATINYA</span><h2>Yang terasa di cangkir</h2></div><Coffee size={25} /></div>
              <p>Rasa cerah lemon Meyer membuka tegukan, lalu gula merah dan melati tinggal lebih lama di akhir.</p>
              <div className="taste-list">{coffee.notes.map((note) => <span className="taste" key={note}>{note}</span>)}</div>
            </section>

            <section className="trace-final-card"><div><span className="section-kicker">SIAP MENYEDUH?</span><h2>Bawa cerita ini ke rumah.</h2><p>Paling nikmat sebagai {coffee.recommendedBrew.toLowerCase()}.</p></div><button className="secondary-button" data-testid="button-trace-product">Lihat kopi <ArrowRight size={14} /></button></section>
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
}