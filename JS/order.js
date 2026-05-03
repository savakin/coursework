// ===== ОПРЕДЕЛЕНИЕ УСЛУГИ ИЗ URL =====
const urlParams = new URLSearchParams(window.location.search);
const serviceType = urlParams.get('type');

// Сопоставление типов услуг
const services = {
    'studio': { name: 'Студийная фотосессия', formType: 'photo', price: 3000 },
    'wedding': { name: 'Свадебная съемка', formType: 'photo', price: 15000 },
    'documents': { name: 'Фото на документы', formType: 'doc', price: 500 },
    'retouch': { name: 'Обработка фото', formType: 'doc', price: 300 },
    'lovestory': { name: 'Love Story съемка', formType: 'photo', price: 4000 },
    'product': { name: 'Предметная съемка', formType: 'photo', price: 2000 }
};

// Храним название услуги и цену в переменных
let currentService = '';
let currentPrice = 0;

// ===== МОДАЛЬНОЕ ОКНО =====
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const photoForm = document.getElementById('photo-form');
const docForm = document.getElementById('doc-form');
const serviceBtns = document.querySelectorAll('.service-btn');

// Функция открытия модального окна
// Функция открытия модального окна
function openModal(serviceName, formType, price = 0) {
    currentService = serviceName;
    currentPrice = price;
    modalTitle.textContent = serviceName;
    
    // Показываем нужную форму
    if (formType === 'photo') {
        photoForm.style.display = 'block';
        docForm.style.display = 'none';
        // Заполняем скрытое поле названием услуги
        document.getElementById('photo-service-name').value = serviceName;
        calculatePhotoPrice();
    } else {
        photoForm.style.display = 'none';
        docForm.style.display = 'block';
        // Заполняем скрытое поле названием услуги
        document.getElementById('doc-service-name').value = serviceName;
        calculateDocPrice();
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== АВТООТКРЫТИЕ ПРИ ПЕРЕХОДЕ ИЗ УСЛУГ =====
if (serviceType && services[serviceType]) {
    const { name, formType, price } = services[serviceType];
    setTimeout(() => openModal(name, formType, price), 300);
}

// ===== КНОПКИ УСЛУГ НА СТРАНИЦЕ =====
serviceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const serviceName = this.textContent.trim();
        const price = Number(this.dataset.price) || 0; // ← БЕРЁМ ЦЕНУ ИЗ data-price
        openModal(serviceName, type, price);
    });
});

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Очищаем ВСЕ поля в обеих формах
    if (photoForm) {
        photoForm.reset();
        // Сбрасываем итоговую сумму
        if (photoTotal) photoTotal.textContent = '0';
        if (photoPriceInput) photoPriceInput.value = '0';
    }
    
    if (docForm) {
        docForm.reset();
        // Сбрасываем итоговую сумму
        if (total) total.textContent = '0';
        if (priceInput) priceInput.value = '0';
    }
    
    // Сбрасываем цену
    currentPrice = 0;
    
    // Очищаем URL от параметра
    if (serviceType) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


// ===== ОТПРАВКА ФОРМ =====
photoForm.addEventListener('submit', (e) => {
    // Проверяем, что цена посчитана
    if (!photoPriceInput.value || photoPriceInput.value === '0') {
        e.preventDefault();
        alert('Укажите количество часов');
        return;
    }
    // После успешной отправки очищаем (небольшая задержка для отправки)
    setTimeout(() => {
        photoForm.reset();
        if (photoTotal) photoTotal.textContent = '0';
        if (photoPriceInput) photoPriceInput.value = '0';
        currentPrice = 0;
        closeModal();
    }, 100);
});

docForm.addEventListener('submit', (e) => {
    // Проверяем, что цена посчитана
    if (!priceInput.value || priceInput.value === '0') {
        e.preventDefault();
        alert('Заполните все поля и укажите количество');
        return;
    }
    // После успешной отправки очищаем
    setTimeout(() => {
        docForm.reset();
        if (total) total.textContent = '0';
        if (priceInput) priceInput.value = '0';
        closeModal();
    }, 100);
});


// ===== РАСЧЁТ ДЛЯ DOC =====

const formatPrices = {
    1: 100,
    2: 150,
    3: 200
};

const typePrices = {
    1: 10,
    2: 20
};

const format = document.getElementById("format");
const type = document.getElementById("type");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total-price");
const priceInput = document.getElementById("price");

function calculateDocPrice() {
    if (!format || !type || !quantity) return;

    const formatPrice = formatPrices[format.value] || 0;
    const typePrice = typePrices[type.value] || 0;
    const qty = quantity.value || 0;

    const result = (formatPrice + typePrice) * qty;

    total.textContent = result;
    priceInput.value = result;
}

if (format && type && quantity) {
    format.addEventListener("change", calculateDocPrice);
    type.addEventListener("change", calculateDocPrice);
    quantity.addEventListener("input", calculateDocPrice);
}


// ===== РАСЧЁТ ДЛЯ PHOTO =====

const photoQty = document.getElementById("photo-quantity");
const photoTotal = document.getElementById("photo-total");
const photoPriceInput = document.getElementById("photo-price");

function calculatePhotoPrice() {
    if (!photoQty) return;

    const qty = photoQty.value || 0;
    const result = currentPrice * qty;

    photoTotal.textContent = result;
    photoPriceInput.value = result;
}

// при изменении количества
if (photoQty) {
    photoQty.addEventListener("input", calculatePhotoPrice);
}

// ===== ОТПРАВКА ФОРМ =====
photoForm.addEventListener('submit', (e) => {
    // Проверяем, что цена посчитана
    if (!photoPriceInput.value || photoPriceInput.value === '0') {
        e.preventDefault();
        alert('Укажите количество часов');
        return;
    }
});

docForm.addEventListener('submit', (e) => {
    // Проверяем, что цена посчитана
    if (!priceInput.value || priceInput.value === '0') {
        e.preventDefault();
        alert('Заполните все поля и укажите количество');
        return;
    }
});