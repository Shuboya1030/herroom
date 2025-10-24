// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(38, 102, 127, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(38, 102, 127, 0.1)';
    }
});

// Active navigation highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.template-item, .workshop-card, .feature, .feature-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Interactive demo placeholders
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        this.style.background = '#e8f5e8';
        this.style.borderColor = '#66bb6a';
        this.innerHTML = '<i class="fas fa-check-circle" style="color: #27ae60; font-size: 2rem; margin-bottom: 0.5rem;"></i><p style="color: #27ae60;">已生成</p>';
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.style.background = '';
            this.style.borderColor = '';
            this.innerHTML = '<i class="fas fa-image"></i><p>点击生成</p>';
        }, 3000);
    });
});

// Progress indicator for workshops
function updateProgress(step) {
    const steps = document.querySelectorAll('.step-number');
    steps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.style.background = '#27ae60';
            stepEl.innerHTML = '<i class="fas fa-check"></i>';
        } else if (index === step) {
            stepEl.style.background = '#f39c12';
            stepEl.style.animation = 'pulse 1s infinite';
        } else {
            stepEl.style.background = '#bdc3c7';
            stepEl.innerHTML = index + 1;
        }
    });
}

// CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.workshop-card, .template-item, .feature');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Demo interaction for prompt examples
document.addEventListener('DOMContentLoaded', function() {
    const promptExamples = document.querySelectorAll('.prompt-example, .prompt-box');
    
    promptExamples.forEach(example => {
        example.addEventListener('click', function() {
            // Copy to clipboard
            navigator.clipboard.writeText(this.textContent).then(() => {
                const originalBg = this.style.background;
                this.style.background = '#d4edda';
                this.style.border = '2px solid #28a745';
                
                // Show feedback
                const feedback = document.createElement('div');
                feedback.textContent = '已复制到剪贴板!';
                feedback.style.cssText = `
                    position: absolute;
                    background: #28a745;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                `;
                this.style.position = 'relative';
                this.appendChild(feedback);
                
                setTimeout(() => {
                    this.style.background = originalBg;
                    this.style.border = '';
                    if (feedback.parentNode) {
                        feedback.remove();
                    }
                }, 2000);
            });
        });
    });
});

// Workshop timer
let workshopTimer;
function startWorkshopTimer(duration = 10) {
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'workshop-timer';
    timerDisplay.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(38, 102, 127, 0.3);
    `;
    
    document.body.appendChild(timerDisplay);
    
    let timeLeft = duration * 60; // Convert to seconds
    
    workshopTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(workshopTimer);
            timerDisplay.textContent = '⏰ 时间到!';
            timerDisplay.style.background = '#e74c3c';
            setTimeout(() => {
                timerDisplay.remove();
            }, 5000);
        }
        
        timeLeft--;
    }, 1000);
}

// Add timer controls to workshop section
document.addEventListener('DOMContentLoaded', function() {
    const workshopSection = document.querySelector('#workshop');
    if (workshopSection) {
        const timerControls = document.createElement('div');
        timerControls.style.cssText = `
            text-align: center;
            margin: 2rem 0;
        `;
        timerControls.innerHTML = `
            <button onclick="startWorkshopTimer(10)" style="
                background: var(--secondary-color);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 0 10px;
                cursor: pointer;
                font-size: 1rem;
            ">开始10分钟计时</button>
            <button onclick="clearInterval(workshopTimer); document.getElementById('workshop-timer')?.remove()" style="
                background: #e74c3c;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 0 10px;
                cursor: pointer;
                font-size: 1rem;
            ">停止计时</button>
        `;
        
        const workshopProcess = workshopSection.querySelector('.workshop-process');
        if (workshopProcess) {
            workshopProcess.appendChild(timerControls);
        }
    }
});

console.log('AI 图片生成课程网站已加载完成! 🎨✨');