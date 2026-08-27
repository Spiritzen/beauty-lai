/** Mode de réservation d'une prestation. */
export type BookingMode = 'online' | 'phone' | 'information';

/** Une prestation ou une information au sein d'une catégorie tarifaire. */
export interface PricingItem {
  readonly name: string;
  readonly description?: string;
  readonly note?: string;
  readonly durationMinutes?: number;
  readonly priceCents?: number;
  readonly priceFrom?: boolean;
  readonly bookingMode: BookingMode;
}

/** Une catégorie de la carte des prestations. */
export interface PricingCategory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly notice?: string;
  readonly items: readonly PricingItem[];
}
