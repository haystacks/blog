<?php
/**
 * 点歌送祝福安装模块
 * - 模块数据接口注册
 */

defined('IN_IA') or exit('Access Denied');
defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);

class Unofficial_musicInstall {

    public function __construct() {
    }

    public function start() {
        // 写入api.php
        $str = <<<EOF
<?php
    \$id = \$_GET['id'];
    \$url = base64_decode(\$id);
    header('Location: '.\$url);
?>
EOF;
        file_put_contents(MODULE_ROOT.'/../../attachment/api.php', $str);
        $this -> setting();
    }

    private function setting() {
        $sql = file_get_contents(MODULE_ROOT.'/data/sql.sql');
        pdo_run($sql);
    }
}

$um = new Unofficial_musicInstall();
$um -> start();
