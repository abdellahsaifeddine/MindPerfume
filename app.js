window.FLACON_SRC="assets/img/img-02.jpg";

/* ════════════════════════════════════════════
   MINDPERFUME.MA — Application JS
   ════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CONFIG ── */
  var WHATSAPP_NUMBER = '212625149343'; // +212 625-149343

  /* ── SAFE STORAGE (never throws) ── */
  function lsGet(k) {
    try { return window.localStorage.getItem(k); } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { window.localStorage.setItem(k, v); } catch (e) {}
  }

  /* ── SECURITY: escape any dynamic text before injecting in HTML ── */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ── SCROLL PROGRESS BAR ── */
  function initProgress() {
    var bar = document.getElementById('sProg');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ── ESSENCE PARTICLES (hero, subtle gold specks) ── */
  function initParticles() {
    if (REDUCED) return;
    var host = document.getElementById('hR');
    if (!host) return;
    var wrap = document.createElement('div');
    wrap.className = 'essence';
    for (var i = 0; i < 14; i++) {
      var p = document.createElement('span');
      var size = 2 + Math.random() * 3.5;
      p.style.left = (8 + Math.random() * 84) + '%';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.animationDuration = (9 + Math.random() * 10) + 's';
      p.style.animationDelay = (-Math.random() * 14) + 's';
      p.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
      wrap.appendChild(p);
    }
    host.appendChild(wrap);
  }

  /* ── MAGNETIC BUTTONS ── */
  function initMagnetic() {
    if (REDUCED || !window.matchMedia('(hover:hover)').matches) return;
    document.querySelectorAll('.btn-buy,.pc-add,.c-go').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = 'translate(' + (x * 6) + 'px,' + (y * 5 - 2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
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
    if (REDUCED) return;
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
    if (REDUCED) return;
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
    if (n > 0 && !REDUCED) {
      var btn = document.getElementById('cartBtn');
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');
    }
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
    // GA4 — ajout au panier
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
    // GA4 — début de commande
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
    msg += 'Salut \uD83D\uDE4C\n\n';
    msg += 'Ton parfum est presque \u00E0 toi.\n\n';
    msg += 'R\u00E9capitulatif de ta s\u00E9lection :\n';
    cart.forEach(function (i) {
      msg += '\uD83C\uDF3F ' + i.name + ' \u00D7' + i.qty + ' = ' + (i.price * i.qty) + ' MAD\n';
    });
    msg += '\nTotal \u00E0 r\u00E9gler : ' + total + ' MAD\n';
    msg += '\uD83D\uDE9A Livraison partout au Maroc \uD83C\uDDF2\uD83C\uDDE6\n\n';
    msg += 'Pour confirmer ta commande, envoie-nous simplement :\n';
    msg += '\u2022 Nom complet :\n';
    msg += '\u2022 Adresse de livraison :\n';
    msg += '\u2022 Num\u00E9ro de t\u00E9l\u00E9phone :\n\n';
    msg += 'D\u00E8s r\u00E9ception de ces informations, on valide ta commande et on pr\u00E9pare ton colis avec soin \uD83D\uDCE6.\n\n';
    msg += '\uD83D\uDD25 On a h\u00E2te de te faire d\u00E9couvrir Mystique \u2014 Mon V\u00E9tiver.\n\n';
    msg += '\u00C0 tr\u00E8s vite,\n';
    msg += 'MindPerfume \uD83D\uDDA4';
    if (typeof MP_logOrder === 'function') {
      MP_logOrder(cart.map(function (i) { return i.name + ' x' + i.qty; }).join(', '), total);
    }
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
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
        openStats();
      }
    });
  }
  function openStats() {
    var page = document.getElementById('statsPage');
    if (!page) return;
    bindDashButtons();
    page.classList.add('is-open');
    page.setAttribute('aria-hidden', 'false');
    loadStatsConfig();
    refreshStats();
    loadOrderLog();
  }
  var _dashBound = false;
  function bindDashButtons() {
    if (_dashBound) return;
    _dashBound = true;
    var map = [
      ['dashRefresh', refreshStats],
      ['dashClose', closeStats],
      ['dashSave', saveStatsConfig],
      ['dashTest', testStatsConn],
      ['dashGuide', toggleGuide],
      ['dashGuideClose', toggleGuide]
    ];
    for (var i = 0; i < map.length; i++) {
      (function (id, fn) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', fn);
      })(map[i][0], map[i][1]);
    }
  }
  function getStatsConfig() {
    var saved = lsGet('mp_sheet_cfg');
    try {
      return saved ? JSON.parse(saved) : { sheetId: '', sheetName: 'Stats', scriptUrl: '' };
    } catch (e) {
      return { sheetId: '', sheetName: 'Stats', scriptUrl: '' };
    }
  }
  function loadStatsConfig() {
    var cfg = getStatsConfig();
    var a = document.getElementById('sheetId');
    var b = document.getElementById('sheetName');
    var c = document.getElementById('scriptUrl');
    if (a) a.value = cfg.sheetId || '';
    if (b) b.value = cfg.sheetName || 'Stats';
    if (c) c.value = cfg.scriptUrl || '';
  }
  function refreshStats() {
    var cfg = getStatsConfig();
    var table = document.getElementById('sheetTable');
    if (!cfg.scriptUrl || !cfg.sheetId) {
      if (table) table.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted);font-family:var(--mono);font-size:.6rem;">Configurez votre Google Sheet ci-dessus</div>';
      return;
    }
    if (table) table.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted);font-family:var(--mono);font-size:.6rem;">Chargement...</div>';
    var url = cfg.scriptUrl + '?id=' + encodeURIComponent(cfg.sheetId) + '&sheet=' + encodeURIComponent(cfg.sheetName);
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (json) {
        renderStatsTable(json.data || []);
        updateKPIs(json.data || []);
        var lu = document.getElementById('lastUpdated');
        if (lu) lu.textContent = 'Sync : ' + new Date().toLocaleTimeString('fr-FR');
      })
      .catch(function () {
        if (table) table.innerHTML = '<div style="text-align:center;padding:2rem;color:#c0392b;font-family:var(--mono);font-size:.6rem;">Erreur de connexion. Verifiez l\u2019URL et les permissions.</div>';
      });
  }
  function renderStatsTable(data) {
    var table = document.getElementById('sheetTable');
    if (!table) return;
    if (!data.length) {
      table.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted);font-family:var(--mono);font-size:.6rem;">Aucune donnee</div>';
      return;
    }
    var html = '<table style="width:100%;border-collapse:collapse;">';
    data.forEach(function (row, i) {
      var bg = i === 0 ? 'var(--paper2)' : (i % 2 === 0 ? 'var(--paper)' : 'var(--cream)');
      var fw = i === 0 ? '600' : '400';
      html += '<tr style="background:' + bg + '">';
      row.forEach(function (cell) {
        var tag = i === 0 ? 'th' : 'td';
        html += '<' + tag + ' style="padding:.6rem .8rem;border:1px solid var(--line);font-family:var(--mono);font-size:.55rem;font-weight:' + fw + ';text-align:left;white-space:nowrap;">' + esc(cell) + '</' + tag + '>';
      });
      html += '</tr>';
    });
    html += '</table>';
    table.innerHTML = html;
  }
  function updateKPIs(data) {
    if (data.length < 2) return;
    var last = data[data.length - 1];
    function set(id, val) { var e = document.getElementById(id); if (e && val !== undefined) e.textContent = val; }
    set('kpi-visits', last[1]);
    set('kpi-orders', last[2]);
    set('kpi-revenue', last[3] ? last[3] + ' MAD' : '—');
    var v = parseFloat(last[1]), o = parseFloat(last[2]);
    if (v && o) set('kpi-rate', ((o / v) * 100).toFixed(1) + ' %');
  }
  function saveStatsConfig() {
    var cfg = {
      sheetId: document.getElementById('sheetId').value,
      sheetName: document.getElementById('sheetName').value,
      scriptUrl: document.getElementById('scriptUrl').value
    };
    lsSet('mp_sheet_cfg', JSON.stringify(cfg));
    var s = document.getElementById('connStatus');
    if (s) { s.textContent = '\u2713 Sauvegarde'; setTimeout(function () { s.textContent = ''; }, 2000); }
  }
  function testStatsConn() {
    var cfg = getStatsConfig();
    var s = document.getElementById('connStatus');
    if (!cfg.scriptUrl) { alert('Entrez l\u2019URL du script'); return; }
    if (s) s.textContent = 'Test...';
    fetch(cfg.scriptUrl + '?id=' + encodeURIComponent(cfg.sheetId) + '&sheet=' + encodeURIComponent(cfg.sheetName))
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (s) s.textContent = '\u2713 OK \u2014 ' + (json.data ? json.data.length + ' lignes' : 'recu');
      })
      .catch(function () { if (s) s.textContent = '\u2717 Echec'; });
  }
  function MP_logOrder(items, total) {
    var cfg = getStatsConfig();
    var row = [new Date().toLocaleString('fr-FR'), items, total + ' MAD', 'WhatsApp'];
    if (cfg.scriptUrl && cfg.sheetId) {
      fetch(cfg.scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cfg.sheetId, sheet: cfg.sheetName, row: row })
      }).catch(function () {});
    }
    var log;
    try { log = JSON.parse(lsGet('mp_order_log') || '[]'); } catch (e) { log = []; }
    log.unshift({ date: row[0], items: items, total: total + ' MAD' });
    lsSet('mp_order_log', JSON.stringify(log.slice(0, 50)));
  }
  function loadOrderLog() {
    var log;
    try { log = JSON.parse(lsGet('mp_order_log') || '[]'); } catch (e) { log = []; }
    var el = document.getElementById('orderLog');
    if (!el) return;
    if (!log.length) { el.textContent = 'Aucune commande'; return; }
    var html = '<table style="width:100%;border-collapse:collapse;">';
    html += '<tr style="background:var(--paper2)"><th style="padding:.5rem;border:1px solid var(--line);font-family:var(--mono);font-size:.5rem;text-align:left;">Date</th><th style="padding:.5rem;border:1px solid var(--line);font-family:var(--mono);font-size:.5rem;text-align:left;">Articles</th><th style="padding:.5rem;border:1px solid var(--line);font-family:var(--mono);font-size:.5rem;text-align:left;">Total</th></tr>';
    log.forEach(function (o) {
      html += '<tr><td style="padding:.5rem;border:1px solid var(--line);font-family:var(--mono);font-size:.55rem;">' + esc(o.date) + '</td><td style="padding:.5rem;border:1px solid var(--line);font-family:var(--mono);font-size:.55rem;">' + esc(o.items) + '</td><td style="padding:.5rem;border:1px solid var(--line);font-family:var(--mono);font-size:.55rem;color:var(--gold);">' + esc(o.total) + '</td></tr>';
    });
    html += '</table>';
    el.innerHTML = html;
  }
  function closeStats() {
    var page = document.getElementById('statsPage');
    if (!page) return;
    page.classList.remove('is-open');
    page.setAttribute('aria-hidden', 'true');
  }
  function toggleGuide() {
    var g = document.getElementById('guidePanel');
    if (g) g.classList.toggle('is-open');
  }

  /* ── PUBLIC API (for inline onclick) ── */
  window.MP = {
    chQty: chQty,
    rmItem: rmItem,
    refreshStats: refreshStats,
    saveStatsConfig: saveStatsConfig,
    testStatsConn: testStatsConn,
    closeStats: closeStats,
    toggleGuide: toggleGuide
  };

  /* ── INIT ── */
  function init() {
    initCursor();
    initEntrance();
    initProgress();
    initParticles();
    initMagnetic();
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
