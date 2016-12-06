/**

登陆 百度bcs控制台中心 申请access key
https://console.bce.baidu.com/iam/#/iam/accesslist

**/
const ak = '28574201df3e49c791e996af87ac7a18';
const sk = 'df44180a40dd43978f2ace18626db8a0';
const ocr = require('baidu-ocr-api').create(ak,sk);
// 外部图片
ocr.scan({
    url:'./api.png', // 支持本地路径
    type:'text',
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log('err', err);
})