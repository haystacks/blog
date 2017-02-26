<?php
/**
 * 简单的数据库操作类
 */

defined('IN_API') or exit('404');
class IPDO {
    private static $statement;
    private static function connect() {
        $db = require_once('./db.config.php');
        return new PDO("mysql:host={$db['host']};dbname={$db['db']};charset=UTF8", $db['root'], $db['pwd']);
    }
    // C
    public static function create($sql, $data) {
        $db = self::connect();
        self::$statement = $db -> prepare($sql);
        self::bind($data);
        return self::$statement -> execute();
    }

    // R
    public static function retrieve($sql, $data) {
        $db = self::connect();
        self::$statement = $db -> prepare($sql);
        self::bind($data);
        self::$statement -> execute();
        return self::$statement -> fetch(PDO::FETCH_ASSOC);
    }

    // U
    public static function update($sql, $data) {
        $db = self::connect();
        self::$statement = $db -> prepare($sql);
        self::bind($data);
        self::$statement -> execute();
        return self::$statement -> fetch(PDO::FETCH_ASSOC);
    }

    private static function bind($data) {
        if(is_array($data) && !empty($data)) {
            foreach($data as $key => &$val) {
                var_dump(':'.$key.', '.$val);
                self::$statement -> bindParam(':'.$key, $val);
            }
        }
    }
}
