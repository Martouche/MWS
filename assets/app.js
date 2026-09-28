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

  /* ---------- Vidéos d'arrière-plan du hero (autoplay, muettes, en boucle) ----------
     La photo reste dessous (affiche + repli) ; la vidéo n'est téléchargée
     qu'après le chargement de la page, et jamais en mode « animations réduites ». */
  var videoFond = function (v, jouer) {
    if (!v || reduce) return;
    if (!jouer) { v.pause(); return; }
    if (!v.getAttribute('src')) v.src = v.dataset.videoSrc;
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  };
  $$('.hero__video').forEach(function (v) {
    v.addEventListener('playing', function () { v.classList.add('is-playing'); });
  });
  var apresChargement = function (fn) {
    if (document.readyState === 'complete') setTimeout(fn, 300);
    else window.addEventListener('load', function () { setTimeout(fn, 300); });
  };

  /* ---------- Hero : slider à onglets (accueil) ---------- */
  var hero = $('#hero');
  if (hero && $('.tabs', hero)) {
    var slides = $$('.hero__slide', hero), tabs = $$('.tab', hero);
    var DURATION = 6500, i = 0, auto = !reduce, suspendu = false, pret = false, timer;

    var videosActives = function () {
      if (!pret) return;
      slides.forEach(function (s, k) { videoFond($('.hero__video', s), k === i); });
    };
    var go = function (n, focus) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      videosActives();
      restart();
    };
    // Défilement automatique, suspendu au survol et au focus clavier (lecture du texte).
    var restart = function () {
      clearTimeout(timer);
      if (!auto || suspendu) return;
      timer = setTimeout(function () { go(i + 1); }, DURATION);
    };
    var suspendre = function (v) { suspendu = v; restart(); };
    hero.addEventListener('mouseenter', function () { suspendre(true); });
    hero.addEventListener('mouseleave', function () { suspendre(false); });
    hero.addEventListener('focusin', function () { suspendre(true); });
    hero.addEventListener('focusout', function (e) { if (!hero.contains(e.relatedTarget)) suspendre(false); });
    hero.addEventListener('click', function (e) {
      var t = e.target.closest('.tab'); if (t) { go(tabs.indexOf(t)); return; }
      var b = e.target.closest('[data-action]'); if (!b) return;
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
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearTimeout(timer); slides.forEach(function (s) { videoFond($('.hero__video', s), false); }); }
      else { videosActives(); restart(); }
    });
    apresChargement(function () { pret = true; videosActives(); });
    restart();
  } else {
    // Hero de page : une seule vidéo éventuelle.
    apresChargement(function () { $$('.hero__video').forEach(function (v) { videoFond(v, true); }); });
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

  /* ---------- Galerie des fiches produit : la miniature cliquée remplace la grande photo ---------- */
  var galerie = $('[data-galerie]');
  if (galerie) {
    var vignettes = $$('.pdp__thumb');
    vignettes.forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.classList.contains('is-active')) return;
        vignettes.forEach(function (x) { var on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on); });
        var img = $('img', galerie), srcs = $$('source', galerie);
        var remplacer = function () {
          srcs.forEach(function (so) { so.srcset = so.type === 'image/avif' ? b.dataset.avif : b.dataset.webp; });
          img.src = b.dataset.src; img.alt = b.dataset.alt; img.width = +b.dataset.w; img.height = +b.dataset.h;
        };
        if (reduce) { remplacer(); return; }
        galerie.classList.add('is-changing');
        setTimeout(function () {
          remplacer();
          var fin = function () { requestAnimationFrame(function () { galerie.classList.remove('is-changing'); }); };
          if (img.decode) img.decode().then(fin, fin); else img.onload = fin;
        }, 200);
      });
    });
  }

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

  /* ---------- Avis Google en direct (Places API New) ----------
     Chargés à l'approche de la section, mis en cache 6 h ; en cas d'échec
     (clé absente, quota, réseau), les avis enregistrés restent affichés. */
  var avis = $('[data-avis-live]');
  if (avis) {
    var CLE_AVIS = 'mws-avis-google', TTL = 6 * 3600 * 1000;
    var afficherAvis = function (d) {
      if (d.rating) {
        $('[data-avis-note]', avis).textContent = d.rating.toFixed(1).replace('.', ',') + '/5';
        var et = $('[data-avis-etoiles]', avis);
        et.style.setProperty('--note', d.rating);
        et.setAttribute('aria-label', 'Note Google : ' + d.rating.toFixed(1).replace('.', ',') + ' sur 5');
      }
      if (d.userRatingCount) $('[data-avis-total]', avis).innerHTML = 'Basée sur <strong>' + d.userRatingCount + ' avis</strong> Google';
      if (d.googleMapsUri) $('[data-avis-lien]', avis).href = d.googleMapsUri;
      var liste = (d.reviews || []).filter(function (r) { return r.text && r.text.text; })
        .sort(function (a, b) { return (b.publishTime || '').localeCompare(a.publishTime || ''); });
      if (!liste.length) return;
      var ul = $('[data-avis-liste]', avis);
      ul.textContent = '';
      liste.forEach(function (r) {
        var li = document.createElement('li'), bq = document.createElement('blockquote');
        var p = document.createElement('p'); p.textContent = '« ' + r.text.text + ' »';
        var pied = document.createElement('footer');
        var et = document.createElement('span'); et.className = 'reviews__mini';
        et.textContent = '★★★★★'.slice(0, Math.round(r.rating || 5)); et.setAttribute('aria-label', (r.rating || 5) + ' sur 5');
        pied.appendChild(et);
        var auteur = r.authorAttribution || {};
        var nom = document.createElement(auteur.uri ? 'a' : 'span');
        nom.textContent = auteur.displayName || 'Client Google';
        if (auteur.uri) { nom.href = auteur.uri; nom.rel = 'noopener'; nom.target = '_blank'; }
        pied.appendChild(nom);
        if (r.relativePublishTimeDescription) pied.appendChild(document.createTextNode(' · ' + r.relativePublishTimeDescription));
        bq.appendChild(p); bq.appendChild(pied); li.appendChild(bq); ul.appendChild(li);
      });
    };
    var chargerAvis = function () {
      try { var c = JSON.parse(localStorage.getItem(CLE_AVIS)); if (c && Date.now() - c.t < TTL) return afficherAvis(c.d); } catch (e) {}
      fetch('https://places.googleapis.com/v1/places/' + encodeURIComponent(avis.dataset.place) + '?languageCode=fr', {
        headers: { 'X-Goog-Api-Key': avis.dataset.cle, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri' }
      }).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
        .then(function (d) { try { localStorage.setItem(CLE_AVIS, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} afficherAvis(d); })
        .catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      var ioa = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { ioa.disconnect(); chargerAvis(); } }, { rootMargin: '800px 0px' });
      ioa.observe(avis);
    } else chargerAvis();
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
