// ===== ОПРЕДЕЛЕНИЕ УСЛУГИ ИЗ URL =====
const urlParams = new URLSearchParams(window.location.search);
const serviceType = urlParams.get('type');

// Сопоставление типов услуг (теперь только для автооткрытия)
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

// ===== МОДАЛЬНОЕ ОКНО =====
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const photoForm = document.getElementById('photo-form');
const docForm = document.getElementById('doc-form');
const serviceBtns = document.querySelectorAll('.service-btn');

function openModal(serviceName, formType, price = 0, serviceId = 0) {
    currentService = serviceName;
    currentPrice = price;
    currentServiceId = serviceId;
    modalTitle.textContent = serviceName;
    
    if (formType === 'photo') {
        photoForm.style.display = 'block';
        docForm.style.display = 'none';
        document.getElementById('photo-service-name').value = serviceName;
        // Добавляем service_id в скрытое поле
        let photoServiceId = document.getElementById('photo-service-id');
        if (!photoServiceId) {
            photoServiceId = document.createElement('input');
            photoServiceId.type = 'hidden';
            photoServiceId.name = 'service_id';
            photoServiceId.id = 'photo-service-id';
            photoForm.appendChild(photoServiceId);
        }
        photoServiceId.value = serviceId;
        calculatePhotoPrice();
    } else {
        photoForm.style.display = 'none';
        docForm.style.display = 'block';
        document.getElementById('doc-service-name').value = serviceName;
        let docServiceId = document.getElementById('doc-service-id');
        if (!docServiceId) {
            docServiceId = document.createElement('input');
            docServiceId.type = 'hidden';
            docServiceId.name = 'service_id';
            docServiceId.id = 'doc-service-id';
            docForm.appendChild(docServiceId);
        }
        docServiceId.value = serviceId;
        calculateDocPrice();
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== АВТООТКРЫТИЕ =====
if (serviceType && services[serviceType]) {
    const { name, formType } = services[serviceType];
    // Нужно получить цену и id из кнопки или отдельным запросом
    setTimeout(() => {
        const btn = Array.from(serviceBtns).find(b => b.textContent.trim() === name);
        if (btn) {
            const price = Number(btn.dataset.price) || 0;
            const serviceId = Number(btn.dataset.serviceId) || 0;
            openModal(name, formType, price, serviceId);
        }
    }, 300);
}

// ===== КНОПКИ УСЛУГ =====
serviceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const serviceName = this.textContent.trim();
        const price = Number(this.dataset.price) || 0;
        const serviceId = Number(this.dataset.serviceId) || 0;
        openModal(serviceName, type, price, serviceId);
    });
});

// ===== ЗАКРЫТИЕ =====
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    if (photoForm) {
        photoForm.reset();
        const photoTotal = document.getElementById('photo-total');
        const photoPriceInput = document.getElementById('photo-price');
        if (photoTotal) photoTotal.textContent = '0';
        if (photoPriceInput) photoPriceInput.value = '0';
    }
    
    if (docForm) {
        docForm.reset();
        const total = document.getElementById('total-price');
        const priceInput = document.getElementById('price');
        if (total) total.textContent = '0';
        if (priceInput) priceInput.value = '0';
    }
    
    currentPrice = 0;
    currentServiceId = 0;
    
    if (serviceType) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// ===== РАСЧЁТ ДЛЯ DOC (с ценами из data-атрибутов) =====
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

// ===== РАСЧЁТ ДЛЯ PHOTO (цена за час из currentPrice) =====
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

// ===== ОТПРАВКА ФОРМ =====
if (photoForm) {
    photoForm.addEventListener('submit', (e) => {
        if (!photoPriceInput || !photoPriceInput.value || photoPriceInput.value === '0') {
            e.preventDefault();
            alert('Укажите количество часов');
        }
    });
}

if (docForm) {
    docForm.addEventListener('submit', (e) => {
        if (!priceInput || !priceInput.value || priceInput.value === '0') {
            e.preventDefault();
            alert('Выберите формат, тип бумаги и укажите количество фото');
        }
    });
}