(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('is-loaded'); });
  });

  // ── Scroll reveal, staggered within each grid ──
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.classList.contains('reveal');
      });
      el.style.transitionDelay = (siblings.indexOf(el) % 4) * 90 + 'ms';
      el.classList.add('is-in');
      revealer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealer.observe(el); });

  // ── Top bar hides on scroll down, returns on scroll up ──
  var bar = document.querySelector('.bar');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    bar.classList.toggle('is-hidden', y > lastY && y > 300);
    lastY = y;
  }, { passive: true });

  // ── Index: floating preview follows the cursor ──
  var index = document.querySelector('.index');
  var preview = index.querySelector('.index-preview');
  var previewImg = preview.querySelector('img');
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    index.querySelectorAll('.index-list a').forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        previewImg.src = link.dataset.preview;
        preview.classList.add('is-on');
      });
      link.addEventListener('mouseleave', function () { preview.classList.remove('is-on'); });
    });
    index.addEventListener('mousemove', function (e) {
      var box = index.getBoundingClientRect();
      preview.style.left = (e.clientX - box.left + 140) + 'px';
      preview.style.top = (e.clientY - box.top) + 'px';
    });
  }

  // ── Lightbox: arrows, keyboard and swipe ──
  var dialog = document.querySelector('.lightbox');
  var lbImg = dialog.querySelector('img');
  var lbText = dialog.querySelector('.lb-text');
  var lbCount = dialog.querySelector('.lb-count');
  var works = Array.prototype.slice.call(document.querySelectorAll('.work'));
  var current = 0;

  function show(i, dir) {
    current = (i + works.length) % works.length;
    var work = works[current];
    var img = work.querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbText.innerHTML = work.querySelector('figcaption').innerHTML;
    var section = work.closest('.project').querySelector('.project-title').textContent;
    lbCount.textContent = section + ' — ' + (current + 1) + ' / ' + works.length;
    if (dir && !reduceMotion && lbImg.animate) {
      lbImg.animate([
        { transform: 'translateX(' + dir * 3 + 'rem)', opacity: 0 },
        { transform: 'none', opacity: 1 }
      ], { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  }

  works.forEach(function (work, i) {
    var label = work.querySelector('figcaption strong');
    var btn = work.querySelector('.zoom');
    if (label) btn.setAttribute('aria-label', 'Enlarge: ' + label.textContent);
    btn.addEventListener('click', function () { show(i); dialog.showModal(); });
  });
  dialog.querySelector('.lb-close').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1, -1); });
  dialog.querySelector('.lb-next').addEventListener('click', function () { show(current + 1, 1); });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.classList.contains('lb-figure')) dialog.close();
  });
  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1, -1);
    if (e.key === 'ArrowRight') show(current + 1, 1);
  });

  // Swipe left/right to move between images; mostly-vertical drags are ignored
  var touchX = null, touchY = 0;
  dialog.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { touchX = null; return; }
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  dialog.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      var dir = dx < 0 ? 1 : -1;
      show(current + dir, dir);
    }
  });

  // ── Type pairing switcher (review only) ──
  var buttons = document.querySelectorAll('[data-set-type]');
  function markType() {
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setType === root.dataset.type));
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      root.dataset.type = b.dataset.setType;
      localStorage.setItem('oc-type', b.dataset.setType);
      markType();
    });
  });
  markType();
})();
