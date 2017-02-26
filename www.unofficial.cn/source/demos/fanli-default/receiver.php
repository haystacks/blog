<?php
/** 
 * 饭粒模块订阅器类
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');

class FanliModuleReceiver extends WeModuleReceiver {

    public function receive() { // 必须重写

        // 声明为全局才可以访问到.
        global $_W;
        $data = var_export($this -> message, true);
        $path = IA_ROOT . '/data/fanli';
        is_dir($path) || mkdir($path);
        $dataLogPath = $path.'/receiver_'.date('Y-m-d', time()).'.txt';
        file_put_contents($dataLogPath, $data);

    }

}
