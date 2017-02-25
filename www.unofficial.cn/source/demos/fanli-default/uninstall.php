<?php
/**
 * 饭粒卸载模块
 * - 模块数据接口注销
 */

class FanLiUninstall {

    private $url = 'http://fanli.unofficial.cn/api/v1/api.php';
    public function __construct() {
        global $_W;
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
        if(!defined('MODULE_ROOT')) {
            define('MODULE_ROOT', __DIR__);
        }
        $sql = file_get_contents(MODULE_ROOT.'/data/unsql.sql');
        pdo_run($sql);
    }
}

$fli = new FanLiInstall();
$fli -> start();
