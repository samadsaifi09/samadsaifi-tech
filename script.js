document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. WEB AUDIO FEEDBACK RETRO SYNTH (ZERO ASSETS REQUISITION)
       ========================================================================== */
    let audioCtx = null;
    let soundEnabled = false;
    const btnSoundToggle = document.getElementById('btn-sound-toggle');

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playTone(freq, type, duration, volume = 0.04) {
        if (!soundEnabled) return;
        initAudio();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
            // Exponential decay for modern organic micro-interaction tones
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.warn("Web Audio API was blocked or failed to initialize: ", e);
        }
    }

    // Toggle Sound Button Trigger
    if (btnSoundToggle) {
        btnSoundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                initAudio();
                btnSoundToggle.classList.add('active');
                btnSoundToggle.querySelector('.sound-icon').textContent = 'volume_up';
                btnSoundToggle.querySelector('.sound-text').textContent = 'AUDIO: ON';
                // Double chime pop confirmation
                playTone(587.33, 'sine', 0.18, 0.08); // D5
                setTimeout(() => playTone(880, 'sine', 0.22, 0.08), 80); // A5
            } else {
                btnSoundToggle.classList.remove('active');
                btnSoundToggle.querySelector('.sound-icon').textContent = 'volume_mute';
                btnSoundToggle.querySelector('.sound-text').textContent = 'AUDIO: OFF';
            }
        });
    }

    // Hook sounds to hover elements
    const hoverElements = document.querySelectorAll('.m3-btn, .nav-link, .stat-box, .timeline-content, .network-item, .contact-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            playTone(987.77, 'sine', 0.04, 0.015); // B5 pop
        });
    });


    /* ==========================================================================
       2. DYNAMIC MATERIAL 3 CANVAS NETWORK (LAVENDER / TEAL PARTICLES)
       ========================================================================== */
    const canvas = document.getElementById('canvas-particles');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particleCount = calculateParticleCount();
    const connectionDistance = 115;
    const mouseConnectionDistance = 160;
    const mouse = { x: null, y: null, radius: 140 };

    function calculateParticleCount() {
        if (window.innerWidth < 768) return 35;
        if (window.innerWidth < 1200) return 75;
        return 110;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = Math.random() * 2.5 + 1.2;
            
            const rand = Math.random();
            if (rand < 0.6) {
                this.color = 'rgba(208, 188, 255, 0.4)'; // M3 Lavender
            } else if (rand < 0.85) {
                this.color = 'rgba(127, 202, 195, 0.35)'; // Expressive Teal
            } else {
                this.color = 'rgba(255, 255, 255, 0.25)'; // Ambient White
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Soft push effect on hover
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx / dist * force * 0.35;
                    this.y -= dy / dist * force * 0.35;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = calculateParticleCount();
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - p1.x;
                const dy = mouse.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseConnectionDistance) {
                    const alpha = (1 - dist / mouseConnectionDistance) * 0.16;
                    ctx.strokeStyle = `rgba(208, 188, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.1;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawLines();
        animationFrameId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();


    /* ==========================================================================
       3. INTERSECTION OBSERVER SCROLL REVEALS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================================================
       4. SCROLL HIGHLIGHT NAVBAR APP BAR
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let currentSection = 'home';
        
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 130;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       5. METRIC COUNTERS
       ========================================================================== */
    const statsSection = document.querySelector('.about-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            const duration = 1800;
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / 60);
                if (current >= target) {
                    num.textContent = target;
                    clearInterval(timer);
                } else {
                    num.textContent = current;
                }
            }, stepTime);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    if (statsSection) statsObserver.observe(statsSection);


    /* ==========================================================================
       6. COLLAPSIBLE ABSTRACT DRAWER (STANFORD RESEARCH PAPER)
       ========================================================================== */
    const btnToggleAbstract = document.getElementById('btn-toggle-abstract');
    const abstractDrawer = document.getElementById('abstract-drawer');

    if (btnToggleAbstract && abstractDrawer) {
        btnToggleAbstract.addEventListener('click', () => {
            btnToggleAbstract.classList.toggle('active');
            playTone(493.88, 'sine', 0.12, 0.05); // B4

            if (abstractDrawer.style.height === '' || abstractDrawer.style.height === '0px') {
                abstractDrawer.style.height = abstractDrawer.scrollHeight + 'px';
                btnToggleAbstract.querySelector('span').textContent = 'Collapse Abstract';
                btnToggleAbstract.querySelector('.arrow-down').textContent = 'keyboard_arrow_up';
            } else {
                abstractDrawer.style.height = '0px';
                btnToggleAbstract.querySelector('span').textContent = 'Read Abstract & Viewer';
                btnToggleAbstract.querySelector('.arrow-down').textContent = 'keyboard_arrow_down';
            }
        });
    }


    /* ==========================================================================
       7. EMAIL QUICK COPY TRIGGER & GLASS TOAST NOTICE
       ========================================================================== */
    const btnCopyEmail = document.getElementById('btn-copy-email');
    const toastMessage = document.getElementById('toast-message');

    if (btnCopyEmail && toastMessage) {
        btnCopyEmail.addEventListener('click', () => {
            const emailAddress = "iamsamadsaifi09@gmail.com";
            
            navigator.clipboard.writeText(emailAddress)
                .then(() => {
                    // M3 expressive chime chime
                    playTone(659.25, 'sine', 0.07, 0.06); // E5
                    setTimeout(() => playTone(987.77, 'sine', 0.12, 0.06), 60); // B5

                    toastMessage.classList.add('show');
                    btnCopyEmail.textContent = "Copied!";
                    
                    setTimeout(() => {
                        toastMessage.classList.remove('show');
                        btnCopyEmail.textContent = "Copy Address";
                    }, 2500);
                })
                .catch(err => {
                    console.error('Failed to copy email: ', err);
                });
        });
    }


    /* ==========================================================================
       8. MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksList = document.querySelector('.nav-links');
    const individualLinks = document.querySelectorAll('.nav-links a');

    if (mobileNavToggle && navLinksList) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');
            playTone(523.25, 'sine', 0.08, 0.04); // C5
        });

        individualLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }
});
