<?php
/**
 * 简单的数据库操作类
 */
!defined('IN_API') && exit('404');
class IPDO {
    private static function connect() {
        $db = require_once './db.config.php';
        return new PDO("mysql:host={$db['host']};dbname={$db['db']};charset=UTF8", $db['root'], $db['pwd']);
    }
    // C
    public static function create($sql, $data) {
        $db = self::connect();
        $statement = $db->prepare($sql);
        self::bind($statement, $data);
        return $statement->execute();
    }

    // R
    public static function retrieve($sql, $data) {
        $db = self::connect();
        $statement = $db->prepare($sql);
        self::bind($statement, $data);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    // U
    public static function update($sql, $data) {
        $db = self::connect();
        $statement = $db->prepare($sql);
        self::bind($statement, $data);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    private static function bind($statement, $data) {
        if(is_array($data) && !empty($data)) {
            foreach($data as $key => $val) {
                $statement->bindParam(':'.$key, $val);
            }
        }
    }
}
