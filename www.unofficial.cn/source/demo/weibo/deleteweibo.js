/**
 * 删除微博脚本
 * 
 * https://www.npmjs.com/package/log4js
 */
const request = require('request');
          // fileCookieStore = require('tough-cookie-filestore'),
          // log4js = require('log4js');

// 发起是否登录验证
var url = 'https://passport.weibo.cn/sso/login';
var form = {
	username: username,
	password: password
};
var options = {
	url: url,
	headers: {
		'Referer': 'https://passport.weibo.cn/signin/login',
	},
};

var req = request.post(options).form(form).on('response', function(response) {
	if (response.statusCode == 200) {
		var j = request.jar();
		var cookie = request.cookie(response.headers['set-cookie'][0]);
		var url = 'https://m.weibo.cn/home/me?format=cards';
		j.setCookie(cookie, url);

		var req = request({url: url, jar: j}).on('response', function(response) {
			response.on('data', function(data) {
				console.log(data.toString());
			})
		})

		console.log(req);
	}
})