/* ========================================
   HELEM FRANCESCHINI — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL EFFECT ──
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');

  const handleScroll = () => {
    const heroBottom = hero.offsetHeight - 100;
    if (window.scrollY > heroBottom) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Fallback reveal check on scroll
    checkReveal();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Run once on load
  handleScroll();

  // ── MOBILE MENU ──
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── REVEAL ON SCROLL ──
  const revealElements = document.querySelectorAll(
    '.section-eyebrow, .section-title, .prose, .about-stats, .belief-card, ' +
    '.conviction, .area-card, .highlight, .cta-container, .contact-grid, ' +
    '.beliefs-grid, .convictions-list, .areas-grid, .highlights-list, ' +
    '.about-photo, .about-stats-row, ' +
    '.escritorio-content, .escritorio-image, .escritorio-title, ' +
    '.contact-split, .contact-question, .contact-action-btn'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  // Stagger delays for grid children
  const staggerParents = document.querySelectorAll('.beliefs-grid, .areas-grid, .convictions-list, .highlights-list');
  staggerParents.forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  // IntersectionObserver (primary method)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Scroll-based fallback reveal (catches edge cases)
  function checkReveal() {
    const windowBottom = window.scrollY + window.innerHeight;
    revealElements.forEach(el => {
      if (!el.classList.contains('visible')) {
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        if (windowBottom > elTop + 50) {
          el.classList.add('visible');
        }
      }
    });
  }

  // Run reveal check on load and after a short delay
  checkReveal();
  setTimeout(checkReveal, 300);
  setTimeout(checkReveal, 800);

  // ── CAREER HIGHLIGHTS TOGGLE ──
  const careerToggle = document.getElementById('careerToggle');
  const careerMore = document.getElementById('careerMore');

  if (careerToggle && careerMore) {
    careerToggle.addEventListener('click', function(e) {
      e.preventDefault();
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        careerMore.style.display = 'none';
        this.setAttribute('aria-expanded', 'false');
        this.querySelector('.career-toggle-text').textContent = 'Ver currículo completo';
      } else {
        careerMore.style.display = 'block';
        this.setAttribute('aria-expanded', 'true');
        this.querySelector('.career-toggle-text').textContent = 'Recolher';
      }
    });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
