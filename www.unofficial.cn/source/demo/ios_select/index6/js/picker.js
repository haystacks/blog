/**
 * @date 2017-02-04
 * @des 多列滑动选择器类封装（日历、地域等）
 * 
 * 思路分析
 * 1. 多列 HTML 结构固定，通过样式名来修改皮肤 √
 * 2. 滑动每列切换数据 √
 * 3. 更新追加数据 √
 * 4. 级联数据 ×
 * 5. 点击确定选择所有的数据 √
 * 6. 点击取消/背景/确定后关闭弹出面板
 * 7. 待优化 ×
 */

var deg = 20;
var liHeight = 30;

function Picker(ele) {
    this.ele = ele;
    this.start = 0;
    this.YId = 0;
    // 注册事件
    this.bindEvent(this.ele);
}

Picker.prototype = {
    scroll: function() {
        var self = this;
        [].slice.call(self.getPickers(self.ele)).forEach(function(ulEle) {
            divEle = ulEle.parentElement;
            divEle.addEventListener('touchstart', function(e) {
                if(e.target.tagName == 'LI') {
                    self.start = e.touches[0].clientY;
                    var liEle = e.target;
                    var y = self.start - e.touches[0].clientY;
                    var currentUlEle = liEle.parentElement;
                    self.currentDeg = parseInt(currentUlEle.getAttribute('style').match(/\d+/)[0]);
                }
            })

            divEle.addEventListener('touchmove', function(e) {
                if(e.target.tagName == 'LI') {
                    var liEle = e.target;
                    var y = self.start - e.touches[0].clientY;
                    var currentUlEle = liEle.parentElement;
                    var YId = y/liHeight;
                    var newDeg = self.currentDeg+YId*deg;
                    var maxDeg = (currentUlEle.children.length-1)*deg;
                    newDeg = newDeg < 0 ? 0 : (newDeg > maxDeg ? maxDeg : newDeg);
                    currentUlEle.style.webkitTransform = 'rotateX('+ newDeg +'deg)';
                    currentUlEle.style.transform = 'rotateX('+ newDeg +'deg)';
                    // update li visible显示
                    var typeName = currentUlEle.parentElement.dataset.id;
                    var key = self.getType(currentUlEle);
                    self.ids[key] = Math.round(newDeg/deg);
                    self.setLiVisibility(currentUlEle, key);
                }
                e.preventDefault();
            })

            divEle.addEventListener('touchend', function(e) {
                if(e.target.tagName == 'LI') {
                    var liEle = e.target;
                    var currentUlEle = liEle.parentElement;
                    var key = self.getType(currentUlEle);
                    var id = self.ids[key];
                    var endDeg = id*deg;
                    currentUlEle.style.webkitTransform = 'rotateX('+ endDeg +'deg)';
                    currentUlEle.style.transform = 'rotateX('+ endDeg +'deg)';
                }
            })
        })
    },
    ok: function() {
        var self = this;
        var okEle = self.ele.querySelector('#ok');
        okEle.addEventListener('click', function() {
            // 获取值
            [].slice.call(self.getPickers(self.ele)).forEach(function(ulEle, key) {
                self.valueJson[key] = ulEle.children[self.ids[key]].innerText;
            })
            self.value = self.valueJson.join('-');
            self.callback(self.value);
            self.hiden(self.ele);
        })
    },
    cancel: function() {
        var self = this;
        var cancelEle = self.ele.querySelector('#cancel');
        cancelEle.addEventListener('click', function() {
            self.hiden(self.ele);
        })
    },
    getPickers: function(ele) {
        return ele.querySelectorAll('ul');
    },
    getType: function(currentUlEle) {
        var typeName = currentUlEle.parentElement.dataset.id;
        var key;
        switch(typeName) {
            case 'date-y':
                key = 0;
                break;
            case 'date-m':
                key = 1;
                break;
            case 'date-d':
                key = 2;
                break;
        }
        return key;
    }
}

// 重定向 constructor
Object.defineProperty(Picker.prototype, 'constructor', {
    enumerable: false,
    value: Picker
})


Picker.prototype.initBg = function() {
    var pickerBg = document.createElement('div');
    pickerBg.className = 'picker-bg';
    // 追加到body中
    document.body.appendChild(pickerBg);
}

Picker.prototype.setItems = function(items) {
    var buffer = [];
    items.forEach(function(item, key) {
        if (item !== null && item !== undefined) {
            buffer.push('<li data-value="'+ item.value +'" style="-webkit-transform: rotateX('+ -key*deg +'deg) translate3d(0px, 0px, 85.0692px); transform: rotateX('+ -key*deg +'deg) translate3d(0px, 0px, 85.0692px);">' + item.text + '</li>');
        }
    });
    return this.dom(buffer.join(''));
};

/** 
 * picker-cancel picker-ok picker-scroll
 */
Picker.prototype.bindEvent = function(pickerEle) {
    this.ele = pickerEle;
    // 滚动事件
    this.scroll();
    this.ok();
    this.cancel();
}
Picker.prototype.hiden = function(dom) {
    dom.className = 'picker-main';
    // 去背景
    document.body.removeChild(document.querySelectorAll('.picker-bg')[0]);
}
Picker.prototype.show = function(dom) {
    dom.className = 'picker-main picker-active';
    // 添加背景，通过点击背景也可以关闭datepicker
    this.initBg();
}

/**
 * 其它公用方法，暂时封装在Picker中
 * 1. dom 通过创建一个dom包装器，插入dom
 */ 
Picker.prototype.dom = function(dom) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = dom;
    return wrapper;
}