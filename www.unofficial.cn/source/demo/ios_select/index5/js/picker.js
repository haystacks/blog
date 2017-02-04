/**
 * @date 2017-02-04
 * @des 多列滑动选择器类封装（日历、地域等）
 * 
 * 思路分析
 * 1. 多列 HTML 结构固定，通过样式名来修改皮肤 √
 * 2. 滑动每列切换数据
 * 3. 点击中间数据获得当前选择数据
 * 4. 点击取消关闭
 * 5. 点击确定选择所有的数据
 */

var xEle = document.getElementById('x');

function Picker(ele) {
    this.deg = 20;
    this.liHeight = 30;
    this.ele = ele;
    this.start = 0;
    this.YId = 0;
    // 注册事件
    this.move();
}

Picker.prototype = {
    move: function() {
        var ulEle = this.ele.lastElementChild.lastElementChild;
        var self = this;

        ulEle.addEventListener('touchstart', function(e) {
            if(e.target.tagName == 'LI') {
                self.start = e.touches[0].clientY;
            }
        })

        ulEle.addEventListener('touchmove', function(e) {
            if(e.target.tagName == 'LI') {
                var liEle = e.target;
                var y = self.start - e.touches[0].clientY;
                var currentUlEle = liEle.parentElement;
                var currentDeg = currentUlEle.getAttribute('style').match(/\d+/)[0];
                var YId = y/self.liHeight;
                var newDeg = YId*self.deg;
                currentUlEle.style.transform = 'rotateX('+ newDeg +'deg)';
                // 动画效果
                
            }
        })

        ulEle.addEventListener('touchend', function(e) {
            if(e.target.tagName == 'LI') {
                var currentUlEle = ulEle.lastElementChild.lastElementChild;
                var currentDeg = currentUlEle.getAttribute('style').match(/\d+/)[0];
                var YId = currentDeg/self.deg;
                console.log(YId);
            }
        })
    }
}

// 重定向 constructor
Object.defineProperty(Picker.prototype, 'constructor', {
    enumerable: false,
    value: Picker
})

new Picker(xEle);