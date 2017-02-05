/** 
 * 日期选择器插件
 */
var START_YEAR = 2013;
var END_YEAR = new Date().getFullYear();
var dom = '<div class="picker-main" date-type="date">\
        <div class="picker-header">\
            <div id="cancel" class="btn">取消</div>\
            <div id="ok" class="btn btn-blue">确定</div>\
        </div>\
        <div class="picker-title">\
            <h5 data-id="date-y">年</h5>\
            <h5 data-id="date-m">月</h5>\
            <h5 data-id="date-d">日</h5>\
        </div>\
        <div class="picker-body">\
            <div data-id="date-y" class="picker">\
                <div class="picker-rule"></div>\
                <ul></ul>\
            </div>\
            <div data-id="date-m" class="picker">\
                <div class="picker-rule"></div>\
                <ul></ul>\
            </div>\
            <div data-id="date-d" class="picker">\
                <div class="picker-rule"></div>\
                <ul></ul>\
            </div>\
        </div>\
    </div>';

function inheritPrototype(DatePicker, Picker) {
    var prototype = new Object(Picker.prototype);
    prototype.constructor = DatePicker;
    DatePicker.prototype = prototype;
}
inheritPrototype(DatePicker, Picker);

function DatePicker(options) {
    this.startYear = options.startYear || START_YEAR;
    this.endYear = options.endYear || END_YEAR;
    this.value = options.value || this.getToday();
    this.valueJson = this.value.split('-');
    this.ids = [];
    this.init();
}

// 初始化数据
DatePicker.prototype.init = function() {
    this.ele = this.dom(dom).firstElementChild;
    this.initDateData();
    // 追加到body中
    document.body.appendChild(this.ele);
    // 绑定事件
    this.bindEvent(this.ele);
}

DatePicker.prototype.initDateData = function() {
    var self = this;
    [].slice.call(self.getPickers(self.ele)).forEach(function(ulEle, key) {
        switch(key) {
            case 0:
                self.initDateYear(ulEle);
                break;
            case 1:
                self.initDateMonth(ulEle);
                break;
            case 2:
                self.initDateDay(ulEle);
                break;
        }
        self.setLiVisibility(ulEle, key);
    })
}

DatePicker.prototype.initDateYear = function(ulEle) {
    this.setDate(ulEle, this.startYear, this.endYear, 0);
}

DatePicker.prototype.initDateMonth = function(ulEle) {
    this.setDate(ulEle, 1, 12, 1);
}

DatePicker.prototype.initDateDay = function(ulEle) {
    var days = 31;
    this.setDate(ulEle, 1, days, 2);
}

// 构建数据
DatePicker.prototype.setDate = function(ulEle, start, end, type) {
    var self = this;
    var items = [];
    var id = 0;
    for(var i = start; i <= end; i++) {
        // 获取默认选中ID
        if(i == self.valueJson[type]) {
            id = items.length;
            self.ids.push(id);
        }
        items.push({
            value: self.fill(i),
            text: self.fill(i)
        });
    }
    var liEleAll = this.setItems(items).innerHTML;
    ulEle.innerHTML = liEleAll;
    ulEle.style.webkitTransform = 'rotateX('+ id*deg +'deg)';
    ulEle.style.transform = 'rotateX('+ id*deg +'deg)';
}

// 默认展示数据，默认显示 5 个，由角度决定，暂时固定值
DatePicker.prototype.setLiVisibility = function(ulEle, key) {
    // 移除现有的visible
    [].slice.call(ulEle.children).forEach(function(li) {
        li.className = '';
    })
    var id = this.ids[key];
    var start = id - 2;
    start = start < 0 ? 0 : start;
    var end = id + 2;
    end = end > ulEle.children.length - 1 ? ulEle.children.length - 1 : end;
    for(var i = start; i <= end; i++) {
        ulEle.children[i].className = 'visible';
    }
}
// 获取今天的日期
DatePicker.prototype.getToday = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year+ '-' +this.fill(month)+ '-' +this.fill(day);
}
// 日月不足两位补位
DatePicker.prototype.fill = function(num) {
    var num = num.toString();
    if(num.length < 2) {
        num = 0 + num;
    }
    return num;
}

// 
DatePicker.prototype.getDate = function(callback) {
    this.callback = callback;
}

