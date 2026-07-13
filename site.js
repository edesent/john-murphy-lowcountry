// John Murphy — The Reserve Team — shared site behavior
(function () {
  'use strict';

  // Sticky header
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Reveal on scroll
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  // Animated counters
  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      counterObs.unobserve(e.target);
      var el = e.target;
      var target = parseFloat(el.dataset.count);
      var decimals = (el.dataset.count.split('.')[1] || '').length;
      var suffix = el.dataset.suffix || '';
      var dur = 1600, start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(function (el) { counterObs.observe(el); });

  // Testimonial slider
  var slider = document.querySelector('.testimonial-slider');
  if (slider) {
    var slides = slider.querySelectorAll('.t-slide');
    var dots = slider.querySelectorAll('.t-dot');
    var idx = 0, timer = null;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('active', n === idx); });
      dots.forEach(function (d, n) { d.classList.toggle('active', n === idx); });
    }
    function auto() {
      clearInterval(timer);
      timer = setInterval(function () { show(idx + 1); }, 6500);
    }
    dots.forEach(function (d, n) {
      d.addEventListener('click', function () { show(n); auto(); });
    });
    show(0);
    auto();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var ans = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // Sub-nav active state on scroll
  var subnavLinks = document.querySelectorAll('.subnav a');
  if (subnavLinks.length) {
    var targets = Array.prototype.map.call(subnavLinks, function (a) {
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);
    var subObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          subnavLinks.forEach(function (a) { a.classList.remove('active'); });
          var match = document.querySelector('.subnav a[href="#' + entry.target.id + '"]');
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    targets.forEach(function (t) { subObs.observe(t); });
  }

  // Contact / valuation form (demo): open a pre-filled email
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var subject = encodeURIComponent('Website inquiry — ' + (d.get('goal') || 'General'));
      var body = encodeURIComponent(
        'Name: ' + d.get('name') + '\n' +
        'Phone: ' + d.get('phone') + '\n' +
        'Email: ' + d.get('email') + '\n' +
        'I want to: ' + d.get('goal') + '\n\n' +
        d.get('message')
      );
      window.location.href = 'mailto:johnmurphy888@gmail.com?subject=' + subject + '&body=' + body;
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Opening your email app… or just call/text John at (518) 496-0703.';
    });
  }

  var valForm = document.querySelector('#valuation-form');
  if (valForm) {
    valForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = new FormData(valForm);
      var subject = encodeURIComponent('Home Valuation Request — ' + (d.get('address') || ''));
      var body = encodeURIComponent(
        'Name: ' + d.get('name') + '\n' +
        'Phone: ' + d.get('phone') + '\n' +
        'Email: ' + d.get('email') + '\n' +
        'Property Address: ' + d.get('address') + '\n' +
        'Timeline: ' + d.get('timeline')
      );
      window.location.href = 'mailto:johnmurphy888@gmail.com?subject=' + subject + '&body=' + body;
      var note = valForm.querySelector('.form-note');
      if (note) note.textContent = 'Opening your email app… John will follow up with your free valuation shortly.';
    });
  }
})();
