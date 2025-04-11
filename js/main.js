/* 
   ========================================================================
   Main JavaScript: Rogers Sampaio Personal Portfolio
   ========================================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /* ==================== REGISTER GSAP PLUGINS ==================== */
    gsap.registerPlugin(ScrollTrigger);
    
    /* ==================== PRELOADER WITH CLASSICAL REVEAL ==================== */
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="classical-ornament"></div>
        </div>
    `;
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        // Elegant fade out using GSAP
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: function() {
                preloader.style.display = 'none';
                // Reveal hero section with a classical curtain-like animation
                revealHeroSequence();
            }
        });
    });

    /* ==================== CUSTOM CURSOR ==================== */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    document.querySelectorAll('a, button, .btn').forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(93, 93, 255, 0.1)';
            cursorFollower.style.borderColor = 'transparent';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderColor = '#5d5dff';
        });
    });

    /* ==================== STICKY NAVBAR ==================== */
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function() {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Menu Links
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ==================== MOBILE MENU ==================== */
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    /* ==================== TYPED.JS ==================== */
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        const typed = new Typed(typedElement, {
            strings: ['Full Stack Developer', 'Tech Leader', 'Software Engineer', 'PHP & JavaScript Expert'],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true,
            autoInsertCss: false,  // Use our custom CSS instead
            onBegin: (self) => {
                // Make sure the element is visible before typing starts
                typedElement.style.opacity = '1';
            }
        });
    }

    /* ==================== SKILL BARS ANIMATION ==================== */
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(function(bar) {
            const level = bar.getAttribute('data-level') + '%';
            bar.style.width = level;
        });
    }

    /* ==================== PROJECT FILTERING ==================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==================== ADVANCED GSAP SCROLL ANIMATIONS ==================== */
    
    // Hero section reveal sequence - mixing modern with classical flourish
    function revealHeroSequence() {
        const heroTl = gsap.timeline();
        
        // Classical style reveal - starting with elegant typography animation
        heroTl.fromTo('.hero h1', {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotationX: 20
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power2.out"
        })
        .fromTo('.hero h2', {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.7")
        .fromTo('.hero p', {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.7")
        .fromTo('.cta-buttons .btn', {
            opacity: 0,
            y: 20,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .fromTo('.social-icons a', {
            opacity: 0,
            y: 20,
            rotation: -10
        }, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .fromTo('.hero-image', {
            opacity: 0,
            scale: 0.8,
            rotationY: 25
        }, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.5")
        .fromTo('.scroll-down', {
            opacity: 0,
            y: -20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5");
    }
    
    // About section - text column animation inspired by classical typography
    gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            end: 'center center',
            toggleActions: 'play none none none'
        }
    })
    .fromTo('.about .text h3', {
        opacity: 0, 
        x: 50,
        skewX: -10
    }, {
        opacity: 1, 
        x: 0,
        skewX: 0,
        duration: 1.2, 
        ease: "power3.out"
    })
    .fromTo('.about .text p', {
        opacity: 0, 
        y: 30
    }, {
        opacity: 1, 
        y: 0,
        stagger: 0.2, 
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    .fromTo('.personal-info .row', {
        opacity: 0, 
        x: 30
    }, {
        opacity: 1, 
        x: 0,
        stagger: 0.2, 
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.8")
    .fromTo('.about .btn', {
        opacity: 0, 
        y: 20,
        scale: 0.9
    }, {
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.4");

    // Timeline section - classical scroll-based progressive reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none none'
            }
        })
        .fromTo(item.querySelector('.timeline-icon'), {
            opacity: 0,
            scale: 0.5,
            rotation: -90
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .fromTo(item.querySelector('.timeline-content'), {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.9,
            transformOrigin: index % 2 === 0 ? 'right center' : 'left center'
        }, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5");
    });

    // Skills section - data visualization inspired animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 70%',
            end: 'bottom bottom',
            toggleActions: 'play none none none'
        }
    })
    .fromTo('.skills-container .skill-category', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out"
    })
    .fromTo('.skill-item', {
        opacity: 0,
        y: 30,
        rotation: -2,
        scale: 0.95
    }, {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out"
    }, "-=0.5");
    
    // Initialize skill bars with GSAP for smoother animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(function(bar) {
            const level = bar.getAttribute('data-level') + '%';
            gsap.fromTo(bar, {
                width: 0
            }, {
                width: level,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    // Projects section - progressive reveal with classical motifs
    gsap.timeline({
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 70%',
            end: 'center center',
            toggleActions: 'play none none none'
        }
    })
    .fromTo('.project-filters .filter-btn', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
    })
    .fromTo('.project-item', {
        opacity: 0,
        y: 50,
        scale: 0.95,
        rotation: index => index % 2 === 0 ? -1 : 1
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4");
    
    // Contact section - classical split reveal
    gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
            end: 'center center',
            toggleActions: 'play none none none'
        }
    })
    .fromTo('.contact-info', {
        opacity: 0,
        x: -50
    }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
    })
    .fromTo('.contact-form', {
        opacity: 0,
        x: 50
    }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .fromTo('.info-item', {
        opacity: 0,
        x: -30,
        scale: 0.9
    }, {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out"
    }, "-=0.8")
    .fromTo('.form-group', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out"
    }, "-=1.5");
    
    // Initialize animations when DOM is loaded
    setTimeout(() => {
        initSkillBars();
    }, 1000);

    /* ==================== CONTACT FORM ==================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, just show a success message
            this.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }

    /* ==================== SMOOTH SCROLLING ==================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==================== BACK TO TOP BUTTON ==================== */
    const backToTop = document.querySelector('.back-to-top a');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show or hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });

    /* ==================== ADD SCROLL-PADDING FOR FIXED HEADER ==================== */
    document.documentElement.style.scrollPaddingTop = '80px';

    /* ==================== ANIMATION ON PAGE LOAD ==================== */
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
        }, 1000);
    });
});
