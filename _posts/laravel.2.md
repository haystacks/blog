title: laravel 5.1 routing 路由
tags: laravel
---
laravel的路由实现给我的感觉是焕然一新的，习惯了使用cms，tp的路由规则，大致的思路都是moduleDir/controller/action，?m=moduleDir&c=controller&a=action，路由的规则都按照一个思路固定好了，你只需要按照这种模式书写控制器类。
laravel给了更多的自由，可以自由code路由规则。如果你是url强迫症毫无疑问依然可以通过路由实现以上的规则，但是何必呢？
通过上一篇文件学习到如何安装，安装成功后第一个界面的实现就是通过路由实现搭配环境配置的规则。

		Route::get('/', function () {
			return view('welcome');
		});

访问[http://127.0.0.1:7000]()，自动会加载welcome视图，这是laravel5的欢迎界面。
##### 自定义规则
你可以通过配置app/Http/routes.php，设置自己路由规则，以下就是一个简单的路由，接受了一个URI请求
		
		Route::get('/', function() {
			return 'show your code';
		})