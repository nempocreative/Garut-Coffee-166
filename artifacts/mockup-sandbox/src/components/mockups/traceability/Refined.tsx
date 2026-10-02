import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Coffee,
  Map,
  MapPin,
  Package,
  ScanLine,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { coffeeCatalog, farmers } from '@workspace/kopi-garut-shared';
import './_group.css';
import './Refined.css';

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
    { label: 'Kebun', title: 'Dipetik saat matang', detail: 'Buah merah dipilih satu per satu di ketinggian 1.650 mdpl.' },
    { label: 'Proses', title: 'Dikeringkan dengan sabar', detail: 'Lapisan madu dijaga selama pengeringan untuk membangun rasa manis.' },
    { label: 'Cangkir', title: 'Diseduh untuk dinikmati', detail: 'Sangrai ringan–sedang menjaga akhir rasa tetap bersih dan hangat.' },
  ],
} as const;

const coffee = { ...coffeeCatalog[0], notes: coffeeCatalog[0].tastingNotes };
const farmer = farmers.find((item) => item.group === coffee.farmerGroup) ?? farmers[0];
const asset = (filename: string) => `/__mockup/assets/${filename}`;

const originRows = [
  { icon: Map, label: 'ASAL KEBUN', value: farmer.location, meta: `Wilayah ${traceabilityLot.region}, Garut · ${coffee.altitude}` },
  { icon: Users, label: 'PETANI PRODUSEN', value: farmer.name, meta: farmer.group },
  { icon: Coffee, label: 'JENIS KOPI', value: farmer.coffeeType, meta: `${traceabilityLot.variety} · Proses ${traceabilityLot.process}` },
  { icon: CalendarDays, label: 'TANGGAL PANEN', value: traceabilityLot.harvestDate, meta: 'Buah kopi dipetik saat matang' },
  { icon: Package, label: 'TANGGAL PRODUKSI', value: traceabilityLot.productionDate, meta: 'Lot disiapkan dan dikemas untuk dijual' },
];

function BrandHeader() {
  return (
    <header className="rf-header">
      <div className="rf-brand">
        <img src={asset('kopi-garut-logo.png')} alt="Garut Beans" />
        <span><strong>Garut Beans</strong><small>G-BEANS · SPECIALTY COFFEE</small></span>
      </div>
      <div className="rf-current-page"><span className="rf-live-dot" />JEJAK PRODUK</div>
    </header>
  );
}

function OriginDetails() {
  return (
    <section className="rf-origin rf-card">
      <div className="rf-section-title">
        <span className="rf-icon-tile"><MapPin size={18} /></span>
        <div><span className="rf-eyebrow">ASAL & PRODUSEN</span><h2>Kenali kebun dan petaninya</h2></div>
      </div>
      <div className="rf-origin-list">
        {originRows.map(({ icon: Icon, label, value, meta }) => (
          <div className="rf-origin-row" key={label}>
            <span className="rf-row-icon"><Icon size={15} /></span>
            <div><small>{label}</small><strong>{value}</strong><em>{meta}</em></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Refined() {
  const [scanned, setScanned] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lotId'),
  );

  return (
    <div className="trc-refined">
      <BrandHeader />
      <main className="rf-shell">
        <div className="rf-page-heading">
          <span className="rf-eyebrow">DARI KEBUN GARUT, DENGAN CERITA</span>
          <h1>Jejak produk</h1>
          <p>Setiap lot punya asal. Kenali kopi yang ada di tanganmu.</p>
        </div>

        <section className="rf-overview" aria-label="Ringkasan lot dan pemindaian">
          <div className="rf-scan-panel">
            <div className="rf-scan-panel-top">
              <span className="rf-scan-symbol"><ScanLine size={27} strokeWidth={1.6} /></span>
              <span className="rf-verified"><i /> LOT TERVERIFIKASI</span>
            </div>
            <div className="rf-scan-copy">
              <span className="rf-eyebrow">BUKA CERITA LOT INI</span>
              <h2>Satu scan,<br />satu cerita utuh.</h2>
              <p>Telusuri kebun, proses, dan rasa yang akhirnya sampai di cangkir.</p>
            </div>
            <button className="rf-scan-button" onClick={() => setScanned(true)} data-testid="button-trace-scan">
              {scanned ? <CheckCircle2 size={17} /> : <ScanLine size={17} />}
              {scanned ? 'Cerita terbuka' : 'Buka cerita kopi'}
              {!scanned && <ArrowDown size={15} className="rf-button-arrow" />}
            </button>
            <span className="rf-panel-foot">GARUT · JAWA BARAT <span>01 / 01</span></span>
          </div>

          <div className="rf-lot-preview">
            <div className="rf-preview-topline"><span className="rf-eyebrow">LOT {traceabilityLot.id}</span><span className="rf-lot-mark">TRACEABLE</span></div>
            <div className="rf-preview-product">
              <div className="rf-product-index">01</div>
              <div><h2>{coffee.name}</h2><p>{traceabilityLot.variety} <i /> Proses {traceabilityLot.process}</p></div>
            </div>
            <div className="rf-preview-farmer">
              <img src={asset(farmer.image)} alt={farmer.name} />
              <div><small>DITUMBUHKAN OLEH</small><strong>{farmer.name}</strong><span>{farmer.location}</span></div>
              <ShieldCheck size={18} />
            </div>
            <div className="rf-preview-facts">
              <div><small>ASAL</small><strong>{traceabilityLot.region}, Garut</strong></div>
              <div><small>KETINGGIAN</small><strong>{coffee.altitude}</strong></div>
              <div><small>BERAT LOT</small><strong>{traceabilityLot.weightKg} kg</strong></div>
            </div>
            <div className="rf-preview-tasting">
              <span className="rf-eyebrow">CATATAN RASA</span>
              <div className="rf-taste-list">{coffee.notes.map((note) => <span key={note}>{note}</span>)}</div>
            </div>
            <div className="rf-disclosure-note"><Check size={14} /> Detail perjalanan dan kisah kebun siap dibuka</div>
          </div>
        </section>

        {scanned && (
          <div className="rf-story-content">
            <div className="rf-success-banner">
              <span className="rf-success-icon"><CheckCircle2 size={17} /></span>
              <div><span className="rf-eyebrow">SCAN BERHASIL</span><strong>Kemasan ini punya cerita.</strong></div>
              <code>{traceabilityLot.id}</code>
            </div>

            <section className="rf-farmer-photo">
              <img src={asset(farmer.image)} alt={farmer.name} />
              <div className="rf-photo-shade" />
              <div className="rf-photo-copy"><span className="rf-eyebrow">PETANI PRODUSEN</span><h2>{farmer.name}</h2></div>
              <span className="rf-photo-chip"><ShieldCheck size={14} /> TERVERIFIKASI</span>
            </section>

            <div className="rf-product-heading">
              <span className="rf-eyebrow">LOT {traceabilityLot.id}</span>
              <h2>{coffee.name}</h2>
              <p>{traceabilityLot.variety} · {traceabilityLot.process} · {traceabilityLot.weightKg} kg</p>
            </div>

            <div className="rf-detail-grid">
              <OriginDetails />
              <section className="rf-story rf-card">
                <div className="rf-story-label"><span className="rf-icon-tile rf-gold"><Coffee size={18} /></span><span className="rf-eyebrow">CERITA DI BALIK CANGKIR</span></div>
                <h2>{traceabilityLot.storyTitle}</h2>
                <p>{traceabilityLot.story}</p>
                <blockquote>“Yang menghangatkan cangkir ini bukan hanya kopi, tetapi juga kehidupan yang dijaganya.”</blockquote>
                <div className="rf-impact">
                  <span><BriefcaseBusiness size={16} /></span>
                  <div><small>DAMPAK DI BALIK RASA</small><strong>{traceabilityLot.impact}</strong></div>
                </div>
              </section>
            </div>

            <div className="rf-journey-heading">
              <div><span className="rf-eyebrow">PERJALANAN LOT</span><h2>Dari kebun sampai cangkir</h2></div>
              <span>3 tahap</span>
            </div>
            <section className="rf-timeline">
              {traceabilityLot.journey.map((step, index) => (
                <div className="rf-timeline-step" key={step.label}>
                  <div className="rf-timeline-rail"><span className={index === traceabilityLot.journey.length - 1 ? 'last' : ''}>{index + 1}</span>{index < traceabilityLot.journey.length - 1 && <i />}</div>
                  <div><small>{step.label.toUpperCase()}</small><strong>{step.title}</strong><p>{step.detail}</p></div>
                </div>
              ))}
            </section>

            <section className="rf-tasting">
              <div className="rf-tasting-heading"><div><span className="rf-eyebrow">SAAT KAMU MENIKMATINYA</span><h2>Yang terasa di cangkir</h2></div><Coffee size={25} /></div>
              <p>Rasa cerah lemon Meyer membuka tegukan, lalu gula merah dan melati tinggal lebih lama di akhir.</p>
              <div className="rf-taste-list">{coffee.notes.map((note) => <span key={note}>{note}</span>)}</div>
            </section>

            <section className="rf-product-action">
              <div><span className="rf-eyebrow">SIAP MENYEDUH?</span><h2>Bawa cerita ini ke rumah.</h2><p>Paling nikmat sebagai {coffee.recommendedBrew.toLowerCase()}.</p></div>
              <a href={`/kopi-garut-web/product/${coffee.id}`} data-testid="button-trace-product">
                Lihat kopi <ArrowRight size={16} />
              </a>
            </section>
          </div>
        )}
      </main>
      <footer className="rf-footer"><img src={asset('kopi-garut-logo.png')} alt="" /><span>Menjaga jejak baik, dari kebun hingga cangkir.</span><code>GARUT BEANS · G-BEANS</code></footer>
    </div>
  );
}