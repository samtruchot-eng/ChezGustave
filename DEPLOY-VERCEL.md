# 🚀 Mettre Chez Gustave en ligne sur Vercel

Guide pas à pas, sans jargon. Compte ~10 minutes. Deux choses à créer :
une **base de données** (Neon, gratuit) et un **projet Vercel**.

---

## Étape 1 — Créer la base de données (Neon, gratuit)

Vercel ne peut pas stocker de base « en dur » : il faut une base PostgreSQL
hébergée. Neon est gratuit et parfait pour ça.

1. Allez sur **https://neon.tech** et créez un compte (connexion avec GitHub =
   le plus rapide).
2. Cliquez **New Project**. Donnez un nom (ex. `chez-gustave`), laissez la
   région par défaut (Europe si proposé), puis **Create**.
3. Neon affiche une **Connection string** (ça ressemble à
   `postgresql://user:xxxx@ep-...-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`).
4. ⚠️ **Important** : décochez l'option **« Connection pooling »** (ou
   « Pooled connection ») pour copier la version **directe** — l'adresse ne doit
   **pas** contenir `-pooler`. C'est cette version qui permet de créer les
   tables automatiquement.
5. **Copiez** cette chaîne, gardez-la sous la main pour l'étape 3.

---

## Étape 2 — Importer le projet dans Vercel

1. Allez sur **https://vercel.com** et connectez-vous **avec GitHub**.
2. Cliquez **Add New… → Project**.
3. Trouvez le dépôt **`ChezGustave`** dans la liste et cliquez **Import**.
4. Vercel détecte automatiquement **Next.js** — ne touchez pas aux réglages de
   build (ils sont corrects).
5. **Ne cliquez pas encore sur Deploy** — d'abord les variables d'environnement
   (étape 3), juste en dessous.

> 💡 Sélectionnez bien la branche à déployer. Pour tester tout de suite, vous
> pouvez déployer la branche `claude/dog-sitting-platform-tac3iw`, ou d'abord
> la fusionner dans `main`.

---

## Étape 3 — Ajouter les variables d'environnement

Dans l'écran d'import Vercel, dépliez **Environment Variables** et ajoutez :

| Nom             | Valeur                                                        |
| --------------- | ------------------------------------------------------------ |
| `DATABASE_URL`  | la connection string **directe** copiée à l'étape 1          |
| `SEED_SECRET`   | un mot de passe que vous inventez (ex. `gustave-demo-42`)    |

`SEED_SECRET` sert juste à remplir la base de démo depuis une URL (étape 5).
Vous pourrez le retirer ensuite.

Puis cliquez **Deploy**. 🎉

> Au premier déploiement, l'application crée automatiquement toutes les tables
> dans votre base Neon (grâce à `prisma db push` dans le build). Vous n'avez
> aucune commande à taper.

---

## Étape 4 — C'est en ligne

Vercel vous donne une URL du type
**`https://chez-gustave-xxxx.vercel.app`**. Ouvrez-la : la page d'accueil de
Chez Gustave s'affiche.

À ce stade la base est **vide** (pas encore d'escapades). Passez à l'étape 5
pour la remplir avec les données de démo.

---

## Étape 5 — Remplir la base de démo (pour voir l'app vivante)

Dans votre navigateur, visitez **une fois** cette URL (remplacez le domaine et
le secret par les vôtres) :

```
https://VOTRE-APP.vercel.app/api/seed?key=VOTRE_SEED_SECRET
```

Exemple :
`https://chez-gustave-xxxx.vercel.app/api/seed?key=gustave-demo-42`

Vous devriez voir un message JSON `"ok": true`. C'est fait : rechargez
l'application, les gardiens, escapades, messages et le carnet de garde
apparaissent. 🐕

**Comptes de démo** (mot de passe `gustave123`) :
`pierre@example.ch` (propriétaire) · `lea@example.ch` (gardien).

> 🔒 Une fois la démo peuplée, vous pouvez **supprimer la variable
> `SEED_SECRET`** dans Vercel (Settings → Environment Variables) puis
> redéployer : la route `/api/seed` sera alors désactivée.

---

## Et ensuite ?

- Chaque `git push` sur la branche déployée redéploie automatiquement.
- Les prochaines briques (authentification, paiements Stripe) ajouteront
  d'autres variables d'environnement — on les documentera au fur et à mesure.

## En cas de souci

- **Le build échoue avec une erreur de base de données** : la variable
  `DATABASE_URL` est probablement absente ou pointe vers l'adresse « pooled ».
  Vérifiez qu'elle est bien présente dans Vercel et qu'elle **ne contient pas**
  `-pooler`, puis relancez le déploiement (**Redeploy**).
- **`/api/seed` renvoie 404** : `SEED_SECRET` n'est pas défini dans Vercel.
- **`/api/seed` renvoie 401** : la clé dans l'URL ne correspond pas à
  `SEED_SECRET`.
- **Les photos de chiens ne s'affichent pas** : ce sont des images de
  démonstration (Unsplash) ; elles seront remplacées par les vraies photos plus
  tard, ça n'affecte pas le fonctionnement.
