---
title: nginx https
tags:
  - nginx
  - https
categories:
  - 学习
date: 2016-08-26 16:34:43
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

### 运行nginx
开启nginx  
> service nginx start

看看是否开启成功
> service nginx status
    \* nginx is running

例如我设置的端口是8080，访问 **localhost:8080** 就可以看到如下欢迎界面  
![welcome to nginx](/blog/assets/imgs/20160825/welcome-to-nginx.png)

#### 可能存在的报错
* port ?
```
2016/08/26 09:56:02 [emerg] 486#0: bind() to 0.0.0.0:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to [::]:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to 0.0.0.0:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to [::]:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to 0.0.0.0:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to [::]:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to 0.0.0.0:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to [::]:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to 0.0.0.0:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: bind() to [::]:80 failed (98: Address already in use)
2016/08/26 09:56:02 [emerg] 486#0: still could not bind()
```
端口被占用，修改配置文件 **/etc/nginx/sites-enabled/default** 中的端口号为其它没被使用的端口。上面步骤操作了依然还是不能解决问题，看见有一行IPV6开启了的，于是注释掉了，再重启就好了。  
* worker process ?
```
2016/08/26 10:06:27 [alert] 598#0: ioctl(FIOASYNC) failed while spawning "worker process" (22: Invalid argument)
2016/08/26 10:06:27 [alert] 598#0: ioctl(FIOASYNC) failed while spawning "worker process" (22: Invalid argument)
2016/08/26 10:06:27 [alert] 598#0: ioctl(FIOASYNC) failed while spawning "worker process" (22: Invalid argument)
2016/08/26 10:06:27 [alert] 598#0: ioctl(FIOASYNC) failed while spawning "worker process" (22: Invalid argument)
```
查看github后，以及issue中提到的一篇博客中的描述，然后在配置文件 **/etc/nginx/nginx.conf** 中添加配置项 **master_process off;**  
* master_process off; 位置添加不正确  
```
2016/08/26 10:12:58 [emerg] 634#0: "master_process" directive is not allowed here in /etc/nginx/nginx.conf:67
```
添加在最顶部 **/etc/nginx/nginx.conf** 的最顶部
### 安装证书
使用官网提到的 **cerbot** 客户端，参考这个[教程](https://certbot.eff.org/#ubuntutrusty-nginx)安装

#### install
下载自动运行客户端程序，然后设置所有用户组的可执行权限
```
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```
自动安装
```
./certbot-auto
```

#### get started
这里的 **dev.unofficial.cn** 必须是公网可以访问的
```
certbot-auto certonly --webroot -w /usr/share/nginx/html -d dev.unofficial.cn
```

为了测试上面介绍的方法对不对，本地不能测试，也找不到合适的服务器来测试。于是想到了一个免费的资源可以用来测试（//c9.io），在线ide很棒，可以使用bash命令行工具，正好可以测试测试。
运行C9在线IDE，运行nodejs版本的server.js，他会提供一个二级域名，正好可以利用一下这个。执行上面整理的命令行工具的时候修改一下域名 **dev.unofficial.cn** 为这里分配的域名。

#### check key
验证key是怎么做的？

![](/blog/assets/imgs/20160825/letsencrypt.png)  
由于权限问题不能看到生成的fullchain.pem，也就不能继续配置学习，后续继续完善学习一下。  

#### 可能存在的问题
* 本地通过修改hosts失败
```
Failed authorization procedure. dev.unofficial.cn (http-01): urn:acme:error:unknownHost :: The server could not resolve a domain name :: No valid IP addresses found for dev.unofficial.cn
```

### 参考资料
* [Nginx not start](https://github.com/Microsoft/BashOnWindows/issues/68#event-650955230)
* [Running Nginx on Bash for Windows 10](https://www.svennd.be/running-nginx-on-bash-for-windows-10/)
