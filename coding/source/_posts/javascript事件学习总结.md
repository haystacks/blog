title: javascript 事件处理
---
对于事件处理我一直是知其然不知其所以然，近期做webapp时遇到关于事件的问题，决定仔细研究一下关于事件方面的知识。
<!-- more -->
### 初识事件
javascript（客户端）程序采用了异步事件驱动编程模型，通过注册事件处理程序函数来编写程序，之后在注册的事件发生时异步调用这些函数（这个函数有这几种叫法：“事件处理程序”，“事件监听器”，“回调”）。  
在最初接触到html的时候，有一种写法就是通过html属性来绑定事件。  
eg:
```
<a href="javascript:;" onclick="alert(this.href);">点我点我点我</a>
```
后来听说**javascript最好和html分离开**。团队细化后应该更能体现对于协作开发的好处（对于个人开发或者维护某网站的时候，总是怎么快捷简单怎么来），很少综合考虑一些问题，对于性能优化等等都不做太多要求，也就是这样造就很多编码恶习。（但时光荏苒，react好像有回来了，但还是差别蛮大）面对多个方向，我还是决定静下心来沉淀好基础。  
html eg:  
```
<a href="javascript:;" id="clickme">点我点我点我</a>
```
js eg:  
```
var clickmeEle = document.getElementById('clickme');
clickmeEle.onclick = function() {
	console.log('你点击了"点我点我点我"');
}
```
相应的事件其实还有很多，这里只是描述到了click事件，实际还有这些：
#### 事件分类
*. 依赖设备的输入事件
eg: mousedown, mouseup, mousemove, keydown, keypress, keyup, touchstart, touchmove, touchend…
*. 独立于设备的输入事件
eg: click既可以使用鼠标点击实现，也可以通过键盘或者触摸设备上的手势实现
*. 用户界面的事件
eg: blur, focus, change, submit, reset
*. 状态变化事件
eg: DOMContentLoaded, load, readystatechange, poststate, online, offline等等
*. 特定事件
eg: dragstart, dragenter, dragover, drop等
*. 计时器与错误处理程序

@参考资料（中英对照）
https://developer.mozilla.org/zh-CN/docs/Web/API/Event
https://developer.mozilla.org/en-US/docs/Web/API/Event

### 再识DOM事件
回到问题之初，重点暂时还是先放在DOM事件相关的地方。[DOM3](https://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture)最新的工作草案截至本文写作前最后的是20151215的版本。

### 参考资料
https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#Memory_issues
https://www.w3.org/TR/DOM-Level-3-Events/#event-flow