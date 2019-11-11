// 暗红：dull-red；墨绿：blackish-green：墨绿；朱红：bright-red；灰色：gray；玫红：rose-red；蓝色：blue；青色：cyan；黄色：yellow；
const blackishGreen = require('./blackish-green.png');
const blue = require('./blue.png');
const brightRed = require('./bright-red.png');
const cyan = require('./cyan.png');
const dullRed = require('./dull-red.png');
const gray = require('./gray.png');
const roseRed = require('./rose-red.png');
const yellow = require('./yellow.png');

export default [
    { name: '暗红', key: '#AE3C3C', value: dullRed },
    { name: '朱红', key: '#EF3601', value: brightRed },
    { name: '玫红', key: '#D33D6D', value: roseRed },
    { name: '黄色', key: '#F5B015', value: yellow },
    { name: '墨绿', key: '#036448', value: blackishGreen },
    { name: '青色', key: '#2595C4', value: cyan },
    { name: '蓝色', key: '#285A9F', value: blue },
    { name: '灰色', key: '#504E4E', value: gray }
]