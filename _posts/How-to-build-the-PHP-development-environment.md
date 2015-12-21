title: 如何搭建php开发环境？
categories:
- php
---
学习php的过程中，首先面对的就是开发环境的搭建，具体怎么搭建应用开发环境呢？
本文介绍以下3种方式，对于零基础的可以使用第一种与第三种来快速开始学习历程。
<!-- more -->
#### 集成环境
LAMP/WAMP，LNMP/WNMP，集成解决方案，直接安装集成环境，由于我还是在win上开发，这里仅仅针对W来学习。这里推荐很多朋友都在使用的[wampserver](http://www.wampserver.com/en/)，由于没有公司业务关系没有使用nginx，对于这种集成方案暂时就没有收集，谷歌了一下没有找到很好，也就不做相应推荐了。
#### 独立环境
常用的wamp与wnmp的安装配置模式都差不多，只是注意对于php的版本的选择，本文简单介绍配置环境，暂时不做扩展，以下例子介绍wnmp的配置方式。
<!-- more -->
##### 1.nginx

* 安装**[nginx](http://nginx.org/en/download.html)**服务器，本文选择的当前稳定版本1.8.0
* 解压文件，在当前文件夹，命令行运行

		start nginx

![启动nginx](/images/2015/07/07/20150707155736.png)
* 默认端口是80，如果电脑本身安装有其他服务器或者其他服务占用了端口，启动nginx可能就会报错，我这里修改了配置文件的监听端口为6000，所以运行127.0.0.1:6000就可以看到nginx启动成功了。

![启动成功](/images/2015/07/07/20150707161456.png)

##### 2.mysql

* 安装**[mysql](https://dev.mysql.com/downloads/windows/installer/)**，在这个过程中没有太多需要注意的，唯一需要注意的就是设置好编码，如果后期编码不统一是一个很大的问题，到时再来处理就略微有些复杂。[如何处理数据库编码不统一显示乱码的问题？](http://)

##### 3.php

* 安装**[php](http://windows.php.net/download#php-5.6)**，这里使用的是FastCGI模式，下载nts（Non Thread Safe）版本
* 解压文件，怎么才能把php与nginx关联起来呢？
	1. 修改nginx配置文件**nginx.conf**
			server {
				#这里是默认配置
			}
			include 127.0.0.1.conf;	 #这一句是配置文件没有的，我们新添加的
	2. 在nginx.conf所在目录创建一个**127.0.0.1.conf**的配置文件
			server {
				listen 7000;
				location ~ \.php$ {
					root		   html;
					fastcgi_pass   127.0.0.1:6000;
					fastcgi_index  index.php;
					fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
					include		fastcgi_params;
				}
			}
	3. php的目录下复制**php.ini-development**重命名为**php.ini**
	4. 接下来在php的目录下运行
			php-cgi -b 127.0.0.1:6000
	4. 接下来在nginx的目录下运行
			start nginx

* 浏览器输入127.0.0.1:6000就可以加载root目录下的index.php文件了
* 针对上面的操作我们可以通过**[RunHiddenConsole](http://redmine.lighttpd.net/attachments/660/RunHiddenConsole.zip)**构建一键启动/关闭的批处理程序
	1. 启动（start.bat）
			@ECHO OFF
			REM php与nginx的路径配置信息-服务IP与端口信息-可修改参数信息
			set PHP_PATH=./php-5.6.10
			set NGINX_PATH=./nginx-1.8.0
			set HTTP=127.0.0.1:6000
			REM 启动程序-无需修改以下信息
			ECHO Starting PHP FastCGI...
			RunHiddenConsole %PHP_PATH%/php-cgi.exe -b %HTTP%
			ECHO Starting Nginx...
			RunHiddenConsole %NGINX_PATH%/nginx.exe -p %NGINX_PATH%
	2. 关闭（stop.bat）
			@ECHO OFF
			REM 结束程序-无需修改以下信息
			ECHO Stoped PHP FastCGI...
			RunHiddenConsole taskkill /IM php-cgi.exe
			ECHO Stoped Nginx...
			RunHiddenConsole taskkill /F /IM nginx.exe

* 通过上面的配置现在已经搭建好了php环境，但是实际开发过程中我们还需要一些php的扩展，默认都是关闭的，我们需要手动修改php.ini的配置文件去开启。这里就不做过多描述，有疑问可以一起交流。
特别提示一下，nginx配置**127.0.0.1.conf**的时候，listen 7001，按照自己的实际情况可以不需要，fastcgi_pass这个必须，这里的端口必须与php-cgi开启的一致，且不被占用。
#### php内置web server
php5.4.0开始内置了一个web server，这个内置web server主要用于本地开发测试时使用，不可以线上使用。在php解压后所在目录运行一下命令，运行成功后会看到如下图提示


	php -S 127.0.0.1:6000 -t D:/www

![内置web server运行成功](/images/2015/07/08/20150708162706.png)
详细讲解一下这几个参数：


	-S 域名地址:端口	#例如：php.pushself.com
	-t 文档根目录	   #例如：/www
以上分享了3种方式来搭建环境，工作中我们常常会直接使用第一种；如果公司的项目对php的版本有要求，而个人项目又希望追求最新稳定版本，你就可以尝试第二种与第三种方式，但是切记第三种方式只可用于本地开发环境。