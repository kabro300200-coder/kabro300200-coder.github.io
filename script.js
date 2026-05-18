// ============ MOBILE NAVIGATION ============

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============ SMOOTH SCROLL ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navMenu) navMenu.classList.remove('active');
        }
    });
});

// ============ ACTIVE NAVIGATION LINK ============

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .contact-card, .stat-card, .skill-category, .glass-card, .identity-block'
);
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
});

// ============ PARALLAX EFFECT ============

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPosition = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                const glows = hero.querySelectorAll('.hero-glow');
                glows.forEach((glow, index) => {
                    glow.style.transform = `translateY(${scrollPosition * (0.3 + index * 0.1)}px)`;
                });
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// ============ RIPPLE EFFECT ON BUTTONS ============

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============ COUNT UP ANIMATION FOR STATS ============

function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
    }, 16);
}

// Trigger count-up when visible
const statNumbers = document.querySelectorAll('.stat-number, .highlight-number');
let hasTriggered = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered) {
            statNumbers.forEach(number => {
                const text = number.textContent;
                const target = parseInt(text);
                if (!isNaN(target)) {
                    countUp(number, target);
                }
            });
            hasTriggered = true;
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statNumbers[0]) {
    const closestCard = statNumbers[0].closest('.stat-card') || statNumbers[0].closest('.highlight-item');
    if (closestCard) {
        statsObserver.observe(closestCard);
    }
}

// ============ THEME TOGGLE (Dark/Light Mode) ============

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('light-mode');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    themeToggle.style.transform = 'rotate(180deg)';
    
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ============ ELEMENT REVEAL ON SCROLL ============

const revealElements = document.querySelectorAll('h2, h3, p, ul, .section-title');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ============ MOUSE MOVE EFFECT ============

document.addEventListener('mousemove', (e) => {
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            btn.style.setProperty('--mouse-x', x + 'px');
            btn.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// ============ PERFORMANCE MONITORING ============

// Debounce function for optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    
    // Update progress indicator if it exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', debounce(updateScrollProgress, 50));

// ============ CONSOLE MESSAGES ============

console.clear();
console.log('%c⚖️ Kamran Abro Adv - Premium Professional Portfolio', 'color: #d4af37; font-size: 18px; font-weight: bold; text-shadow: 0 0 15px rgba(212,175,55,0.6);');
console.log('%c═════════════════════════════════════════════════════', 'color: #d4af37; font-size: 12px;');
console.log('%c🎓 Professional Advocate | Legal Educator | Tech Innovator', 'color: #b0b9c6; font-size: 12px; font-weight: 600;');
console.log('%c═════════════════════════════════════════════════════', 'color: #d4af37; font-size: 12px;');
console.log('%c📞 Phone: +92 335 7300200', 'color: #c0c0c0; font-size: 11px;');
console.log('%c📧 Email: kabro300200@gmail.com', 'color: #c0c0c0; font-size: 11px;');
console.log('%c💻 GitHub: github.com/kabro300200-coder', 'color: #c0c0c0; font-size: 11px;');
console.log('%c═════════════════════════════════════════════════════', 'color: #d4af37; font-size: 12px;');
console.log('%c✨ Luxury Law Firm + Modern Tech Startup Aesthetic', 'color: #d4af37; font-size: 12px; font-style: italic;');
console.log('%c🚀 Building the Future of Legal Technology & Education', 'color: #34d399; font-size: 12px; font-style: italic;');

// ============ PAGE LOAD OPTIMIZATION ============

window.addEventListener('load', () => {
    console.log('%c✅ Premium Portfolio Loaded Successfully!', 'color: #34d399; font-size: 12px; font-weight: bold;');
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Preload critical images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
});

// ============ ACCESSIBILITY ENHANCEMENTS ============

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'H' to focus on home
    if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'A' to go to about
    if ((e.key === 'a' || e.key === 'A') && !e.ctrlKey && !e.metaKey) {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'P' to go to projects
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// ============ PREFETCH CRITICAL RESOURCES ============

// Prefetch Google Analytics
const analyticsLink = document.createElement('link');
analyticsLink.rel = 'prefetch';
analyticsLink.href = 'https://www.google-analytics.com/analytics.js';
document.head.appendChild(analyticsLink);

// ============ INTERSECTION OBSERVER FOR LAZY LOADING ============

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============ ANALYTICS EVENT TRACKING ============

// Track outbound links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'outbound_link_click', {
                'destination_url': link.href,
                'link_text': link.textContent
            });
        }
    });
});

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'button_text': btn.textContent,
                'button_type': btn.className
            });
        }
    });
});

// Track section scrolls
document.querySelectorAll('section[id]').forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && typeof gtag !== 'undefined') {
                gtag('event', 'section_view', {
                    'section_name': entry.target.id
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(section);
});

// ============ SERVICE WORKER REGISTRATION ============

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('Service Worker registered:', registration);
        // }).catch(error => {
        //     console.log('Service Worker registration failed:', error);
        // });
    });
}

// ============ ERROR HANDLING ============

window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // Send error to analytics or error tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': event.error,
            'fatal': false
        });
    }
});

// ============ CUSTOM EVENT: PAGE READY ============

const pageReadyEvent = new Event('pageReady');
document.addEventListener('load', () => {
    document.dispatchEvent(pageReadyEvent);
});

// Listen for page ready
document.addEventListener('pageReady', () => {
    console.log('%c🎨 Premium Professional Portfolio Initialized', 'color: #d4af37; font-size: 11px; font-weight: bold;');
});

// ============ PERFORMANCE OPTIMIZATION ============

// Lazy load images for better performance
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
});

// ============ REDUCE MOTION PREFERENCE ============

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.body.style.animationDuration = '0.01ms';
    document.body.style.animationIterationCount = '1';
}
