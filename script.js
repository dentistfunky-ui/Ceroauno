/**
 * Reddy's Dental Clinic - Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between list and x
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
    }

    // 2. Sticky Header on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    // Using Intersection Observer to trigger fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05 // Lowered threshold so taller elements animate reliably
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'appear' class to trigger CSS transition
                entry.target.classList.add('appear');
                // Stop observing once it has appeared
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        // Fallback: if already in viewport on load, show immediately
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('appear');
        } else {
            observer.observe(el);
        }
    });

    // 4. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (lightbox && lightboxImg && lightboxClose) {
        // Select all images except the lightbox image itself
        const allImages = document.querySelectorAll('img:not(.lightbox-content)');
        
        allImages.forEach(img => {
            // Make image look clickable
            img.classList.add('lightbox-trigger');
            
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                // Small delay to allow display:flex to apply before adding active class for animations if needed
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || 'Full size image';
            });
        });
        
        // Close modal
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightbox.style.display = 'none';
        });
        
        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                lightbox.style.display = 'none';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.classList.remove('active');
                lightbox.style.display = 'none';
            }
        });
    }
});
