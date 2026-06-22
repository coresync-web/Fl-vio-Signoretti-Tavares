document.documentElement.classList.add('animations-ready');

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Intersection Observer for scroll animations
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children in grids
          const delay = entry.target.closest('.cards-grid, .diferenciais-grid')
            ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
            : 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  : null;

animatedEls.forEach(el => {
  if (observer) {
    observer.observe(el);
  } else {
    el.classList.add('visible');
  }
});

// Also animate service/dif cards individually
document.querySelectorAll('.card--service, .dif-card').forEach(card => {
  card.setAttribute('data-animate', 'fade-up');
  if (observer) {
    observer.observe(card);
  } else {
    card.classList.add('visible');
  }
});

setTimeout(() => {
  document.querySelectorAll('[data-animate]:not(.visible)').forEach(el => {
    el.classList.add('visible');
  });
}, 900);

// Contact form - build WhatsApp message
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const area = document.getElementById('area').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    const text = [
      'Olá, vim pelo site. Gostaria de tirar uma dúvida.',
      `*Nome:* ${nome}`,
      telefone ? `*Telefone:* ${telefone}` : '',
      area ? `*Area de interesse:* ${area}` : '',
      mensagem ? `*Mensagem:* ${mensagem}` : '',
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/5533998254594?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

if ('IntersectionObserver' in window) {
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
}
