/* 
   ========================================================================
   Blog JavaScript: Rogers Sampaio Portfolio Blog
   ========================================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /* ==================== REGISTER GSAP PLUGINS ==================== */
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    /* ==================== INITIALIZE SCROLLREVEAL ==================== */
    // Initialize ScrollReveal for article cards
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    sr.reveal('.reveal-from-bottom', {
        interval: 200
    });

    /* ==================== BLOG-SPECIFIC GSAP ANIMATIONS ==================== */
    // Animate the blog header
    gsap.timeline()
        .fromTo('.blog-header h1', {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .fromTo('.blog-header .section-line', {
            width: 0
        }, {
            width: '80px',
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .fromTo('.blog-header p', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3");

    // Animate article cards if GSAP is available
    if (typeof gsap !== 'undefined') {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.blog-articles',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
        .fromTo('.article-card', {
            opacity: 0,
            y: 50,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    }
});
