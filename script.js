document.addEventListener('DOMContentLoaded', () => {
    // Navigation links සහ Buttons ඔක්කොම මෙතනට ගන්නවා
    const navLinks = document.querySelectorAll('.nav-links a, .nav-btn, .btn[href^="#"]');
    const mainSlider = document.getElementById('main-slider');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Link එක පටන් ගන්නේ # එකෙන් නම් පමණක්
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // හරියටම Section එක තියෙන තැනට Smooth විදිහට Slide කරනවා
                    mainSlider.scrollTo({
                        left: targetSection.offsetLeft,
                        behavior: 'smooth'
                    });

                    // Navigation එකේ Active class එක මාරු කිරීම
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    
                    // ක්ලික් කරපු ලින්ක් එක nav bar එකේ ලින්ක් එකක් නම් ඒක active කරන්න
                    const navTarget = document.querySelector(`.nav-links a[href="${targetId}"]`);
                    if (navTarget) navTarget.classList.add('active');
                }
            }
        });
    });
});