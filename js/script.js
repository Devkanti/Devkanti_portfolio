document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 3D Tilt Effect for Glass Panels (Desktop Only)
    const tiltElements = document.querySelectorAll('.tilt-element');

    // Only apply tilt effect if the user has an accurate pointing device (like a mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                // Get mouse position relative to the element
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation (max 10 degrees)
                const xRotation = -((y - rect.height / 2) / rect.height) * 10;
                const yRotation = ((x - rect.width / 2) / rect.width) * 10;

                element.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                // Reset to default state smoothly
                element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.transform = 'perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)';
            });

            element.addEventListener('mouseenter', () => {
                // Remove transition during hover for instant mouse tracking
                element.style.transition = 'none';
            });
        });
    }

    // 2. Smooth Scroll Reveal (for About/Projects pages)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to any elements you add a 'reveal' class to later
    document.querySelectorAll('.reveal').forEach(el => {
        // Set initial state via JS so it doesn't break if JS is disabled
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});
