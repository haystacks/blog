title: windows下安装laravel 5.1
tags: laravel
---
常常看到一份统计数据，世界上最受欢迎的php框架是laravel，相反这个统计数据中没有tp，我觉得确实也不应该，比较国内使用tp的还是比较多，数据毕竟只是非国内数据统计（没有说明还是需要不断学习），文章只是翻译获得，如此，我是这么理解的，但是能在众多框架中始终排行第一，也不免其有自己的过人之处。带着好奇打开了[laravel的官方网站](http://laravel.com/)，简洁是第一印象，程序是不是也是会给我同样的感觉呢？
<!-- more -->
##### Love beautiful code? We do too.
laravel学习之路漫漫，只为如何优雅的写代码。
##### laravel运行环境检测
* PHP >= 5.5.9
* OpenSSL
* PDO
* Mbstring
* Tokenizer

php的版本必须是5.5.9+，开启php扩展（OpenSSL，PDO，Mbstring，Tokenizer），但是实际的学习过程中我只是暂时开启了Mbstring与OpenSSL，开启这两个扩展也是在错误提示下才开启的。PDO开启环境会报错，暂时没有想办法解决，就还没开启扩展，后面逐步解决问题。Tokenizer不知道是什么鬼？
##### laravel安装过程
方式之一就是参照中文版翻译网站的[下载地址](http://www.golaravel.com/download/)，下载解压至项目路径。
方式之二就是使用官方说明中的composer来安装。第一步就是使用[git clone](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)下来laravel最新的版本（git clone https://github.com/laravel/laravel.git）。然后在安装composer来管理laravel依赖的包。
* 安装composer
	1. [composer官网](https://getcomposer.org/download/)下载安装文件
	2. 修改laravel版本中的composer.json文件，添加一句配置

			"repositories": [
        		{"type": "composer", "url": "http://packagist.cn"},
        		{"packagist": false}
    		]
    3. composer install
    4. 为了让url更优雅需要在nginx的副本配置文件中添加一句

            server {
                listen 7000;
                location ~ \.php$ {
                    root           html;
                    fastcgi_pass   127.0.0.1:6000;
                    fastcgi_index  index.php;
                    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
                    include     fastcgi_params;
                    try_files $uri $uri/ /index.php?$query_string;
                }
            }
    4. 看到如下界面


##### 常见错误分析
1. Some settings on your machine make Composer unable to work properly.
Make sure that you fix the issues listed below and run this script again:
The openssl extension is missing, which means that secure HTTPS transfers are impossible.
If possible you should enable it or recompile php with --with-openssl
> 安装composer时openssl扩展没有开启，开启扩展
2. 运行composer install 不能安装
> 国内，你懂得。
添加配置文件
			"repositories": [
        		{"type": "composer", "url": "http://packagist.cn"},
        		{"packagist": false}
    		]

    		# 上面这段配置的url好像也无济于事，可以试试下面的这两个，也可以找一下其他的代理地址
            # http://pkg.phpcomposer.com/repo/packagist/
            # http://composer-proxy.jp/proxy/packagist
3. Problem 1
laravel/framework v5.1.7 requires ext-mbstring * -> the requested PHP exte
nsion mbstring is missing from your system.
> mbstring扩展没有开启，开启扩展