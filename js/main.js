// ============================================================
// DATING RESET — dateable.nextroutine.com
// Navigation, scroll animations, email capture
// ============================================================

(function() {
  'use strict';

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-triggered fade-ups
  const faders = document.querySelectorAll('.fade-up');
  if (faders.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = 'running';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    faders.forEach(f => {
      f.style.animationPlayState = 'paused';
      obs.observe(f);
    });
  }

  // Email capture (placeholder — connect to Beehiiv/Kit)
  const emailInput = document.getElementById('email-input');
  const emailSubmit = document.getElementById('email-submit');
  if (emailSubmit && emailInput) {
    emailSubmit.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.style.borderColor = '#C4544A';
        emailInput.focus();
        return;
      }
      // TODO: Connect to newsletter provider
      // Example Beehiiv embed or API call goes here
      emailSubmit.textContent = 'You\'re in ✓';
      emailSubmit.disabled = true;
      emailSubmit.style.opacity = '0.7';
      emailInput.disabled = true;
      console.log('Email captured:', email);
    });

    emailInput.addEventListener('input', () => {
      emailInput.style.borderColor = '';
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
