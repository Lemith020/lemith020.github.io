document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainSlider = document.getElementById('main-slider');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Navigation Links click logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                mainSlider.scrollTo({
                    left: targetSection.offsetLeft,
                    behavior: 'smooth'
                });

                // Active Class Update
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // "More About Me" buttons logic
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                mainSlider.scrollTo({
                    left: targetSection.offsetLeft,
                    behavior: 'smooth'
                });
            }
        });
    });
});