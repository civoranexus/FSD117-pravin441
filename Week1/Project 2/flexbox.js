// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger to X
    if (navMenu.classList.contains('active')) {
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to all cards and sections
const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .section-header');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Counter animation for hero stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200; // Animation speed
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isK = target.includes('K');
        const isPlus = target.includes('+');
        
        let numericTarget;
        if (isPercentage) {
            numericTarget = parseFloat(target);
        } else if (isK) {
            numericTarget = parseInt(target) * 1000;
        } else if (isPlus) {
            numericTarget = parseInt(target);
        } else {
            numericTarget = parseInt(target);
        }
        
        const increment = numericTarget / speed;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < numericTarget) {
                if (isPercentage) {
                    counter.textContent = current.toFixed(1) + '%';
                } else if (isK) {
                    counter.textContent = Math.floor(current / 1000) + 'K+';
                } else if (isPlus) {
                    counter.textContent = Math.floor(current) + '+';
                } else {
                    counter.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    let isValid = true;
    let errorMessage = '';
    
    // Name validation
    if (firstName.length < 2) {
        isValid = false;
        errorMessage += 'First name must be at least 2 characters.\n';
    }
    
    if (lastName.length < 2) {
        isValid = false;
        errorMessage += 'Last name must be at least 2 characters.\n';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    // Subject validation
    if (subject.length < 5) {
        isValid = false;
        errorMessage += 'Subject must be at least 5 characters.\n';
    }
    
    // Message validation
    if (message.length < 10) {
        isValid = false;
        errorMessage += 'Message must be at least 10 characters.\n';
    }
    
    if (!isValid) {
        alert(errorMessage);
        return;
    }
    
    // Success message
    alert(`Thank you ${firstName}! Your message has been sent successfully.\n\nWe'll get back to you at ${email} soon.`);
    
    // Reset form
    contactForm.reset();
    
    // Add success animation
    const submitBtn = contactForm.querySelector('.btn');
    submitBtn.textContent = '✓ Sent Successfully!';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
    }, 3000);
});

// Real-time form field validation
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#10b981';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#3b82f6';
    });
});

// Pricing card hover effect enhancement
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0)';
        } else {
            card.style.transform = 'scale(1.05)';
        }
    });
});

// Scroll to top button (optional)
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.style.opacity = '1';
        } else {
            btn.style.opacity = '0';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
};

// Initialize scroll to top button
createScrollToTopBtn();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c🚀 TechFlow Landing Page Loaded Successfully!', 'font-size: 16px; color: #3b82f6; font-weight: bold;');