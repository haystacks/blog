/**
 * 选择器的一个封装，在使用的过程中可以直接根据源选择器或者单行文本框来生成自定义的选择器样式
 * 
 * @包含以下几种情况
 * <select></selct>
 * <input type="date" />
 * <input type="area" />
 * 
 * @version 0.0.1
 * @author  unofficial
 * @time    2016-8-31
 */

//
// 跨模块加载
// 支持: Node, AMD, Browser globals
//
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Epicker = factory();
    }
}(this, function () {
    'use strict';
    var root = window;
    
    // 默认值
    var OPTIONS = {
        'className': 'select',
        'direction': 'right',
        'separator': '',
        'sizeCol': 3,
        'typeName': 'value',
        'parentEle': document.querySelector('body')
    }

    // 
    function Select(data) {
        this.selectClassName = data.className || OPTIONS.className;
        this.addClassName = data.addClassName ? data.addClassName : '';
        this.parentEle = data.parentEle || OPTIONS.parentEle;
        this.ele = data.ele;
        this.typeName = data.typeName || OPTIONS.typeName;
        this.separator = data.separator || OPTIONS.separator;
        this.sizeCol = data.sizeCol || OPTIONS.sizeCol;
        this.direction = data.direction || OPTIONS.direction;
        this.min = data.min;
        this.max = data.max;

        //
        // 选中元素的文本和与选中元素的值和
        // 
        this.allSelectedText = '';
        this.allSelectedValue = '';
        // 
        // 最后选择的元素的值/文本/对象
        //
        this.lastCheckEleArr = {};
        // 创建自定义选择器
        this.create(this.ele);
    }

    // 多选择元素绑定事件
    Select.prototype.addEvent = function() {
        // addEvent
        var ele = [].slice.call(arguments)[0];
        var self = this;
        ele.addEventListener('click', function(e) {
            // target || srcElement
            var currentTarget = e.currentTarget;
            var target = e.target || e.srcElement;
            // console.log('%O', currentTarget);
            if(target.className === ('select-selected-'+self.typeName) && target.nextElementSibling.style.display === 'none') {
                self.lastOptiomEle ? (self.lastOptiomEle.style.display = 'none') : '';
                self.lastCheckOptionEle = target;
                self.lastOptiomEle = target.nextElementSibling;
                // 是否隐藏之前显示的下拉选择? 是
                self.hiddenAll();
                // 设置当前选中元素的默认值
                self.setOptionSelectedValue(target);
                // 当前对象的兄弟元素显示
                target.nextElementSibling.style.display = 'block';
            } else if(target.tagName.toUpperCase() === 'LI') {
                // 点击元素后获取元素的 dataKey / value / text / target
                // 定义一个数组用户存放数据 lastCheckEleArr 
                console.log(self.lastCheckEleArr);
                var dataKey = target.dataset.key;
                var value = target.dataset.value;
                var text = target.innerText;
                var lastEle;
                ((dataKey in self.lastCheckEleArr) && (lastEle = self.lastCheckEleArr[dataKey][2]) && lastEle.className.split(' ').indexOf('checking') !== -1) && (lastEle.className = 'option');
                self.lastCheckEleArr[dataKey] = {'value': value, 'text': text, 'target': target};
                (target.className.split(' ').indexOf('checking') === -1) && (target.className += ' checking');
            } else if(target.className.split(' ').indexOf('cancel') !== -1) {
                // 循环遍历内容设置样式为option。情况选择值
                for(var key in self.lastCheckEleArr) {
                    self.lastCheckEleArr[key]['target'].className = 'option';
                    self.lastCheckEleArr[key] = [];
                }

                currentTarget.children[1].style.display = 'none'; 
            } else if(target.className.split(' ').indexOf('confirm') !== -1) {
                
                var allValue = '', allText = '';
                for(var key in self.lastCheckEleArr) {
                    allValue += self.lastCheckEleArr[key]['value'];
                    allText += self.lastCheckEleArr[key]['text'];
                    self.lastCheckEleArr[key] = [];
                }
                self.lastCheckOptionEle.innerText = allText;
                currentTarget.children[1].style.display = 'none';
            }
        });
        
        this.scrollEle(ele)    
    }

    // 滚动元素
    Select.prototype.scrollEle = function(ele) {
        var x, y;
        var moveFun = function(ev) {
            var target = ev.target.parentElement;
            if(target.tagName.toUpperCase() === 'UL' && target.className == 'select-option-body') {
                // console.log(ev.pageX, ev.pageY);
            }
        };
        var unMoveFun = function(ev) {
            // 如果移动的距离大于等于21PX，默认半行的距离，视为移动则
            console.log('事件已取消');
            ev.stopImmediatePropagation();
        };
        ele.addEventListener('mousedown', function(e) {
            var target = e.target.parentElement;
            if(target.tagName.toUpperCase() === 'UL' && target.className == 'select-option-body') {
                // console.log(e.pageX, e.pageY);

                ele.addEventListener('mousemove', moveFun)
            }
        })
        // 这里还有两个问题！！！！
        ele.addEventListener('mouseup', function(e) {
            var target = e.target.parentElement;
            //if(target.tagName.toUpperCase() === 'UL' && target.className == 'select-option-body') {
                console.log(e.pageX, e.pageY);

                ele.removeEventListener('mousemove', unMoveFun);
            //}
        })
    }
    // 根据name创建select
    Select.prototype.create = function() {
        var pickerEle = [].slice.call(arguments)[0];
        switch(pickerEle.tagName) {
            case 'SELECT': 
                isSelect.call(this, pickerEle);
                break;
            case 'INPUT':
                isInput.call(this, pickerEle);
        }
    }

    // 生成html选择器结构
    Select.prototype.makeHtml = function(data) {
        var self = this;

        var div = document.createElement('div');
        // 自定义select注册事件
        this.addEvent(div);
        div.className = this.selectClassName.concat(' ', this.selectClassName, '-', this.direction, this.addClassName ? (' ' + this.addClassName) : '');
        div.id = data.name;

        // 所有选中的文本拼接
        data.allSelected.forEach(function(e) {
            self.allSelectedText += e.text;
            self.allSelectedValue += e.value;
        });
        var innerHTML = 
            '<span class="select-selected-'+this.typeName+'" data-value="'+this.allSelectedValue+'">'+this.allSelectedText+'</span>'+
            '<div class="select-option" style="display: none;">'+
                '<header class="select-option-header">'+
                    '<span class="cancel button">取消</span>'+
                    '<span class="confirm button button-blue">确定</span>'+
                '</header>'+
                
                '<ul class="wrapper">';
        for(var key in data.data) {
            innerHTML +=
                '<li>'+
                    '<ul class="select-option-body">';
            var currentData = data.data[key];
            for (var i in currentData) {
                innerHTML += currentData[i].isSelected ? '<li class="option checking" data-key="'+key+'" data-value="'+currentData[i].value+'">'+currentData[i].text+'</li>' : '<li class="option" data-key="'+key+'" data-value="'+currentData[i].value+'">'+currentData[i].text+'</li>';             
            }
            innerHTML +=
                    '</ul>'+
                '</li>';
        }

        innerHTML += 
                '</ul>'+
            '</div>';
        
        // console.log(innerHTML);
        div.innerHTML = innerHTML;
        // 设置初始化选中元素
        this.lastLiEle = this.initLastLiEle(div);
        this.parentEle.appendChild(div);
        this.lastCheckEleArr = data.allSelected;
    }

    // element select rewrite
    function isSelect() {
        var selectEle = [].slice.call(arguments)[0];
        var name = selectEle.name;
        // 获取默认值 默认文本
        var allSelected = [];
        allSelected['value'] = selectEle[selectEle.selectedIndex].value;
        allSelected['text'] = selectEle[selectEle.selectedIndex].textContent;
        
        var len = selectEle.length;
        var data = {'allSelected': [], 'data': []};
        // 默认只有一列
        data.data[0] = [];
        for(var i = 0; i < len; i++) {
            data.data[0][i] = {value: selectEle[i].value, text: selectEle[i].text, isSelect: allSelected[this.typeName] === selectEle[i][this.typeName]}
        }
        
        data.allSelected[0] = allSelected || data.data[0];    
        data.name = name;
        this.makeHtml(data);
    }
    
    // element input rewrite
    function isInput() {
        var inputEle = [].slice.call(arguments)[0];
        console.log(inputEle);
        if(inputEle.type === 'date') {
            isInputDate.call(this, inputEle);
        } else if(inputEle.dataset.type === 'area') {
            isInputArea.call(this, inputEle);
        }
    }

    // 补零操作
    function addZero(str, length) {
        return new Array(length - str.toString().length + 1).join("0") + str;             
    }

    // input type date
    function isInputDate() {
        var dateEle = [].slice.call(arguments)[0];
        var name = dateEle.name;
        // 获取默认值 默认文本
        var d = new Date();
        var initYear = d.getFullYear();
        var initMonth = addZero(d.getMonth()+1, 2);
        var initDay = addZero(d.getDate(), 2);
        this.days = getDays(initYear);
        (this.min.length != 8 || this.max.length != 8) && console.log('最大日期或最小日期的长度应为8位(19700101)');
        this.startYear = this.min.slice(0, 4);
        this.endYear = this.max.slice(0, 4);

        var data = {'allSelected': [], 'data': []};
        // 默认只有一列
        data.data = [];
        // year
        data.data[data.data.length] = [];
        for(var i = this.startYear; i <= this.endYear; i++) {
            data.data[0][i] = {value: addZero(i, 4), text: addZero(i, 4), isSelect: initYear === i};
        }
        // month
        data.data[data.data.length] = [];
        for(var i = 1; i <= 12; i++) {
            data.data[1][i] = {value: addZero(i, 2), text: addZero(i, 2), isSelect: initMonth === i};
        }
        // day 时间的最大值最小值以及时间的天数等等综合考虑还是有问题
        data.data[data.data.length] = [];
        for(var i = 1; i <= 31; i++) {
            data.data[2][i] = {value: addZero(i, 2), text: addZero(i, 2), isSelect: initDay === i};
        }
        // 默认选中的文本与值
        data.allSelected[0] = {'value': initYear, 'text': initYear};
        data.allSelected[1] = {'value': initMonth, 'text': initMonth};
        data.allSelected[2] = {'value': initDay, 'text': initDay};

        data.name = name;
        this.makeHtml(data);
    }

    // 区域的情况理论上应该是一致的
    function isInputArea() {
        var dateEle = [].slice.call(arguments)[0];
        var name = dateEle.name;
        // 数据来源于外部数据
        var data = area;
        data.name = name;
        this.makeHtml(data);
    }

    // 初始化选中值
    Select.prototype.initLastLiEle = function() {
        var div = [].slice.call(arguments)[0];
        var liEles = div.lastChild.lastChild.children;
        var len = liEles.length;
        for(var i = 0; i < len; i++) {
            if([].slice.call(liEles[i].classList).indexOf('checking') != -1) {
                return liEles[i];
            }
        }
    }

    // 隐藏所有显示的选项
    Select.prototype.hiddenAll = function() {
        var optionEles = document.querySelectorAll('.select-option');
        [].slice.call(optionEles).forEach(function(ele) {
            (ele.style.display === 'block') && (ele.style.display = 'none');
        })
    }

    // 设置默认值选择背景
    Select.prototype.setOptionSelectedValue = function() {
        // 获取选中的值
        var target = [].slice.call(arguments)[0];
        var selectedText = target.textContent;
        var self = this;
        // 获取所有option元素，检测相等设置选中
        [].slice.call(target.nextElementSibling.lastElementChild.children).forEach(function(ele) {
            ele.textContent === selectedText ? (ele.className += ' checking') && (self.lastLiEle = ele) : (ele.className = 'option');
        })

    }

    return Select;
}))