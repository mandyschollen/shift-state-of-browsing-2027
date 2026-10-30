// Shift — 2027 State of Browsing (Mandy)
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Count numbers up when their card appears ----------
  function countUp(el) {
    var to = parseInt(el.dataset.count, 10);
    if (reduced || !to) { el.textContent = to.toLocaleString('en-US'); return; }
    var start = null, dur = 1200;
    function step(t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('en-US');
      if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  // ---------- Reveal: fade up, then charts fill and numbers count ----------
  // Plays every time a stat comes into view; once it has fully left the screen
  // (scrolled away, or its chapter closed) it quietly resets so it can play again.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var el = e.target;
      if (e.isIntersecting && e.intersectionRatio >= 0.25) {
        if (el.classList.contains('is-in')) return;
        el.classList.add('is-in');
        el.querySelectorAll('[data-count]').forEach(countUp);
      } else if (!e.isIntersecting) {
        el.classList.remove('is-in');
      }
    });
  }, { threshold: [0, 0.25] });
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
  var navChips = document.querySelectorAll('[data-nav-chapters] .chip');
  var absorbed = false;

  // The nav chips softly fade in (CSS handles the animation)
  function setAbsorbed(next) {
    if (next === absorbed) return;
    absorbed = next;
    body.classList.toggle('is-absorbed', next);
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
  // Download form (prototype only: nothing is sent)
  var dl = document.querySelector('[data-download]');
  if (dl) dl.addEventListener('submit', function (e) { e.preventDefault(); dl.reset(); say('Thanks! The report is on its way to your inbox'); });

  document.querySelectorAll('[data-share]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.share + ' From The 2027 State of Browsing Report by Shift.';
      var url = base + '#' + b.dataset.anchor;
      function copy() {
        (navigator.clipboard ? navigator.clipboard.writeText(text + ' ' + url) : Promise.reject())
          .then(function () { say('Stat copied — paste it anywhere'); })
          .catch(function () { say('Copy this link: ' + url); });
      }
      // share sheet where the browser allows it; if it's refused (not just cancelled), copy instead
      if (navigator.share) {
        navigator.share({ title: 'The 2027 State of Browsing Report', text: text, url: url })
          .catch(function (err) { if (!err || err.name !== 'AbortError') copy(); });
        return;
      }
      copy();
    });
  });

  // Open a chapter straight from a shared link (#stat-… or #chapter)
  if (location.hash) {
    var target = document.querySelector(location.hash);
    var ch = target && target.closest('[data-chapter]');
    if (ch) { setOpen(ch, true); setTimeout(function () { target.scrollIntoView(); }, 750); }
  }
  // ---------- Summary / About graphics: built at Figma size, scaled down to fit narrow cards ----------
  var arts = document.querySelectorAll('.art');
  function fitArts() {
    arts.forEach(function (art) {
      var cs = getComputedStyle(art), w = parseFloat(cs.getPropertyValue('--w')), h = parseFloat(cs.getPropertyValue('--h'));
      var k = Math.min(1, art.parentElement.clientWidth / w);
      art.style.setProperty('--k', k);
      art.style.margin = (-h * (1 - k) / 2) + 'px ' + (-w * (1 - k) / 2) + 'px';
    });
  }
  fitArts();
  window.addEventListener('resize', fitArts);
})();
