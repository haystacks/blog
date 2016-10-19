/**
 * @desc 事件封装tap事件以及pan事件，仅仅针对移动端，通过touchstart/touchend/touchmove来模拟tap与pan
 */
;(function(root) {

	// 常量
	var isTouchEnd = true,
		isPan = false,
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
		
		// 注册鼠标事件与触摸事件
		this.start();
		this.move();
		this.end();
	}

	// 触摸开始
	Somevent.prototype.start = function() {
		var self = this;
		var eventName = isPc ? 'mousedown' : 'touchstart';
		this.ele.addEventListener(eventName, function(e) {
			self._e = e;
			// 第一触摸点 时间 位置
			isTouchEnd = false;
			toucher = e.type == 'touchstart' ? e.touches[0] : e;
			self.eventName == 'pan' && self.pos(toucher);
			e.preventDefault();
		})
	}
	// 触摸移动
	Somevent.prototype.move = function() {
		var self = this;
		var eventName = isPc ? 'mousemove' : 'touchmove';
		this.ele.addEventListener(eventName, function(e) {
			if(!isTouchEnd) { // 鼠标或者触摸未结束
				self._e = e;
				self.dispatch('pan');
				isPan = true;
			}
		})
	}
	// 触摸结束
	Somevent.prototype.end = function() {
		var self = this;
		var eventName = isPc ? 'mouseup' : 'touchend';

		// 判断当前是什么事件
		this.ele.addEventListener(eventName, function(e) {
			self.eventName == 'tap' && isPan == false && self.dispatch(self.eventName);
			isTouchEnd = true;
			isPan = false;
			e.cancelable = false;
			e.preventDefault();
		})
	}
	// 触发元素的位置
	Somevent.prototype.pos = function() {
		this.posInfoStart = {
			x: toucher.clientX,
			y: toucher.clientY
		}
	}

	// 派发事件
	Somevent.prototype.dispatch = function(eventName) {
		var event = new Event(eventName);
		this.ele.dispatchEvent(event);
	}

	root.Somevent = Somevent;
})(window)