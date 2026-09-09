window.FLACON_SRC="assets/img/img-02.jpg";

/* ════════════════════════════════════════════
   MINDPERFUME — Application JS
   ════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════════════
     CONFIG EN DUR — modifie UNIQUEMENT ici si besoin
     ════════════════════════════════════════════ */
  var MP_CFG = {
    sheetId:   '1Z2y8IqSGRnw1DtkgHfhwzCjsYAim-t1ZMBcj-cXjKAI',
    sheetName: 'Stats',
    scriptUrl: 'https://script.google.com/macros/s/AKfycbxj0aX-K8bQykjB_ImSygKhCqDApzhSKOW9Fl0KYLq_aKSfcGsBYO2NGCHfq6Li_rBzKg/exec'
  };

  /* ── CODE SECRET DU DASHBOARD ──
     Change le code entre guillemets par celui de ton choix. */
  var MP_SECRET = 'Mind123';

  /* ── SAFE STORAGE (never throws) ── */
  function lsGet(k) {
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { localStorage.setItem(k, v); } catch (e) {}
  }

  /* ── CURSOR (desktop only) ── */
  function initCursor() {
    var d = document.getElementById('cur-d');
    var r = document.getElementById('cur-r');
    if (!d || !r) return;
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      d.style.left = mx + 'px';
      d.style.top = my + 'px';
    });
    function lerp(a, b, t) { return a + (b - a) * t; }
    function tick() {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      r.style.left = rx + 'px';
      r.style.top = ry + 'px';
      requestAnimationFrame(tick);
    }
    tick();
    var hovEls = document.querySelectorAll('a,button,.jc,.note-row,.gal-item,.pc-left,.clickable');
    hovEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('hov'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('hov'); });
    });
  }

  /* ── ENTRANCE ── */
  function initEntrance() {
    document.documentElement.classList.add('rdy');
    ['logo', 'nav', 'cartBtn'].forEach(function (id, i) {
      setTimeout(function () {
        var el = document.getElementById(id);
        if (el) el.classList.add('in');
      }, i * 120 + 100);
    });
    setTimeout(function () {
      var il = document.getElementById('iL');
      if (il) il.classList.add('in');
    }, 350);
  }

  /* ── SCROLL REVEALS ── */
  function initReveals() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { obs.observe(el); });
  }

  /* ── HEADER SHADE ── */
  function initHeader() {
    var hdr = document.getElementById('hdr');
    if (!hdr) return;
    window.addEventListener('scroll', function () {
      hdr.classList.toggle('shade', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── PARALLAX ── */
  function initParallax() {
    var hR = document.getElementById('hR');
    var iBg = document.getElementById('immBg');
    var iW = document.getElementById('imm');
    window.addEventListener('scroll', function () {
      if (hR) hR.style.transform = 'translateY(' + (window.scrollY * 0.08) + 'px)';
      if (iBg && iW) {
        var rc = iW.getBoundingClientRect();
        var vh = window.innerHeight;
        if (rc.bottom > 0 && rc.top < vh) {
          var p = 1 - rc.bottom / (vh + rc.height);
          iBg.style.transform = 'translateY(' + (-p * 50 + 25) + 'px) scale(1.15)';
        }
      }
    }, { passive: true });
  }

  /* ── TILT ── */
  function initTilt() {
    document.querySelectorAll('.jc').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(1000px) rotateY(' + (x * 2.5) + 'deg) rotateX(' + (-y * 2.5) + 'deg)';
      });
      c.addEventListener('mouseleave', function () { c.style.transform = ''; });
    });
  }

  /* ── LIGHTBOX ── */
  var lbItems = [], lbIdx = 0;
  function buildLb() {
    lbItems = [];
    document.querySelectorAll('[data-lb-src]').forEach(function (el) {
      lbItems.push({ src: el.getAttribute('data-lb-src'), cap: el.getAttribute('data-lb-cap') || '' });
    });
  }
  function showLb() {
    var it = lbItems[lbIdx];
    if (!it) return;
    document.getElementById('lbImg').src = it.src;
    document.getElementById('lbCap').textContent = it.cap;
    document.getElementById('lbCounter').textContent = (lbIdx + 1) + ' / ' + lbItems.length;
    document.getElementById('lbPrev').style.opacity = lbIdx > 0 ? '1' : '0.3';
    document.getElementById('lbNext').style.opacity = lbIdx < lbItems.length - 1 ? '1' : '0.3';
  }
  function openLb(idx) {
    buildLb();
    lbIdx = Math.max(0, Math.min(idx, lbItems.length - 1));
    showLb();
    document.getElementById('lb').classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    document.getElementById('lb').classList.remove('on');
    document.body.style.overflow = '';
  }
  function initLightbox() {
    var lb = document.getElementById('lb');
    if (!lb) return;
    document.getElementById('lbX').addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.getElementById('lbPrev').addEventListener('click', function () {
      if (lbIdx > 0) { lbIdx--; showLb(); }
    });
    document.getElementById('lbNext').addEventListener('click', function () {
      if (lbIdx < lbItems.length - 1) { lbIdx++; showLb(); }
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft' && lbIdx > 0) { lbIdx--; showLb(); }
      if (e.key === 'ArrowRight' && lbIdx < lbItems.length - 1) { lbIdx++; showLb(); }
    });
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-lb-src]');
      if (!el) return;
      buildLb();
      var src = el.getAttribute('data-lb-src');
      var idx = -1;
      for (var i = 0; i < lbItems.length; i++) {
        if (lbItems[i].src === src) { idx = i; break; }
      }
      openLb(idx >= 0 ? idx : 0);
    });
  }

  /* ── CART ── */
  var cart = [];
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function openCart() {
    document.getElementById('cDr').classList.add('on');
    document.getElementById('cOv').classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cDr').classList.remove('on');
    document.getElementById('cOv').classList.remove('on');
    document.body.style.overflow = '';
  }
  function showToast() {
    var t = document.getElementById('toast');
    t.classList.add('on');
    setTimeout(function () { t.classList.remove('on'); }, 2400);
  }
  function badge() {
    var n = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var el = document.getElementById('cN');
    el.textContent = n;
    el.classList.toggle('on', n > 0);
  }
  function renderCart() {
    var body = document.getElementById('cBody');
    var tot = document.getElementById('cTot');
    if (!cart.length) {
      body.innerHTML = '<p class="c-empty">Votre panier est vide.</p>';
      tot.textContent = '0 MAD';
      return;
    }
    var html = '';
    cart.forEach(function (item, i) {
      html += '<div class="c-line">';
      html += '<img class="c-line-img" src="' + window.FLACON_SRC + '" alt="' + esc(item.name) + '"/>';
      html += '<div class="c-line-info">';
      html += '<strong>' + esc(item.name) + '</strong>';
      html += '<div class="c-pr">' + item.price + ' MAD \u00d7 ' + item.qty + ' = ' + (item.price * item.qty) + ' MAD</div>';
      html += '<div class="c-qty">';
      html += '<button onclick="MP.chQty(' + i + ',-1)">\u2212</button>';
      html += '<span>' + item.qty + '</span>';
      html += '<button onclick="MP.chQty(' + i + ',1)">+</button>';
      html += '</div></div>';
      html += '<button class="c-rm" onclick="MP.rmItem(' + i + ')">\u2715</button>';
      html += '</div>';
    });
    body.innerHTML = html;
    tot.textContent = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0) + ' MAD';
  }
  function addToCart(id, name, price) {
    var ex = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) { ex = cart[i]; break; }
    }
    if (ex) { ex.qty++; }
    else { cart.push({ id: id, name: name, price: parseInt(price, 10), qty: 1 }); }
    badge();
    renderCart();
    showToast();
    if (typeof gtag === 'function') {
      gtag('event', 'add_to_cart', {
        currency: 'MAD',
        value: parseInt(price, 10),
        items: [{ item_id: id, item_name: name, price: parseInt(price, 10), quantity: 1 }]
      });
    }
  }
  function chQty(i, d) {
    cart[i].qty += d;
    if (cart[i].qty < 1) cart.splice(i, 1);
    badge();
    renderCart();
  }
  function rmItem(i) {
    cart.splice(i, 1);
    badge();
    renderCart();
  }
  function checkout() {
    if (!cart.length) { alert('Panier vide !'); return; }
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    if (typeof gtag === 'function') {
      gtag('event', 'begin_checkout', {
        currency: 'MAD',
        value: total,
        items: cart.map(function (i) {
          return { item_id: i.id, item_name: i.name, price: i.price, quantity: i.qty };
        })
      });
    }
    var msg = '';
    msg += 'Bonjour MindPerfume 👋,\n\n';
    msg += 'Vous etes aux dernieres etapes pour valider votre commande, et vous etes sur la bonne voie ! 🌿\n\n';
    msg += '🧾 Recapitulatif de ma selection :\n';
    msg += '--------------------------------\n';
    cart.forEach(function (i) {
      msg += '- ' + i.name + '  x' + i.qty + '  =  ' + (i.price * i.qty) + ' MAD\n';
    });
    msg += '--------------------------------\n';
    msg += '💰 Total a regler : ' + total + ' MAD\n';
    msg += '🚚 Livraison dans tout le Maroc\n\n';
    msg += 'Il ne me reste plus qu a confirmer ma commande en vous communiquant :\n';
    msg += '👤 Mon nom complet :\n';
    msg += '📍 Mon adresse de livraison :\n';
    msg += '🏘️ Mon quartier (numero) :\n';
    msg += '📞 Mon numero de telephone :\n';
    msg += '💬 Un mot pour vous :\n\n';
    msg += 'Merci 🖤, j ai hate de recevoir mon parfum.';
    if (typeof MP_logOrder === 'function') {
      MP_logOrder(cart.map(function (i) { return i.name + ' x' + i.qty; }).join(', '), total);
    }
    window.open('https://wa.me/212769752635?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  }
  function initCart() {
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('cX').addEventListener('click', closeCart);
    document.getElementById('cOv').addEventListener('click', closeCart);
    document.getElementById('cGo').addEventListener('click', checkout);
    document.querySelectorAll('[data-id][data-price]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        addToCart(this.getAttribute('data-id'), this.getAttribute('data-name'), this.getAttribute('data-price'));
      });
    });
  }

  /* ── SECRET STATS (triple-click footer logo) ── */
  function initSecret() {
    var logo = document.getElementById('footerLogo');
    if (!logo) return;
    var clicks = 0, timer = null;
    var hint = document.getElementById('secretHint');
    var hintCount = document.getElementById('hintCount');
    logo.addEventListener('click', function () {
      clicks++;
      if (clicks === 1) {
        timer = setTimeout(function () { clicks = 0; if (hint) hint.style.opacity = '0'; }, 2000);
      }
      if (clicks < 3) {
        if (hintCount) hintCount.textContent = (3 - clicks);
        if (hint) {
          hint.style.opacity = '1';
          setTimeout(function () { hint.style.opacity = '0'; }, 1200);
        }
      }
      if (clicks >= 3) {
        clearTimeout(timer);
        clicks = 0;
        if (hint) hint.style.opacity = '0';
        askSecretThenOpen();
      }
    });
  }
  function askSecretThenOpen() {
    // Déjà déverrouillé sur cet appareil ?
    if (lsGet('mp_dash_unlocked') === '1') {
      openStats();
      return;
    }
    var code = prompt('Code d\u2019accès au dashboard :');
    if (code === null) return; // annulé
    if (code === MP_SECRET) {
      lsSet('mp_dash_unlocked', '1'); // mémorise sur cet appareil
      openStats();
    } else {
      alert('Code incorrect.');
    }
  }
  var _dashAutoRefresh = null;
  function openStats() {
    var page = document.getElementById('statsPage');
    if (!page) return;
    bindDashButtons();
    page.classList.add('is-open');
    page.setAttribute('aria-hidden', 'false');
    refreshStats();
    loadOrderLog();
    clearInterval(_dashAutoRefresh);
    _dashAutoRefresh = setInterval(function () {
      refreshStats();
      loadOrderLog();
    }, 60000); // auto-actualisation toutes les 60s
  }
  var _dashBound = false;
  function bindDashButtons() {
    if (_dashBound) return;
    _dashBound = true;
    var map = [
      ['dashRefresh', function () { refreshStats(); loadOrderLog(); }],
      ['dashClose', closeStats]
    ];
    for (var i = 0; i < map.length; i++) {
      (function (id, fn) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', fn);
      })(map[i][0], map[i][1]);
    }
  }
  function getStatsConfig() {
    return MP_CFG;
  }

  /* ── Récupère les VRAIES stats GA4 via Apps Script ── */
  function refreshStats() {
    var cfg = getStatsConfig();
    var table = document.getElementById('sheetTable');
    if (!cfg.scriptUrl || cfg.scriptUrl.indexOf('__COLLE') === 0) {
      if (table) table.innerHTML = '<div class="dash-placeholder">URL Apps Script non configurée dans app.js</div>';
      return;
    }
    if (table) table.innerHTML = '<div class="dash-placeholder">Chargement des données GA4...</div>';

    var url = cfg.scriptUrl + '?action=ga4';
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (!json.ok) {
          if (table) table.innerHTML = '<div class="dash-placeholder" style="color:#c0392b">Erreur GA4 : ' + esc(json.error || 'inconnue') + '</div>';
          return;
        }
        updateKPIs(json);
        renderSourcesTable(json.sources || []);
        var lu = document.getElementById('lastUpdated');
        if (lu) lu.textContent = 'Sync GA4 : ' + new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      })
      .catch(function () {
        if (table) table.innerHTML = '<div class="dash-placeholder" style="color:#c0392b">Erreur de connexion. Vérifiez le déploiement Apps Script.</div>';
      });
  }
  function updateKPIs(d) {
    function set(id, val) { var e = document.getElementById(id); if (e) e.textContent = val; }
    function fmt(n) { return n != null ? n.toLocaleString('fr-FR') : '—'; }
    set('kpi-users', fmt(d.users));
    set('kpi-sessions', fmt(d.sessions));
    set('kpi-pageviews', fmt(d.pageviews));
    if (d.users) {
      set('kpi-rate', (d.sessions / d.users).toFixed(2));
    } else {
      set('kpi-rate', '—');
    }
  }
  function renderSourcesTable(sources) {
    var table = document.getElementById('sheetTable');
    if (!table) return;
    if (!sources.length) {
      table.innerHTML = '<div class="dash-placeholder">Aucune donnée GA4 sur la période (7 derniers jours)</div>';
      return;
    }
    var sorted = sources.slice().sort(function (a, b) { return (b.users || 0) - (a.users || 0); });
    var totalUsers = sorted.reduce(function (n, s) { return n + (s.users || 0); }, 0);
    var totalSessions = sorted.reduce(function (n, s) { return n + (s.sessions || 0); }, 0);
    var html = '<table class="dash-table">';
    html += '<tr><th>Source de trafic</th><th>Utilisateurs</th><th>Sessions</th></tr>';
    sorted.forEach(function (s) {
      html += '<tr><td>' + esc(s.channel) + '</td><td class="is-gold">' + esc(s.users) + '</td><td>' + esc(s.sessions) + '</td></tr>';
    });
    html += '<tr class="dash-table-total"><td>Total</td><td class="is-gold">' + totalUsers + '</td><td>' + totalSessions + '</td></tr>';
    html += '</table>';
    table.innerHTML = html;
  }
  function MP_logOrder(items, total) {
    var cfg = getStatsConfig();
    var row = [new Date().toLocaleString('fr-FR'), items, total + ' MAD', 'WhatsApp'];
    if (cfg.scriptUrl && cfg.scriptUrl.indexOf('__COLLE') !== 0 && cfg.sheetId) {
      fetch(cfg.scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cfg.sheetId, sheet: cfg.sheetName, row: row })
      }).catch(function () {});
    }
    var log = JSON.parse(lsGet('mp_order_log') || '[]');
    log.unshift({ date: row[0], items: items, total: total + ' MAD' });
    lsSet('mp_order_log', JSON.stringify(log.slice(0, 50)));
  }
  /* ── Commandes : lit le Sheet central (toutes commandes, tous appareils) ──
     Retombe sur le cache localStorage de cet appareil si le Sheet est
     injoignable (hors ligne, script non configuré, etc.) ── */
  function loadOrderLog() {
    var el = document.getElementById('orderLog');
    if (!el) return;
    var cfg = getStatsConfig();
    el.innerHTML = '<div class="dash-placeholder">Chargement des commandes...</div>';
    if (!cfg.scriptUrl || cfg.scriptUrl.indexOf('__COLLE') === 0 || !cfg.sheetId) {
      renderOrdersFromLocalCache(el, false);
      return;
    }
    var url = cfg.scriptUrl + '?id=' + encodeURIComponent(cfg.sheetId) + '&sheet=' + encodeURIComponent(cfg.sheetName);
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (json) {
        var rows = (json && json.data) || [];
        if (!rows.length) { el.textContent = 'Aucune commande enregistrée'; return; }
        var recent = rows.slice(-50).reverse().map(function (r) {
          return { date: r[0], items: r[1], total: r[2] };
        });
        renderOrderTable(el, recent, false);
      })
      .catch(function () {
        renderOrdersFromLocalCache(el, true);
      });
  }
  function renderOrdersFromLocalCache(el, isFallback) {
    var log = JSON.parse(lsGet('mp_order_log') || '[]');
    if (!log.length) {
      el.textContent = isFallback
        ? 'Classeur injoignable, et aucune commande en cache sur cet appareil'
        : 'Aucune commande enregistrée';
      return;
    }
    renderOrderTable(el, log, isFallback);
  }
  function renderOrderTable(el, orders, isFallback) {
    var html = '';
    if (isFallback) {
      html += '<div class="dash-note">⚠ Classeur Google Sheet injoignable — affichage des commandes en cache sur <strong>cet appareil</strong> uniquement.</div>';
    }
    html += '<table class="dash-table">';
    html += '<tr><th>Date</th><th>Articles</th><th>Total</th></tr>';
    orders.forEach(function (o) {
      html += '<tr><td>' + esc(o.date) + '</td><td>' + esc(o.items) + '</td><td class="is-gold">' + esc(o.total) + '</td></tr>';
    });
    html += '</table>';
    el.innerHTML = html;
  }
  function closeStats() {
    var page = document.getElementById('statsPage');
    if (!page) return;
    page.classList.remove('is-open');
    page.setAttribute('aria-hidden', 'true');
    clearInterval(_dashAutoRefresh);
  }

  /* ── PUBLIC API (for inline onclick) ── */
  window.MP = {
    chQty: chQty,
    rmItem: rmItem,
    refreshStats: refreshStats,
    closeStats: closeStats
  };

  /* ── INIT ── */
  function init() {
    initCursor();
    initEntrance();
    initReveals();
    initHeader();
    initParallax();
    initTilt();
    initLightbox();
    initCart();
    initSecret();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
