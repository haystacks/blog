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
		// 注册点击事件
		new Somevent(document.getElementById(options.ele.name), 'tap', function(e) {
			if( e.target.className == 'select-selected-value' ) {
				console.log(e.target.nextElementSibling.style.display);
				// e.target.nextElementSibling.style.display = e.target.nextElementSibling.style.display == 'none' ? 'block' : 'none';
			} else if( [].slice.call(e.target.classList).indexOf('cancel') != -1 ) {
				// 取消
				e.path[2].style.display = 'none';
			} else if( [].slice.call(e.target.classList).indexOf('confirm') != -1 ) {
				// 确认
				e.path[2].style.display = 'none';
				console.log('确认操作');
			} else {
				console.log('end');
			}
		})
		// 注册滑动事件
		new Somevent(document.getElementById(options.ele.name), 'pan', function(e) {
			if(e.target.nodeName == 'li' && e.target.path[1].className == 'wrapper') {
				// 滑动当前列
				console.log(123);
			}
		})
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

		var details = [];
		eleArr.forEach(function(e, k) {

			// 是否选择
			var isSelected = selectedIndex === k;

			details[k] = {
				'value': e.value,
				'text': e.textContent,
				'isSelected': isSelected
			}
		})
		data.details[0] = details;
		data.attr.name = name;
		this.data = data;
	}

	// 全局化
	root.Select = Select;

})(window)