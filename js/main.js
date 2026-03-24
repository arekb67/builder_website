/* ══════════════════════════════════════════════════════
   VERSO — Main JavaScript
   Mobile menu toggle, FAQ accordion, smooth scroll
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ── MOBILE MENU TOGGLE ──
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      // Toggle hamburger to X animation
      navToggle.classList.toggle('active');

      // Update aria attribute for accessibility
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close menu when clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // ── FAQ ACCORDION ──
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      // Close other open items
      faqItems.forEach(function (other) {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
        }
      });

      // Toggle this item
      item.classList.toggle('open');
    });
  });

  // ── ACTIVE NAV LINK ──
  // Highlight the current page in the navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  navAnchors.forEach(function (anchor) {
    const href = anchor.getAttribute('href');
    if (href === currentPage) {
      anchor.classList.add('active');
    }
  });

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
