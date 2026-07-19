document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. Copyright Year Auto-Update
    // =========================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =========================================
    // 2. Sticky Glassmorphic Navbar Scroll Effect
    // =========================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }



    // =========================================
    // 4. Mobile Menu Toggle
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelectorAll('.nav-links li button');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // =========================================
    // 5. Tab Navigation & Smooth Transitions
    // =========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetId) {
        // Remove active from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active to targeted elements
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
        const targetContent = document.getElementById(targetId);

        if (targetBtn) targetBtn.classList.add('active');
        if (targetContent) targetContent.classList.add('active');

        // Close mobile menu if open
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }

        // Scroll to top with smooth effect
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-tab');
            switchTab(targetId);
        });
    });

    // Make brand logo clickable and navigate home
    const logoHome = document.getElementById('logo-home');
    if (logoHome) {
        logoHome.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('tab-home');
        });
    }



    // =========================================
    // 7. Dynamic Booking Form Checkboxes
    // =========================================
    const eventTypeSelect = document.getElementById('event-type');
    const weddingOptions = document.getElementById('wedding-options');
    const corporateOptions = document.getElementById('corporate-options');

    if (eventTypeSelect) {
        eventTypeSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            
            // Hide all first
            if (weddingOptions) weddingOptions.classList.add('hidden');
            if (corporateOptions) corporateOptions.classList.add('hidden');

            // Show relevant based on selection
            if (selected === 'wedding' && weddingOptions) {
                weddingOptions.classList.remove('hidden');
            } else if (selected === 'corporate' && corporateOptions) {
                corporateOptions.classList.remove('hidden');
            }
        });
    }

    // =========================================
    // 8. Luxury Booking Wizard (Multi-Step Form)
    // =========================================
    const wizardSteps = document.querySelectorAll('.wizard-step-content');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const bookingForm = document.getElementById('booking-form');
    let currentStep = 1;

    function updateWizard() {
        // Update Step Active Class
        wizardSteps.forEach((step, idx) => {
            if (idx + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update Progress Steps Indicators
        progressSteps.forEach((step, idx) => {
            if (idx + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else if (idx + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update Progress Bar Line Fill Width
        if (progressBarFill) {
            const progressPercent = ((currentStep - 1) / (progressSteps.length - 1)) * 100;
            progressBarFill.style.width = `${progressPercent}%`;
        }

        // Show/Hide Back Button
        if (currentStep === 1) {
            if (btnBack) btnBack.classList.add('hidden');
        } else {
            if (btnBack) btnBack.classList.remove('hidden');
        }

        // Change Next Button Text on Final Step
        if (btnNext) {
            if (currentStep === wizardSteps.length) {
                btnNext.textContent = 'Submit Inquiry';
                btnNext.classList.remove('btn-gold');
                btnNext.classList.add('btn-primary');
            } else {
                btnNext.textContent = 'Continue';
                btnNext.classList.remove('btn-primary');
                btnNext.classList.add('btn-gold');
            }
        }
    }

    // Validate current step inputs
    function validateStep(stepNum) {
        const stepContainer = document.querySelector(`.wizard-step-content[data-step="${stepNum}"]`);
        if (!stepContainer) return true;

        const inputs = stepContainer.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim() || (input.tagName === 'SELECT' && input.value === '')) {
                isValid = false;
                input.style.borderBottomColor = '#E26D6D'; // Alert red
                
                // Add a listener to reset border color on input
                input.addEventListener('input', () => {
                    input.style.borderBottomColor = '';
                }, { once: true });
                if (input.tagName === 'SELECT') {
                    input.addEventListener('change', () => {
                        input.style.borderBottomColor = '';
                    }, { once: true });
                }
            } else {
                input.style.borderBottomColor = '';
            }
        });

        return isValid;
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            // Validate step before moving forward
            if (!validateStep(currentStep)) {
                return;
            }

            if (currentStep < wizardSteps.length) {
                currentStep++;
                updateWizard();
            } else {
                // Submit Form (trigger form submit event)
                if (bookingForm) {
                    bookingForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });
    }

    // Final Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const eventType = document.getElementById('event-type').value;
            const message = document.getElementById('message').value;
            
            // Gather selected checkboxes
            let selectedEvents = [];
            if (eventType === 'wedding') {
                const checkboxes = document.querySelectorAll('input[name="wedding_events"]:checked');
                checkboxes.forEach(cb => {
                    selectedEvents.push(cb.parentNode.textContent.trim());
                });
            } else if (eventType === 'corporate') {
                const checkboxes = document.querySelectorAll('input[name="corp_events"]:checked');
                checkboxes.forEach(cb => {
                    selectedEvents.push(cb.parentNode.textContent.trim());
                });
            }
            
            const eventsList = selectedEvents.length > 0 ? selectedEvents.join(', ') : 'None selected';
            
            // Format WhatsApp Message
            const whatsappText = `Hello Mandap Events,\n\nI would like to check your availability. Here are the details:\n\n*Name:* ${name}\n*Email:* ${email}\n*Date:* ${date}\n*Celebrating:* ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}\n*Events:* ${eventsList}\n*Message/Vision:* ${message}`;
            
            const encodedText = encodeURIComponent(whatsappText);
            const whatsappUrl = `https://wa.me/9779856088522?text=${encodedText}`;
            
            // Open WhatsApp in new tab securely
            window.open(whatsappUrl, '_blank');
            
            // Reset Wizard and Form
            bookingForm.reset();
            currentStep = 1;
            updateWizard();
            
            // Reset Dynamic selections
            if (weddingOptions) weddingOptions.classList.add('hidden');
            if (corporateOptions) corporateOptions.classList.add('hidden');
            
            // Switch to Home
            switchTab('tab-home');
        });
    }

    // =========================================
    // 9. Scroll Reveal Animation for Gallery Items
    // =========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    if ('IntersectionObserver' in window && galleryItems.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);
        
        galleryItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for older browsers
        galleryItems.forEach(item => item.classList.add('visible'));
    }

    // Initialize Wizard
    updateWizard();
});
