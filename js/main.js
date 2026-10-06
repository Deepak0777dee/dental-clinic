/* ============================================
   MAIN.JS — Stackly Dental Clinic
   Navigation, Mobile Menu, Scroll,
   Stat Counters, Form Validation, FAQ
   ============================================ */

/* ---------- Page Loader ---------- */
const hidePageLoader = () => {
  const loader = document.getElementById('page-loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => {
      try { loader.style.display = 'none'; } catch (e) {}
    }, 600);
  }
};

if (document.readyState === 'complete') {
  setTimeout(hidePageLoader, 200);
} else {
  window.addEventListener('load', () => setTimeout(hidePageLoader, 300));
  document.addEventListener('DOMContentLoaded', () => setTimeout(hidePageLoader, 600));
  // Ultimate safety fallback so loader never hangs
  setTimeout(hidePageLoader, 1500);
}

const initApp = () => {


  /* ---------- Header Scroll ---------- */
  const header = document.getElementById('mainHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile Menu ---------- */
  const hamBtn = document.getElementById('hamBtn');
  if (hamBtn) {
    hamBtn.addEventListener('click', () => {
      document.getElementById('mainHeader').classList.toggle('menu-open');
    });
  }
  const mobileOverlay = document.querySelector('.mobile-overlay');
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      document.getElementById('mainHeader').classList.remove('menu-open');
    });
  }
  document.querySelectorAll('.mobile-sidebar .header-nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mainHeader').classList.remove('menu-open');
    });
  });

  /* ---------- Stat Counter ---------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-count], .big-num[data-count]');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---------- Feature Accordion ---------- */
  document.querySelectorAll('.feature-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.feature-accordion-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.feature-accordion-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---------- Dashboard: Sidebar Toggle & Mobile Backdrop ---------- */
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarClose = document.getElementById('sidebarClose');

  let backdrop = document.querySelector('.sidebar-backdrop');
  if (!backdrop && sidebar) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !e.target.closest('#mobileMenuBtn')) {
        closeSidebar();
      }
    }
  });

  /* ---------- Active Sidebar & Nav Links ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-link, .header-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---------- Dynamic Common Footer (All Pages) ---------- */
  const footerEls = document.querySelectorAll('.footer, .footer-ref');
  footerEls.forEach(footerEl => {
    if (!footerEl.innerHTML.trim() || footerEl.classList.contains('footer')) {
      footerEl.className = 'footer-ref';
      footerEl.innerHTML = `
        <div class="footer-ref-container">
          <div class="footer-ref-top">
            <a href="index.html" class="footer-ref-logo">
              <img src="images/logo-stackly.webp" alt="Stackly Dental" style="filter: brightness(0);" />
            </a>
            <div class="footer-ref-top-contacts">
              <a href="tel:+917010792745" class="footer-ref-top-pill" title="Call Clinic Directly">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                <span>+91 70107 92745</span>
              </a>
              <a href="mailto:hello@stacklydental.com" class="footer-ref-top-pill footer-ref-email" title="Send Email">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>hello@stacklydental.com</span>
              </a>
              <a href="contact.html" class="btn-pill-dark" style="padding: 0.52rem 1.35rem; font-size: 0.84rem;">
                Contact Us <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div class="footer-ref-grid">
            <div class="footer-ref-brand">
              <p>Empowering your smile journey with gentle, innovative, and reliable dental care.</p>
              <a href="signup.html" class="btn-pill-dark" style="padding: 0.65rem 1.6rem; font-size: 0.88rem;">
                Book Appointment <span>&rarr;</span>
              </a>
            </div>

            <div class="footer-ref-col">
              <h4>Navigations</h4>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services & Treatments</a></li>
                <li><a href="pricing.html">Pricing & Plans</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>
            </div>

            <div class="footer-ref-col">
              <h4>Treatments</h4>
              <ul>
                <li><a href="services.html#cleaning">Revitalized Cleaning</a></li>
                <li><a href="services.html#whitening">Teeth Whitening</a></li>
                <li><a href="services.html#implants">Dental Implants</a></li>
                <li><a href="services.html#orthodontics">Orthodontics & Aligners</a></li>
                <li><a href="contact.html#emergency">Emergency Dental Care</a></li>
              </ul>
            </div>

            <div class="footer-ref-col">
              <h4>Contact & Location</h4>
              <ul class="footer-contact-list">
                <li class="footer-contact-item">
                  <div class="footer-contact-icon">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  </div>
                  <div>
                    <a href="tel:+917010792745" class="footer-contact-link" title="Call Main Clinic">
                      <strong>+91 70107 92745</strong>
                      <small>Call Direct / WhatsApp</small>
                    </a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <div class="footer-contact-icon">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <a href="mailto:hello@stacklydental.com" class="footer-contact-link" title="Email Consultation">
                      <strong>hello@stacklydental.com</strong>
                      <small>Online Enquiries & Support</small>
                    </a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <div class="footer-contact-icon">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <a href="https://maps.google.com/?q=MMR+Complex+Chinna+Thirupathi+Salem+Tamil+Nadu+636008" target="_blank" rel="noopener" class="footer-contact-link" title="Open Clinic in Google Maps">
                      <strong>MMR Complex, Chinna Thirupathi</strong>
                      <small>Salem, Tamil Nadu 636008 <span class="nav-hint-arrow">&nearr;</span></small>
                    </a>
                  </div>
                </li>
                <li class="footer-contact-item">
                  <div class="footer-contact-icon">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <a href="contact.html#hours" class="footer-contact-link" title="Clinic Schedule">
                      <strong>Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM</strong>
                      <span class="emergency-badge"><span class="emergency-pulse-dot"></span> 24/7 Emergency Care</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div class="footer-ref-col">
              <h4>Subscribe newsletter</h4>
              <p style="font-size: 0.92rem; color: #586465; margin-bottom: 0.75rem;">Stay updated with the latest dental tips and member offers!</p>
              <form onsubmit="event.preventDefault(); alert('Thank you for subscribing to Stackly Dental!');" class="newsletter-pill-input">
                <input type="email" placeholder="Email address" required />
                <button type="submit" aria-label="Subscribe">&rarr;</button>
              </form>
              <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem;">
                <a href="contact.html" class="btn btn-outline btn-sm" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">Ask a Question</a>
              </div>
            </div>
          </div>

          <div class="footer-ref-bottom">
            <p>Copyright &copy; Stackly&reg; 2026. All rights reserved.</p>
            <div class="footer-ref-socials">
              <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            </div>
          </div>
        </div>
      `;
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ---------- Form Validation ---------- */
function validateField(input) {
  const group = input.closest('.form-group');
  const errorDiv = group ? group.querySelector('.form-error') : null;
  let message = '';

  if (input.required && !input.value.trim()) {
    message = 'This field is required';
  } else if (input.type === 'email' && input.value.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(input.value.trim())) {
      message = 'Please enter a valid email';
    }
  } else if (input.type === 'tel' && input.value.trim()) {
    if (!/^\d{10}$/.test(input.value.replace(/\s/g, ''))) {
      message = 'Phone number must be 10 digits';
    }
  } else if (input.pattern && input.value.trim()) {
    const re = new RegExp('^' + input.pattern + '$');
    if (!re.test(input.value.trim())) {
      message = input.title || 'Invalid format';
    }
  } else if (input.minLength > 0 && input.value.length < input.minLength) {
    message = `Minimum ${input.minLength} characters required`;
  }

  if (errorDiv) errorDiv.textContent = message;
  if (message) {
    input.style.borderColor = 'var(--danger)';
    return false;
  } else {
    input.style.borderColor = '';
    return true;
  }
}

/* ---------- Password Toggle ---------- */
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.password-toggle');
  if (!toggle) return;
  const wrapper = toggle.closest('.password-wrapper');
  const input = wrapper ? wrapper.querySelector('input') : null;
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
});

/* ---------- Redirect Unused / Placeholder & Filter Actions to 404 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const isBackoffice = Boolean(document.querySelector('.dashboard-main, .dashboard-sidebar'));

  document.body.addEventListener('click', (e) => {
    const el = e.target.closest('button, a');
    if (!el) return;

    if (el.tagName === 'A') {
      const href = el.getAttribute('href');
      if (!href || href === '#' || href === '') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    } else if (el.tagName === 'BUTTON') {
      // In backoffice pages, all unused, placeholder, and filter buttons navigate to 404
      // while preserving mobileMenuBtn, sidebarClose, and sign out
      if (isBackoffice) {
        if (el.id === 'mobileMenuBtn' || el.id === 'sidebarClose' || el.classList.contains('mobile-menu-btn') || el.classList.contains('sidebar-close')) {
          return;
        }
        if (el.closest('.sidebar-footer') || (el.getAttribute('onclick') && el.getAttribute('onclick').includes('authLogout'))) {
          return;
        }
        // If it's inside dashboard-main, filter-bar, or is a filter-btn
        if (el.closest('.dashboard-main') || el.closest('.filter-bar') || el.classList.contains('filter-btn')) {
          e.preventDefault();
          window.location.href = '404.html';
          return;
        }
      }

      const hasOnclick = el.hasAttribute('onclick');
      const hasId = el.hasAttribute('id');
      const isSubmit = el.getAttribute('type') === 'submit' || (el.closest('form') && !el.hasAttribute('type'));
      const functionalClasses = ['ham-btn', 'mobile-close', 'sidebar-close', 'faq-question', 'password-toggle', 'mobile-menu-btn', 'role-option', 'feature-accordion-btn'];
      const hasFunctionalClass = functionalClasses.some(cls => el.classList.contains(cls));

      if (!hasOnclick && !isSubmit && !hasFunctionalClass && !hasId) {
        e.preventDefault();
        window.location.href = '404.html';
      }
    }
  });

  document.body.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT') {
      // Any filter dropdown in backoffice should navigate to 404
      if (isBackoffice && (e.target.classList.contains('filter-select') || e.target.closest('.filter-bar, .dashboard-topbar'))) {
        window.location.href = '404.html';
        return;
      }
      if (!e.target.classList.contains('filter-select') && !e.target.id && !e.target.name) {
        window.location.href = '404.html';
      }
    }
  });
});
