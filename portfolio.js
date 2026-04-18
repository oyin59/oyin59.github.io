// portfolio.js — Single Page Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // 1. SMOOTH SCROLL FOR NAVIGATION
  // =============================================
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // 2. ACTIVE NAVIGATION HIGHLIGHTING
  // =============================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Call on load

  // =============================================
  // 3. SCROLL PROGRESS INDICATOR
  // =============================================
  const progressBar = document.querySelector('.progress-indicator');

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Call on load

  // =============================================
  // 4. SCROLL TO TOP BUTTON
  // =============================================
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrollButton() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollButton);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // =============================================
  // 5. INTERSECTION OBSERVER FOR ANIMATIONS
  // =============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards
  const cards = document.querySelectorAll('.card, .tech-card, .fact');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });

  // =============================================
  // 6. HEADER SCROLL EFFECT
  // =============================================
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      header.style.padding = '0.5rem 2rem';
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '1rem 2rem';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
  });

  // =============================================
  // 7. FORM SUBMISSION (Placeholder)
  // =============================================
  const contactForm = document.querySelector('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Here you would normally send to a backend
      console.log('Form submitted:', { name, email, message });

      // Show success message
      alert(`Thanks for reaching out, ${name}! I'll get back to you soon.`);

      // Reset form
      this.reset();
    });
  }

  // =============================================
  // 8. STAGGERED ANIMATION FOR SERVICE CARDS
  // =============================================
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // =============================================
  // 9. TYPING EFFECT (Updated Roles)
  // =============================================
  const wordsContainer = document.querySelector('.changing-words');
  if (wordsContainer) {
    const roles = ["Front-end Designer", "Creative Technologist", "UI/UX Enthusiast", "Problem Solver"];

    wordsContainer.innerHTML = '<span class="typing-role" aria-live="polite"></span>';
    const roleEl = wordsContainer.querySelector('.typing-role');

    const TYPE_SPEED = 70;
    const ERASE_SPEED = 40;
    const PAUSE_AFTER_TYPE = 2000;
    const PAUSE_AFTER_ERASE = 500;

    let roleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function tick() {
      const word = roles[roleIndex] || '';
      if (typing) {
        roleEl.textContent = word.slice(0, ++charIndex);
        if (charIndex === word.length) {
          typing = false;
          setTimeout(tick, PAUSE_AFTER_TYPE);
        } else {
          setTimeout(tick, TYPE_SPEED);
        }
      } else {
        roleEl.textContent = word.slice(0, --charIndex);
        if (charIndex === 0) {
          typing = true;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, PAUSE_AFTER_ERASE);
        } else {
          setTimeout(tick, ERASE_SPEED);
        }
      }
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      roleEl.textContent = roles[0] || '';
    } else {
      tick();
    }
  }

  // =============================================
  // 10. CURSOR GLOW EFFECT
  // =============================================
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // =============================================
  // 11. PORTFOLIO FILTERING
  // =============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const gallerySpotlight = document.querySelector('.gallery-spotlight');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active btn
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });

      // Handle spotlight visibility
      if (gallerySpotlight) {
        if (filter === 'all' || filter === '3d') {
          gallerySpotlight.style.display = 'grid';
          setTimeout(() => { gallerySpotlight.style.opacity = '1'; }, 10);
        } else {
          gallerySpotlight.style.opacity = '0';
          setTimeout(() => { gallerySpotlight.style.display = 'none'; }, 400);
        }
      }
    });
  });

  // =============================================
  // 12. CONSOLE EASTER EGG
  // =============================================
  console.log(
    '%c👋 Oyinlola is built differently.',
    'font-size: 20px; color: #5C9EFF; font-weight: bold;'
  );



  // =============================================
  // 13. THEME TOGGLE
  // =============================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const root = document.documentElement;

  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeIcon) { themeIcon.className = 'fas fa-sun'; }
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      if (themeIcon) { themeIcon.className = 'fas fa-moon'; }
      localStorage.setItem('theme', 'light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        applyTheme('light');
      } else {
        applyTheme('dark');
      }
    });
  }

});

// =============================================
// 13. MOBILE MENU TOGGLE (if needed)
// =============================================
// Uncomment if you want to add a hamburger menu for mobile
/*
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
menuToggle.style.display = 'none';

if (window.innerWidth <= 768) {
  const nav = document.querySelector('nav');
  nav.prepend(menuToggle);
  menuToggle.style.display = 'block';
  
  menuToggle.addEventListener('click', () => {
    nav.querySelector('ul').classList.toggle('mobile-open');
  });
}
*/