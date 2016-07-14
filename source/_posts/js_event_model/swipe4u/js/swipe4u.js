	!function() {

		// 全局参数
		var currentIndex = 1;
		// 动画时间
		var delay = '.6s';
		// 动画宽度
		var width;

		// 通过选择器获得元素对象
		// qsa querySelectorAll
		var qsa = function(element, selector){
			var found,
				maybeID = selector[0] == '#',
				maybeClass = !maybeID && selector[0] == '.',
				// Ensure that a 1 char tag name still gets checked
				nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, 
				isSimple = /^[\w-]*$/.test(nameOnly);
			return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
			( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
			(element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
			[].slice.call(
				isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
					maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
					element.getElementsByTagName(selector) : // Or a tag
					element.querySelectorAll(selector) // Or it's not simple, and we need to query all
			);
		}

		// 初始化参数
		var initConfig = function(options) {
			var options = options ? options : {};
			// 暂时不考虑参数
			this.sonNodeName = 'li';
			!('width' in options) || (width = options.width ? options.width : null);
		}

		// 触摸开始
		var onStart = function(e) {
			e.preventDefault();
			var now = Date.now();
			// 当前触摸源
			this.target = e.target;
			// 上一个兄弟元素，下一个兄弟元素
			this.prevEle = this.target.previousElementSibling ? this.target.previousElementSibling : this.maxPrevEle;
			this.doublePrevEle = this.prevEle.previousElementSibling ? this.prevEle.previousElementSibling : this.maxPrevEle;

			this.nextEle = this.target.nextElementSibling ? this.target.nextElementSibling : this.maxNextEle;
			this.doubleNextEle = this.nextEle.nextElementSibling ? this.nextEle.nextElementSibling : this.maxNextEle;
			// 设置width
			width = width ? width : this.target.clientWidth;
			// 选择第一触摸手指坐标值
			this.x1 = e.touches[0].pageX;
			this.y1 = e.touches[0].pageY;
			this.diff = null;
			this.lasttime = now;
		}

		// 触摸过程中
		var onMove = function(e) {
			this.x2 = e.touches[0].pageX;
			this.y2 = e.touches[0].pageY;

			// 计算移动差值
			this.diff = Math.ceil(this.x2 - this.x1);
			direction.call(this);
			this.animation();
		}

		// 触摸结束
		var onEnd = function(e, ev) {
			if(e.target.nodeName.toLowerCase() === this.sonNodeName && Math.abs(this.diff) > 30) {
				this.pEle.dispatchEvent(ev);
			} else if(Math.abs(this.diff) < 30) {
				this.diff = 0;
				this.animation();
			}
		}

		// 注册事件
		var addEvent = function() {
			// 初始化swipe事件
			var ev = new CustomEvent('swipe');
			// 暂时只处理一个元素滑动
			var pEle = this.pEle;
			var sEle = pEle.children;
			// 添加data-index
			for (var i = 0, len = sEle.length - 1; i <= len; i++) {
				switch(i) {
					case 0:
						sEle[i].setAttribute('class', 'active');
						this.maxNextEle = sEle[i];
						break;
					case 1:
						sEle[i].setAttribute('class', 'next');
						break;
					case len:
						sEle[i].setAttribute('class', 'prev');
						this.maxPrevEle = sEle[i];
						break;
				}
			}

			//转移this
			var self = this;

			// 触发开始事件
			pEle.addEventListener('touchstart', function(e) {
				onStart.call(self, e);
			});
			
			// 触发开始事件
			pEle.addEventListener('touchmove', function(e) {
				onMove.call(self, e);
			});

			// 给父元素注册touchEnd事件
			// 触发自定义
			pEle.addEventListener('touchend', function(e) {
				onEnd.call(self, e, ev);
			})
			
			//通过事件代理给子元素注册swipe事件
			pEle.addEventListener('swipe', function(e) {
				self.swipe.call(self, e);
			});

		}

		// 通过滑动手势判断滑动方向
		var direction = function() {
			this.direction = this.diff > 0 ? 1 : -1;
		}

		// 构造Swiper4u类
		function Swiper4u(selector, options) {
			// 定义全局元素
			// 当前元素为 this.target 触摸触发
			this.pEle = qsa(document, selector)[0];
			// 格式化参数
			initConfig.apply(this, options);
			// 注册事件
			addEvent.call(this);
			// console.log(this);
			return this;
		}

		Swiper4u.prototype.swipe = function(e) {
			// 判定移动方向
			direction.call(this);
			// 设置终点位置移动值
			// var x = this.target.clientWidth * this.direction;

			// this.target.style.webkitTransform = 'translate3d('+ x +'px, 0, 0)';
			// this.target.style.transform = 'translate3d('+ x +'px, 0, 0)';
			// this.target.style.webkitTransition = 'webkitTransform .6s';
			// this.target.style.transition = 'transform .6s';

			// 根据方向确定移动
			if(this.direction === 1) { // 向右
				setTimeout(function() {
					this.target.className='next';
					this.prevEle.className='active';
					this.doublePrevEle.className='prev';


					[this.target, this.prevEle, this.nextEle].map(function(ele) {
						ele.removeAttribute('style');
					})
				}.call(this), 4)

			} else if(this.direction === -1) { // 向左
				setTimeout(function() {
					this.target.className='prev';
					this.nextEle.className='active';
					this.doubleNextEle.className='next';


					[this.target, this.prevEle, this.nextEle].map(function(ele) {
						ele.removeAttribute('style');
					})
				}.call(this), 4)
			}

		}

		// 设置滑动动画
		Swiper4u.prototype.animation = function() {
			// 确定方向，移动距离
			// 执行动画操作
			if(this.target.nodeName.toLowerCase() === this.sonNodeName) {
				this.target.style.webkitTransform = 'translate3d('+ this.diff +'px, 0, 0)';
				this.target.style.transform = 'translate3d('+ this.diff +'px, 0, 0)';
				
				// 如果向右滑动，上一个跟着滑动
				if(this.direction === 1) {
					// traslateX
					var tx = this.diff-width;
					this.prevEle.style.webkitTransform = 'translate3d('+ tx +'px, 0, 0)';
					this.prevEle.style.transform = 'translate3d('+ tx +'px, 0, 0)';
				} else if(this.direction === -1) {
					// traslateX
					var tx = this.diff+width;
					this.nextEle.style.webkitTransform = 'translate3d('+ tx +'px, 0, 0)';
					this.nextEle.style.transform = 'translate3d('+ tx +'px, 0, 0)';
				}
			}
		}

		// 暴露全局
		window.swiper4u = function(selector) {
			return new Swiper4u(selector);
		}
	}()