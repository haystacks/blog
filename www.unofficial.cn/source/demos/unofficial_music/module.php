<?php
/**
 * 点歌送祝福模块定义
 *
 * @author unofficial
 * @url http://www.unofficial.cn/
 */
defined('IN_IA') or exit('Access Denied');

class Unofficial_musicModule extends WeModule {
	public function fieldsFormDisplay($rid = 0) {
		//要嵌入规则编辑页的自定义内容，这里 $rid 为对应的规则编号，新增时为 0
	}
	
	public function fieldsFormValidate($rid = 0) {
		//规则编辑保存时，要进行的数据验证，返回空串表示验证无误，返回其他字符串将呈现为错误提示。这里 $rid 为对应的规则编号，新增时为 0
		return '';
	}

	public function fieldsFormSubmit($rid) {
		//规则验证无误保存入库时执行，这里应该进行自定义字段的保存。这里 $rid 为对应的规则编号
	}

	public function ruleDeleted($rid) {
		//删除规则时调用，这里 $rid 为对应的规则编号
	}

	
    public function settingsDisplay($settings) {
		// 声明为全局才可以访问到.
		global $_W, $_GPC;
		if(checksubmit()) {
			// $_GPC 可以用来获取 Cookies,表单中以及地址栏参数
			$data = $_GPC['data'];
			$data = array(
				'song' => $data['song'] ? $data['song'] : '',
				'blessing' => $data['blessing'] ? $data['blessing'] : '',
				'copyright' => $data['copyright'] ? $data['copyright'] : '',
				'qrcode' => $data['qrcode'] ? $data['qrcode'] : ''
			);
			//字段验证, 并获得正确的数据$dat
			if (!$this->saveSettings($data)) {
				message('保存信息失败', $_GPC['referer'], 'error');
			} else {
				message('保存信息成功', $_GPC['referer'], 'success');
			}
		}
		// 模板中需要用到 "tpl" 表单控件函数的话, 记得一定要调用此方法.
		load()->func('tpl');
		//这里来展示设置项表单
		include $this->template('web/setting');

    }
}
