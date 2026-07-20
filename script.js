document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 0. Dynamic Content Generation from config.js
    // =========================================
    if (typeof MANDAP_CONFIG !== 'undefined') {
        renderDynamicContent();
    }

    function renderDynamicContent() {
        // 1. Render Carousel Slides and Dots
        const slidesContainer = document.getElementById('carousel-slides-container');
        const dotsContainer = document.getElementById('carousel-dots-container');
        
        if (slidesContainer && MANDAP_CONFIG.carouselImages) {
            slidesContainer.innerHTML = MANDAP_CONFIG.carouselImages.map((img, idx) => `
                <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
                    <img src="${img.src}" alt="${img.alt}" class="carousel-img">
                </div>
            `).join('');
        }
        
        if (dotsContainer && MANDAP_CONFIG.carouselImages) {
            dotsContainer.innerHTML = MANDAP_CONFIG.carouselImages.map((_, idx) => `
                <span class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>
            `).join('');
        }

        // 2. Render Editorial Sections
        const editorialContainer = document.getElementById('editorial-sections-container');
        if (editorialContainer && MANDAP_CONFIG.editorialSections) {
            editorialContainer.innerHTML = MANDAP_CONFIG.editorialSections.map(section => `
                <section class="split-editorial-section section-padding-y">
                    <div class="container">
                        <div class="split-row ${section.reverse ? 'reverse' : ''}">
                            ${section.reverse ? `
                                <div class="split-col split-text col-6">
                                    <div class="split-text-inner">
                                        <h2 class="split-title">${section.title}</h2>
                                        <p class="split-paragraph">${section.paragraph}</p>
                                    </div>
                                </div>
                                <div class="split-col split-image col-6">
                                    <div class="image-wrapper">
                                        <img src="${section.imageSrc}" alt="${section.imageAlt}" class="editorial-img">
                                    </div>
                                </div>
                            ` : `
                                <div class="split-col split-image col-6">
                                    <div class="image-wrapper">
                                        <img src="${section.imageSrc}" alt="${section.imageAlt}" class="editorial-img">
                                    </div>
                                </div>
                                <div class="split-col split-text col-6">
                                    <div class="split-text-inner">
                                        <h2 class="split-title">${section.title}</h2>
                                        <p class="split-paragraph">${section.paragraph}</p>
                                    </div>
                                </div>
                            `}
                        </div>
                    </div>
                </section>
            `).join('');
        }

        // 3. Render Parallax Quote Section
        const parallaxContainer = document.getElementById('parallax-section-container');
        if (parallaxContainer && MANDAP_CONFIG.quoteDivider) {
            parallaxContainer.innerHTML = `
                <div class="container">
                    <div class="gallery-item col-12 full-bleed-hero-overlay">
                        <div class="image-wrapper">
                            <img src="${MANDAP_CONFIG.quoteDivider.imageSrc}" alt="${MANDAP_CONFIG.quoteDivider.imageAlt}" class="editorial-img">
                            <div class="image-overlay-content">
                                <h2 class="overlay-quote">"${MANDAP_CONFIG.quoteDivider.quote}"</h2>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // 4. Render Main Portfolio Grid
        const gridContainer = document.getElementById('portfolio-grid-container');
        if (gridContainer && MANDAP_CONFIG.galleryGrid && MANDAP_CONFIG.seeMoreCover) {
            let htmlContent = '';

            // Add the Cover Placeholder (First item in grid)
            htmlContent += `
                <div class="gallery-item col-12 full-bleed-hero-overlay see-more-placeholder-item visible">
                    <div class="image-wrapper">
                        <img src="${MANDAP_CONFIG.seeMoreCover.imageSrc}" alt="${MANDAP_CONFIG.seeMoreCover.imageAlt}" class="editorial-img placeholder-landscape-img">
                        <div class="glassy-see-more-overlay">
                            <div class="glassy-content">
                                <h3 class="glassy-title">${MANDAP_CONFIG.seeMoreCover.title}</h3>
                                <p class="glassy-subtitle">${MANDAP_CONFIG.seeMoreCover.subtitle}</p>
                                <button class="btn btn-gold see-more-btn" id="see-more-trigger">${MANDAP_CONFIG.seeMoreCover.buttonText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // repeating column pattern sequence
            const gridPattern = [6, 6, 5, 7, 6, 6, 12, 7, 5, 12, 5, 7, 12];

            // Render remaining images
            MANDAP_CONFIG.galleryGrid.forEach((img, idx) => {
                // Determine column size based on index in pattern (unless overridden)
                const colSize = img.colSize || gridPattern[idx % gridPattern.length];
                
                htmlContent += `
                    <div class="gallery-item col-${colSize} hidden-initially">
                        <div class="image-wrapper">
                            <img src="${img.src}" alt="${img.alt}" class="editorial-img">
                        </div>
                    </div>
                `;
            });

            gridContainer.innerHTML = htmlContent;
        }
    }

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

    // =========================================
    // 10. Image Carousel Controller
    // =========================================
    function initCarousel() {
        const container = document.querySelector('.carousel-container');
        if (!container) return;

        const slides = container.querySelectorAll('.carousel-slide');
        const dots = container.querySelectorAll('.carousel-dot');
        const prevBtn = container.querySelector('.carousel-control.prev');
        const nextBtn = container.querySelector('.carousel-control.next');
        
        let currentIndex = 0;
        let autoplayTimer = null;
        const autoplayInterval = 3000; // 3 seconds (swifter autoplay)

        function showSlide(index) {
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }

            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            const nextIndex = (currentIndex + 1) % slides.length;

            slides.forEach((slide, i) => {
                // Reset classes first
                slide.classList.remove('active', 'prev-slide', 'next-slide');
                
                if (i === currentIndex) {
                    slide.classList.add('active');
                } else if (i === prevIndex) {
                    slide.classList.add('prev-slide');
                } else if (i === nextIndex) {
                    slide.classList.add('next-slide');
                }
            });

            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, autoplayInterval);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
                startAutoplay();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index);
                startAutoplay();
            });
        });

        // Initial setup
        showSlide(0);
        startAutoplay();
    }

    initCarousel();

    // =========================================
    // 11. See More Interactive Portfolio Reveal
    // =========================================
    const seeMoreTrigger = document.getElementById('see-more-trigger');
    const glassyOverlay = document.querySelector('.glassy-see-more-overlay');
    const placeholderItem = document.querySelector('.see-more-placeholder-item');
    const mainPortfolio = document.querySelector('.gallery-section.main-portfolio');

    if (seeMoreTrigger && glassyOverlay && placeholderItem && mainPortfolio) {
        seeMoreTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 1. Fade out the glassy overlay
            glassyOverlay.classList.add('fade-out');

            // 2. Remove blur from the background landscape image
            placeholderItem.classList.add('revealed');

            // 3. Make all hidden portfolio grid items visible
            mainPortfolio.classList.add('is-visible');

            // 4. Clean up overlay from DOM after transition completes
            setTimeout(() => {
                glassyOverlay.style.display = 'none';
            }, 800);
        });
    }

    // Initialize Wizard
    updateWizard();
});
