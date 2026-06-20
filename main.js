// Nav scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

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

// Skill bars animate on scroll
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animated');
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

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
