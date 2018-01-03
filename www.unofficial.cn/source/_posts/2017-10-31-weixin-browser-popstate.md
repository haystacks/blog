---
title: 微信浏览器返回按钮的事件监听（IOS / Android）
date: 2017-10-31 19:38:17
tags:
- 微信
---
产品需求，用户在公众号聊天窗口点击小卡片进入步骤二，iPhone用户点击右上角返回按钮，页面进入步骤一。  
页面是单页形式，通过 vue 的 transition 切换组件的形式来做的。也可以通过 url 的参数形式控制（&step=1 或者 &step=2）。  
<!-- more -->
### 实测结论

#### 窗口内打开链接
在没有交互前，iPhone 下的返回按钮应该是调用的原生的，popstate 不能监听到（这个描述可能不是那么准备）。页面内有一个弹窗，如果用户触发弹窗显示，然后关闭弹窗，历史记录就生效。
Android 下正常使用。  

#### 链接切换中
均可以

### 知识点学习
情景模拟，进入 index.html 的步骤二，点击返回按钮进入 index.html 的步骤一  

#### step=2
```
    if(history.state === null) {
        let state = {};
        state.url = 'index.html?step=1'
        history.pushState(state, null);
    }

    window.addEventListener('popstate', (e) => {
        location.href = e.target.history.state.url;
    })
```

#### step=1
```
    // 这种情况下，步骤一页面下点击一下返回按钮就和未添加state之前的步骤二点击返回操作一样，返回上一页面。  
    
```


### 学习资料
[History](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)
