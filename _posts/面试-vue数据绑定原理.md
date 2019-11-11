vue 的双向绑定是由数据劫持结合发布订阅模式实现的。

-   数据劫持

    -   Object.defineProperty(obj, prop, descriptor)

-   发布订阅模式

    -   Observer
    -   Watcher
    -   Compile

-

## 数据绑定的常见实现形式

-   发布订阅模式

1. 识别哪个 UI 元素绑定了相应的属性
2. 监视属性和 UI 元素的变化
3. 将变化传播到绑定的对象和元素

-   脏值检查

1. DOM 事件
2. XHR 响应事件
3. 浏览器 Location 变更事件
4. Timer 事件
5. 执行 $diget 或 $apply

-   数据劫持

1. Object.defineProperty
2. Proxy
3. pub-sub

## 参考文章

- https://github.com/DMQ/mvvm
