<?php
/** 
 * 饭粒模块订阅器类
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

class FanliModuleReceiver extends WeModuleReceiver {

    public function receive() {

        // 声明为全局才可以访问到.
        global $_W;

    }

}