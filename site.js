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

  // ---- Lead forms -------------------------------------------------------
  // Submissions POST to the FormSubmit relay so a lead lands in John's inbox
  // even when the visitor has no mail client configured. If the relay ever
  // refuses, we fall back to the old prefilled-email behaviour rather than
  // silently losing the lead.
  var RELAY = 'https://formsubmit.co/ajax/johnmurphy888@gmail.com';

  function fallbackMailto(d, subject, rows) {
    var body = rows.map(function (r) { return r[0] + ': ' + (d.get(r[1]) || ''); }).join('\n');
    return 'mailto:johnmurphy888@gmail.com?subject=' + encodeURIComponent(subject) +
           '&body=' + encodeURIComponent(body);
  }

  function wireLeadForm(selector, subjectFor, rows, msg) {
    var form = document.querySelector(selector);
    if (!form) return;
    var note = form.querySelector('.form-note');
    var btn = form.querySelector('button[type="submit"]');
    var original = note ? note.textContent : '';

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return; // bot filled the hidden field

      var d = new FormData(form);
      var subject = subjectFor(d);
      d.set('_subject', subject);

      if (note) note.textContent = msg.sending;
      if (btn) btn.disabled = true;

      fetch(RELAY, { method: 'POST', headers: { 'Accept': 'application/json' }, body: d })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (j) {
          // FormSubmit answers HTTP 200 with success:"false" when it refuses,
          // so the JSON payload decides -- not response.ok.
          if (String(j.success) !== 'true') throw new Error('relay declined');
          form.reset();
          if (btn) btn.disabled = false;
          if (note) note.textContent = msg.ok;
        })
        .catch(function () {
          if (btn) btn.disabled = false;
          if (note) note.textContent = msg.fail;
          window.location.href = fallbackMailto(d, subject, rows);
          setTimeout(function () { if (note) note.textContent = original; }, 8000);
        });
    });
  }

  wireLeadForm('#contact-form',
    function (d) { return 'Website inquiry — ' + (d.get('I want to') || 'General'); },
    [['Name', 'Name'], ['Phone', 'Phone'], ['Email', 'email'],
     ['I want to', 'I want to'], ['Message', 'Message']],
    { sending: 'Sending…',
      ok: 'Thank you — your message is on its way. John responds personally, usually the same day.',
      fail: 'Opening your email app instead… or call/text John at (518) 496-0703.' });

  wireLeadForm('#valuation-form',
    function (d) { return 'Home valuation request — ' + (d.get('Property Address') || ''); },
    [['Name', 'Name'], ['Phone', 'Phone'], ['Email', 'email'],
     ['Property Address', 'Property Address'], ['Selling Timeline', 'Selling Timeline']],
    { sending: 'Sending…',
      ok: 'Thank you — request received. John will follow up with your free valuation shortly.',
      fail: 'Opening your email app instead… or call/text John at (518) 496-0703.' });

})();
