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

### 2. En-têtes de sécurité ajoutés au site (cette version)
Dans `index.html` :
- **Content-Security-Policy (CSP)** : le navigateur n'exécute QUE ton propre `app.js` et
  ne charge QUE les ressources autorisées (tes images, Google Fonts, ton Google Sheet).
  Si un pirate arrivait à injecter du code malveillant, le navigateur **refuserait de
  l'exécuter**. C'est une protection anti-XSS très solide.
- **X-Content-Type-Options: nosniff** : empêche le navigateur de « deviner » un type de
  fichier (technique utilisée dans certaines attaques).
- **referrer strict** : limite les infos envoyées aux autres sites.
- **upgrade-insecure-requests** : force tout en HTTPS.

### 3. HTTPS (cadenas) — gratuit et automatique
GitHub Pages fournit le HTTPS gratuitement. Dans ton repo :
`Settings → Pages → coche « Enforce HTTPS »`. (À vérifier une fois.)

### 4. Page 404 propre
`404.html` redirige vers l'accueil au lieu d'afficher une page d'erreur moche.

### 5. Mention de copyright
`LICENSE.txt` + balise `<meta copyright>` : ça ne bloque pas techniquement la copie, mais
ça pose une base légale claire (« tous droits réservés ») si quelqu'un te copie.

---

## ⚠️ Ce qu'il te reste à faire (5 minutes, une seule fois)

1. **Vérifier « Enforce HTTPS »** dans Settings → Pages de ton repo.
2. **Mettre ton repo en privé** si tu veux que personne ne lise ton code source.
   `Settings → General → Danger Zone → Change visibility → Private`.
   ⚠️ Note : GitHub Pages gratuit nécessite parfois un repo public. Si tu veux à la fois
   Pages gratuit ET code privé, il faut un compte Pro (4 $/mois) — sinon laisse public,
   ce n'est pas grave (voir plus bas « copie du site »).
3. **Activer les alertes de sécurité** : `Settings → Code security → active Dependabot
   alerts`. (Tu n'as pas de dépendances, mais c'est une bonne habitude.)
4. **Sauvegarde** : garde une copie du dossier complet sur ton ordinateur ET sur un disque/
   cloud. Si jamais ton compte avait un souci, tu peux tout remettre en ligne en 10 min.
   👉 La meilleure protection contre « la destruction », c'est une bonne sauvegarde.

---

## 🛡️ « Qu'on copie / vole mon site » — la réalité

Soyons honnêtes : **tout site public peut être copié.** N'importe qui peut faire
« Enregistrer la page » dans son navigateur. C'est vrai pour Apple, Nike, tout le monde.
On ne peut PAS l'empêcher techniquement à 100% (le navigateur a besoin du code pour
afficher la page).

Ce qu'on peut faire, c'est **rendre la copie moins intéressante et se protéger
légalement** :

| Risque | Protection réelle |
|---|---|
| Copier le **design/code** | Repo privé (cache la version propre) + `LICENSE.txt` (droit d'auteur) |
| Voler tes **images** | Watermark discret possible ; sinon le droit d'auteur s'applique |
| Cloner ton **nom/marque** | Le vrai bouclier = ta **marque déposée** + ton **domaine MindPerfume.ma** que toi seul possèdes |
| Refaire le **même business** | Impossible à empêcher — c'est ta réputation/qualité qui fait la différence |

**Le plus important :** ton avantage n'est pas le code (n'importe qui peut coder un site
de parfum). C'est **ton nom de domaine `MindPerfume.ma`** (que toi seul contrôles via ton
registrar) et **ta marque**. Protège l'accès à ces deux comptes (domaine + GitHub) avec
2FA, et tu as protégé l'essentiel.

---

## 🚫 Ce qui NE sert à rien (n'y perds pas ton temps)

- **Désactiver le clic droit / “protéger” le code en JS** : inutile, tout le monde
  contourne ça en 2 secondes (Ctrl+U, mode dev…). Ça gêne juste tes vrais visiteurs.
- **Obfusquer le JavaScript** : ralentit le site, n'arrête personne de motivé.
- **Payer un “antivirus de site web”** : inutile pour un site statique sans serveur.

---

## Récap en une phrase

> Ton site **ne peut pas être détruit de l'extérieur** (rien à pirater côté serveur).
> Protège tes **2 comptes clés** (GitHub + nom de domaine) avec la 2FA, garde une
> **sauvegarde**, et tu es plus en sécurité que 95% des sites e-commerce.
