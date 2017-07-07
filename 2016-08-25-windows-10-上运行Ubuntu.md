---
title: windows 10 上运行Ubuntu -- bash on ubuntu on windows
tags:
  - bash
  - ubuntu
categories:
  - 学习
date: 2016-08-25 08:56:00
---

在win10这个特性出来之前，打着学习（装B）的幌子装过几次ubuntu系统，win+ubuntu的双系统，也就那么几天的热情，过后还是用着win，孤立着ubuntu。  
<!-- more -->
### 系统有要求
* Windows 10 Anniversary Update - build 14393
    Available as of 8/2/2016
* x64-based processor
* Your PC must have an AMD/Intel x64 compatible CPU
* You must be a member of the (free) Windows Insider Program (Preferably Fast-Ring)
* Your PC must be running a 64-bit version of Windows 10 Anniversary Update build 14316 or later

> 一句话翻译：在基于x64位处理器的电脑上安装版本号大于14316的64位操作系统

#### 如何查看系统版本号？
![系统版本号](/assets/imgs/20160825/osversion.png) 
> 开始 - 设置 - 系统 - 关于，关注OS系统 和 系统类型

#### 如果系统版本号低了怎么办？
[立即更新](https://www.microsoft.com/zh-cn/software-download/windows10) 下载系统更新工具更新

### 开发者模式
![开发者模式](/assets/imgs/20160825/develop.png)
> 开始 - 设置 - 更新和安全 - 针对开发人员 - 开发人员模式

### 开启新特性
![搜索 特性](/assets/imgs/20160825/search.png)  
![勾选子系统](/assets/imgs/20160825/checked.png)  
> 开始 - 设置 - 搜索‘特性’ - 启用或关闭windows功能 - 适用于 Linux 的 Windows 子系统 - 重启生效

### 安装系统
![安装](/assets/imgs/20160825/install.png)  
> 开始（右键） - 运行 - 搜索‘bash’ - 回复‘y’

到这里安装win10 子系统就完成了，接下来开始愉快的玩耍了~