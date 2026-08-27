import { businessInfo } from './business';
import { buildAbsoluteUrl } from './site';

/** Sous-ensemble strict de schema.org/PostalAddress utilisé ici. */
export interface PostalAddressJsonLd {
  readonly '@type': 'PostalAddress';
  readonly streetAddress: string;
  readonly postalCode: string;
  readonly addressLocality: string;
  readonly addressCountry: string;
}

/**
 * Sous-ensemble strict de schema.org/BeautySalon utilisé ici.
 * Volontairement minimal : uniquement des données honnêtes et
 * disponibles. Pas de note, d'avis, de téléphone, de prix ni d'horaires
 * tant qu'ils restent marqués provisoires côté données métier.
 */
export interface BeautySalonJsonLd {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'BeautySalon';
  readonly name: string;
  readonly address: PostalAddressJsonLd;
  readonly sameAs: readonly string[];
  readonly url?: string;
  readonly image?: string;
}

/**
 * Construit l'objet JSON-LD BeautySalon à partir des seules données
 * métier authentifiées. `url` et `image` ne sont inclus que si une URL
 * publique absolue peut être calculée proprement (voir buildAbsoluteUrl) ;
 * sinon ils sont simplement omis, jamais remplacés par une valeur
 * inventée.
 */
export function buildBeautySalonJsonLd(): BeautySalonJsonLd {
  const sameAs = [businessInfo.instagramUrl, businessInfo.planityUrl].filter(
    (value): value is string => Boolean(value),
  );

  const canonicalUrl = buildAbsoluteUrl('/');

  const jsonLd: BeautySalonJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: businessInfo.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '36 place René-Goblet',
      postalCode: '80000',
      addressLocality: businessInfo.city,
      addressCountry: 'FR',
    },
    sameAs,
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  };

  return jsonLd;
}
