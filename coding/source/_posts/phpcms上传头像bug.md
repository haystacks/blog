title: 一次脚本注入广告漏洞分析
date: 2016-2-29 10:40:59
---
如果网站突然弹出一个广告（不是自己主动添加的联盟广告），第一直觉是DNS劫持，在此之前也是唯一直觉。之前遇到过几次DNS劫持，WAP站弹出广告，路由器被劫持弹出广告。未经历其它安全事件之前，我也只是偶尔关注一下安全事件，上一次重大修复还是去年，这一次问题也比较严重，可以说是很严重。
<!-- more -->
### 寻找漏洞
年前快放假了，有同事反馈展示库弹出广告，分析没有发现劫持现象。抓包调试发现全部js文件被篡改了，篡改还是以编码的形式，执行时解码。看来这次遇到比较厉害的角儿了。但是它是如何篡改js文件的呢？  
1. 服务器异常  
服务器安全软件全部是异常的，难道是服务器被黑了，直接拿到权限到服务器去执行了脚本程序，检查了login日志也没有发现异常，看来还是要另寻问题分析。一系列安全查杀开始运行一圈。  
2. http服务器日志异常  
日志对于问题分析很关键，但有一种情况就是未出问题之前没有服务器日志，也或者说攻击者删除了服务器日志，要怎么办呢？如果真的是这样，我也就只能呵呵了，事实也就是这样，呵呵哒！  
对于发现的网站，手动修改了被篡改的js文件，表面上解决问题了，但事实是转眼又被篡改了。
明天就放假了，今天还在这里查找漏洞，情何以堪。一时不能分析日志，能做的就是重新设置开启服务器日志，关闭上传功能，目录权限只读。先暂时处理问题，过完年再回来彻查问题。其实问题根本没有解决，如果木马脚本已经上传到服务器了呢？问题也依然没能解决，如果关键词查询一下就可以找到相关脚本文件了。  
3. 年后问题依旧存在  
网站js文件全部被篡改了，包括未使用的文件也被篡改了。一边写脚本批量替换掉被修改的文件，一边关键词查询木马文件。nodejs写了一个简单的批量替换脚本，木马脚本文件也找到了，通过上传漏洞上传了一个生成一句话木马的文件，一句话木马文件就想干嘛干嘛了，其中还生成了一个大马，一个服务器文件管理后台，看到这个大马脚本，一下觉得自己接触的内容太寒掺了。  
能找到文件但是还找不到上传漏洞，问题依旧是问题，同时线上客户网站也发现了同样的问题，线上服务器日志存在。向IDC索要了服务器日志文件，分析时发现了一个1.php，aboutus.php文件，以及上传漏洞位置。  

### 分析漏洞  
程序使用的是phpcms深度二次开发得到的，自然而然phpcms的问题依旧是我们的问题，对于phpcms的版本不断升级，发现的安全问题也在不断完善修复，我们的程序没有及时关注漏洞更新也就导致了这起问题的发生（漏洞修复期间依旧后期，我尝试了一些其他线上网站，原来没有就是安装补丁的不止少数）。  
#### 头像上传漏洞
通过api接口查看到key，拿到key以后再按照本地生成data的方法，手动生成data数据，拼接url避开验证获取上传路径，通过上传漏洞直接上传脚本文件至头像目录（上传是用的swfObject，flash生成大小不一的尺寸，然后压缩上传，后台程序解包至指定文件夹就完事了，没有过滤非法文件以及文件夹），使用burp抓取请求，替换请求数据（数据中包含脚本）。  
**<u>get authkey</u>**
```
/api.php?op=get_menu&act=ajax_getlist&callback=aaaaa&parentid=0&key=authkey&cachefile=../../../phpsso_server/caches/caches_admin/caches_data/applist&path=admin
```
  
![unofficial authkey](http://ww3.sinaimg.cn/large/e6cd2709gw1f1eyzwwxapj20i1047wej.jpg)

**<u>upload url</u>**
```
/phpcms/phpsso_server/index.php?m=phpsso&c=index&a=uploadavatar&auth_data=v=1&appid=1&data=6550BQMJAVJRCAMFBlNUVFIHC1JVCAIMVgAOB1FFCFILBkRFQGZQFxVQbF5TGAsBQQgKUQRId1YVClBTJ15YYQFwUnpjalYXI11DZHkGAQ
```
  
**<u>burp拦截修改http请求</u>**  
![unofficial burp](http://ww1.sinaimg.cn/mw690/e6cd2709gw1f1f6fq01orj20rs0drgqp.jpg)
修改请求主体内容为自己需要提交的脚本内容  
  
**<u>脚本执行</u>**  
这里可以直接上传脚本，也可以上传一个生成一句话脚本的文件（想怎么做你自己看着办，不做违法的事情）  

### 更多隐藏漏洞
一个开源编辑器，没有使用，没有修改默认配置，于是乎也是一个潜在危害，对于程序中不断引入越来越多的模块，安全性真的值得考虑。

### 分析末尾
没有深入总结问题，主要细节包含批量替换脚本的制作。本地展示库使用nodejs处理zip包相关node-archiver，php脚本相关的是类ZipArchive，但最后还是使用c#弄了个exe。暂时告一段落，也只想呵呵了。

### 参考资料
[node-archiver](https://github.com/archiverjs/node-archiver)  
[ZipArchive](http://php.net/manual/zh/book.zip.php)  
[wooyun](http://www.wooyun.org/bugs/wooyun-2014-066394/)