---
title: vue2项目综合实践
date: 2017-01-18 10:55:55
categories:
- 学习
tags:
- vue
---
跟着文档学习入门了几篇文章，几天时间忙于其它工作，也就耽误下来了，准备写一个小项目的时候，发现没有及时用到项目中，很多知识点又模糊了。  
<!-- more -->
本文环境情况：
```
PC: win7  
Vue: 2.1.10  
Webpack: 2.2.1
Path: demo/vuejs/vuewebpack
```

### 一步一步构建vue+webpack开发环境
- 安装目录下初始化项目
```
npm init -y
```

- 安装vue+webpack
```
npm i vue --save
npm i weboack --save-dev
```

- 安装vue-loader/css-loader/vue-template-compiler
```
npm i vue-loader css-loader vue-template-compiler --save-dev
```

### 问题
- Module build failed: TypeError: this._init is not a function
loader: 'vue' => loader: 'vue-loader'

- 
