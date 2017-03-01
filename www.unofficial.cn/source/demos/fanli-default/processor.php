<?php
/** 
 * 饭粒模块消息处理类
 * @author unofficial
 * @url    //www.unofficial.cn
 */

defined('IN_IA') or exit('Access Denied');
defined('MODULE_ROOT') or define('MODULE_ROOT', __DIR__);
/**
 * rule① ^https?://((item|h5\.m)\.taobao|detail\.(m\.)?tmall)\.com
 */

class FanliModuleProcessor extends WeModuleProcessor {
    private $url, $site;
    protected function __initialize() {
        global $_W;
        $config = require_once(MODULE_ROOT.'/data/config.php');
        $this -> url = $config['url'];
        $site = $_W['setting']['site'];
        $site['id'] = $this -> getSid();
        $site['do'] = 'coupon';
        $this -> site = $site;
    }

    public function respond() { // 必须重写
        // 目前暂时是单一的url ID规则
        $this -> __initialize();
        $site = $this -> site;
        $sid = $site['id'];
        if(!$sid) {
            return $this->respText('链接不是商品链接');
        }
        if($this -> site)
        // 检索远程商品优惠信息
        $info = ($local = $this -> getLocalSidDetail()) ? $local : $this -> getRemoteSidDetail();
        if(is_array($info)) {
            switch($info['type']) {
                case 'news':
                return $this -> respNews($info['resp']);
            }
        } else {
            return $this->respText($info);
        }
    }

    private function getSid() {
        // 声明为全局才可以访问到.
        global $_W;
        $message = $this -> message;
        // 判断是不是手机淘宝链接
        if(strpos($message['content'], '手机淘宝')) {
            preg_match('/https?:\/\/.+/', $message['content'], $urlInfo);
            if($urlInfo[0]) {
                load() -> func('communication');
                $rs = ihttp_get($urlInfo[0]);
                preg_match('/(?<=i)\d+(?=\.htm)/', $rs['content'], $idInfo);
            }
        } else {
            // 获取商品ID sid
            preg_match('/(?<=id=)\d+/', $message['content'], $idInfo);
        }
        return !empty($idInfo) ? $idInfo[0] : null;
    }
    
    private function getRemoteSidDetail() {
        load() -> func('communication');
        $rs = ihttp_post($this -> url, $this -> site);
        if($rs['code'] === '200') {
            $content = json_decode($rs['content'], true);
            if($content['code'] === 1000) {
                $detail = array(
                    'sid'       => $content['status']['sid'],
                    'name'      => $content['status']['name'],
                    'image'     => $content['status']['image'],
                    'price1'    => $content['status']['price1'],
                    'price2'    => $content['status']['price2'],
                    'coupon'    => $content['status']['coupon'],
                    'url'       => $content['status']['url'],
                    'starttime' => $content['status']['starttime'],
                    'endtime'   => $content['status']['endtime']
                );
                pdo_insert('fanli_store', $detail, true);
                // return implode("\n", array(
                //     '【宝贝信息】',
                //     $content['status']['name'],
                //     '原　价：￥'.$content['status']['price1'],
                //     '优惠价：￥'.$content['status']['price2'],
                //     '【优惠信息】',
                //     '优惠券：'.$content['status']['coupon']
                // ));
                return array(
                    'type' => 'news',
                    'resp' => array(
                        array(
                            'title'       => "优惠券",
                            'description' => $content['status']['name'],
                            'picurl'      => $content['status']['image'],
                            'url'         => $this -> createMobileUrl('jump', array('sid' => $content['status']['sid']))
                        )
                    )
                );
            } else {
                return $content['status'];
            }
        } else {
            return '查询工具升级中，稍后再试';
        }
    }
    
    private function getLocalSidDetail() {
        $site = $this -> site;
        $sid = $site['id'];
        $sql = 'SELECT * FROM ' . tablename('fanli_store') . " WHERE `sid` = $sid";
        $content = pdo_fetch($sql);
        if(!empty($content)) {
            return array(
                'type' => 'news',
                'resp' => array(
                    array(
                        'title'       => "优惠券",
                        'description' => $content['name'],
                        'picurl'      => $content['image'],
                        'url'         => $this -> createMobileUrl('jump', array('sid' => $content['sid']))
                    )
                )
            );
        }
    }

}
