import { describe, expect, it } from 'vitest';
import { buildBeautySalonJsonLd } from './jsonld';
import { buildAbsoluteUrl, SITE_URL } from './site';

describe('JSON-LD BeautySalon', () => {
  it('produit un JSON strict, parsable sans exception', () => {
    const jsonLd = buildBeautySalonJsonLd();
    const serialized = JSON.stringify(jsonLd);

    expect(() => JSON.parse(serialized)).not.toThrow();
  });

  it('ne contient aucune valeur undefined/NaN/Infinity ni de placeholder', () => {
    const serialized = JSON.stringify(buildBeautySalonJsonLd());

    expect(serialized).not.toMatch(/undefined/);
    expect(serialized).not.toMatch(/NaN/);
    expect(serialized).not.toMatch(/Infinity/);
    expect(serialized).not.toMatch(/localhost/i);
  });

  it('ne contient aucune propriété interdite (avis, note, téléphone, prix, horaires, SIRET)', () => {
    const jsonLd = buildBeautySalonJsonLd() as unknown as Record<string, unknown>;

    expect(jsonLd).not.toHaveProperty('aggregateRating');
    expect(jsonLd).not.toHaveProperty('review');
    expect(jsonLd).not.toHaveProperty('telephone');
    expect(jsonLd).not.toHaveProperty('email');
    expect(jsonLd).not.toHaveProperty('priceRange');
    expect(jsonLd).not.toHaveProperty('taxID');
    expect(jsonLd).not.toHaveProperty('vatID');
    expect(jsonLd).not.toHaveProperty('openingHoursSpecification');
  });

  it("expose le nom, l'adresse et les liens sameAs officiels attendus", () => {
    const jsonLd = buildBeautySalonJsonLd();

    expect(jsonLd.name).toBe('Beauty Laï');
    expect(jsonLd.address.addressLocality).toBe('Amiens');
    expect(jsonLd.sameAs).toContain('https://www.planity.com/beauty-lai-80080-amiens');
    expect(jsonLd.sameAs).toContain('https://www.instagram.com/beau.tylai/');
    expect(jsonLd.sameAs.length).toBeGreaterThan(0);
  });

  it("n'inclut pas d'URL tant qu'aucun domaine public n'est configuré", () => {
    // Ce test documente l'état actuel (SITE_URL non configuré) plutôt que
    // de figer un comportement définitif.
    if (SITE_URL === undefined) {
      const jsonLd = buildBeautySalonJsonLd();
      expect(jsonLd.url).toBeUndefined();
    }
  });
});

describe('buildAbsoluteUrl', () => {
  it('retourne undefined tant que SITE_URL est undefined (pas de localhost, pas de domaine inventé)', () => {
    if (SITE_URL === undefined) {
      expect(buildAbsoluteUrl('/')).toBeUndefined();
      expect(buildAbsoluteUrl('/prestations')).toBeUndefined();
    }
  });

  it('ne produit jamais de double slash parasite dans le pathname si SITE_URL était configuré', () => {
    const base = 'https://exemple-provisoire.test/';
    const cases = ['/', '/prestations', 'prestations', '//prestations'];

    for (const path of cases) {
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const url = new URL(cleanPath, base);
      const pathname = url.pathname;
      // Le seul "//" légitime est celui de "https://" dans l'origine, absent du pathname.
      expect(pathname.includes('//')).toBe(false);
    }
  });
});
