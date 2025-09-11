document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  let currentIndex = 0;

  const scrollToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
      currentIndex = index;
    }
  };

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      scrollToSection(currentIndex + 1);
    } else {
      scrollToSection(currentIndex - 1);
    }
  });
});
