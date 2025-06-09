// All functionality functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.navbar-nav');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('.navbar-nav') && 
                !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    const scrollTop = document.querySelector('.scroll-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollTop) scrollTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (scrollTop) scrollTop.classList.remove('active');
        }

        // Update active navigation link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to top functionality
    if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
}

// Project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        return;
    }

    // Initialize EmailJS with your Public Key.
    // You can find your Public Key in your EmailJS dashboard under Email Services -> API Keys.
    emailjs.init("i-A0mSr_14xew95Lk"); 

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic form validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send email using EmailJS
            // Make sure "service_6zgn7ww" is your correct Service ID and "template_ziwkefk" is your correct Template ID.
            await emailjs.send("service_6zgn7ww", "template_ziwkefk", {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: "sandiegoles8@gmail.com" // Ensure this is the correct recipient email address
            });

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            // Show error message
            console.error('EmailJS send error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Certificate Modal functionality
function initializeCertificateModal() {
    const certImages = document.querySelectorAll('.certificate-img');
    const certModal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');

    if (certImages.length > 0 && certModal && modalImg && modalClose) {
        certImages.forEach(img => {
            img.addEventListener('click', function() {
                certModal.classList.add('active');
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                modalImg.classList.remove('zoomed');
            });
            img.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    certModal.classList.add('active');
                    modalImg.src = this.src;
                    modalImg.alt = this.alt;
                    modalImg.classList.remove('zoomed');
                }
            });
        });

        // Add zoom functionality
        modalImg.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });

        modalClose.addEventListener('click', function() {
            certModal.classList.remove('active');
            modalImg.src = '';
            modalImg.classList.remove('zoomed');
        });

        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                certModal.classList.remove('active');
                modalImg.src = '';
                modalImg.classList.remove('zoomed');
            }
        });

        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (certModal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    certModal.classList.remove('active');
                    modalImg.src = '';
                    modalImg.classList.remove('zoomed');
                }
            }
        });
    }
}

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// Mouse Parallax Effect
document.addEventListener('DOMContentLoaded', () => {
  const parallaxElement = document.querySelector('.parallax-element');
  const shapes = document.querySelectorAll('.shape');

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Move shapes based on mouse position
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.2;
      const x = (mouseX - 0.5) * speed * 100;
      const y = (mouseY - 0.5) * speed * 100;
      const z = (mouseX - 0.5) * speed * 50;

      shape.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    });

    // Move parallax element
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    parallaxElement.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });

  // Reset position when mouse leaves window
  document.addEventListener('mouseleave', () => {
    shapes.forEach(shape => {
      shape.style.transform = 'translate3d(0, 0, 0)';
    });
    parallaxElement.style.transform = 'translate3d(0, 0, 0)';
  });
});
