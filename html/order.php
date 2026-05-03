<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Заказать</title>

    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/order.css">
</head>

<body>


    <!-- ===== HEADER ===== -->
    <header class="header">

        <div class="logo">
            <a href="./index.html"><img src="../img/logo.png" width="64" height="64" alt="логотип"></a>
        </div>

        <nav class="nav" id="nav">
            <a href="./services.html">Услуги</a>
            <a href="./reviews.html">Отзывы</a>
            <a href="./questions.html">Вопросы</a>
            <a href="./contacts.html">Контакты</a>
        </nav>

        <a href="./order.php" class="order-btn">
            Заказать
        </a>

        <!-- бургер меню -->
        <div class="burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </div>

    </header>
    <!-- ВЫБОР УСЛУГИ -->
    <section class="order-page">

        <h1>Выберите услугу</h1>

        <div class="services-grid">

            <button class="service-btn" data-type="photo" data-price="3000">Студийная фотосессия</button>
            <button class="service-btn" data-type="photo" data-price="15000">Свадебная съемка</button>
            <button class="service-btn" data-type="doc" data-price="500">Фото на документы</button>
            <button class="service-btn" data-type="doc" data-price="300">Обработка фото</button>
            <button class="service-btn" data-type="photo" data-price="4000">Love Story съемка</button>
            <button class="service-btn" data-type="photo" data-price="2000">Предметная съемка</button>

        </div>

    </section>

    <!-- MODAL -->
    <div class="modal" id="modal">  

        <div class="modal-content">

            <span class="close">&times;</span>

            <h2 id="modal-title">Оформление заказа</h2>

        <form id="photo-form" class="modal-form" method="POST" action="../server/order_handler.php">
            <input type="hidden" name="service_name" id="photo-service-name">
            <input type="date" name="shootingdate" required>
            <input type="text" name="location" placeholder="Место съемки" required>

            <input type="number" name="quantity" id="photo-quantity" placeholder="Количество часов" required min="1">

            <input type="text" name="name" placeholder="Ваше имя" required>
            <input type="text" name="phone" placeholder="Телефон" required>
            <input type="text" name="comments" placeholder="Комментарий">

            <input type="hidden" name="price" id="photo-price">
            <input type="hidden" name="type_order" value="photo">

            <p>Итого: <span id="photo-total">0</span> ₽</p>

            <button type="submit">Отправить заказ</button>

        </form>

        <form id="doc-form" class="modal-form" method="POST" action="../server/order_handler.php">
            <input type="hidden" name="service_name" id="doc-service-name">
            <select name="format" id="format" required>
                <option value="">Формат фото</option>
                <?php
                    $conn = new mysqli("localhost", "root", "", "course");
                    $result = $conn->query("SELECT id_format, name FROM formats");
                    while ($row = $result->fetch_assoc()) {
                        echo "<option value='{$row['id_format']}'>{$row['name']}</option>";
                    }
                ?>
            </select>

            <select name="type" id="type" required>
                <option value="">Тип бумаги</option>
                <?php
                    $result = $conn->query("SELECT id_type, name FROM types");
                    while ($row = $result->fetch_assoc()) {
                        echo "<option value='{$row['id_type']}'>{$row['name']}</option>";
                    }
                ?>
            </select>

            <input type="text" name="links" placeholder="Ссылка на Яндекс/Google Диск">

            <input type="number" name="quantity" id="quantity" placeholder="Количество фото" required min="1">

            <input type="text" name="name" placeholder="Ваше имя" required>
            <input type="text" name="phone" placeholder="Телефон" required>
            <input type="text" name="comments" placeholder="Комментарий">

            <input type="hidden" name="price" id="price">
            <input type="hidden" name="type_order" value="doc">

            <p>Итого: <span id="total-price">0</span> ₽</p>

            <button type="submit">Отправить заказ</button>

        </form>

        </div>

    </div>
    
    <footer class="footer" id="contacts">

        <div>
            <p>Телефон: +7 900 000 0000</p>
            <p>Email: info@mail.com</p>
            <p>Адрес: Ярославль, ул.Победы, 22</p>
        </div>

        <div class="social">
            <a href="https://vk.com/"><img src="../img/vk.png" alt="вк" width="32"></a>
            <a href="https://web.telegram.org/"><img src="../img/tg.png" alt="тг" width="32"></a>
            <a href="https://www.instagram.com/"><img src="../img/inst.png" alt="инста" width="32"></a>
        </div>

    </footer>

    <script src="../JS/order.js"></script>

</body>

</html>