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

    /**
     * rule① ^https?://((item|h5\.m)\.taobao|detail\.(m\.)?tmall)\.com
     */
    public function doWebRuleInit() {
        /**
         * @desc         检查是否已经存在规则
         * @uniacid      应用ID
         * @module title 模块名称
         */
        checklogin();
        $this -> rule = array(
            '^https?://((item|h5\.m)\.taobao|detail\.(m\.)?tmall)\.com',
            '手机淘宝'
        );
        $this -> ruleType = 3;
        $this -> rulename = '初始化的回复规则';
        $this -> checkRule();
        $this -> createRule();
    }

    private function checkRule() {
        global $_W, $_GPC;
        $sql = 'SELECT `id`, `rid` FROM ' . tablename('rule_keyword') . " WHERE `uniacid` = :uniacid  AND `module` = :module";
        $result = pdo_fetchall($sql, array(':uniacid' => $_W['uniacid'], ':module' => $_GPC['m']));
        if (!empty($result)) {
			$keywords = array();
			foreach ($result as $reply) {
				$keywords[] = $reply['id'];
			}
			$ids = implode(',', $keywords);
			$sql = 'SELECT `content` FROM ' . tablename('rule_keyword') . " WHERE `id` IN ($ids)";
			$exsitedRule = pdo_fetchall($sql);
            $exsitedRule = array_map(function($arr) {
                return $arr['content'];
            }, $exsitedRule);
            $needAddRule = array();
            foreach($this -> rule as $rule) {
                if(!in_array($rule, $exsitedRule)) {
                    $needAddRule[] = $rule;
                }
            }
            
            if(empty($needAddRule)) {
                message('回复规则已经存在，创建失败！', '', 'error');
            } else {
                message('有问题', '', 'error');
            }
		}
    }

    private function createRule($rules = array()) {
        global $_W, $_GPC;
		$ruleData = array(
			'uniacid'      => $_W['uniacid'],
			'name'         => $this -> rulename,
            'module'       => $_GPC['m'],
			'status'       => 1,
			'displayorder' => 0,
		);
        $result = pdo_insert('rule', $ruleData);
		$rid = pdo_insertid();
        $rules = $rules ? $rules : $this -> rule;
        foreach($rules as $rule) {
            $ruleKeyword = array(
                'rid'          => $rid,
                'uniacid'      => $_W['uniacid'],
                'module'       => $ruleData['module'],
                'content'      => $rule,
                'type'         => $this -> ruleType,
                'status'       => $ruleData['status'],
                'displayorder' => $ruleData['displayorder'],
            );
            pdo_insert('rule_keyword', $ruleKeyword);
        }
        message('初始化回复规则成功','','success');
    }

    public function doMobileJump() {
        global $_W, $_GPC;
        preg_match('/\d+/', $_GPC['sid'], $matches);
        $sid = $matches[0];
        if($sid) {
            $sql = 'SELECT * FROM ' . tablename('fanli_store') . " WHERE `sid` = $sid";
            $detail = pdo_fetch($sql);
            if(!empty($detail)) {
                if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'micromessenger') === false) {
                    header('location: '.$detail['url']);
                } else {
                    include $this->template('jump');
                }
            } else {
                include $this->template('index');
            }
        } else {
            include $this->template('index');
        }
    }

}
