---
title: we7
date: 2017-02-19 16:12:14
categories:
- 学习
tags:
- 微擎
---

<!-- more -->

### 站点注册
* http://s.we7.cc
* /index.php
* ?c=site&a=register&url=http%3A%2F%2Flocalhost%3A3333&version=0.8&referrer=0

c: 控制器目录  
a: 控制器  
do: 默认控制器操作  
> 只能公网站点，更新全新版本程序需要认证
### 一键更新
* http://localhost:3333/web/index.php?c=cloud&a=upgrade&do=init&
* 检测是否注册
* 更新检测密钥（注册时一个论坛帐号对应一个站点域名，生成一个密钥，本地注册一个密钥，更新时提交本地密钥用于验证站点是否是注册，并且发起发起请求的站点是不是来源于注册站点）。
* 

### 模块开发

* 目录结构
images        资源目录
template      模板目录（必须）（模块模板文件目录 ，其中包含mobile子目录存放app端的html文件，web端的html文件位于当前目录）
inc           引用的 php 文件目录
    mobile
    web
icon.png      模块图标（必须）（模块的图标）
preview.jpg   模块封面（必须）（模块的封面）
manifest.xml  安装清单（必须）（模块安装、卸载和升级信息，通过“微擎模块设计器”生成）
module.php    模块设置（必须）（模块参数配置或规则配置）
processor.php 消息处理（必须）（模块消息处理器 ，当开启关键字回复时，粉丝触发关键字系统路由至此文件中进行结果输出）
receiver.php  消息订阅（必须）（模块消息订阅器 ，当模块订阅了事件消息时，有消息到达时系统将会执行该文件中的receiver方法）
site.php      微站页面（必须）（模块的微站功能，所有app端的页面皆在此类文件中，分为doMoilbeXXX(), doWebXXX()方法，分别用于app端和后台端）

* 继承
module.php processor.php receiver.php site.php 均继承自 /framework/class/account.class.php

### 数据设计
卖家信息

卖家旺旺
卖家id
店铺名称
平台类型


商品基本信息

商品id
商品名称
商品主图
商品详情页链接地址
商品一级类目
商品价格(单位：元)
商品月销量			

商品淘客信息

收入比率(%)
佣金
淘宝客链接
优惠券id
优惠券总量
优惠券剩余量
优惠券面额
优惠券开始时间
优惠券结束时间
优惠券链接
商品优惠券推广链接


宝贝名称
原价
优惠价
优惠信息
优惠券
回单奖励
购买方式
详情链接