<?php
/** 
 * 饭粒模块消息处理类
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

class FanliModuleProcessor extends WeModuleProcessor {

    public function respond() { // 必须重写

        // 声明为全局才可以访问到.
        global $_W;
        return $this->respText('您触发了饭粒模块');

    }

}