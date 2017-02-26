<?php
/**
 * 饭粒卸载模块
 * - 模块数据接口注销
 */

defined('IN_IA') or exit('Access Denied');
defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);

class FanLiUninstall {

    private $url;
    public function __construct() {
        global $_W;
        $config = require_once(MODULE_ROOT.'/data/config.php');
        $this -> url = $config['url'];
        $site = $_W['setting']['site'];
        $site['do'] = 'logout';
        $this -> site = $site;
    }

    public function start() {
        load() -> func('communication');
        ihttp_post($this -> url, $this -> site);
        $this -> dropTable();
    }

    protected function dropTable() {
        $sql = file_get_contents(MODULE_ROOT.'/data/unsql.sql');
        pdo_run($sql);
    }
}

$fli = new FanLiUninstall();
$fli -> start();
