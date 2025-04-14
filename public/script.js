// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Welcome Text Animation
    const textWrapper = document.querySelector('.animated-text .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.animated-text .letter',
            translateY: ["1.1em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [180, 0],
            duration: 750,
            easing: "easeOutExpo",
            delay: (el, i) => 50 * i
        });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Event Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.event-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tab buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to current tab button and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = '#fff';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    // Show success message
                    showNotification('Success! Your message has been sent.', 'success');
                    contactForm.reset();
                } else {
                    // Show error message
                    showNotification('Error sending message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Something went wrong. Please try again later.', 'error');
            }
        });
    }

    // Helper function to show notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Newsletter Subscription
    const subscribeForm = document.getElementById('subscribeForm');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get email value
            const email = this.querySelector('input[type="email"]').value;

            // Simulating subscription process
            // In a real application, this would be an AJAX request to your backend

            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});




