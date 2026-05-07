<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "course";

// Подключение к БД
$conn = new mysqli($host, $user, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получаем данные из формы
$name = $_POST['name'];
$comments = $_POST['comments'];
$numberStars = $_POST['numberStars'];

$sql = "INSERT INTO reviews (name, comments, numberStars)
        VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $name, $comments, $numberStars);

// Выполнение
if ($stmt->execute()) {
    echo "Отзыв успешно добавлен!";
} else {
    echo "Ошибка: " . $stmt->error;
}

// Закрытие
$stmt->close();
$conn->close();
?>