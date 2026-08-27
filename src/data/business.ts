import type { BusinessInfo } from '../types/business';

/**
 * Identité et coordonnées autorisées pour la maquette.
 * Aucun téléphone ni email n'est renseigné : ils ne sont pas fournis
 * et ne doivent pas être inventés.
 */
export const businessInfo: BusinessInfo = {
  name: 'Beauty Laï',
  city: 'Amiens',
  address: '36 place René-Goblet, 80000 Amiens',
  planityUrl: 'https://www.planity.com/beauty-lai-80080-amiens',
  instagramUrl: 'https://www.instagram.com/beau.tylai/',
};
