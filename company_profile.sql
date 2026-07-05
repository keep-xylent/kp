-- ============================================================
-- company_profile.sql
-- Database lengkap untuk Company Profile & Manajemen Proyek
-- Kompatibel: MySQL 5.7+ / MariaDB 10.3+  |  phpMyAdmin Laragon
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- ------------------------------------------------------------
-- Buat dan gunakan database
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `company_profile`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `company_profile`;

-- ============================================================
-- Tabel: users
-- ============================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL,
  `password`   VARCHAR(255) NOT NULL,
  `role`       ENUM('superadmin','admin') NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabel: categories
-- ============================================================
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `slug`       VARCHAR(120) NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`),
  KEY `idx_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabel: projects
-- ============================================================
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(200) NOT NULL,
  `slug`        VARCHAR(220) NOT NULL,
  `category_id` INT          NOT NULL,
  `address`     VARCHAR(255) NOT NULL DEFAULT '',
  `description` TEXT         NULL,
  `thumbnail`   VARCHAR(255) NULL,
  `status`      ENUM('active','draft') NOT NULL DEFAULT 'draft',
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_projects_slug` (`slug`),
  KEY `idx_projects_slug`        (`slug`),
  KEY `idx_projects_category_id` (`category_id`),
  KEY `idx_projects_status`      (`status`),
  CONSTRAINT `fk_projects_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabel: galleries
-- ============================================================
DROP TABLE IF EXISTS `galleries`;
CREATE TABLE `galleries` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `project_id`  INT          NOT NULL,
  `image`       VARCHAR(255) NOT NULL,
  `title`       VARCHAR(200) NULL,
  `description` TEXT         NULL,
  `sort_order`  INT          NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_galleries_project_id`  (`project_id`),
  KEY `idx_galleries_sort_order`  (`project_id`, `sort_order`),
  CONSTRAINT `fk_galleries_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Users (password: admin123 – bcrypt hash compat. PHP password_hash)
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Super Admin',  'superadmin@starcon.id', '$2y$10$uyJfA5HGsGpV5wZ4XyzBqe5Jx9bwc7XnIg1N4pInk6ZZL40osfULu', 'superadmin'),
('Admin Proyek',  'admin@starcon.id',     '$2y$10$uyJfA5HGsGpV5wZ4XyzBqe5Jx9bwc7XnIg1N4pInk6ZZL40osfULu', 'admin');

-- Categories
INSERT INTO `categories` (`name`, `slug`) VALUES
('Rumah Tinggal',     'rumah-tinggal'),
('Renovasi',          'renovasi'),
('Interior',          'interior'),
('Gedung',            'gedung'),
('Jalan & Jembatan',  'jalan-jembatan'),
('Infrastruktur',     'infrastruktur');

-- Projects
INSERT INTO `projects` (`title`, `slug`, `category_id`, `address`, `description`, `thumbnail`, `status`) VALUES
(
  'Pembangunan Gedung Kantor Bupati Utama',
  'gedung-kantor-bupati-utama',
  4,
  'Samarinda, Kalimantan Timur',
  'Pembangunan gedung kantor 4 lantai modern dengan struktur beton bertulang dan fasad kaca hemat energi. Proyek ini mencakup pekerjaan pondasi tiang pancang, struktur rangka baja, curtain wall system, dan interior finishing premium. Luas bangunan 3.200 m2 dengan kapasitas 250 orang. Dilengkapi sistem HVAC modern, lift penumpang, dan instalasi mekanikal-elektrikal lengkap.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
  'active'
),
(
  'Pelebaran Jalan Trans Sulawesi',
  'pelebaran-jalan-trans-sulawesi',
  5,
  'Mamuju, Sulawesi Barat',
  'Pekerjaan pelebaran jalan nasional sepanjang 12 KM menggunakan material aspal hotmix bermutu AC-WC. Pekerjaan meliputi galian tanah, stabilisasi tanah dasar, lapis pondasi agregat, lapis aspal beton antara (AC-BC), dan lapis permukaan aspal (AC-WC). Dilengkapi dengan drainase samping, guardrail, dan marka jalan reflektif.',
  'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800&auto=format&fit=crop',
  'active'
),
(
  'Jembatan Beton Pelengkung Sungai Cimanuk',
  'jembatan-beton-pelengkung-cimanuk',
  5,
  'Garut, Jawa Barat',
  'Konstruksi jembatan penghubung antar desa dengan bentang utama 60 meter menggunakan sistem fondasi tiang pancang diameter 60 cm. Superstruktur jembatan menggunakan gelagar beton prategang precast dengan mutu K-500. Kapasitas kendaraan kelas A (60 ton), umur rencana 75 tahun.',
  'https://images.unsplash.com/photo-1545624446-43a77ab172c2?q=80&w=800&auto=format&fit=crop',
  'active'
),
(
  'Sistem Drainase & Pintu Air Kawasan Industri',
  'drainase-pintu-air-kawasan-industri',
  6,
  'Bekasi, Jawa Barat',
  'Pembangunan sistem drainase primer menggunakan beton U-Ditch precast ukuran 150x150 cm sepanjang 8 KM sebagai solusi penanggulangan banjir. Pekerjaan meliputi penggalian, pemasangan U-Ditch, manhole, gorong-gorong, pintu air otomatis, dan monitoring IoT.',
  'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop',
  'active'
),
(
  'Renovasi Rumah Minimalis Modern Surabaya',
  'renovasi-rumah-minimalis-modern-surabaya',
  2,
  'Surabaya, Jawa Timur',
  'Proyek renovasi total rumah tinggal 2 lantai dengan konsep minimalis modern. Pekerjaan meliputi pembongkaran struktur lama, perbaikan pondasi, renovasi fasad eksterior, interior redesign, pemasangan granit lantai 80x80 cm, pengecatan tekstur, dan instalasi lengkap.',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  'active'
),
(
  'Interior Design Kantor Modern Jakarta',
  'interior-design-kantor-modern-jakarta',
  3,
  'Jakarta Selatan, DKI Jakarta',
  'Proyek desain dan implementasi interior kantor modern seluas 1.500 m2 untuk perusahaan teknologi. Konsep open space dengan kolaborasi area, meeting room kaca, pantry modern, dan direktur suite menggunakan material premium.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
  'active'
);

-- Galleries – Project 1 (Gedung Kantor)
INSERT INTO `galleries` (`project_id`, `image`, `title`, `description`, `sort_order`) VALUES
(1, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop', 'Tampak Depan Gedung', 'Fasad utama gedung 4 lantai dengan curtain wall kaca hemat energi', 1),
(1, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop', 'Proses Struktur Baja', 'Pemasangan rangka baja lantai 3 dan 4 menggunakan crane 150 ton', 2),
(1, 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop', 'Pekerjaan Pondasi', 'Proses pemancangan tiang fondasi diameter 50 cm sedalam 25 meter', 3),
(1, 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop', 'Finishing Eksterior', 'Pemasangan panel ACP dan curtain wall system pada fasad gedung', 4),
(1, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop', 'Lobi Utama', 'Interior lobi utama dengan material marmer dan pencahayaan LED arsitektural', 5),
(1, 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=1200&auto=format&fit=crop', 'Selesai & Siap Operasi', 'Gedung telah selesai dibangun dan diserahterimakan kepada klien', 6);

-- Galleries – Project 2 (Jalan Trans Sulawesi)
INSERT INTO `galleries` (`project_id`, `image`, `title`, `description`, `sort_order`) VALUES
(2, 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200&auto=format&fit=crop', 'Kondisi Awal Jalan', 'Kondisi jalan lama sebelum pelebaran dengan lebar 6 meter', 1),
(2, 'https://images.unsplash.com/photo-1504600770771-fb03a6961d33?q=80&w=1200&auto=format&fit=crop', 'Pekerjaan Galian', 'Proses galian tanah untuk pelebaran badan jalan menggunakan excavator PC 200', 2),
(2, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop', 'Lapis Pondasi Agregat', 'Penghamparan dan pemadatan lapis pondasi agregat kelas B tebal 20 cm', 3),
(2, 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop', 'Pengaspalan Hotmix', 'Penghamparan aspal hotmix AC-WC menggunakan asphalt finisher', 4),
(2, 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop', 'Marka Jalan', 'Pemasangan marka jalan reflektif sesuai standar Bina Marga', 5),
(2, 'https://images.unsplash.com/photo-1566902783745-ea7553ce1475?q=80&w=1200&auto=format&fit=crop', 'Selesai – Jalan Baru', 'Jalan telah selesai diperlebar menjadi 14 meter dan siap dilalui', 6);

-- Galleries – Project 3 (Jembatan)
INSERT INTO `galleries` (`project_id`, `image`, `title`, `description`, `sort_order`) VALUES
(3, 'https://images.unsplash.com/photo-1545624446-43a77ab172c2?q=80&w=1200&auto=format&fit=crop', 'Tampak Keseluruhan Jembatan', 'Jembatan bentang 60 meter menghubungkan dua desa yang terpisah sungai', 1),
(3, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1200&auto=format&fit=crop', 'Pekerjaan Pemancangan', 'Proses pemancangan tiang fondasi diameter 60 cm sedalam 30 meter', 2),
(3, 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop', 'Pengecoran Abutmen', 'Pengecoran beton abutmen kanan dengan mutu K-350', 3),
(3, 'https://images.unsplash.com/photo-1574082595149-78e1a5bcb5ae?q=80&w=1200&auto=format&fit=crop', 'Erection Gelagar', 'Pemasangan gelagar beton prategang precast menggunakan crane 200 ton', 4),
(3, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop', 'Lantai Jembatan', 'Pengecoran lantai jembatan beton K-350 tebal 20 cm', 5),
(3, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop', 'Selesai & Diresmikan', 'Jembatan telah diresmikan dan dibuka untuk lalu lintas umum', 6);

-- Galleries – Project 4 (Drainase)
INSERT INTO `galleries` (`project_id`, `image`, `title`, `description`, `sort_order`) VALUES
(4, 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=1200&auto=format&fit=crop', 'Kondisi Banjir Sebelum Proyek', 'Kawasan industri yang kerap tergenang banjir sebelum sistem drainase dibangun', 1),
(4, 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop', 'Galian Drainase Primer', 'Proses galian saluran drainase primer lebar 2 meter menggunakan excavator', 2),
(4, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop', 'Pemasangan U-Ditch Precast', 'Pemasangan beton precast U-Ditch 150x150 cm menggunakan crane mobile', 3),
(4, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop', 'Pintu Air Otomatis', 'Instalasi sistem pintu air otomatis berbasis sensor debit', 4),
(4, 'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?q=80&w=1200&auto=format&fit=crop', 'Manhole & Kontrolspit', 'Pemasangan manhole beton dan pekerjaan pengembalian jalan', 5),
(4, 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1200&auto=format&fit=crop', 'Kawasan Bebas Banjir', 'Kawasan industri pasca proyek terbebas dari genangan bahkan saat hujan lebat', 6);

-- Galleries – Project 5 (Renovasi Rumah)
INSERT INTO `galleries` (`project_id`, `image`, `title`, `description`, `sort_order`) VALUES
(5, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop', 'Tampak Depan Setelah Renovasi', 'Fasad rumah minimalis modern dengan cat tekstur dan pagar besi tempa', 1),
(5, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', 'Kondisi Awal Sebelum Renovasi', 'Kondisi rumah lama sebelum direnovasi total', 2),
(5, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop', 'Ruang Tamu Modern', 'Ruang tamu dengan konsep open space, granit 80x80, dan sofa custom', 3),
(5, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop', 'Dapur & Pantry', 'Kitchen set full aluminium dengan top table granit hitam dan backsplash keramik', 4),
(5, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop', 'Kamar Master Bedroom', 'Master bedroom dengan built-in wardrobe dan headboard custom', 5),
(5, 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1200&auto=format&fit=crop', 'Kamar Mandi Modern', 'Kamar mandi dengan shower box kaca, bathtub freestanding, dan wastafel tanam', 6);

-- Galleries – Project 6 (Interior Kantor)
INSERT INTO `galleries` (`project_id`, `image`, `title`, `description`, `sort_order`) VALUES
(6, 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop', 'Open Space Working Area', 'Area kerja open space kapasitas 80 orang dengan meja sistem modular', 1),
(6, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop', 'Meeting Room Kaca', 'Ruang rapat kapasitas 20 orang dengan partisi kaca full-height dan AV system', 2),
(6, 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop', 'Direktur Suite', 'Ruang direktur dengan meja eksekutif solid oak dan area sofa kulit', 3),
(6, 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1200&auto=format&fit=crop', 'Pantry & Lounge', 'Area pantry dan lounge karyawan dengan meja bar dan espresso machine', 4),
(6, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop', 'Ceiling & Lighting', 'Suspended ceiling dengan pencahayaan arsitektural LED dan akustik panel', 5),
(6, 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop', 'Tampak Keseluruhan Kantor', 'Tampak keseluruhan interior kantor modern yang telah selesai dikerjakan', 6);

SET FOREIGN_KEY_CHECKS = 1;
