// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
const navScrim = document.querySelector('.nav-scrim');

function closeNav(){
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navScrim.classList.remove('show');
  document.body.classList.remove('nav-open');
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navScrim.classList.toggle('show', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });
}
if (navScrim) navScrim.addEventListener('click', closeNav);

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 880) closeNav();
  });
});

// Mobile dropdown accordions
document.querySelectorAll('.has-dropdown > a').forEach(a => {
  a.addEventListener('click', (e) => {
    if (window.innerWidth <= 880) {
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    }
  });
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Animated stat counters
const stats = document.querySelectorAll('.stat__num');
const animateStat = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if (stats.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach(stat => observer.observe(stat));
}
