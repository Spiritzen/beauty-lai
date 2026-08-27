/**
 * Informations d'identité minimales de l'établissement.
 * Ne pas inventer de coordonnées, de tarifs ou d'horaires ici.
 */
export interface BusinessInfo {
  readonly name: string;
  readonly city: string;
  readonly address?: string;
  readonly planityUrl?: string;
  readonly instagramUrl?: string;
}
