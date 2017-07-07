title: react-native在Windows下搭建React Native Android开发环境
---
### 在Windows下搭建React Native Android开发环境
前段时间在[开发者头条](http://toutiao.io)收藏了 @天地之灵_邓鋆 分享的《[在Windows下搭建React Native Android开发环境](http://react-native.cn/tutorials/2015/09/16/react-native-android-on-windows.html)》，在[开发者头条](http://toutiao.io)的抓取内容可以看到一部分，由于一直在休假就没有仔细学习，今天再次回顾我的收藏时却发现链接打不开（其实当时也有发现，只是这么说一下罢了）。于是，你应该知道怎么做的，最好的工具莫过于搜索而不是一味的抱怨说只能在mac上玩。之前因为react native ios肯定是只能在mac上玩，Android就不那么必须了。好了，我来开始搭建一下环境试试。  
<!-- more -->
#### React Native Android
### 安装JDK
从[Java官网之JDK下载列表](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)下载JDK并安装。请注意选择[x86](http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-windows-i586.exe)还是[x64](http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-windows-x64.exe)版本。我在这里直接接受了 @天地之灵_邓鋆 的推荐将JDK的bin目录加入到了系统PATH环境变量。注意：下载链接不能直接使用，需要先接受协议（这里有存入cookies），可以通过[Java官网之JDK下载列表](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)下载JDK。  
> 设置环境变量PATH：jdk的位置。例如：（PATH => D:\Program Files\Java\jdk1.8.0_60\bin）

### 安装Android SDK
单独安装Android SDK，在墙的环境下，为了速度我选择了使用[androiddevtools](http://androiddevtools.cn/)。  
> 设置环境变量ANDROID_HOME：Android SDK Manager的位置 例如：（PATH => D:\Program Files\Android SDK Tools）
  设置环境变量PATH：例如：（PATH => %ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools）  

### 安装React-native-cli
```
npm install -g react-native-cli
```

### 初始化项目
```
react-native init reactNative
```

### 报错了
```
This will walk you through creating a new React Native project in d:\www\project
\reactNative
events.js:85
      throw er; // Unhandled 'error' event
            ^
Error: spawn npm ENOENT
    at exports._errnoException (util.js:746:11)
    at Process.ChildProcess._handle.onexit (child_process.js:1053:32)
    at child_process.js:1144:20
    at process._tickCallback (node.js:355:11)
    at Function.Module.runMain (module.js:503:11)
    at startup (node.js:129:16)
    at node.js:814:3
```

windows下执行到这里就会报错，原因是npm在windows下的bug（来源于参考资料）。解决办法，直接clone项目主分支master。
```
git clone https://github.com/facebook/react-native.git
cd react-native/react-native-cli && npm install -g
```

### 接下来就可以初始化项目了
```
react-native init reactNative
```

### 运行packager 
这里最新的版本已经修复了 @天地之灵_邓鋆 提到的BUG。  
> 在工程目录下运行  

```
node node_modules/react-native/packager/packager.js
```
这条命令会看见程序开启了8081端口，并且运行[node node_modules/react-native/packager/packager.js](node node_modules/react-native/packager/packager.js)可以看见项目代码输出。

### Run android app
```
cd reactNative
react-native run-android
```

> 如果没有安装安卓模拟器，这里可以直接使用真机安装测试。
这个过程很漫长，等等等……  

### 安卓调试
目前Windows下无法自动打开chrome进行调试，所以手动打开chrome，访问如下地址：[http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui) 即可。  

### 报错了
```
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':app'.
> failed to find target with hash string 'android-23' in: D:\Program Files\Andro
id SDK Tools

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug
option to get more log output.

BUILD FAILED

Total time: 10 mins 42.463 secs
Could not install the app on the device, see the error above.
```
解决办法就是安装Android-23，对于上一篇关于[ionic](http://www.cnblogs.com/unofficial/p/4837190.html)的文是需要Android-22。  

### 又报错了
```
Could not find com.android.support:appcompat-v7:版本号.
```
安装```Android Support Libraries```和```Android Support Repository```

### build成功，安装上apk后界面红了
![](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogsS50928-115251.jpg)
**解决办法**
![](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogsS50928-115326.jpg)  
选择菜单：Dev settings  
![](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogsS50928-115346.jpg)  
选择项：Debug server host for device  
![](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogsS50928-115402.jpg)  
设置编译环境PC的IP地址，例如：192.168.25.121  
> 确保手机与编译环境在同一WIFI环境下（IP段相同），packager在运行状态下，重启APP

![](http://7oxjmq.com1.z0.glb.clouddn.com/cnblogsS50928-115659.jpg)  
初始化欢迎界面就出来了，后面继续学习中……

### 一波三折
这个hello world过程一波三折，主要归结为以下几点：  
1. 墙。我使用的是ss，但是这个过程中还是会有问题，主要是家用环境下。这个关系到npm的使用，这个可以使用淘宝镜像。Android环境搭建，这个我是在Androiddevtools上找的方法，公司环境下轻松安装，家用环境到现在还是没有搞定。  
2. bug。这个过程中本身就有一些问题，关于node版本的问题（手动升级4.1.1），react-native版本的问题（手动clone 0.12-rc）。  
3. 如果以上问题解决了，我想这个过程还是很愉快的。只想吐槽一下学习不容易啊。接下来主要的内容就是学习，同时学习ionic与react-native其实就是表层在同时在学习angular与react，至于深层次的我还不懂，暂时也不必细节。学知识，我是先学会用，再学习为什么要这么用，你呢？交流很关键，总结很重要。不是随时都有时间来重新学习，珍惜眼下充裕的时间，学习，学习，学习。  

### 参考资料
[原文参考](http://reactnativecn.github.io/blogs/react-native-android-on-windows.html)