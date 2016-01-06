title: 领导让我重新做一个微信H5页面，我拒绝了！
---
leader：我们需要做一个微信H5页面，效果如图，功能如描述，时间越快越好。  
<!-- ![www.unofficial.cn](http://ww1.sinaimg.cn/mw690/e6cd2709gw1eyawzl2fgsj208w1ilq3u.jpg) -->
需求是不是很简单呢？
<!-- more -->
### 背景描述
前几天微信转发相关项目开发后，这是第一个微信相关项目开发，为什么这个才叫第一个？上一个完全没有用到任何微信相关接口，一个动画宣传页加一个表单，这次这个名曰“微信H5页面”却感觉不是那么简单。只是之前自己写着玩，关注过微信的相关接口，也就是5分钟热度，到现在那个公众号还是只是会简单的翻译（用的百度翻译接口，完全没有涉及到微信接口，因为用的就是微信Demo，根本就没细看）。  
**说了这么多，总结为一个词“小白”**  
![www.unofficial.cn](http://ww1.sinaimg.cn/mw690/e6cd2709gw1exz2cp85jwj209k09kdfs.jpg)  
> 这里我想吐槽一下。有一段时间看见微博上有一些大牛在讨论“HTML5简称为H5？”，其实一开始我是无所谓的，但就是这次微信项目开发完以后让我觉得有些讨厌了，也许是今天的情绪原因。  

### 现状分析
1. 认证订阅号一枚
2. 无

### 分析原型图需求
leader指定的交接员给我的是一个PPT的项目解说方案，以及一个PPT做的原型图，这些图是我用蹩脚的PS重新COPY的一份，部分相似内容界面略去。
#### 图一
![www.unofficial.cn](http://ww3.sinaimg.cn/mw690/e6cd2709gw1eyb3aa32eqj208w0dcq32.jpg)  
用户关注了我们“**科技公司”官方微信后的消息推送，下方是官方微信导航。推送活动信息，导航活动添加入口。这里需要用到两个微信相关的接口。  

##### 接口列表
1. [关注/取消关注微信事件](http://mp.weixin.qq.com/wiki/2/5baf56ce4947d35003b86a9805634b1e.html)    
2. [自定义菜单管理接口](http://mp.weixin.qq.com/wiki/13/43de8269be54a0a6f64413e4dfa94f39.html)  

#### 图二
![www.unofficial.cn](http://ww3.sinaimg.cn/mw690/e6cd2709gw1eyb3aadyjej208w0dcgln.jpg)  
用户开启或者查看众筹详情的时候必须检测用户是否关注了我们的订阅号，以及开启众筹详情需要用到当前微信用户的用户信息。此接口仅限微信认证的服务号使用。由于账号权限没有，决定申请一个仅用于开发使用的服务号用于配合此次活动，但前提还是用户必须关注我们的订阅号才能参与此次活动。于是在两个账号直接关联就需要用到UnionID。
提到UnionID就需要区分一下两个平台：**微信公众平台**与**微信开放平台**，对于我来说一开始是傻傻分不清楚的，在“Dear，Good night～”的解释下，我才明白如果需要关联这两个账号需要用到UnionID。  
首先绑定账号。
1. 注册登录微信开放平台  
2. 管理中心--公众号--绑定  
![www.unofficial.cn](http://ww3.sinaimg.cn/mw690/e6cd2709gw1eyax1az74wj20sm0d6gmz.jpg)  
其次通过认证订阅号获取所有关注用户的unionid存表备用，关注或者取消关注去更新这个表的数据。
最后授权登录后根据当前授权用户的信息，获取服务号返回unionid，检查用户是否关注订阅号，没关注的情况下跳转一个二维码展示页面。
3. 总结思路图  
![www.unofficial.cn](http://ww4.sinaimg.cn/mw690/e6cd2709gw1eyaxrcufrmj208w0670sq.jpg)   

##### 接口列表
1. [网页授权获取用户基本信息](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html)  
2. [获取关注者列表](http://mp.weixin.qq.com/wiki/3/17e6919a39c1c53555185907acf70093.html)  
3. [获取用户基本信息(UnionID机制)](http://mp.weixin.qq.com/wiki/14/bb5031008f1494a59c6f71fa0f319c66.html)  

#### 图三
![www.unofficial.cn](http://ww3.sinaimg.cn/mw690/e6cd2709gw1eyb3aauguxj208w0dcglo.jpg)  
这个示意图其实是一个简要的图，如果要做的话这个页面其实需要多个附加页面。
1. 开启众筹后，这个界面也是展示我的众筹界面。首页需要显示的信息有我的众筹详情，我可以自己为自己筹一次，分享让微信好友帮我筹。  
2. 微信好友进入我分享的界面后，首先是我的邀请语“HI，我正在参加……”，微信好友可以替我筹一次。微信好友也可以开启自己的众筹账户，也可以分享出去给自己的微信好友。  
3. 我众筹到钱以后可以按照额度10倍兑换优惠券。
一些接口需要认证服务号或微信认证。  

##### 接口列表
1. [微信分享](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)  
2. [微信支付](https://pay.weixin.qq.com/wiki/doc/api/index.html)  
3. [微信卡卷接口](http://mp.weixin.qq.com/wiki/9/4f455120b50741db79b54fde8896b489.html)  

#### 其他页面
![www.unofficial.cn](http://ww1.sinaimg.cn/mw690/e6cd2709gw1eyb3ab4swlj208w0dcwec.jpg)  
1. 描述游戏规则  
2. 关注订阅号  

### 常见问题总结
1. 关于token开发者中心配置的问题
公众号后台配置好以后，设置好token等信息。服务器环境下的demo文件设置好token。保存如果出现token失败，确认模式设置的是明文模式，其它模式需要对信息先处理再验证返回，确认demo文件设置的token与公众号后台配置一致，最后输出echostr
```
<?php
	//简单总结后就应该是这样子，为了后续开发不应该是这样子，结合实际开发情况使用，但token验证仅仅如此就够了
	define("TOKEN", "unofficial");
	function checkSignature() {
		// you must define TOKEN by yourself
		if (!defined("TOKEN")) {
				throw new Exception('TOKEN is not defined!');
		}

		$signature = $_GET["signature"];
		$timestamp = $_GET["timestamp"];
		$nonce = $_GET["nonce"];

		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
		// use SORT_STRING rule
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );

		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}

	if( checkSignature() ) {
		echo $_GET['echostr'];
	}
?>
```
2. 订阅号权限不够时，借助单独申请的服务号开发。unionid的使用问题
上述已经描述过这个问题了，不细总结了
3. 在开发过程中我们可以通过申请测试账号来开发测试
测试号的使用有一些限制，测试号开发的网页账号授权需先关注测试号才能进行测试，否则提示未关注测试号
4. 部分接口的测试需要按照配置的url来发起请求
这个我常用的方法是修改本地host文件来实现，还有一些其他的解决方案，但是我就是常用这个。
5. 区分accessToken  
access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。由于请求次数有限制，最好缓存一下。但这里要说的是网页账号的请求也需要一个accessToken，此非彼。网页授权是通过code换取access_token这个是没有请求限制的，但是对于当前登录用户还是需要缓存一下，请求用户信息或切换页面是还是需要验证用户信息的。一开始有混淆，这里总结一下。  
6. sae来做服务器环境的情况下需要注意的一些问题  
我使用的sae版本的thinkphp来开发的本次项目，官网下载sae版本的，sae代码版本管理工具选择的是git，提交代码，为什么报错了？sae的环境因素决定使用时需要初始化Memcache。
数据库的链接模式在5.3以后建议使用pdo模拟，于是这个地方配置的问题，如果使用sae官方版本直接使用内置配置，不需要按照网上教程手动创建添加配置config_sae.php。
7. php函数优化使用的学习，用途是针对url中的数据编码  
```
	//base64_encode();
	//base64_decode();
	function base64url_encode($data) {
		return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
	}

	function base64url_decode($data) {
		return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
	}
```
8. 前端路由工具  
早在去年的时候面对公司项目的问题，当时为了解决一套cms的页面不修改页面本身，实现无刷新加载时也研究个这个问题，但是对于多变的工作情况，没能有实际的成功，但是基本上还是出现了一套没有考虑性能的方案，但是最后“没使用，没优化”，不了了之了。就在这时我看到张大神出了一个```mobilebone```移动端的骨架，后来由于公司重心的偏移，也就没有继续思考这个问题了，没想到的是这次还会用到```mobilebone```。
在问题面前徘徊的时候我有想到过angular，但是没必要，也有想到过vue，本来是准备用vue-router的，但是感觉与我想要的有些不一样，暂时放弃了，不过还是可以关注一下，vue挺好的。群内请教时，@叶小钗 有推荐他的blade，但是由于时间的原因，也就没有继续研究了，回头还是要好好看看多多向钗哥大神学习。

### 故事结局
为了进度，周末在家值班的时候还全力赶进度，今天沟通的时候，leader说“这个要重新做，重新做一个H5+CSS3的”。一开始其实我是想让领导能打发一点报酬，毕竟我觉得这是我应得的，但是领导直接让我经理给我谈，我只好回到自己的工位，告诉我的直属领导我不做了，前面的报酬我也不要了，毕竟给的也不够，至少我心理的平衡点丢失了。就这样我拒绝了领导，不知道后面的日子如何，但原则性问题还是要有，我觉得这事儿我办的漂亮。
虽然是白忙一场，心理有些亏欠，但更多的却是“爽”！  
最新情况是项目让另外一位同事接手，由于需求什么的都变化了，也就不能帮忙了，后续会继续完善这个结局。  
本文同步更新在[博客](http://www.unofficial.cn)www.unofficial.cn
