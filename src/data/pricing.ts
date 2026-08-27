import type { PricingCategory, PricingItem } from '../types/pricing';

/**
 * Carte des prestations et tarifs.
 *
 * Source de vérité unique : la page Planity officielle de Beauty Laï
 * (https://www.planity.com/beauty-lai-80080-amiens), vérifiée le
 * 27 août 2026. Aucune prestation, aucun prix, aucune durée ni aucune
 * promotion n'a été inventé ou recherché ailleurs.
 *
 * Les doublons techniques Planity (ex. « Pose de vernis semi-permanent —
 * Mains ») et l'éventuelle offre découverte expirée/masquée ont été
 * volontairement écartés en amont : chaque prestation n'apparaît qu'une
 * seule fois par catégorie.
 */

/** Numéro affiché une seule fois pour les prestations réservables par téléphone. */
export const PHONE_BOOKING_NUMBER = '06 95 70 29 00';

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formate un prix en euros à partir d'un montant en centimes. */
export function formatPrice(priceCents: number): string {
  return priceFormatter.format(priceCents / 100);
}

/**
 * Libellé de prix complet d'une prestation, avec le préfixe « À partir
 * de » lorsque `priceFrom` vaut `true`. Retourne `undefined` si la
 * prestation n'a pas de prix (catégorie « informations »).
 */
export function formatPriceLabel(item: Pick<PricingItem, 'priceCents' | 'priceFrom'>): string | undefined {
  if (item.priceCents === undefined) {
    return undefined;
  }
  const formatted = formatPrice(item.priceCents);
  return item.priceFrom ? `À partir de ${formatted}` : formatted;
}

/**
 * Formate une durée en minutes de façon naturelle et compacte :
 * 30 min, 1 h, 1 h 15, 2 h 10.
 */
export function formatDuration(durationMinutes: number): string {
  if (durationMinutes < 60) {
    return `${durationMinutes} min`;
  }
  const hours = Math.floor(durationMinutes / 60);
  const remainder = durationMinutes % 60;
  return remainder === 0 ? `${hours} h` : `${hours} h ${remainder}`;
}

const cilsDemaquillesNotice =
  'Merci de venir les yeux démaquillés. Si vous portez des lentilles, merci de les retirer avant le rendez-vous.';

export const pricingCategories: readonly PricingCategory[] = [
  {
    id: 'informations',
    name: 'Informations',
    items: [
      {
        name: 'Offre parrainage',
        description: 'Parrainez une amie et recevez 10 € de remise sur votre prochaine visite.',
        note: 'Offre non cumulable.',
        bookingMode: 'information',
      },
      {
        name: 'Offre étudiante',
        description:
          'Bénéficiez de 10 % de remise les lundis, mardis et mercredis sur présentation de votre carte étudiante.',
        note: 'Offre non cumulable.',
        bookingMode: 'information',
      },
      {
        name: 'EVJF',
        description: 'Offres sur mesure pour un moment unique entre filles.',
        bookingMode: 'information',
      },
      {
        name: 'Anniversaire',
        description: 'Célébrez votre journée avec une touche de beauté.',
        bookingMode: 'information',
      },
    ],
  },
  {
    id: 'dents',
    name: 'Les dents',
    items: [
      {
        name: 'Blanchiment dentaire — La séance',
        durationMinutes: 30,
        priceCents: 8000,
        note: 'En cas de caries ou de couronnes, cette prestation n’est pas réalisable.',
        bookingMode: 'online',
      },
      {
        name: 'Pack 2 séances',
        durationMinutes: 20,
        priceCents: 12000,
        note:
          'En cas de caries ou de couronnes, cette prestation n’est pas réalisable. Cette prestation ne peut pas être réservée en ligne.',
        bookingMode: 'phone',
      },
      {
        name: 'Strass',
        durationMinutes: 20,
        priceCents: 3000,
        bookingMode: 'phone',
      },
      {
        name: '2e strass',
        durationMinutes: 10,
        priceCents: 5000,
        bookingMode: 'phone',
      },
    ],
  },
  {
    id: 'extensions-cheveux',
    name: 'Extensions de cheveux',
    description: 'Kératine et mèches naturelles fournies.',
    items: [
      {
        name: 'Pose d’extensions de cheveux — 50 mèches',
        durationMinutes: 75,
        priceCents: 25000,
        priceFrom: true,
        note: 'Merci de venir les cheveux lavés et lissés.',
        bookingMode: 'online',
      },
      {
        name: 'Pose d’extensions de cheveux — 100 mèches',
        durationMinutes: 120,
        priceCents: 35000,
        priceFrom: true,
        note: 'Merci de venir les cheveux lavés et lissés.',
        bookingMode: 'online',
      },
      {
        name: 'Pose d’extensions de cheveux — 150 mèches',
        durationMinutes: 180,
        priceCents: 45000,
        priceFrom: true,
        note: 'Merci de venir les cheveux lavés et lissés.',
        bookingMode: 'online',
      },
      {
        name: 'Dépose',
        durationMinutes: 60,
        priceCents: 8000,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'epilation-fil',
    name: 'Épilation au fil',
    items: [
      { name: 'Sourcils', durationMinutes: 20, priceCents: 1000, bookingMode: 'online' },
      {
        name: 'Sourcils avec reconstruction',
        durationMinutes: 30,
        priceCents: 1500,
        bookingMode: 'online',
      },
      { name: 'Lèvres', durationMinutes: 30, priceCents: 800, bookingMode: 'online' },
      { name: 'Joues', durationMinutes: 30, priceCents: 800, bookingMode: 'online' },
      { name: 'Menton', durationMinutes: 30, priceCents: 800, bookingMode: 'online' },
      {
        name: 'Forfait visage complet',
        durationMinutes: 45,
        priceCents: 2500,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'special-regard',
    name: 'Spécial regard',
    notice: cilsDemaquillesNotice,
    items: [
      { name: 'Pose — Cil à cil', durationMinutes: 90, priceCents: 5000, bookingMode: 'online' },
      {
        name: 'Pose — Volume mixte',
        durationMinutes: 90,
        priceCents: 6000,
        bookingMode: 'online',
      },
      {
        name: 'Pose — Volume russe',
        durationMinutes: 90,
        priceCents: 7000,
        bookingMode: 'online',
      },
      {
        name: 'Remplissage — Cil à cil',
        durationMinutes: 60,
        priceCents: 4000,
        bookingMode: 'online',
      },
      {
        name: 'Remplissage — Volume mixte',
        durationMinutes: 60,
        priceCents: 5000,
        bookingMode: 'online',
      },
      {
        name: 'Remplissage — Volume russe',
        durationMinutes: 60,
        priceCents: 6000,
        bookingMode: 'online',
      },
      {
        name: 'Rehaussement de cils',
        durationMinutes: 30,
        priceCents: 4000,
        bookingMode: 'online',
      },
      { name: 'Browlift', durationMinutes: 30, priceCents: 4000, bookingMode: 'online' },
      { name: 'Teinture', durationMinutes: 20, priceCents: 1500, bookingMode: 'online' },
      {
        name: 'Épilation au fil',
        durationMinutes: 30,
        priceCents: 1000,
        bookingMode: 'online',
      },
      {
        name: 'Browlift + teinture',
        durationMinutes: 50,
        priceCents: 5000,
        bookingMode: 'online',
      },
      {
        name: 'Pack regard glamour',
        description: 'Rehaussement de cils + browlift + teinture.',
        durationMinutes: 60,
        priceCents: 8500,
        bookingMode: 'online',
      },
      {
        name: 'Pack regard VIP',
        description: 'Rehaussement de cils + browlift + teinture + épilation des sourcils.',
        durationMinutes: 90,
        priceCents: 9500,
        bookingMode: 'online',
      },
      {
        name: 'Dépose de cils',
        durationMinutes: 30,
        priceCents: 1500,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'special-ongles',
    name: 'Spécial ongles',
    notice: 'Aucun remplissage ne sera effectué si la pose ne provient pas de l’institut.',
    items: [
      {
        name: 'Pose de vernis semi-permanent — Mains',
        durationMinutes: 45,
        priceCents: 3000,
        bookingMode: 'online',
      },
      {
        name: 'Semi-permanent French — Mains',
        durationMinutes: 60,
        priceCents: 4000,
        bookingMode: 'online',
      },
      {
        name: 'Pose de vernis semi-permanent — Pieds',
        durationMinutes: 45,
        priceCents: 3000,
        bookingMode: 'phone',
      },
      {
        name: 'Semi-permanent French — Pieds',
        durationMinutes: 30,
        priceCents: 4000,
        bookingMode: 'phone',
      },
      { name: 'Dépose d’ongles', durationMinutes: 30, priceCents: 2000, bookingMode: 'online' },
      {
        name: 'Pose de capsules américaines',
        durationMinutes: 60,
        priceCents: 4000,
        bookingMode: 'online',
      },
      {
        name: 'Chablon + French',
        durationMinutes: 105,
        priceCents: 7000,
        bookingMode: 'online',
      },
      {
        name: 'Pose complète chablon',
        durationMinutes: 90,
        priceCents: 6000,
        bookingMode: 'online',
      },
      {
        name: 'Pose semi-capsules',
        durationMinutes: 90,
        priceCents: 5000,
        bookingMode: 'phone',
      },
      {
        name: 'Remplissage chablon',
        durationMinutes: 60,
        priceCents: 5000,
        bookingMode: 'online',
      },
      {
        name: 'Remplissage semi-capsules',
        durationMinutes: 60,
        priceCents: 4000,
        bookingMode: 'phone',
      },
      {
        name: 'Pose de capsules américaines — Pieds',
        durationMinutes: 60,
        priceCents: 4000,
        bookingMode: 'phone',
      },
      {
        name: 'Renforcement des ongles naturels en gel',
        durationMinutes: 90,
        priceCents: 3500,
        bookingMode: 'online',
      },
      { name: 'Baby-boomer', durationMinutes: 90, priceCents: 6500, bookingMode: 'online' },
      {
        name: 'Nail art ou strass',
        description: 'À l’unité.',
        durationMinutes: 30,
        priceCents: 200,
        priceFrom: true,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'maquillage-permanent-yeux',
    name: 'Maquillage permanent — Yeux',
    items: [
      { name: 'Microblading', durationMinutes: 60, priceCents: 20000, bookingMode: 'online' },
      { name: 'Shading', durationMinutes: 60, priceCents: 18000, bookingMode: 'online' },
      { name: 'Microshading', durationMinutes: 60, priceCents: 20000, bookingMode: 'online' },
      { name: 'Grain de beauté', durationMinutes: 30, priceCents: 3000, bookingMode: 'online' },
      {
        name: 'Retouche à 1 mois',
        note: 'Obligatoire.',
        durationMinutes: 60,
        priceCents: 5000,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'maquillage-permanent-levres',
    name: 'Maquillage permanent — Lèvres',
    items: [
      { name: 'Candy Lips', durationMinutes: 60, priceCents: 20000, bookingMode: 'online' },
      {
        name: 'Retouche à 1 mois',
        note: 'Obligatoire.',
        durationMinutes: 60,
        priceCents: 5000,
        bookingMode: 'online',
      },
      { name: 'Retouche annuelle', durationMinutes: 60, priceCents: 10000, bookingMode: 'online' },
    ],
  },
  {
    id: 'massages',
    name: 'Massages',
    notice: 'Ces quatre prestations sont réservables uniquement par téléphone.',
    items: [
      {
        name: 'Massage visage régénérant',
        durationMinutes: 30,
        priceCents: 6000,
        bookingMode: 'phone',
      },
      { name: 'Massage Kobido', durationMinutes: 30, priceCents: 6000, bookingMode: 'phone' },
      {
        name: 'Massage corps — Madérothérapie',
        durationMinutes: 30,
        priceCents: 8000,
        bookingMode: 'phone',
      },
      {
        name: 'Massage des jambes',
        durationMinutes: 30,
        priceCents: 6000,
        bookingMode: 'phone',
      },
    ],
  },
  {
    id: 'pack-beaute',
    name: 'Pack Beauté',
    description: 'Mise en beauté complète chez Beauty Laï : profitez d’un moment privilégié.',
    items: [
      {
        name: 'Pack Beauté express',
        description: 'Ongles semi-permanents + browlift + teinture.',
        durationMinutes: 95,
        priceCents: 8000,
        bookingMode: 'online',
      },
      {
        name: 'Pack Beauté complet',
        description:
          'Semi-permanent + browlift + teinture + épilation des sourcils + rehaussement de cils.',
        durationMinutes: 130,
        priceCents: 11000,
        bookingMode: 'online',
      },
      {
        name: 'Pack mariée',
        description:
          'Volume mixte + browlift + teinture + épilation des sourcils + semi-permanent ou capsules américaines.',
        durationMinutes: 200,
        priceCents: 15000,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'epilation-cire',
    name: 'Épilation cire',
    items: [
      { name: 'Sourcils', durationMinutes: 20, priceCents: 1200, bookingMode: 'online' },
      {
        name: 'Épilation des lèvres',
        durationMinutes: 20,
        priceCents: 800,
        bookingMode: 'online',
      },
    ],
  },
  {
    id: 'formation',
    name: 'Formation',
    items: [
      {
        name: 'Épilation au fil',
        description:
          'Formation complète dédiée à la technique de l’épilation au fil : théorie, pratique, gestes professionnels et kit complet inclus.',
        durationMinutes: 420,
        priceCents: 45000,
        bookingMode: 'online',
      },
      {
        name: 'Extension de cils — Cil à cil',
        description:
          'Formation pour apprendre et maîtriser les bases de la technique cil à cil, avec théorie et pratique.',
        durationMinutes: 420,
        priceCents: 60000,
        bookingMode: 'online',
      },
      {
        name: 'Perfectionnement extensions de cils — Cil à cil',
        durationMinutes: 360,
        priceCents: 20000,
        bookingMode: 'online',
      },
    ],
  },
];
