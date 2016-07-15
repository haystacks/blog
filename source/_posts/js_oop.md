title: javascript 面向对象
---
![beauty.jpg]()

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


### 参考资料
[JavaScript 秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)
[强大的原型和原型链](http://www.cnblogs.com/TomXu/archive/2012/01/05/2305453.html)