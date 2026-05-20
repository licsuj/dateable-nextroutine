// ============================================================
// DATING RESET — dateable.nextroutine.com
// Navigation, scroll animations, email capture for free tier
// ============================================================

(function() {
  'use strict';

  // Nav scroll shadow
  const nav = document.getElementById('nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-triggered fade-in (matched to landing page)
  const els = document.querySelectorAll('.fade-in');
  if (els.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  } else {
    els.forEach(el => el.classList.add('visible'));
  }

  // Free tier email capture (inside pack card)
  const emailInput = document.getElementById('email-input');
  const emailSubmit = document.getElementById('email-submit');
  if (emailSubmit && emailInput) {
    emailSubmit.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.style.borderColor = '#B5544A';
        emailInput.focus();
        return;
      }
      // TODO: Connect to Beehiiv or payment provider for free tier delivery
      emailSubmit.textContent = 'Check your inbox ✓';
      emailSubmit.disabled = true;
      emailSubmit.style.opacity = '0.6';
      emailInput.disabled = true;
    });
    emailInput.addEventListener('input', () => { emailInput.style.borderColor = ''; });
    emailInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') emailSubmit.click(); });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();
