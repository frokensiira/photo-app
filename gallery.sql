-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 02 jun 2020 kl 12:29
-- Serverversion: 8.0.18
-- PHP-version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `gallery`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `albums`
--

INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
(1, 'BoJack - Me, myself and I', 1),
(2, 'Todd', 1),
(3, 'Mr Cool Guy', 3),
(4, 'Diane <3', 3),
(5, 'Me and Diane', 3),
(6, 'Guy', 4),
(7, 'Feminists', 4),
(8, 'Untitled Princess Carolyn Project', 2),
(9, 'Work', 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `albums_photos`
--

CREATE TABLE `albums_photos` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `albums_photos`
--

INSERT INTO `albums_photos` (`id`, `album_id`, `photo_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 2),
(4, 1, 4),
(5, 1, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12),
(13, 1, 9),
(14, 1, 10),
(15, 1, 11),
(16, 1, 12),
(17, 3, 13),
(18, 3, 14),
(19, 3, 15),
(20, 4, 16),
(21, 4, 17),
(22, 4, 18),
(23, 5, 22),
(24, 5, 19),
(25, 5, 20),
(26, 5, 21),
(27, 4, 19),
(28, 4, 20),
(29, 4, 21),
(30, 4, 22),
(31, 3, 19),
(32, 3, 20),
(33, 3, 21),
(34, 3, 22),
(35, 6, 23),
(36, 6, 24),
(37, 7, 25),
(38, 7, 26),
(39, 7, 27),
(40, 7, 28),
(41, 8, 29),
(42, 8, 30),
(43, 9, 31),
(44, 9, 32),
(45, 9, 33),
(46, 9, 34),
(47, 8, 34);

-- --------------------------------------------------------

--
-- Tabellstruktur `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `photos`
--

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'Cool by the pool', 'https://storage.googleapis.com/orchestra-cafe-7jp1kqsp/uploads/2020/02/5aeded11-bojack-horseman-netflix.jpg', NULL, 1),
(2, 'Glasses', 'https://sm.ign.com/ign_nordic/news/n/netflixs-b/netflixs-bojack-horseman-final-season-gets-a-new-trailer_1rpk.png', 'When you look at someone through rose-colored glasses, all the red flags just look like flags.', 1),
(3, 'Secretariat', 'https://tvkoll.aftonbladet.se/files/2016/07/downloadAsset.jpg', 'The happiest moment in my life', 1),
(4, 'Nude', 'https://i.insider.com/542f0964eab8eadf035c0cbe?width=1100&format=jpeg&auto=webp', NULL, 1),
(5, 'Coffee', 'https://i.guim.co.uk/img/media/776c66269652536180db40ab3507ed2eaf6ba649/88_0_3600_2160/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=7602a3821ebe36b4bc05e5aafc7f399c', 'I’m responsible for my own happiness? I can’t even be responsible for my own breakfast!', 1),
(6, 'All About That Ace', 'https://i.pinimg.com/originals/21/81/16/218116a11231d5bd8b91a9ddf7f14979.png', 'Tood starts dating!', 1),
(7, 'Ready for business', 'https://i.ytimg.com/vi/iTI2RnrCaUc/maxresdefault.jpg', NULL, 1),
(8, 'Favourite Todd quote', 'https://i.ytimg.com/vi/iTI2RnrCaUc/maxresdefault.jpg', NULL, 1),
(9, 'Strike', 'https://am24.mediaite.com/tms/cnt/uploads/2016/08/todd-yay.jpg', 'Hooray! And you know, I don\'t throw that word around lightly', 1),
(10, 'Coming out', 'https://assets.popbuzz.com/2017/37/bojack-horseman-season-4--1505307147.jpg', NULL, 1),
(11, 'Deliver', 'https://i.redd.it/qzezaj1sraa01.jpg', NULL, 1),
(12, 'Liberal', 'https://www.bojackwallpapers.com/wallpapers/bojack-todd-with-guns/bojack-todd-with-guns-desktop-wallpaper-1920x1080.jpeg', NULL, 1),
(13, 'Stayin alive', 'https://occ-0-92-1722.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZI-s_EPRYLfGYlu-ekFjbcqgyRyCbvOZJseXK0KqAjFrViOAOoyeD9AGAWVMv_LUqQGSwtvv6KWu5pE7st22o-MppBG7PRIOcS8_L-QHmCEKEuI.jpg?r=ef9', NULL, 3),
(14, 'No honeydew?', 'https://i.pinimg.com/originals/80/46/d6/8046d65b66f1a99550d2482c066deb19.png', NULL, 3),
(15, 'Discover', 'https://pm1.narvii.com/6599/3072a1413a3164a5f063873a0ee275838b4edaea_00.jpg', NULL, 3),
(16, 'Moral', 'https://pbs.twimg.com/profile_images/602487493859115008/KG5KJLh5_400x400.jpg', 'Note to self', 3),
(17, 'Buffet', 'https://i.imgur.com/0K22NjP.jpg', 'Feminine', 3),
(18, 'Resolution', 'https://pbs.twimg.com/profile_images/1218765157012328448/i8J6SCDe_400x400.jpg', NULL, 3),
(19, 'Consideration', 'https://occ-0-92-1722.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABck1jWF7EEX6b7j_5vp5FAp0DBy5f4FK96o66p3La7S1m3o5-C0EIxXhBXzZiBLpI-7cPa2u4A-jLfXj0AnDFApSHxumhyZz_U9TIkjTlTzDbm7F.jpg?r=018', NULL, 3),
(20, 'True love', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMsu64DS3DR-VYAO7sigu9LMhgrWDEgP3ybIE1FZGjYdmGXqho&usqp=CAU', NULL, 3),
(21, 'Score', 'https://i.ytimg.com/vi/Y5Hsj9co6Js/maxresdefault.jpg', NULL, 3),
(22, 'Broken', 'https://studybreaks.com/wp-content/uploads/2018/07/08-bojack-407.w710.h473.2x.jpg', NULL, 3),
(23, 'Trouble', 'https://vignette.wikia.nocookie.net/bojackhorseman/images/f/fb/Guy.png/revision/latest?cb=20191029165807', NULL, 4),
(24, 'Displace', 'https://imgix.bustle.com/uploads/image/2019/10/21/c67b6123-cd59-4ad6-8a84-4d5dbc178ba9-screen-shot-2019-10-21-at-52559-pm.png', NULL, 4),
(25, 'Bell Hooks', 'https://www.listor.se/wp-content/uploads/2015/04/bellhooks.jpg', NULL, 4),
(26, 'Mary Wollstonecraft', 'https://www.thoughtco.com/thmb/PYNsBL0C4-8aX-DABOv-mWxCjS4=/2771x1848/filters:fill(auto,1)/Mary-Wollstonecraft-x-162279570-56aa24f45f9b58b7d000fc2b.jpg', NULL, 4),
(27, 'Susan Brownell Anthony', 'https://cdn.britannica.com/28/13428-050-37CEEE27/Susan-B-Anthony.jpg', NULL, 4),
(28, 'Sojourner Truth', 'https://www.thoughtco.com/thmb/F9e3xBKR8lYMb7vdtplZoLODC1M=/2133x1600/smart/filters:no_upscale()/Sojourner-Truth-92ad9effa12e4ec6a5402fe3ff78efb6.jpg', NULL, 4),
(29, 'Ruthie', 'https://vignette.wikia.nocookie.net/bojackhorseman/images/6/6d/Ruthieearhartstorycropped.jpg/revision/latest/top-crop/width/220/height/220?cb=20191118200252', NULL, 2),
(30, 'Me and Ruthie', 'https://i.pinimg.com/originals/8f/9c/70/8f9c70fd5db118700a35d3603ea3beab.png', NULL, 2),
(31, 'Lunch', 'https://i2.wp.com/butwhythopodcast.com/wp-content/uploads/2018/09/MV5BN2UzODdlYzEtOTk4ZS00YTBlLTlkZDAtNjY1NTIyMjcyNzk5XkEyXkFqcGdeQXVyMDk0ODI3OA@@._V1_.jpg?fit=1136%2C640&ssl=1', NULL, 2),
(32, 'Confidence', 'https://i.redd.it/r32cvc0hi6041.png', NULL, 2),
(33, 'TBT', 'https://vignette.wikia.nocookie.net/bojackhorseman/images/3/38/S3E09_90s_Princess_Carolyn_%22It%E2%80%99s_nice_to_see_you_again%21%22.png/revision/latest?cb=20190117222610', NULL, 2),
(34, 'Work life balance', 'https://cdn.theatlantic.com/thumbor/dEr9ZboIKP20ugfdTWQOmgjSsy8=/5x163:3839x2160/960x500/media/img/mt/2019/10/BoJack_Horseman_S06E02_6m59s10069f_1/original.jpg', NULL, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'horsin@round.com', '$2b$10$xZWCVehVbR2Bn.jOiIJHoOFlPZ.W6wt7n5ksoscHTtuw02fAGvyZK', 'BoJack', 'Horseman'),
(2, 'princess@carolyn.com', '$2b$10$HYz7UW60MvJ8T1/LJfW2Zu0oVjdwdF.nHr59eX.fjhvBM.3SfTy/a', 'Carolyn', 'Cupcake'),
(3, 'mrpeanutbutters@house.com', '$2b$10$zzW8fJlQrC0tii/Q11ncmuncU9caCrN9u3c/wkovWT/oKwSEBwqw6', 'Mr', 'Peanutbutter'),
(4, 'nguyenisthelonliestnumber@aol.com', '$2b$10$JjuKqdIWwP2xdpiulhPn6OQe8IotNLIo8RYqCBUCsiCatQKnwDqY.', 'Diane', 'Nguyen');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `albums_photos`
--
ALTER TABLE `albums_photos`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT för tabell `albums_photos`
--
ALTER TABLE `albums_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT för tabell `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
