/* ============================================================
   PORTFOLIO — INTERACTIONS
   ============================================================ */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---- AUTO-YEAR ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- NAV: SCROLL STATE + PROGRESS BAR ----
const navHeader = document.getElementById('nav-header');
const progressEl = document.getElementById('scroll-progress');
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  navHeader.classList.toggle('scrolled', y > 20);

  if (progressEl) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressEl.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }

  updateActiveNav();
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

// ---- NAV: MOBILE TOGGLE ----
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // Reset if resized up to desktop while open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('open')) closeMenu();
  });
}

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

function updateActiveNav() {
  const scrollY = window.scrollY + 140;

  let currentSection = '';
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentSection = section.id;
    }
  });

  navLinkEls.forEach(link => {
    link.classList.toggle('nav-link--active', link.getAttribute('href') === '#' + currentSection);
  });
}

onScroll(); // Initial check

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = href === '#' ? document.body : document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = href === '#home' || href === '#' ? 0 : target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    // If Formspree is not configured, show a fallback message
    const action = contactForm.getAttribute('action') || '';
    if (action.includes('YOUR_FORMSPREE_ID')) {
      e.preventDefault();
      showFormMessage('⚠️ Form not yet configured. Please reach out directly via email.', 'warning');
      return;
    }

    // Formspree handles submission — we just show a success message
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        showFormMessage('Message sent! I\'ll be in touch within 24 hours.', 'success');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (err) {
      showFormMessage('Something went wrong. Please email me directly.', 'error');
    } finally {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

function showFormMessage(text, type) {
  // Remove existing message
  const existing = document.querySelector('.form-message');
  if (existing) existing.remove();

  const el = document.createElement('p');
  el.className = 'form-message';
  el.setAttribute('role', 'status');
  el.textContent = text;
  el.style.cssText = `
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    margin-top: 0.5rem;
    text-align: center;
    background-color: ${type === 'success' ? 'rgba(34,197,94,0.12)' : type === 'error' ? 'rgba(239,68,68,0.12)' : 'rgba(234,179,8,0.12)'};
    color: ${type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#fbbf24'};
    border: 1px solid ${type === 'success' ? 'rgba(34,197,94,0.25)' : type === 'error' ? 'rgba(239,68,68,0.25)' : 'rgba(234,179,8,0.25)'};
  `;

  contactForm.appendChild(el);

  // Auto-remove after 8 seconds
  setTimeout(() => {
    if (el.parentNode) {
      el.style.transition = 'opacity 0.4s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 400);
    }
  }, 8000);
}

// ---- REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(el => io.observe(el));
}

// ---- SPOTLIGHT: cursor-following glow on cards ----
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.spotlight').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
}

// ---- HERO: gentle parallax on the image collage ----
const heroGrid = document.getElementById('hero-grid');
const hero = document.getElementById('home');

if (heroGrid && hero && finePointer && !prefersReducedMotion) {
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroGrid.style.setProperty('--px', `${(x * -14).toFixed(1)}px`);
    heroGrid.style.setProperty('--py', `${(y * -14).toFixed(1)}px`);
  });

  hero.addEventListener('pointerleave', () => {
    heroGrid.style.setProperty('--px', '0px');
    heroGrid.style.setProperty('--py', '0px');
  });
}
