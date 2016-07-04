title: javascript 面向对象
---
![beauty.jpg](http://ww4.sinaimg.cn/large/e6cd2709gw1f5xvfrii2nj20u00m2mzp.jpg)

### 对象
JavaScript本身是一门面向对象的语言，JavaScript所有变量都可以当作对象使用（这里是说可以当对象使用，并不是说均是对象，应该理解为可以通过点操作符来调用一些属性方法），除了两个例外 null 和 undefined。  

#### 对象使用和属性
看到这个描述的时候，我果断尝试了一下 ``` number ```类型的数字字面值（``` literals ```），敲下回车的一瞬间笑了，这话写错了啊。查阅了JavaScript 秘密花园的内容才知道问题所在，原来是JavaScript解析器把点操作符解析为了浮点字面量。可以通过一些方法让数字字面值看起来像对象，终究而言还是不能被称为对象。	

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
JavaScript没有类继承模型，而是使用 ``` prototype ```原型模型。虽然在ES6中增加了 ``` class ```关键字，但只是语法糖，仍旧是基于原型。  
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
定义了函数F模拟类，其函数表达式相当于构造函数 constructor 。函数也是对象，通过给F对象的 ``` prototype ``` 属性赋值对象字面量来设定F的原型。通过关键字new来实例化函数F，返回实例化对象，``` x ``` 为f对象的属性， ``` add ``` 为f对象的方法。  

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
给F函数的 ``` prototype ```属性赋值了一个立即执行函数表达式，函数表达式返回需要暴露的方法的一个对象，这种方式可以实现方法public/private。

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

> 如果直接 ``` Bar.prototype = Foo.prototype; ``` 将会导致两个对象共享相同的原型。改变一个对象的原型将会影响到另外一个对象的原型。

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
``` for in ``` 循环遍历对象的属性时，原型链上的所有属性也都会被遍历。  
#### 扩展内置类型
虽然目前涉及到的应用环境不够复杂，对于复杂引用更多的类或者框架对于相应模块的封装的时候就需要用到原型来实现继承等等，但是不建议扩展内置类型的原型对象，这样会存在性能问题。  
#### isPrototypeOf vs hasOwnProperty
* isPrototypeOf() 方法测试一个对象是否存在于另一个对象的原型链上。
 ``` prototype.isPrototypeOf(object) ``` 检查prototype对象是否存在object的原型链上

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
 ``` object instanceof constructor ```
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

ES6中添加了关键字 ``` class ``` ，表面上是的写法和其他语言的类是一样的写法，实际上只是实现了prototype的语法糖。  
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
当我们使用``` console.log('%O', f) ```;时，返回的Foo对象和之前ES5通过function模拟的类实例的对象是一致的。  
![ES6](http://ww4.sinaimg.cn/mw690/e6cd2709gw1f5xvfs74fhj20b4091t9a.jpg)  

* ``` use strict ```   
必须在严格模式下执行

* ``` constructor ```  
例子中已经使用了 ``` constructor ```，实例化Foo类的时候自动执行构造方法。构造方法必须唯一  

* 原型方法  
关键字 ``` get ``` , ``` set ``` 的使用。  

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
静态方法指不需要对类进行实例化就可以使用类名直接访问类里面的方法，``` static ```关键字用来定义类的静态方法。  

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
``` dog ``` 类继承了 ``` Animal ``` 类，重写了父类的 ``` speak ``` 方法。

* ``` super ``` 调用父类方法  
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
* ``` isPrototypeOf ``` 的使用  
就上面的例子使用 ``` isPrototypeOf ```  
``` 
let dog = new Dog({name: '哮天犬', food: '耗子'}); 
console.log(Animal.prototype.isPrototypeOf(dog)); 
```

* ``` hasOwnProperty ``` 的使用
```
console.log(dog.hasOwnProperty('name')); // true
console.log(dog.hasOwnProperty('speak')); // false
```

### prototy.js是怎么做的？  
参考github上prototype.js的[class.js](https://github.com/sstephenson/prototype/blob/master/src/prototype/lang/class.js)学习到：  
```
var Class = (function() {
	
	// 子类
	function Subclass() {

	}

	function create() {
		// 处理传入的参数
		var parent, properties = [].slice.call(arguments);
		properties && toString.call(properties) == '[object Array]' && (parent = properties.shift());
		
		// 构造类
		function Klass() {
			// this为实例对象
			// 构造函数initialize
			// this为类函数对象
			// arguments 实例化时传入的参数
			this.initialize.apply(this, arguments);
		}

		// 对象继承添加方法
		Klass.addMethods = addMethods;
		// 父类
		Klass.superclass = parent;
		// 子类
		Klass.Subclass= [];

		if( parent ) {
			// 子类的原型指针指向父类的原型
			Subclass.prototype = parent.protorype;
			// 当前类的原型
			Klass.prototype = new Subclass();
			// 当前类添加到父类的子类
			parent.Subclass.push(Klass);
		}

		(properties[0] && properties[0].initialize) && (Klass.prototype.initialize = properties.initialize);

		// 如果没有自定义构造函数设置默认空函数
		!Klass.prototype.initialize && (Klass.prototype.initialize = function() {console.log(arguments)});

		// 设置当前构造类函数为构造函数
		Klass.prototype.constructor = Klass;

		return Klass;
	}

	function addMethods() {
		console.log('这是addMethods方法');
	}

	return {
		create: create,
		Methods: {
			addMethods: addMethods
		}
	}
})()
var Humen = Class.create();
var Gay = Class.create(Humen, {
	initialize: function(username) {
		console.log(username, 123);
		this.username = username;
	}
});
var gay = new Gay('unofficial');
console.log(gay.username);
```
### 参考资料
[JavaScript 秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)  
[强大的原型和原型链](http://www.cnblogs.com/TomXu/archive/2012/01/05/2305453.html)  
[JavaScript isPrototypeOf vs instanceof usage](http://stackoverflow.com/questions/18343545/javascript-isprototypeof-vs-instanceof-usage)  
[Classes in ECMAScript 6 (final semantics)](http://www.2ality.com/2015/02/es6-classes-final.html)  
[prototype.js](https://github.com/sstephenson/prototype/tree/master)