import type { OpeningHoursInfo } from '../types/hours';

/**
 * Horaires observés, à confirmer avec Beauty Laï avant toute publication
 * réelle (voir mention de maquette dans le footer).
 */
export const openingHours: OpeningHoursInfo = {
  periods: [
    { days: 'Lundi – Vendredi', hours: '10 h – 22 h' },
    { days: 'Samedi', hours: '10 h – 19 h' },
    { days: 'Dimanche', hours: 'Fermé' },
  ],
  toBeConfirmed: true,
};
