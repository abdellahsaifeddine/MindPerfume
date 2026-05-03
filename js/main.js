(function () {
  const STORAGE_KEY = "mindperfume-lang";
  const supported = ["en", "fr", "ar"];
  const rtlLangs = ["ar"];

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (nav === "ar") return "ar";
    if (nav === "fr") return "fr";
    return "en";
  }

  function setLang(lang) {
    if (!supported.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
  }

  function apply(lang) {
    const t = window.MIND_I18N[lang];
    if (!t) return;

    document.documentElement.lang = lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en";
    document.documentElement.dir = rtlLangs.includes(lang) ? "rtl" : "ltr";

    document.title = t.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaDesc) metaDesc.setAttribute("content", t.metaDescription);
    if (metaKw) metaKw.setAttribute("content", t.keywords);

    const map = [
      ["data-i18n-banner-eyebrow", t.bannerEyebrow],
      ["data-i18n-banner-title", t.bannerTitle],
      ["data-i18n-banner-lead", t.bannerLead],
      ["data-i18n-banner-cta", t.bannerCta],
      ["data-i18n-under1-label", t.under1Label],
      ["data-i18n-under1-sub", t.under1Sub],
      ["data-i18n-under2-label", t.under2Label],
      ["data-i18n-under2-sub", t.under2Sub],
      ["data-i18n-under3-label", t.under3Label],
      ["data-i18n-under3-sub", t.under3Sub],
      ["data-i18n-texts-title", t.textsTitle],
      ["data-i18n-texts-body", t.textsBody],
      ["data-i18n-desc-title", t.descTitle],
      ["data-i18n-desc-1", t.descBody1],
      ["data-i18n-desc-2", t.descBody2],
      ["data-i18n-vibe-title", t.vibeTitle],
      ["data-i18n-vibe-subtitle", t.vibeSubtitle],
      ["data-i18n-vibe-1-t", t.vibe1Title],
      ["data-i18n-vibe-1-p", t.vibe1Text],
      ["data-i18n-vibe-2-t", t.vibe2Title],
      ["data-i18n-vibe-2-p", t.vibe2Text],
      ["data-i18n-vibe-3-t", t.vibe3Title],
      ["data-i18n-vibe-3-p", t.vibe3Text],
      ["data-i18n-theme-title", t.themeTitle],
      ["data-i18n-theme-subtitle", t.themeSubtitle],
      ["data-i18n-theme-palette", t.themePalette],
      ["data-i18n-theme-palette-val", t.themePaletteVal],
      ["data-i18n-theme-mood", t.themeMood],
      ["data-i18n-theme-mood-val", t.themeMoodVal],
      ["data-i18n-theme-promise", t.themePromise],
      ["data-i18n-theme-promise-val", t.themePromiseVal],
      ["data-i18n-kw-label", t.keywordsSectionLabel],
      ["data-i18n-kw-intro", t.keywordsIntro],
      ["data-i18n-keywords-list", t.keywordsList],
      ["data-i18n-footer-tagline", t.footerTagline],
    ];

    map.forEach(function (pair) {
      var sel = "[" + pair[0] + "]";
      document.querySelectorAll(sel).forEach(function (el) {
        el.textContent = pair[1];
      });
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  document.querySelector(".banner__cta")?.addEventListener("click", function () {
    document.getElementById("description")?.scrollIntoView({ behavior: "smooth" });
  });

  var header = document.querySelector(".site-header");
  window.addEventListener(
    "scroll",
    function () {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    },
    { passive: true }
  );

  apply(getLang());
})();
