// ===== ОПРЕДЕЛЕНИЕ УСЛУГИ ИЗ URL =====
const urlParams = new URLSearchParams(window.location.search);
const serviceType = urlParams.get('type');

const services = {
    'studio': { name: 'Студийная фотосессия', formType: 'photo' },
    'wedding': { name: 'Свадебная съемка', formType: 'photo' },
    'documents': { name: 'Фото на документы', formType: 'doc' },
    'retouch': { name: 'Обработка фото', formType: 'doc' },
    'lovestory': { name: 'Love Story съемка', formType: 'photo' },
    'product': { name: 'Предметная съемка', formType: 'photo' }
};

let currentService = '';
let currentPrice = 0;
let currentServiceId = 0;

const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const photoForm = document.getElementById('photo-form');
const docForm = document.getElementById('doc-form');
const serviceBtns = document.querySelectorAll('.service-btn');

// Открытие модального окна
function openModal(serviceName, formType, price = 0, serviceId = 0) {
    currentService = serviceName;
    currentPrice = price;
    currentServiceId = serviceId;
    modalTitle.textContent = serviceName;
    
    // Скрываем все формы
    photoForm.style.display = 'none';
    docForm.style.display = 'none';
    
    if (formType === 'photo') {
        photoForm.style.display = 'block';
        document.getElementById('photo-service-name').value = serviceName;
        document.getElementById('photo-service-id').value = serviceId;
        calculatePhotoPrice();
    } else {
        docForm.style.display = 'block';
        document.getElementById('doc-service-name').value = serviceName;
        document.getElementById('doc-service-id').value = serviceId;
        calculateDocPrice();
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Автоматическое открытие при переходе из услуг
if (serviceType && services[serviceType]) {
    const { name, formType } = services[serviceType];
    setTimeout(() => {
        const btn = Array.from(serviceBtns).find(b => b.textContent.trim() === name);
        if (btn) {
            const price = Number(btn.dataset.price) || 0;
            const serviceId = Number(btn.dataset.serviceId) || 0;
            openModal(name, formType, price, serviceId);
        }
    }, 300);
}

// Назначение обработчиков для кнопок услуг
serviceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const serviceName = this.textContent.trim();
        const price = Number(this.dataset.price) || 0;
        const serviceId = Number(this.dataset.serviceId) || 0;
        openModal(serviceName, type, price, serviceId);
    });
});

// Закрытие модального окна
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    if (photoForm) {
        photoForm.reset();
        document.getElementById('photo-total').textContent = '0';
        document.getElementById('photo-price').value = '0';
    }
    if (docForm) {
        docForm.reset();
        document.getElementById('total-price').textContent = '0';
        document.getElementById('price').value = '0';
    }
    currentPrice = 0;
    currentServiceId = 0;
    
    // Убираем параметр из URL
    if (serviceType) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// ===== РАСЧЁТ СТОИМОСТИ ДЛЯ ПЕЧАТИ =====
const formatSelect = document.getElementById("format");
const typeSelect = document.getElementById("type");
const quantityInput = document.getElementById("quantity");
const totalSpan = document.getElementById("total-price");
const priceInput = document.getElementById("price");

function calculateDocPrice() {
    if (!formatSelect || !typeSelect || !quantityInput) return;
    const selectedFormat = formatSelect.options[formatSelect.selectedIndex];
    const selectedType = typeSelect.options[typeSelect.selectedIndex];
    const formatPrice = selectedFormat ? Number(selectedFormat.dataset.price) || 0 : 0;
    const typePrice = selectedType ? Number(selectedType.dataset.price) || 0 : 0;
    const qty = Number(quantityInput.value) || 0;
    const result = (formatPrice + typePrice) * qty;
    if (totalSpan) totalSpan.textContent = result;
    if (priceInput) priceInput.value = result;
}

if (formatSelect && typeSelect && quantityInput) {
    formatSelect.addEventListener("change", calculateDocPrice);
    typeSelect.addEventListener("change", calculateDocPrice);
    quantityInput.addEventListener("input", calculateDocPrice);
}

// ===== РАСЧЁТ СТОИМОСТИ ДЛЯ ФОТОСЕССИЙ =====
const photoQty = document.getElementById("photo-quantity");
const photoTotal = document.getElementById("photo-total");
const photoPriceInput = document.getElementById("photo-price");

function calculatePhotoPrice() {
    if (!photoQty) return;
    const qty = Number(photoQty.value) || 0;
    const result = currentPrice * qty;
    if (photoTotal) photoTotal.textContent = result;
    if (photoPriceInput) photoPriceInput.value = result;
}

if (photoQty) {
    photoQty.addEventListener("input", calculatePhotoPrice);
}

// ===== AJAX-ОТПРАВКА ФОРМ =====
function handleFormSubmit(form, priceInputId, totalSpanId) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const priceInput = document.getElementById(priceInputId);
        if (!priceInput || !priceInput.value || priceInput.value === '0') {
            alert('Пожалуйста, заполните все обязательные поля и проверьте стоимость.');
            return;
        }
        
        const formData = new FormData(form);
        const msgDiv = document.getElementById('order-message');
        if (msgDiv) msgDiv.style.display = 'none';
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (msgDiv) {
                msgDiv.style.display = 'block';
                if (data.includes('успешно') || data.toLowerCase().includes('success')) {
                    msgDiv.textContent = 'Заказ успешно оформлен!';
                    msgDiv.style.color = 'green';
                    // Сброс формы и закрытие через 2 секунды
                    form.reset();
                    if (totalSpanId === 'photo-total') {
                        document.getElementById('photo-total').textContent = '0';
                    } else {
                        document.getElementById('total-price').textContent = '0';
                    }
                    priceInput.value = '0';
                    setTimeout(() => {
                        closeModal();
                        if (msgDiv) msgDiv.style.display = 'none';
                    }, 2000);
                } else {
                    msgDiv.textContent = 'Ошибка: ' + data;
                    msgDiv.style.color = 'red';
                }
            }
        })
        .catch(error => {
            if (msgDiv) {
                msgDiv.style.display = 'block';
                msgDiv.textContent = 'Ошибка сети: ' + error.message;
                msgDiv.style.color = 'red';
            }
        });
    });
}

if (photoForm) handleFormSubmit(photoForm, 'photo-price', 'photo-total');
if (docForm) handleFormSubmit(docForm, 'price', 'total-price');