title: js模板引擎实现过程学习
date: 2016-06-26
updated: 2016-08-12 16:17:26
category:
- 学习
tags: 
- js
- template
- 模板引擎
---
### categorys
* <a href="#_1">初始结缘</a>
* <a href="#js">如何实现一个js模板引擎？</a>
* <a href="#_2">回顾总结</a>
<!-- more -->
### 初始结缘
感觉题目好有难度，没怎么造过轮子，更多的是不断使用别人造好的轮子，很多时候也没仔细去思考一个问题，别人为什么要不断重复造轮子，造出来的轮子到底是好还是说根本没改善，可能不如别人的轮子，自己还得意的想，我造好了一个轮子怎么怎么NB，相反更多的应该是在这个过程中分析遇到的问题，整理整个知识点的开发流程，以便更好的发明轮子应用到实际的开发环境。  
php的开发中遇到过模板引擎的概念，在最开始知道mvc这个概念的时候，里面的视图层就是和模板引擎相关，其中smarty模板引擎，tp与cms都有实现自己的相关模板引擎。工作中更多的是使用phpcms，就phpcms来说一下我了解到的知识点以及公司转型过程中，不熟悉php的同学如何开发模板。  

#### view
如果理解cms的模板？为了简化描述制作模板流程，我们制作还是需要拿到设计图，然后切页面，切好页面套模板，套模板的过程就是与模板引擎接触的过程，只是这个过程被简化了，不需要去理解相应的概念，只是需要知道相关的模板标签。  
例如：  
``` view
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> template </title>
</head>
<body>
	我是{ $username }
</body>
</html>
```
写好的一个模板标签，后文要怎么预处理成php能理解到的呢？控制器中分配变量 ** $username ** 。
```controller
$username = 'unofficial';
```
模板引擎需要做的就是把模板视图页面预处理成与html混写的php页面。  
```php
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> template </title>
</head>
<body>
	我是<?php echo $username; ?>
</body>
</html>
```
简单流程应该就是：  
> 数据 --> 模板 --> php

js 模板引擎是不是一样的道理呢？  
### 如何实现一个js模板引擎？
是不是也是和php一样的道理？把数据分配给模板，然后用js把模板标签替换成数据。  

<script async src="//jsfiddle.net/unofficial/sm14vx4x/embed/js,html,result/"></script>

如果情况是上述这样只是将一个模板变量替换成js变量字符串，我们又何必那么大费周折。还不如直接这样：  
```
	// html
	<div id='username'></div>

	// javascript
	var username = 'unofficial';
	document.getElementById( 'username' ).innerHTML = username;

```

道理好像是这么一个道理，我们就稍微来复杂一些的，比如说一个之前我遇到过一个phpcms模板方面的问题，当时是另外一个同事在cms模板页面用js模板写了一个列表，后来我需要修改这个模板，我只是本着觉得奇怪就把js模板修改成了拼接字符串的，后来想想我还是挺执着的，竟然拼出来了。   

<script async src="//jsfiddle.net/unofficial/sm14vx4x/1/embed/js,html,result/"></script>

但是如果能将代码写成模板代码是不是要好一些呢？希望这样也能像上面的代码一样输出文字。  
```
<ul>
{{ for( var key = 0; key < datas.length; key++ ) { }}
	<li>{{= datas[key] }}</li>
{{ } }}
</ul>
```

先将模板字符串转换成js变量表示  
```
var temp = [];
temp.push( '<ul>' );
for( var key = 0; key < datas.length; key++ ) {
	temp.push( '<li>' );
	temp.push( datas[key] );
	temp.push( '</li>' );
}
temp.push( '</ul>' );
var listStr = temp.join( '' );
```
如何才能获得上面的js语句，通过正则处理以下内容，拿到模板字符串以后先将字符串放置到 ** temp.push( '模板字符串' ); **  

``` javascript
var templateStr = document.getElementById( 'template' ).innerHTML;

templateStr = ''.concat( 'temp.push(\'', templateStr, '\');' );

var jsStr = templateStr.replace(/[\r\n\t]/g, "").replace( /({{)(=?)\s*(.*?)\s*(}})/g, function( e, $1, $2, $3, $4 ) {
	return /if|for|else|switch|case|break|{|}/.test($3) ? "');"+$3+ "temp.push('" : ( $2 ? "');temp.push("+$3+");temp.push('" : "');temp.push('"+$3+"');temp.push('" ); 
} );
``` 

程序完成到这里基本雏形就出现了，但是这里我遇见了一个问题，我直接将模板代码放置在html代码中，输出的代码错乱了！  
> 因为 ** key < data.lengths ** 中的 < 

因为这里将 **<** 当做了html中的闭合符合处理。如果将模板代码放置到script标签中呢？  

* 在模板引擎没有处理的时候不会显示模板标签代码
* 不会有上面的问题啦！

``` javascript
<script type="text/html" id="template">
<ul>
{{ for( var key = 0; key < datas.length; key++ ) { }}
	<li>{{= datas[key] }}</li>
{{ } }}
</ul>
</script>
```

最后拼接好的应该是一段可以执行的js代码，于是我们将相应的参数都提前拼接进去，把上面的 ** templateStr ** 修改一下  
```
templateStr = ''.concat( 'var temp=[];', 'temp.push(\'', templateStr, '\');', 'return temp.join( "" );' );
```
把上面的内容包装进函数，由于最后 ** jsStr ** 是一串可执行js代码，于是将它传入Function执行。  
``` javascript
	function tempe(id, datas) {
		// 通过传入的id获取模板字符串
		var templateStr = document.getElementById( id ).innerHTML;

		templateStr = ''.concat( 'var temp=[], datas = this.data;', 'temp.push(\'', templateStr, '\');', 'return temp.join( "" );' );

		var jsStr = templateStr.replace(/[\r\n\t]/g, "").replace( /({{)(=?)\s*(.*?)\s*(}})/g, function( e, $1, $2, $3, $4 ) {
			return /if|for|else|switch|case|break|{|}/.test($3) ? "');"+$3+ "temp.push('" : ( $2 ? "');temp.push("+$3+");temp.push('" : "');temp.push('"+$3+"');temp.push('" ); 
		} );

		// 初始化并执行js代码函数
		return new Function( jsStr ).apply( {'data': datas} );
	}

	console.log(tempe( 'template', datas ));
```

这里涉及到一个关于  ``` apply ``` 基础知识的应用，注意与 ``` call ``` 区别。  

<script async src="//jsfiddle.net/unofficial/sm14vx4x/2/embed/js,html,result/"></script>

### 回顾总结
一开始还是蛮担心能不能完成这篇博客，毕竟还没这么认真完成过轮子的构造。庆幸有一个诱惑在前面，最后坚持完成了。不得不给自己点赞一下。  
在这个过程中，发现了一些问题，并想办法解决掉了遇到的问题，在参考的基础上给予了自己的想法，这个过程还是挺美妙的。这只是一个开始，如果要仔细看这个程序，还有很多地方需要优化改善，不断学习，才能更好的优化自己的程序。  

### 参考资料
* //www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html
* //www.cnblogs.com/dolphinX/p/3489269.html