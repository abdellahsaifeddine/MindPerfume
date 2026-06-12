# Sécurité — MindPerfume.ma

## La vérité, sans baratin

Aucun site n'est sécurisé « à 100% » — pas même Google ou les banques. **Mais ton site
est dans une situation beaucoup plus sûre que la moyenne**, pour une raison simple :

> C'est un site **statique** (HTML + CSS + JS) sur **GitHub Pages**.
> Pas de serveur, pas de base de données, pas de mot de passe client, pas de paiement en ligne.

Ça supprime d'un coup l'immense majorité des attaques (injection SQL, piratage de serveur,
vol de base de données…). **Personne ne peut « détruire » ton site de l'extérieur**, parce
qu'il n'y a aucun serveur à pirater. Si quelqu'un essaie, au pire il voit la page publique —
exactement comme un visiteur normal.

Le **seul vrai risque** c'est qu'on prenne le contrôle de **ton compte GitHub** (là où vit
le code). Tout le reste est secondaire.

---

## ✅ Ce qui est DÉJÀ fait

### 1. Ton compte GitHub a la 2FA — le plus important est réglé
La double authentification rend quasi impossible le piratage de ton compte, même si on
trouve ton mot de passe. C'est LA protection numéro un. Bravo.

### 2. En-têtes de sécurité dans `index.html`
- **Content-Security-Policy (CSP)** : le navigateur n'exécute QUE ton propre `app.js` et
  ne charge QUE les ressources autorisées (tes images, Google Fonts, ton Google Sheet,
  Google Analytics). Si un pirate arrivait à injecter du code malveillant, le navigateur
  **refuserait de l'exécuter**. Protection anti-XSS très solide.
- **`object-src 'none'`** *(nouveau dans cette version)* : interdit totalement les plugins
  / objets embarqués, un vecteur d'attaque classique.
- **X-Content-Type-Options: nosniff** : empêche le navigateur de « deviner » un type de fichier.
- **referrer strict** : limite les infos envoyées aux autres sites.
- **upgrade-insecure-requests** : force tout en HTTPS.

### 3. Anti-XSS dans le code lui-même *(nouveau dans cette version)*
Tout texte dynamique injecté dans la page (panier, tableau Google Sheets du dashboard,
journal des commandes) passe maintenant par une fonction d'**échappement HTML** (`esc()`).
Concrètement : même si quelqu'un écrivait du code malveillant **dans ton Google Sheet**,
il s'afficherait comme du texte inoffensif au lieu de s'exécuter dans ton navigateur.
C'était le seul vrai trou potentiel du dashboard — il est bouché.

### 4. Bug critique corrigé *(nouveau dans cette version)*
Les fonctions de stockage local (`lsGet`/`lsSet`) s'appelaient elles-mêmes en boucle
infinie — la sauvegarde de la config du dashboard ne fonctionnait pas. Corrigé : elles
utilisent maintenant correctement `localStorage`, avec gestion d'erreur (JSON corrompu
ou stockage bloqué ne fait plus planter la page).

### 5. HTTPS (cadenas) — gratuit et automatique
GitHub Pages fournit le HTTPS gratuitement. Dans ton repo :
`Settings → Pages → coche « Enforce HTTPS »`. (À vérifier une fois.)

### 6. Page 404 propre + copyright
`404.html` redirige vers l'accueil ; `LICENSE.txt` + balise `<meta copyright>` posent
une base légale claire (« tous droits réservés ») si quelqu'un te copie.

---

## ⚠️ Ce qu'il te reste à faire (5 minutes, une seule fois)

1. **Vérifier « Enforce HTTPS »** dans Settings → Pages de ton repo.
2. **Mettre ton repo en privé** si tu veux que personne ne lise ton code source.
   ⚠️ GitHub Pages gratuit nécessite parfois un repo public — sinon compte Pro (4 $/mois).
3. **Activer les alertes de sécurité** : `Settings → Code security → Dependabot alerts`.
4. **Sauvegarde** : garde une copie du dossier complet sur ton ordinateur ET sur un
   disque/cloud. La meilleure protection contre « la destruction », c'est une bonne sauvegarde.
5. **Protège aussi ton compte de domaine** (registrar de MindPerfume.ma) avec la 2FA —
   c'est aussi important que GitHub.
6. **Apps Script** : ton script Google Sheets est déployé en « accès : tout le monde ».
   Ne partage jamais son URL publiquement, et ne mets **aucune donnée sensible** dans ce
   Sheet (pas de noms complets de clients + téléphones par exemple). Si un jour tu veux
   verrouiller, ajoute un petit jeton secret vérifié dans `doGet`/`doPost`.

---

## 🛡️ « Qu'on copie / vole mon site » — la réalité

Tout site public peut être copié (« Enregistrer la page » suffit). C'est vrai pour Apple,
Nike, tout le monde. Ce qu'on peut faire, c'est rendre la copie moins intéressante et se
protéger légalement :

| Risque | Protection réelle |
|---|---|
| Copier le **design/code** | Repo privé + `LICENSE.txt` (droit d'auteur) |
| Voler tes **images** | Watermark discret possible ; sinon le droit d'auteur s'applique |
| Cloner ton **nom/marque** | Ta **marque déposée** + ton **domaine MindPerfume.ma** que toi seul possèdes |
| Refaire le **même business** | Impossible à empêcher — c'est ta réputation/qualité qui fait la différence |

**Le plus important :** ton avantage n'est pas le code, c'est ton **domaine** et ta
**marque**. Protège l'accès à ces deux comptes (domaine + GitHub) avec la 2FA, et tu as
protégé l'essentiel.

---

## 🚫 Ce qui NE sert à rien (n'y perds pas ton temps)

- **Désactiver le clic droit / « protéger » le code en JS** : contourné en 2 secondes,
  ça gêne juste tes vrais visiteurs.
- **Obfusquer le JavaScript** : ralentit le site, n'arrête personne de motivé.
- **Payer un « antivirus de site web »** : inutile pour un site statique sans serveur.

---

## Récap en une phrase

> Ton site **ne peut pas être détruit de l'extérieur** (rien à pirater côté serveur).
> Protège tes **2 comptes clés** (GitHub + nom de domaine) avec la 2FA, garde une
> **sauvegarde**, et tu es plus en sécurité que 95% des sites e-commerce.
