-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 08 2026 г., 02:15
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `course`
--

-- --------------------------------------------------------

--
-- Структура таблицы `formats`
--

CREATE TABLE `formats` (
  `id_format` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `formats`
--

INSERT INTO `formats` (`id_format`, `name`, `price`) VALUES
(1, '3х4', 30),
(2, '4х6', 40),
(3, '5x7', 50),
(4, '9x13', 60),
(5, '10x15', 70),
(6, '13x18', 80),
(7, '15x21', 90);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `comments` varchar(256) DEFAULT NULL,
  `links` varchar(2048) DEFAULT NULL,
  `location` varchar(1024) DEFAULT NULL,
  `shootingdate` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `id_format` int(11) DEFAULT NULL,
  `id_type` int(11) DEFAULT NULL,
  `id_typeservice` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `comments`, `links`, `location`, `shootingdate`, `price`, `quantity`, `id_format`, `id_type`, `id_typeservice`, `created_at`) VALUES
(25, 6, 'на послезавтра', 'https://drive.google.com/file/d/1zZin890YS2dG7_v31giqG2Zpa8LddxrD/view?usp=drive_link', NULL, NULL, 188.00, 4, 2, 3, 3, '2026-05-08 03:03:33'),
(26, 8, '', NULL, 'г. Ярославль, ул. Некрасова 60А', '2026-05-10', 6000.00, 2, NULL, NULL, 1, '2026-05-08 03:04:01');

-- --------------------------------------------------------

--
-- Структура таблицы `quest`
--

CREATE TABLE `quest` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `quest`
--

INSERT INTO `quest` (`id`, `name`, `email`, `question`) VALUES
(7, 'Савелий', 'savelijvolkov105@gmail.com', 'Где можно забрать заказ?');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id_review` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `comments` varchar(256) DEFAULT NULL,
  `numberStars` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id_review`, `name`, `comments`, `numberStars`) VALUES
(4, 'Савелий', 'куц', 0),
(5, 'Савелий', 'fsd', 4),
(11, 'Савелий', 'Всё понравилось!', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id_type` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id_type`, `name`, `price`) VALUES
(1, 'Глянцевая', 5),
(2, 'Матовая', 5),
(3, 'Полуглянцевая', 7),
(4, 'Сатиновая', 8),
(5, 'Шёлковая', 10),
(6, 'Текстурная', 12),
(7, 'Металлизированная', 15);

-- --------------------------------------------------------

--
-- Структура таблицы `typeservice`
--

CREATE TABLE `typeservice` (
  `id_typeservice` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `typeservice`
--

INSERT INTO `typeservice` (`id_typeservice`, `name`, `price`) VALUES
(1, 'Студийная фотосессия', 3000),
(2, 'Свадебная съемка', 15000),
(3, 'Фото на документы', 500),
(4, 'Обработка фото', 300),
(5, 'Love Story съемка', 4000),
(6, 'Предметная съемка', 2000);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `name`, `phone`) VALUES
(6, 'Савелий', '+79012735924'),
(7, 'Анастасия', '+79012735921'),
(8, 'Анастасия', '+79012735922');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `formats`
--
ALTER TABLE `formats`
  ADD PRIMARY KEY (`id_format`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_format` (`id_format`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `idx_typeservice` (`id_typeservice`);

--
-- Индексы таблицы `quest`
--
ALTER TABLE `quest`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id_review`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_type`);

--
-- Индексы таблицы `typeservice`
--
ALTER TABLE `typeservice`
  ADD PRIMARY KEY (`id_typeservice`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `formats`
--
ALTER TABLE `formats`
  MODIFY `id_format` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `quest`
--
ALTER TABLE `quest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id_review` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `typeservice`
--
ALTER TABLE `typeservice`
  MODIFY `id_typeservice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_order_typeservice` FOREIGN KEY (`id_typeservice`) REFERENCES `typeservice` (`id_typeservice`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_format`) REFERENCES `formats` (`id_format`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_type`) REFERENCES `types` (`id_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
