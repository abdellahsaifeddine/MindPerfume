# MindPerfume.ma

Site vitrine mono-produit — **Mystique · Mon Vétiver** (Eau de Parfum 50ml, 300 MAD).

## Structure des fichiers

```
.
├── index.html        → page HTML (structure + SEO)
├── styles.css        → tout le style (design + dashboard)
├── app.js            → toute la logique (panier, lightbox, dashboard…)
├── assets/img/       → 5 images (extraites, dédupliquées)
│   ├── img-01.png    → photo hero / og:image
│   ├── img-02.jpg    → flacon (utilisé aussi par le panier)
│   ├── img-03.jpg    → pyramide olfactive
│   ├── img-04.png
│   └── img-05.png
├── robots.txt        → autorise l'indexation + pointe le sitemap
├── sitemap.xml       → plan du site pour Google
└── CNAME             → domaine personnalisé (MindPerfume.ma)
```

> Avant : un seul `index.html` de **3,8 Mo** (images en base64, CSS + JS inline).
> Après : `index.html` de **~32 Ko** + fichiers séparés. Images passées de 14 (dupliquées) à 5 uniques.

## Mise en ligne (GitHub Pages)

1. Pousser tous ces fichiers à la racine de la branche `main`.
2. Settings → Pages → Source : `main` / `/ (root)`.
3. Le fichier `CNAME` garde le domaine `MindPerfume.ma`.

## SEO — pour apparaître dans Google (et sans taper « .ma »)

Ajouté dans cette version :
- balise `<title>` et `<meta description>` optimisées + mots-clés ;
- `<link rel="canonical">` ;
- Open Graph + Twitter Card (jolie carte sur WhatsApp / Facebook) ;
- données structurées JSON-LD (`Product` + `Organization`) → résultats enrichis Google ;
- `robots.txt` + `sitemap.xml`.

**Étapes restantes (à faire une fois, hors code) :**
1. Inscrire le site sur **Google Search Console** (https://search.google.com/search-console), prouver la propriété, puis « Demander l'indexation » de l'URL.
2. Y soumettre `https://mindperfume.ma/sitemap.xml`.
3. Patienter quelques jours : Google indexera le site et il remontera sur les recherches « MindPerfume », « parfum Mystique Maroc », etc.

> Note : le code ne peut pas *forcer* la 1ʳᵉ position (ça dépend de la concurrence, des liens, de l'ancienneté du domaine). Mais tout le nécessaire technique est désormais en place — c'est ce qui manquait pour que le site soit trouvable sans taper « .ma ».

## Dashboard privé

Triple-clic sur le logo « MindPerfume.ma » dans le pied de page. Connexion Google Sheets via Apps Script (guide intégré dans le dashboard).
