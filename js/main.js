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
    navToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    primaryNav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
    const mainEl = document.getElementById('main-content');
    const footerEl = document.querySelector('footer');
    const logoLink = document.querySelector('.logo');
    if (!isOpen) {
      if (mainEl) mainEl.inert = true;
      if (footerEl) footerEl.inert = true;
      if (logoLink) logoLink.inert = true;
      const firstLink = primaryNav.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      if (mainEl) mainEl.inert = false;
      if (footerEl) footerEl.inert = false;
      if (logoLink) logoLink.inert = false;
    }
  });

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    primaryNav.classList.remove('is-open');
    document.body.style.overflow = '';
    const mainEl = document.getElementById('main-content');
    const footerEl = document.querySelector('footer');
    const logoLink = document.querySelector('.logo');
    if (mainEl) mainEl.inert = false;
    if (footerEl) footerEl.inert = false;
    if (logoLink) logoLink.inert = false;
  }

  // Close nav when a link is clicked
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
      closeNav();
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
      closeNav();
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
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submit to Formspree via fetch
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        form.reset();
        if (successMsg) {
          successMsg.textContent = 'Your message has been sent! We will get back to you within 48 hours. Thank you for reaching out to Cookie\'s Cuddle Farm.';
          successMsg.removeAttribute('hidden');
          successMsg.focus();
        }
      } else {
        if (successMsg) {
          successMsg.textContent = 'There was a problem sending your message. Please email us directly at info@cookiescuddlefarm.org';
          successMsg.removeAttribute('hidden');
          successMsg.focus();
        }
      }
    }).catch(() => {
      if (successMsg) {
        successMsg.textContent = 'There was a problem sending your message. Please email us directly at info@cookiescuddlefarm.org';
        successMsg.removeAttribute('hidden');
        successMsg.focus();
      }
    });
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

