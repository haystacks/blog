const buildSingleComponent = require('@tarojs/cli/dist/mini/component')
    .buildSingleComponent;

buildSingleComponent({
    name: 'hello',
    path:
    '/Users/unofficial/www/learn/blog.unofficial.cn/quick-react/src/examples/weapp-taro-wepy/taro2wepy/node_modules/echarts12/dist/index.js',
    type: 'pattern'
});

console.log(buildSingleComponent);
