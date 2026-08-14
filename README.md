# 🐾 Chez Gustave

> **Gardez un chien, partez au vert.**
> Plateforme de garde de chien **à domicile** en Suisse romande.

Chez Gustave met en relation des **propriétaires** qui partent en vacances avec
des **gardiens** passionnés qui viennent séjourner chez eux pour s'occuper du
chien — contre rémunération. Le positionnement unique : le gardien est à la fois
**payé et logé**. Une escapade à la campagne, pas une corvée.

---

## ☁️ Mise en ligne (Vercel)

👉 **Guide pas à pas dans [`DEPLOY-VERCEL.md`](./DEPLOY-VERCEL.md)** (base Neon
gratuite + Vercel, ~10 min, sans commande à taper).

## 🚀 Démarrage rapide (local)

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
#   → renseignez DATABASE_URL avec une base PostgreSQL
#     (créez-en une gratuitement sur https://neon.tech)

# 3. Créer les tables et injecter les données de démo
npm run db:push
npm run db:seed

# 4. Lancer le serveur de développement
npm run dev
```

L'application est disponible sur **http://localhost:3000**.

### Comptes de démonstration

Tous les comptes utilisent le mot de passe `gustave123` (l'authentification
sera branchée à l'étape suivante).

| Rôle          | Email               | Voit…                                  |
| ------------- | ------------------- | -------------------------------------- |
| Propriétaire  | `pierre@example.ch` | Messages, candidatures reçues, carnet  |
| Gardien       | `lea@example.ch`    | Escapades, sa garde en cours, carnet   |

> En attendant l'auth, le mode actif (Propriétaire / Gardien) est stocké dans un
> cookie et bascule via la pastille en haut à droite ou le sélecteur du Profil.

---

## 🧱 Stack technique

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — design system « nature / campagne »
- **[Prisma](https://www.prisma.io/)** — ORM (SQLite en dev, PostgreSQL en prod)
- **[Auth.js](https://authjs.dev/)** — authentification *(à brancher)*
- **[Stripe Connect](https://stripe.com/connect)** — paiements + commission *(à brancher)*

---

## 📁 Structure

```
prisma/
  schema.prisma        # modèle de données complet (users, escapades, bookings…)
  seed.ts              # données de démonstration (Genève / campagne genevoise)
src/
  app/
    page.tsx           # accueil (histoire de Gustave + choix du mode)
    (app)/             # application avec barre du haut + navigation du bas
      decouvrir/       # 🔍 Découvrir (liste + carte, filtres, recherche)
        escapade/[id]/ # fiche escapade + parcours « postuler »
        gardien/[id]/  # fiche gardien
      messages/        # 💬 messagerie
      publier/         # ➕ publier une escapade / éditer son profil gardien
      profil/          # 👤 tableau de bord (demandes, favoris, parrainage…)
      carnet/          # 📔 carnet de garde
      notifications/
  components/          # UI (ui/, layout/, discover/, publish/, messages/…)
  lib/                 # prisma, constantes métier, helpers, requêtes
```

---

## ✅ Ce qui est en place

- **Double profil** Propriétaire ⇄ Gardien avec contenu adaptatif
- **Découvrir** : liste + carte stylisée de Suisse romande, recherche, filtres
  (ambiance / animal / dernière minute)
- **Fiches** escapade (passeport du chien, « que faire autour », avis, assurance)
  et gardien (badge Super Gardien, avis, contact)
- **Publier** une escapade ou créer son profil gardien (formulaires connectés à la DB)
- **Postuler** à une escapade (avec calcul de la commission ~18 %)
- **Messagerie** fonctionnelle (envoi de messages)
- **Carnet de garde** (photo + mot du jour, balade, album souvenir)
- **Profil** : mes demandes, favoris, parrainage, statistiques, notifications

## 🔜 Prochaines étapes

- [ ] **Authentification** réelle (Auth.js) — inscription, connexion, sessions
- [ ] **Paiements** Stripe Connect — encaissement, commission, versement gardien
- [ ] **Réservations** : accepter une candidature → booking → paiement
- [ ] **Favoris** interactifs (cœur) et notifications temps réel
- [ ] **Upload de photos** (chiens, profils, carnet de garde)
- [ ] Passage à **PostgreSQL** en production (voir ci-dessous)

---

## 🗄️ Base de données

Le projet utilise **PostgreSQL** (via Prisma). En local comme en production,
`DATABASE_URL` doit pointer vers une base Postgres — le plus simple est une base
gratuite sur [Neon](https://neon.tech).

- Les tables sont créées automatiquement au déploiement (`prisma db push` est
  inclus dans le build), ou en local avec `npm run db:push`.
- Les listes (animaux, ambiances, activités) sont stockées en JSON via des
  helpers (`jsonList` / `toJsonList`) ; les « enums » sont des chaînes avec des
  constantes applicatives (`src/lib/constants.ts`).

---

## 📜 Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Serveur de développement                 |
| `npm run build`     | Build de production                      |
| `npm run start`     | Serveur de production                    |
| `npm run db:push`   | Applique le schéma à la base             |
| `npm run db:seed`   | Injecte les données de démo              |
| `npm run db:reset`  | Réinitialise + re-seed                   |
| `npm run db:studio` | Interface visuelle de la base (Prisma)   |
| `npm run typecheck` | Vérification TypeScript                   |

---

*Chez Gustave — prototype. Les données de démonstration sont fictives ; les
volets paiement, assurance et juridique sont en cours de mise en place.*
