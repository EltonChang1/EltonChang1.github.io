// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
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

// Observe all elements with fade-in classes
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up, .project-card, .screenshot-item');
    fadeElements.forEach(el => observer.observe(el));
});

// Skill tags hover effect with random colors
const skillTags = document.querySelectorAll('.skill-tag');
const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.backgroundColor = randomColor;
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
        this.style.transform = '';
    });
});

// Typing effect for hero section
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.display = 'inline-block';
    
    let index = 0;
    const typeSpeed = 150;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        }
    }
    
    setTimeout(type, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Add floating animation to project images
const projectImages = document.querySelectorAll('.project-image img, .project-image-large img');
projectImages.forEach((img, index) => {
    img.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
});

// Interactive screenshot hover effect
const screenshots = document.querySelectorAll('.screenshot-item img');
screenshots.forEach(screenshot => {
    screenshot.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
    });
    
    screenshot.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Toggle project expanded view
function toggleProject(projectId) {
    const expandedSection = document.getElementById(`${projectId}-expanded`);
    const allExpanded = document.querySelectorAll('.project-expanded');
    const allCards = document.querySelectorAll('.project-card-interactive');
    
    // Close all other expanded sections
    allExpanded.forEach(section => {
        if (section.id !== `${projectId}-expanded`) {
            section.style.display = 'none';
        }
    });
    
    // Toggle current section
    if (expandedSection.style.display === 'none' || !expandedSection.style.display) {
        // Show expanded view
        expandedSection.style.display = 'block';
        // Smooth scroll to expanded section
        setTimeout(() => {
            expandedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        // Hide all project cards
        allCards.forEach(card => {
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';
        });
    } else {
        // Hide expanded view
        expandedSection.style.display = 'none';
        // Show all project cards
        allCards.forEach(card => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        });
    }
}

// Close expanded view when clicking outside
document.addEventListener('click', function(event) {
    const expandedSections = document.querySelectorAll('.project-expanded');
    const isClickInside = event.target.closest('.project-card-interactive') || 
                          event.target.closest('.project-expanded');
    
    if (!isClickInside) {
        expandedSections.forEach(section => {
            if (section.style.display === 'block') {
                const allCards = document.querySelectorAll('.project-card-interactive');
                section.style.display = 'none';
                allCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.pointerEvents = 'auto';
                });
            }
        });
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Add click effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Counter animation for stats (if added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.classList.add('party-mode');
        alert('🎉 Party mode activated! You found the secret!');
        setTimeout(() => document.body.classList.remove('party-mode'), 5000);
    }
});

console.log('💻 Welcome to my portfolio! Built with ❤️ by Elton');
console.log('🎮 Try the Konami code for a surprise!');
