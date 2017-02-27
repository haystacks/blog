<?php
/** 
 * 饭粒模块前后端控制器操作类
 * @param  web: 后端；mobile：前端；
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

class FanliModuleSite extends WeModuleSite {

    public function doWebNo() { // 暂时什么也不做

        checklogin();
        // 声明为全局才可以访问到.
        global $_W, $_GPC;

    }

    public function doWebTest() {
        echo 1234;
        exit;
    }

}
