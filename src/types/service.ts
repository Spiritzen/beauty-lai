/**
 * Catégorie de prestation, destinée à une future page de services.
 * Ne pas recopier le catalogue Planity ici : ce type ne fait
 * qu'établir la forme des données à venir.
 */
export interface ServiceCategory {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly order: number;
  readonly image?: string;
  readonly bookingUrl?: string;
}
