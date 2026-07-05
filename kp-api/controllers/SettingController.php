<?php

class SettingController {
    public function index() {
        try {
            $settings = Setting::getAll();
            Response::success($settings);
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }

    public function update() {
        
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        
        try {
            $updated = Setting::updateAll($data);
            Response::success($updated, "Pengaturan berhasil diperbarui");
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }
}
