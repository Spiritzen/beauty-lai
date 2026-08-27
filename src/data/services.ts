import type { ServiceCategory } from '../types/service';
import { businessInfo } from './business';

/**
 * Familles de prestations observées, sans recopier la carte Planity
 * complète et sans afficher de prix non validés. Chaque catégorie
 * renvoie vers les disponibilités réelles sur Planity.
 */
export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: 'regard',
    name: 'Regard',
    summary: 'Extensions de cils et mise en beauté du regard.',
    order: 1,
    bookingUrl: businessInfo.planityUrl,
  },
  {
    slug: 'onglerie',
    name: 'Onglerie',
    summary: 'Manucure, pose et mise en beauté des ongles.',
    order: 2,
    bookingUrl: businessInfo.planityUrl,
  },
  {
    slug: 'visage',
    name: 'Visage',
    summary: 'Maquillage permanent, épilation au fil, strass et blanchiment dentaire esthétique.',
    order: 3,
    bookingUrl: businessInfo.planityUrl,
  },
  {
    slug: 'cheveux',
    name: 'Cheveux',
    summary: 'Extensions capillaires.',
    order: 4,
    bookingUrl: businessInfo.planityUrl,
  },
  {
    slug: 'bien-etre',
    name: 'Bien-être',
    summary: 'Massages et instants de détente.',
    order: 5,
    bookingUrl: businessInfo.planityUrl,
  },
  {
    slug: 'evenements',
    name: 'Événements',
    summary: 'Mariée, EVJF, anniversaire et formules à partager.',
    order: 6,
    bookingUrl: businessInfo.planityUrl,
  },
];
