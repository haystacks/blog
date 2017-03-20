<?php
/** 
 * 点歌送祝福前后端控制器操作类
 * @param  web: 后端；mobile：前端；
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

class Unofficial_musicModuleSite extends WeModuleSite {

    private $moduleName = 'Unofficial_music';

    public function doMobileNo() { // 暂时什么也不做
        // 声明为全局才可以访问到.
        global $_W, $_GPC;
        $id = ihtmlspecialchars($_GPC['id']);
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
    }
}
