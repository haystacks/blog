---
title: 如何用熟悉的语言玩转Arduino
date: 2019-09-09 23:00:00
tags:
    - Arduino

categories:
    - 爱好
---

今天上班有些忙，时间不是太多，借助空隙时间学习了一下如何用自己喜欢的语言来玩 Arduino。

<!-- more -->

## Firmata

Arduino 可以通过 Firmata（PC 与 MCU 通讯协议） Library 来实现与计算机应用程序的通信。
我么可以使用自己喜欢的语言来实现一段程序，然后将程序写入到 Arduino 中。我们首先需要将 Firmata 协议烧写到芯片中。

## 烧写协议

Arduino IDE > 文件 > 示例 > Firmata > StandardFirmata

按照上述路径找到标准协议，然后上传至 Arduino

![standard firmata protocol](https://i.loli.net/2019/09/09/NmleGYfpBbo2yIq.png)

## 端口查找

以下两种方式任选其一：

-   Arduino IDE > 工具 > 端口
-   命令行工具中输入 `ls /dev/tty.usb*` 按 `tab`

![方法1](https://i.loli.net/2019/09/09/gL5eARiS9NUfpF3.png)
![方法2](https://i.loli.net/2019/09/09/XmBtAGbjeVwdpLk.png)

按照上述路径找到端口，后续通过 Firmata 协议与 Arduino 连接的时候需要使用该端口值。这里我们得到我的设备的端口为 `/dev/tty.usbmodem14101`

## 编写程序

这里我使用的是 javascript 来编写昨天的 Blink

### firmata.js

[firmata.js](https://github.com/firmata/firmata.js)

```javascript
const Firmata = require('firmata');

const port = '/dev/tty.usbmodem14101';
const ledPin = 2;
const board = new Firmata(port);

board.on('ready', () => {
    console.log(`connet ${port}`);
    let status = 0;
    setInterval(() => {
        status = !status + 0;
        board.digitalWrite(ledPin, status);
    }, 1000);
});
```

### johnny-five

[johnny-five](https://github.com/rwaldron/johnny-five)

```javascript
const five = require('johnny-five');
const board = new five.Board();

const ledPin = 2;

board.on('ready', function() {
    // Create an Led on pin 13
    var led = new five.Led(ledPin);
    // Blink every half second
    led.blink(1000);
});
```

Johnny-Five is an Open Source, Firmata Protocol based, IoT and Robotics programming framework, developed at [Bocoup]().
后者封装的更为简易，兼容多种类型硬件，等待后续深入学习。

## 末了

结合开源软件框架来驱动开源硬件，用熟悉的语言来驱动硬件是一件很酷的事情。后续期望结合一些其它开源做一些好玩的东西。基于 Firmata 还有一些其它语言的封装，这里我只是以自己最近使用的 JavaScript 为例子来进行来一次复盘 Blink。
