// Handles automated item transitions on portfolio layouts
export function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlideIndex = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (index + slides.length) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
    }
}