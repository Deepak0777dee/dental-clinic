/* ============================================
   ANIMATIONS.JS — GSAP Text & Scroll Animations
   Stackly Dental Clinic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hero Animation ---------- */
  const heroTitle = document.querySelector('.hero-text h1');
  const heroText = document.querySelector('.hero-text p');
  const heroBtns = document.querySelector('.hero-btns');
  const heroImage = document.querySelector('.hero-image');
  const benefitCards = document.querySelector('.benefit-cards');

  if (heroTitle) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    tl.from(heroTitle, { y: 60, opacity: 0, duration: 1.1 }, 0.2)
      .from(heroText, { y: 40, opacity: 0 }, 0.5)
      .from(heroBtns, { y: 30, opacity: 0 }, 0.7);
    if (heroImage) {
      tl.from(heroImage, { x: 60, opacity: 0, duration: 1.2, ease: 'power4.out' }, 0.4);
    }
    if(benefitCards && benefitCards.children.length > 0) {
      tl.from(benefitCards.children, { y: 40, opacity: 0, stagger: 0.15 }, 0.8);
    }
  }

  /* ---------- Page Hero Animation ---------- */
  const pageHeroH1 = document.querySelector('.page-hero h1');
  const pageHeroP = document.querySelector('.page-hero p');
  const pageHeroLabel = document.querySelector('.page-hero .section-label');
  if (pageHeroH1) {
    const ptl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    if (pageHeroLabel) ptl.from(pageHeroLabel, { y: 20, opacity: 0, duration: 0.5 }, 0.2);
    ptl.from(pageHeroH1, { y: 40, opacity: 0 }, 0.35)
       .from(pageHeroP, { y: 20, opacity: 0 }, 0.55);
  }

  /* ---------- Scroll Reveals ---------- */
  const setupScrollReveal = (selector, animationProps) => {
    document.querySelectorAll(selector).forEach(el => {
      gsap.fromTo(el, 
        animationProps.from, 
        { scrollTrigger: { trigger: el, start: 'top 85%' }, ...animationProps.to, ease: 'power3.out' }
      );
    });
  };

  setupScrollReveal('.section-title', { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.9 } });
  setupScrollReveal('.section-subtitle', { from: { y: 25, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.8, delay: 0.15 } });
  setupScrollReveal('.section-label', { from: { x: -30, opacity: 0 }, to: { x: 0, opacity: 1, duration: 0.7 } });
  setupScrollReveal('.reveal', { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.8 } });
  setupScrollReveal('.reveal-left', { from: { x: -60, opacity: 0 }, to: { x: 0, opacity: 1, duration: 0.9 } });
  setupScrollReveal('.reveal-right', { from: { x: 60, opacity: 0 }, to: { x: 0, opacity: 1, duration: 0.9 } });

  /* ---------- Stagger Grid Children ---------- */
  const setupStaggerGrid = (selector, fromProps, toProps, stagger = 0.1) => {
    document.querySelectorAll(selector).forEach(grid => {
      if(grid.children.length === 0) return;
      gsap.fromTo(grid.children, fromProps, {
        scrollTrigger: { trigger: grid, start: 'top 85%' },
        ...toProps, stagger, ease: 'power3.out'
      });
    });
  };

  setupStaggerGrid('.stagger-children', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 });
  setupStaggerGrid('.stats-grid', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
  setupStaggerGrid('.tech-cards, .services-grid, .value-card, .team-member-card', 
                   { y: 50, opacity: 0, scale: 0.95 }, 
                   { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)' }, 0.12);
  setupStaggerGrid('.pricing-grid', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.15);
  setupStaggerGrid('.blog-cards', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.12);
  setupStaggerGrid('.faq-list', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.08);

  /* ---------- Split Grids ---------- */
  document.querySelectorAll('.split-grid, .features-split, .contact-grid').forEach(grid => {
    const left = grid.querySelector(':first-child');
    const right = grid.querySelector(':last-child');
    if (left) gsap.fromTo(left, { x: -50, opacity: 0 }, { scrollTrigger: { trigger: grid, start: 'top 80%' }, x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
    if (right) gsap.fromTo(right, { x: 50, opacity: 0 }, { scrollTrigger: { trigger: grid, start: 'top 80%' }, x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
  });

  /* ---------- Workflow Steps ---------- */
  document.querySelectorAll('.workflow-step').forEach((item, i) => {
    gsap.fromTo(item,
      { x: -40, opacity: 0 },
      { scrollTrigger: { trigger: item, start: 'top 85%' }, x: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: 'power3.out' }
    );
  });

  /* ---------- CTA Parallax ---------- */
  const cta = document.querySelector('.cta-section');
  if (cta) {
    gsap.fromTo(cta.querySelector('.cta-content'),
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: cta, start: 'top 80%' }, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    );
  }

  /* ---------- Testimonial ---------- */
  document.querySelectorAll('.testimonial-card').forEach(card => {
    gsap.fromTo(card,
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: card, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    );
  });

  /* ---------- Reference Design Animations ---------- */
  const heroRefTitle = document.querySelector('.hero-ref-title');
  const heroRefDesc = document.querySelector('.hero-ref-desc');
  const heroRefBtn = document.querySelector('.hero-ref-cta, .hero-ref-text .btn-pill-dark');
  const heroRefTag = document.querySelector('.hero-ref-tag');

  if (heroRefTitle) {
    [heroRefTag, heroRefTitle, heroRefDesc, heroRefBtn].forEach(el => {
      if (el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });
    const rTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (heroRefTag) rTl.fromTo(heroRefTag, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' }, 0.05);
    rTl.fromTo(heroRefTitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' }, 0.12);
    if (heroRefDesc) rTl.fromTo(heroRefDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' }, 0.22);
    if (heroRefBtn) {
      rTl.fromTo(heroRefBtn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' }, 0.32);
    }
  }

  // Stagger membership cards
  const memCards = document.querySelectorAll('.mem-card');
  if (memCards.length > 0) {
    gsap.from(memCards, {
      scrollTrigger: { trigger: '.membership-cards-grid', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out'
    });
  }

  // Stagger Triad cards
  const triadCards = document.querySelectorAll('.triad-card');
  if (triadCards.length > 0) {
    gsap.from(triadCards, {
      scrollTrigger: { trigger: '.triad-grid', start: 'top 85%' },
      y: 35, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
    });
  }

  // Stagger works cards
  const workCards = document.querySelectorAll('.work-item-card');
  if (workCards.length > 0) {
    gsap.from(workCards, {
      scrollTrigger: { trigger: '.works-cards-grid', start: 'top 85%' },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });
  }

  // Doctor Bubbles pop animation
  const docBubbles = document.querySelectorAll('.bubble-mosaic-container .doc-bubble, .bubble-mosaic-container .bubble-blank');
  if (docBubbles.length > 0) {
    gsap.from(docBubbles, {
      scrollTrigger: { trigger: '.bubble-mosaic-container', start: 'top 85%' },
      scale: 0.5, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.4)'
    });
  }

  // Personalized Care cards
  const persCards = document.querySelectorAll('.personalized-card');
  if (persCards.length > 0) {
    gsap.from(persCards, {
      scrollTrigger: { trigger: '.personalized-cards-grid', start: 'top 85%' },
      y: 45, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });
  }

  // Testimonial Quote
  const quote = document.querySelector('.testimonial-huge-quote');
  if (quote) {
    gsap.from(quote, {
      scrollTrigger: { trigger: quote, start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.9, ease: 'power3.out'
    });
  }

  // Patient Ribbon
  const ribbonImgs = document.querySelectorAll('.patient-ribbon img');
  if (ribbonImgs.length > 0) {
    gsap.from(ribbonImgs, {
      scrollTrigger: { trigger: '.patient-ribbon', start: 'top 90%' },
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });
  }
});

