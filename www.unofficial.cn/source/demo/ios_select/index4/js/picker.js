/**
 * 通用选择器的实现，基于Select选择器以及Date选择器或者区域选择器的实现。创建一些通用方法用于被继承。
 * Picker.js V0.0.4
 */ 

;(function(root) {
	// html结构
	var HTML = '\
		<span></span>\
        <div class="select-option" style="display: none;">\
            <header class="select-option-header">\
                <span class="cancel button">取消</span>\
                <span class="confirm button button-blue">确定</span>\
            </header>\
            <ul class="wrapper">\
            </ul>\
        </div>';
	// 
	var DEFAULT = {
		'className': 'select',
		'iconDirection': 'right',
		'popDirection': 'bottom',
		'separator': '',
		'typeName': 'value',
		'html': HTML,
		'parentEle': document.querySelector('body')
	};

	var Picker = function() {
		// this.default = DEFAULT;
	}

	Picker.prototype.default = DEFAULT;
	// 初始化参数
	Picker.prototype.parse = function(options) {
		return Object.assign({}, this.default, options);
	}

	// 注册事件
	Picker.prototype.on = function(eventName, eventHandle) {

	}

	// 转移Picker。如果全局中存在Picker，将Picker赋值到全局变量_Picker
	root.Picker = Picker;
})(window)