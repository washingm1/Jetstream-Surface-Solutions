/* ==============================================
   JETSTREAM — script.js
   - Mobile hamburger menu
   - Before/After image sliders
   - Contact form submission
   - Smooth scroll & scroll reveal
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });


  // ============================================
  // BEFORE / AFTER SLIDERS
  // ============================================
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const handle  = slider.querySelector('.ba-slider__handle');
    const before  = slider.querySelector('.ba-slider__before');
    const after = slider.querySelector('.ba-slider__after');
    let dragging  = false;

    function setPos(clientX) {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      handle.style.setProperty('--pos', `${pct}%`);
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
           after.style.clipPath  = `inset(0 0 0 ${pct}%)`;    
    }

    const knob = handle.querySelector('.ba-slider__knob');

    knob.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      dragging = true;
      knob.setPointerCapture(e.pointerId);
    });
    knob.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
    knob.addEventListener('pointerup',   () => { dragging = false; });
    knob.addEventListener('pointercancel', () => { dragging = false; });

    slider.addEventListener('click', (e) => { setPos(e.clientX); });
  });


  // ============================================
  // CONTACT FORM
  // ============================================
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        successMsg.classList.add('visible');
        form.reset();
        btn.textContent = 'Schedule Now!';
        btn.disabled = false;
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
      }, 1200);
    });
  }


  // ============================================
  // SMOOTH SCROLL (offset for sticky nav)
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.querySelector('.navbar').offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: 'smooth' });
    });
  });


  // ============================================
  // SCROLL REVEAL
  // ============================================
  const targets = document.querySelectorAll('.service-card, .who-we-are__inner, .ba-slider, .contact-form-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  document.head.insertAdjacentHTML('beforeend', `<style>.revealed { opacity: 1 !important; transform: translateY(0) !important; }</style>`);

});