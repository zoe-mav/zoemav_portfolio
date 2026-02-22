// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add animation to sections on scroll
const sections = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Remove observer after first intersection
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');

const cardObserverOptions = {
    threshold: 0.1
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, cardObserverOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// Handle scroll events for smooth transitions
let lastScrollTime = 0;
const scrollDelay = 50; // Reduced from 100ms to 50ms for more responsive scrolling

window.addEventListener('scroll', () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < scrollDelay) {
        return;
    }
    lastScrollTime = currentTime;

    // Add any additional scroll-based animations here
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme === 'light');

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme === 'light');
    });

    function updateIcon(isLight) {
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
});

// Footer UTC time
function updateUtcTime() {
    const el = document.getElementById('utc-time');
    if (!el) return;
    const now = new Date();
    const utc = now.getUTCHours().toString().padStart(2, '0') + ':' +
        now.getUTCMinutes().toString().padStart(2, '0') + ':' +
        now.getUTCSeconds().toString().padStart(2, '0');
    el.textContent = utc;
}
document.addEventListener('DOMContentLoaded', () => {
    updateUtcTime();
    setInterval(updateUtcTime, 1000);
});

// Nav scroll-spy: set .active on the link for the current section
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function setActive() {
        const scrollY = window.scrollY;
        const headerOffset = 80;
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - headerOffset;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActive);
    window.addEventListener('load', setActive);
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    if (scrollToTopButton) {
        // Show button when user scrolls down 200px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top when button is clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Debug log
        console.log('Scroll to top button initialized');
    } else {
        console.error('Scroll to top button not found');
    }
}); 