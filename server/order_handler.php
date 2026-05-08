<?php
$conn = new mysqli("localhost", "root", "", "course");

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$comments = $_POST['comments'] ?? null;
$type_order = $_POST['type_order'];
if (empty($name) || empty($phone)) {
    die("Имя или телефон не получены");
}
// ===== ОПРЕДЕЛЯЕМ id_typeservice =====
// Теперь получаем ID из скрытого поля или по имени
$service_id = $_POST['service_id'] ?? null;

if ($service_id) {
    $id_typeservice = $service_id;
} else {
    $serviceName = $_POST['service_name'] ?? '';
    $stmt = $conn->prepare("SELECT id_typeservice FROM typeservice WHERE name = ?");
    $stmt->bind_param("s", $serviceName);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $id_typeservice = $row['id_typeservice'] ?? null;
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