---
title: vue2 for demohouse
date: 2016-10-19
categories: 学习
tags: vue
---


<!-- more -->
### vue
前期准备工作  
```javascript
	# vue
	npm i vue@next --save-dev

	# demo
	npm i vue-cli -g
	vue init webpack demo
	cd demo
	npm i
	npm run dev	
```

### learn
```javascript
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js"></script>
```

看完官网文档，给我感觉最为简单的使用方式就是直接引入vuejs。以前也是这么玩的，但是还没有认认真真的写过一个例子，今天借助[DemoHouse](//airen.github.io/DemoHouse/)直接学习一下vuejs@2。  

从 `cd demo` 开始，项目入口应该关注的是 `package.json` ， `npm i` 安装项目需要的依赖包。  
打开 `package.json` 看到 `scripts` 有 `dev` 和 `build` 两个属性。  

* npm run dev  
`dev` 对应的命令行是 `node build/dev-server.js`  
打开当前项目目录下的 `build/dev-server.js`

* npm run build
`build` 对应的命令行是 `node build/build.js`  
打开当前项目目录下的 `build/build.js`

### 项目文件
项目文件位于 `src` 目录下，入口文件为 `main.js`  
```javascript
import Vue from 'vue'
import App from './App'
```

第一个import是导入vue文件，第二个是导入components文件 App  
