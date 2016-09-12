/**
 * 默认select选择器样式
 * <select>
 * 		<option value="value">text</option>
 * </select>
 */ 

;(function(root) {
	
	function Select(options) {
		// is select ?
		this.isSelect(options.ele);
		// init parse options and default
		this.options = this.parse(options);
		// if data ? makeHtml
		this.makeHtml();
	}
	// 继承Picker
	Select.prototype = Object.create(root.Picker.prototype);
	Select.prototype.constructor = Select;

	// 是否是下拉选择
	Select.prototype.isSelect = function(ele) {
		return (ele.tagName === 'SELECT') && this.initSelect(ele);
	}

	// 初始化下拉选择的值或选项
	Select.prototype.initSelect = function(ele) {
		var name = ele.name,
			selectedIndex = ele.selectedIndex,
			data = {
				'selected': [{
					'value': ele[selectedIndex].value,
					'text': ele[selectedIndex].textContent
				}],
				'details': [],
				'attr': {}
			},
			eleArr = [].slice.call(ele);

		eleArr.forEach(function(e, k) {

			// 是否选择
			var isSelected = selectedIndex === k;

			data.details[k] = {
				'value': e.value,
				'text': e.textContent,
				'isSelected': isSelected
			}
		})
		data.attr.name = name;
		this.data = data;
	}

	// 创建HTML
	Select.prototype.makeHtml = function() {
		var div = document.createElement('div');
		// 设置属性
		div.className = ''.concat(this.options.className, ' ', this.options.className, '-', this.options.popDirection);
		div.id = this.data.attr.name;
		// 设置子HTML主结构
		div.innerHTML = this.options.html;
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
		// 添加到document父元素下
        this.options.parentEle.appendChild(div);
        console.log('%O', div);
	}

	// 全局化
	root.Select = Select;

})(window)