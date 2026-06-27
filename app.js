
const menuToggle = document.getElementById('menu-toggle'); 
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');


if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        
        document.body.classList.toggle('dark-mode');
        
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}


const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    
    
    currentSlideIndex = (index + slides.length) % slides.length;
    
    
    slides[currentSlideIndex].classList.add('active');
}


if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
        resetTimer(); 
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
        resetTimer();
    });
}


function startTimer() {
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 4000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}


if (slides.length > 0) {
    startTimer();
}


const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalAgreeBtn = document.getElementById('modal-agree-btn');
const customModal = document.getElementById('custom-modal');

if (openModalBtn && customModal) {
    openModalBtn.addEventListener('click', () => {
        customModal.classList.add('show');
    });
}

function hideModal() {
    if (customModal) {
        customModal.classList.remove('show');
    }
}

if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
if (modalAgreeBtn) modalAgreeBtn.addEventListener('click', hideModal);

window.addEventListener('click', (event) => {
    if (event.target === customModal) {
        hideModal();
    }
});


const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('user-name');
const emailInput = document.getElementById('user-email');
const phoneInput = document.getElementById('user-phone');

function showError(inputElement, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    inputElement.style.borderColor = '#e74c3c';
}

function clearError(inputElement, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    inputElement.style.borderColor = '#2ecc71';
}

function validateName() {
    if (!nameInput) return true;
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, 'name-error', 'Name must be at least 3 characters long.');
        return false;
    } else {
        clearError(nameInput, 'name-error');
        return true;
    }
}

function validateEmail() {
    if (!emailInput) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address.');
        return false;
    } else {
        clearError(emailInput, 'email-error');
        return true;
    }
}

function validatePhone() {
    if (!phoneInput) return true;
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        showError(phoneInput, 'phone-error', 'Phone number must be exactly 10 numerical digits.'); // Fixed phonePhone typo here!
        return false;
    } else {
        clearError(phoneInput, 'phone-error');
        return true;
    }
}

if (nameInput) nameInput.addEventListener('input', validateName);
if (emailInput) emailInput.addEventListener('input', validateEmail);
if (phoneInput) phoneInput.addEventListener('input', validatePhone);

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();

        if (isNameValid && isEmailValid && isPhoneValid) {
            alert('🎉 Success! Your form was validated and submitted flawlessly.');
            contactForm.reset();
            if (nameInput) nameInput.style.borderColor = '#ccc';
            if (emailInput) emailInput.style.borderColor = '#ccc';
            if (phoneInput) phoneInput.style.borderColor = '#ccc';
        } else {
            alert('❌ Please correct the highlighted errors before submitting.');
        }
    });
}