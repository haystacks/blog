title: 一个简单的特效引发的大战之移动开发中我为什么放弃jquery mobile
---
我本想安静的做一个美男子，可是，老板不涨工资，反而，一月不如一月。
我为什么放弃jquery mobile插件选择自己写特效？
<!-- more -->
在开发中大家都知道效率很重要，一个好的工具可以在开发中大大提升效率，工作做的越多，相应的取得的报酬也就越多，相反就是我自己了。
最近一直在一件事情上，移动线上网站测试必须符合3星，将不合格的网站调优后保证3星，方便线上推广，难免会遇见一些问题，大致为题后期会写一篇随笔总结，[移动开发中网站如何优化](http://www.cnblogs.com/unofficial/p/3988095.html)。其中遇见的一个问题就是JS文件过大，CSS文件过大，之前项目一直使用的jquery mobile开发的前端模板，以至于批量开发的模板全部是基于jquery mobile，在这期间一直没有过多的分析这之间会出现的问题，直到这次考核。
jquery mobile是基于jquery，在应用jquery mobile前必须先引入jquery，为了方便也就自然使用了对应的jquery mobile的样式文件。但是在实际批量模板的时候并没有写更多的JS特效，也并没有使用jquery mobile默认的样式，相反还要写一些样式来取消原来的样式。(其实，这之间有些是可以避免的，不介意的情况下还是可以使用JQM，只是我们的小伙伴有固定的任务，开发的使用为了效率，一天可能就要完成两套模板，相应的时间也就投入在了CSS和模板标签上了)。

### 原来我们是这么做的移动开发
```
	JS：
	① jquery-1.9.1.min.js
	② jquery.mobile-1.3.1.min.js
	③ banner.js
	④ 一段JS
	CSS：
	① jquery.mobile-1.3.1.min.css
	② style.css
```
### 现在我是这么做的
在JQM与zepto之间我还是纠结了一下，毕竟之前已经有很多项目已经是基于JQM，最后我还是一致决定使用zepto来重新规范一下接下来的模板，也许我这只是一个人的想法，也许这只是一次做着玩的想法，毕竟这不是第一次也不是最后一次。说远了，拉回来。
```
	JS：
	① require.js
	② zepto.min.js
	③ touch.min.js
	④ baiyun.mobile.min.js
	CSS：
	① style.css
```
### 前前后后对比分析
#### >>>对比一：页面
![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/170901371282887.png)
图一，原版，在这个版本中使用的是JQM，完全没有使用JQM的默认UI，相反使用了很多的独立IMG，也就自然而然增加了很多次请求，按照现在的要求，页面不能单一的设计成现在的banner，首页栏目导航。这个将自然而然增加更多的请求。  

![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/171210531909913.png)
图二，现版，在这个版本中使用了zepto，只是为了选择器方面方便一些，更好的我觉得还是使用原生的javascript，这就是做移动开发的好处，不用考虑蛋疼的IE低版本，对于基础知识的要求也就要更牢靠一些，也许习惯了使用工具，有时都很难分清楚到底原生中有没有这样一个方法，随着更新，也许现在正在使用就会被下一个取代，可是万变还是不离其中。还使用了一个老方法就是CSS Sprites，现在还有一些其它的方式，这里暂时不赘述了。  

#### >>>对比二：首次加载
![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/170945164718396.png)
图三，原版  

![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/170944488622632.png)
图四，现版  

#### >>>对比三：二次加载
![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/170945493787743.png)
图五，原版  
![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/170946029716391.png) 
图六，现版  

对比二与对比三不能作为绝对数据，但是从中我们也能看出一些问题，由于也是刚刚面对三星检测这个棘手的问题才现学现卖，关于网站的优化方面还有很多知识需要学习，希望能够与正在做相关工作的小伙伴一起交流交流。这里先不说其它因素，要不然就有扯远了，图三中JQM 与 JQ文件是73.9K(原文件还要大一些，具体的可以参见JQUERY官网)，耗时1S左右了，相反require 与 zepto 与 touch文件是17.6K，耗时52ms，数据应该能看出一些什么吧？最后我还是决定换掉JQM，使用现在的版本，插件也可以直接使用JQM的插件，更喜欢自己造轮子，主要还是希望在这过程中自我学习提升，工资不能再降了啊，再降就只好去让人打发点儿了，新闻说地铁口乞人日入多少多少，你不一定就可以，这中间涉及的问题太多，最简单的就是你没有这方面的工作经验。  
### baiyun.mobile.min.js 简单特效之Banner
一个简单的banner特效效果图：![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/171007092371107.gif)  
图片质量不是很高，还是用的是同一张图片，能不能看？不能看，不能看也就先将就着看吧。就是一个简单的几张图片轮播，这里有几点不一样，看完代码大家应该可以发现其中的问题。
##### HTML代码：
```
<div class="mbSlider">
    <ul>
        <li style="background: url(http://www.pushself.com/noImage.jpg) 50% 50% no-repeat;">
            <a href="http://www.pushself.com"></a>
        </li>
        <li style="background: url(http://www.pushself.com/noImage.jpg) 50% 50% no-repeat;">
            <a href="http://www.pushself.com"></a>
        </li>
        <li style="background: url(http://www.pushself.com/noImage.jpg) 50% 50% no-repeat;">
            <a href="http://www.pushself.com"></a>
        </li>
    </ul>
</div>
```

##### CSS代码：
```
.mbSlider ul {
  position: relative;
  z-index: 0;
  height: 120px;
  overflow: hidden;
}
.mbSlider ul li {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  visibility: hidden;
}
.mbSlider ul li, .mbSlider ul a {
  display: block;
  width: 100%;
  height: 100%;
}
.mbSlider ul li:nth-child(1) {
  visibility: visible;
}
```

##### JS代码：
```
(function(i) {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        name = option.name,
        AutoMain = function() {
            this.mbSlider = function() {
                var mbSliderThis = this,
                    directionArr = ["left","right"];
                    liLength = $("." + name + " ul li").length,
                    duration = i.duration in directionArr?i.duration:"left",
                    initVal = i.initVal && i.initVal<liLength?parseInt(i.initVal):0,
                    mbSliderHeight = $("." + name + " ul").height(),
                    mbSliderHeight = mbSliderHeight > 120 && mbSliderHeight < windowHeight / 3?mbSliderHeight:120;
                $("." + name + " ul").height(mbSliderHeight);//banner不能过大
                if(liLength < 2) {
                    return;
                }else if(liLength == 2) {//便于切换流畅
                    $("." + name + " ul").append($("." + name + " ul").html());
                    liLength = $("." + name + " ul li").length;
                }
                var direction = i.direction,
                    t;
                mbSliderThis.run = function(direction){
                    Action.apply(this,{
                                0: direction,
                                1: initVal,
                                2: liLength,
                        "length" : 3
                    })
                    initVal = initVal == liLength - 1?0:++initVal;
                    t = setTimeout(function() {
                        mbSliderThis.run(direction);
                    },3000);
                }
                $("." + name + " ul li").css({
                    "-webkit-transition-duration":i.duration + "s"
                });
                mbSliderThis.run(direction);
                $("." + name + " ul li").swipeLeft(function() {
                    var direction = "right";
                    clearInterval(t);
                    mbSliderThis.run(direction);
                });
                $("." + name + " ul li").swipeRight(function() {
                    var direction = "left";
                    clearInterval(t);
                    mbSliderThis.run(direction);
                });
            };
        },
        Action = function(direction,initVal,liLength) {
            var liLength = liLength;
            if(direction == "right") {
                var currLiNum = initVal,
                    prevLiNum = currLiNum == 0?liLength - 1:currLiNum - 1,
                    nextLiNum = currLiNum == liLength - 1?0:currLiNum + 1;
                    directionVal = 1;
            }else {
                var currLiNum = initVal == 0?0:-initVal,
                    prevLiNum = currLiNum == 0?-liLength + 1:currLiNum + 1,
                    nextLiNum = currLiNum == -liLength + 1?0:currLiNum - 1;
                    directionVal = -1;
            }
            var prevLiWidth = -windowWidth * directionVal,
                currLiWidth = 0,
                nextLiWidth =  windowWidth * directionVal;
            $("." + name + " ul li").eq(prevLiNum).css({
                "-webkit-transform":"translate3d(" + prevLiWidth + "px, 0, 0)",
                "visibility":"hidden"
            });
            $("." + name + " ul li").eq(currLiNum).css({
                "visibility":"visible",
                "-webkit-transform":"translate3d(" + currLiWidth + "px, 0, 0)"
            });
            $("." + name + " ul li").eq(nextLiNum).css({
                "-webkit-transform":"translate3d(" + nextLiWidth + "px, 0, 0)",
                "visibility":"hidden"
            });
        },
        autoMain = new AutoMain().mbSlider();
})(option)
var option = {"name":"mbSlider","direction":"right","duration":".8","initVal":0};
```

这中间其实有遇见一个问题，因为存在在PC中向客户大致展示一下，使用background只是为了部分浏览器中避免拖动时图片被拉出，却发现了一个问题，背景代码：background: url(http://www.pushself.com/noImage.jpg) 50% 50% / 100% 100% no-repeat;在chrome下可以直接解析使用，移动端的时候就被分解了，background-size: 100%;并非是background: 100% 100%;就会第一次进入页面时，或者刷新后出现一个不希望有的特效。
![www.unofficial.cn](http://images.cnitblog.com/blog/622169/201409/171212088001414.gif)
这次分享到此结束，希望能够与大家多多交流。 