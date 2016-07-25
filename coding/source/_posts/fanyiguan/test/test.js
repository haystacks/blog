'use strict';

let	fanyiguan = require('../lib/index');
fanyiguan('中国人').then((data) => {
	console.log(data);
});
// // 指定需要转换的文字
// fanyiguan.say('我是中国人', function(e) {
// 	console.log(e);
// });

// // 指定需要转换的文字，转换后的语言
// fanyiguan.say('我是中国人', 'en', function(e) {
// 	console.log(e);
// });

// // 指定需要转换的文字，转换前的语言，转换后的语言
// fanyiguan.say('我是中国人', 'zh', 'en', function(e) {
// 	console.log(e);
// });