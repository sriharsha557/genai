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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
    }
});
