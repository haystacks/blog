/**
 * 删除微博脚本
 * 
 * https://www.npmjs.com/package/log4js
 */
const fs = require('fs');
const BufferHelper =require('./bufferHelper');
const request = require('request');

					// fileCookieStore = require('tough-cookie-filestore'),
					// log4js = require('log4js');
var total = 0; // 统计
// 登录后拿到Cookie然后获取Containerid
function getContainerid() {
	var j = request.jar();
	var url = 'https://m.weibo.cn/home/me?format=cards';
	j.setCookie(cookie, url);

	request({url: url, jar: j}).on('response', function(response) {
		response.on('data', function(res) {
			const scheme = JSON.parse(res.toString())[0]['card_group'][1]['apps'][0]['scheme'];
			var param = scheme.split('?')[1];
			weiboList(param);
		})
	})
}

function weiboList(param) {
	var j = request.jar();
	var url = 'https://m.weibo.cn/container/getSecond?'+param;
	j.setCookie(cookie, url);

	request({url: url, jar: j}).on('response', function(response) {
		var bufferHelper = new BufferHelper();
		response.on("data", function (chunk) {
			bufferHelper.concat(chunk);
		});

		response.on('end', function () {
			var html = bufferHelper.toBuffer().toString();
			deleteWeibo(JSON.parse(html)['cards']);
		});
	})
}

function deleteWeibo(cards) {
	var i = 1;
	doDelete(cards, i);
}

function doDelete(cards, i) {
	var id = cards[i].mblog.id == '4058916809922421' ? cards[++i].mblog.id : cards[i].mblog.id;
	var j = request.jar();
	var url = 'http://weibo.com/aj/mblog/del?ajwvr=6';
	j.setCookie(cookie, 'http://weibo.com');
	var options = {
		url: url,
		jar: j,
		headers: {
			'Referer': 'http://weibo.com/3872204553/profile?rightmod=1&wvr=6&mod=personnumber&is_all=1',
		},
	};
	var req = request.post(options).form({mid: id}).on('response', function(response) {
		var bufferHelper = new BufferHelper();
		response.on("data", function (chunk) {
			bufferHelper.concat(chunk);
		});

		response.on('end', function () {
			var html = bufferHelper.toBuffer().toString();
			if(JSON.parse(html).code == 100000) {
				if(++i < cards.length) {
					doDelete(cards, i);
				} else {
					getContainerid();
				}
				console.log(total++);
			} else {
				console.log(html);
			}
		});
	})
}

// 发起是否登录验证
const cookiePath = './config/cookies';
const cookie = fs.readFileSync(cookiePath).toString();
if(!cookie) {
	var url = 'https://passport.weibo.cn/sso/login';
	var form = require('./config/userinfo');
	var options = {
		url: url,
		headers: {
			'Referer': 'https://passport.weibo.cn/signin/login',
		},
	};

	function login(response) {
		if (response.statusCode == 200) {
			fs.writeFileSync(cookiePath, request.cookie(response.headers['set-cookie'][0]));
			getContainerid();
		}
	}
	request.post(options).form(form).on('response', login);
} else {
	getContainerid();
}

