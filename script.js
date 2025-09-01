// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
    });
  }

  // Slideshow (only on index.html)
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots-container');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let slideIndex = 0;
  let slideInterval;

  function showSlide(n) {
    if (!slides.length) return;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.style.display = i === slideIndex ? 'block' : 'none';
    });

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === slideIndex);
      });
    }
  }

  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }

  function prevSlideFunc() {
    slideIndex--;
    showSlide(slideIndex);
  }

  function createDots() {
    if (!dotsContainer || !slides.length) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.setAttribute('role', 'button');
      dot.tabIndex = 0;
      dot.addEventListener('click', () => {
        slideIndex = i;
        showSlide(slideIndex);
        resetInterval();
      });
      dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          slideIndex = i;
          showSlide(slideIndex);
          resetInterval();
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length) {
    createDots();
    showSlide(slideIndex);
    slideInterval = setInterval(nextSlide, 5000);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlideFunc();
        resetInterval();
      });
    }
  }

  // Running counters (only on index.html)
  const totalSalesEl = document.getElementById('total-sales');
  const totalViewsEl = document.getElementById('total-views');
  const happyCustomersEl = document.getElementById('happy-customers');

  function animateCounter(element, start, end, duration) {
    if (!element) return;
    let startTimestamp = null;
    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  if (totalSalesEl && totalViewsEl && happyCustomersEl) {
    // Example target numbers
    animateCounter(totalSalesEl, 0, 12500, 2500);
    animateCounter(totalViewsEl, 0, 98000, 2500);
    animateCounter(happyCustomersEl, 0, 4300, 2500);
  }

  // Subscription buttons hover & click effect
  const subscribeButtons = document.querySelectorAll('.subscribe-btn');
  subscribeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.textContent = 'Subscribed!';
      button.disabled = true;
      button.style.cursor = 'default';
      setTimeout(() => {
        button.textContent = 'Subscribe';
        button.disabled = false;
        button.style.cursor = 'pointer';
      }, 3000);
    });
  });
});