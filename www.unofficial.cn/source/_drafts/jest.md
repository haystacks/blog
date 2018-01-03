---
title: jest
date:
categories:
tags:
---

<!-- more -->
### 安装jest
```
npm i jest --save-dev
```

### 例子
简单写了两个求和的例子:  
```
let sum = (a, b) => a + b;
sum(1, 2);

let sum = a => b => a + b;
sum(2)(3)
```

试着开始写单元测试:  
```
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('adds 2 + 3 to equal 5', () => {
    expect(sum(2)(3)).toBe(5)`
})
```


### 参考资料
http://facebook.github.io/jest/docs/en/getting-started.html
