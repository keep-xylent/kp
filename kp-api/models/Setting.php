<?php

class Setting {
    public static function getAll() {
        $db = Database::getInstance()->getConnection();
        
        // Auto-create table if not exists (lazy migration)
        $db->exec("
        CREATE TABLE IF NOT EXISTS `settings` (
          `key` VARCHAR(100) NOT NULL,
          `value` TEXT NULL,
          PRIMARY KEY (`key`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        
        $stmt = $db->query("SELECT * FROM settings");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $settings = [];
        foreach ($results as $row) {
            $settings[$row['key']] = $row['value'];
        }
        
        $defaults = [
            'stats_mode' => 'auto',
            'stats_projects' => '214',
            'stats_years' => '9',
            'stats_clients' => '74',
            'stats_quality' => '99',
            'contact_wa' => '+6281234567890',
            'contact_phone' => '(021) 555-8899',
            'contact_email' => 'hello@example.com',
            'contact_address' => 'Jl. Contoh Alamat No. 123, Kota, Provinsi',
            'contact_ig' => '@username_ig'
        ];
        
        // Merge DB settings over defaults
        $settings = array_merge($defaults, $settings);
        
        // If mode is auto, dynamically calculate projects only
        if (($settings['stats_mode'] ?? 'auto') === 'auto') {
            // Count active projects
            $projStmt = $db->query("SELECT COUNT(*) FROM projects WHERE status = 'active'");
            $settings['stats_projects'] = (string)$projStmt->fetchColumn();
        }
        
        return $settings;
    }

    public static function updateAll($data) {
        $db = Database::getInstance()->getConnection();
        
        // Allowed keys to update
        $allowed = [
            'stats_mode',
            'stats_projects',
            'stats_years',
            'stats_clients',
            'stats_quality',
            'contact_wa',
            'contact_phone',
            'contact_email',
            'contact_address',
            'contact_ig'
        ];
        
        $updated = [];
        foreach ($data as $key => $value) {
            if (in_array($key, $allowed)) {
                $stmt = $db->prepare("INSERT INTO `settings` (`key`, `value`) VALUES (:key, :value) 
                                      ON DUPLICATE KEY UPDATE `value` = :val2");
                $stmt->execute([
                    'key' => $key,
                    'value' => (string)$value,
                    'val2' => (string)$value
                ]);
                $updated[$key] = $value;
            }
        }
        
        return self::getAll();
    }
}
