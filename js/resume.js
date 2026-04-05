// Resume page interactive features

document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress');
                progressBar.style.setProperty('--progress-width', targetWidth + '%');
                progressBar.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimeline = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const timelineObserver = new IntersectionObserver(animateTimeline, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
    
    // Animate sidebar sections
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    
    const animateSidebar = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sidebarObserver = new IntersectionObserver(animateSidebar, {
        threshold: 0.2
    });
    
    sidebarSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(30px)';
        section.style.transition = 'all 0.6s ease-out';
        sidebarObserver.observe(section);
    });
    
    // Add hover effect to timeline markers
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Interactive project card click
    const projectCards = document.querySelectorAll('.project-card-resume');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('project-link-btn')) {
                return; // Let the link handle it
            }
            const link = this.querySelector('.project-link-btn');
            if (link) {
                link.click();
            }
        });
    });
    
    // Add ripple effect to interest items
    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach(item => {
        item.addEventListener('click', function(e) {
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
    
    // Skill item stagger animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Certification item click effect
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(cert => {
        cert.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Print resume functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', function() {
            this.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
        });
        
        downloadBtn.addEventListener('mouseleave', function() {
            this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        });
    }
    
    // Add parallax effect to resume header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const resumeHeader = document.querySelector('.resume-header');
        if (resumeHeader && scrolled < 500) {
            resumeHeader.style.transform = `translateY(${scrolled * 0.4}px)`;
            resumeHeader.style.opacity = 1 - (scrolled / 800);
        }
    });
    
    // Counter animation for years/projects (if you want to add stats)
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const value = Math.floor((progress / duration) * (end - start) + start);
            
            element.textContent = value;
            
            if (progress < duration) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Tech tags: hover styling is in CSS (monochrome).

    // Console message
    console.log('📄 Interactive Resume Loaded!');
    console.log('💼 Developed by Elton Chang');
});
