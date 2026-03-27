document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a, .nav-btn');
    const mainSlider = document.getElementById('main-slider');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Internal links (#) සඳහා පමණක් ක්‍රියාත්මක වේ
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    mainSlider.scrollTo({
                        left: targetSection.offsetLeft,
                        behavior: 'smooth'
                    });

                    // Navigation active class එක update කිරීම
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            }
        });
    });
});