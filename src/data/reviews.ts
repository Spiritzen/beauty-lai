import type { Review, ReviewSummary } from '../types/review';
import { businessInfo } from './business';

/** Preuve agrégée observée sur Planity. */
export const reviewSummary: ReviewSummary = {
  source: 'Planity',
  rating: 5,
  maxRating: 5,
  reviewCount: 8,
  url: businessInfo.planityUrl,
};

/**
 * Aucun avis individuel autorisé n'est disponible à ce stade.
 * Ce tableau reste vide pour ne créer ni faux nom, ni fausse citation.
 */
export const reviews: readonly Review[] = [];
