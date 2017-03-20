<?php
/**
 * 点歌送祝福卸载模块
 * - 模块数据接口注销
 */

defined('IN_IA') or exit('Access Denied');
defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);

class Unofficial_musicUninstall {

    public function __construct() {
    }

    public function start() {
        $this -> dropTable();
    }

    protected function dropTable() {
        $sql = file_get_contents(MODULE_ROOT.'/data/unsql.sql');
        pdo_run($sql);
    }
}

$um = new Unofficial_musicUninstall();
$um -> start();
