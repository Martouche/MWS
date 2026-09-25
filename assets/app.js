/* Mandelieu Watersports — script unique, chargé en defer.
   Reprend le script du fichier de style (header, menus, carrousel, onglets),
   rendu tolérant aux pages qui n'ont pas tous les composants. */
(function () {
  'use strict';
  var moi = document.currentScript;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Header : ombre au scroll + CTA mobile ---------- */
  var header = $('#header'), mcta = $('[data-mcta]');
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (mcta) mcta.classList.toggle('is-visible', y > 480);
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Dropdown Activités ---------- */
  var ddBtn = $('[data-dropdown]'), ddPanel = $('#dd-activites');
  function setDD(open) { if (!ddBtn) return; ddBtn.setAttribute('aria-expanded', open); ddPanel.classList.toggle('is-open', open); }
  if (ddBtn) {
    ddBtn.addEventListener('click', function (e) { e.stopPropagation(); setDD(ddBtn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.dropdown')) setDD(false); });
  }

  /* ---------- Burger / tiroir ---------- */
  var burger = $('.burger'), drawer = $('#drawer');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('menu-open', open);
    if (open) setTimeout(function () { $('.drawer__panel a, .drawer__panel button').focus(); }, 350);
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  drawer.addEventListener('click', function (e) { if (e.target.closest('a') || e.target.hasAttribute('data-close')) setMenu(false); });
  $$('.drawer__acc').forEach(function (acc) {
    var sub = document.getElementById(acc.getAttribute('aria-controls'));
    acc.addEventListener('click', function () { var o = acc.getAttribute('aria-expanded') !== 'true'; acc.setAttribute('aria-expanded', o); sub.classList.toggle('is-open', o); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setDD(false);
    if (drawer.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- Hero : slider à onglets (accueil) ---------- */
  var hero = $('#hero');
  if (hero && $('.tabs', hero)) {
    var slides = $$('.hero__slide', hero), tabs = $$('.tab', hero);
    var bar = $('.progress__bar', hero), cur = $('[data-current]', hero), toggle = $('[data-action="toggle"]', hero);
    var DURATION = 6500, i = 0, playing = !reduce, timer, anim;

    var go = function (n, focus) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      cur.textContent = '0' + (i + 1);
      restart();
    };
    var restart = function () {
      clearTimeout(timer); if (anim) anim.cancel();
      if (!playing) { bar.style.transform = 'scaleX(0)'; return; }
      anim = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: DURATION, easing: 'linear', fill: 'forwards' });
      timer = setTimeout(function () { go(i + 1); }, DURATION);
    };
    var setPlaying = function (p) {
      playing = p;
      $('[data-icon="pause"]', toggle).toggleAttribute('hidden', !p);
      $('[data-icon="play"]', toggle).toggleAttribute('hidden', p);
      toggle.setAttribute('aria-label', p ? 'Mettre en pause le diaporama' : 'Lire le diaporama');
      restart();
    };
    hero.addEventListener('click', function (e) {
      var t = e.target.closest('.tab'); if (t) { go(tabs.indexOf(t)); return; }
      var b = e.target.closest('[data-action]'); if (!b) return;
      if (b.dataset.action === 'toggle') setPlaying(!playing);
      if (b.dataset.action === 'next') go(i + 1);
      if (b.dataset.action === 'prev') go(i - 1);
    });
    $('.tabs', hero).addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, true); }
    });
    var x0 = null, y0 = null;
    hero.addEventListener('touchstart', function (e) { if (e.target.closest('.tabbar')) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? i + 1 : i - 1);
      x0 = null;
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden) { clearTimeout(timer); if (anim) anim.pause(); } else restart(); });
    setPlaying(playing);
  }

  /* ---------- Ancres internes : les sections hors écran ont un rendu différé
     (content-visibility), on recale la position une fois qu'elles sont rendues. ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute('href').length < 2) return;
    var cible = document.getElementById(a.getAttribute('href').slice(1)); if (!cible) return;
    e.preventDefault();
    var aller = function () { cible.scrollIntoView({ behavior: 'auto', block: 'start' }); };
    aller(); requestAnimationFrame(function () { requestAnimationFrame(aller); });
    history.replaceState(null, '', a.getAttribute('href'));
  });

  /* ---------- Onglets de réservation (ARIA tabs) ---------- */
  var btabs = $$('.btab'), bpanels = $$('.bpanel');
  function selectB(k, focus) {
    btabs.forEach(function (t, j) { var on = j === k; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    bpanels.forEach(function (p, j) { var on = j === k; p.toggleAttribute('hidden', !on); if (on && !reduce) { p.classList.remove('is-entering'); void p.offsetWidth; p.classList.add('is-entering'); } });
    if (focus) btabs[k].focus();
  }
  btabs.forEach(function (t, k) {
    t.addEventListener('click', function () { selectB(k); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = (k + 1) % btabs.length;
      if (e.key === 'ArrowLeft') n = (k - 1 + btabs.length) % btabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = btabs.length - 1;
      if (n !== null) { e.preventDefault(); selectB(n, true); }
    });
  });

  /* ---------- Consentement cookies : GTM chargé uniquement après « Accepter » ---------- */
  var CLE = 'mws-consentement', SIX_MOIS = 1000 * 60 * 60 * 24 * 182;
  var consent = $('#consent');
  function lire() {
    try { var v = JSON.parse(localStorage.getItem(CLE)); return v && Date.now() - v.t < SIX_MOIS ? v.choix : null; } catch (e) { return null; }
  }
  function ecrire(choix) { try { localStorage.setItem(CLE, JSON.stringify({ choix: choix, t: Date.now() })); } catch (e) {} }
  function chargerGtm() {
    if (window.__gtm) return; window.__gtm = true;
    ((moi && moi.dataset.gtm) || '').split(',').filter(Boolean).forEach(function (id) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      var s = document.createElement('script'); s.async = true;
      s.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
      document.head.appendChild(s);
    });
  }
  function montrer(v) { consent.hidden = !v; document.body.classList.toggle('consent-open', v); }
  if (consent) {
    var choix = lire();
    if (choix === 'oui') chargerGtm();
    if (!choix) montrer(true);
    consent.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]'); if (!b) return;
      ecrire(b.dataset.consent); montrer(false);
      if (b.dataset.consent === 'oui') chargerGtm();
    });
    document.addEventListener('click', function (e) { if (e.target.closest('[data-consent-open]')) montrer(true); });
  }

  /* ---------- Calendrier Resamare : chargé à l'approche de son affichage ---------- */
  var resa = $('[data-resa-src]');
  if (resa) {
    var chargerResa = function () {
      if (resa.dataset.charge) return; resa.dataset.charge = '1';
      var s = document.createElement('script'); s.src = resa.dataset.resaSrc; document.body.appendChild(s);
    };
    // Script tiers lourd : attendu jusqu'à la première interaction, puis chargé
    // dès que le calendrier approche de l'écran.
    var observer = function () {
      ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { window.removeEventListener(ev, observer); });
      if (!('IntersectionObserver' in window)) return chargerResa();
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { chargerResa(); io.disconnect(); } }, { rootMargin: '600px 0px' });
      io.observe(resa);
    };
    ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, observer, { passive: true }); });
    $$('a[href="#resa"]').forEach(function (a) { a.addEventListener('click', chargerResa); });
  }

  /* ---------- Médias différés ---------- */
  // Diapositives cachées du carrousel : après le chargement complet de la page.
  var hydrater = function () {
    $$('[data-srcset],[data-src]').forEach(function (el) {
      if (el.dataset.srcset) { el.srcset = el.dataset.srcset; el.removeAttribute('data-srcset'); }
      if (el.dataset.src) { el.src = el.dataset.src; el.removeAttribute('data-src'); }
    });
  };
  if (document.readyState === 'complete') setTimeout(hydrater, 2000);
  else window.addEventListener('load', function () { setTimeout(hydrater, 2000); });
  // Aperçus vidéo : à l'approche de la vidéo.
  var videos = $$('video[data-poster]');
  if (videos.length) {
    var poser = function (v) { v.poster = v.dataset.poster; v.removeAttribute('data-poster'); };
    if ('IntersectionObserver' in window) {
      var iov = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { poser(e.target); iov.unobserve(e.target); } }); }, { rootMargin: '500px 0px' });
      videos.forEach(function (v) { iov.observe(v); });
    } else videos.forEach(poser);
  }

  /* ---------- Carte Google Maps chargée au clic ---------- */
  $$('[data-map-open]').forEach(function (b) {
    b.addEventListener('click', function () {
      var box = b.closest('[data-map]'), f = document.createElement('iframe');
      f.src = box.dataset.map; f.title = 'Carte : Mandelieu Watersports, plage de la Rague'; f.loading = 'lazy';
      f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      box.appendChild(f); b.remove();
    });
  });

  /* ---------- Formulaire d'autorisation mineur : signature + impression ---------- */
  var form = $('#attestation');
  if (form) {
    var today = $('[data-today]'); if (today) today.textContent = new Date().toLocaleDateString('fr-FR');
    var c = $('#signature'), ctx = c.getContext('2d'), drawing = false, signed = false;
    ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#0c1d4a';
    var pos = function (e) { var r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * c.width / r.width, y: (e.clientY - r.top) * c.height / r.height }; };
    c.addEventListener('pointerdown', function (e) { drawing = true; c.setPointerCapture(e.pointerId); var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    c.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); signed = true; });
    c.addEventListener('pointerup', function () { drawing = false; });
    $('[data-sig-clear]').addEventListener('click', function () { ctx.clearRect(0, 0, c.width, c.height); signed = false; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!signed) { alert('Merci de signer le formulaire avant de l’imprimer.'); return; }
      window.print();
    });
  }
})();
