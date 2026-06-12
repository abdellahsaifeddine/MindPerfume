# MindPerfume.ma

Site vitrine mono-produit — **Mystique · Mon Vétiver** (Eau de Parfum 50ml, 300 MAD).

## Nouveautés de cette version (juin 2026)

1. **Message WhatsApp pro** : le panier ouvre WhatsApp avec le nouveau template
   (récap 🌿, total, livraison 🚚🇲🇦, infos à compléter, signature MindPerfume 🖤).
2. **Nouveau numéro de commande** : `+212 625-149343` (panier + lien du footer).
3. **Favicon / icône du site** : le logo MP s'affiche dans l'onglet du navigateur,
   les favoris et les résultats Google (favicon.ico + PNG 16/32/192/512 + Apple touch).
4. **Sécurité renforcée** : échappement HTML anti-XSS, bug localStorage corrigé,
   `object-src 'none'` ajouté à la CSP. Détails dans `SECURITE.md`.
5. **Site plus vivant** : fil d'or de progression en haut de page, reflet doré animé
   sur « Mon Vétiver », particules d'essence dans le hero, Ken Burns lent sur la photo,
   notes olfactives en cascade avec pastilles qui s'allument, boutons magnétiques,
   pop du panier, soulignement animé du menu, halo doré sur les cartes journal —
   le tout désactivé automatiquement si le visiteur préfère un mouvement réduit.

## Structure des fichiers

```
.
├── index.html        → page HTML (structure + SEO + favicon)
├── styles.css        → tout le style (design + dashboard + animations)
├── app.js            → toute la logique (panier, lightbox, dashboard…)
├── favicon.ico       → icône du site (multi-tailles)
├── assets/img/       → images du site + icônes
│   ├── img-01..05    → photos produit
│   ├── favicon-16/32.png, icon-192/512.png, apple-touch-icon.png
│   └── logo-full.png → logo complet (données structurées Google)
├── robots.txt / sitemap.xml / CNAME / 404.html / LICENSE.txt
└── SECURITE.md       → état de la sécurité + 5 min de réglages à faire
```

## Mise en ligne (GitHub Pages)

1. Pousser tous ces fichiers à la racine de la branche `main`.
2. Settings → Pages → Source : `main` / `/ (root)`.
3. Le fichier `CNAME` garde le domaine `MindPerfume.ma`.

## À propos de l'icône dans Google

Google récupère le favicon automatiquement lors du prochain passage de son robot.
Après la mise en ligne : Google Search Console → « Inspection d'URL » →
« Demander l'indexation ». L'icône apparaît à côté du nom du site sous quelques jours
(c'est Google qui décide du délai, pas le code).

## Dashboard privé

Triple-clic sur le logo « MindPerfume.ma » dans le pied de page. Connexion Google
Sheets via Apps Script (guide intégré dans le dashboard).
