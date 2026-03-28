document.addEventListener('DOMContentLoaded', () => {

    const slider = document.getElementById('main-slider');

    // ===== SMOOTH NAV SCROLL (FIXED) =====
    function scrollToSection(targetId) {
        const cleanId = targetId.replace('#', '');
        const target = document.getElementById(cleanId);
        if (!target) return;

        slider.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });

        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${cleanId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // Attach to all # links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });

    // Update active nav on scroll
    slider.addEventListener('scroll', () => {
        const pos = slider.scrollLeft;
        document.querySelectorAll('section').forEach(sec => {
            const left = sec.offsetLeft;
            if (pos >= left - window.innerWidth * 0.3 && pos < left + window.innerWidth * 0.7) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
                if (match) match.classList.add('active');
            }
        });

        // Trigger skill bar animation when skills section is visible
        const skillsSec = document.getElementById('skills');
        if (skillsSec) {
            const sl = skillsSec.offsetLeft;
            if (pos >= sl - window.innerWidth * 0.5 && !skillsAnimated) {
                animateSkills();
                animateRadar();
                skillsAnimated = true;
            }
        }
    });

    // ===== TYPED TEXT =====
    const phrases = ['Web Developer', 'Full Stack Dev', 'PHP / MySQL', 'UI Designer', 'CS Student'];
    let phraseIndex = 0, charIndex = 0, deleting = false;
    const typedEl = document.querySelector('.typed-text');

    function type() {
        if (!typedEl) return;
        const current = phrases[phraseIndex];
        if (!deleting) {
            typedEl.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                setTimeout(() => { deleting = true; type(); }, 1800);
                return;
            }
        } else {
            typedEl.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }
        setTimeout(type, deleting ? 60 : 110);
    }
    setTimeout(type, 700);

    // ===== SKILL BAR ANIMATION =====
    let skillsAnimated = false;

    function animateSkills() {
        document.querySelectorAll('.skill-bar').forEach((bar, i) => {
            const targetWidth = bar.getAttribute('data-width') + '%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, i * 120);
        });
    }

    function animateRadar() {
        // Circumference of r=35 circle = 2*pi*35 ≈ 220
        const rings = document.querySelectorAll('.radar-ring');
        rings.forEach((ring, i) => {
            const finalOffset = parseFloat(ring.getAttribute('stroke-dashoffset'));
            ring.style.strokeDashoffset = '220'; // start hidden
            setTimeout(() => {
                ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
                ring.style.strokeDashoffset = finalOffset;
            }, i * 200 + 100);
        });
    }

    // Trigger if skills section is already visible on load
    setTimeout(() => {
        const skillsSec = document.getElementById('skills');
        if (skillsSec && slider.scrollLeft >= skillsSec.offsetLeft - 100) {
            animateSkills();
            animateRadar();
            skillsAnimated = true;
        }
    }, 300);

    // ===== CURSOR GLOW =====
    const glow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', e => {
        if (glow) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }
    });

    // ===== CONTACT FORM =====
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const text = btn.querySelector('.btn-text');
            btn.disabled = true;
            btn.style.background = '#10b981';
            text.textContent = 'Message Sent!';
            setTimeout(() => {
                btn.disabled = false;
                btn.style.background = '';
                text.textContent = 'Send Message';
                form.reset();
            }, 3500);
        });
    }

    // ===== SERVICE BOXES STAGGER ANIMATION =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-box').forEach((box, i) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        observer.observe(box);
    });

});
