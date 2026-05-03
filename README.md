# MindPerfume.ma

Site vitrine statique pour **MindPerfume** — domaine **MindPerfume.ma**.

## Contenu

- Bannière hero, bandeau sous-bannières, textes, description, ambiance (Vibe), thème (Theme)
- Versions **anglais**, **français**, **arabe** (RTL) avec sélecteur de langue
- Balises **meta** description / keywords par langue (via JavaScript au changement de langue)

## Hébergement GitHub Pages

1. Créer un dépôt sur GitHub (par ex. `MindPerfume`) et pousser ce dossier.
2. Sur le dépôt : **Settings → Pages**.
3. **Source** : déployer depuis la branche `main` (ou `master`), dossier **`/ (root)`**.
4. Après le premier déploiement, dans **Pages → Custom domain**, saisir **`MindPerfume.ma`** et activer **Enforce HTTPS** une fois le certificat prêt.

## Domaine MindPerfume.ma

Chez votre registrar, ajoutez un enregistrement **CNAME** :

- **Nom / Host** : `@` ou `www` selon votre choix (souvent `www` → `votre-user.github.io` pour un sous-domaine ; pour la racine `@`, GitHub documente les enregistrements **A** pour `185.199.108.x` etc.).

Le fichier **`CNAME`** à la racine du dépôt contient `MindPerfume.ma` pour que GitHub Pages associe le domaine personnalisé.

---

Projet statique : `index.html`, `css/`, `js/`.
