/* ================================================
   CONT4XT.AI — MAIN JS
   ================================================ */

// ----- Nav scroll behavior -----

const nav = document.getElementById('site-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ----- Mobile nav toggle -----

const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ----- Smooth scroll with fixed-nav offset -----

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ----- Edu waitlist form -----

const eduForm    = document.getElementById('edu-form');
const eduSuccess = document.getElementById('edu-success');

if (eduForm) {
  eduForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!eduForm.checkValidity()) { eduForm.reportValidity(); return; }
    const name  = eduForm.querySelector('[name="name"]').value.trim();
    const email = eduForm.querySelector('[name="email"]').value.trim();

    // TODO: replace with actual email service endpoint (ConvertKit, Mailchimp, etc.)
    // fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ name, email }) })

    eduForm.style.display = 'none';
    eduSuccess.style.display = 'block';
  });
}

// ----- Contact form -----

const contactForm    = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

    const name     = contactForm.querySelector('[name="name"]').value.trim();
    const company  = contactForm.querySelector('[name="company"]').value.trim();
    const email    = contactForm.querySelector('[name="email"]').value.trim();
    const interest = contactForm.querySelector('[name="interest"]').value;
    const message  = contactForm.querySelector('[name="message"]').value.trim();

    // Build mailto as MVP fallback; replace with a backend endpoint when ready
    const subject = encodeURIComponent(
      `Cont4xt.ai Inquiry${interest ? ' — ' + interest : ''}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company || 'N/A'}\nEmail: ${email}\nInterest: ${interest || 'Not specified'}\n\n${message}`
    );

    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';

    // Open mailto after a short delay so the success state is visible first
    setTimeout(() => {
      window.location.href = `mailto:hello@cont4xt.ai?subject=${subject}&body=${body}`;
    }, 600);
  });
}
