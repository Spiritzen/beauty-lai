/**
 * Configuration d'URL publique du site.
 *
 * Aucune URL de production n'est encore fixée : le nom de domaine
 * définitif n'a pas été validé. `SITE_URL` reste donc délibérément
 * `undefined` tant que cette information n'est pas fournie — ne jamais
 * la remplacer par `localhost` ni par un domaine inventé.
 *
 * Une fois l'URL publique connue, renseigner ici une seule fois une
 * convention unique (avec ou sans slash final) : canonical, Open Graph,
 * JSON-LD et sitemap s'aligneront automatiquement dessus.
 */
export const SITE_URL: string | undefined = undefined;

/**
 * Construit une URL absolue à partir d'un chemin, en s'appuyant sur
 * l'API `URL` plutôt que sur une concaténation naïve de chaînes — ce qui
 * élimine par construction les doubles slashes parasites dans le
 * pathname. Retourne `undefined` tant qu'aucune URL publique n'est
 * configurée, pour ne jamais exposer localhost ou un domaine fictif.
 */
export function buildAbsoluteUrl(path: string): string | undefined {
  if (!SITE_URL) {
    return undefined;
  }

  const base = SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return new URL(cleanPath, base).toString();
}
