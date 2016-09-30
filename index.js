var koa = require('koa');
var app = koa();

app.use(function *() {
    var token = 'weizhuanfa';
    var qsArr = require('querystring').parse(require('url').parse(this.request.url).query).a;
    var qsStr = [token, qsArr['timestamp'], qsArr['nonce']].sort().join();

    // sha1
    var sha1 = require('crypto').createHash('sha1');
    sha1.update('qsStr');
    var sign = sha1.digest('base64');
    if(sign === qsArr['signature']) {
        this.body = qsArr['echostr'];
    }
    // this.body = '1234';
});

app.listen(process.env.PORT || 5000);