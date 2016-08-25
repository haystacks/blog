---
title: nginx https
categories: 
- 学习
tags:
- nginx 
- https
---
刚刚才安装了win10 的ubuntu子系统，迫不及待的想学习一下https服务器端配置，如何开启可以看这里《[bash on ubuntu on windows](/blog/2016/08/25/windows-10-上运行Ubuntu.html)》  
<!-- more -->

### 安装准备
* [nginx](http://nginx.org/en/linux_packages.html#stable)
* [Let's Encrypt](https://letsencrypt.org/)

服务器这里选用的是 **nginx** ，证书用的是开源免费证书 **Let's Encrypt** 。

### 安装nginx
<!-- * 检查ubuntu的版本号
    lsb_release -a -->
> sudo apt-get install nginx

### 安装证书
