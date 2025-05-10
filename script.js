document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

   
   
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      });
      
   

 
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
    });

    // Sticky Header on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Animated Counter for Stats
    const counters = [
        { id: 'yearsCounter', target: 50, suffix: '+' },
        { id: 'graduatesCounter', target: 10000, suffix: '+' },
        { id: 'placementCounter', target: 95, suffix: '%' }
    ];

    function animateCounters() {
        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            const duration = 2000;
            const start = 0;
            const increment = counter.target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                    clearInterval(timer);
                    current = counter.target;
                }
                element.textContent = Math.floor(current) + (counter.suffix || '');
            }, 16);
        });
    }

    // Intersection Observer for Counter Animation
    const aboutSection = document.querySelector('.about');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonialSlider');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        const slides = document.querySelectorAll('.testimonial');
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides.forEach((slide, i) => {
            slide.style.display = i === currentSlide ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function startSlider() {
        if (testimonialSlider) {
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000);
            
            // Pause on hover
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    startSlider();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });



    // Smooth scrolling with offset for mobile header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offset = window.innerWidth <= 768 ? 70 : 80;
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
    });

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            
            formData.forEach((value, key) => {
                if (!value.trim()) {
                    isValid = false;
                    const input = contactForm.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.style.borderColor = '#e74c3c';
                        setTimeout(() => {
                            input.style.borderColor = '#ddd';
                        }, 2000);
                    }
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Current Year in Footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});