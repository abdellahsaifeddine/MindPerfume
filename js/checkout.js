(function () {
  var STORAGE_KEY = "mindperfume-lang";

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "fr") return saved;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (nav === "ar") return "ar";
    if (nav === "fr") return "fr";
    return "en";
  }

  function productMap() {
    var m = {};
    (window.MIND_PRODUCTS || []).forEach(function (p) {
      m[p.id] = p;
    });
    return m;
  }

  function buildWhatsAppMessage(lang, fields) {
    var t = window.MIND_I18N[lang];
    var pmap = productMap();
    var lines = window.MindCart.getItems();
    var body = t.whatsappIntro || "";
    var total = 0;

    lines.forEach(function (line) {
      var p = pmap[line.id];
      if (!p) return;
      var name = p.names[lang] || p.names.en;
      var lineTotal = p.price * line.qty;
      total += lineTotal;
      var itemLine = t.whatsappItemLine || "";
      body += itemLine
        .replace("{name}", name)
        .replace("{qty}", String(line.qty))
        .replace("{lineTotal}", String(lineTotal));
    });

    body += (t.whatsappTotalLine || "").replace("{total}", String(total));

    if (fields.fullName) {
      body += (t.whatsappNameLine || "").replace("{name}", fields.fullName);
    }
    body += (t.whatsappPhoneLine || "").replace("{phone}", fields.phone);
    body += (t.whatsappAddrLine || "").replace("{address}", fields.address);
    if (fields.notes) {
      body += (t.whatsappNotesLine || "").replace("{notes}", fields.notes);
    }

    return body;
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderSummary() {
    var box = document.getElementById("checkout-summary-lines");
    if (!box) return;
    var lang = getLang();
    var t = window.MIND_I18N[lang];
    var pmap = productMap();
    var items = window.MindCart.getItems();

    if (!items.length) {
      box.innerHTML = "";
      return;
    }

    var total = 0;
    var html = items
      .map(function (line) {
        var p = pmap[line.id];
        if (!p) return "";
        var name = p.names[lang] || p.names.en;
        var lineTotal = p.price * line.qty;
        total += lineTotal;
        return (
          "<li><span>" +
          escapeHtml(name) +
          " × " +
          line.qty +
          "</span><strong>" +
          escapeHtml(t.shopPriceFormat.replace("{price}", String(lineTotal))) +
          "</strong></li>"
        );
      })
      .join("");

    box.innerHTML =
      "<ul class=\"checkout-summary__list\">" +
      html +
      "</ul><p class=\"checkout-summary__total\"><span>" +
      escapeHtml(t.cartTotalLabel) +
      "</span><strong id=\"checkout-grand-total\">" +
      t.cartTotalFormat.replace("{total}", String(total)) +
      "</strong></p>";
  }

  function applyCheckout(lang) {
    var t = window.MIND_I18N[lang];
    if (!t) return;

    document.documentElement.lang = lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.title = t.checkoutMetaTitle || document.title;

    var map = [
      ["data-i18n-checkout-title", t.checkoutTitle],
      ["data-i18n-checkout-summary", t.checkoutSummary],
      ["data-i18n-checkout-empty-hint", t.checkoutEmptyHint],
      ["data-i18n-checkout-name", t.checkoutFullName],
      ["data-i18n-checkout-phone", t.checkoutPhone],
      ["data-i18n-checkout-address", t.checkoutAddress],
      ["data-i18n-checkout-notes", t.checkoutNotes],
      ["data-i18n-checkout-submit", t.checkoutSubmit],
      ["data-i18n-checkout-back", t.checkoutBack],
      ["data-i18n-footer-tagline", t.footerTagline],
    ];

    map.forEach(function (pair) {
      document.querySelectorAll("[" + pair[0] + "]").forEach(function (el) {
        el.textContent = pair[1];
      });
    });

    var phone = document.getElementById("checkout-phone");
    var addr = document.getElementById("checkout-address");
    var notes = document.getElementById("checkout-notes");
    if (phone && t.checkoutPhonePh) phone.setAttribute("placeholder", t.checkoutPhonePh);
    if (addr && t.checkoutAddressPh) addr.setAttribute("placeholder", t.checkoutAddressPh);
    if (notes && t.checkoutNotesPh) notes.setAttribute("placeholder", t.checkoutNotesPh);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });

    var navSocial = document.querySelector(".social-footer");
    if (navSocial && t.footerSocialNav) navSocial.setAttribute("aria-label", t.footerSocialNav);
    var ig = document.querySelector('a[data-social="instagram"]');
    var tk = document.querySelector('a[data-social="tiktok"]');
    if (ig && t.socialInstagramAria) ig.setAttribute("aria-label", t.socialInstagramAria);
    if (tk && t.socialTiktokAria) tk.setAttribute("aria-label", t.socialTiktokAria);

    renderSummary();
    toggleEmptyState();
  }

  function toggleEmptyState() {
    var empty = document.getElementById("checkout-empty");
    var form = document.getElementById("checkout-form-wrap");
    var items = window.MindCart.getItems();
    if (!empty || !form) return;
    if (!items.length) {
      empty.hidden = false;
      form.hidden = true;
    } else {
      empty.hidden = true;
      form.hidden = false;
    }
  }

  function init() {
    applyCheckout(getLang());

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        if (!lang) return;
        localStorage.setItem(STORAGE_KEY, lang);
        applyCheckout(lang);
        window.dispatchEvent(new CustomEvent("mindperfume:lang", { detail: { lang: lang } }));
      });
    });

    var form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var lang = getLang();
        var t = window.MIND_I18N[lang];
        if (!window.MindCart.getItems().length) {
          alert(t.checkoutEmptyHint);
          return;
        }

        var fullName = (document.getElementById("checkout-fullname") || {}).value || "";
        var phone = (document.getElementById("checkout-phone") || {}).value.trim();
        var address = (document.getElementById("checkout-address") || {}).value.trim();
        var notes = (document.getElementById("checkout-notes") || {}).value.trim();

        if (!phone || !address) {
          alert(t.checkoutErrorFields);
          return;
        }

        var msg = buildWhatsAppMessage(lang, {
          fullName: fullName.trim(),
          phone: phone,
          address: address,
          notes: notes,
        });

        var raw = (window.MIND_CONFIG && window.MIND_CONFIG.whatsappE164) || "";
        var num = String(raw).replace(/\D/g, "");
        if (!num || num.length < 10) {
          alert(t.checkoutAlertWhatsApp || "Configure WhatsApp in js/config.js");
          return;
        }

        var url = "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }

    var header = document.querySelector(".site-header");
    window.addEventListener(
      "scroll",
      function () {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 40);
      },
      { passive: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
