// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Intersection Observer for scroll animations
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in grids
      const delay = entry.target.closest('.cards-grid, .diferenciais-grid')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => observer.observe(el));

// Also animate service/dif cards individually
document.querySelectorAll('.card--service, .dif-card').forEach(card => {
  card.setAttribute('data-animate', 'fade-up');
  observer.observe(card);
});

// Contact form — build WhatsApp message
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const area = document.getElementById('area').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  const text = [
    `Olá! Vim pelo site e gostaria de uma consulta.`,
    `*Nome:* ${nome}`,
    telefone ? `*Telefone:* ${telefone}` : '',
    area ? `*Área de interesse:* ${area}` : '',
    mensagem ? `*Mensagem:* ${mensagem}` : '',
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/55?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = '#cc1a1a';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
