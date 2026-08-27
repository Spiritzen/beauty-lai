import { describe, expect, it } from 'vitest';
import { businessInfo } from './business';
import { formatDuration, formatPrice, formatPriceLabel, pricingCategories } from './pricing';

const EXPECTED_CATEGORY_ORDER = [
  'Informations',
  'Les dents',
  'Extensions de cheveux',
  'Épilation au fil',
  'Spécial regard',
  'Spécial ongles',
  'Maquillage permanent — Yeux',
  'Maquillage permanent — Lèvres',
  'Massages',
  'Pack Beauté',
  'Épilation cire',
  'Formation',
];

const EXPECTED_COUNTS: Record<string, number> = {
  Informations: 4,
  'Les dents': 4,
  'Extensions de cheveux': 4,
  'Épilation au fil': 6,
  'Spécial regard': 14,
  'Spécial ongles': 15,
  'Maquillage permanent — Yeux': 5,
  'Maquillage permanent — Lèvres': 3,
  Massages: 4,
  'Pack Beauté': 3,
  'Épilation cire': 2,
  Formation: 3,
};

describe('Carte des prestations et tarifs', () => {
  it('contient exactement les 12 catégories, dans le bon ordre', () => {
    expect(pricingCategories.map((c) => c.name)).toEqual(EXPECTED_CATEGORY_ORDER);
  });

  it('contient exactement 67 entrées au total après déduplication', () => {
    const total = pricingCategories.reduce((sum, c) => sum + c.items.length, 0);
    expect(total).toBe(67);
  });

  it('respecte le nombre attendu de prestations par catégorie', () => {
    for (const category of pricingCategories) {
      expect(category.items.length).toBe(EXPECTED_COUNTS[category.name]);
    }
  });

  it("n'a aucun doublon exact (même nom) au sein d'une même catégorie", () => {
    for (const category of pricingCategories) {
      const names = category.items.map((item) => item.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it('affiche EVJF une seule fois, dans la catégorie Informations', () => {
    const occurrences = pricingCategories.flatMap((c) => c.items).filter((i) => i.name === 'EVJF');
    expect(occurrences).toHaveLength(1);
  });

  it("affiche « Pose de vernis semi-permanent — Mains » une seule fois", () => {
    const occurrences = pricingCategories
      .flatMap((c) => c.items)
      .filter((i) => i.name === 'Pose de vernis semi-permanent — Mains');
    expect(occurrences).toHaveLength(1);
  });

  it("n'intègre aucune offre découverte", () => {
    const hasDiscovery = pricingCategories
      .flatMap((c) => c.items)
      .some((i) => /d[ée]couverte/i.test(i.name));
    expect(hasDiscovery).toBe(false);
  });

  it('a un prix strictement positif lorsqu’il existe', () => {
    for (const item of pricingCategories.flatMap((c) => c.items)) {
      if (item.priceCents !== undefined) {
        expect(item.priceCents).toBeGreaterThan(0);
      }
    }
  });

  it('a une durée strictement positive lorsqu’elle existe', () => {
    for (const item of pricingCategories.flatMap((c) => c.items)) {
      if (item.durationMinutes !== undefined) {
        expect(item.durationMinutes).toBeGreaterThan(0);
      }
    }
  });

  it("n'exige ni prix ni durée pour les entrées de la catégorie Informations", () => {
    const informations = pricingCategories.find((c) => c.name === 'Informations');
    expect(informations).toBeDefined();
    for (const item of informations!.items) {
      expect(item.priceCents).toBeUndefined();
      expect(item.durationMinutes).toBeUndefined();
      expect(item.bookingMode).toBe('information');
    }
  });
});

describe('Formatage des prix et durées', () => {
  it('formate un prix entier en euros français, sans décimales inutiles', () => {
    expect(formatPrice(8000)).toMatch(/^80\s?€$/);
  });

  it('ajoute le préfixe « À partir de » lorsque priceFrom vaut true', () => {
    const label = formatPriceLabel({ priceCents: 25000, priceFrom: true });
    expect(label).toMatch(/^À partir de 250\s?€$/);
  });

  it('ne préfixe pas quand priceFrom est absent ou faux', () => {
    const label = formatPriceLabel({ priceCents: 8000 });
    expect(label).toMatch(/^80\s?€$/);
  });

  it('retourne undefined sans priceCents', () => {
    expect(formatPriceLabel({})).toBeUndefined();
  });

  it('formate les durées naturellement', () => {
    expect(formatDuration(30)).toBe('30 min');
    expect(formatDuration(60)).toBe('1 h');
    expect(formatDuration(75)).toBe('1 h 15');
    expect(formatDuration(130)).toBe('2 h 10');
  });
});

describe('CTA de la carte tarifs', () => {
  it('utilise exactement l’URL Planity officielle', () => {
    expect(businessInfo.planityUrl).toBe('https://www.planity.com/beauty-lai-80080-amiens');
  });
});
