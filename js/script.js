document.addEventListener('DOMContentLoaded', () => {

  // Carousel

  const container = document.getElementById('orderCarouselContainer');
  const cards = Array.from(document.querySelectorAll('.carousel-card'));
  const touchAreas = Array.from(document.querySelectorAll('#carouselDots .dot-btn-touch-area'));

  if (container && cards.length > 0) {
    let currentIndex = 0;
    const totalSlides = cards.length;
    let isDragging = false;
    let didDrag = false;
    let startX = 0;
    let diffX = 0;
    const threshold = 40;

    function updateCarousel(targetIndex) {
      currentIndex = (targetIndex + totalSlides) % totalSlides;

      cards.forEach((card, idx) => {
        card.classList.remove('active', 'next-preview', 'next-preview-2');

        if (idx === currentIndex) {
          card.classList.add('active');
          card.setAttribute('aria-hidden', 'false');

        } 
        
        else if (idx === (currentIndex + 1) % totalSlides) {
          card.classList.add('next-preview');
          card.setAttribute('aria-hidden', 'true');

        } 
        
        else {
          card.classList.add('next-preview-2');
          card.setAttribute('aria-hidden', 'true');

        }

      });

      touchAreas.forEach((area, idx) => {

        if (idx === currentIndex) {
          area.classList.add('active');
          area.setAttribute('aria-current', 'true');

        } 
        
        else {
          area.classList.remove('active');
          area.setAttribute('aria-current', 'false');

        }

      });
    
    }

    touchAreas.forEach((area, idx) => {
      area.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(idx);

      });

    });

    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {

        if (didDrag) {
          didDrag = false;
          return;

        }

        if (idx !== currentIndex && !isDragging) {
          updateCarousel(idx);

        }

      });

    });

    // For the keyboard navigation support

    container.addEventListener('keydown', (e) => {

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        updateCarousel(currentIndex + 1);

      } 
      
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        updateCarousel(currentIndex - 1);

      }

    });

    function handleDragStart(clientX) {
      didDrag = false;
      isDragging = true;
      startX = clientX;
      diffX = 0;

    }

    function handleDragMove(clientX) {

      if (!isDragging) return;
      diffX = clientX - startX;

    }

    function handleDragEnd() {

      if (!isDragging) return;
      isDragging = false;
      didDrag = Math.abs(diffX) > threshold;
      
      if (diffX < -threshold) {
        updateCarousel(currentIndex + 1);

      } 
      
      else if (diffX > threshold) {
        updateCarousel(currentIndex - 1);

      }

      diffX = 0;

    }

    container.addEventListener('mousedown', (e) => {
      handleDragStart(e.clientX);

    });

    window.addEventListener('mousemove', (e) => {

      if (isDragging) {
        handleDragMove(e.clientX);

      }

    });

    window.addEventListener('mouseup', () => {

      if (isDragging) {
        handleDragEnd();

      }

    });

    container.addEventListener('touchstart', (e) => {

      if (e.touches && e.touches.length > 0) {
        handleDragStart(e.touches[0].clientX);

      }

    }, { passive: true });

    container.addEventListener('touchmove', (e) => {

      if (e.touches && e.touches.length > 0 && isDragging) {
        handleDragMove(e.touches[0].clientX);

      }

    }, { passive: true });

    container.addEventListener('touchend', () => {
      handleDragEnd();

    });

    updateCarousel(0);

  }

  // Support for contactForm and Order email

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('[name="name"]') || contactForm.querySelector('#name');
      const emailInput = contactForm.querySelector('[name="email"]') || contactForm.querySelector('#email');
      const messageInput = contactForm.querySelector('[name="message"]') || contactForm.querySelector('#message');

      const name = nameInput ? nameInput.value : '';
      const email = emailInput ? emailInput.value : '';
      const message = messageInput ? messageInput.value : '';
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

      window.location.href = `mailto:hello@examplewebsite142.com?subject=${encodeURIComponent('Website inquiry from ' + name)}&body=${encodeURIComponent(body)}`;

      const feedback = document.getElementById('formFeedback');

      if (feedback) {
        feedback.classList.remove('d-none');
        feedback.textContent = 'Opening your email app... If nothing opens, please email us directly at hello@examplewebsite142.com.';
      
      }
      contactForm.reset();
    
    });

  }

  const orderEmailButtons = document.querySelectorAll('[data-action="order-email"]');
  
  if (orderEmailButtons && orderEmailButtons.length > 0) {
    orderEmailButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const product = btn.getAttribute('data-product') || 'Signature T-Shirt';
        const price = btn.getAttribute('data-price') || '';
        const sizeSelect = document.getElementById('sizeSelect') || document.getElementById('size') || document.querySelector('[name="size"]');
        const qtySelect = document.getElementById('quantitySelect') || document.getElementById('quantity') || document.querySelector('[name="quantity"]');
        const size = btn.getAttribute('data-size') || (sizeSelect ? sizeSelect.value : '');
        const quantity = btn.getAttribute('data-quantity') || (qtySelect ? qtySelect.value : '1');

        const subject = `Order Request: ${product}`;
        let bodyText = `Hello Seenag team,\n\nI would like to order:\nProduct: ${product}`;
        
        if (price) bodyText += `\nPrice: ${price}`;
        
        if (size) bodyText += `\nSize: ${size}`;
        bodyText += `\nQuantity: ${quantity}\nShipping Address:\n\nThank you!`;

        const mailto = `mailto:orders@examplewebsite142.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailto;
      
      });

    });

  }

});