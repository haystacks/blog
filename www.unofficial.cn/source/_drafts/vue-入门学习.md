---
title: vue 入门学习
date: 2016-10-25
categories: 
- 学习
tags:
- vue
---

看完 @尤雨溪  [Vue 2.0 的建议学习顺序](https://zhuanlan.zhihu.com/p/23134551)，决定好好学习一下vue。  
<!-- more -->
### HTML/CSS/Javascript 基础知识
扎实的基础知识。  

### vue example

`Vue` 是封装好的一个类，实例化操作传入的数据对象。  

* 声明式渲染
    * 数据绑定
    * 属性绑定（v-bind）
    ```
        <!-- hello world -->
        <div id="hello" v-bind:title="message">
            {{ message }}
        </div>

        <script>
            var vm = new Vue({
                el: '#hello',
                data: {
                    message: 'hello world'
                }
            })
            // 数据与DOM的绑定，定时 5s 更新 message
            setTimeout(function() {
                vm.message = '阿弥陀佛';
            }, 5000)
        </script>
    ```
> v-bind 属性被称为指令，指令都带有前缀v-。

* 条件与循环
    * 条件（v-if）
    ```
        <div v-if="isShow" id="hello" v-bind:title="message">
            {{ message }}
        </div>

        <script>
            var vm = new Vue({
                el: '#hello',
                data: {
                    isShow: false,
                    message: 'hello world'
                }
            })
            // 数据与DOM的绑定，定时 5s 更新 message
            setTimeout(function() {
                vm.message = '阿弥陀佛';
                vm.isShow = true;
            }, 5000)
        </script>
    ```
    * 循环（v-for）

    ```
        <ol id="fordemo">
            <li v-for="message in messages"> {{ message.title }} </li>
        </ol>

        <script>
            var vm = new Vue({
                el: '#fordemo',
                data: {
                    messages: [{
                        title: '标题一'
                    }, {
                        title: '标题二'
                    }, {
                        title: '标题三'
                    }, {
                        title: '标题四'
                    }]
                }
            })

            // 追加内容
            setTimeout(function() {
                vm.messages.push({title: '新增数据'});
            }, 3000)
        </script>
    ```

    > 对于这里的 `for` 的用法我是感到疑惑的。 

    ```JavaScript
        // for in
        for(var message in messages) {
            if(messages.hasOwnProperty(message)) {
                console.log(message); // 这个应该是index
            }
        }

        // for of
        for(var message of messages) {
            console.log(message); // Object
        }
    ```

* 处理用户输入
    * `v-on` 绑定一个监听事件，调用实例中定义的方法。  
    ```JavaScript
        // 点击删除刚刚添加的数据
        <button v-on:click="rmLastData">移除最后一个数据</button>
        <button v-on:click="addData">追加一个数据</button>

        <script>
            var vm = new Vue({
                el: '#fordemo',
                data: {
                    messages: [{
                        title: '标题一'
                    }, {
                        title: '标题二'
                    }, {
                        title: '标题三'
                    }, {
                        title: '标题四'
                    }]
                },
                methods: {
                    rmLastData: function() {
                        this.messages.pop();
                    },
                    addData: function() {
                        this.messages.push({title: '新增的数据'});
                    }
                }
            });
        </script>
    ```

    * `v-model` 处理用户输入数据
    ```
    <div id="modeldemo">
        <p>{{ message }}</p>
        <input type="text" v-bind:value="message" v-model="message" >
    </div>

    <script>
        var vm = new Vue({
            el: '#modeldemo',
            data: {
                message: '请输入一些内容'
            }
        });
    </script>
    ```
* 用组件构建应用
    ```
    <div id="component">
        <header-item v-bind:name="name"></header-item>
    </div>

    <script>
        // 注册组件
        Vue.component('header-item', {
            data: function() {
                return {
                    message: '头部'
                }
            },
            props: ['name'],
            template: '<header> {{ message }} {{ name }} </header>'
        })
        Vue.component('footer-item', {
            template: '<footer>脚部</footer>'
        })
        var vm = new Vue({
            el: '#component',
            data: {
                name: '名字'
            }
        });
    </script>
    ```

    * 局部注册
    ```
    new Vue({
        el: '#component',
        data: {
            name: '名字'
        },
        components: {
            'header-item': {
                data: function() {
                    return {
                        message: '头部'
                    }
                },
                props: ['name'],
                template: '<header> {{ message }} {{ name }} </header>'
            }
        }
    })
    ```

    * 模板解析说明
    因为Vue是在浏览器解析完HTML后才检索模板标签解析。参考文档试了一下 ` table `。  
    ```
        <div id="component">
            <header-item v-bind:name="name"></header-item>
            <table>
                <tr-item></tr-item>
            </table>
        </div>
        <script>
            new Vue({
                el: '#component',
                data: {
                    name: '名字'
                },
                components: {
                    'header-item': {
                        data: function() {
                            return {
                                message: '头部'
                            }
                        },
                        props: ['name'],
                        template: '<header> {{ message }} {{ name }} </header>'
                    },
                    'tr-item': {
                        template: '<tr><td> TD </td></tr>'
                    }
                }
            })
        </script>

        /**
         * 解析出来的结果就变成了
         * <div id="component"><header> 头部 名字 </header> <tr><td> TD  </td></tr><table></table></div>
         * 
         * 如果需要解析正确，html修改成这样
         * <table>
         *   <tr is="tr-item"></tr>
         * </table>
         */

    ```

    * data必须为function
    ```
        <div id="component">
            <header-item></header-item>
            <header-item></header-item>
            <header-item></header-item>
        </div>
        <script>
            new Vue({
                el: '#component',
                components: {
                    'header-item': {
                        data: function() {
                            return {
                                counter: 0
                            }
                        },
                        methods: {
                            add: function() {
                                this.counter++;
                            }
                        },
                        template: '<button v-on:click="add">{{counter}}</button>'
                    }
                }
            })
        </script>
    ```

    ![data function](/assets/imgs/20161026/counter_1.gif)  
    > 这里的data为function应该是涉及到一个闭包的问题，如果返回的是一个全局变量，那么结果就不一样了。  

    ```
        <div id="component">
            <header-item></header-item>
            <header-item></header-item>
            <header-item></header-item>
        </div>
        <script>
            var counterInit = 0;
            new Vue({
                el: '#component',
                components: {
                    'header-item': {
                        data: function() {
                            return counterInit;
                        },
                        methods: {
                            add: function() {
                                this.counter++;
                            }
                        },
                        template: '<button v-on:click="add">{{counter}}</button>'
                    }
                }
            })
        </script>
    ```

    ![data function](/assets/imgs/20161026/counter_2.gif)  

    * 构成组件
    父子组件之间的关系是，父组件通过props给子组件传递参数，子组件通过events给父组件发送消息。

### props
* 使用props传递数据
组件实例之间的作用域是孤立的，子组件中需要使用父组件中数据的时候，需要通过在自定义属性来传递参数，子组件中通过props来接受自定义属性名传递的数据。props可以是数组也可以是对象。  
```
    // 局部代码 []
    props: ['msg']

    // 局部代码 {} 检测类型 + 默认值 + 必须 + 验证
    props: {
        msg: {
            type: String,
            default: 'message',
            required: true,
            validator: function (value) {
                return value;
            }
            
        }
    }

```
* 驼峰命名与中杠命名法
HTML 特性不区分大小写。在非字符串模板中使用驼峰命名，模板中使用 `-` 命名。
```
<div id="component">
    <my-msg></my-msg>
</div>
<script>
new Vue({
    el: '#component',
    components: {
        'myMsg': {
            data: function() {
                return {
					msg: 'message'
				}
            },
			template: '<div>{{ msg }}</div>'
        }
    }
})
</script>
```

* 动态props
绑定动态输入或者动态数据到html属性上。  
```
<div id="propsDemo">
    <input v-model="myMsg" />
    <the-msg :my-msg="myMsg" :init-my-msg="initMyMsg"></the-msg>
</div>
<script>
    new Vue({
        el: '#propsDemo',
        data: {
            myMsg: null,
            initMyMsg: '初始化信息'
        },
        components: {
            'theMsg': {
                props: {
                    myMsg: String,
                    initMyMsg: String
                },
                template: '<div>{{initMyMsg}}{{myMsg}}</div>'
            }
        }
    })
</script>
```

* 字面量 vs 动态绑定
```
    <div id="propsDemo1">
        <msg msg-info="'1'"></msg>
    </div>

    <script>
        new Vue({
            el: '#propsDemo1',
            components: {
                'msg': {
                    props: ['msgInfo'],
                    template: '<div>{{ msgInfo }}</div>'
                }
            }
        })
    </script>
```

解析后的HTML是  

```
<div id="propsDemo1">
    <div>'1'</div>
</div>
```
如果动态绑定后呢？ 把 ` msg-info=" '1' " ` 修改为 ` :msg-info=" '1' " `  

解析后的HTML是  

```
<div id="propsDemo1">
    <div>1</div>
</div>
```

* 单向数据绑定
父组件数据变动后会影响子组件数据的变动，相反，如果子组件变动后也会影响父组件的变动，但是在vue中提示报错。父组件传递的参数是何子组件接收的参数是指向同一个内存地址。传递一个对象过去更改对象的属性值。  
```
<div id="propsDemo2">
	<p v-for="msg in msgs">{{msg.text}}</p>
    <div2 v-for="msg in msgs" :msg="msg"></div2>
</div>

<script>
    new Vue({
        el: '#propsDemo2',
        data: {
            msgs: [{
                text: 'text1'
            }, {
                text: 'text2'
            }]
        },
        components: {
            'div2': {
                props: ['msg'],
                template: '<div @click="changeVal(msg)"> {{msg.text}} </div>',
				methods: {
					changeVal: function(msg) {
						msg.text = '新内容';
					}
				}
            }
        }
    })
</script>
```

* prop数据验证
props可以为对象，内容的prop数据作为对象使用的时候，可以通过设置属性约定prop的 `type`， ` default `， ` required `，` validator `。  
```
<div id="propsDemo3">
    <div2 msg="message"></div2>
</div>

<script>
    new Vue({
        el: '#propsDemo3',
        components: {
            'div2': {
                props: {
                    'msg': {
                        type: String,
                        default: 'abc'
                    }
                },
                template: {
                    '<div>{{msg}}</div>'
                }
            }
        }
    })
</script>
```
### 自定义事件
* 自定义事件
父组件通过props给子组件传递参数，子组件通过event把参数回传给父组件。  
```
<div id="propsDemo3">
	<div>{{counter}}</div>
    <div2 @total="total"></div2>
	<div2 @total="total"></div2>
	<div2 @click.native="doTheThing"></div2>
</div>

<script>
    new Vue({
        el: '#propsDemo3',
		data: {
			counter: 0
		},
		methods: {
			total: function() {
				this.counter++;
			},
            doTheThing: function() {
                this.counter--;
            }
		},
        components: {
            'div2': {
				data: function() {
					return {
						counter: 0
					}
				},
				methods: {
					some: function() {
						this.counter++;
						this.$emit('total');
					}
				},
                template: '<div @click="some">{{counter}}</div>'
            }
        }
    })
</script>
```
在子组件上注册一个原生事情` .native `，子组件内部执行点击事件后会触发` doTheThing `。  

* 使用自定义事件的表单输入事件
对于v-model的理解  
```
    <p>{{message}}</p>
    <input type="text" v-model="message">
    // 这个只是语法糖写法 原版写法应该是
    <input type="text" :input="value = $event.target.value" :value="value">
    // 缩写成
    <input type="text" :input="value = arguments[0]" :value="value">
```

完善一个例子：  
```
    <div id="propsDemo4">
        <p>{{ message }}</p>
        <my-input label="Message" v-model="message"></my-input>
    </div>

    <script>
        new Vue({
            el: '#propsDemo4',
            data: {
                message: 'hello'
            },
            components: {
                'myInput': {
                    props: ['value', 'label'],
                    template: '\
                        <label :for="label">{{label}}</label>\
                        <input :id="label" type="text" :input="onInput">\
                    ',
                    methods: {
                        'onInput': function(event) {
                            this.$emit('input', event.target.value);
                        }
                    }
                }
            }
        })
    </script>
```
`Component template should contain exactly one root element:` 组件模板需要用一个根元素包裹起来。  
<script async src="//jsfiddle.net/unofficial/7f2vcmfv/embed/js,html,result/"></script>
* 非父子组件通信
具体实际应用场景还没用到，仅仅学习一下方法。  
```

var say = new Vue();
say.$emit('welcome');
say.$on('webcome', function() {
    console.log('webcome you');
})

```
### 使用slots分发内容
* 单个slot
其实一开始看到slots是完全懵逼的状态的。 但看到实际的demo后这个好像是见过的。  
```
// video
<video src="movie.ogg" controls="controls">
您的浏览器不支持 video 标签。
</video>

// vue
<div id="app">
    <welcome>
        <p>父组件中的“欢迎方式”</p>
    </welcome>
</div>
<script>
    Vue.component('welcome', {
        data: function() {
            return {
                isShow: false,
                you: 'unofficial'
            }
        },
        template: '<div><div v-if="isShow">{{ you }}</div><slot>欢迎欢迎热烈欢迎</slot></div>'
    })

    new Vue({
        el: '#app'
    })
</script>
```
如果父组件作用域welcome内无内容，子组件无输出内容，那么显示的就是子组件内部的slot内容；如果welcome内有内容，那么输出的就是welcome内的内容；如果子组件有输出内容，那么输出的就是子组件中的内容+slot内容。  

* 具名slot
父组件内标签上添加slot属性，属性值对应子组件中slot标签的name属性值，标签中的内容作为子组件slot的替换内容。  
```
// vue
<div id="app">
    <welcome>
        <p slot="header">header</p>
        <p slot="welc">默认欢迎语</p>
        <p slot="footer">footer</p>
    </welcome>
</div>
<script>
    Vue.component('welcome', {
        data: function() {
            return {
                isShow: false,
                you: 'unofficial'
            }
        },
        template: '<div><div v-if="isShow">{{ you }}</div><slot name="footer">footer</slot><slot name="header">header</slot><slot name="welc">welc</slot></div>'
    })

    new Vue({
        el: '#app'
    })
</script>
```

### 动态组件
多个组件绑定到同一个挂载点上，然后动态的在他们之间切换，使用保留的 `<component>` 标签，绑定到动态的 `is` 上。  
```
<div id="app">
    <component :is="currentView"></component>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            currentView: 'home'
        },
        components: {
            home: {
                template: '<div>home</div>'
            },
            list: {
                template: '<div>list</div>'
            }
        }
    })

    // 或者这么写

    new Vue({
        el: '#app',
        data: {
            currentView: {
                template: '<div>home</div>'
            }
        }
    })
</script>
```
* keep-alive 
把切换出去的动态组件保存在内存中，防止再次被渲染，保存他的状态。  
```
// eg
<keep-alive>
    <component :is="currentView"></component>
</keep-alive>
// 如果currentView = home, 就不能再更改currentView的值了
```