### 初始化项目
- 新建一个本地项目 `demo`
    ```
    mkdir demo
    ```

- 进入项目并初始化
    ```
    cd demo && npm init -y
    ```

- 安装依赖 `blade-scripts`
    ```
    npm install --save-dev blade-scripts
    ```

- 最小目录结构
    ```
    node_modules
        - blade-scripts
    pages
        - helloworld.vue
    static
        less
            - base.less
    package.json
    web.config.js
    ```

- 最小配置文件
    ```
    module.exports = {
        "routes": { },
        "resources": ["static/less/base.less"],
        "env": { }
    }
    ```

    - routes  
      > 比如说需要使用详情页，需要 `demo/:id`。现实中的路由是自动生成，只能指向 `demo` 的子路由 `demo/detail`。这时需要手动指定就可以使用了
    ```
    "routes": {
        "demo-detail": ":id"
    }
    ```

    - resolurces  
      > 全局样式资源需要加载一份
    ```
    "resources": "static/less/base.less"
    or
    "resources": ["static/less/base.less"]
    ```

    - env  
      > 全局环境变量，按照环境注入不同的变量  
      > webpack.DefinePlugin  

    ```
    // webpack.config.js
    "env": {
        "default": {
            "__DEV__": "development"
        }
    }

    // helloworld.vue
    console.log(__DEV__); // development
    ```

### 数据请求
`blade-scripts` 下 app 中的 api.js 本身封装了 `axios` 暴露了一些方法属性：  
- instance
 > axios.create() 初始化实例

- setup
 > function  
 > 初始化 axios 配置 拦截处理

- createApi
 > function
 > 创建单独的请求对象，自定义 `instance.default`  

- makeGet / makePost / makePut / makeDelete => get / post / put / delete
 > function 

- makeResource
 > function 

- decorateMaker
 > function

实际使用的时候需要在项目目录下创建 plugins 存放插件目录，`blade-scripts` 中 app 下的 `plugin.js` 通过获取配置文件中的 `plugins.global` 来遍历注册全局插件，所以需要在 `web.config.js` 中添加新的配置项

```
web.config.js
"plugins": {
    "global": "~/plugins/all"
}
```

### 路由守卫
`blade-script` 中 app 下的 router.js 中有添加如下判断  
```
<% if(opts.plugins.route) { %>import beforeEachRoute from '<%= opts.plugins.route %>';<% } %>
```
在 web.config.js 中引入 插件目录的 route.js 会自动注册路由守卫  
```
"plugins": {
    "route": "~/plugins/route"
}
```
