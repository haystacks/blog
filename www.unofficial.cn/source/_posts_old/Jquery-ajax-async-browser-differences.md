title: jquery-ajax-async之浏览器差异
---
最近的PC项目遇到了一个问题，日志记录程序会在1s内多次发起对首页的请求，一时间没有找到原因。
<!-- more -->
简单描述一下问题：访问一个首页的时候，由于代码质量不高的原因，访问就连接数据库，但是同时存在的问题是一秒了多次发起了对首页的请求，请求中包含/favicon.ico（如此能不能判断是浏览器发起的呢？），也就导致了数据库出现很多连接，到此引起的连锁反应就是服务器内存占用飙升，接着就是卡卡卡……
由于能力不足的原因，一时间排查不出问题的原因，找不到很好的解决方案，找到了一个临时的方案“生成静态首页”。不过后期查看日志，在index.html存在的情况下，还是会出现请求404的问题（无解）。
生成静态首页也很愉快，于是很快就把补丁给打上去了，相反也就遇到了今天的问题，在此予以记录。
愉快的模拟了一个场景：
> html代码
``````
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jquery-ajax-async</title>
</head>
<body>
	<button id="testAsync">测试</button>
	<script src="script.js"></script>
	<script>
	$("#testAsync").bind("click", function() {
		$.ajax({
			url:"http://demo.pushself.com/index.php",
			success:function(d){
				if(d.result=="OK"){
					alert("生成成功！");
				}
			},
			//async:false,
			dataType:"json"
		});	
		console.log(this);
	});
	</script>
</body>
</html>
``````
> php代码
``````
<?php
	sleep(3);
	echo json_encode(array('result'=>'OK'));
?>
``````
在注释async: false 的时候，async的默认值是true，连续点击3次测试
> IE：连续输出3次<button id="testAsync">测试</button>，3秒后连续弹出3次生成成功
> 非IE：连续输出3次<button id="testAsync">测试</button>，3秒后依次弹出3次生成成功

如图：![jquery-ajax-async-true](http://pushself.qiniudn.com/jquery-ajax-async-true.png 'demo.pushself.com')

在取消注释async: false 后，连续点击3次测试
> IE：3秒后弹出1次生成成功，输出1次<button id="testAsync">测试</button>
> 非IE：3秒后依次弹出3次生成成功，输出3次<button id="testAsync">测试</button>，而且会提示：Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check http://xhr.spec.whatwg.org/.

如图：![jquery-ajax-async-false](http://pushself.qiniudn.com/jquery-ajax-async-false.png 'demo.pushself.com')
如图：![jquery-ajax-async-false-end](http://pushself.qiniudn.com/jquery-ajax-async-false-end.png 'demo.pushself.com')

看到上面的结果，暂且不说alert的事情。异步情况下，IE与非IE浏览器处理的方式是一样的。同步的时候，IE是单线程的，非IE却不是单线程处理。非IE会出现提示ajax同步请求在主线程中不利于用户体验，被弃用了，可见用户体验的重要性。
最后还是需要换取另外的方式来阻止用户多次点击:
``````
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jquery-ajax-async</title>
</head>
<body>
	<button id="testAsync">测试</button>
	<script src="script.js"></script>
	<script>
	var testAsyncEle = $("#testAsync"),
		createIndex = function() {
			testAsyncEle.unbind();
			$.ajax({
				url:"http://demo.pushself.com/index.php",
				success:function(d){
					if(d.result=="OK"){
						alert("生成成功！");
						testAsyncEle.bind("click", createIndex);
					}
				},
				//async:false,
				dataType:"json"
			});	
			console.log(this);
		};
	testAsyncEle.bind("click", createIndex);
	</script>
</body>
</html>
``````