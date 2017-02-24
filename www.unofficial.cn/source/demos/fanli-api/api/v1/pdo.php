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
    protected static function create($tablename, $data) {
        $sql = 'insert into fanli_api_app values(:key, :secrect, :we7key, :we7token, :we7url)';
        $db = self::connect();     
        $statement = $db->prepare($sql);
        $statement->bindParam(':key', $data['key']);
        $statement->bindParam(':secrect', $data['secrect']);
        $statement->bindParam(':we7key', $data['we7key']);
        $statement->bindParam(':we7token', $data['we7token']);
        $statement->bindParam(':we7url', $data['we7url']);
        return $statement->execute();
    }

    // R
    public static function retrieve($sid) {
        $sql = 'select * from fanli_api_store where sid = :sid';
        $db = self::connect();
        $statement = $db->prepare($sql);
        $statement->bindParam(':sid', $sid);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
}
