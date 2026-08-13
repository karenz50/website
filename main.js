// Nav scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Intersection Observer — fade in timeline items, cards, portfolio cards
const fadeEls = document.querySelectorAll('.timeline-item, .card, .portfolio-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger siblings
      const siblings = [...e.target.parentElement.children];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), idx * 80);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => fadeObserver.observe(el));

// Generic reveal-on-scroll — applies the same fade/slide-up animation
// to key elements across every page (hero cards, section titles, grids,
// project page content, etc.) so it replays on every navigation/reload.
const revealSelector = [
  '.hero-stack',
  '.intro-heading',
  '.intro-text',
  '.intro-cta',
  '.section-title',
  '.tool-category',
  '.skill-tile',
  '.contact-item'
].join(', ');
const revealEls = document.querySelectorAll(revealSelector);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), idx * 70);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Some browsers restore a page from back/forward cache instead of reloading
// it (e.g. hitting the back button), which skips this script entirely and
// would leave things exactly as they were — replay the animations in that case.
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  document.querySelectorAll('.reveal.visible').forEach(el => el.classList.remove('visible'));
  document.querySelectorAll('.timeline-item.visible, .card.visible').forEach(el => el.classList.remove('visible'));
  revealEls.forEach(el => revealObserver.observe(el));
  fadeEls.forEach(el => fadeObserver.observe(el));
});

// Contact form mock submit
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    btn.textContent = 'Send Message';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  }, 1200);
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => highlightObserver.observe(s));
