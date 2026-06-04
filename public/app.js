document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // ==========================================
  // 4. Statistics Counter Animation
  // ==========================================
  const statsSection = document.getElementById('statistics');
  const counters = document.querySelectorAll('.counter-val');
  let started = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  };

  if (statsSection && counters.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach(counter => countUp(counter));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 5. Portfolio Filtering Logic
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active classes
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-slate-800', 'dark:text-gray-300');
      });

      // Add active to current
      btn.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-slate-800', 'dark:text-gray-300');
      btn.classList.add('bg-blue-600', 'text-white');

      const filterVal = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        // Fade out transition
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (filterVal === 'all' || item.getAttribute('data-category') === filterVal) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        }, 300);
      });
    });
  });



  // ==========================================
  // 7. Contact Form Validation and Submission
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name');
      const email = document.getElementById('form-email');
      const phone = document.getElementById('form-phone');
      const subject = document.getElementById('form-subject');
      const message = document.getElementById('form-message');

      let isValid = true;

      // Simple Validation Styling helper
      const toggleError = (inputEl, hasError) => {
        const errorMsgEl = inputEl.nextElementSibling;
        if (hasError) {
          inputEl.classList.add('border-red-500', 'focus:ring-red-400');
          inputEl.classList.remove('border-gray-300', 'focus:ring-blue-500', 'dark:border-slate-700');
          if (errorMsgEl && errorMsgEl.classList.contains('error-msg')) {
            errorMsgEl.classList.remove('hidden');
          }
          isValid = false;
        } else {
          inputEl.classList.remove('border-red-500', 'focus:ring-red-400');
          inputEl.classList.add('border-gray-300', 'focus:ring-blue-500', 'dark:border-slate-700');
          if (errorMsgEl && errorMsgEl.classList.contains('error-msg')) {
            errorMsgEl.classList.add('hidden');
          }
        }
      };

      // Check Name
      toggleError(name, name.value.trim() === '');

      // Check Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      toggleError(email, !emailRegex.test(email.value.trim()));

      // Check Subject
      toggleError(subject, subject.value === '');

      // Check Message
      toggleError(message, message.value.trim() === '');

      if (isValid) {
        // Show success alert
        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('hidden');
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Clear inputs
          contactForm.reset();

          // Hide alert after 5 seconds
          setTimeout(() => {
            formSuccessAlert.classList.add('hidden');
          }, 5000);
        }
      }
    });
  }

  // Active Navigation link highlighting on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-blue-600', 'dark:text-blue-400');
      }
    });
  });
});
