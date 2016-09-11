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
				'details': []
			},
			eleArr = [].slice.call(ele);

			eleArr.forEach(function(e, k) {
				data.details[k] = {
					'value': e.value,
					'text': e.textContent
				}
			})

        // // 获取默认值 默认文本
        // var allSelected = [];
        // allSelected['value'] = selectEle[selectEle.selectedIndex].value;
        // allSelected['text'] = selectEle[selectEle.selectedIndex].textContent;
        
        // var len = selectEle.length;
        // var data = {'allSelected': [], 'data': []};
        // // 默认只有一列
        // data.data[0] = [];
        // for(var i = 0; i < len; i++) {
        //     data.data[0][i] = {value: selectEle[i].value, text: selectEle[i].text, isSelect: allSelected[this.typeName] === selectEle[i][this.typeName]}
        // }
        
        // data.allSelected[0] = allSelected || data.data[0];    
        // data.name = name;
	}

	// 全局化
	root.Select = Select;

})(window)