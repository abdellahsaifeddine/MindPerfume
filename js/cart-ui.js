(function () {
  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function getLang() {
    var l = localStorage.getItem("mindperfume-lang");
    if (l === "ar" || l === "fr") return l;
    return "en";
  }

  function productMap() {
    var m = {};
    (window.MIND_PRODUCTS || []).forEach(function (p) {
      m[p.id] = p;
    });
    return m;
  }

  function renderShop() {
    var grid = document.getElementById("shop-grid");
    if (!grid || !window.MIND_PRODUCTS) return;
    var lang = getLang();
    var t = window.MIND_I18N[lang];
    grid.innerHTML = window.MIND_PRODUCTS.map(function (p) {
      var name = p.names[lang] || p.names.en;
      var priceStr = t.shopPriceFormat.replace("{price}", String(p.price));
      return (
        '<article class="product-card" data-product-id="' +
        escapeHtml(p.id) +
        '">' +
        '<div class="product-card__visual" aria-hidden="true"></div>' +
        '<h3 class="product-card__name">' +
        escapeHtml(name) +
        "</h3>" +
        '<p class="product-card__price">' +
        escapeHtml(priceStr) +
        "</p>" +
        '<button type="button" class="product-card__add banner__cta">' +
        escapeHtml(t.shopAdd) +
        "</button>" +
        "</article>"
      );
    }).join("");
  }

  function renderCart() {
    var container = document.getElementById("cart-lines");
    if (!container) return;
    var lang = getLang();
    var t = window.MIND_I18N[lang];
    var pmap = productMap();
    var items = window.MindCart.getItems();
    var totalEl = document.getElementById("cart-total-value");

    if (!items.length) {
      container.innerHTML = '<p class="cart-empty">' + escapeHtml(t.cartEmpty) + "</p>";
      if (totalEl) totalEl.textContent = t.cartTotalFormat.replace("{total}", "0");
      return;
    }

    container.innerHTML = items
      .map(function (line) {
        var p = pmap[line.id];
        if (!p) return "";
        var name = p.names[lang] || p.names.en;
        var lineTotal = p.price * line.qty;
        var unitStr = t.shopPriceFormat.replace("{price}", String(p.price));
        return (
          '<div class="cart-line" data-product-id="' +
          escapeHtml(line.id) +
          '">' +
          '<div class="cart-line__info">' +
          "<strong>" +
          escapeHtml(name) +
          "</strong>" +
          '<span class="cart-line__sub">' +
          escapeHtml(unitStr + " × " + line.qty) +
          "</span>" +
          "</div>" +
          '<div class="cart-line__qty">' +
          '<button type="button" class="cart-line__btn" data-cart-act="dec" aria-label="' +
          escapeHtml(t.cartDecAria) +
          '">−</button>' +
          '<span class="cart-line__n">' +
          line.qty +
          "</span>" +
          '<button type="button" class="cart-line__btn" data-cart-act="inc" aria-label="' +
          escapeHtml(t.cartIncAria) +
          '">+</button>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    var total = items.reduce(function (sum, line) {
      var p = pmap[line.id];
      return p ? sum + p.price * line.qty : sum;
    }, 0);
    if (totalEl) totalEl.textContent = t.cartTotalFormat.replace("{total}", String(total));
  }

  function updateBadge() {
    var n = window.MindCart.countUnits();
    var el = document.querySelector("[data-cart-count]");
    if (!el) return;
    el.textContent = String(n);
    el.hidden = n === 0;
  }

  function setCartTriggerAria() {
    var btn = document.querySelector(".cart-trigger");
    if (!btn) return;
    var lang = getLang();
    var t = window.MIND_I18N[lang];
    if (t && t.cartAriaOpen) btn.setAttribute("aria-label", t.cartAriaOpen);
  }

  function openCart() {
    var drawer = document.getElementById("cart-drawer");
    var overlay = document.getElementById("cart-overlay");
    var trigger = document.querySelector(".cart-trigger");
    if (!drawer || !overlay) return;
    drawer.removeAttribute("hidden");
    overlay.removeAttribute("hidden");
    drawer.hidden = false;
    overlay.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    document.body.classList.add("cart-open");
  }

  function closeCart() {
    var drawer = document.getElementById("cart-drawer");
    var overlay = document.getElementById("cart-overlay");
    var trigger = document.querySelector(".cart-trigger");
    if (!drawer || !overlay) return;
    drawer.setAttribute("hidden", "");
    overlay.setAttribute("hidden", "");
    drawer.hidden = true;
    overlay.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("cart-open");
  }

  function bindCartLines() {
    var container = document.getElementById("cart-lines");
    if (!container || container.dataset.bound) return;
    container.dataset.bound = "1";
    container.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cart-act]");
      if (!btn) return;
      var line = btn.closest(".cart-line");
      if (!line) return;
      var id = line.getAttribute("data-product-id");
      var act = btn.getAttribute("data-cart-act");
      var items = window.MindCart.getItems();
      var cur = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          cur = items[i];
          break;
        }
      }
      if (!cur) return;
      if (act === "inc") window.MindCart.setQty(id, cur.qty + 1);
      else if (act === "dec") window.MindCart.setQty(id, cur.qty - 1);
      renderCart();
      updateBadge();
    });
  }

  function init() {
    closeCart();

    var grid = document.getElementById("shop-grid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var addBtn = e.target.closest(".product-card__add");
        if (!addBtn) return;
        var card = addBtn.closest(".product-card");
        if (!card) return;
        var id = card.getAttribute("data-product-id");
        if (!id) return;
        window.MindCart.add(id, 1);
        renderCart();
        updateBadge();
      });
    }

    var trigger = document.querySelector(".cart-trigger");
    if (trigger) {
      trigger.addEventListener("click", function () {
        if (document.body.classList.contains("cart-open")) closeCart();
        else openCart();
      });
    }

    var overlay = document.getElementById("cart-overlay");
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        e.preventDefault();
        closeCart();
      });
    }

    function bindCloseCart(e) {
      e.preventDefault();
      e.stopPropagation();
      closeCart();
    }

    var closeBtn = document.getElementById("cart-close-btn") || document.querySelector("[data-cart-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", bindCloseCart, true);
    }

    var checkoutBtn = document.getElementById("cart-checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        if (!window.MindCart.getItems().length) return;
        window.location.href = "checkout.html";
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("cart-open")) closeCart();
    });

    bindCartLines();
    renderShop();
    renderCart();
    updateBadge();
    setCartTriggerAria();

    window.addEventListener("mindperfume:lang", function () {
      renderShop();
      renderCart();
      setCartTriggerAria();
      var closeEl = document.querySelector("[data-cart-close]");
      var lang = getLang();
      var t = window.MIND_I18N[lang];
      if (closeEl && t && t.cartCloseAria) closeEl.setAttribute("aria-label", t.cartCloseAria);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
