import { useState, type FormEvent } from 'react';
import { ChevronDown, MapPin, Plus, Trash2, X } from 'lucide-react';

import {
  serviceLocations,
  type DeliveryAddress,
  type ServiceLocationId,
  type ServiceMode,
} from '@/lib/loyalty';

type ServiceLocationPickerProps = {
  serviceMode: ServiceMode;
  selectedLocationId: string;
  selectedDeliveryAddressId: string;
  deliveryAddresses: DeliveryAddress[];
  onSelectLocation: (id: ServiceLocationId) => void;
  onSelectDeliveryAddress: (id: string) => void;
  onAddDeliveryAddress: (label: string, address: string) => void;
  onRemoveDeliveryAddress: (id: string) => void;
  variant?: 'home' | 'cart';
  allowAddressCreation?: boolean;
};

export function ServiceLocationPicker({
  serviceMode,
  selectedLocationId,
  selectedDeliveryAddressId,
  deliveryAddresses,
  onSelectLocation,
  onSelectDeliveryAddress,
  onAddDeliveryAddress,
  onRemoveDeliveryAddress,
  variant = 'home',
  allowAddressCreation = true,
}: ServiceLocationPickerProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressLabel, setAddressLabel] = useState('');
  const [address, setAddress] = useState('');
  const isDelivery = serviceMode === 'delivery';
  const selectedLocation = serviceLocations.find((location) => location.id === selectedLocationId)
    ?? serviceLocations[0];
  const selectedAddress = deliveryAddresses.find((item) => item.id === selectedDeliveryAddressId);

  const handleAddAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = addressLabel.trim();
    const value = address.trim();
    if (!label || !value) return;
    onAddDeliveryAddress(label, value);
    setAddressLabel('');
    setAddress('');
    setIsAddingAddress(false);
  };

  return (
    <div className={`gb-location-picker-wrap ${variant === 'cart' ? 'cart-location-picker' : ''}`}>
      <div className="gb-outlet-row">
        <span className="gb-outlet-icon" aria-hidden="true"><MapPin size={17} /></span>
        <label className="gb-outlet-copy">
          <small>{isDelivery ? 'ALAMAT DELIVERY' : 'OUTLET MITRA'}</small>
          <span className="gb-location-select-wrap">
            {isDelivery ? (
              <select
                className="gb-location-select"
                value={selectedAddress?.id ?? ''}
                onChange={(event) => onSelectDeliveryAddress(event.target.value)}
                aria-label="Pilih alamat Delivery"
                aria-describedby={`location-detail-${variant}`}
                disabled={!deliveryAddresses.length}
                data-testid={`${variant}-delivery-address-select`}
              >
                <option value="">Pilih alamat Delivery</option>
                {deliveryAddresses.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
              </select>
            ) : (
              <select
                className="gb-location-select"
                value={selectedLocation.id}
                onChange={(event) => onSelectLocation(event.target.value as ServiceLocationId)}
                aria-label="Pilih outlet untuk Pickup atau Dine In"
                aria-describedby={`location-detail-${variant}`}
                data-testid={`${variant}-partner-location-select`}
              >
                {serviceLocations.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
              </select>
            )}
            <ChevronDown size={16} aria-hidden="true" />
          </span>
          <span className="gb-location-detail" id={`location-detail-${variant}`}>
            {isDelivery
              ? selectedAddress?.address ?? (allowAddressCreation ? 'Tambahkan alamat tujuan pengantaran.' : 'Tambahkan alamat saat checkout.')
              : selectedLocation.area}
          </span>
        </label>
        {isDelivery ? (
          selectedAddress ? (
            <button
              type="button"
              className="gb-location-remove"
              aria-label={`Hapus alamat ${selectedAddress.label}`}
              title="Hapus alamat"
              onClick={() => onRemoveDeliveryAddress(selectedAddress.id)}
              data-testid={`${variant}-remove-delivery-address`}
            ><Trash2 size={16} /></button>
          ) : null
        ) : null}
      </div>

      {isDelivery && allowAddressCreation && !isAddingAddress && (
        <button
          type="button"
          className="gb-add-address-button"
          onClick={() => setIsAddingAddress(true)}
          data-testid={`${variant}-add-delivery-address`}
        ><Plus size={14} /> Tambah alamat</button>
      )}

      {isDelivery && allowAddressCreation && isAddingAddress && (
        <form className="gb-address-form" onSubmit={handleAddAddress}>
          <label>
            <span>Nama alamat</span>
            <input
              value={addressLabel}
              onChange={(event) => setAddressLabel(event.target.value)}
              placeholder="Contoh: Rumah"
              autoComplete="off"
              maxLength={40}
              required
              data-testid={`${variant}-address-label`}
            />
          </label>
          <label>
            <span>Alamat pengantaran</span>
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Tulis alamat tujuan"
              autoComplete="street-address"
              maxLength={240}
              rows={2}
              required
              data-testid={`${variant}-address-input`}
            />
          </label>
          <small>Alamat disimpan hanya di browser ini.</small>
          <div className="gb-address-form-actions">
            <button type="button" onClick={() => setIsAddingAddress(false)}><X size={13} /> Batal</button>
            <button type="submit"><Plus size={13} /> Simpan alamat</button>
          </div>
        </form>
      )}
    </div>
  );
}