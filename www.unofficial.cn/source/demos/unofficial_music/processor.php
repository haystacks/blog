<?php
/** 
 * 点歌送祝福模块消息处理类
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');
defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);

class Fanli_couponModuleProcessor extends WeModuleProcessor {
    
    /**
     * @根据内容使用指定方法处理
     */
    public function respond() { // 必须重写
        return $this -> respText('http://c.y.qq.com/v8/playsong.html?songmid=003uEbEr0jcW7c&ADTAG=opi1056236565&songid=97775');
    }
}
