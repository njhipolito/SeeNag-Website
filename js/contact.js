document.addEventListener('DOMContentLoaded', function () {


  const faqContainer = document.querySelector('.faq-accordion');
  
  if (faqContainer) {
    const faqButtons = faqContainer.querySelectorAll('.faq-toggle-button');

    faqButtons.forEach(button => {
      button.addEventListener('click', function () {
        const targetId = this.getAttribute('aria-controls');
        const answer = document.getElementById(targetId);
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          this.setAttribute('aria-expanded', 'false');
          if (answer) {
            answer.setAttribute('hidden', '');
          
          }
          
        } 
        
        else {
          this.setAttribute('aria-expanded', 'true');
          
          if (answer) {
            answer.removeAttribute('hidden');
          
          }
        
        }
      
      });
    
    });
  
  }


  const form = document.getElementById('contactForm');
  
  if (form) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');

    const firstNameError = document.getElementById('firstNameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');


    [[firstNameInput, firstNameError], [emailInput, emailError], [messageInput, messageError]].forEach(([input, err]) => {
      
      if (input && err) {
        input.addEventListener('input', () => {
          input.setAttribute('aria-invalid', 'false');
          err.classList.remove('show');
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        
        });
      
      }
    
    });

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();


      let isValid = true;
      let firstInvalidField = null;


      firstNameInput.setAttribute('aria-invalid', 'false');
      firstNameError.classList.remove('show');
      emailInput.setAttribute('aria-invalid', 'false');
      emailError.classList.remove('show');
      messageInput.setAttribute('aria-invalid', 'false');
      messageError.classList.remove('show');
      formStatus.textContent = '';
      formStatus.className = 'form-status';


      if (!firstNameInput.value.trim()) {
        isValid = false;
        firstNameInput.setAttribute('aria-invalid', 'true');
        firstNameError.classList.add('show');
        if (!firstInvalidField) firstInvalidField = firstNameInput;
      
      }


      const emailVal = emailInput.value.trim();
      
      if (!emailVal || !validateEmail(emailVal)) {
        isValid = false;
        emailInput.setAttribute('aria-invalid', 'true');
        emailError.classList.add('show');
        
        if (!firstInvalidField) firstInvalidField = emailInput;
      
      }


      if (!messageInput.value.trim()) {
        isValid = false;
        messageInput.setAttribute('aria-invalid', 'true');
        messageError.classList.add('show');
        
        if (!firstInvalidField) firstInvalidField = messageInput;
      
      }

      if (!isValid) {
        
        if (firstInvalidField) {
          firstInvalidField.focus();
        
        }

        formStatus.textContent = 'Please fill out all required fields marked above.';
        formStatus.classList.add('error');
        return;
        
      }


      const subject = encodeURIComponent(`Seenag Inquiry from ${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`.trim());
      const bodyLines = [
        `Name: ${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`.trim(),
        `Email: ${emailInput.value.trim()}`,
        `Phone: ${phoneInput.value.trim() || 'Not provided'}`,
        ``,
        `Message:`,
        messageInput.value.trim()
      ];
      const body = encodeURIComponent(bodyLines.join('\r\n'));
      const mailtoUri = `mailto:hello@examplewebsite142.com?subject=${subject}&body=${body}`;


      formStatus.textContent = 'Opening your email app. If nothing opens, email us at hello@examplewebsite142.com.';
      formStatus.classList.add('success');

      window.location.href = mailtoUri;
    
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