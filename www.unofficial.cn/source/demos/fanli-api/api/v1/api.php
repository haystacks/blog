<?php
/**         
 * 通过微擎注册的应用注册 API 获取
 * API需要检测应用的合法性
 */
header('Content-Type: text/html; charset=utf-8');
define('IN_API', true);
require_once('pdo.php');
class FanLi {

    public function __construct() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $param = $this -> pParam($_POST);
            $do = $param['do'];
            $this -> $do($param);
        } elseif($_SERVER['REQUEST_METHOD'] === 'GET') {
            $param = $this -> gParam($_GET);
        }
    }

    // 获取get参数
    private function gParam($g) {
        // $this -> validate($p);
        exit('404');
        return $g;
    }

    // 获取post参数
    private function pParam($p) {
        $this -> validate($p);
        return $p;
    }

    // 验证数据合法性
    private function validate($p) {
        if(!is_array($p) || !array_key_exists('do', $p) || !method_exists('FanLi', $p['do'])) {
            $rsArray = array(
                'status' => '操作不存在',
                'code'   => 1001
            );
            exit(json_encode($rsArray));
        }
    }
    /**
     * 注册应用
     * @param key
     * @param token
     * @param url
     */
    public function register($param) {
        $data = array(
            'apikey'     => '123',
            'apisecrect' => '456',
            'key'        => $param['key'],
            'token'      => $param['token'],
            'url'        => $param['url']    
        );
        $sql = 'insert into fanli_api_app(`apikey`, `apisecrect`, `key`, `token`, `url`) values(:apikey, :apisecrect, :key, :token, :url)';
        $rs = IPDO::create($sql, $data);
        if($rs) {
            $rsArray = array(
                'status' => $auth,
                'code'   => 1000
            );
            exit(json_encode($rsArray));
        } else {
            $rsArray = array(
                'status' => '注册失败',
                'code'   => 1002
            );
            exit(json_encode($rsArray));
        }
    }
    /**
     * 注销应用
     * @param key
     * @param token 
     * @param url
     */
    public function logout($param) {
        $sql = 'update fanli_api_app set apisecrect = :apisecrect, key = :key, token = :token where url = :url';
        $data = array(
            'apisecrect' => '',
            'key'        => '',
            'token'      => '',
            'url'        => $param['url']
        );
        $rs = IPDO::update($sql, $data);
        if($rs) {
            $rsArray = array(
                'status' => '注销成功',
                'code'   => 1000
            );
            exit(json_encode($rsArray));
        } else {
            $rsArray = array(
                'status' => '注销失败',
                'code'   => 1004
            );
            exit(json_encode($rsArray));
        }
    }
    /**
     * 优惠券查询
     * @param 商品ID
     */
    public function coupon($param) {
        $sql = 'select * from fanli_api_store where sid = :sid';
        $data = array(
            'sid' => $param['id']
        );
        $rs = IPDO::retrieve($sql, $data);
        if($rs) {
            $rsArray = array(
                'status' => $rs,
                'code'   => 1000
            );
            exit(json_encode($rsArray));
        } else {
            $rsArray = array(
                'status' => '暂未查询到优惠',
                'code'   => 1003
            );
            exit(json_encode($rsArray));
        }
    }
}

// 实例化
new FanLi();
