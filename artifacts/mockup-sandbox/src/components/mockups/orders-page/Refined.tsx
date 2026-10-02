import {
  ArrowLeft,
  ArrowRight,
  Check,
  Coffee,
  ClipboardList,
  Home,
  Package,
  ScanLine,
  ShoppingBag,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import "./_group.css";
import "./Refined.css";

type Order = {
  id: string;
  items: { id: string; quantity: number }[];
  total: number;
  createdAt: string;
  status: string;
};

const formatPrice = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const orderStatusSteps = ["Dipesan", "Diproses", "Diantar"] as const;
const orderStatusDescriptions: Record<(typeof orderStatusSteps)[number], string> = {
  Dipesan: "Pesanan diterima dan menunggu diproses.",
  Diproses: "Kopi sedang disiapkan dengan teliti.",
  Diantar: "Pesanan sudah sampai di rumahmu.",
};

const coffeeNames: Record<string, string> = {
  "papandayan-honey": "Papandayan Series",
  "cikajang-natural": "Cikuray Series",
  "talaga-washed": "Kamojang Series",
};

export const sampleOrders: Order[] = [
  {
    id: "KG-260928",
    items: [{ id: "papandayan-honey", quantity: 2 }, { id: "cikajang-natural", quantity: 1 }],
    total: 368000,
    createdAt: "28 September 2026",
    status: "Diantar",
  },
  {
    id: "KG-260924",
    items: [{ id: "talaga-washed", quantity: 1 }],
    total: 105000,
    createdAt: "24 September 2026",
    status: "Diproses",
  },
  {
    id: "KG-260920",
    items: [{ id: "cikajang-natural", quantity: 2 }],
    total: 264000,
    createdAt: "20 September 2026",
    status: "Dipesan",
  },
];

export function Refined({ orders = [] }: { orders?: Order[] }) {
  const setLocation = (_path: string) => undefined;
  const getOrderStatusIndex = (status: string) => {
    if (status === "Preparing" || status === "Diproses") return 1;
    if (status === "Delivered" || status === "Diantar") return 2;
    return 0;
  };

  return (
    <div className="orders-current-frame orders-refined-frame">
      <nav className="current-top-nav" aria-label="Navigasi halaman">
        <div className="current-top-brand">
          <img src="/__mockup/assets/kopi-garut-logo.png" alt="" />
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
          <button className="active" aria-current="page"><ClipboardList size={16} />Pesanan</button>
          <button><UserRound size={16} />Akun</button>
        </div>
      </nav>

      <div className="current-page-content">
        <main className="subpage orders-page">
          <header className="subpage-head">
            <button className="back-button" onClick={() => setLocation("/")} aria-label="Kembali">
              <ArrowLeft size={18} />
            </button>
            <div className="subpage-title-wrap"><h1 className="page-title">Pesanan</h1></div>
            <div className="header-actions">
              <button className="icon-orb" onClick={() => setLocation("/")} aria-label="Kembali ke beranda">
                <img className="header-home-image" src="/__mockup/assets/home-coffee-house.png" alt="" />
              </button>
              <button className="icon-orb" onClick={() => setLocation("/cart")} aria-label="Buka keranjang">
                <ShoppingCart size={23} />
              </button>
            </div>
          </header>

          <section className="orders-intro">
            <div className="orders-intro-copy">
              <span className="section-kicker">RIWAYAT BELANJA</span>
              <h1>{orders.length > 0 ? "Kopi yang pernah kamu pilih." : "Mulai ritual kopimu."}</h1>
              <p>{orders.length > 0 ? "Semua perjalanan pesananmu tersimpan di sini." : "Pesanan pertamamu akan menjadi awal perjalanan rasa."}</p>
            </div>
            <div className="orders-intro-icon" aria-label={`${orders.length} pesanan tersimpan`}>
              <Package size={25} />
              <strong>{orders.length.toString().padStart(2, "0")}</strong>
            </div>
          </section>

          {orders.length === 0 ? (
            <section className="orders-empty">
              <span className="orders-empty-icon"><Coffee size={24} /></span>
              <h2>Belum ada pesanan</h2>
              <p>Jelajahi Garut Beans dan temukan cangkir yang ingin kamu bawa pulang.</p>
              <button className="primary-button orders-browse-button" onClick={() => setLocation("/catalog")} data-testid="orders-browse-coffee">
                Jelajahi kopi <ArrowRight size={15} />
              </button>
            </section>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => {
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                const itemNames = order.items.map((item) => coffeeNames[item.id]).filter(Boolean).join(" · ");
                const statusIndex = getOrderStatusIndex(order.status);
                const statusLabel = orderStatusSteps[statusIndex];
                return (
                  <article className="orders-card" key={order.id} style={{ "--order-delay": `${index * 70}ms` } as React.CSSProperties}>
                    <div className="orders-card-top">
                      <div className="orders-card-meta">
                        <div className="orders-label-row"><span /><small>RIWAYAT PESANAN</small></div>
                        <strong>#{order.id.slice(-6)}</strong>
                      </div>
                      <span className={`orders-status status-${statusIndex}`}><i />{statusLabel}</span>
                    </div>
                    <time className="orders-date">{order.createdAt}</time>
                    <div className="orders-status-summary">
                      <span>{statusIndex === 2 ? <Check size={17} /> : statusIndex === 1 ? <Coffee size={17} /> : <Package size={17} />}</span>
                      <div>
                        <strong>{orderStatusDescriptions[statusLabel]}</strong>
                        <small>{statusIndex === 2 ? "Terima kasih sudah memilih Garut Beans." : "Kami akan memberi kabar di setiap tahap."}</small>
                      </div>
                    </div>
                    <div className="orders-progress" aria-label={`Status pesanan ${statusLabel}`}>
                      {orderStatusSteps.map((step, stepIndex) => (
                        <div className={`orders-progress-segment ${stepIndex < statusIndex ? "passed" : ""}`} key={step}>
                          <span className={stepIndex <= statusIndex ? "complete" : ""}>
                            {stepIndex <= statusIndex && <Check size={11} />}
                          </span>
                          <small>{step}</small>
                        </div>
                      ))}
                    </div>
                    <div className="orders-divider" />
                    <div className="orders-product-row">
                      <div className="orders-item-mark"><Coffee size={21} /></div>
                      <div className="orders-item-detail">
                        <strong>{itemNames || "Pesanan Garut Beans"}</strong>
                        <small>{order.items.map((item) => `${item.quantity} × ${coffeeNames[item.id] || "Kopi Garut Beans"}`).join("  /  ")}</small>
                        <small>{itemCount} item · Total pesanan</small>
                      </div>
                      <div className="orders-total"><small>TOTAL</small><strong>{formatPrice(order.total)}</strong></div>
                    </div>
                    <div className="orders-actions">
                      <button className="orders-detail-button" onClick={() => setLocation(`/product/${order.items[0]?.id}`)} disabled={!order.items[0]}>
                        Lihat kopi <ArrowRight size={14} />
                      </button>
                      <button className="orders-reorder-button" onClick={() => setLocation("/catalog")}>
                        <ShoppingBag size={15} /> Belanja lagi
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <div className="current-floating game" aria-hidden="true"><img src="/__mockup/assets/mini-games-icon.webp" alt="" /></div>
      <div className="current-floating chat" aria-hidden="true"><img src="/__mockup/assets/faq-live-chat.webp" alt="" /></div>
      <nav className="current-bottom-nav" aria-label="Navigasi utama">
        <button><span className="current-bottom-icon"><Home size={20} /></span><span>Beranda</span></button>
        <button><span className="current-bottom-icon"><Coffee size={20} /></span><span>Kopi</span></button>
        <button className="center"><span className="current-bottom-icon"><ScanLine size={21} /></span><span>Jejak</span></button>
        <button className="active"><span className="current-bottom-icon"><Package size={20} /></span><span>Pesanan</span></button>
        <button><span className="current-bottom-icon"><UserRound size={20} /></span><span>Akun</span></button>
      </nav>
    </div>
  );
}