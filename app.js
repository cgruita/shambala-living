(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header border once the page scrolls
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Gallery filters
  var filters = document.querySelectorAll('.filter');
  var tiles = document.querySelectorAll('.tile');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      tiles.forEach(function (t) {
        var show = f === 'all' || t.getAttribute('data-cat') === f;
        t.classList.toggle('is-hidden', !show);
      });
    });
  });

  // Lightbox
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var visible = [];
  var index = 0;

  function currentList() {
    return Array.prototype.filter.call(tiles, function (t) {
      return !t.classList.contains('is-hidden');
    });
  }

  function show(i) {
    visible = currentList();
    if (!visible.length) return;
    index = (i + visible.length) % visible.length;
    var a = visible[index];
    var img = a.querySelector('img');
    lbImg.src = a.getAttribute('href');
    lbImg.alt = img ? img.alt : '';
  }

  function open(i) {
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }

  function close() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function (e) {
      e.preventDefault();
      visible = currentList();
      open(visible.indexOf(tile));
    });
  });

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function (e) {
    e.stopPropagation(); show(index - 1);
  });
  lb.querySelector('.lb-next').addEventListener('click', function (e) {
    e.stopPropagation(); show(index + 1);
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
