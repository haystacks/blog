<?php
/**
 * 饭粒安装模块
 * - 模块数据接口注册
 */

class FanLiInstall {

    private $url = 'http://fanli.unofficial.cn/api/v1/api.php';
    public function __construct() {
        global $_W;
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
        if(!defined('MODULE_ROOT')) {
            define('MODULE_ROOT', __DIR__);
        }
        $sql = file_get_contents(MODULE_ROOT.'/data/sql.sql');
        pdo_run($sql);

        // 插入 app 信息
        pdo_insert('fanli_setting', $appInfo);
    }
}

$fli = new FanLiInstall();
$fli -> start();
