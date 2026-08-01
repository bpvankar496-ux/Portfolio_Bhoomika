// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Fade In Animation =====
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

faders.forEach(el => observer.observe(el));

// ===== Contact Form Submit =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.style.color = '#e74c3c';
      return;
    }

    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#f5c542';

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();

      if (data.success) {
        formStatus.textContent = '✅ Message sent successfully!';
        formStatus.style.color = '#2ecc71';
        contactForm.reset();
      } else {
        formStatus.textContent = '❌ Something went wrong. Try emailing directly.';
        formStatus.style.color = '#e74c3c';
      }
    } catch (err) {
      formStatus.textContent = '❌ Server error. Try emailing directly.';
      formStatus.style.color = '#e74c3c';
    }
  });
}