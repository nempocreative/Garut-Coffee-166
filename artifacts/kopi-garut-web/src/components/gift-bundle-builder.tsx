import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Gift } from 'lucide-react';
import { diversifiedProducts } from '@workspace/kopi-garut-shared';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { webCoffeeCatalog } from '../lib/coffee-catalog';
import {
  customBoxMinimumQuantity,
  customBoxSurchargePerPackage,
  giftBundleProductCounts,
  type GiftBoxType,
  type GiftBundleType,
} from '../lib/gift-bundle';
import { getWebProductImage } from '../lib/web-product-images';

type GiftBundleBuilderProps = {
  onAddGiftBundle: (
    bundleType: GiftBundleType,
    productIds: string[],
    giftMessage: string,
    boxType: GiftBoxType,
    quantity: number,
  ) => void;
};

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;
const formatPrice = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;
const parseCatalogPrice = (value: string) => Number(value.replace(/[^\d]/g, ''));

const giftBundleOptions: { id: GiftBundleType; label: string; productCount: number }[] = [
  { id: 'paket-a', label: 'Paket A', productCount: giftBundleProductCounts['paket-a'] },
  { id: 'paket-b', label: 'Paket B', productCount: giftBundleProductCounts['paket-b'] },
  { id: 'paket-c', label: 'Paket C', productCount: giftBundleProductCounts['paket-c'] },
];

const giftBundleChoices = [
  ...webCoffeeCatalog.map((coffee) => ({
    id: coffee.id,
    name: coffee.name,
    kind: 'Kopi',
    price: coffee.price,
    image: asset(coffee.image),
    boxImage: asset(`gift-box-cutout-${coffee.id}.webp`),
  })),
  ...diversifiedProducts.map((product) => ({
    id: product.id,
    name: product.title,
    kind: 'Karya Kopi',
    price: parseCatalogPrice(product.price),
    image: asset(getWebProductImage(product.id, product.image)),
    boxImage: asset(`gift-box-cutout-${product.id}.webp`),
  })),
];

type GiftBundleChoice = (typeof giftBundleChoices)[number];

const giftBundleDefaultProductIds = [
  'papandayan-honey',
  'cikajang-natural',
  'coffee-cookies',
  'garut-mug',
  'coffee-soap',
];

const giftBundleFormSchema = z.object({
  bundleType: z.enum(['paket-a', 'paket-b', 'paket-c']),
  productIds: z.array(z.string()).length(5),
  boxType: z.enum(['standard', 'custom']),
  quantity: z.coerce.number().int().min(1, 'Jumlah paket minimal 1.'),
  customMessageEnabled: z.boolean(),
  giftMessage: z.string().max(40, 'Tulisan box maksimal 40 karakter.'),
}).superRefine((values, context) => {
  const productCount = giftBundleProductCounts[values.bundleType];
  values.productIds.slice(0, productCount).forEach((productId, index) => {
    if (!productId) context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['productIds', index],
      message: `Pilih produk ${index + 1}.`,
    });
  });
  if (values.boxType === 'custom' && values.quantity < customBoxMinimumQuantity) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['quantity'],
      message: `Custom box minimal ${customBoxMinimumQuantity} paket.`,
    });
  }
  if (values.customMessageEnabled && !values.giftMessage.trim()) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['giftMessage'],
      message: 'Isi tulisan custom atau nonaktifkan pilihan ini.',
    });
  }
});

type GiftBundleFormValues = z.infer<typeof giftBundleFormSchema>;

export function GiftBundleBuilder({ onAddGiftBundle }: GiftBundleBuilderProps) {
  const [giftBoxView, setGiftBoxView] = useState<'open' | 'closed'>('open');
  const giftBundleForm = useForm<GiftBundleFormValues>({
    resolver: zodResolver(giftBundleFormSchema),
    defaultValues: {
      bundleType: 'paket-a',
      productIds: giftBundleDefaultProductIds,
      boxType: 'standard',
      quantity: 1,
      customMessageEnabled: false,
      giftMessage: '',
    },
  });
  const giftBundleType = giftBundleForm.watch('bundleType');
  const giftBundleProductIds = giftBundleForm.watch('productIds');
  const giftBoxType = giftBundleForm.watch('boxType');
  const giftBundleQuantity = giftBundleForm.watch('quantity');
  const customMessageEnabled = giftBundleForm.watch('customMessageEnabled');
  const giftMessage = giftBundleForm.watch('giftMessage');
  const giftBundleProductCount = giftBundleProductCounts[giftBundleType];
  const selectedGiftProducts = giftBundleProductIds
    .slice(0, giftBundleProductCount)
    .map((id) => giftBundleChoices.find((product) => product.id === id))
    .filter((product): product is GiftBundleChoice => Boolean(product));
  const giftBundleUnitPrice = selectedGiftProducts.reduce((total, product) => total + product.price, 0)
    + (giftBoxType === 'custom' ? customBoxSurchargePerPackage : 0);
  const giftBundleOrderQuantity = giftBoxType === 'custom' ? giftBundleQuantity : 1;
  const giftBundleOrderTotal = giftBundleUnitPrice * giftBundleOrderQuantity;

  return (
    <section className="gb-gift-bundle gb-gift-bundle-page-builder" aria-labelledby="gift-bundle-title" data-testid="gift-bundle-section">
      <div className="gb-gift-bundle-heading">
        <span className="gb-gift-bundle-kicker"><Gift size={14} /> OLEH-OLEH GARUT</span>
        <h2 id="gift-bundle-title">Racik paket oleh-olehmu.</h2>
        <p>Pilih 3–5 produk, tentukan box, lalu tambahkan tulisan custom tanpa minimum order.</p>
      </div>

      <Form {...giftBundleForm}>
        <form
          className="gb-gift-bundle-builder"
          onSubmit={giftBundleForm.handleSubmit((values) => onAddGiftBundle(
            values.bundleType,
            values.productIds.slice(0, giftBundleProductCounts[values.bundleType]),
            values.customMessageEnabled ? values.giftMessage.trim() : '',
            values.boxType,
            values.boxType === 'custom' ? values.quantity : 1,
          ))}
          noValidate
        >
          <div className="gb-gift-bundle-controls">
            <FormField
              control={giftBundleForm.control}
              name="bundleType"
              render={({ field }) => (
                <FormItem className="gb-gift-form-item">
                  <FormLabel>Pilih susunan paket</FormLabel>
                  <div className="gb-gift-package-options" role="group" aria-label="Pilihan paket oleh-oleh">
                    {giftBundleOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`gb-gift-package-option ${field.value === option.id ? 'is-selected' : ''}`}
                        aria-pressed={field.value === option.id}
                        onClick={() => field.onChange(option.id)}
                        data-testid={`gift-bundle-option-${option.id}`}
                      >
                        <span className="gb-gift-package-option-title">{option.label}</span>
                        <span>{option.productCount} produk pilihan</span>
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={giftBundleForm.control}
              name="boxType"
              render={({ field }) => (
                <FormItem className="gb-gift-form-item">
                  <FormLabel>Pilih box</FormLabel>
                  <div className="gb-gift-box-options" role="group" aria-label="Pilihan box hadiah">
                    <button
                      type="button"
                      className={`gb-gift-box-option ${field.value === 'standard' ? 'is-selected' : ''}`}
                      aria-pressed={field.value === 'standard'}
                      onClick={() => field.onChange('standard')}
                      data-testid="gift-box-option-standard"
                    >
                      <span>Box Garut Beans</span>
                      <small>Termasuk di paket</small>
                    </button>
                    <button
                      type="button"
                      className={`gb-gift-box-option ${field.value === 'custom' ? 'is-selected' : ''}`}
                      aria-pressed={field.value === 'custom'}
                      onClick={() => {
                        field.onChange('custom');
                        if (giftBundleForm.getValues('quantity') < customBoxMinimumQuantity) {
                          giftBundleForm.setValue('quantity', customBoxMinimumQuantity, { shouldValidate: true });
                        }
                      }}
                      data-testid="gift-box-option-custom"
                    >
                      <span>Custom box</span>
                      <small>Min. 12 paket · +Rp25.000/paket</small>
                    </button>
                  </div>
                </FormItem>
              )}
            />

            {giftBoxType === 'custom' && (
              <FormField
                control={giftBundleForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="gb-gift-form-item">
                    <FormLabel>Jumlah paket custom box</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className="gb-gift-select gb-gift-quantity"
                        type="number"
                        min={customBoxMinimumQuantity}
                        step={1}
                        value={field.value ?? customBoxMinimumQuantity}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                        data-testid="gift-box-quantity"
                      />
                    </FormControl>
                    <FormDescription>Minimum {customBoxMinimumQuantity} paket dengan susunan ini.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="gb-gift-product-fields">
              {Array.from({ length: giftBundleProductCount }, (_, index) => (
                <FormField
                  key={`gift-bundle-product-field-${index}`}
                  control={giftBundleForm.control}
                  name={`productIds.${index}` as const}
                  render={({ field }) => (
                    <FormItem className="gb-gift-form-item">
                      <FormLabel>Pilih produk {index + 1}</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="gb-gift-select"
                          aria-label={`Pilih produk ke-${index + 1}`}
                          data-testid={`gift-bundle-product-${index + 1}`}
                        >
                          {giftBundleChoices.map((product) => (
                            <option value={product.id} key={product.id}>
                              {product.kind} · {product.name} — {formatPrice(product.price)}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className={`gb-gift-preview gb-gift-design-board ${giftBundleType}`} data-testid="gift-bundle-preview">
              <div className="gb-gift-preview-topline">
                <span>GARUT BEANS</span>
                <small>PAKET {giftBundleType.slice(-1).toUpperCase()} · {giftBoxType === 'custom' ? 'CUSTOM BOX' : 'BOX GARUT BEANS'}</small>
              </div>
              <div className={`gb-gift-design-canvas ${giftBoxView}`} data-testid="gift-box-design-canvas">
                <img
                  className="gb-gift-design-box-image"
                  src={asset(giftBoxView === 'open' ? 'garut-beans-empty-gift-box.webp' : 'garut-beans-closed-gift-box-final.webp')}
                  alt={giftBoxView === 'open' ? 'Pratinjau box Garut Beans dalam keadaan terbuka.' : 'Pratinjau box Garut Beans dalam keadaan tertutup.'}
                />
                {giftBoxView === 'open' && (
                  <div
                    className={`gb-gift-design-products-inside count-${selectedGiftProducts.length}`}
                    role="group"
                    aria-label={`${selectedGiftProducts.length} produk pilihan di dalam box`}
                    data-testid="gift-box-products-inside"
                  >
                    {selectedGiftProducts.map((product, index) => (
                      <figure
                        className="gb-gift-design-product-inside"
                        key={`${product.id}-${index}`}
                        title={product.name}
                        data-testid={`gift-box-product-preview-${index + 1}`}
                      >
                        <img
                          src={product.boxImage}
                          alt={`${product.name}, produk ke-${index + 1} di dalam box`}
                        />
                      </figure>
                    ))}
                  </div>
                )}
                <span className="gb-gift-design-caption">{giftBoxView === 'open' ? 'TAMPAK TERBUKA' : 'TAMPAK TERTUTUP'}</span>
                {customMessageEnabled && giftBoxView === 'closed' && (
                  <div className={`gb-gift-design-imprint ${giftBoxView}`} data-testid="gift-bundle-preview-message">
                    <span>PRATINJAU TULISAN</span>
                    <strong>{giftMessage.trim() || 'Tulis ucapanmu di sini'}</strong>
                  </div>
                )}
              </div>
              <div className="gb-gift-design-views" role="group" aria-label="Pilih tampilan pratinjau box">
                <button
                  type="button"
                  className={giftBoxView === 'open' ? 'is-selected' : ''}
                  aria-pressed={giftBoxView === 'open'}
                  onClick={() => setGiftBoxView('open')}
                  data-testid="gift-box-view-open"
                >
                  Terbuka
                </button>
                <button
                  type="button"
                  className={giftBoxView === 'closed' ? 'is-selected' : ''}
                  aria-pressed={giftBoxView === 'closed'}
                  onClick={() => setGiftBoxView('closed')}
                  data-testid="gift-box-view-closed"
                >
                  Tertutup
                </button>
              </div>
              <div className="gb-gift-design-product-heading">
                <span>ISI PAKET</span>
                <small>{selectedGiftProducts.length} produk · Paket {giftBundleType.slice(-1).toUpperCase()}</small>
              </div>
              <div className="gb-gift-preview-products">
                {selectedGiftProducts.map((product, index) => (
                  <figure className="gb-gift-preview-item" key={`${product.id}-${index}`}>
                    <img src={product.image} alt={product.name} />
                    <figcaption>{product.name}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="gb-gift-design-note">Pratinjau ini membantu melihat tulisan dan isi paket. Box yang dipesan mengikuti pilihan di sebelah kiri.</p>
            </div>

            <div className="gb-gift-custom-message">
              <FormField
                control={giftBundleForm.control}
                name="customMessageEnabled"
                render={({ field }) => (
                  <FormItem className="gb-gift-form-item">
                    <label className="gb-gift-custom-message-toggle">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                        data-testid="gift-bundle-custom-message-toggle"
                      />
                      <span>
                        Tulisan custom <small>tanpa minimum order</small>
                      </span>
                    </label>
                  </FormItem>
                )}
              />
              {customMessageEnabled && (
                <FormField
                  control={giftBundleForm.control}
                  name="giftMessage"
                  render={({ field }) => (
                    <FormItem className="gb-gift-form-item">
                      <div className="gb-gift-message-label">
                        <FormLabel>Tulisan untuk box</FormLabel>
                        <small>{field.value.length}/40</small>
                      </div>
                      <FormControl>
                        <textarea
                          {...field}
                          className="gb-gift-message-input"
                          maxLength={40}
                          placeholder="Contoh: Selamat ulang tahun, Ibu!"
                          rows={2}
                          data-testid="gift-bundle-message"
                        />
                      </FormControl>
                      <FormDescription>Tulisan custom bisa dipesan tanpa minimum.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="gb-gift-bundle-checkout">
              <div className="gb-gift-bundle-total">
                <span>Total {giftBundleOrderQuantity} paket · {giftBundleProductCount} produk/paket</span>
                <strong data-testid="gift-bundle-price">{formatPrice(giftBundleOrderTotal)}</strong>
              </div>
              <small>
                {giftBoxType === 'custom'
                  ? `Rp ${customBoxSurchargePerPackage.toLocaleString('id-ID')} biaya custom box per paket.`
                  : 'Box Garut Beans termasuk di harga paket.'}
              </small>
              <button className="gb-gift-bundle-submit" type="submit" data-testid="button-add-gift-bundle">
                <Gift size={16} /> Tambahkan paket
              </button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}