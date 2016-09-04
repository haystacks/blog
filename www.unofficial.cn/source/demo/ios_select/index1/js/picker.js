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
        class: 'select',
        size: 3
    }

    // 
    function Select() {
        this.selectClassName = OPTIONS.class;
        this.lastCheckEleArr = {};
    }

    // Select.prototype.addEvent = function() {
    //     // addEvent
    //     var ele = [].slice.call(arguments)[0];
    //     var self = this;
    //     ele.addEventListener('click', function(e) {
    //         // target || srcElement
    //         var currentTarget = e.currentTarget;
    //         var target = e.target || e.srcElement;
    //         // console.log('%O', currentTarget);
    //         if(target.className === 'select-selected-text' && target.nextElementSibling.style.display === 'none') {
    //             self.lastOptiomEle ? (self.lastOptiomEle.style.display = 'none') : '';
    //             self.lastCheckOptionEle = target;
    //             self.lastOptiomEle = target.nextElementSibling;
    //             // 是否隐藏之前显示的下拉选择? 是
    //             self.hiddenAll();
    //             // 设置当前选中元素的默认值
    //             self.setOptionSelectedValue(target);
    //             // 当前对象的兄弟元素显示
    //             target.nextElementSibling.style.display = 'block';
    //         } else if(target.tagName.toUpperCase() === 'LI') {
    //             console.log('%O', target);

    //             (self.lastLiEle && self.lastLiEle.className.split(' ').indexOf('checking') !== -1) && (self.lastLiEle.className = 'option');
    //             self.lastLiEle = target;
    //             self.lastCheckText = target.innerText;
    //             (target.className.split(' ').indexOf('checking') === -1) && (target.className += ' checking');
    //         } else if(target.className.split(' ').indexOf('cancel') !== -1) {
    //             self.lastLiEle.className = 'option';
    //             self.lastCheckText = '';
    //             currentTarget.children[1].style.display = 'none'; 
    //         } else if(target.className.split(' ').indexOf('confirm') !== -1) {
    //             self.lastCheckText && ((self.lastCheckOptionEle.innerText = self.lastCheckText) && (self.lastCheckText = ''));
    //             currentTarget.children[1].style.display = 'none';
    //         }
    //     });
        
    // }


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
            if(target.className === 'select-selected-text' && target.nextElementSibling.style.display === 'none') {
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
                var dataKey = target.dataset.key;
                var value = target.dataset.value;
                var text = target.innerText;
                var lastEle;
                ((dataKey in self.lastCheckEleArr) && (lastEle = self.lastCheckEleArr[dataKey][2]) && lastEle.className.split(' ').indexOf('checking') !== -1) && (lastEle.className = 'option');
                // self.lastCheckEleArr[dataKey] = [value, text, target];
                self.lastCheckEleArr[dataKey] = [value, text, target];
                (target.className.split(' ').indexOf('checking') === -1) && (target.className += ' checking');
            } else if(target.className.split(' ').indexOf('cancel') !== -1) {
                // 循环遍历内容设置样式为option。情况选择值
                for(var key in self.lastCheckEleArr) {
                    self.lastCheckEleArr[key][2].className = 'option';
                    self.lastCheckEleArr[key] = [];
                }

                currentTarget.children[1].style.display = 'none'; 
            } else if(target.className.split(' ').indexOf('confirm') !== -1) {
                
                var allValue = '', allText = '';
                for(var key in self.lastCheckEleArr) {
                    allValue += self.lastCheckEleArr[key][0];
                    allText += self.lastCheckEleArr[key][1];
                    self.lastCheckEleArr[key] = [];
                }
                self.lastCheckOptionEle.innerText = allText;
                currentTarget.children[1].style.display = 'none';
            }
        });
        
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

    // element select rewrite
    function isSelect() {
        var selectEle = [].slice.call(arguments)[0];
        var name = selectEle.name;
        // 获取默认值 默认文本
        this.selectedValue = selectEle[selectEle.selectedIndex].value;
        this.selectedText = selectEle[selectEle.selectedIndex].textContent;
        
        var len = selectEle.length;
        var optionsHtml = '';
        for(var i = 0; i < len; i++) {
            optionsHtml += this.selectedText === selectEle[i].text ? '<li class="option checking" data-value="'+selectEle[i].value+'">'+selectEle[i].text+'</li>' : '<li class="option" data-value="'+selectEle[i].value+'">'+selectEle[i].text+'</li>';
        }
        
        var div = document.createElement('div');
        // 自定义select注册事件
        this.addEvent(div);
        div.className = this.selectClassName.concat(' ', this.selectClassName, '-', 'right');
        div.id = name;
        div.innerHTML = 
            '<!--<div class="select-selected-value">'+this.selectedValue+'</div>-->'+
            '<!--<input type="text" class="select-selected-value" value="'+this.selectedValue+'">-->'+
            '<span class="select-selected-text">'+this.selectedText+'</span>'+
            '<div class="select-option" style="display: none;">'+
                '<header class="select-option-header">'+
                    '<span class="cancel button">取消</span>'+
                    '<span class="confirm button button-blue">确定</span>'+
                '</header>'+
                
                '<ul class="select-option-body">'+
                    optionsHtml
                '</ul>'+
            '</div>'
        ;
        // 设置初始化选中元素
        this.lastLiEle = this.initLastLiEle(div);
        this.body.appendChild(div);
    }
    
    // element input rewrite
    function isInput() {
        var inputEle = [].slice.call(arguments)[0];
        if(inputEle.type === 'date') {
            isInputDate.call(this, inputEle);
        }
    }

    // 补零操作
    function addZero(str) {
        var length = 2;
        return new Array(length - str.toString().length + 1).join("0") + str;             
    }

    // input type date
    function isInputDate() {
        var dateEle = [].slice.call(arguments)[0];
        var name = dateEle.name;
        // 获取默认值 默认文本
        var d = new Date();
        var initYear = d.getFullYear();
        var initMonth = addZero(d.getMonth()+1);
        var initDay = addZero(d.getDate());
        this.days = getDays(initYear);
        this.startYear = initYear - 5;
        this.endYear = initYear + 5;
        console.log(this.startYear, this.endYear);
        
        // 
        // year
        // 
        var optionsYear = '';
        for(var i = this.startYear; i < this.endYear; i++) {
            optionsYear += i === initYear ? '<li class="option checking" data-key="0" data-value="'+i+'">'+i+'</li>' : '<li class="option" data-key="0" data-value="'+i+'">'+i+'</li>';
        }

        //
        // month
        // 
        var optionsMonth = '';
        for(var i = 1; i <= 12; i++) {
            optionsMonth += i === initMonth ? '<li class="option checking" data-key="1" data-value="'+i+'">'+i+'</li>' : '<li class="option" data-key="1" data-value="'+i+'">'+i+'</li>';
        }

        //
        // day
        //
        var optionsDay = '';
        var days = this.days[initMonth-1];
        for(var i = 1; i < days; i++) {
            optionsDay += i === initDay ? '<li class="option checking" data-key="2" data-value="'+i+'">'+i+'</li>' : '<li class="option" data-key="2" data-value="'+i+'">'+i+'</li>';
        }
        
        var div = document.createElement('div');
        // 自定义select注册事件
        this.addEvent(div);
        div.className = this.selectClassName.concat(' ', this.selectClassName, '-', 'right', ' ', 'date');
        div.id = name;
        div.innerHTML = 
            '<span class="select-selected-text">'+initYear+initMonth+initDay+'</span>'+
            '<div class="select-option" style="display: none;">'+
                '<header class="select-option-header">'+
                    '<span class="cancel button">取消</span>'+
                    '<span class="confirm button button-blue">确定</span>'+
                '</header>'+
                
                '<ul class="date-wrapper">'+
                    '<li>'+
                        '<ul class="select-option-body">'+
                            optionsYear + 
                        '</ul>'+
                    '</li>'+
                    '<li>'+
                        '<ul class="select-option-body">'+
                            optionsMonth + 
                        '</ul>'+
                    '</li>'+
                    '<li>'+
                        '<ul class="select-option-body">'+
                            optionsDay + 
                        '</ul>'+
                    '</li>'+
                '</ul>'
            '</div>'
        ;
        // 设置初始化选中元素
        this.lastLiEle = this.initLastLiEle(div);
        this.body.appendChild(div);
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