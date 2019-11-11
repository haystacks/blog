---
title: 浏览器相关
date: 2019-03-18 10:00:00
tags:
    - 非学前端
    - 浏览器

categories:
    - 学习
---
|特性|cookie|localStorage|sessionStorage|indexDB|
|---|---|---|---|---|
|数据生命周期|一般服务器生成，可以设置过期时间|被动删除，否则一直存在|页面关闭清理|被动删除，否则一直存在|
|数据存储大小|4K|10M|10M|无限|
|与服务器通信|header|无|无|无|

## localStorage and sessionStorage
```javascript
Storage.setItem('a', 123); // value.toString();
Storage.getItem('a'); // "123"
Storage.removeItem('a');
Storage.clear();
// window.addEventListener('storage', () => {}) // ?
```