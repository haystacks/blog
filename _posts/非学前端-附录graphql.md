---
title: graphql学习与实战
date: 2019-02-18 09:00:00
tags:
    - 非学前端

categories:
    - 学习
---

记录一个从枯燥学习 GraphQL 的过程，到发现项目 Gitter，模仿项目 Github-Trending-API，最后做一个自己的学习项目 Github-Trending-GraphQL。  

一开始我是这样想的，最后我是这样做的，复盘整个学习过程。  
![](http://wx3.sinaimg.cn/large/e6cd2709gy1g0g7u2bi91j21p10u0dnl.jpg)  

## 准备学习

[graphql 是什么？](https://graphql.org/) 在之前的项目中我们主要使用 graphql 来做已有接口数据的合并，这个主要处理已有 rest 相关服务接口的情况下，我们做了一个中间数据处理层。  
最近在思考团队服务项目开发的时候，因为在开发中如果基于 rest 接口来开发的会，会定义很多路由。为了偷懒不去定义路由，于是决定在项目中使用 graphql （其实只是为了装B，我在项目中用了最新的XX技术），中间还有一些其他的思考。  

## 几个概念
Graphql 模型有三种类型的操作。  

### Query
查询数据（R）。  
```graphql
# standard
query {
    field
}

# shorthand
{
    fields
}
```

### Mutation
新增、更新或删除数据（CUD）。  
```graphql
mutation {
    do( arguments ) {
        fields
    }
}
```

### Objects
表示可以访问的资源。  
```
# Repository 包含项目的内容
    # Implements
    # Connections
    # Fields

```

### Implements

学不动了，省略....


## 受其它项目启发
在枯燥的文档学习过程中，中间看到一个博客是推荐自己的小程序 `gitter`，出于习惯抓了一下小程序的请求，发现了趋势排行是通过 [github-trending-api.now.sh](https://github-trending-api.now.sh) 获取的数据，接着就找到了这个 API 对应的项目 [github-trending-api](https://github.com/huchenme/github-trending-api)。  
在这之前我也看过几次 GitHub GraphQL API，只是趋于时间与其他因素（懒），一直没有使用落实到实际的项目中。发现官方没有提供 Trending API，github-trending-api 项目新增了 V3 中的Trending API，我是不是可以模仿该项目提供一个 GraphQL API。  
带着两个目的开始一个新项目：  
* 学习 GraphQL
* 做一个开源项目

## 初始化项目
最简单的实现方式就是提供一个 GraphQL server，然后直接请求 [github-trending-api.now.sh](https://github-trending-api.now.sh) 。这种用法对于项目已有微服务的团队，可以利用中间服务层来合并数据请求，以及嵌套数据查询等。  
GraphQL server 使用的是 [Apollo Server](https://www.apollographql.com/docs/apollo-server/)，用它来创建一个 Node 服务，定义好 Schema，增加 resolver 解析函数。  

### Type 如何定义
在一开始学习的基础只是派上用场，GitHub Trending 主要提供两个方面，一个是 Repository ，另外一个是 Developer。  

```graphql
type Repository {
    author: String
    contributors: [Contributor]
    currentPeriodStars: Int
    description: String
    forks: Int
    language: Lang
    name: String
    stars: Int
    url: String
}
```

`Repository` 中除了基本的 `scalar type` 还有两个是 contributor 和 language，一个数组数据，一个是对象，继续细分类型下去就得到了  

```graphql
type Contributor {
    avatar: String
    url: String
    username: String
}
type Lang {
    name: String
    color: String
}
```

`Developer` 分析数据后一样得到一个数据结构

```graphql
type Developer {
    avatar: String
    name: String
    repository: RepositoryMini
    username: String
    url: String
}
```

其中项目仓库是一个对象数据，细分下来可以得到一个

```graphql
type RepositoryMini {
    description: String
    name: String
    url: String
}
```

### Query 如何定义
定义好了基本数据类型 Repository 和 Developer 以后，需要对外提供一个统一的 `Query`，于是得到了一个新的根数据类型

```graphql
type Query {
    repositories: [Repository],
    developers: [Developer]
}
```
实际的查询趋势过程中我们还会增加参数，一个参数是 language，一个参数 since，其中 since 只能取 daily、 weekly、 monthly ，但实际也能取其它值，只是默认的还是 daily。修改后得到了下面的结果

```graphql
type Query {
    repositories(language: String, since: String): [Repository],
    developers(language: String, since: String): [Developer]
}
```

如果要验证 since 只能取三个值中的一直，需要新增一个枚举类型

```graphql
type Query {
    repositories(language: String, since: Since): [Repository],
    developers(language: String, since: Since): [Developer]
}

enum Since {
    daily
    weekly
    monthly
}
```

### 如何优化 Query
上述写法实际过程中可能还会有这样一个问题，如果要同时查询获得 Repository 和 Developer 的数据，需要按照筛选条件查询的适合，需要重复传递参数，再提升一下这两个类型实际是属于类型 Trending 的。新增一个类型  

```graphql
type Trending {
    repositories: [Repository]
    developers: [Developer]
}
```

根查询 `Query` 也可以修改一下了
```graphql
type Query {
    trending(language: String, since: String): Trending
}
```

### 客户端发起查询请求
按照最终我们定义好的数据结构，我们可以发起一个这样的 query  

```graphql
{
  Trending(language: "javascript", since: "daily") {
    repositories {
      name
      author
      description
      language {
        name
        color
      }
      forks
      stars
      contributors {
        avatar
        url
        username
      }
      currentPeriodStars
      url
    }
    developers {
      avatar
      name
      repository {
        url
        name
        description
      }
      username
      url
    }
  }
}
```

如果把 language 和 since 定义在 `variables` 中，写法就变成了下面这样  

```graphql
# 以下请求只获取了趋势仓库名称
# query
query getTrending($language: String, $since: String) {
  trending(language: $language, since: $since) {
    repositories {
      name
    }
  }
}

# variables
{
  "language": "javascript",
  "since": "daily"
}
```

`query` 和 `variables` 会作为 request payload 放置在 body 中，其中把自定义的操作方法 `operationName` 设置为 getTrending  

```javascript
fetch("https://trending.now.sh", {
    "credentials": "omit",
    "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "content-type": "application/json"
    },
    "referrer": "http://localhost:4000/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"operationName\":\"getTrending\",\"variables\":{\"language\":\"javascript\",\"since\":\"daily\"},\"query\":\"query getTrending($language: String, $since: String) {\\n  trending(language: $language, since: $since) {\\n    repositories {\\n      name\\n    }\\n  }\\n}\\n\"}",
    "method": "POST",
    "mode": "cors"
});
```

### 服务端解析请求
这里用的是 Apollo server，服务收到请求以后，会解析 body 参数。会按照嵌套依次调用 resolver 处理业务逻辑，首先会进入 trending ，接着同时执行 repository 和 developer。  

按照根查询定义好的数据结构，tending 解析器会收到两个参数，language 和 since。repository 和 developer 也要使用这两个参数如何处理呢？  

```js
// resolver
{
    Query: {
        trending(parent, args, context, info) {
            // args => { language: '', since: '' }
            // parent 参数是可以接收到上层解析器的结果，我们可以把 trending 中收到的数据传递给子解析器
            return { language, since }
        }
    },
    Trending: {
        repositories(parent, args, context, info) {
            // parent => { language: '', since: '' }
        },
        developer(parent, args, context, info) {
            // parent => { language: '', since: '' }
        },
    }
}
```

### 解析器中需要做什么？
解析器按照前文分析的数据，我们可以直接请求 github-trending-api.now.sh 数据接口拿到数据，这里我们本着学习为目的，GitHub Trending 是通过 SSR 输出的页面，数据只能自己分析网页，抓取html页面以后分析页面结构获得自己需要的数据。  

```javascript
export async function fetchRepository() {
    // 分析html
}

export async function fetchDeveloper() {
    // 分析html
}

export async function fetchLanguage() {
    // 分析html
}
```

具体的分析 html 过程不做分析，使用了 cheerio，用法类似 JQuery。这中间也会有一些需要注意的问题

* 请求过程很慢。  
    每次请求都会再次请求 Github Trending 的页面，然后还要分析页面，这个过程其实是比较费时的。我们如果把请求分析后的数据按照查询条件缓存起来，下一次请求直接就从缓存中拿数据，这样就快很多。（仓库和开发者趋势会隔段时间更新，我们缓存一小时；语言变化小，我们缓存了一天的时间）

* 语言包缓存。  
    请求仓库和开发者的适合，检测语言缓存是否存在，不存在先缓存一次，后续再次请求仓库和开发者或者直接请求语言包就会直接命中缓存

有了缓存就可能出现缓存失效的问题，我们新增一个刷新缓存的方法，可以按照指定键名来更新缓存，也可以不传递参数清理全部缓存。  

### 如何清理缓存？
GraphQL 根处理方法除了 `Query` ，还有一个 `Mutation`。对应到的数据库增删改查上面的话，`Query` 对应的是 `R`，`Mutation` 对应的是 `CUD`。我们要新增的 `refresh` 的操作是删除缓存，主要针对仓库和开发者缓存，清理以后我们只关心成功失败与否，所以这里我们可以返回一个布尔值  

```graphql
type Mutation {
    refresh(key: String, language: String, since: String): Boolean
}
```

解析器中也需要添加对应的处理方法  

```javascript
{
    Mutation: {
        refresh(parent, args, context, info) {
            // do something
        }
    }
}
```

### 回顾一下
从一开始的需求分析，我们需要开发一个 Github Trending GraphQL API。我们利用了之前学习的 GraphQL 的基础知识，也熟悉了 GraphQL 的工具 Apollo Server，很方便的开发出了对应的API，后续为了优化请求，我们新增了缓存策略，以及清除缓存策略。  

到这里我们的项目 `github-trending-graphql` 就可以提交到 GitHub 仓库中了，对于一个完美的开源项目还有很多事情要做，但是对于一个 GraphQL 的示例差不多已经可以使用了。  

一上来就直接看代码是枯燥的，于是我们还需要部署一个 Demo，这样带着使用来熟悉就更容易让人理解了。如何简单的部署 Demo 又成为了一个问题？

### 如何部署示例
[trending.now.sh](https://trending.now.sh) 的部署看域名应该就能猜到使用的是 `now` 的无服务部署方式。使用方式文档已经讲述的很清楚了。但这中间也还是需要注意一些细节

对于项目部署，我们需要首先在项目根目录建立一个 `now.json`  

```javascript
{
    "version": 2,
    "alias": ["trending.now.sh"],
    "builds": [{
        "src": "src/server.js", "use": "@now/node-server"
    }],
    "routes": [{
        "src": "/",
        "dest": "/src/server.js"
    }]
}
```

`alias` 这里配置上 now.sh 的别名是不会直接生效的，这里只是方便备忘。server.js 是一个需要执行的文件，于是我们将 `version` 设置为 2，接下来我们就可以在配置中添加 `builds` 了，对于普通 js 可指定文件使用 `@now/node` ，这里的 server.js 是开启一个 Node 服务，所以需要使用 `@now/node-server`。  

部署成功以后我们获得了一个 github-trending-graphql-[hash].now.sh 的项目访问地址，如果要访问到项目的实际功能，还需要点开两次两次获得项目功能地址 github-trending-graphql-[hash].now.sh/src/server.js ，如果要直接使用域名直接访问功能，我们这里就需要添加上述配置 `route`。  

每一次部署都会产生一个新的镜像，也会得到一个新的二级域名，如果我们要分享出去无论是自己部署还是用户使用体验都不是很好，我们可以为自己的项目设置一个别名，这里我们为当前项目设置的别名就是 [trending.now.sh](https://trending.now.sh) 。  

每次部署的时候我们需要做的工作就是 `now && now alias` ，now alias 需要指定当前部署获得的项目域名，以及需要设置的别名，$(now) 可以获得部署后获得的域名，于是上述命名就修改成 `now alias $(now)  trending.now.sh` 了，添加 package.json 中，每次部署只需要执行一下 `npm run now` 。  


## 成果展示
[github trending graphql api](https://github.com/cangku/github-trending-graphql)  
[online demo](https://trending.now.sh)

## 相关项目
[github trending rest api](https://github.com/huchenme/github-trending-api)

