<div align="center">

# ✦ Beauty Laï

### Une vitrine digitale premium pour un institut de beauté à Amiens
**Élégante · Responsive · Accessible · Orientée réservation**

[![Portfolio](https://img.shields.io/badge/Portfolio-Sébastien_Cantrelle-B9965B?style=for-the-badge)](https://spiritzen.github.io/portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-Spiritzen-181717?style=for-the-badge&logo=github)](https://github.com/Spiritzen)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sebastien-cantrelle-26b695106/)

<br>

![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-Îlots_interactifs-61DAFB?style=flat-square&logo=react&logoColor=111111)
![Static](https://img.shields.io/badge/Sortie-100_%25_statique-10B981?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-320_→_1440_px-B9965B?style=flat-square)
![Statut](https://img.shields.io/badge/Statut-Maquette_de_démonstration-C98F82?style=flat-square)

</div>

---

> **Beauty Laï** est une landing page premium conçue pour montrer comment un institut de beauté local peut disposer d’une présence web claire, élégante et complémentaire à sa page Planity.
>
> La vitrine valorise l’identité de l’institut, ses espaces, ses prestations et ses tarifs, puis guide le visiteur vers la réservation en ligne sans recréer un système de rendez-vous inutile.
>
> Ce projet est une **maquette commerciale non officielle** réalisée dans le cadre de ma prospection. Les contenus, coordonnées, horaires, tarifs, photographies et droits de publication doivent être validés avec Beauty Laï avant toute mise en production réelle.

---

## 🎯 Objectif du projet

Planity répond efficacement au besoin de réservation. Cette vitrine répond à un autre besoin : **donner envie avant de réserver**.

Le projet cherche à :

- installer une image de marque premium dès le premier écran ;
- présenter l’univers et les véritables espaces de l’institut ;
- expliquer clairement les grandes familles de soins ;
- rendre les prestations et les tarifs faciles à consulter ;
- rassurer grâce à l’adresse, aux avis et aux informations pratiques ;
- conduire naturellement chaque visiteur vers la page Planity officielle ;
- améliorer la présence locale de l’institut avec un socle SEO honnête ;
- proposer une expérience fluide sur mobile, tablette et ordinateur.

---

## ✨ Expérience proposée

### Une direction artistique cohérente

- palette composée d’encre profonde, d’ivoire chaud, de nude poudré, d’argile rosée et de champagne mat ;
- duo typographique **Cormorant Garamond + Manrope** ;
- compositions éditoriales asymétriques et détails graphiques discrets ;
- monogramme et favicon Beauty Laï dessinés pour la démonstration ;
- alternance de surfaces claires et sombres pour rythmer la lecture ;
- photographies de l’institut intégrées dans une galerie élégante et responsive.

### Un parcours commercial lisible

- hero immersif avec deux appels à l’action ;
- présentation de l’institut et de ses espaces ;
- six univers : regard, onglerie, visage, cheveux, bien-être et événements ;
- section « L’expérience » en trois étapes ;
- carte détaillée composée de **12 catégories déroulantes et 67 entrées** ;
- durées et tarifs alignés et adaptés aux petites largeurs ;
- mise en avant de la note Planity ;
- adresse, itinéraire et lien Instagram ;
- redirections vers la page de réservation Planity officielle.

### Une réservation volontairement simple

Le site ne remplace pas Planity et ne possède ni agenda, ni compte utilisateur, ni paiement.

Les appels à l’action dirigent vers :

**[Beauty Laï sur Planity](https://www.planity.com/beauty-lai-80080-amiens)**

Les tarifs peuvent évoluer. Les informations et disponibilités confirmées sur Planity font foi.

---

## 🪞 Photographies et identité

La démonstration associe :

- des photographies des espaces réels de Beauty Laï ;
- le logo source de l’institut dans la section de présentation ;
- des visuels éditoriaux de démonstration pour illustrer les prestations ;
- un pipeline d’images Astro produisant des variantes AVIF et WebP responsives.

Les visuels sont cadrés selon leur rôle : image prioritaire pour le hero, galerie asymétrique pour l’institut et formats homogènes pour les cartes de prestations.

> La publication publique des photographies réelles et du logo reste soumise à l’accord de Beauty Laï.

---

## 🛠 Stack technique

| Besoin | Technologie | Utilisation |
|---|---|---|
| Génération du site | Astro 7 | Pages statiques et composants par section |
| Langage | TypeScript strict | Données métier et utilitaires typés |
| Interactivité | React | Îlot limité au menu mobile accessible |
| Styles | CSS natif | Tokens, responsive et animations légères |
| Images | `astro:assets` | Variantes AVIF/WebP et dimensions explicites |
| Titres | Cormorant Garamond | Police auto-hébergée avec Fontsource |
| Interface | Manrope | Police auto-hébergée avec Fontsource |
| Tests | Vitest | Données, composants et garde-fous SEO |
| Qualité | Astro Check | Validation TypeScript et composants Astro |

Aucun backend, CMS, framework CSS, bibliothèque d’animation, tracker ou police distante n’est nécessaire.

---

## 🏗 Architecture

```text
src/
├── assets/
│   └── images/                 Visuels sources traités par Astro
├── components/
│   ├── astro/                  Sections statiques de la landing page
│   └── react/                  Disclosure du menu mobile
├── data/
│   ├── business.ts             Identité et liens officiels
│   ├── hours.ts                Horaires centralisés
│   ├── jsonld.ts               Données structurées BeautySalon
│   ├── navigation.ts           Navigation principale
│   ├── pricing.ts              Prestations, durées et tarifs
│   ├── reviews.ts              Preuve sociale
│   ├── services.ts             Familles de prestations
│   └── site.ts                 Construction sûre des URL publiques
├── layouts/
│   └── BaseLayout.astro        Métadonnées et structure globale
├── pages/
│   └── index.astro             Assemblage de la page
├── styles/
│   ├── fonts.css               Polices auto-hébergées
│   ├── global.css              Styles globaux et responsive
│   └── tokens.css              Couleurs, espacements et rayons
└── types/                      Types partagés
```

Les informations commerciales sont centralisées afin de faciliter les corrections demandées par le client sans réécrire les composants.

---

## 💎 Carte des prestations

La carte tarifaire est placée entre les sections « L’expérience » et « Avis ».

Elle comprend :

1. Informations ;
2. Les dents ;
3. Extensions de cheveux ;
4. Épilation au fil ;
5. Spécial regard ;
6. Spécial ongles ;
7. Maquillage permanent — Yeux ;
8. Maquillage permanent — Lèvres ;
9. Massages ;
10. Pack Beauté ;
11. Épilation cire ;
12. Formation.

Les catégories utilisent des éléments HTML natifs `details` et `summary`. Elles restent compactes lorsqu’elles sont fermées et accessibles au clavier sans dépendre de JavaScript.

Les prix sont stockés en centimes puis formatés avec `Intl.NumberFormat`, tandis que les durées sont centralisées en minutes et affichées dans un format naturel.

---

## ♿ Accessibilité

- structure sémantique avec un seul `h1` et une hiérarchie de titres cohérente ;
- lien d’évitement vers le contenu principal ;
- navigation utilisable au clavier ;
- menu mobile refermable avec `Escape` et restitution du focus ;
- disclosures tarifaires basés sur des éléments HTML natifs ;
- focus visible sur les éléments interactifs ;
- cibles tactiles essentielles d’au moins 44 × 44 px ;
- contrastes conformes au niveau AA ;
- réduction des animations avec `prefers-reduced-motion` ;
- palette protégée contre l’inversion automatique en mode sombre ;
- liens externes ouverts avec `rel="noopener noreferrer"`.

---

## 🔎 SEO local honnête

Le projet prépare un futur référencement local sans inventer de données commerciales :

- titre et description ciblant l’activité et la localisation à Amiens ;
- balises Open Graph ;
- JSON-LD typé avec le schéma `BeautySalon` ;
- adresse et profils officiels centralisés ;
- URL construites avec l’API `URL`, sans concaténation fragile ;
- absence de note, d’avis, de téléphone ou d’horaires inventés dans les données structurées ;
- aucune URL `localhost` ou double barre parasite dans le build.

La maquette reste en `noindex, nofollow` tant que Beauty Laï n’a pas validé les contenus, les droits de publication et le domaine définitif.

---

## ⚡ Performance

- sortie entièrement statique ;
- image principale chargée en priorité ;
- images sous la ligne de flottaison chargées en différé ;
- variantes AVIF et WebP générées selon la largeur d’écran ;
- attributs `width` et `height` explicites pour limiter les décalages de mise en page ;
- polices hébergées localement ;
- aucun script publicitaire ou outil de suivi tiers ;
- interactivité React limitée au composant qui en a réellement besoin.

---

## 🚀 Installation locale

### Prérequis

- Node.js 22 recommandé ;
- npm 10 ou version compatible.

### Démarrage

```bash
git clone <URL_DU_DEPOT>
cd beauty-lai
npm install
npm run dev
```

Astro indique ensuite l’adresse locale, généralement :

```text
http://localhost:4321
```

### Validation complète

```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

---

## 📦 Déploiement

Le site est entièrement statique et peut être publié sur :

- GitHub Pages ;
- Netlify ;
- Vercel ;
- Cloudflare Pages ;
- un hébergement web classique.

L’URL de la démonstration sera ajoutée ici après la création du dépôt et la validation du premier déploiement.

---

## ⚠️ Nature de la démonstration

Cette version n’est pas le site officiel de Beauty Laï.

- elle a été créée pour présenter une proposition de site vitrine ;
- elle ne collecte aucune donnée personnelle ;
- elle ne gère aucun rendez-vous ni paiement ;
- les réservations sont confiées à Planity ;
- les mentions légales restent provisoires ;
- les horaires, tarifs, coordonnées et textes doivent être confirmés par l’institut ;
- les droits de publication des photographies et du logo doivent être validés ;
- le référencement public demeure désactivé pendant la phase de démonstration.

---

## 👤 Auteur

<div align="center">

### Sébastien Cantrelle
**Concepteur développeur d’applications · Sites vitrines et applications web · Amiens, France**

[![Portfolio](https://img.shields.io/badge/Portfolio-spiritzen.github.io-B9965B?style=flat-square)](https://spiritzen.github.io/portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sébastien_Cantrelle-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/sebastien-cantrelle-26b695106/)
[![GitHub](https://img.shields.io/badge/GitHub-Spiritzen-181717?style=flat-square&logo=github)](https://github.com/Spiritzen)

*Beauty Laï · Maquette frontend premium · 2026*

</div>
