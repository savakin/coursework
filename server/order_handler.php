<?php
$conn = new mysqli("localhost", "root", "", "course");

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

$name = $_POST['name'];
$phone = $_POST['phone'];
$comments = $_POST['comments'] ?? null;
$type_order = $_POST['type_order'];

// ===== ОПРЕДЕЛЯЕМ id_typeservice =====
$serviceName = $_POST['service_name'] ?? ''; // Название услуги из скрытого поля

// Ищем id_typeservice по названию
$stmt = $conn->prepare("SELECT id_typeservice FROM typeservice WHERE name = ?");
$stmt->bind_param("s", $serviceName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $id_typeservice = $row['id_typeservice'];
} else {
    // Если услуга не найдена — ставим NULL или 1 (по умолчанию)
    $id_typeservice = null;
}

// ===== ПОЛЬЗОВАТЕЛЬ =====
$stmt = $conn->prepare("SELECT id_user FROM users WHERE phone = ?");
$stmt->bind_param("s", $phone);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $id_user = $row['id_user'];
} else {
    $stmt = $conn->prepare("INSERT INTO users (name, phone) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $phone);
    $stmt->execute();
    $id_user = $stmt->insert_id;
}

$quantity = $_POST['quantity'] ?? 1;
$price = $_POST['price'] ?? null;

// ===== ВСТАВКА ЗАКАЗА =====
if ($type_order == "photo") {

    $location = $_POST['location'];
    $shootingdate = $_POST['shootingdate'];

    $stmt = $conn->prepare("
        INSERT INTO orders (id_user, comments, location, quantity, price, shootingdate, id_typeservice)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("issidsi", $id_user, $comments, $location, $quantity, $price, $shootingdate, $id_typeservice);

} else {

    $format = $_POST['format'];
    $type = $_POST['type'];
    $links = $_POST['links'] ?? null;

    $stmt = $conn->prepare("
        INSERT INTO orders (id_user, comments, links, quantity, price, id_format, id_type, id_typeservice)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("issidiii", $id_user, $comments, $links, $quantity, $price, $format, $type, $id_typeservice);
}

$stmt->execute();

echo "Заказ успешно оформлен!";
?>