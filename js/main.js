const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const cursorDot = $('.cursor-dot');
const cursorRing = $('.cursor-ring');

window.addEventListener('mousemove', e => {
  if (cursorDot) {
    cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    cursorRing.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
  }
  const x = (e.clientX / innerWidth - .5) * 2;
  const y = (e.clientY / innerHeight - .5) * 2;
  document.documentElement.style.setProperty('--mx', x);
  document.documentElement.style.setProperty('--my', y);
  const orb1 = $('.hero-orb-one'), orb2 = $('.hero-orb-two');
  if (orb1) orb1.style.transform = `translate(${x * -28}px, ${y * -18}px)`;
  if (orb2) orb2.style.transform = `translate(${x * 45}px, ${y * 30}px)`;
});

$$('a, button, .project-visual, .service').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing?.classList.add('active'));
  el.addEventListener('mouseleave', () => cursorRing?.classList.remove('active'));
});

const menuBtn = $('.menu-toggle');
const navLinks = $('.nav-links');
menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
$$('.reveal').forEach(el => observer.observe(el));

$$('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .18;
    const y = (e.clientY - r.top - r.height/2) * .18;
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

const hero = $('.hero');
window.addEventListener('scroll', () => {
  const y = Math.min(scrollY * .12, 90);
  if (hero) hero.querySelector('.hero-grid').style.transform =
    `perspective(600px) rotateX(55deg) scale(1.5) translateY(${y}px)`;
}, {passive:true});
