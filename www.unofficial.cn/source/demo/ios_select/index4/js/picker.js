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
    var BODY = '\
    	<div></div>\
    	<ul></ul>';
	// 
	var DEFAULT = {
		'className': 'select',
		'iconDirection': 'right',
		'popDirection': 'bottom',
		'separator': '',
		'typeName': 'value',
		'html': HTML,
		'body': BODY,
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

	// 创建HTML
	Picker.prototype.makeHtml = function() {
		var div = document.createElement('div');
		// 设置属性
		div.className = ''.concat(this.options.className, ' ', this.options.className, '-', this.options.popDirection, ' ', this.options.className, '-icon-', this.options.iconDirection);
		div.id = this.data.attr.name;
		// 设置子HTML主结构
		div.innerHTML = this.options.html;
		// 设置选中值
		this.setSelectedData.call(this, div);
		// 添加列数据
		this.setColumnsData.call(this, div.children[1].children[1]);
		// 添加到document中指定父元素下
        this.options.parentEle.appendChild(div);
	}

	// 设置默认选中值
	Picker.prototype.setSelectedData = function(div) {
		// 设置选中值
		var text = '',
			value = '';
		this.data.selected.forEach(function(selected) {
			text = text.concat(selected.text);
			value = value.concat(selected.value);
		})
		div.firstElementChild.textContent = text;
		div.firstElementChild.dataset.value = value;
		div.firstElementChild.className = this.options.className.concat('-', 'selected', '-', this.options.typeName);
	}

	// 设置列数据（根据details的长度判断有几列数据）
	Picker.prototype.setColumnsData = function(wrapper) {
		var len = this.data.details.length;
		this.data.details.forEach(function(detail) {
			var li = document.createElement('li');
			li.style.width = (1/len*100).toFixed(3)+'%';
			// li添加元素
			this.makeBody.call(this, li, detail);
			wrapper.appendChild(li);
		}, this)


		wrapper.addEventListener('click', function(e) {
			if(e.target.tagName === 'LI') { // 
				console.log(this.getIndex(e.target));
			}
		}.bind(this))
	}

	// 设置一列中的元素结构
	Picker.prototype.makeBody = function(li, detail) {
		li.innerHTML = this.options.body;
		li.children[0].className = ''.concat(this.options.className, '-rule');
		li.children[1].className = ''.concat(this.options.className, '-option-body');

		this.setOptionsData.call(this, li.children[1], detail);
	}

	// 设置一列下的可选选项元素
	Picker.prototype.setOptionsData = function(ul, detail) {
		detail.forEach(function(option) {
			var li = document.createElement('li');
			li.textContent = option.text;
			li.dataset.value = option.value;
			// 添加当前选中值
			option.isSelected && (li.className = 'checking');
			// 追加元素
			ul.appendChild(li);
		}, this)
		var li = document.createElement('li');
	}

	// 获取当前元素的索引值
	Picker.prototype.getIndex = function(ele) {
		var arr = [].slice.call(ele.parentElement.children);
		return arr.indexOf(ele);
	}

	// 注册事件
	Picker.prototype.on = function(eventName, eventHandle) {

	}

	// 转移Picker。如果全局中存在Picker，将Picker赋值到全局变量_Picker
	root.Picker = Picker;
})(window)