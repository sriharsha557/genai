AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth scroll snapping fix
const sections = document.querySelectorAll('section');
let currentSection = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = index;
        }
    });
});

// Wave animation for title
function addWaveAnimation() {
    const title = document.getElementById('animated-title');
    const text = title.textContent;
    title.innerHTML = '';
    title.classList.add('wave-text');
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.1}s`;
        title.appendChild(span);
    });
}

document.addEventListener('DOMContentLoaded', addWaveAnimation);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

// IntersectionObserver for typewriter animation
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('typewriter-animation');
            }
        });
    });
    
    if (typewriterElement) {
        observer.observe(typewriterElement);
    }
});
