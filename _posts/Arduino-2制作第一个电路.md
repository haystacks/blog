---
title: 制作第一个电路单LED闪烁
date: 2019-09-08 16:30:00
tags:
    - Arduino

categories:
    - 爱好
---

做这个实验前我们要先认识 Arduino ，接触面包板，了解电路中的元件的工作电压和工作电流等。

<!-- more -->

## 实验材料

本次实验需要以下零部件

-   Arduino
-   LED 灯一枚
-   电阻一枚
-   连接线两根
-   面包板一个

## 认识 Arduino

我需要先了解以下 Arduino 板上的组件具体由什么构成。我找了一个参考图。

![Arduino](https://i.loli.net/2019/09/08/1ghYqsGemuwR359.png)

|  序号   | 名称            | 描述                                                                                                                                                                                                                                                                   |
| :-----: | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         | 工作电压        | 5V                                                                                                                                                                                                                                                                     |
|    1    | 电源 USB        | Arduino 板可以通过计算机上的 USB 线供电                                                                                                                                                                                                                                |
|    2    | 电源 电池插座   | Arduino 可以通过电池电源供电                                                                                                                                                                                                                                           |
|    3    | 稳压器          | 稳压器的的功能是控制提供给 Arduino 的电压，并稳定处理器和其他元件使用的直流电压                                                                                                                                                                                        |
|    4    | 晶体振荡器      | 晶体振荡器帮助 Arduino 处理时间问题。上面有数字标识 **T16.000** 代表频率是 16MHZ                                                                                                                                                                                       |
|  5,17   | 重置            | 重置 Arduino                                                                                                                                                                                                                                                           |
| 6,7,8,9 | 引脚            | 3.3V(6) 提供 3.3V 输出电压；5V(7) 提供 5V 输出电压；GND(8) 接地；VVin(9) 此引脚可以用于外部电源为 Arduino 供电                                                                                                                                                         |
|   10    | 模拟引脚        | A0-A5 这些引脚可以从模拟传感器读取信号，并将其转换为可以由微处理器读取的数字值                                                                                                                                                                                         |
|   11    | 微控制器        | Arduino 的大脑                                                                                                                                                                                                                                                         |
|   12    | ICSP 引脚       | 大多数情况下，ICSP（12）是一个 AVR，一个由 MOSI，MISO，SCK，RESET，VCC 和 GND 组成的 Arduino 的微型编程头。它通常被称为 SPI（串行外设接口），可以被认为是输出的“扩展”。实际上，你是将输出设备从属到 SPI 总线的主机。                                                   |
|   13    | 电源 LED 指示灯 | Arduino 插入电源时，此灯亮说明电路板正常通电                                                                                                                                                                                                                           |
|   14    | TX 和 RX LED    | 在你的板上，你会发现两个标签：TX（发送）和 RX（接收）。它们出现在 Arduino UNO 板的两个地方。首先，在数字引脚 0 和 1 处，指示引脚负责串行通信。其次，TX 和 RX LED（13）。发送串行数据时，TX LED 以不同的速度闪烁。闪烁速度取决于板所使用的波特率。RX 在接收过程中闪烁。 |
|   15    | 数字 I/O        | Arduino UNO 板有 14 个数字 I/O 引脚（15）（其中 6 个提供 PWM（脉宽调制）输出），这些引脚可配置为数字输入引脚，用于读取逻辑值（0 或 1） ；或作为数字输出引脚来驱动不同的模块，如 LED，继电器等。标有“〜”的引脚可用于产生 PWM。                                          |
|   16    | AREF            | 模拟参考，它有时用于设置外部参考电压（0 至 5 伏之间）作为模拟输入引脚的上限。                                                                                                                                                                                          |

## 面包板

如何将面包板和 Arduino 连接起来使用呢？
一般默认红色、黄色和绿色为正极，蓝色和黑色为负极。我们这里选择了一根红色一根蓝色的线来连接 Arduino 和面包板。  
熟悉了面包板之后知道上下区域一致（“楚河分界”，选择一边作为工作区域）。电压红蓝线之间与工作插线区域是分开的，这里需要连接线连接一下。

![线路图](https://i.loli.net/2019/09/08/QdAYg7aJ4mN5eGB.jpg)

## LED

LED 两只脚长度不一致，长脚为正级，短脚为负极。

发光二极管的反向击穿电压大于 5V，由于我们的 Arduino 的工作电压是 5V ，这里需要增加一个电阻来保证 LED 的安全，我们看来一下盒子里面的零件有 1K 4.7K 10K 的电阻，这里我选用了一个 1K 的。

备注：因为 LED 是负温度系数的 温度越高电流越大，电流越大发热越大，然后停不住就烧了。
串电阻就限制了这个过程，温度升高，电流增加，电阻上的分压增大，led 上的电压减小，电流就减小，温度就不会再上升。

## 程序

这里是在昨天的基础之上继续做的实验，只需要将昨晚的 Blink 代码修改一下即可使用。

拷贝一份示例代码

```
/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Blink
*/

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
```

修改一下示例代码

```
int ledPin = 2;

void setup() {
    pinMode( ledPin, OUTPUT );
}

void loop() {
    digitalWrite( ledPin, HIGH );
    delay( 2000 );
    digitalWrite( ledPin, LOW );
    delay( 1000 );
}
```

## 在线 DEMO

<iframe src="//player.bilibili.com/player.html?aid=67084512&cid=116326091&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 末了

通过本次实验我们熟悉了 Arduino 板的构造，了解了如何使用面包板，对于电学知识点进行了一个简单的回顾。
