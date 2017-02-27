<?php
/** 
 * 饭粒模块消息处理类
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

/**
 * rule① ^https?://((item|h5\.m)\.taobao|detail\.(m\.)?tmall)\.com
 */

class FanliModuleProcessor extends WeModuleProcessor {

    public function respond() { // 必须重写

        // 声明为全局才可以访问到.
        global $_W;
        $message = $this -> message;
        // 获取商品ID sid
        preg_match('/(?<=id=)\d+/', $message['content'], $idInfo);
        // $sid = $idInfo['1'];
        return $this->respText('您触发了饭粒模块'.$idInfo[0]);

    }

}
