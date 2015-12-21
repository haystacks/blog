title: ionic开发环境搭建并编译运行第一个APP
---
其实类似的环境已经玩了很多次了，最开始玩还是微信刚刚出来，那会儿没有智能机。只好安装一个模拟器，却只是为了注册一个微信。想想也就是够了~  
<!-- more -->
前前后后折腾了很多次，可是每一次都给人不一样的感觉，也许是这个过程中习惯了，也许是对于一些事情的看法变了，渐渐的越来越顺手。比较在GFW越来越NBHH的时候还能安装SDK也是很不容易的了。最主要的是从来没有总结过，如果每一次总结一下，或者早就不用这样重复重复再重复，搜索搜索再搜索了。学习是一个总结的过程，这一次例外的总结一下。
### ionic

##### Install Ionic
```
npm install -g cordova ionic
```
##### Start a project
```
ionic start ionicProject blank
```
**ionicProject 指代项目目录，创建一个空白项目  
其它项目：  **
```
ionic start ionicProject tabs
ionic start ionicProject sidemenu
```

##### Run it
运行一下刚刚创建的项目，运行命令：
```
cd ionicProject
ionic platform add android
ionic build android
ionic run android
```

**其实上面的运行代码也是有前提的，需要安装Android开发环境，这里基本上是共通的。**  

1. 安装JDK
   设置环境变量PATH：jdk的位置。例如：（PATH => D:\Program Files\Java\jdk1.8.0_60\bin）

2. 安装Android SDK Manager
   设置环境变量ANDROID_HOME：Android SDK Manager的位置 例如：（PATH => D:\Program Files\Android SDK Tools）
   设置环境变量PATH：例如：（PATH => %ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools）

3. 安装package
   Android SDK
   Android SDK Platform-tools
   Android SDK Build-tools

4. 如果第3步创建了模拟器
   ionic emulate android

##### 错误分析
在安装过程中会报一些错误，按照错误提示的关键词在本文应该就可以找到答案，如果不行可以留言一起交流，然后搜搜搜。  

##### 我的环境
```
> ionic info
Your system information:
Cordova CLI: 5.3.1
Ionic Version: 1.0.1
Ionic CLI Version: 1.6.4
Ionic App Lib Version: 0.3.8
OS: Windows 7 SP1
Node Version: v0.12.2
```
##### 参考资料
[ionic官网](http://ionicframework.com/)