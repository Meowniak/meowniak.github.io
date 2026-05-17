document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li button');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 4. Tab Navigation Logic
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

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-tab');
            switchTab(targetId);
        });
    });

    // Handle "Request Quote" buttons in Pricing tab switching to Book Us tab
    const switchToBookingBtns = document.querySelectorAll('.switch-to-booking');
    switchToBookingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab('tab-booking');
        });
    });

    // 5. Dynamic Booking Form Checkboxes
    const eventTypeSelect = document.getElementById('event-type');
    const weddingOptions = document.getElementById('wedding-options');
    const corporateOptions = document.getElementById('corporate-options');

    if (eventTypeSelect) {
        eventTypeSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            
            // Hide all first
            weddingOptions.classList.add('hidden');
            corporateOptions.classList.add('hidden');

            // Show relevant based on selection
            if (selected === 'wedding') {
                weddingOptions.classList.remove('hidden');
            } else if (selected === 'corporate') {
                corporateOptions.classList.remove('hidden');
            }
        });
    }
});
