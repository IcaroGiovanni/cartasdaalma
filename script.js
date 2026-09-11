/* ============================================
   CARTAS DA ALMA — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAVBAR SCROLL ---
  const navbar = document.getElementById('navbar');
  const announcementBar = document.getElementById('announcementBar');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > 400 && scrollY > lastScroll) {
      navbar.classList.add('hidden-bar');
    } else {
      navbar.classList.remove('hidden-bar');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- MOBILE NAV TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- SCROLL REVEAL ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- PARALLAX CLOUDS ---
  const cloudBgs = document.querySelectorAll('.cloud-bg');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    cloudBgs.forEach(cloud => {
      const parent = cloud.parentElement;
      const rect = parent.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) {
        const speed = 0.03;
        const offset = (rect.top / window.innerHeight) * 50 * speed;
        cloud.style.transform = `translateY(${offset * 100}px)`;
      }
    });
  }, { passive: true });

  // --- BUTTON HOVER RIPPLE ---
  document.querySelectorAll('.btn, .nav-btn, .mockup-letter-btn, .phone-card-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;width:0;height:0;border-radius:50%;
        background:rgba(255,255,255,0.2);
        transform:translate(-50%,-50%);
        left:${x}px;top:${y}px;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      ripple.animate([
        { width: '0', height: '0', opacity: 0.6 },
        { width: '200px', height: '200px', opacity: 0 }
      ], { duration: 600, easing: 'ease-out' });
      setTimeout(() => ripple.remove(), 600);
    });
  });

});
