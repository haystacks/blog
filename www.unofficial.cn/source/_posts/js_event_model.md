title: js event model
---
* [什么是js事件](#what-is)
* [事件处理](#_1)
* [移动WEB端的事件](#web)
	* [tap事件](#tap)
	* [zepto中的touch](#zeptotouch)
	* [对zepto的自我认识](#zepto)
	* [fastclick又是怎么做的？](#fastclick)
* [实践出真知](#_2)

### what is ? 
这里学习的JavaScript暂时只是指客户端JavaScript，它是异步事件驱动编程模型。异步与客户端的js是单线程的概念是不是冲突的呢？找了一圈资料，没有找到官方介绍JavaScript的事件模型的。线程，异步这些概念的，参考知乎上的一个问答学习一遍。  
JavaScript是没有线程概念的，所谓的单线程也只是相对浏览器运行环境而言，JavaScript的运行依赖浏览器中的js引擎，例如chrome的v8，Nodejs同样也是依赖v8而生，浏览器的运行机制中，就chrome而言每个标签页都是一个独立的进程。  
呈现引擎采用了单线程。几乎所有操作（除了网络操作）都是在单线程中进行的。在 Firefox 和 Safari 中，该线程就是浏览器的主线程。而在 Chrome 浏览器中，该线程是标签进程的主线程。  
网络操作可由多个并行线程执行。并行连接数是有限的（通常为 2 至 6 个，以 Firefox 3 为例是 6 个）。  
浏览器的主线程是事件循环。它是一个无限循环，永远处于接受处理状态，并等待事件（如布局和绘制事件）发生，并进行处理。  
![event_loop.png](http://ww1.sinaimg.cn/large/e6cd2709gw1f5nupf6frej208607it8n.jpg)  
如何解释客户端中的JavaScript是单线程的例子？  
<script async src="http://jsfiddle.net/unofficial/rwb7qm9z/embed/js/dark/"></script>  

> 输出运行结果

```
(10) start
end
test: 14.000ms
(9) end 
```
最先输出10次start，接着才输出end，然后是第一次循环开始到第一次定时器处理程序运行结束耗时情况，再依次输出9次end。浏览器首先开始for循环，接着把每一次循环中的定时器执行函数添加到事件队列中，10次循环结束后开始执行队列，队列第一个处理程序执行时遇到程序time结束标记，输出执行时间，再依次执行后文的处理程序。  

### 事件处理
* 事件类型（event type）
事件类型是表明发生什么类型事件的字符串，点击事件 ``` click ```，这个事件实际上就是的动作点击鼠标，被称为 ``` click ``` 事件  
* 事件目标（event target）
事件目标是指与事件类型相关的对象，描述事件的时候，我们应该同时指明类型与目标，例如给一个Button添加一个点击事件。  
浏览器支持的事件来源：  
	* 传统事件
		* 表单事件（submit/reset/change/focus/blur）
			* 说明① 事件处理程序能取消submit与reset事件的默认操作
			* 说明② focus与blur事件不会冒泡，IE专属的focusin与focusout事件会冒泡
			* 说明③ 输入文字（键盘或者剪贴板）到textarea或者input，除IE以外的浏览器都会触发input事件
		* window事件（Load事件-DOMContentLoaded/readystatechange，unload事件，onerror事件，abort事件-用户停止加载进程导致失败触发，focus与blur，resize事件，scroll事件）
		* 鼠标事件（mousemove/mousedown/mouseup/mouseover/mouserout/click/dbclick-第二次click事件后触发/mousewheel-滚轮事件/contextmenu-右键菜单事件）
		* 键盘事件（keydown/keyup/keypress）

	* DOM事件（DOM Level 3 Events）
	* HTML5规范新增的事件
		* 连通性
		* 离线与存储
		* 多媒体
		* 图像与效果
		* 性能 & 集成
		* 设备访问
	* 移动设备上的触摸事件（touchmove/touchstart/touchend/orientationchanged）

* 事件处理程序 （event handler）
注册事件有三种方式：  
	* 方式① 给事件目标设置事件属性
		```
		<img id="imgOne" src="" alt="" onload="console.log( 'img loded!' ); return false;">

		or

		<img id="imgOne" src="" alt="" onload="auto">
		<script>
			function auto() {
				console.log( 'img loded!' );
			}
		</script>
		```
	* 方式② Js代码中设置事件处理程序为对象属性

		```

		<script>
			document.getElementById( 'imgOne' ).onLoad = function(e) {
				console.log( 'img Loaded!' );
			}
		</script>

		```

	* 方式③ 通过调用的方式来实现addEventListener( 'Type', 'Handler', false/true) 第三个参数的含义，false冒泡，true捕获。相对的就是removeEventListener事件
		```

		document.getElementById( 'imgOne' ).addEventListener( 'load', function(e) {
			console.log( 'img Loaded!' );
		} )

		IE

		document.getElementById( 'imgOne' ).attachEvent( 'load', function(e) {
			console.log( 'img Loaded!' );
		} )

		```

* 事件对象（event object）
 事件对象是与特定事件相关并且包含该事件的详细信息。事件对象作为参数传递给事件处理程序（IE8以下的浏览器事件对象需要通过全局变量event），事件对象中都有type属性（事件类型）和targe属性（事件目标），以及其他一些附加信息。鼠标事件对象中包含鼠标位置坐标，键盘事件对象包含相关的键的详细信息，等等。  
 <script async src="http://jsfiddle.net/unofficial/rwb7qm9z/1/embed/"></script>

 * target vs currentTarget
 	* 事件对象中包含target与currentTarget
 	* 事件冒泡或者事件捕获过程中，target始终是事件作用源元素，currentTarget是事件当前元素。(解释说明：如demo上给button与div分别绑定了click事件，冒泡过程中target始终是button，触发button上的click事件时currentTarget是button，触发div上的button时currentTarget是div)
 * preventDefault vs stopPropagation
  事件传播与事件捕获是详细描述，见下文

* 事件传播 冒泡（event propagation）
 浏览器决定某元素触发其事件处理程序的过程。事件目标上注册的事件处理函数被调用后，大部分事件都会传播到DOM根元素上。  
  
 	<script async src="http://jsfiddle.net/unofficial/rwb7qm9z/2/embed/"></script>  

 	通过Demo可以得出以下结论：  

 	* 元素button通过onclick设置的事件处理函数会被后面为button设置的事件处理函数覆盖
	* 默认情况下事件会向上传播
	* addEventListener的第三个参数默认为false
	* 同一事件目标可以通过addEventListener为其绑定事件类型时注册多个事件处理函数
	* 元素button通过onclick最后设置的事件处理函数不会被通过addEventListener注册的事件处理函数覆盖，并且onclick以最后一次设置的为准，按照注册事件处理函数的顺序依次累计在消息队列中

 	<script async src="http://jsfiddle.net/unofficial/rwb7qm9z/3/embed/"></script>

 	通过Demo可以总结如下：

 	* focus、blur、scroll事件均不会向上传播

	> 注意：单个对象的特定事件（window.onLoad）是不冒泡的。

* 事件捕获 捕获（event capturing）
	冒泡（事件传播，冒泡描述起来更形象一些，水中的气泡是不是由里问往外冒？）中提到addEventListener有第三个参数，第三个参数不设置的时候默认为false，那么是不是也可以设置为true，答案是肯定的，事实证明addEventListener注册的事件存在3个阶段，第一个阶段是设置true的时候，这里称为事件捕获，第二个阶段是事件目标本身的事件处理函数被调用，第三阶段才是被设置为false的时候，就是这里提到的冒泡。  

	<script async src="http://jsfiddle.net/unofficial/rwb7qm9z/4/embed/"></script>

	```
	// 捕获 执行 冒泡
	```

	事件捕获的用途？  
	
	* 程序调试
	* 事件取消

	> 注意：
	  事件捕获仅能通过addEventListener设置第三个参数为true时使用。（IE9以下浏览器不能事件捕获）
	  事件捕获顺序：window > document > body > other element > 事件目标的父元素

* 事件取消
	* 取消事件的默认操作有几种方法：
		* 在属性注册的事件处理函数中返回值能用于取消事件默认操作
		* 在addEventListener中事件处理函数中调用事件对象的 ``` preventDefault ``` 方法取消事件的默认操作
		* IE9以下版本通过设置returnValue为false来取消事件的默认操作

		<!-- <script async src="http://jsfiddle.net/unofficial/rwb7qm9z/5/embed/"></script> -->
		<script async src="http://jsfiddle.net/unofficial/6xqe5c1q/embed/"></script>

	* 取消事件传播
		* addEventListener中通过stopPropagation方法阻止了其它事件对象上的处理函数不被执行，自身上的其它事件处理函数还是会被执行
		* stopImmediatePropagation不仅阻止了其它事件对象上的处理函数不被执行外，还阻止了自身上的其它事件处理函数被执行，取消事件传播当前函数后续函数体内容还是会继续执行
		* IE9以下版本的浏览器中通过设置属性cancelBubble的值为true可以阻止事件传播

		<script async src="http://jsfiddle.net/unofficial/rwb7qm9z/6/embed/"></script>

* 事件派发/事件广播 dispatchEvent
 ``` dispatchEvent ``` 之前也只没有深入了解过这个，这里参考MDN的资料学习一下。  
 ``` dispatchEvent ``` 是向一个指定的事件目标手动派发一个事件，``` cancelled = !target.dispatchEvent(event) ```。
 * event 是被派发的 ``` Event ``` 事件对象
 * target 是初始化事件目标
 * cancelled 返回值，如果有一个事件处理函数调用了 ``` event.preventDefault() ``` ，则返回false，否则返回true。

 事件派发我们在后文描述移动端事件的时候就有应用，通过touch等相关事件模拟一下tap，swipe事件。touchEnd的时候派发自定义事件到事件目标上。

 ```
  // 初始化事件对象
  var ev = new Event('tap');

  // 为指定事件目标派发事件
  target.dispatchEvent(ev);

  // 为target注册事件
  target.addEventListener('tap', handler);

 ```

* 事件代理/事件委托 delegation
 事件通过通常用于需要对很多元素添加事件，可以将事件添加到他们的父元素上来触发事件处理函数。实现原理是前面提到的事件冒泡机制。  
 如果需要给一个列表的li添加事件，之前我是选择器选中所有的li元素，然后分别绑定事件。如果新增了一个li元素，我们又需要再给新添加的这个元素添加事件。
 
 如果是上面这样通过属性或者选择器选择元素然后注册事件，但是如果是通过事件代理：  

 * 元素绑定在父元素上，通过父元素来监听对子元素的事件作用。
 * 可以便捷的添加修改子元素，不需要重新添加事件
 * 性能方面（选择选择多次元素，遍历添加事件；只是选择父元素，添加一次事件）

 不难看出事件代理有这么多优点，我们是不是随时都可以使用呢？例如我们是不是可以直接将事件代理到document上或者更上层，这样的话我们只是就可以坐享方便与快捷了呢？多数情况仅使用在上述描述的为多个子元素注册使用事件代理。  
 
 <script async src="http://jsfiddle.net/unofficial/1ff08dg8/embed/"></script>
 
 如果封装一个delegate函数呢？

 <script async src="http://jsfiddle.net/unofficial/yjhrbdtp/1/embed/"></script>

 ```
	// 构造方法 
	function Ul(selector) {// 通过选择器识别获得父元素对象
		if(typeof selector == 'object') { // document document.body
	    	return selector;
	    } else if(typeof selector == 'string') { // ul
	    	switch(selector[0]) {
	        	case '#':
	            	this.parentEle = document.getElementById(selector.slice(1));
	                break;
	            case '.':
	            	this.parentEle = document.getElementsByClassName(selector.slice(1))[0];
	                break;
	            default:
	            	this.parentEle = document.getElementsByTagName(selector)[0];
	        }
	    }
		return this;
	}
	Ul.prototype.delegation = function(tagName, event, handler) { // 代理方法通过父元素，以及传入的子元素名称以及事件名称来操作函数
		this.parentEle.addEventListener(event, function(e) {
	    	if(e.target && e.target.nodeName.toLowerCase() == tagName.toLowerCase()) {
	            handler(e);
	            e.stopImmediatePropagation();
	        }
	    });
	}
	function u(e) {// 初始化
		return new Ul(e);
	}
	// 给li注册事件，通过ul元素注册代理事件
	u('#ul').delegation('li', 'click', function(e) {
		console.log(e.type, e.target.innerText);
	});
 ```


> 学习了PC端的事件模型，继续学习移动WEB端相关的事件是不是就轻松一点呢？  

### 移动WEB端的事件
click不是可以继续使用吗？  
是的，可以继续使用。  
网上很多文章有提到click会有300ms的延迟，这又从何处说起呢？（后续补充描述：通过后文的学习可以在fastclick上看到一个[链接](https://developers.google.com/mobile/articles/fast_buttons)，描述的就是为什么会有300ms延迟的存在，看来查阅到的资料以及自己的猜想理解也是大致差不多的）。小屏幕如何浏览PC网页呢？  
话说当年苹果出第一代移动设备的时候，浏览器浏览网页的时候需要双击放大页面局部，现在没有做移动端适配的页面依然如此（双击缩放，在使用非触摸屏手机浏览器浏览网页的时候，浏览器设置一个模拟鼠标，移动到需要的位置然后双击确认键放大页面）。  
[](./js_tap/01.jpg)
[](./js_tap/02.jpg)
 
只是从点击事件考虑的话，未做移动端适配的网页需要单击后会等待300ms（暂时没找到资料参考，数据来源于网上移动端事件教程）考虑是不是需要双击放大页面，但通常处理双击事件时也是需要通过时间差来判断。同时给元素绑定 ``` click/dbclick ``` ，PC端代码测试会执行两次click事件，再执行一次dbclick事件。  
随着移动设备的使用，为了能够更好的响应用户在移动设备上的操作，W3C制定了一些移动端事件来很好的处理用户在移动设备上的相关操作。移动设备需要对触摸移动的支持，PC端我们使用mousemove事件来获得鼠标移动事件对象，移动WEB端却需要使用touchmove才能获得触点事件对象。还有对多点触摸的事件对象等等  
* 未做移动端适配的网页有一个300ms的时间差
* 移动设备触摸操作与PC鼠标操作之间的差别  

#### tap事件
前面提到click事件时我的前提是未做移动端适配的网页，如果使用了meta viewport标签来表明这是一个不需要放大缩小的页面时，是不是就可以直接使用click事件来作为tap事件呢？后文提到的fastclick可以作证是可行的。  
移动端本没有tap事件API，为了能够很好的处理移动端单击事件，于是就使用touch相关API模拟了click事件，也就是这里说的tap事件。  
touch实现tap的过程是什么？  
> touchstart touchmove touchend  

例如：拿起手机，手指触摸到手机屏幕，碰触的那一刻就执行了 ``` touchstart ``` ，如果我执行了滑屏解锁，在滑动的过程中执行的是 ``` touchmove ```，解锁手机了，在解锁结束抬起手机的一刻执行的是 ``` touchend ```。如果把上述过程组装成tap事件，我们就需要判断一下触摸开始到触摸结束耗用的时间，以及触摸过程中手指移动位置是不是在一定范围内才能算作一次tap。  
show me the code？

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>touch tap</title>
</head>
<body>
	<button id="button">Button</button>
	<p id="log"></p>
	<script>
	!function() {
		// 选择元素
		var d = document,
			buttonEle = d.getElementById('button'),
			logEle = d.getElementById('log');
		// 以下部分位置参考早期zepto/src/touch.js
		// 时间变量
		var touch = {},
			touchtimeout;
		
		// tap事件处理函数
		function tapHandle(e) {
			logEle.innerText += e.type + '\r\n';
		}
		// 注册tap事件
		buttonEle.addEventListener('tap', tapHandle);
		
		// 获得触摸开始时间
		buttonEle.addEventListener('touchstart', function(e) {

			// console.log(e);
			var now = Date.now(),
				delay = now-(touch.lastTapTime || now);

			// 事件目标
			touch.target = e.touches[0].target;
			touch.x1 = e.pageX;
			touch.y1 = e.pageY;

			// 是第二次点击，需要取消第一次定义的触摸事件处理函数
			touchtimeout && clearTimeout(touchtimeout);

			// 判断是不是第二次触摸开始
			if(delay>0 && delay<250) {
				touch.isDoubleTap = true;
			}
			// 设置上一次点击事件
			touch.lastTapTime = now;

		});

		// 获得触摸结束时间，并求时间差
		buttonEle.addEventListener('touchend', function(e) {

			// 事件对象
			var ev,
				target = touch.target;

			if(touch.isDoubleTap) { // 初始化双击事件对象 触发双击事件
				ev = new Event('doubleTap');
				// 暂无事件处理
				setTimeout(function() {
					touch = {};
				}, 250);
			} else if('lastTapTime' in touch) { // 初始化单击事件对象 触发单击事件
				ev = new Event('tap');
				// 延迟250ms是判断其它因素取消tap事件，这里暂时做操作
				touchtimeout = setTimeout(function() {
					target.dispatchEvent(ev);
					touch = {};
				}, 250);
			}

		});
	}()
	</script>
</body>
</html>
```

#### zepto中的touch  
github上找到zepto的touch.js ``` https://github.com/madrobby/zepto/blob/master/src/touch.js ``` ，166行代码中定义了滑动方向监测函数 ``` swipeDirection ```，长时间触摸事件 ``` longTap ``` ，取消长时间触摸事件 ``` cancelLongTap ```，取消所有触摸事件 ``` cancelAll ```， isPrimaryTouch， isPointerEventType。接下来就是文档加载结束后初始化相关事件。  

```
  $(document).ready(
  	// 这里是通过处理默认事件API来兼容IE/android/ios触发自定义事件代码
  })
```

* $(document).on('touchstart MSPointerDown pointerdown', handle);
  通过点击按钮，首先执行的是触摸开始（指针按下）注册的 ``` touchstart（MSPointerDown/pointerdown） ``` 事件，首先是通过事件对象中的属性来判断是不是IE相关的触摸，接着判断是不是多点触摸，获取第一个触摸点的事件目标，紧接着对于触摸时间的处理，用于判断是不是双击或者长触摸。  

* $(document).on('touchmove MSPointerMove pointermove', handle);
  触摸后可能移动手指，这里主要获取的是最后移动的位置，以及对比触摸开始位置得到移动移动距离。  

* $(document).bind('MSGestureEnd', handle);
  ``` MSGestureEnd ``` 和 ``` touchend ``` 类似，``` MSGestureEnd ``` 是IE10为win的移动设备增加的动态手势，用于指代动态手势操作结束。获得滑动方向，方向不存在时触发 ``` swipe ``` 事件，存在即触发 ``` swipeLeft/swipeRight/swipeUp/swipeDown ``` 。继续学习下类似的操作。  

* $(document).on('touchend MSPointerUp pointerup', handle);
  ``` touchend ```指触摸结束，``` MSPointerUp ``` ， ``` pointerup ```均指指针离开事件，一看到前缀 ``` MS ``` 就知道是为了兼容，带前缀在IE11下就不被支持了，于是这里增加了一个不带前缀的事件类型。触摸结束时通过对比触摸移动的距离是不是超过30来判断是不是需要触发 ``` swipe ``` 滑动事件。如果移动的位置在30以内，并且触摸开始时设置的 ``` last ```属性还存在，判断是点击事件，如果是双击则触发 ``` doubleTap ```，否则触发 ``` singleTap ```。  

* $(document).on('touchcancel MSPointerCancel pointercancel', handle);
  注册事件取消操作。  

* $(window).on('scroll', handle);
  给window注册滚动事件时取消所有事件操作。

* 通过注册以上事件实际上给触摸的事件目标模拟了 ``` swipe ```, ``` swipeLeft ```, ``` swipeRight ```, ``` swipeUp ```, ``` swipeDown ```, ``` doubleTap ```, ``` tap ```, ``` singleTap ```, ``` longTap ``` 事件

```
['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
})
```

通过 forEach 将上述事件添加到zepto全局属性中去，然后就可以愉快的使用上述事件了。 

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>zepto</title>
</head>
<body>
	<button id="button">Button</button>
	<p id="log"></p>

	<script src="/js_tap/zepto/src/zepto.js"></script>
	<script src="/js_tap/zepto/src/event.js"></script>
	<script src="/js_tap/zepto/src/touch.js"></script>
	<script>
	$(function() {
		var $buttonEle = $('#button'),
			$logEle = $('#log');

		// tap
		$buttonEle.on('tap', function(e) {
			console.log(e);
		})
	});
	</script>
</body>
</html>
```

#### 对zepto的自我认识
整理整个tuoch.js运行思路的时候，对于IE的兼容这块一直没考虑，总觉得移动设备是Android和ios的阵营，但不得不提到MS的surface，winphone，这里主要涉及到一些兼容方面的处理。多点触摸的时候的处理，对于长按触摸以及多点触摸滑动等的判定处理。只能说对于整体处理思路上有一个了解了，能分析出程序处理的流程，对于细节上的处理的理解还是不够透彻，下次可以更为详细的分析一下具体的实现理由，是否可以更好的处理。  

#### fastclick又是怎么做的？
##### what?
fastclick的readme的描述说，fastclick就是为了解决物理设备点击或移动设备浏览器上触摸触发的300ms的延迟的类。
##### when?
* 非桌面浏览器
* 在chrome上没有设置 ``` user-scalable=no ```（禁止缩放）
* chrome 32+ 上没有设置 ``` width=device-width ```
* IE11+ 没有使用 ``` touch-action: manipulation ```
* IE10 没有使用 ``` -ms-touch-action: manipulation ```

存在以上情况才有使用fastclick的必要，毕竟fastclick是以处理问题而生的。  
##### how?
代码行数蛮多，更多的是注释，描述这么处理是需要解决什么问题，其中有很大一部分都是在解决兼容问题以及事件本身的问题，以为fastclick是在 ``` FastClick.prototype.onTouchEnd ``` 是解决完各种能够遇见的问题的时候调用 ``` sendClick ``` 这个方法也是这个类的关键之处，展示代码

```
	/**
	 * Send a click event to the specified element.
	 * 给指定的元素注册一个点击事件
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};
```

> Send a click event to the specified element.  

描述讲清楚这里原理，还是回到click上来。初始化一个鼠标事件，然后触发自定义的点击事件。即将touch事件在最后还是换成了立即触发的click事件。  
为什么这么做，这么做有什么好处，由于涉及到移动端还不够深入，至于问题方面遇见的也不够，所以更多的也不是太清楚，这一点还希望后面有机会遇见问题，找到为什么要这么处理问题，这个才是我的关键之处。  
透过钗哥的文章也没能很好的理解其中的问题，他提到了一些tap会引发的问题，我在测试 http://sandbox.runjs.cn/show/8ruv88rb 的时候，tap与fastclick差别其实不大，这里也就不是很理解，也不过多描述，待后续分析补充。  

### 实践出真知
通过上文对于事件的学习，以及移动端事件的学习，实现一个简单的滑动库  
这是一个不完整的demo，敲一会儿代码被一些事件耽搁一下，一会又被耽搁一下，思路也不清晰，找时间重新再写。毕竟之前也实现过都是可行的，只是这次是按照上面学习的知识点再综合理解来实现，结果还不如从前了，哈哈哈~  
整理整理思路，重新再来！  
<script async src="http://jsfiddle.net/unofficial/8gykht86/embed/"></script>  
重写后还是有些小问题。  
<iframe src="/js_event_model/swipe.html" frameborder="0"></iframe>
### 参考资料
* [如何证明JavaScript是单线程的？](http://www.zhihu.com/question/31982417)
* [EventLoop - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
* [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
* [JavaScript单线程和浏览器事件循环简述](http://www.cnblogs.com/whitewolf/p/javascript-single-thread-and-browser-event-loop.html)
* [深入解析浏览器的幕后工作原理](http://www.cnblogs.com/lhb25/p/how-browsers-work.html)
* [EventTarget.dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)
* [Events-EventTarget-dispatchEvent](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent)
* [http://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html](http://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html)

* [http://www.w3.org/TR/touch-events/#introduction](http://www.w3.org/TR/touch-events/#introduction)
* [https://github.com/madrobby/zepto](https://github.com/madrobby/zepto)
* [http://www.cnblogs.com/yexiaochai/p/3462657.html](http://www.cnblogs.com/yexiaochai/p/3462657.html)
* [https://github.com/ftlabs/fastclick](https://github.com/ftlabs/fastclick)
* [https://developers.google.com/mobile/articles/fast_buttons](https://developers.google.com/mobile/articles/fast_buttons)