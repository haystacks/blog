/**
 * @desc 事件封装tap事件以及pan事件，仅仅针对移动端，通过touchstart/touchend/touchmove来模拟tap与pan
 */
;(function(root) {

	// 仅仅封装了部分事件
	function Somevent(ele, eventName, eventHandle) {
		// ele.addEventListener(eventName, eventHandle);
	}

	// 触摸开始
	Somevent.prototype.start = function() {
		
	}
	// 触摸结束
	Somevent.prototype.end = function() {
		
	}

	// 派发事件
	Somevent.prototype.dispatch = function() {
		var event = new Event(eventName);

		ele.
	}

	root.Somevent = Somevent;
})(window)