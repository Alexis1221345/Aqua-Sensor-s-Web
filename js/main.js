/* =========================================================
   AQUA SENSOR'S — JavaScript principal
   ========================================================= */

/* ── Navbar scroll ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ── Mobile menu ────────────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');
const navClose  = document.querySelector('.nav-mobile-close');

hamburger?.addEventListener('click', () => navMobile?.classList.add('open'));
navClose?.addEventListener('click',  () => navMobile?.classList.remove('open'));
navMobile?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navMobile.classList.remove('open'))
);

/* ── Scroll animation (Intersection Observer) ───────────── */
const animEls = document.querySelectorAll('[data-anim]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => observer.observe(el));

/* ── Smooth active link highlight ───────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--accent)' : '';
  });
});

/* ── Gauge animation on scroll ──────────────────────────── */
function animateGauges() {
  document.querySelectorAll('.gauge-needle').forEach(needle => {
    const targetAngle = parseFloat(needle.dataset.angle || 0);
    needle.style.transition = 'transform 1.4s cubic-bezier(.4,0,.2,1)';
    needle.style.transform = `rotate(${targetAngle}deg)`;
  });
}
const appSection = document.getElementById('app');
if (appSection) {
  const gObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateGauges(); gObs.disconnect(); }
  }, { threshold: 0.2 });
  gObs.observe(appSection);
}

/* ── Animated counter ───────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + suffix;
  }, 24);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.problem-stat-bar').forEach(el => counterObs.observe(el));

/* ── Contact form ───────────────────────────────────────── */
const form = document.getElementById('contact-form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.textContent = '✓ Mensaje enviado';
  btn.style.background = 'linear-gradient(135deg,#4CAF50,#2D8FAD)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3500);
});

/* ── Parallax orbs subtle ───────────────────────────────── */
document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 20;
  const my = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = i === 0 ? 1 : -0.6;
    orb.style.transform = `translate(${mx*factor}px, ${my*factor}px)`;
  });
});
