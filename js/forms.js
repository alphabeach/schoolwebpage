// Form Validation and Handling
class FormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        this.setupValidation();
        this.setupSubmission();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const validationRules = {
            required: value => value.trim() !== '',
            email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: value => /^\+?[\d\s-]{8,}$/.test(value),
            minLength: (value, length) => value.length >= length,
            maxLength: (value, length) => value.length <= length
        };

        let isValid = true;
        const errorMessages = [];

        // Check required
        if (field.hasAttribute('required') && !validationRules.required(field.value)) {
            isValid = false;
            errorMessages.push('This field is required');
        }

        // Check email
        if (field.type === 'email' && field.value && !validationRules.email(field.value)) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
        }

        // Check phone
        if (field.dataset.type === 'phone' && field.value && !validationRules.phone(field.value)) {
            isValid = false;
            errorMessages.push('Please enter a valid phone number');
        }

        // Check min length
        if (field.dataset.minLength && !validationRules.minLength(field.value, parseInt(field.dataset.minLength))) {
            isValid = false;
            errorMessages.push(`Minimum ${field.dataset.minLength} characters required`);
        }

        this.updateFieldValidation(field, isValid, errorMessages);
        return isValid;
    }

    updateFieldValidation(field, isValid, messages) {
        const container = field.closest('.form-group');
        if (!container) return;

        container.classList.toggle('is-invalid', !isValid);
        container.classList.toggle('is-valid', isValid && field.value !== '');

        let errorDisplay = container.querySelector('.error-message');
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.className = 'error-message';
            container.appendChild(errorDisplay);
        }

        errorDisplay.textContent = messages.join('. ');
    }

    setupSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = this.form.querySelectorAll('input, textarea, select');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                this.submitForm();
            }
        });
    }

    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        this.showMessage('Form submitted successfully!', 'success');
        
        // Reset form
        this.form.reset();
        this.form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
    }

    showMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `alert alert-${type}`;
        messageElement.textContent = message;

        this.form.insertAdjacentElement('beforebegin', messageElement);

        setTimeout(() => messageElement.remove(), 5000);
    }
}

// Newsletter Subscription
class NewsletterForm {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = this.form.querySelector('input[type="email"]').value;
            if (this.validateEmail(email)) {
                this.subscribe(email);
            }
        });
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    subscribe(email) {
        // Here you would typically send the subscription request to a server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.textContent = 'Thank you for subscribing!';
        
        this.form.insertAdjacentElement('beforebegin', message);
        this.form.reset();

        setTimeout(() => message.remove(), 5000);
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize admission form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        new FormValidator(admissionForm);
    }

    // Initialize feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        new FormValidator(feedbackForm);
    }

    // Initialize newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        new NewsletterForm(newsletterForm);
    }
});