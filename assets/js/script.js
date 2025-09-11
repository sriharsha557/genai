AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth scroll snapping fix: Ensure sections snap properly without blanks
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

function addWaveAnimation() {
    const title = document.getElementById('animated-title');
    const text = title.textContent;
    title.innerHTML = '';
    title.classList.add('wave-text');
    
    // Split text into characters and wrap each in a span
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
        span.style.animationDelay = `${index * 0.1}s`; // Stagger animation
        title.appendChild(span);
    });
}
// Start typewriter after a delay
function addTypewriterAnimation() {
    const title = document.getElementById('typewriter-title');
    if (title) {
        // Delay the typewriter animation
        setTimeout(() => {
            title.classList.add('typewriter-cursor', 'typewriter-animation');
        }, 3000); // Start 3 seconds after page load
    }
}
// Apply the animation when the page loads
document.addEventListener('DOMContentLoaded', addWaveAnimation);
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
    }
});
