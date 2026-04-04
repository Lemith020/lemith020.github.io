document.addEventListener('DOMContentLoaded', () => {

    const slider    = document.getElementById('main-slider');
    const hamburger = document.getElementById('hamburger');
    const drawer    = document.getElementById('mobileDrawer');
    const overlay   = document.getElementById('drawerOverlay');


    const isMobile = () => window.innerWidth <= 900;


    function scrollToSection(id) {
        const clean  = id.replace('#', '');
        const target = document.getElementById(clean);
        if (!target) return;

        if (isMobile()) {
    
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        } else {
            slider.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
        }

        setActive(clean);
    }

    function setActive(id) {
        document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll(`a[href="#${id}"]`).forEach(a => a.classList.add('active'));
    }

 
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                closeDrawer();
                scrollToSection(href);
            }
        });
    });

 
    slider.addEventListener('scroll', () => {
        if (isMobile()) return;
        const pos = slider.scrollLeft;
        document.querySelectorAll('#main-slider section').forEach(sec => {
            const l = sec.offsetLeft;
            if (pos >= l - window.innerWidth * 0.35 && pos < l + window.innerWidth * 0.65) {
                setActive(sec.id);

                if (sec.id === 'skills' && !skillsAnimated) {
                    animateSkills(); animateRadar(); skillsAnimated = true;
                }
            }
        });
    });

    // Update active on mobile vertical scroll
    window.addEventListener('scroll', () => {
        if (!isMobile()) return;
        const scrollY = window.scrollY + window.innerHeight * 0.35;
        document.querySelectorAll('#main-slider section').forEach(sec => {
            const top    = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                setActive(sec.id);
                if (sec.id === 'skills' && !skillsAnimated) {
                    animateSkills(); animateRadar(); skillsAnimated = true;
                }
            }
        });
    });

    /* ─── HAMBURGER / DRAWER ─── */
    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent bg scroll
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
    overlay.addEventListener('click', closeDrawer);

    /* ─── TYPED TEXT ─── */
    const phrases = ['Full Stack Developer', 'AI & ML Engineer', 'PHP / MySQL Dev', 'Flutter Developer', 'UI Designer'];
    let pi = 0, ci = 0, del = false;
    const typedEl = document.querySelector('.typed-text');

    function type() {
        if (!typedEl) return;
        const cur = phrases[pi];
        typedEl.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
        del ? ci-- : ci++;
        if (!del && ci === cur.length) { setTimeout(() => { del = true; type(); }, 1900); return; }
        if (del && ci === 0)           { del = false; pi = (pi + 1) % phrases.length; }
        setTimeout(type, del ? 55 : 105);
    }
    setTimeout(type, 800);

    /* ─── SKILL BAR ANIMATION ─── */
    let skillsAnimated = false;

    function animateSkills() {
        document.querySelectorAll('.skill-bar').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 110);
        });
    }
    function animateRadar() {
        document.querySelectorAll('.radar-ring').forEach((ring, i) => {
            const final = parseFloat(ring.getAttribute('stroke-dashoffset'));
            ring.style.strokeDashoffset = '220';
            setTimeout(() => {
                ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)';
                ring.style.strokeDashoffset = final;
            }, i * 180 + 100);
        });
    }

    // Trigger if landing on skills (page load / refresh)
    setTimeout(() => {
        const skillsSec = document.getElementById('skills');
        if (!skillsSec || skillsAnimated) return;
        if (isMobile()) {
            const inView = skillsSec.getBoundingClientRect().top < window.innerHeight * 0.8;
            if (inView) { animateSkills(); animateRadar(); skillsAnimated = true; }
        } else {
            if (slider.scrollLeft >= skillsSec.offsetLeft - 100) { animateSkills(); animateRadar(); skillsAnimated = true; }
        }
    }, 400);

    /* ─── SERVICE BOX ENTRANCE ─── */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-box').forEach((box, i) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(18px)';
        box.style.transition = `opacity .45s ease ${i * 0.07}s, transform .45s ease ${i * 0.07}s`;
        observer.observe(box);
    });

    /* ─── CUSTOM CURSOR (desktop only) ─── */
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const glow = document.querySelector('.cursor-glow');

    if (dot && ring && glow) {
        // Fast dot, slightly lagged ring, slow glow
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
            glow.style.left = mx + 'px'; glow.style.top = my + 'px';
        });

        // Smooth ring follow
        function followRing() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(followRing);
        }
        followRing();

        document.querySelectorAll('a, button, .service-box, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
        });
    }

    /* ─── CONTACT FORM ─── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn  = form.querySelector('button[type="submit"]');
            const text = btn.querySelector('.btn-text');
            btn.disabled = true;
            btn.style.background = '#10b981';
            text.textContent = '✓ Message Sent!';
            setTimeout(() => {
                btn.disabled = false;
                btn.style.background = '';
                text.textContent = 'Send Message';
                form.reset();
            }, 3500);
        });
    }

    /* ─── RESIZE: reset scroll if switching breakpoint ─── */
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            document.body.style.overflow = '';
            closeDrawer();
        }
    });

});
