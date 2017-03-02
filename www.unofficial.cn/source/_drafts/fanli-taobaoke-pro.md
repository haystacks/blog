---
title: 饭粒项目开发回顾
date: 2017-02-19 16:12:14
categories:
- 学习
tags:
- 饭粒
---
饭粒是一个关于淘宝客相关的项目，接触淘宝客最初在12年左右，后续由于一些其他原因，渐渐的就把这茬忘记了，知道最近一以前的同事提起他项目在用的一个项目就是淘客项目，并且他的朋友做的挺好，收入相当可观。更为主要的是把淘客做成了淘客服务。顿时便想再好好规划一下这个项目，把它再次做起来，做下去。  
<!-- more -->
在开始此项目之前，已经在开始一个关于微信公众号的项目，个人订阅号不能支持开发模式与普通模式兼并，开发式可以很好的利用回复功能，却不能拥有菜单功能，相反，普通模式有菜单功能，至于开发功能这块又不能那么灵活了，于是就想利用公众平台本身的功能，来实现相关扩展，时间太长，于是就暂时停止，直接使用了微擎来开始了饭粒的第一个版本。  
### 依赖相关项目
    - 微擎  

### 程序熟悉
* [文档](http://www.kancloud.cn/donknap/we7/136556)  
* URL关键参数，知道参数的含义就能很好的对应到程序，知道程序做了什么，就能很好的利用了。  
    - c: 控制器目录  
    - a: 控制器  
    - do: 默认控制器操作  
* 一键更新  
    需要检测是否注册（本地没能公网访问时是不能注册的，微信相关的功能开发的时候一样的道理，所以测试一直是一个问题），更新检测密钥（注册时一个论坛帐号对应一个站点域名，生成一个密钥，本地注册一个密钥，更新时提交本地密钥用于验证站点是否是注册，并且发起发起请求的站点是不是来源于注册站点）。

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

### 遇坑记录
* 大文件读取
相关问题：
> Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 4718592 bytes)  
文件读取的时候不能全部数据一起读取，对于小文件还好，大文件分行读取，最后拼接成一条sql，一起插入。主要涉及到的问题是内存问题，如果不是虚拟主机，可以选择修改配置文件或者加硬件配置，对于虚拟主机可以程序内临时配置，通过 `ini_set ('memory_limit', '512M');` 来解决问题。  
* pdo 相关的问题
    - 乱码：数据库连接的时候须指定编码，http://php.net/manual/zh/ref.pdo-mysql.connection.php ，php5.3.6以前的版本设置方式需要使用如下
    ```
    <?php
    $dsn = 'mysql:host=localhost;dbname=testdb';
    $username = 'username';
    $password = 'password';
    $options = array(
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    ); 

    $dbh = new PDO($dsn, $username, $password, $options);
    ?>
    ```
    - foreach bind 参数的时候，foreach 相关的一个传值传引用的问题，http://www.laruence.com/2012/10/16/2831.html  

* require require_once include include_once
基础知识，这个概念的区别，还有一些细节 http://www.laruence.com/2012/09/12/2765.html
