title: vue2 for demohouse
date: 2016-10-19
categories: 学习
tags: vue
---

最近上Github看见了大漠的DemoHouse项目，看到Issues说准备做一个首页，于是我的第一想法就是做一个md列表页面，md文件可以很容易的生成一个html文件。刚刚做好脚本文件，可以生成list.md。随后提了pr。同时看到 @jerexyz 使用gulp构建工具做好了一个生成index.html的工具，我也就暂时放弃了继续后面的工作，还好没做，继续做的话生成出来的也比较粗糙，还得再继续美化修改。想象一下，如果这时我新收集了一个Demo，准备提交版本库，我是不是还得先执行一下命令 `node index.js` 然后再添加暂存区，提交版本库，推远程。如何省略执行命令行这一句呢？
<!-- more -->
### git hook (钩子)
说到钩子，不知道大家喜欢钓鱼吗？喜欢不喜欢应该都知道鱼钩，不知道的再看一下，鱼钩长这样的。  
![鱼钩](/assets/imgs/20161020/fishhook.jpg)  
这是有一期我爱发明里面介绍的，一个钓鱼狂热爱好者发明的钓鱼神器，看节目似乎很有效。通常我们见到的鱼钩就只是上半部分，这里却多了一个小钩，其实他就是我们这里准备学习的hook。  
> 为了达到某种效果，我们添加的一个脚本，在正常流程执行的时候触发这个脚本（个人拙略，如有偏颇忘指出）。

git的钩子存放在 `.git/hooks` 目录下，`git init` 时会自动生成一些示例脚本在该目录下，脚本都是 `.simple` 后缀结尾，如果需要使用的时候，重命名取消后缀即可。  

这里是希望在存入版本库之前生成列表页，查询文档发现 `pre_commit` 是在 **键入提交信息前运行** 。  
> git add demo => pre_commit => git add list.md => git commit -m 'add new demo and update list.md'

`pre_commit` 是一个脚本文件，由于nodejs写好了一个脚本文件，于是添加了一个头部，然后最后添加生成的list.md到暂存区间

> git add demo => git commit -m 'add new demo and update list.md'

实际上我们的操作流程就变成如上描述的样子。这个就是正常流程，`git commit` 命名回车后先执行的是 `pre_commit` 脚本，再存入版本库  

自动生成list.md的工作到这里就完成了，更多的钩子文件这里暂时不继续扩展了。  
又看到还有一个需求就是为每个demo添加一些其他信息，例如：分类/作者等信息。这样 @jerexyz 的项目工具怎么修改实现一下呢，或者说其他方案怎么实现呢？

### 方案讨论
参考 @jerexyz 的想法与 大漠 的思路，如果要配置多项信息我想就是在每个demo下配置一个config.json文件靠谱一些。  
或者像 @jerexyz 提出的直接title添加分类，方法也行，这样存在修改index.html文件，还有就是配置信息多或者后期再增加修改就没有配置文件方便直观。如果在原来的工具的基础上修改的话就需要生成几个也买你，把分类数据统计出来，然后再为每个分类数据生成一次页面，最后相互调用。是不是有一种其他的方法来处理呢？恰巧最近又在学习vue，于是就准备尝试一下。一个单页就可以搞定，不需要每次更新前端页面，只需要更新后端数据文件db.json即可。  

### vue
在vue还是版本号1打头的时候看过文档，没有实际做过demo，后面自然而然还是只能对着文档编码。  
一开始我是直接script编译好的vue.js文件，然后实例化vue。也就是这样子的  
```
	# index.html 中这样引入vue
	<script type="text/javascript" src="vue.min.js"></script>

	# scirpt 标签中这样实例化，纯纯的文档风
	var vm = new Vue({
		el: '#id',
		data: {
			message: '阿弥陀佛'
		}
	})
```
这样子没毛病，没有任何问题。但是对于招牌需求这个构建工具那个构建工具，还是要摸索学习学习。于是又决定尝试一下也只是停留在文档风的webpack。选择它也是有原因的，因为我重视基础也更风啊，哈哈哈～  
#### 前期准备工作  
> 这里是写在vue2.0.0的RC版本

* 创建项目目录（这里其实也跟风的玩了一下yarn，但是并没太多感受理解它的优秀，不做描述）
```javascript
	npm i vue-cli -g
	vue init webpack demo
	cd demo
	npm i
	npm run dev
```
自动启动浏览器打开 `http://localhost:8080` 页面，展示一个vue的初始模板页面

* 列表页组件
不会从头到尾手写，还不会修改吗？由于暂时需要实现的就是一个列表，想到的就是 `v-for="demo in demos"`  
```
	# 入口文件main.js中引入了app.vue组件

	# app.vue组件中包含了这里我们需要修改的list.vue

	# list.vue 
	/**
	 * 组件的三个部分（html+js+css），如果描述感觉vue就简单了好多
	 * template（html或者是自定义标签）
	 * script （js）
	 * style （css）
	 */
	<template>
		<ol>
			<li v-for="demo in demos"> {{ demo.title }} </li>
		</ol>
	</template>

	<script>
		export default {
			name: 'list',
			data: function() {
				return {
					{
						title: 'title1'
					},
					{
						title: 'title2'
					}
				}
			}
		}
	</script>

	<style>
		ol { /**/ }
		ol li { /**/ }
	</style>
```
需要注意的一点是这里的data是一个函数，组件内的data都是函数的形式，至于为什么还没去理解，先学会第一步如何使用。其实你写成了对象形式，在开发者工具会输出提示。

* 导入数据
准备了一个数据文件db.js，修改之前生成列表的工具，把每个demo下的配置文件读取出来追加到db.js中。  

```
	# 以下代码位于template中
	<div class="category" data-category="demo.category" @click="getCategoryDemos"> {{demo.category}} </div>
	# li标签需要修改一下，如果newDemos存在，按照newDemos的分类数据输出
	<li v-for="demo in (newDemos || demos}}"> {{ demo.title }} </li>

	# 以下代码位于script中
	# 导入db.js
	import demos from './db'

	data: function() {
		return {
			demos: demos,
			newDemos: ''
		}
	}

	# 如果要分类显示呢
	# 添加一个方法
	methods: {
		getCategoryDemos: function(e) {
			var newDemos = [];
			this.demos.forEach(function(demo) {
				if(demo.category === e.target.dataset.category) {
					newDemos.push(demo);
				}
			})
			this.newDemos = newDemos;
		}
	}
```

* 显示全部
上面取巧式的把分类数据实现了，如果要显示全部呢？即回到首页。把newDemos的值设为空不就好了吗？数据绑定的好处就是这里吧，监控数据的变化重新渲染。    

```
	# 添加template	
	<div class="goHome" @click="showAll"> Home </div>

	# 添加method
	showAll: function() {
		this.newDemos = '';
	}
```

* 预览demo
预览demo即在列表页面添加iframe标签引入demo静态页面。默认是不显示的，如果添加了一个判断语句 `v-if  `  
```
	# template add iframe
	<iframe src="{{ demo.url }}" scrolling="no" v-if="isShow"></iframe>

	# script 
	# data中添加isShow 
	data: function() {
		return {
			// 新增
			isShow: false
		}
	}

	# method中添加showAll
	method: {
		// 新增
		showAll: function() {
			this.isShow = true;
		}
	}
```

### 问题总结
vue的使用问题
https
开源协议开与开源精神
### 参考资料  
