!function() {                
    var Select = (function() {
        // 根据select的name值作为id值初始化自定义select
        function Select() {
            // 自定义select的class名
            this.selectClassName = 'select';
            this.body;
        }

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
                    (self.lastLiEle && self.lastLiEle.className.split(' ').indexOf('checking') !== -1) && (self.lastLiEle.className = 'option');
                    self.lastLiEle = target;
                    self.lastCheckText = target.innerText;
                    (target.className.split(' ').indexOf('checking') === -1) && (target.className += ' checking');
                } else if(target.className.split(' ').indexOf('cancel') !== -1) {
                    self.lastLiEle.className = 'option';
                    self.lastCheckText = '';
                    currentTarget.children[1].style.display = 'none'; 
                } else if(target.className.split(' ').indexOf('confirm') !== -1) {
                    self.lastCheckText && ((self.lastCheckOptionEle.innerText = self.lastCheckText) && (self.lastCheckText = ''));
                    currentTarget.children[1].style.display = 'none';
                }
            });
            
        }

        // 根据name创建select
        Select.prototype.create = function() {
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

    })()


    var body = document.querySelector('body');
    var selects = document.querySelectorAll('select');

    var len = selects.length;

    for(var i = 0; i < len; i++) {

        var select = new Select();
        select.body = body;
        // 获取默认值类型 value or text
        select.type = 'text';
        // 创建自定义select
        select.create(selects[i]);
        // 隐藏源select
        selects[i].style.display = 'none';
    }
}()