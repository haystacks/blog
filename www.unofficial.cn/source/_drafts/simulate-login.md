---
title: 模拟登录
date: 2017-03-09 21:08:03
categories: 
- 学习
tags:
- js
---
饭粒淘肉测的时候，很多朋友反馈查询不到优惠卷，自然而然对我做的这个小工具失去了兴趣，数据量偏少，这个是我知道的问题，如果先把这个问题解决了后续的问题再慢慢来，但是对于更新计划而言，这个不是目前最为紧要的，却是目前我能想办法解决的。  
<!-- more -->
### 分析出数据接口
在分析接口的时候可以借助文档工具，把文档写下来，后期查阅或者完善有很好的帮助。这里用了一个简单的国产工具，showdoc   

* 链接查询优惠数据查询接口
这个可以不需要登录也能查询到是否存在优惠，优惠有多少，但是不能转换成自己的优惠使用，只能用于查询，如果需要获得淘口令等信息就需要合法的登录用户。  

* 淘口令生成接口
需要登录，这一点只是把接口分析出来，后续实现登录拿到需要的token  

* 转换工具接口
同上  

* 下载excel用于导入数据工具（定时下载导入数据/删除过期数据替换人工操作）
同上  

* 模拟登录
综上发现如果需要获得数据，基本都需要登录才能获取，于是接下来重要分析的一个环节就是如何实现登录  

### 如何模拟登录？
登录随时都可能遇见，也在实际工作中实现过，简单描述就是一个用户名，一个密码，一个验证码（可选），一个提交信息认证地址。  
* 常规模拟
比如微博的登录，微博的HTML5版本的登录，直接就是用户名密码提交至直接接口，认证成功以后会返回cookie信息，然后下次操作时把相关信息携带上就可以实现权限操作，后面用这个实现了一个批量删除微博的工具，删除了自己发布的所有微博信息  

* 加密提交
博客园的认证信息是把用户名以及密码信息都通过RSA加密后再提交，这样就需要js调用一些加密算法才能实现加密，不能直接单纯的提交用户名密码信息，使用nodejs同类的加密算法，拿到加密需要的publickey，加密数据后再提交加密后的数据就可以实现登录了  

* 加密密码以及行为认证
在淘宝模拟登录的时候遇到了一些难题，首先是正常操作，抓取提交数据协议。需要提交的参数，以及提交地址，准备工作看起来都很平常。难点却是在于这些参数如何获得，如何实现。  

### 如何模拟淘宝登录？
不能单纯的用上面的方法来实现模拟登录，因为请求登录页面的时候，页面返回的只是一个基础页面，很多的模拟登录时候需要提交的参数都是需要通过运行js之后才能获得，于是想到了一个工具 phantomjs（headless broswer）。

* phantomjs
phantomjs 的介绍就不过多描述了，基本都是参考的官方文档，但发现官方文档也年久失修了，简单说就是一个浏览器，直说说没有界面，浏览器能做的它基本都能做，只是没有按照标准更新，可能一些新特性它支持就不是那么好，也就可能遇到一些兼容或者其它问题。  
有了phantomjs的帮助，很容易就拿到了页面中存放在隐藏文本框中的数据，对于密码加密也是一个很容易办到的事情，因为你只是需要通过js把密码填入到密码文本框中，最后提交的时候，程序会自己把密码进行RSA加密上传，按理说没有难点了啊？那你怎么还说有困难呢？  
```
const page = require('webpage').create();
page.open(url, function(status) {
  if(status === 'success') {
    page.evaluate(function() { // 这里类似在一个沙盒中执行，和浏览器中调试输出应该是一致的
      $('#username').val('用户名');
      $('#password').val('密码');
      // 按理说这里应该可以直接提交数据了，但是有一个验证是输入事件验证
      // 默认情况下 submit button 是 disabled 的
      // 用户名与密码均填写以后会各自触发自己的输入事件判断当前输入字符长度来解锁登录按钮
      $('#password').trigger('input');
      // 默认提交，这里其实会触发行为验证失败，再次识别你是不是机器人，一句话：登录失败
      $('#submit_btn').trigger('click');
    })
  }
})
```

* 行为检测
其中有一个参数是一直在变化的，UA，通常理解的就是 UserAgent，这个在平时模拟登录的时候也经常遇见这个检测 UserAgent 的。但是这里的 UA 不是那么简单，点击页面任何一个位置或者说不再移动端的时候还有有其它事件也能处罚 UA 值的变化，控制 UA 变化的逻辑都在 89.js 中，但是这个文件是进过压缩过的，读起来是基本不能读，但是可以从中拿到一些逻辑。  

> 第一步找到变化的隐藏文本框 UA  
![](/assets/imgs/20170310/pic_01.png)  

> 断点调试（文本框右键 berak on）
1. subtree modifications
2. attributes modifications
3. Node removal

这里是属性 val 在变化，开启 attributes modifications 会发现，各种事件均会触发断点，即UA的变化
![](/assets/imgs/20170310/pic_02.jpg)  

* 空 UA 能模拟登录（这个只是暂时的方法）
UA 的参数设置为空，提交登录成功了，但是没有相关的行为操作，这个很容易会被检测出来，然后把你的帐号进行一个限制登录。这也是后续需要担心的一个问题，分发出去的接口需要用户使用自己的帐号来登录，而且不能使用常用帐号，避免限制操作后的一个附带功能失效的问题

* 二次验证码
行为验证码通常也是可以模拟的，但是正常情况下主动模拟失败，出现了一个行为检测点击某位置或者拖动验证码的时候，按理说也能通过模拟来实现，但是我直接手动验证也提示验证失败，这个应该和上一步的行为操作有关，或者说这个验证根本就是一个摆设，验证后会进入下一个常规的数字字母验证环节，这里记录两个思路。  

方案一截图验证码发送至微信，手动输入验证码回复填入提交验证，但是不能保证及时输入验证码  
方案二接入验证码识别平台，这个按照收费计算，一天1.5h更新一次，16次验证就可以搞定  

### 问题总结
路漫漫，爬虫与反爬虫就是一直以来的冤家，而我所经历的只是冰山一点。未来的路还很长，继续前行…  

* 模拟事件触发隐藏文本框值的变化
```
// 主动点击按钮来改变
<input id="input" type="hidden" value="123" />
<div></div>
<button id="button">按钮</button>
<script>
    !function(window, document) {
        var input = document.getElementById('input'),
            button = document.getElementById('button');
        button.addEventListener('click', function() {
            input.value = ~~input.value + 1;
        })
    }(window, document)
</script>
// 用js来模拟点击
<script>
    !function(window, document) {
        var input = document.getElementById('input'),
            button = document.getElementById('button');
        button.addEventListener('click', function() {
            input.value = ~~input.value + 1;
        })

        // 初始化一个点击事件
        var event = new Event('click');
        button.dispatchEvent(event);
    }(window, document)
</script>
```
事实却不是上述的这么容易，会进行多次事件触发更新 UA，但是目前检测有效的事件仅仅是局部，后续还有其它识别，只是暂时没有开启。  
```
var i = 1;
function touchstart(el, x, y, number, target) {
  var touch = new Touch({
    identifier: number,
    target: target,
    clientX: x,
    clientY: y
  });
  var event = new TouchEvent('touchstart', {
    touches: [touch],
    targetTouches: [touch],
    changedTouches: [touch],
  });
  el.dispatchEvent(event);
}

function focus(el) {
    var event = new Event('focus');
    el.dispatchEvent(event);
}

setTimeout(function() {
  //touchstart(document, 188, 306, i++, document.getElementById('username'));
  focus($('#username')[0]);
  $('#username').val('******');
  $('#username').trigger('input');
}, 3e3)
setTimeout(function() {
  //touchstart(document, 188, 402, i++, document.getElementById('password'));
  focus($('#password')[0]);
  $('#password').val('******');
  $('#password').trigger('input');
}, 5e3)
setTimeout(function() {
  //touchstart(document, 374, 648, i++, document.getElementById('submit-btn'));
  $('#submit-btn').trigger('click');
}, 7e3)
```
通过上述代码能够实现登录成功了，接下来就是如何接口配合，把数据返回给饭粒淘的查询接口了。   

### 参考资料
http://phantomjs.org/api/webpage/
https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent
https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent
