# MindPerfume.ma

Site vitrine statique pour **MindPerfume** — domaine **MindPerfume.ma**.

**Dépôt GitHub :** [github.com/abdellahsaifeddine/MindPerfume](https://github.com/abdellahsaifeddine/MindPerfume)

## Contenu

- Bannière hero, **boutique** (parfums, panier, `checkout.html`), textes, description, ambiance (Vibe), thème (Theme), section **Coming soon / Contact** (`hello@mindperfume.ma`)
- Panier en **localStorage** → page commande → ouverture **WhatsApp** avec récapitulatif (produits, quantités, total, téléphone, adresse, notes)
- Versions **anglais**, **français**, **arabe** (RTL) avec sélecteur de langue
- Balises **meta** description / keywords par langue ; **`hreflang`** (`en`, `fr`, `ar`, `x-default`) vers `https://mindperfume.ma/`

## URLs GitHub Pages

| URL | Usage |
|-----|--------|
| `https://abdellahsaifeddine.github.io/MindPerfume/` | Site projet (toujours disponible après déploiement) |
| `https://mindperfume.ma/` | Domaine personnalisé (après DNS + vérif GitHub) |

Pages est configurée sur la branche **`main`**, dossier **`/`** (racine).

## Domaine personnalisé (MindPerfume.ma)

Le fichier **`CNAME`** à la racine contient le nom de domaine pour GitHub Pages.

### Apex (`mindperfume.ma` sans `www`)

Chez votre **registrar**, créez des enregistrements **A** pour `@` pointant vers :

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

(Documentation GitHub : [Managing a custom domain](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site))

### Sous-domaine `www`

Utilisez un **CNAME** : nom **`www`**, cible **`abdellahsaifeddine.github.io`** (remplacez si votre compte GitHub change).

Ensuite, dans le dépôt : **Settings → Pages → Custom domain** : `mindperfume.ma` (et éventuellement cocher **Enforce HTTPS** une fois le certificat actif).

### WhatsApp (à configurer)

Éditez **`js/config.js`** : remplacez **`whatsappE164`** par votre numéro WhatsApp Business, **sans le `+`** (ex. Maroc : `2126xxxxxxxx`). Le catalogue et les prix sont dans **`js/products-data.js`**.

---

Projet statique : `index.html`, `checkout.html`, `css/`, `js/`.
