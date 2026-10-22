// Shift — 2027 State of Browsing (Mandy)
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

  // ---------- Count numbers up when their card appears ----------
  function countUp(el) {
    var to = parseInt(el.dataset.count, 10);
    if (reduced || !to) { el.textContent = to; return; }
    var start = null, dur = 1200;
    function step(t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  // ---------- Reveal (once): fade up, then charts fill and numbers count ----------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  // ---------- Expand / collapse chapters ----------
  function setOpen(chapter, open) {
    var btn = chapter.querySelector('[data-toggle]');
    var body = chapter.querySelector('.chapter__body');
    chapter.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.toggle__label').textContent = open ? 'Collapse insights' : 'Expand insights';
    body.inert = !open;
  }
  document.querySelectorAll('[data-chapter]').forEach(function (chapter) {
    chapter.querySelector('[data-toggle]').addEventListener('click', function () {
      var open = !chapter.classList.contains('is-open');
      // collapsing from deep inside the chapter: bring its heading back into view first
      if (!open && chapter.getBoundingClientRect().top < 0) chapter.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      setOpen(chapter, open);
    });
  });

  // Chapter chips (page row + nav): open that chapter and go to it
  document.querySelectorAll('[data-chapter-link]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var chapter = document.querySelector(a.getAttribute('href'));
      if (!chapter) return;
      e.preventDefault();
      setOpen(chapter, true);
      chapter.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  // ---------- Nav absorbs the chapter row once you scroll past it ----------
  var body = document.body;
  var nav = document.querySelector('.nav');
  var pageRow = document.querySelector('[data-page-chapters]');
  var pageChips = pageRow.querySelectorAll('.chip');
  var navChips = document.querySelectorAll('[data-nav-chapters] .chip');
  var desktop = window.matchMedia('(min-width: 1100px)');
  var absorbed = false;

  // FLIP: animate each nav chip from where the matching page chip is (or back to it)
  function fly(toNav) {
    navChips.forEach(function (chip, i) {
      var page = pageChips[i].getBoundingClientRect();
      var slot = chip.getBoundingClientRect();
      var dx = page.left - slot.left, dy = page.top - slot.top;
      var sx = page.width / slot.width;
      var away = 'translate(' + dx + 'px,' + dy + 'px) scaleX(' + sx + ')';
      var frames = toNav
        ? [{ transform: away, opacity: 1 }, { transform: 'none', opacity: 1 }]
        : [{ transform: 'none', opacity: 1 }, { transform: away, opacity: 1 }];
      chip.style.transformOrigin = 'left center';
      chip.animate(frames, { duration: 560, delay: i * 35, easing: EASE });
    });
  }

  function setAbsorbed(next, animate) {
    if (next === absorbed) return;
    absorbed = next;
    var canFly = animate && !reduced && desktop.matches;
    if (next) {
      body.classList.add('is-absorbed');
      if (canFly) fly(true);
    } else {
      if (canFly) fly(false);
      body.classList.remove('is-absorbed');
    }
    navChips.forEach(function (c) { c.tabIndex = next ? 0 : -1; });
  }

  function onScroll(animate) {
    var navBottom = nav.getBoundingClientRect().bottom;
    setAbsorbed(pageRow.getBoundingClientRect().top < navBottom + 4, animate);

    // highlight the chapter you're in
    var line = window.innerHeight * 0.4, current = null;
    document.querySelectorAll('[data-chapter]').forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (r.top < line && r.bottom > line) current = '#' + c.id;
    });
    document.querySelectorAll('[data-chapter-link]').forEach(function (a) {
      if (a.getAttribute('href') === current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', function () { onScroll(true); }, { passive: true });
  window.addEventListener('resize', function () { onScroll(false); });
  onScroll(false);

  // ---------- Share: native share sheet, else copy ----------
  var toast = document.querySelector('[data-toast]'), toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2200);
  }
  var base = location.href.split('#')[0];
  document.querySelectorAll('[data-share]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.share + ' From The 2027 State of Browsing Report by Shift.';
      var url = base + '#' + b.dataset.anchor;
      if (navigator.share) { navigator.share({ title: 'The 2027 State of Browsing Report', text: text, url: url }).catch(function () {}); return; }
      (navigator.clipboard ? navigator.clipboard.writeText(text + ' ' + url) : Promise.reject())
        .then(function () { say('Stat copied — paste it anywhere'); })
        .catch(function () { say('Copy this link: ' + url); });
    });
  });

  // Open a chapter straight from a shared link (#stat-… or #chapter)
  if (location.hash) {
    var target = document.querySelector(location.hash);
    var ch = target && target.closest('[data-chapter]');
    if (ch) { setOpen(ch, true); setTimeout(function () { target.scrollIntoView(); }, 750); }
  }
})();
