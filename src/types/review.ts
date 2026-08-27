/** Preuve agrégée issue d'une plateforme tierce (ex. Planity). */
export interface ReviewSummary {
  readonly source: string;
  readonly rating: number;
  readonly maxRating: number;
  readonly reviewCount: number;
  readonly url?: string;
}

/**
 * Structure prête pour de futurs avis individuels autorisés.
 * Aucune instance ne doit être créée tant que Beauty Laï n'a pas
 * fourni de vrais avis à publier.
 */
export interface Review {
  readonly authorName: string;
  readonly rating: number;
  readonly text: string;
  readonly source: string;
  readonly date?: string;
}
