---
title: vue-入门学习2
date: 2016-11-24  20:27:15
categories:
- 学习
tags:
- vuejs
---

文档学习走了一边了，对于基础理解还是不够，虽然在 `segmentfault` 上了能回答一些简单的问题，对于稍微深入或者讲解清楚时还是需要参考文档或者不知所措，特继续二阶段学习一下。
<!-- more -->

### 深入响应式原理
vue实例时传入一个js对象，遍历对象的时候，通过 `Object.defineProperty` 来把数据描述符转换为存储描述符（`get/set`）。这个是ES5的特性，也就是为什么vue不支持IE8的原因。  
![](http://ww2.sinaimg.cn/large/e6cd2709gw1fafzekvpwvj20bf02xaa2.jpg)  

响应的结构图大致又是如何的呢？结合着官方的图示，自己理解一下。  
```
    请输入您的姓名：<input type="text" name="name" oninput="setVal(this)" /> <br />
    你好：<span id="name"></span>
    <script>
        var userinfo = {name: 'unofficial', age: 18},
            nameSpanEle = document.getElementById('name'),
            nameInputEle = document.getElementsByTagName('input')[0];

        function def(key, value) {
            Object.defineProperty(userinfo, key, {
                get: function() {
                    return value;
                },
                set: function(val) {
                    if(key === 'name') {
                        initVal(val);
                        getVal(val);
                    }
                    value = val;
                }
            })
        }

        for(var key in userinfo) {
            def(key, userinfo[key]);
        }

        function initVal(val) {
            nameInputEle.value = val;
        }

        function setVal(e) {
            userinfo.name = e.value;
        }

        function getVal(val) {
            nameSpanEle.innerText = val;
        }
    </script>
```
如何实现追踪数据的变化，在value变化的时候更新页面的数据。跟着文档看了一下MDN上的 `Object.observe` ，但是都不支持这个，vuejs实现了一个Observe，没有细看源码（主要是看不懂），也就假装在set的时候如果key是name就更新一下数据，这里其实也是有问题的。应该就是官方的图示中的如果Observe到数据变化了，就通知watcher，页面的数据不是最新的啦，你现在去重新编译一下模板。 
如果只是单纯的通过输入来更新，直接通过input时获取值显示值就好。
```
    <script>
        var userinfo = {name: 'unofficial'},
            nameSpanEle = document.getElementById('name'),
            nameInputEle = document.getElementsByTagName('input')[0];

        function setVal(e) {
            userinfo.name = e.value;
            getVal(e.value);
        }

        function getVal(val) {
            nameSpanEle.innerText = val;
        }
    </script>
```
这里还有一点差别，对于vue是以数据变化后去重新编译一下模板，这个不需要去操作DOM，而上述例子，还是需要通过选择器选择需要数据变化的DOM，然后再赋值操作。

#### 变化的数据
实例化外部可以通过Vue.set(Object, key, value)或者是vm.$set(Object, key, value)来更新数据，内部可以使用this.$set(Object, key, value)。  
```
    <div id="app" v-cloak>
        <input type="text" v-model="profile.name">
        <p>{{profile.name}}</p>
        <p>{{profile.age}}</p>
    </div>
    <script src="//cdn.bootcss.com/vue/2.1.4/vue.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                profile: {
                    name: 'unofficial'
                }
                
            }
        })
        // Vue.set(vm.profile, 'age', 18);
        vm.$set(vm.profile, 'age', 15);
    </script>
```
上述例子中学习两点：
- 如果Object是profile，即 `vm.$data.profile`，因为Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.profile 等价于访问 vm.$data.profile。
- vm.$set 是全局 Vue.set 的别名