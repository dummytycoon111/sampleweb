// Smooth Scroll
document.querySelectorAll('.smooth-scroll, .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Fade-in on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Video Lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
const videoLightbox = document.getElementById('videoLightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const closeLightbox = document.getElementById('closeLightbox');
const lightboxOverlay = document.querySelector('.lightbox-overlay');

// Open lightbox
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const videoUrl = this.getAttribute('data-video');
        if (videoUrl) {
            lightboxVideo.src = videoUrl + '?autoplay=1';
            videoLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close lightbox
function closeVideoLightbox() {
    videoLightbox.classList.remove('active');
    lightboxVideo.src = '';
    document.body.style.overflow = '';
}

closeLightbox.addEventListener('click', closeVideoLightbox);
lightboxOverlay.addEventListener('click', closeVideoLightbox);

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoLightbox.classList.contains('active')) {
        closeVideoLightbox();
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const navLinks = document.querySelectorAll('.nav-link');

function closeMobileMenu() {
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

function openMobileMenu() {
    if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
    if (navMenu) navMenu.classList.add('active');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when clicking on backdrop
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Dynamic Cursor Glow Effect (Desktop only)
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop
    function animateGlow() {
        // Smooth interpolation for fluid movement
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }

    // Start animation
    animateGlow();

    // Enhance glow on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .testimonial-card, .contact-link, .btn-primary');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('hover');
        });
    });

    // Hide glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

