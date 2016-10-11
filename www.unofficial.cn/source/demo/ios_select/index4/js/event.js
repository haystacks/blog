/**
 * @desc 事件封装tap事件以及pan事件，仅仅针对移动端，通过touchstart/touchend/touchmove来模拟tap与pan
 */
;(function(root) {

	// 常量
	var isTouchEnd = true,
		isPc = !/iphone|android/.test(navigator.userAgent.toLowerCase()),
		toucher;

	// 仅仅封装了部分事件
	function Somevent(ele, eventName, eventHandle) {
		// 注册事件
		var self = this;
		ele.addEventListener(eventName, function(e) {
			eventHandle(self._e);
		});
		// 属性
		this.ele = ele;
		this.eventName = eventName;
		this.eventHandle = eventHandle;
		this.start();
		this.end();
	}

	// 触摸开始
	Somevent.prototype.start = function() {
		var eventName = isPc ? 'mousedown' : 'touchstart';
		this.ele.addEventListener(eventName, function(e) {
			// 第一触摸点 时间 位置
			isTouchEnd = false;
			toucher = e.type == 'touchstart' ? e.touches[0] : e;
			// e.preventDefault();
		})
	}
	// 触摸移动
	Somevent.prototype.move = function() {

	}
	// 触摸结束
	Somevent.prototype.end = function() {
		var self = this;
		var eventName = isPc ? 'mouseup' : 'touchend';

		// 判断当前是什么事件
		var currentType = this.whatEvent();
		this.ele.addEventListener(eventName, function(e) {
			self._e = e;
			if(currentType == self.eventName) {
				self.dispatch();
			}
			e.preventDefault();
		})
	}			

	// 派发事件
	Somevent.prototype.dispatch = function() {
		var event = new Event(this.eventName);
		this.ele.dispatchEvent(event);
	}

	// 根据end与start的时间与距离判断事件类型
	Somevent.prototype.whatEvent = function() {
		return 'pan';
	}

	root.Somevent = Somevent;
})(window)