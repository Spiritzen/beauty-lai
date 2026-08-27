import { describe, expect, it } from 'vitest';
import { businessInfo } from './business';
import { serviceCategories } from './services';
import { openingHours } from './hours';
import { reviewSummary } from './reviews';

const EXPECTED_PLANITY_URL = 'https://www.planity.com/beauty-lai-80080-amiens';
const EXPECTED_INSTAGRAM_URL = 'https://www.instagram.com/beau.tylai/';

describe('Données métier Beauty Laï', () => {
  it("expose l'URL Planity exacte utilisée par les CTA de réservation", () => {
    expect(businessInfo.planityUrl).toBe(EXPECTED_PLANITY_URL);
    expect(reviewSummary.url).toBe(EXPECTED_PLANITY_URL);
  });

  it("expose l'URL Instagram exacte", () => {
    expect(businessInfo.instagramUrl).toBe(EXPECTED_INSTAGRAM_URL);
  });

  it('chaque prestation renvoie vers l’URL Planity exacte', () => {
    expect(serviceCategories.length).toBeGreaterThan(0);
    for (const service of serviceCategories) {
      expect(service.bookingUrl).toBe(EXPECTED_PLANITY_URL);
    }
  });

  it("ne contient aucun téléphone ni email, fictif ou réel", () => {
    const serialized = JSON.stringify({
      businessInfo,
      serviceCategories,
      openingHours,
      reviewSummary,
    });

    expect(serialized).not.toMatch(/@/);
    expect(serialized).not.toMatch(/0[1-9](?:[ .-]?\d{2}){4}/);
  });
});
