title: js面向对象学习
date: 2016-08-05
updated: 2016-08-12 16:17:26
category:
- 学习
tags: 
- js
- oop
- 面向对象
---
![beauty.jpg](//ww4.sinaimg.cn/large/e6cd2709gw1f5xvfrii2nj20u00m2mzp.jpg)

### 对象
JavaScript本身是一门面向对象的语言，JavaScript所有变量都可以当作对象使用（这里是说可以当对象使用，并不是说均是对象，应该理解为可以通过点操作符来调用一些属性方法），除了两个例外 null 和 undefined。  
<!-- more -->
#### 对象使用和属性
看到这个描述的时候，我果断尝试了一下 ** number **类型的数字字面值（** literals **），敲下回车的一瞬间笑了，这话写错了啊。查阅了JavaScript 秘密花园的内容才知道问题所在，原来是JavaScript解析器把点操作符解析为了浮点字面量。可以通过一些方法让数字字面值看起来像对象，终究而言还是不能被称为对象。	

```
1.toString(); // Uncaught SyntaxError: Invalid or unexpected token

// 数字字面量
1..toString(); // "1"
1 .toString(); // "1"
(1).toString(); // "1"
```

再尝试一些其他的类型作为对象的使用  
```
// Boolean
false.toString(); // "false"

// Array
[1, 2, 3].toString(); // 1, 2, 3

// String
"string".match('s'); // ["s"]

// Function
function D() {}
D.toString(); // "function D() {}"
```

#### 原型
JavaScript没有类继承模型，而是使用 ** prototype **原型模型。虽然在ES6中增加了 ** class **关键字，但只是语法糖，仍旧是基于原型。  
JavaScript对象有一个指向一个原型对象的链。当试图访问一个对象上的属性时，会先搜寻该对象的属性，再搜寻该对象的原型以及原型的原型，依次网上搜索，直到找到一个名字匹配的属性或者达到原型链的末尾。  
* 原型的使用方式一
```
	var F = function(x) {
		this.x = x || 1;
	}
	F.prototype = {
		add: function(y) {
			return this.x + y;
		}
	}

	var f = new F();
	f.add(2); // 3

	var f1 = new F(2);
	f1.add(4); // 6
```
定义了函数F模拟类，其函数表达式相当于构造函数 constructor 。函数也是对象，通过给F对象的 ** prototype ** 属性赋值对象字面量来设定F的原型。通过关键字new来实例化函数F，返回实例化对象，** x ** 为f对象的属性， ** add ** 为f对象的方法。  

* 原型的使用方式二
赋值原型的时候立即执行函数表达式  
```
var F = function() {};
F.prototype = function() {
	var add = function(x, y) {
		return x+y;
	};

	var test = function() {
		console.log('private');
	};

	return {
		add: add
	}
}()
var f = new F();
f.add(3, 3); // 6
f.test(); // f.test is not a function
```
给F函数的 ** prototype **属性赋值了一个立即执行函数表达式，函数表达式返回需要暴露的方法的一个对象，这种方式可以实现方法public/private。

#### 原型链
JavaScript使用原型链的继承方式，如下面的例子：  
```
function Foo() {
	this.name = 'unofficial';
}
Foo.prototype.who = function() {
	return this.name;
}

function Bar() {}
// 设置Bar的prototype属性值为Foo的实例化对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello world!';

// 修正Bar.prototype.constructor为Bar本身 ?
Bar.prototype.constructor = Bar;

var b = new Bar();

/*
 * 原型链为
   b [Bar的实例]
		bar.prototype [Foo的实例]
			{ foo: 'Hello world', name: 'unofficial' }
			Foo.prototype
				{method: ...}
				Object.prototype
					{toString: ...}
 */

```
实例b对象从Bar.prototype和Foo.prototype继承下来，因为b能访问自身原型属性foo，以及Foo原型方法who，也能访问Foo上的原型属性name。需要注意的是new Bar()不会重新创造出一个Foo实例，而是重复使用原型上的实例。

> 如果直接 ** Bar.prototype = Foo.prototype; ** 将会导致两个对象共享相同的原型。改变一个对象的原型将会影响到另外一个对象的原型。

#### 属性查找
在查找一个属性的时候，JavaScript会向上遍历原型链，直到找到给定名称位置或者到达原型链的顶部Object.prototype，如果仍然没找到即返回undefined。  

```
var Foo = function() {
	this.add = function(x, y) {
		return x + y;
	}
}
Foo.prototype.add = function(x, y) {
	return x + y;
}
Foo.prototype.test = function() {
	console.log('来源于prototype的test方法');
}
var f = new Foo();
console.log(f.add(1, 3)); // 4
f.test(); // 来源于prototype的test方法
```
调用f.add方法的后首先会在Foo中找add方法，找到了直接就调用add方法。test方法在实例中没有找到，就在原型链上找，能找到直接就执行，如果找不到会继续Object的原型上找，找不到才返回undefined  

#### 原型属性
当原型属性创建原型链的时候，任何类型都可以为它赋值，然而将原子类型的值赋值给它是被忽略。

```
// 用代码解释上面的话
function Foo() {}
// 可以赋值任何类型，比如说
Foo.prototype = 1; // 但是直接赋值类型值只是会被忽略，不会报错，相应的如果后面继续给原型赋值也会被忽略。原型直接是赋值为Object.prototype

console.log(new Foo()); // function Foo() {} 
```
如果直接赋值对象就会像上面的应用一样，创建原型链。通过这种方法可以创建私有方法与公共方法。  
##### 性能
由于上文提到的属性查找会从当前对象一直沿着原型链查找，如果找寻一个不存在的问题是需要遍历整个原型链。  
** for in ** 循环遍历对象的属性时，原型链上的所有属性也都会被遍历。  
#### 扩展内置类型
虽然目前涉及到的应用环境不够复杂，对于复杂引用更多的类或者框架对于相应模块的封装的时候就需要用到原型来实现继承等等，但是不建议扩展内置类型的原型对象，这样会存在性能问题。  
#### isPrototypeOf vs hasOwnProperty
* isPrototypeOf() 方法测试一个对象是否存在于另一个对象的原型链上。
 ** prototype.isPrototypeOf(object) ** 检查prototype对象是否存在object的原型链上

```
var Foo = function() {};
var Bar = function() {};
Bar.prototype = new Foo();
var b = new Bar();

Foo.prototype.isPrototypeOf(new Foo()); // true

// 在b的原型链上查找对象Foo.prototype
Foo.prototype.isPrototypeOf(b); // true
```
* isPrototypeOf vs instanceof
 instanceof运算符可以用来判断某个构造函数的prototype属性所指向的對象是否存在于另外一个要检测对象的原型链上。  
 ** object instanceof constructor **
 检查构造函数constructor的原型属性是不是存在object对象的原型链上

 Code one: 
```
	var Foo = function() {};
	var Bar = function() {};
	var f = new Foo();
	var b = new Bar();
	f instanceof Foo; // true
	Foo.prototype.isPrototypeOf(f); // true
	f instanceof Bar; // false
	Bar.prototype = new Foo();
	var b1 = new Bar();
	b1 instanceof Foo; // true
	Foo.prototype.isPrototypeOf(b1); // true
```

 Code two:
```
	var human = {mortal: true};
	var socrates = Object.create(human);
	human.isPrototypeOf(socrates); //=> true
	socrates instanceof human; //=> ERROR!
```

 > 综上所述：在存在构造函数的时候，instanceof 与 isPrototypeOf 是没有区别的，在没有构造函数的时候只能使用isPrototypeOf
* hasOwnProperty 
 hasOwnProperty用于判断一个对象上是否包含自定义属性，而不是原型链上的属性。hasOwnProperty继承自Object.prototype。

 > 注意不能通过判断值为undefined来判断属性是否存在，因为该属性的值可能就是undefined

```
	var Foo = function() { 
		this.name = 'unofficial';
	}

	Foo.prototype = function() {
		return {
			getName: function() {
				return this.name;
			},
			age: undefined
		};
	}()

	Foo.prototype.color;
	var f = new Foo();
	f.color; // undefined
	f.hasOwnProperty('color'); // false
	f.hasOwnProperty('age'); // false
	f.hasOwnProperty('name'); // true
```

> 可以在循环遍历的时候用来判断属性是不是是当前对象的属性，而不是继承自原型链

hasOwnProperty可以在当前对象中重写，如果如下例子：

```
	var Foo = function() {
		this.hasOwnProperty = function() {
			return false;
		}

		this.name = 'unofficial';
	}
	var f = new Foo();
	f.hasOwnProperty('name'); // false
	
	// 通过其他对象继承的Object.prototype的hasOwnProperty方法
	({}).hasOwnProperty.call(f, 'name'); //true
```

### ES6中方法如何实现类呢？

> 以下内容均是在chrome最新版本中测试

ES6中添加了关键字 ** class ** ，表面上是的写法和其他语言的类是一样的写法，实际上只是实现了prototype的语法糖。  
```
'use strict';
class Foo {
	constructor() {
		this.name = 'unofficial';
	}
	getName() {
		return this.name;
	}
}
let f = new Foo();
console.log(f.getName());
```
当我们使用** console.log('%O', f) **;时，返回的Foo对象和之前ES5通过function模拟的类实例的对象是一致的。  
![ES6](//ww4.sinaimg.cn/mw690/e6cd2709gw1f5xvfs74fhj20b4091t9a.jpg)  

* ** use strict **   
必须在严格模式下执行

* ** constructor **  
例子中已经使用了 ** constructor **，实例化Foo类的时候自动执行构造方法。构造方法必须唯一  

* 原型方法  
关键字 ** get ** , ** set ** 的使用。  

```
class Foo {
	set username(value) {
		this.name = value;
	}

	get username() {
		return 'my name is ' + this.name;
	}
}
let f = new Foo();
f.username = 'unofficial';
console.log(f.username);
```

* 静态方法  
静态方法指不需要对类进行实例化就可以使用类名直接访问类里面的方法，** static **关键字用来定义类的静态方法。  

```
class Foo {
	static info() {
		console.log('随意写的内容');
	}
}
Foo.info(); // 随意写的内容
```

* 继承

```
class Animal { 
	constructor(name) {
		this.name = name;
	}
  
	speak() {
		console.log(this.name + ' 发了个声');
	}
}

class Dog extends Animal {
	speak() {
		console.log(this.name + '说自己饿了');
	}
}
let cat = new Animal('kitty');
cat.speak(); // Kitty 发了个声
new Dog('哮天犬').speak(); // 哮天犬说自己饿了
```
** dog ** 类继承了 ** Animal ** 类，重写了父类的 ** speak ** 方法。

* ** super ** 调用父类方法  
```
'use strict';
class Animal { 
	constructor(obj) {
		var {name, food} = obj;
		this.name = name;
		this.food = food;
	}
  
	speak() {
		console.log(this.name + ' 发了个声');
	}

	eat() {
		console.log(this.name + '喜欢' + this.food);
	}
}

class Dog extends Animal {
	speak() {
		console.log(this.name + '说自己饿了');
	}

	eat() {
		super.eat();
		
		if(this.food == '耗子') {
			console.log('又闲的蛋疼了吧');
		}
	}
}
new Dog({name: '哮天犬', food: '耗子'}).eat(); // 哮天犬喜欢耗子 又闲的蛋疼了吧
```
* ** isPrototypeOf ** 的使用  
就上面的例子使用 ** isPrototypeOf **  
```
let dog = new Dog({name: '哮天犬', food: '耗子'}); 
console.log(Animal.prototype.isPrototypeOf(dog)); 
```

* ** hasOwnProperty ** 的使用
```
console.log(dog.hasOwnProperty('name')); // true
console.log(dog.hasOwnProperty('speak')); // false
```

### prototy.js是怎么做的？  
参考github上prototype.js的文档以及[class.js](https://github.com/sstephenson/prototype/blob/master/src/prototype/lang/class.js)可以学习到，如何创建一个类？  
```
	var Humen = Class.create();
	// or
	var Humen = Class.create({
		// 这里可以自定义类方法
	});
```
理解class.js时，Class是一个 立即执行的函数表达式 ，不成名的规定就是函数名大写作为类名。  
```
var Class = (function() {
	// 返回Class的方法
	return {
		create: create,
		Methods: {
			addMethods: addMethods
		}
	};
})();
```
> 这一个需要学习的点，闭包的立即执行的匿名函数中返回一个对象，对象中包含一个create的方法，以及Methods方法对象。  

* 创建类
```
function create() {
	// 可能会有两个参数
	// 第一个参数是父类，需要被继承的类 var gay = Class.create('Humen');
	// 第二个参数是当前类的方法
	
	/*
	 * 判断传入的参数
	 * 1. $A方法处理arguments类数组对象为数组，这里使用了[].slice.call(arguments)来代替数组浅复制
	 * 2. 判断第一个参数是不是类，如果是赋值给parent
	 */
	var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
    	parent = properties.shift();


	// 自定义Klass类，create函数最后返回的也是创建的Klass类

	/*
	 * Klass为 Class.create 创建的类
	 * initialize 为自定义构造方法
	 * this.initialize 中的this指当前对象
	 * apply(this, arguments) 参数this指实例化对象
	 * new 实例化对象的时候，Klass函数会自动执行，其中的this.initialize.apply(this, arguments);也就执行了，即属性初始化了
	 */
	function Klass() {
		this.initialize.apply(this, arguments);
	}

	// 当前类添加属性 superclass 存放父类；subclass 存放子类
	// 如果父类存在，父类的原型赋值给子类的原型，并初始化子类赋值给当前原型，添加当前类到父类的子类中
	// 将传入的当前类的方法添加到当前类的原型上

	/*
	 * 继承addMethods方法
	 * 设置父类 superclass
	 * 设置子类 subclass
	 */
	Object.extend(Klass, Class.Methods);
    Klass.superclass = parent;
    Klass.subclasses = [];

	/*
	 * 如果父类存在
	 * Subclass是一个类，父类的原型赋值给这个子类的原型
	 * 实例化子类赋值给当前类的原型
	 * 添加当前类到父类的子类数组中
	 */
	if (parent) {
		Subclass.prototype = parent.prototype;
		Klass.prototype = new Subclass;
		parent.subclasses.push(Klass);
    }

	/*
	 * 循环添加方法给当前类
	 */
	for (var i = 0, length = properties.length; i < length; i++)
    	Klass.addMethods(properties[i]);

	// 如果当前类方法中没有initialize方法，使用默认的空函数作为构造方法
	if (!Klass.prototype.initialize)
    	Klass.prototype.initialize = function() { };
	
	// 重置当前类的constructor函数为自身
	Klass.prototype.constructor = Klass;

	// 返回构造的类Klass
	return Klass;
}
```

* 自定义方法，添加传入的参数方法作为当前类的方法
```
function addMethods(source) {
	// 判断父类是不是存在
	// 获取参数的键名
	var ancestor   = this.superclass && this.superclass.prototype,
	properties = Object.keys(source);

	// 循环数组
	for (var i = 0, length = properties.length; i < length; i++) {
		var property = properties[i], value = source[property];
		// 这里主要是对于继承父类方法的调用的处理
		// 如果父类存在，并且是方法，方法的第一个参数必须是$super，如果是重写value
		if (ancestor && Object.isFunction(value) && value.argumentNames()[0] == "$super") {
			var method = value;
			// 处理当前方法
			// wrap()
			value = (function(m) {
				return function() { return ancestor[m].apply(this, arguments); };
			})(property).wrap(method);

			// 新增valueOf
			value.valueOf = (function(method) {
				return function() { return method.valueOf.call(method); };
			})(method);

			// 新增toString
			value.toString = (function(method) {
				return function() { return method.toString.call(method); };
			})(method);
		}
		// 直接赋值给当前类的原型
		this.prototype[property] = value;
    }
}
```

到这里基本上就学习完了prototype.js创建类的方法，但是如果需要融会贯通自己来实现一次，我想过程肯定还是会比较艰辛，继续加油。

### 面向对象是什么？
面向对象编程最美的调侃就是，“我还是单身，我是不是不适合面向对象编程”。也许是的，但是如果你能在脑海中抽象出类，需要的时候撸一发，对象迟早会有的。  
![OOP](//ww3.sinaimg.cn/mw690/e6cd2709gw1f67fndl7tfj207m054q2w.jpg)  
面向对象是一种编程的范式方法，面向对象中的对象是类的实例，类是属性，方法的集合，对于一类对象可能有公共的行为与样式，** 封装 ** 在一起就形成了类。如果具体到这个类的一个子类型（狗与阿拉斯加雪橇犬），阿拉斯加肯定是狗，，既有狗的特性，但是同时他又有自己的特点，于是乎 ** 继承 ** 了狗类的一些行为。这是如果在拿来一直猫，猫和狗又都属于动物类，这事又可以抽象出一个动物类，他们都会叫，狗是汪汪汪，猫是喵喵喵，这个是叫的多种表现形式，被称为 ** 多态 **。  

面向对象提高了程序的重用性，对于模块化开发以及重构等都带来很多好处。  

### 实践 -- 坦克大战游戏
坦克大战在玩小霸王卡版的时候经常约上邻居家的伙伴一起，其实最多的玩的还是雪人兄弟，这个是记忆比较深刻的。不扯远了，今天主要来实现一个简单的坦克大战游戏。  
截止目前，还是没能还好的实现坦克大战，保留这个版本，再继续学习学习。  


### 参考资料
[JavaScript 秘密花园](//bonsaiden.github.io/JavaScript-Garden/zh/)  
[强大的原型和原型链](//www.cnblogs.com/TomXu/archive/2012/01/05/2305453.html)  
[JavaScript isPrototypeOf vs instanceof usage](//stackoverflow.com/questions/18343545/javascript-isprototypeof-vs-instanceof-usage)  
[Classes in ECMAScript 6 (final semantics)](//www.2ality.com/2015/02/es6-classes-final.html)  
[prototype.js](https://github.com/sstephenson/prototype/tree/master)  
[面向对象程序设计](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)