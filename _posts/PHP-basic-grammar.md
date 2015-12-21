title: php基本语法
---
##### PHP标记
在我们新建文件的时候，文件的格式必须是**.php**，文件中可以直接输入html代码，例如创建文件***index.php***

		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>php.pushself.com代码示例</title>
		</head>
		<body>
			
		</body>
		</html>

如果需要嵌套一些php的代码需要怎么操作呢？毫无疑问php解析器解析文件的时候肯定是找对应的php起始与介绍标签（	<?php  ?> ），也可以通过修改配置文件**short_open_tag**来开启缩写（	<? ?>	）形式。本指令也会影响到缩写形式 <?=，它和 <? echo 等价。使用此缩写需要 short_open_tag 的值为 On。 从 PHP 5.4.0 起， <?= 总是可用的。还有一些其他风格这里就不做描述。

	<?php echo "php.pushself.com是一个从作者个人角度出发，自学php的网站。"; ?>
	<? echo "php.pushself.com是一个从作者个人角度出发，自学php的网站。"; ?>
	<?= "php.pushself.com是一个从作者个人角度出发，自学php的网站。"; ?>

虽然写法多样，但是我们还是推荐使用第一种，因为实际开发过程中我们首先需要按照团队的习惯，还要遵循对于配置文件的控制情况，理论上一般的云主机是不能控制配置文件的，我们尽量避免多余的问题。
综上我们就可以写出一个自己的小demo。
		
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>php.pushself.com代码示例</title>
		</head>
		<body>
			<?php echo "php.pushself.com是一个从作者个人角度出发，自学php的网站。"; ?>
		</body>
		</html>

有一个小的php习惯，虽然平时里我写代码还是习惯有始有终的标签闭合方式，但是在学习官方手册的时候，推荐在纯php代码的情况下不写闭合标签（?>），主要考虑的还是在标签外出现空格或者换行的情况，这种就会直接输出这些，界面就会出现空白条，通常在include的时候就可能会遇到这样的一个情况。同时还要特别提醒编码的时候切记使用记事本工具，它会自动在代码前添加一个BOM头，在界面上也会出现一些小问题。
##### 指令分隔符
语句结束的符号是（;）

		<?php 
			$str = 'php是世界上最好的语言';
		?>

##### 注释
* 单行注释

		<?php 
			#  这是一行注释 
			#  或者使用//
			// 这也是一行注释
		?>

* 多行注释

		<?php 
			/**	
			 * @author   unofficial
			 * @time     2015-7-10 15:40:15
			 */
		?>
		