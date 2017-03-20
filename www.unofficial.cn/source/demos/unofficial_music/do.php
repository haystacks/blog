<?php

    /**
     * Mozilla/5.0 (Linux; Android 5.1; m2 note Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043024 Safari/537.36 MicroMessenger/6.5.4.1000 NetType/WIFI Language/zh_CN
     * Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36 MicroMessenger/6.5.5 NetType/WIFI Language/zh_CN

     * Dalvik/2.1.0 (Linux; U; Android 5.1; m2 note Build/LMY47D) Built-in music  MicroMessenger/6.5.4.1000
     * WeChat/6.5.5.32 CFNetwork/758.5.3 Darwin/15.6.0
     */ 
    defined('IN_IA') or define('IN_IA', true);
    defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);
    defined('IA_ROOT') or define('IA_ROOT', dirname(dirname(dirname(__FILE__))));
    require_once IA_ROOT . '/framework/bootstrap.inc.php';
    $id = ihtmlspecialchars($_GET['id']);
    $sql = 'SELECT * FROM '.tablename('unofficial_music').' AS um left join '.tablename('unofficial_music_detail').' AS umd on um.mid = umd.mid WHERE um.id = :id LIMIT 1';
    $data = array(
        ':id' => $id
    );
    $rs = pdo_fetch($sql, $data);
    // wechat for apple

    if(strpos($_SERVER['HTTP_USER_AGENT'], 'Dalvik') === 0 || strpos($_SERVER['HTTP_USER_AGENT'], 'WeChat') === 0) {// ios android play
        header('location: '.$rs['link']);
        exit;
    }

    if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'micromessenger') === false) { // 微信外部打开
        header('location: https://open.weixin.qq.com/connect/oauth2/authorize?appid=weixin', true, 301);
    } else { // 微信内部打开
        include MODULE_ROOT. '/template/mobile/do.tpl.php';
    }
?>
