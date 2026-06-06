'use strict';

// ── Year in footer ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close nav when a link is clicked
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.style.overflow = '';
      navToggle.focus();
    }
  });

  // Close nav when clicking outside
  document.addEventListener('click', e => {
    if (
      primaryNav.classList.contains('is-open') &&
      !primaryNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

// ── Contact form validation & honeypot ──
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields
    const hp = form.querySelector('[name="website"]');
    if (hp && hp.value) return; // silently drop

    let valid = true;

    const fields = [
      { id: 'name',    errorId: 'name-error',    msg: 'Please enter your name.' },
      { id: 'email',   errorId: 'email-error',   msg: 'Please enter a valid email address.' },
      { id: 'message', errorId: 'message-error', msg: 'Please enter a message.' },
    ];

    fields.forEach(({ id, errorId, msg }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(errorId);
      if (!input || !errorEl) return;

      const isEmpty = !input.value.trim();
      const isEmailInvalid = id === 'email' && !isEmpty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());

      if (isEmpty || isEmailInvalid) {
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = isEmailInvalid ? 'Please enter a valid email address.' : msg;
        valid = false;
      } else {
        input.setAttribute('aria-invalid', 'false');
        errorEl.textContent = '';
      }
    });

    if (!valid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // In production wire this to a backend / form service (e.g. Formspree, Netlify Forms).
    // For now we show a success message and reset.
    if (successMsg) {
      successMsg.hidden = false;
      successMsg.focus();
    }
    form.reset();
  });

  // Clear error on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.setAttribute('aria-invalid', 'false');
      const errorEl = document.getElementById(el.id + '-error');
      if (errorEl) errorEl.textContent = '';
    });
  });
}

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id], div[id="home"]');
const navLinks  = document.querySelectorAll('.primary-nav a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
