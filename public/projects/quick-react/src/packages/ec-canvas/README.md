# ec-canvas

ECharts 小程序 Canvas 组件

> 具体参数查看详细文档 [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)，依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

## 使用方法

1. 安装 ec-canvas

```
npm i @unofficial/ec-canvas -S
# or
yarn @unofficial/ec-canvas
```

2. 在需要使用 ec-canvas 的页面 page.json 中添加 ec-canvas 自定义组件配置

```json
{
  "usingComponents": {
    "ec-canvas": "@unofficial/ec-canvas"
  }
}
```

4. WXML 文件中引用 ec-canvas

```wxml
<ec-canvas></ec-canvas>
```
