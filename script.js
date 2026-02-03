/* ============================================
   KIRUZU PORTFOLIO - ADVANCED JAVASCRIPT
   Cyberpunk / Tech Aesthetic
   ============================================ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initNavigation();
    initTitleRotator();
    initScrollAnimations();
    initStatsCounter();
    initSkillBars();
    initFloatingBlocks();
    initCodeRain();
    initGlitchEffect();
    initSmoothScroll();
    initEasterEgg();
    triggerEntryAnimations();
});

/* ============================================
   ENTRY ANIMATIONS
   ============================================ */
function triggerEntryAnimations() {
    // Trigger hero animations on load
    document.querySelectorAll('.hero-content > *').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = (i * 0.1) + 's';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover states
    const hoverElements = document.querySelectorAll('a, button, .cta-button, .skill-card, .experience-card, .contact-method');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ============================================
   PARTICLE SYSTEM
   ============================================ */
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }
            
            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.15;
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (toggle && mobileMenu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

/* ============================================
   TITLE ROTATOR
   ============================================ */
function initTitleRotator() {
    const rotator = document.getElementById('title-rotator');
    if (!rotator) return;
    
    const titles = rotator.querySelectorAll('.title-item');
    let currentIndex = 0;
    
    setInterval(() => {
        titles[currentIndex].classList.remove('active');
        titles[currentIndex].classList.add('exit');
        
        setTimeout(() => {
            titles[currentIndex].classList.remove('exit');
            currentIndex = (currentIndex + 1) % titles.length;
            titles[currentIndex].classList.add('active');
        }, 500);
    }, 3000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for experience cards
                if (entry.target.classList.contains('experience-card')) {
                    updateTimelineProgress();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.section-header, .about-content, .experience-card, .skill-card, .requirement-card, .contact-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

function updateTimelineProgress() {
    const cards = document.querySelectorAll('.experience-card');
    const progress = document.getElementById('timeline-progress');
    if (!progress) return;
    
    let visibleCount = 0;
    cards.forEach(card => {
        if (card.classList.contains('visible')) visibleCount++;
    });
    
    const percentage = (visibleCount / cards.length) * 100;
    progress.style.height = percentage + '%';
}

/* ============================================
   STATS COUNTER
   ============================================ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        element.textContent = Math.round(target * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/* ============================================
   SKILL BARS
   ============================================ */
function initSkillBars() {
    const bars = document.querySelectorAll('.level-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    bars.forEach(bar => observer.observe(bar));
}

/* ============================================
   FLOATING BLOCKS
   ============================================ */
function initFloatingBlocks() {
    const container = document.getElementById('floating-blocks');
    if (!container) return;
    
    const blockCount = 15;
    
    for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        block.className = 'floating-block';
        
        const size = Math.random() * 60 + 20;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        block.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(block);
    }
}

/* ============================================
   CODE RAIN EFFECT
   ============================================ */
function initCodeRain() {
    const container = document.getElementById('code-rain');
    if (!container) return;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]=/\\';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 20}px;
            top: ${-Math.random() * 100}%;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: rgba(168, 85, 247, 0.3);
            writing-mode: vertical-lr;
            animation: codeRainFall ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += chars[Math.floor(Math.random() * chars.length)];
        }
        column.textContent = text;
        
        container.appendChild(column);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes codeRainFall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   GLITCH EFFECT
   ============================================ */
function initGlitchEffect() {
    const overlay = document.getElementById('glitch-overlay');
    if (!overlay) return;
    
    // Random glitch trigger
    setInterval(() => {
        if (Math.random() > 0.95) {
            overlay.classList.add('active');
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 200);
        }
    }, 100);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   EASTER EGG
   ============================================ */
function initEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];
    let konamiIndex = 0;
    let lastKeyTime = Date.now();
    
    document.addEventListener('keydown', (e) => {
        // Reset if too much time passed (5 seconds)
        if (Date.now() - lastKeyTime > 5000) {
            konamiIndex = 0;
        }
        lastKeyTime = Date.now();
        
        // Check the key
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // Visual feedback - optional flash
            document.body.style.boxShadow = 'inset 0 0 50px rgba(168, 85, 247, 0.2)';
            setTimeout(() => {
                document.body.style.boxShadow = 'none';
            }, 100);
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create epic notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;">⚡</div>
        <div style="font-size: 24px; margin-bottom: 8px;">YOU FOUND THE SECRET</div>
        <div style="font-size: 14px; opacity: 0.8; margin-bottom: 12px;">Welcome to the inner circle, hacker.</div>
        <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; opacity: 0.5;">// kiruzu appreciates the curious ones</div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(147, 51, 234, 0.95));
        color: white;
        padding: 48px 64px;
        font-family: 'Orbitron', sans-serif;
        text-align: center;
        border: 2px solid white;
        box-shadow: 0 0 60px rgba(168, 85, 247, 0.8), inset 0 0 60px rgba(255, 255, 255, 0.1);
        z-index: 100000;
        animation: easterEggPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes easterEggPop {
            0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); }
            100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }
        @keyframes matrixRain {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Screen effect
    document.body.style.animation = 'none';
    document.body.style.boxShadow = 'inset 0 0 200px rgba(168, 85, 247, 0.4)';
    
    // Remove after delay
    setTimeout(() => {
        notification.style.animation = 'easterEggPop 0.3s ease reverse forwards';
        setTimeout(() => {
            notification.remove();
            document.body.style.boxShadow = 'none';
        }, 300);
    }, 3000);
    
    // Add some particles explosion
    createParticleExplosion();
}

function createParticleExplosion() {
    const colors = ['#a855f7', '#22d3ee', '#f472b6', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = Math.random() * 300 + 200;
        
        particle.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: ${color};
            pointer-events: none;
            z-index: 99999;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { 
                transform: 'translate(-50%, -50%) translate(0, 0)',
                opacity: 1
            },
            { 
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

/* ============================================
   PARALLAX EFFECT (OPTIONAL)
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero grid
    const grid = document.querySelector('.grid-lines');
    if (grid) {
        grid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.3}px)`;
    }
    
    // Parallax for floating blocks
    const blocks = document.querySelectorAll('.floating-block');
    blocks.forEach((block, i) => {
        const speed = 0.1 + (i * 0.02);
        block.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ============================================
   MAGNETIC BUTTONS (HOVER EFFECT)
   ============================================ */
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

/* ============================================
   CONSOLE MESSAGE
   ============================================ */
console.log(`
%c██╗  ██╗██╗██████╗ ██╗   ██╗███████╗██╗   ██╗
%c██║ ██╔╝██║██╔══██╗██║   ██║╚══███╔╝██║   ██║
%c█████╔╝ ██║██████╔╝██║   ██║  ███╔╝ ██║   ██║
%c██╔═██╗ ██║██╔══██╗██║   ██║ ███╔╝  ██║   ██║
%c██║  ██╗██║██║  ██║╚██████╔╝███████╗╚██████╔╝
%c╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝

%c👋 Hey there, curious one!
%c🔒 Looking for vulnerabilities? Good luck.
%c📧 Want to work together? Reach out on Discord!
`, 
'color: #a855f7', 
'color: #9333ea', 
'color: #7c3aed', 
'color: #6d28d9', 
'color: #5b21b6',
'color: #4c1d95',
'color: #22d3ee; font-size: 14px;',
'color: #f472b6; font-size: 12px;',
'color: #a855f7; font-size: 12px;'
);
