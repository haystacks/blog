---
title: linux-docker
date:
categories:
tags:
---

<!-- more -->
喜欢纯净的环境，首先还是从了解linux开始。

### linux
#### 常用命令学习
【tab】补全命令
【ctrl+a】行头
【ctrl+e】行尾
【ctrl+c】强行终止当前程序
【ctrl+d】【exit】退出终端
【tail】将输入的内容显示出来

#### 用户及文件管理
1.【who】查看用户信息
2.【sudo adduser <user>】创建用户
3.【su -l <user>】切换用户
4.【groups <user>】查看用户属于哪个用户组
  【cd /etc/sudoers.d】能使用sudo命令的用户会在该目录下存在用户名命名的文件
  【sudo cat /etc/sudoers.d/<user>】
  ```
  unofficial ALL=(ALL) NOPASSWD: ALL
  Defaults:unofficial !requiretty
  ```
5.【cat】读取指定文件的内容并打印输出到终端
6.【sort】排序后再输出
7.【cat /etc/group | sort】
8.【pwd】查看当前路径


* 如何创建一个用户 <unofficial>
sudo adduser unofficial
* 如何切换到用户 <unofficial>
su -l unofficial
* 如何把用户 <unofficial> 添加到 sudo 用户组
sudo usermod -G sudo unofficial
* 如何删除创建的用户 <unofficial>
sudo deluser unofficial --remove-home
* 如何变更文件所有者为 <root>
su -l unofficial
touch filename
su -l root
cd /home/unofficial
sudo chown unofficial filename
* 如何更改文件的权限
drwxrwxrwx 
-rwx------
d/- 文件夹或者文件
rwx(0) 拥有者
rwx(1) 所属用户组
rwx(2) 其它用户
r/w/x 1*2*2 1*2*1 1*2*(1/2)
强行终止当前程序

### docker
1. 按照官网文档安装docker以后，运行命令报如下错误
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
没有启动docker，运行命令启动一下 `systemctl start docker`
2. [镜像商店](https://store.docker.com/)中拉取一个镜像 `docker pull ubuntu:16.04`
3. 为什么不能使用 `sudo apt-get install -y nginx`?
4. 运行 `apt-get install -y nginx` 提示 `E: Unable to locate package nginx`，执行更新 `apt-get update`  
5. 查看容器ID对应的 `IP docker inspect --format='.NetworkSettings.IPAddress' $CONTAINER_ID`
6. 退出容器的方式
  * 退出关闭容器 exit
  * 退出不关闭容器 ctrl+p+q

### ngxin
* 问题：./configure: error: the HTTP rewrite module requires the PCRE library.
解决：yum -y install pcre-devel

* 问题：./configure: error: the HTTP gzip module requires the zlib library.
解决：yum install -y zlib-devel


#### 参考资料
https://docs.docker.com/engine/installation/linux/centos/#os-requirements
http://kb.cnblogs.com/page/536115/
http://blog.csdn.net/libraryhu/article/details/52443447
