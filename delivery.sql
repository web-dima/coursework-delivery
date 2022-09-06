-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 06 2022 г., 18:24
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `delivery`
--

-- --------------------------------------------------------

--
-- Структура таблицы `employee`
--

CREATE TABLE `employee` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('admin','deliveryman') NOT NULL DEFAULT 'deliveryman',
  `phone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Дамп данных таблицы `employee`
--

INSERT INTO `employee` (`id`, `email`, `password`, `name`, `role`, `phone`) VALUES
(1, 'mama@gmail.com', '123', 'borya', 'admin', '12345678911'),
(7, 'dps0@inbox.ru', '$2b$05$6ksvAbgS0ST.xBtNgFlt8OvnhrolrY4tG4tiYX9m8LpYK6JiAGGke', 'slimShady', 'admin', '8018583912'),
(14, 'farkop@gmail.com', '$2b$05$viKE05a2mMgd3IjlSinuq.uNXp86d6TxFdGI76MpqdIzDqknw40om', 'backro', 'deliveryman', '89329182939');

-- --------------------------------------------------------

--
-- Структура таблицы `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `paymentType` enum('cash','card') NOT NULL,
  `status` enum('в обработке','открыт','взят','доставлен') NOT NULL DEFAULT 'в обработке',
  `price` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `deliverymanId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Дамп данных таблицы `order`
--

INSERT INTO `order` (`id`, `address`, `paymentType`, `status`, `price`, `name`, `email`, `deliverymanId`) VALUES
(9, 'пионерская 6', 'cash', 'в обработке', 250, 'неважнич', 'dimapuzinin03@gmail.com', NULL),
(11, 'пионерская 6', 'cash', 'доставлен', 250, 'неважнич', 'dimapuzinin03@gmail.com', NULL),
(13, 'пионерская 6', 'cash', 'в обработке', 250, 'неважнич', 'dimapuzinin03@gmail.com', NULL),
(14, 'адресс который я не знаю', 'card', 'доставлен', 1998, 'чиндо ля флакон', 'lisiycherep228@bk.ru', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `order_products`
--

CREATE TABLE `order_products` (
  `orderId` int NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Дамп данных таблицы `order_products`
--

INSERT INTO `order_products` (`orderId`, `productId`) VALUES
(9, 7),
(9, 10),
(11, 7),
(11, 10),
(13, 2),
(13, 7),
(14, 1),
(14, 7),
(14, 11);

-- --------------------------------------------------------

--
-- Структура таблицы `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `restaurantId` int NOT NULL,
  `img` text NOT NULL,
  `ingredients` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Дамп данных таблицы `product`
--

INSERT INTO `product` (`id`, `title`, `price`, `restaurantId`, `img`, `ingredients`) VALUES
(1, 'че то тоже новое', 900, 2, '1656248558476.jpg', 'че то новое'),
(2, 'калифорния', 400, 2, 'california.jpg', 'рыба, рис'),
(7, 'суп из бычих хвостов', 200, 1, '1656401625189.jpg', 'бычий хвост, картошка, мясо'),
(10, 'бутерброд', 50, 1, '1656405353646.jpg', 'хлеб, сыр, колбаса'),
(11, 'я его все', 898, 5, '1656406968410.jpg', 'чето'),
(12, 'тест продукт', 1002, 5, '1656407975608.jpg', 'чето'),
(13, 'тест продукт2', 800, 5, '1656408097920.jpg', 'чето');

-- --------------------------------------------------------

--
-- Структура таблицы `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `specification` varchar(255) NOT NULL,
  `minimalPrice` int NOT NULL,
  `timeDelivered` int NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Дамп данных таблицы `restaurant`
--

INSERT INTO `restaurant` (`id`, `title`, `specification`, `minimalPrice`, `timeDelivered`, `img`) VALUES
(1, 'asdadasdasda', 'хз', 50, 30, '1656248558476.jpg'),
(2, 'у кабана', 'грузинская кухня', 50, 90, '1656251009875.jpg'),
(5, 'тест', 'хз', 800, 40, '1656406900587.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_636e9801600f4b04cc77922a487` (`deliverymanId`);

--
-- Индексы таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`orderId`,`productId`),
  ADD KEY `IDX_28b66449cf7cd76444378ad4e9` (`orderId`),
  ADD KEY `IDX_27ca18f2453639a1cafb7404ec` (`productId`);

--
-- Индексы таблицы `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3249a5709fb37437198f7dff801` (`restaurantId`);

--
-- Индексы таблицы `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_636e9801600f4b04cc77922a487` FOREIGN KEY (`deliverymanId`) REFERENCES `employee` (`id`);

--
-- Ограничения внешнего ключа таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `FK_27ca18f2453639a1cafb7404ece` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_28b66449cf7cd76444378ad4e92` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_3249a5709fb37437198f7dff801` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
