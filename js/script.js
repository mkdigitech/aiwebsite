// MKDigital - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initPortfolioFilter();
    initTestimonialSlider();
    initHeaderScroll();
    initAnimations();
    initContactForm();
    initNewsletterForm();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Close menu when nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
    }
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (testimonialItems.length && prevButton && nextButton) {
        // Hide all testimonials except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            testimonialItems[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            testimonialItems[currentIndex].style.display = 'block';
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            testimonialItems[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            testimonialItems[currentIndex].style.display = 'block';
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            testimonialItems[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            testimonialItems[currentIndex].style.display = 'block';
        }, 5000);
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Scroll Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate');
    
    if (animatedElements.length) {
        function checkIfInView() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Check on load
        checkIfInView();
        
        // Check on scroll
        window.addEventListener('scroll', checkIfInView);
    }
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // For demo purposes, we'll just show a success message
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerHTML = '<strong>Success!</strong> Your message has been sent. We will get back to you soon!';
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Reset form after 3 seconds
                setTimeout(function() {
                    contactForm.reset();
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].disabled = false;
                    }
                    successMessage.remove();
                }, 3000);
            }
        });
    }
}

// Newsletter Form Submission
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple validation
            if (email) {
                // In a real application, you would send this data to a server
                // For demo purposes, we'll just show a success message
                emailInput.disabled = true;
                newsletterForm.querySelector('button').disabled = true;
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.style.marginTop = '10px';
                successMessage.innerHTML = '<strong>Success!</strong> You have been subscribed to our newsletter!';
                
                // Insert success message after the form
                newsletterForm.parentNode.insertBefore(successMessage, newsletterForm.nextSibling);
                
                // Reset form after 3 seconds
                setTimeout(function() {
                    newsletterForm.reset();
                    emailInput.disabled = false;
                    newsletterForm.querySelector('button').disabled = false;
                    successMessage.remove();
                }, 3000);
            }
        });
    }
}