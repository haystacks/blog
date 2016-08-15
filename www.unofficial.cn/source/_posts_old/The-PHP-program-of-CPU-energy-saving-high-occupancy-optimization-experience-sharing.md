title: 江湖恩仇录之PHP程序CPU高占用优化经历分享
---
### 故事起因
本故事根据真实故事书写，如有雷同绝非巧合。在开发过程中难免反复修改程序，面对突然起来的问题难免束手无策，有些人选择自我处理问题，也有人选择交流区域咨询，或许恰巧有人有类似的问题，刚好可以解决你的问题，但是如果你的问题恰好有些独特，最后还是需要自己谷歌百度，大海捞针似的搜寻。
<!-- more -->
一套几年前的程序，现在急需大范围使用起来，优化了一些细节，由于业务的转型，全线使用php快速解决方案，于是乎就没有测试其他问题匆忙上线了。
###初入江湖下山历练
去年上线，上线肯定难以避免很多细节问题，优化优化，最大的优化就是布局模式增加，常见的企业网站布局方式难免那么几种，于是在总结常见情况的基础下开始了布局设计。大致分析为如下草图。
![layout](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogslayout.jpg)
首页布局模式比起之前的要多一些，全部模块容器是自适应的，无内容的情况下自动收缩。left与right默认情况下保留一种，按钮提示网站编辑人员自动激活。
###无统一心法几乎走火入魔
开发过程中必须要有一套统一的规范，但常常有这样的情况，第一规范运行后有一批产出的时候，优化细节后又上了第二规范，初入江湖的时候已经是正式大范围使用的第三次规范了，也就是说之前有异议。这个只是说在使用过程中如果遇见之前版本的，重新按照新的规范优化上线，对于没有使用到的暂时就保持原型。
###平静中暗藏杀机
渐渐的布局的问题趋于平静，伴随着这种平静迎来的一个新的难题，服务器CPU飙高，卡死。
这个是我今天主要分享的故事，公司由于自身条件的问题，一直使用的windows+iis+mysql+php(asp)，在win上使用iis运行php，使用过这样生产环境的应该知道上面的各种问题，但是实际问题还是实际问题，改变不了只能按照这种环境来做适应。其他问题暂且不描述了，说来就话长了。
除了服务器的原因，肯定的还是程序有问题了。
###潜心修炼 问题分析

1. 首页布局复杂化加载引起？
	访问模式与编辑模式同时操作首页，首页也是动态读取，解决方案就是静态化首页，服务器环境设置文档类型优先级index.html高于index.php，这样一来就需要第一次自动生成，后续主动生成。这个过程也伴随着很多问题，编辑时自己遗忘了生成，产生出的问题就是我添加了资料为何界面没有任何变化？这个只是一个习惯问题，渐渐的就好了，但是问题还是存在，只是感觉好了一些许。
2. 首页布局程序优化？
	大部分时间是在操作资料添加，首页布局拖动，首页布局拖动保存的时候页面会刷新一次，加载一次页面本身占用很高的CPU，开发环境下连续多次刷新的后果就是卡死，还不用说服务器环境下。于是想到的是把布局拖动完成后的那一次刷新给取消掉，通过ajax的方式插入内容，但是实际的开发过程中由于程序本身的问题，修改了一些程序，眼看着就能成功的时候遇见了一些小问题，数据不能与结构关联起来，正准备深入研究怎么解决的时候，找寻了一些程序分析优化工具，前面的工作就放弃了，开始给程序做一个整体的诊断。
3. 工具的选择
	之前还没有这么细致的优化过程序，完全不知道如何开始下手。在 @luofei614 的建议下推荐我试试xdebug，xhprof，使用就是oneApm，其中oneApm简单很多，搜索了一下发现是蓝海讯通的项目，这里好像有一个认识的人 @互联网fans ，他们的态度的确不错，只是我只是抱着试试的心态注册使用了，很是挺不错的，但是只有linux的，在win上的方案没有，下了key下来也没有使用，第二天客服竟然通过我留下的电话联系了我，咨询相关情况，还好没有留下企业名称要不就暴露了。态度不错，但是肯定是有原因的…
	无奈下一个工具，之前其实就了解过这些工具，但是一直没有落实过使用方法，这次是被逼无奈的。尝试了使用[xedebug](http://xdebug.org/)，安装过程什么都还是比较愉快，但是就是扩展始终加载不起。在[官网文档](http://xdebug.org/docs/install)上找到了问题的原因:
	> Xdebug does not work together with the Zend Optimizer or any other extension that deals with PHP's internals (DBG, APD, ioncube etc). This is due to compatibility problems with those modules.

	由于zend的原因暂时就放弃了xdebug，转为尝试xhprof，这时又发现了一个新的问题，在windows上[xhprof](http://windows.php.net/downloads/pecl/releases/xhprof/0.10.6/)的php的版本是5.3+，生产环境的php的版本是5.2.17，按理说应该可以编译一个适合5.2的xhprof，不会这个也就无奈了。本地开发中我切换到了5.3，愉快的运行了，替换掉了核心加密文件，分析过程也就即将开始了。
4. 正式开始检查优化工作
	一个好的工具往往是解决问题的关键方案，知道根本原因，然后对症下药。安装好了xhprof，检测了一下程序现在的运行情况
	![问题未解决](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogs1.png)
	![问题未解决](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogs2.png)
	从图中可以看出大量文件操作导致CPU占用极高，找到问题就是接下来优化问题，程序中有使用一个mysql_fetch_object()，表面看是没有什么问题的，[php官网文档](http://php.net/manual/zh/function.mysql-fetch-object.php)，中描述的是接收一个资源结果集作为参数。但是程序中这里使用了多个参数，搜索了一下找不到答案，有几个简单的描述，但是还是不能理解，还希望熟悉的指教一下，谢谢。我暂时直接取消后两个参数，相应的首页判断加载的时候调用了一个方法暂时也就屏蔽了，内容无异，相反各方面数据都明显提升。
	![问题解决很大一部分](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogs3.png)
	![问题解决很大一部分](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogs4.png)

###涉世总结 秘籍书写
####xhprof 性能分析器的使用
1.安装扩展，选择适合自己版本的xhprof，phpinfo查看适合安装成功
2.简单的调试，数据模式+可视化模式

	/**
	 * xhprof start
	 * XHPROF_FLAGS_NO_BUILTINS (integer) 使得跳过所有内置（内部）函数。
	 * XHPROF_FLAGS_CPU (integer) 使输出的性能数据中添加 CPU 数据。
	 * XHPROF_FLAGS_MEMORY (integer) 使输出的性能数据中添加内存数据。 
	 */
	xhprof_enable(XHPROF_FLAGS_MEMORY + XHPROF_FLAGS_CPU);
	function useXhprof() {
		$str;
		$i = 1000;
		while (($i--)>=0) {
			$str .= $i;
		}
		return $str;
	}
	useXhprof();
	$xhprof_data = xhprof_disable();
	print_r($xhprof_data);
	/**
	 * 截取部分参数含义表示
	 * [main()==>useXhprof] => Array ( 
	 * 		[ct] => 1 		useXhprof函数的调用次数
	 * 		[wt] => 2064		消耗的时间，单位为微秒
	 * 		[cpu] => 0 		cpu时间
	 * 		[mu] => 3744		内存使用情况，单位byte
	 * 		[pmu] => 728		峰值内存使用情况
	 * )
	 */
	/**
	 * 可视化 这里按照自己的情况设置好参数 clone地址：https://github.com/phacility/xhprof 
	 */
	$XHPROF_ROOT = realpath(dirname(__FILE__) .'/xhprof');
	include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_lib.php";
	include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_runs.php";

	$xhprof_runs = new XHProfRuns_Default();
	$run_id = $xhprof_runs->save_run($xhprof_data, "xhprof_foo");
	echo "<a href='/xhprof/xhprof_html/index.php?run=$run_id&source=xhprof_foo'>look</a>";

![可视化测试图例](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogs5.png)