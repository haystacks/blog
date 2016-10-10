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
		ele.addEventListener(eventName, eventHandle);
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
			console.log(e);
			toucher = e.touches[0];
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
		this.ele.addEventListener(eventName, function(e) {
			self.dispatch();
			e.preventDefault();	
		})
	}			

	// 派发事件
	Somevent.prototype.dispatch = function() {
		var event = new Event(this.eventName);
		this.ele.dispatchEvent(event);
	}

	root.Somevent = Somevent;
})(window)