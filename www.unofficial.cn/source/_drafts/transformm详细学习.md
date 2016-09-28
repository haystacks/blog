---
title: transformm详细学习
date: 2016-9-6 09:05:36
categories:
- 学习
tags:
- transform 
---
每次都是现用现搜，这次模拟实现IOS手机上的select的时候就又是遇见了同样的问题。遇到一个不懂得属性或者理解不透的属性查一下，或许工作时间查出来的答案，回家时又需要再次重新查询一遍或者抱着书吭半天，结果还是可想而知，没有仔细深入过的知识点，终究还是要重新来过。
<!-- more -->

### transform
transform的翻译为变换/转换，在css中可以修改模型所在的空间位置。表明位置就需要坐标系，空间位置就需要空间坐标系。
* 纯手工坐标系
![坐标系](/assets/imgs/20160906/20160906092758.jpg)
* 纯手工空间坐标系
![空间坐标系](/assets/imgs/20160906/20160906092839.jpg)

transform可以通过设置属性值来移动（translate）/旋转（rotate）/缩放（scale）/倾斜（skew）元素。

* 创建一个元素小黑（原始位置），然后向左**移动**元素100px
![translate](/assets/imgs/20160906/translate.png)
> 注：原点位置（0, 0）在左上方位置，translate3d时z坐标也是0，即为桌面平面  
* 创建一个元素小黑（原始位置），然后正向**旋转**元素45度
![rotate](/assets/imgs/20160906/rotate.png)
 旋转时绕x轴转的时候rotateX、y轴rotateY、z轴rotateZ
 **存在的问题**
 * rotate3d(x, y, z, α)？
 * rotate时translate3d或rotate3d会使元素内的字体模糊？

 > 注：原点位置（0, 0）在中心位置  
* 创建一个元素小黑（原始位置），然后**缩放**元素到原始的1.2倍
![scale](/assets/imgs/20160906/scale.png)
 > 注：原点位置（0, 0）在中心位置
* 创建一个元素小黑（原始位置），然后**倾斜**元素5度
![skew](/assets/imgs/20160906/skew.png)
 > 注：原点位置（0, 0）在中心位置，中轴线为x轴

### transform-origin
transform属性可以改变元素的大小、位置和角度。原点位置默认都是中心或者左上角，这个坐标原点位置如何修改呢？transform-origin就是用于改变坐标原点位置。
transform-origin: offset(百分比[10%]或者带单位的长度[10px])/offset-keyword(top/right/bottom/left/center也可以用百分比替换0/100%/100%/0/50%)

#### 针对上面的例子再次重新实现
* translate
只是设置一个translate值然后修改transform-origin无效？！ 
eg:
```
	tranform-origin: -100px 0;
	tranform: translate(100px);
```
* rotate
默认的transform-origin: 50% 50%;
eg
```
/* div css */
transform-origin: 0 0;
animation:rotate 5s infinite;

/* animation */
@keyframes rotate {
	0% { transform: rotate(0deg); }
	25% { transform: rotate(90deg); }
	50% { transform: rotate(180deg); }
	75% { transform: rotate(270deg); }
	100% { transform: rotate(360deg); }
}
```
将源点移动到左上角以后，元素围绕左上角作旋转运动。  

* scale
默认的transform-origin: 50% 50%;  
eg
```
transform-origin: 100% 100%;
animation: scale 5s infinite;

/* animation */
@keyframes scale {
	0% { transform: scale(.9); }
	25% { transform: scale(.8); }
	50% { transform: scale(.9); }
	75% { transform: scale(.8); }
	100% { transform: scale(.5); }
}
```
元素围绕原点就行放大或者缩小变形。  

* 倾斜原点移动到左上角=>transform-origin: 0 0 0;(transform-origin: 0 0 0;)