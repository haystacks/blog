<?php
/**
 * 饭粒安装模块
 * - 模块数据接口注册
 */

defined('IN_IA') or exit('Access Denied');
defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);

class FanLiInstall {

    private $url;
    public function __construct() {
        global $_W;
        $config = require_once(MODULE_ROOT.'/data/config.php');
        $this -> url = $config['url'];
        $site = $_W['setting']['site'];
        $site['do'] = 'register';
        $this -> site = $site;
    }

    public function start() {
        load() -> func('communication');
        $rs = ihttp_post($this -> url, $this -> site);
        if($rs['code'] === '200') {
            $content = json_decode($rs['content']);
            $appInfo = array(
                'apikey'     => $content->status->apikey,
                'apisecrect' => $content->status->apisecrect
            );
        } else {
            $appInfo = array(
                'apikey'     => null,
                'apisecrect' => null
            );
        }
        $this -> setting($appInfo);
    }

    protected function setting($appInfo) {
        $sql = file_get_contents(MODULE_ROOT.'/data/sql.sql');
        pdo_run($sql);

        // 插入 app 信息
        pdo_insert('fanli_setting', $appInfo);
    }
}

$fli = new FanLiInstall();
$fli -> start();
