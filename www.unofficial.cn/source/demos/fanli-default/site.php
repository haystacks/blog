<?php
/** 
 * 饭粒模块前后端控制器操作类
 * @param  web: 后端；mobile：前端；
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

class FanliModule extends WeModule {

    public function doWebRule() {

        // 声明为全局才可以访问到.
        global $_W, $_GPC;
        echo 123;

    }

}