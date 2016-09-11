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
        'deg': 20,
        'height': 30,
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
        // ele.addEventListener('tap', function(e) {
        //     // target || srcElement
        //     var currentTarget = e.currentTarget;
        //     var target = e.target || e.srcElement;
        //     // console.log('%O', currentTarget);
        //     if((target.className === 'select-selected-text' || target.className === 'select-selected-value') && target.nextElementSibling.style.display === 'none') {
        //         self.lastOptiomEle ? (self.lastOptiomEle.style.display = 'none') : '';
        //         self.lastCheckOptionEle = target;
        //         self.lastOptiomEle = target.nextElementSibling;
        //         // 当前对象的兄弟元素显示
        //         target.nextElementSibling.style.display = 'block';
        //     } else if(target.tagName.toUpperCase() === 'LI') {
        //         // 点击元素后获取元素的 dataKey / value / text / target
        //         // 定义一个数组用户存放数据 lastCheckEleArr 
        //         console.log(self.lastCheckEleArr);
        //         var dataKey = target.dataset.key;
        //         var value = target.dataset.value;
        //         var text = target.innerText;
        //         var lastEle;
        //         ((dataKey in self.lastCheckEleArr) && (lastEle = self.lastCheckEleArr[dataKey][2]) && lastEle.className.split(' ').indexOf('checking') !== -1) && (lastEle.className = 'option');
        //         self.lastCheckEleArr[dataKey] = {'value': value, 'text': text, 'target': target};
        //         (target.className.split(' ').indexOf('checking') === -1) && (target.className += ' checking');
        //     } else if(target.className.split(' ').indexOf('cancel') !== -1) {
        //         // 循环遍历内容设置样式为option。情况选择值
        //         for(var key in self.lastCheckEleArr) {
        //             self.lastCheckEleArr[key]['target'].className = 'option';
        //             self.lastCheckEleArr[key] = [];
        //         }

        //         currentTarget.children[1].style.display = 'none'; 
        //     } else if(target.className.split(' ').indexOf('confirm') !== -1) {
                
        //         var allValue = '', allText = '';
        //         for(var key in self.lastCheckEleArr) {
        //             allValue += self.lastCheckEleArr[key]['value'];
        //             allText += self.lastCheckEleArr[key]['text'];
        //             self.lastCheckEleArr[key] = [];
        //         }
        //         self.lastCheckOptionEle.innerText = allText;
        //         currentTarget.children[1].style.display = 'none';
        //     }
        // });

        // 点击事件
        var hammer = new Hammer(ele);
        
        var newDeg;
        // 开启纵向拖动
        hammer.get("pan").set({
            // direction: Hammer.DIRECTION_VERTICAL
            direction: Hammer.DIRECTION_ALL
        });
        hammer.on('tap panup pandown panend', function(e) {
            var currentTarget = e.srcEvent.currentTarget;
            var target = e.target;
            // console.log('%O', currentTarget);
            // thisCurrent 当前列
            var thisTarget;
            if((target.className === 'select-selected-text' || target.className === 'select-selected-value') && target.nextElementSibling.style.display === 'none') {
                // 当前对象的兄弟元素显示
                target.nextElementSibling.style.display = 'block';
            } else if((target.tagName.toUpperCase() === 'LI' && target.parentElement.className == 'wrapper' && (thisTarget = target)) || target.parentElement.parentElement.tagName == 'LI' && (thisTarget = target.parentElement.parentElement)) {
                if(e.type == 'tap') {
                    isTap.call(self, e, thisTarget);
                } else if(e.type == 'pandown' || e.type == 'panup' || e.type == 'panend') {
                    var col = thisTarget.dataset.key;
                    // console.log(newDeg);
                    var deg = newDeg || thisTarget.lastElementChild.style.transform.match(/rotateX\((\d+)deg\)/)[1];
                    newDeg = deg;
                    newDeg = deg - Math.atan(e.deltaY/(OPTIONS.height/2/Math.tan(OPTIONS.deg/2/180*Math.PI)))/Math.PI*10;
                    var maxDeg = (self.data.data[col].length - 1)*OPTIONS.deg;
                    newDeg = newDeg < 0 ? 0 : (newDeg > maxDeg ? maxDeg : newDeg);
                    thisTarget.lastElementChild.style.transform = 'perspective(1440px) rotateX('+ newDeg +'deg)';
                    if(e.type == 'panend') {
                        key = Math.round(newDeg/OPTIONS.deg);
                        newDeg = key * OPTIONS.deg;
                        /* 取消之前的选中，设置新选中 */
                        thisTarget.lastElementChild.children[self.keyArr[col]].className = 'option';
                        thisTarget.lastElementChild.children[key].className = 'option checking';
                        self.keyArr[col] = key;
                        thisTarget.lastElementChild.style.transition = '100ms ease-out';
                        thisTarget.lastElementChild.style.transform = 'perspective(1440px) rotateX('+ newDeg +'deg)';
                        /* 更新选中的值 */
                        self.lastCheckEleArr[col]['value'] = thisTarget.lastElementChild.children[key].dataset.value;
                        self.lastCheckEleArr[col]['text'] = thisTarget.lastElementChild.children[key].innerText;
                    }
                }
            } else if(target.tagName.toUpperCase() === 'LI') {
                // 点击元素后获取元素的 dataKey / value / text / target
                // 定义一个数组用户存放数据 lastCheckEleArr 
                // 当前点击的是第几列的
                var col = target.parentElement.parentElement.dataset.key;
                var dataKey = target.dataset.key;
                var value = target.dataset.value;
                var text = target.innerText;

                // 如果当前的0 < key < self.keyArr[col] --

                var lastEle;
                ((dataKey in self.lastCheckEleArr) && (lastEle = self.lastCheckEleArr[dataKey][2]) && lastEle.className.split(' ').indexOf('checking') !== -1) && (lastEle.className = 'option');
                self.lastCheckEleArr[dataKey] = {'value': value, 'text': text, 'target': target};
                (target.className.split(' ').indexOf('checking') === -1) && (target.className += ' checking');
            } else if(target.className.split(' ').indexOf('cancel') !== -1) {
                currentTarget.children[1].style.display = 'none'; 
            } else if(target.className.split(' ').indexOf('confirm') !== -1) {
                
                var allValue = '', allText = '';
                for(var key in self.lastCheckEleArr) {
                    allValue += self.lastCheckEleArr[key]['value'];
                    allText += self.lastCheckEleArr[key]['text'];
                }
                console.log(e.srcEvent);
                currentTarget.children[0].innerText = allText;
                currentTarget.children[0].dataset.value = allValue;
                currentTarget.children[1].style.display = 'none';
            }

        })
    }

    // 点击切换
    function isTap(e, thisTarget) {
        var self = this;
        // 点击元素后获取元素的 dataKey / value / text / target
        // 定义一个数组用户存放数据 lastCheckEleArr 
        // 当前点击的是第几列的
        var col = thisTarget.dataset.key;
        var key = self.keyArr[col];
        if(e.center.y < root.innerHeight - OPTIONS.height / 2 - thisTarget.offsetHeight / 2 && self.keyArr[col] < self.data.data[col].length - 1) {
            // 移除原来的checking
            thisTarget.lastElementChild.children[key].className = 'option';
            key++;
        } else if(e.center.y > root.innerHeight + OPTIONS.height / 2 - thisTarget.offsetHeight / 2 && self.keyArr[col] > 0) {
            // 移除原来的checking
            thisTarget.lastElementChild.children[key].className = 'option';
            key--;
        }
        if(key != self.keyArr[col]) {
            // 设置新的checking
            thisTarget.lastElementChild.children[key].className = 'option checking';
            thisTarget.lastElementChild.style.transform = 'perspective(1440px) rotateX('+ key*OPTIONS.deg +'deg)';
            self.keyArr[col] = key;
        }
    }

    // 滚动切换
    function isScroll() {

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
        // 全局化数据
        self.data = data;
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
        self.keyArr = [];
        for(var key in data.data) {
            innerHTML +=
                '<li data-key="'+ key +'">'+
                    '<div class="select-rule"></div>'+
                    '<ul class="select-option-body">';
            var currentData = data.data[key],
                index = 0;
            for (var i in currentData) {
                innerHTML += currentData[i].isSelect && (self.keyArr[key] = index) ? '<li class="option checking" style="transform: rotateX('+ -index*OPTIONS.deg +'deg) translateZ('+ OPTIONS.height/2/Math.tan(OPTIONS.deg/2/180*Math.PI) +'px);" data-key="'+ (index++) +'" data-value="'+currentData[i].value+'">'+currentData[i].text+'</li>' : '<li class="option" style="transform: rotateX('+ -index*OPTIONS.deg +'deg) translateZ('+ OPTIONS.height/2/Math.tan(OPTIONS.deg/2/180*Math.PI) +'px);" data-key="'+ (index++) +'" data-value="'+currentData[i].value+'">'+currentData[i].text+'</li>';             
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
        // 设置默认旋转到指定位置
        for(var key in self.keyArr) {
            div.lastElementChild.lastElementChild.children[key].lastElementChild.style.transform = 'perspective(1440px) rotateX('+ self.keyArr[key]*OPTIONS.deg +'deg)';
        }
        // 设置初始化选中元素
        // this.lastLiEle = this.initLastLiEle(div);
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
        this.optionEles = this.optionEles || document.querySelectorAll('.select-option');
        var optionEles = this.optionEles;
        [].slice.call(optionEles).forEach(function(ele) {
            (ele.style.display === 'block') && (ele.style.display = 'none');
        })
    }


    /**
     * 自定义事件相关
     * 1. 模拟tap事件
     */

    return Select;
}))