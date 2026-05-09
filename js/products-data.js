/** Catalogue — modifiez prix et libellés ici */
window.MIND_PRODUCTS = [
  {
    id: "noir-elixir",
    price: 1290,
    names: {
      en: "Noir Élixir — Eau de parfum 100 ml",
      fr: "Noir Élixir — Eau de parfum 100 ml",
      ar: "نوار إكسير — أو دو بارفان ١٠٠ مل",
    },
    svgBottle: `<svg viewBox="0 0 110 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="18" y="82" width="74" height="88" rx="2" fill="#0f0f0f" stroke="#2a2a2a" stroke-width="0.8"/>
      <rect x="28" y="68" width="54" height="17" rx="1" fill="#141414" stroke="#2a2a2a" stroke-width="0.6"/>
      <rect x="38" y="54" width="34" height="17" rx="1" fill="#1a1a1a" stroke="#333" stroke-width="0.5"/>
      <rect x="20" y="122" width="70" height="30" fill="#090909" stroke="#1f1f1f" stroke-width="0.4"/>
      <rect x="24" y="126" width="62" height="22" fill="none" stroke="#222" stroke-width="0.4"/>
      <text x="55" y="141" text-anchor="middle" font-family="serif" font-size="7" fill="#666" letter-spacing="2">NOIR ÉLIXIR</text>
      <text x="55" y="151" text-anchor="middle" font-family="sans-serif" font-size="4.5" fill="#444" letter-spacing="3">EAU DE PARFUM</text>
      <rect x="18" y="82" width="12" height="88" rx="2" fill="rgba(255,255,255,0.04)"/>
      <rect x="78" y="95" width="4" height="60" rx="0" fill="rgba(255,255,255,0.015)"/>
      <rect x="20" y="84" width="70" height="36" rx="1" fill="rgba(255,255,255,0.02)"/>
    </svg>`,
  },
  {
    id: "oud-marrakech",
    price: 1590,
    names: {
      en: "Oud Marrakech — niche extrait 50 ml",
      fr: "Oud Marrakech — extrait de niche 50 ml",
      ar: "عود مراكش — مستخلص نيش ٥٠ مل",
    },
    svgBottle: `<svg viewBox="0 0 110 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="55" cy="130" rx="42" ry="55" fill="#0c0c0c" stroke="#252525" stroke-width="0.8"/>
      <ellipse cx="55" cy="130" rx="34" ry="46" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
      <ellipse cx="55" cy="130" rx="24" ry="34" fill="none" stroke="#141414" stroke-width="0.4"/>
      <rect x="46" y="68" width="18" height="22" rx="1" fill="#111" stroke="#2a2a2a" stroke-width="0.6"/>
      <ellipse cx="55" cy="60" rx="16" ry="12" fill="#171717" stroke="#2e2e2e" stroke-width="0.7"/>
      <ellipse cx="55" cy="55" rx="8" ry="5" fill="#1e1e1e" stroke="#333" stroke-width="0.5"/>
      <text x="55" y="127" text-anchor="middle" font-family="serif" font-size="7.5" fill="#666" letter-spacing="1.5">OUD</text>
      <text x="55" y="138" text-anchor="middle" font-family="serif" font-size="5" fill="#444" letter-spacing="2">MARRAKECH</text>
      <text x="55" y="148" text-anchor="middle" font-family="sans-serif" font-size="4" fill="#333" letter-spacing="2">EXTRAIT</text>
      <ellipse cx="42" cy="108" rx="7" ry="18" fill="rgba(255,255,255,0.03)"/>
    </svg>`,
  },
  {
    id: "casablanca-skin",
    price: 890,
    names: {
      en: "Casablanca Skin — eau fraîche 75 ml",
      fr: "Casablanca Skin — eau fraîche 75 ml",
      ar: "كازابلانكا سكين — أو فراش ٧٥ مل",
    },
    svgBottle: `<svg viewBox="0 0 110 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="28" y="68" width="54" height="102" rx="6" fill="#0d0d0d" stroke="#242424" stroke-width="0.8"/>
      <rect x="34" y="52" width="42" height="20" rx="3" fill="#141414" stroke="#2a2a2a" stroke-width="0.6"/>
      <rect x="42" y="36" width="26" height="20" rx="10" fill="#1c1c1c" stroke="#333" stroke-width="0.5"/>
      <rect x="30" y="112" width="50" height="36" rx="0" fill="#080808" stroke="#1c1c1c" stroke-width="0.4"/>
      <line x1="30" y1="122" x2="80" y2="122" stroke="#1a1a1a" stroke-width="0.4"/>
      <text x="55" y="133" text-anchor="middle" font-family="serif" font-size="6" fill="#666" letter-spacing="2">CASABLANCA</text>
      <text x="55" y="143" text-anchor="middle" font-family="sans-serif" font-size="4.5" fill="#444" letter-spacing="3">SKIN</text>
      <rect x="28" y="68" width="14" height="102" rx="6" fill="rgba(255,255,255,0.04)"/>
      <rect x="30" y="70" width="50" height="40" rx="4" fill="rgba(255,255,255,0.02)"/>
      <line x1="64" y1="70" x2="64" y2="168" stroke="rgba(255,255,255,0.03)" stroke-width="0.8"/>
    </svg>`,
  },
  {
    id: "rabat-rose",
    price: 990,
    names: {
      en: "Rabat Rose — eau de parfum 50 ml",
      fr: "Rabat Rose — eau de parfum 50 ml",
      ar: "الرباط روز — أو دو بارفان ٥٠ مل",
    },
    svgBottle: `<svg viewBox="0 0 110 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="55,68 90,85 90,148 55,162 20,148 20,85" fill="#0c0c0c" stroke="#242424" stroke-width="0.8"/>
      <polygon points="55,76 82,90 82,143 55,155 28,143 28,90" fill="none" stroke="#181818" stroke-width="0.5"/>
      <polygon points="55,86 72,95 72,138 55,147 38,138 38,95" fill="none" stroke="#141414" stroke-width="0.35"/>
      <rect x="46" y="51" width="18" height="21" rx="1" fill="#131313" stroke="#2a2a2a" stroke-width="0.6"/>
      <rect x="36" y="38" width="38" height="16" rx="8" fill="#1a1a1a" stroke="#303030" stroke-width="0.5"/>
      <text x="55" y="113" text-anchor="middle" font-family="serif" font-size="7" fill="#666" letter-spacing="2">RABAT</text>
      <text x="55" y="124" text-anchor="middle" font-family="serif" font-size="7" fill="#555" letter-spacing="2">ROSE</text>
      <text x="55" y="135" text-anchor="middle" font-family="sans-serif" font-size="4" fill="#383838" letter-spacing="2.5">EAU DE PARFUM</text>
      <polygon points="55,76 67,83 67,117 55,123 43,117 43,83" fill="rgba(255,255,255,0.025)"/>
    </svg>`,
  },
];
