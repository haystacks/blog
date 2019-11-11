---
title: 如果在一个项目中兼容Wepy和Taro？
date: 2019-06-26 09:00:00
tags:
  - 工作

categories:
  - Taro
  - Wepy
---

## 背景交待

NJ 项目启动初期，团队技术栈主要是基于 Vue，技术选择上就选择了类 Vue 的 wepy。迭代几个版本后 mpvue 出来了，简单调研了下，准备基于 mpvue-simple 开发部分页面，如果可行再慢慢切换其它页面，尝试后遇到一些问题，就暂时搁置了，还是沿用的 wepy 继续开发。

## Taro 初现

在不久之后 Taro 横空出世，按照团队的情况简单对比了一下 wepy、mpvue、taro、原生组件开发。  
LB 项目初期的情况是有一部分 wepy 沉淀，但是基本可以摆脱历史包袱，重新启动新业务项目，对于项目本身仅仅是一个活动小程序项目，不会做多端情况的考虑，在技术选择上因为各个技术方案基本解决的问题是多端开发以及在开发过程的舒适度上的提升。对于团队目前的情况来看，在几个小伙伴一起讨论后，还是基于 wepy 的方案来开发。

## 如何迁移 Taro 到 Wepy

NJ 项目本身还是基于 wepy，在迭代功能的时候，产品提出要做一个活动页面，这个活动可能在商城小程序中也会使用到，然后 NJ 继续迭代功能，需要考虑的是怎么复用商城项目组开发好的活动页面（商城项目基于 taro）。

- 跳转到商城小程序参加活动 [pass]
- 拷贝活动页面编译后的文件到 wepy 中直接使用 [cool]

![](http://wx4.sinaimg.cn/mw690/e6cd2709gy1g58dzl5eb7j20g40m40ua.jpg)

如图，上述文件以及不需要的页面均可以直接删除，然后配置路由到 wepy project 的 app.json 。实际可能也有一些父级逻辑放置在 app.js 中，这个看自己的业务情况来定，我们项目还引入来 dva ，在 wepy 的 app.js 中增加来一个处理 dva 的文件。这个迁移过程总体来说简单容易很多，暂时不做过多描述。

## 如何迁移 Wepy 到 Taro

为来更为简单的迁移，这中间写了一个插件来处理公共业务，对于业务逻辑可以在回调中单独处理，具体可以参考 [wepy-plugin-migratetotaro](https://github.com/cangku/wepy-plugin-migratetotaro)

NJ 项目经过长期迭代在线上稳定运行。同时另外一条业务线是基于 Taro 开发，也在疯狂开发迭代中。起因一次活动，XX 项目开发活动内容，NJ 项目正常需求开发，但是开发上线时需要复用 XX 项目开发好的活动页面。

由于 Wepy2 目前仍处于 alpha ，1.7.x 在开发中也遇见了不少的问题。问题虽然最终都能解决，而且作者很好沟通，咨询过几次问题也都能耐心指导解答，笔芯感谢。
再说项目实际情况，在迁移后要保证脱离 Taro 相关项目 Wepy 独立编译能够正常运行。

**目录结构约定**

```
- Taro
    - src
    - Wepy
        - src
```

**代码管理在 taro project 以子模块的形式管理 wepy project**

git submodules

```
# 添加子模块项目
> git submodule add <taro project url>

# 初始化本地 .gitmodules 文件
> git submodule init

# 同步远端 submodule 源码
> git submodule update
```

.gitmodules 示例

```
[submodule <submodule_name>]
    path = <local_directory>
    url = <remote_url>
    branch = <remote_update_branch_name>
```

### 迁移过程

默认配置 wepy 编译后的目录（这里建议配置到 taro 编译目录同级目录下的子目录。下文均以 Taro 编译目录 dist 为例，wepy 编译到 dist/wepy 目录下）

- 编译目标路径配置 wepy.config.js target
- 安装插件 wepy-plugin-migratetotaro （待开发整理发布）
  - 加载机制 require('app.js') \$instance （BASE）
  - 页面自动配置所有，可以手动配置需要引入的 pages，但是编译还是会编译所有的，编译过程不可控。暂时部分页面引入控制略有问题，这里建议开发过程中以页面为维度来管理页面资源，编译后不需要的页面可以手动删除。
  - 路由处理 页面路径配置按照编译路径最后一级文件夹自动更新引入路径中的 pages 的跳转路径 （BASE）
  - 所有路径添加到子模块路由中或者主模块中 路由配置两种模式，pages 模式 和 subPackages/pages 模式。对应的配置位置不一致，这一点由插件编译处理。
  - taro 组件在 wepy 中使用，在配置中新增 needComponents 配置需要使用组件的组件和页面。

### 迁移过程中问题分析

① annot read property '[\$pages](https://github.com/Tencent/wepy/blob/1.7.x/packages/wepy/src/base.js#L128)' of undefined

```javascript
// 页面初始化的时候 $createPage 中 this.$instance 不存在
if (typeof pagePath === "string") {
  this.$instance.$pages["/" + pagePath] = page;
}

// this.$instance 来源于 $createApp
let app = new appClass();

if (!this.$instance) {
  app.$init(this, appConfig);
  this.$instance = app;
  this.$appConfig = appConfig;
}

// appClass 来源于参数 对应 app.wpy
// 如果页面要单独执行必须加载一下 app.wpy 但是插件处理的是编译后的文件，这里只能在每个页面 page 中单独加入 require(wepy/app.js)
```

② 资源引用，建议图片视频等资源使用相对路径引用，如果项目已有绝对资源路径可以通过插件回调手动替换处理

③ Taro 组件共享，见后续 taro 组件共享使用方法

### 如何在 wepy 中使用 taro 写的组件

这种略待代码侵入的感觉，可以使用环境变量来处理，只是使用迁移编译时才生效插件的引入。我们使用插件引入这种是在自定义底部 tabbar 后有一个页面需要。

- wepy page 中引入 taro 项目中的 demo 组件

  ```javascript
  config = {
      ...

      usingComponents: {
          'demo': '/components/demo/index'
      }

      ...
  }
  ```

- template 中使用组件

  ```html
  ...

  <demo compid="demo"></demo>

  ...
  ```

- 父页面向子组件传递参数（配合插件配置 needComponents 使用，如果原生小程序或者其它框架需要使用 taro 组件可以使用类似方案）

  ```javascript
  // 按照实际情况修改 props 和 compId
  taro.propsManager.set(
    {
      ...props
    },
    compId
  );
  ```

## 思索

wepy taro 解决的问题是什么？对于我而言。
一部分是追求与团队当前技术栈相契合的类似方案。
一部分是多端需求（最新的这个小程序是多个产品的数据整合，其中之前一个产品是 H5 对外可能微信小程序不是合适的选择，一个是小程序，如果统一到一起，后续小程序部分页面可能也会直接转 H5，后续还可能数据要整合到已有 APP，如此转 RN 等也是未来的需求），这一块是为以后做的考虑，如若不然还是原生的来的自然。
这中间更多的应该是思考，我们其实只是针对当前的产品选择一个适合自己的技术方案，不抱着某一种方案自始自终，也不抵触技术的更新，更多的还是需要在这业务堆积过程中不断沉淀出一些东西，然后不断更新自己的知识仓库，这个才是接下来自己要坚持完善的部分。

## 参考资料

[wepy-plugin-migratetotaro](https://github.com/cangku/wepy-plugin-migratetotaro)
