const navLinks = document.querySelectorAll('.nav-links a');
const main = document.getElementById('main-slider');
const navBtns = document.querySelectorAll('.nav-btn');

// Nav links click event
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        main.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth'
        });

        // Active class update
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// "More About Me" වගේ බටන් වැඩ කරන්න
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        main.scrollTo({ left: targetSection.offsetLeft, behavior: 'smooth' });
    });
});