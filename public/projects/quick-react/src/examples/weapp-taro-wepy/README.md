## 多框架并用

项目开发过程中，融合技术方案或者迁移技术方案参考示例。

### Taro to Wepy

`taro2wepy` 迁移部分 [Taro](https://github.com/NervJS/taro) 页面到 [Wepy](https://github.com/Tencent/wepy/tree/1.7.x) 。

- wepy init standard taro2wepy
- cd taro2wepy
- taro init taroproject

### Wepy to Taro

`wepy2taro` 迁移部分 [Wepy](https://github.com/Tencent/wepy/tree/1.7.x) 页面到 [Taro](https://github.com/NervJS/taro) 。

- taro init wepy2taro
- cd wepy2taro
- wepy init standard wepyproject
- wepy.config.js 配置 target
