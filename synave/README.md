# Synave

> **Vos plateformes web. Votre société en Suisse.**

Site vitrine de **Synave** : conception de plateformes web, extranets, intranets
et sites sur mesure, et accompagnement à la **création de société en Suisse**.

Projet **Next.js 15 autonome**, vivant dans le sous-dossier `synave/` du dépôt
ChezGustave. Il a ses propres dépendances, son propre build et son propre
déploiement : les deux marques ne partagent aucun code.

---

## 🚀 Démarrage

```bash
cd synave
npm install
cp .env.example .env.local   # facultatif en développement
npm run dev                  # http://localhost:3000
```

Autres commandes :

| Commande            | Effet                                     |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Serveur de développement                  |
| `npm run build`     | Build de production                       |
| `npm start`         | Sert le build de production               |
| `npm run lint`      | ESLint (config `next/core-web-vitals`)    |
| `npm run typecheck` | Vérification TypeScript, sans compilation |

---

## 📄 Les pages

| URL                 | Contenu                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `/`                 | Accueil : offre, double métier, méthode, engagements, extrait de réalisations  |
| `/services`         | Les 6 prestations en détail, avec délais et budgets indicatifs                 |
| `/creation-societe` | Comparatif Sàrl / SA / raison individuelle, 9 étapes, **simulateur**, FAQ      |
| `/realisations`     | Cas anonymisés, filtrables par catégorie                                       |
| `/a-propos`         | Raison d'être, principes, méthode, zone d'intervention                         |
| `/contact`          | Formulaire validé côté serveur + coordonnées                                   |

Plus `sitemap.xml`, `robots.txt`, une page 404 et des données structurées
(`ProfessionalService` sur tout le site, `FAQPage` sur la création de société).

---

## ✍️ Ce qu'il faut personnaliser avant la mise en ligne

Tout le contenu éditorial est regroupé dans `src/lib/`, séparé des composants.

| Fichier                | À revoir                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| `src/lib/site.ts`      | **Coordonnées réelles** (e-mail, téléphone, adresse), URL, LinkedIn        |
| `src/lib/services.ts`  | Descriptifs, délais et **fourchettes de prix**                             |
| `src/lib/company.ts`   | Honoraires de constitution, coefficients cantonaux, options du simulateur  |
| `src/lib/projects.ts`  | **Références clientes** (voir l'avertissement ci-dessous)                  |
| `src/lib/contact.ts`   | Sujets et fourchettes de budget du formulaire                              |

Les valeurs livrées sont des **valeurs de départ plausibles**, pas des données
réelles :

- **Coordonnées** — `contact@synave.ch`, `+41 22 000 00 00` et l'adresse
  genevoise sont des espaces réservés. À remplacer partout via `site.ts`.
- **Prix et honoraires** — ordres de grandeur destinés à situer un projet.
  Le site le précise à chaque affichage, mais alignez-les sur votre grille.
- **Réalisations** — ce sont des **profils de projets types anonymisés**, pas
  des mandats réels. La page l'indique explicitement au visiteur. Remplacez-les
  par de véritables références au fur et à mesure, et uniquement avec l'accord
  écrit du client.
- **Émoluments officiels** — les montants du registre du commerce et les
  fourchettes notariales sont des ordres de grandeur ; ils varient selon le
  canton et le notaire. Le simulateur affiche un avertissement en ce sens.

---

## 📬 Formulaire de contact

Le formulaire est traité par une **server action** (`src/app/contact/actions.ts`)
qui valide les champs avec Zod, puis transmet la demande.

Il n'y a **pas de base de données** : la demande est envoyée en `POST` JSON à
l'URL définie par `CONTACT_WEBHOOK_URL` (Make, Zapier, n8n, Slack, Resend,
Formspree…).

```jsonc
{
  "name": "…",
  "email": "…",
  "company": "…",     // facultatif
  "phone": "…",       // facultatif
  "subject": "…",
  "budget": "…",      // facultatif
  "message": "…",
  "consent": "on",
  "receivedAt": "2026-08-15T09:00:00.000Z",
}
```

> ⚠️ **Tant que `CONTACT_WEBHOOK_URL` n'est pas définie, les demandes sont
> uniquement écrites dans les logs du serveur — elles n'arrivent à personne.**
> Le visiteur voit malgré tout une confirmation. À brancher impérativement avant
> la mise en ligne.

Un champ piège (_honeypot_) filtre les robots les plus basiques. Pour un site
très exposé, ajoutez un captcha ou une limitation de débit au niveau de
l'hébergeur.

---

## ☁️ Mise en ligne sur Vercel

Le projet vit dans un sous-dossier : il faut l'indiquer à Vercel.

1. **New Project** → importez le dépôt `ChezGustave`.
2. **Root Directory** → `synave` _(l'étape à ne pas oublier)_.
3. Framework preset : **Next.js** (détecté automatiquement).
4. **Environment Variables** → ajoutez `CONTACT_WEBHOOK_URL`.
5. **Deploy**, puis rattachez le domaine (`synave.ch`) dans _Settings → Domains_.

### Extraire le site dans son propre dépôt

Le dossier étant autonome, la séparation est triviale le jour où vous la
souhaitez :

```bash
cp -r synave /chemin/vers/synave-standalone
cd /chemin/vers/synave-standalone
git init && git add . && git commit -m "Site Synave"
git remote add origin git@github.com:<compte>/synave.git
git push -u origin main
```

Il ne reste qu'à repointer le projet Vercel sur le nouveau dépôt et à remettre
_Root Directory_ à la racine.

---

## 🎨 Le design

Identité volontairement distincte de Chez Gustave : **bleu nuit d'ingénierie**,
**bleu signal**, **menthe**, et une pointe de **rouge suisse** réservée au volet
création de société.

- Typographies : **Space Grotesk** (titres) et **Inter** (texte), servies en
  local via `@fontsource` — aucun appel à Google Fonts.
- Le thème complet (couleurs, rayons, polices) tient dans le bloc `@theme` de
  `src/app/globals.css`. Changer la marque = changer ces variables.
- Chaque page ouvre sur un héro sombre, ce qui permet à l'en-tête d'être
  transparent en haut de page puis de devenir opaque au défilement.
- Les animations respectent `prefers-reduced-motion`, et le contenu reste
  visible sans JavaScript.

## 🧱 Structure

```
synave/
├── src/
│   ├── app/
│   │   ├── layout.tsx            en-tête, pied de page, SEO, données structurées
│   │   ├── page.tsx              accueil
│   │   ├── services/
│   │   ├── creation-societe/
│   │   ├── realisations/
│   │   ├── a-propos/
│   │   ├── contact/              page + server action
│   │   ├── sitemap.ts robots.ts not-found.tsx icon.svg
│   │   └── globals.css           design system (@theme Tailwind 4)
│   ├── components/
│   │   ├── ui/                   Button, Section, Container, Reveal, Logo, icônes
│   │   ├── site/                 Header, Footer, PageHero, CtaBand
│   │   ├── home/                 illustration du héros
│   │   ├── creation/             simulateur, FAQ
│   │   ├── realisations/         grille filtrable
│   │   └── contact/              formulaire
│   └── lib/                      contenu éditorial et utilitaires
└── …
```

## 🛠️ Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod
