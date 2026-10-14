(() => {
  const body = document.body;
  const menu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function setTheme(theme) {
    const isLight = theme === 'light';
    body.classList.toggle('light-mode', isLight);
    if (themeToggle) {
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  const savedTheme = (() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (error) {
      return 'dark';
    }
  })();

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      hamburger.classList.toggle('active', !expanded);
      menu.classList.toggle('show', !expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const activateLink = () => {
    const top = window.scrollY + 150;
    let activeId = 'home';

    sections.forEach((section) => {
      if (section.offsetTop <= top) {
        activeId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  };

  activateLink();
  window.addEventListener('scroll', activateLink, { passive: true });
})();
