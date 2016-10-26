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
    
