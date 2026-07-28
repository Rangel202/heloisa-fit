document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- menu ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => nav.classList.toggle('open'));

nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => nav.classList.remove('open'))
);

/* ---------- barra de progresso ---------- */
const progress = document.getElementById('progress');
let ticking = false;

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? (window.scrollY / max) * 100 + '%' : '0%';
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });

onScroll();

/* ---------- revelação ao rolar ---------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  items.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.mini').forEach((el, i) => {
    el.style.transitionDelay = (i * 90) + 'ms';
  });
  document.querySelectorAll('.price').forEach((el, i) => {
    el.style.transitionDelay = (i * 110) + 'ms';
  });

  items.forEach(el => io.observe(el));
}
