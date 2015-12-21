title: PHP数据类型
---
php支持8种数据类型
##### 4种标量数据类型
* Boolean 布尔型
	这是最简单的一种数据类型，即是true 或者 false，使用过程中不区分大小写
		
		<?php 
			$foo = true;
			//good
			if($foo) {
				echo 'true';
			}
			//bad
			if($foo == true) {
				echo 'true';
			}
		?>

	强制讲一个值转换为布尔值，可以用 (bool) 或者 (boolean)来强制转换。但是很多情况下不需要用强制转换，因为当运算符，函数或者流程控制结构需要一个boolean 参数时，该值会被自动转换。例如：

		<?php 
			$foo = 1936;
			if($foo) {
				echo 'true';
			}
			/**
			 * 这中间相当于忽略了转换这一步
			 * $fooBool = (bool) $foo;
			 */
		?>
	被认为是false的值，所有其它值都被认为是 true（包括任何资源）：
	1. 布尔值 false 本身
	2. 整型值 0（零）
	3. 浮点型值 0.0（零）
	4. 空字符串，以及字符串 "0"
	5. 不包括任何元素的数组
	6. 不包括任何成员变量的对象（仅 PHP 4.0 适用）
	7. 特殊类型 NULL（包括尚未赋值的变量）
	8. 从空标记生成的 SimpleXML 对象

			<?php
				var_dump((bool) false);   //bool(false)
				var_dump((bool) 0);       //bool(false)
				var_dump((bool) 0.0);     //bool(false)
				var_dump((bool) '0');     //bool(false)
				var_dump((bool) array()); //bool(false)
				var_dump((bool) -1);      //bool(true)
			?>

* Integer 整型

		<?php
			$a = 1234; // 十进制数
			$a = -123; // 负数
			$a = 0123; // 八进制数 (等于十进制 83)
			$a = 0x1A; // 十六进制数 (等于十进制 26)
		?>

* Float 浮点型
* String 字符串

##### 2种复合类型
* Array 数组
		
		<?php 
			$arr = array('a'=>1, 'b'=>2);
			echo $arr['a'];  //1
			//php5.4+ 可以使用[]代替array()，这种被称为关联数组
			$arr = ['a'=>1, 'b'=>2];
			echo $arr['a'];  //1
			//key可以是integer，默认从0开始自增，这种被称为索引数组
			$arr = ['a',1,9,36];
			echo $arr[0];    //a
		?>

* Object 对象

		<?php
			$str = "把我强制转换一下试试。";
			$obj = (object) $str;
			var_dump($obj -> scalar);

			//后文会学习到类与对象 
			class Foo {
				function doIt() {
					echo 'just do it!';
				}
			}
			$foo = new Foo;
			$foo -> doIt();
		?>

##### 2种其它类型
* resource（资源）
* NULL（无类型）
在下列情况下一个变量被认为是 NULL：
	1. 被赋值为 NULL。
	2. 尚未被赋值。
	3. 被 unset()。