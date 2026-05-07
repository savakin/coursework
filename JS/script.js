// ===== БУРГЕР МЕНЮ =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// ===== HERO СЛАЙДЕР =====
let slides = document.querySelectorAll(".slide");
let index = 0;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let slideInterval;

function showSlide(i) {
    if (!slides.length) return;
    
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides[i]) {
        slides[i].classList.add("active");
    }
}

function nextSlide() {
    if (!slides.length) return;
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    if (!slides.length) return;
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

// Кнопки вперед/назад
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });
}

// Автопрокрутка
function startAutoSlide() {
    if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, 8000); 
    }
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

if (slides.length) {
    showSlide(index);
    startAutoSlide();
}







