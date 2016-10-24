!function() {
    var config = WB2._config;
    var status = WB2.checkLogin();
    var loginEle = document.getElementById('connect');
    if(status === 'true') {
        loginEle.addEventListener('click', function() {
            WB2.logout();
        })
        loginEle.innerText = '退出';

        // 查询用户信息
        WB2.anyWhere(function(W){
            //数据交互
            W.parseCMD('/statuses/friends_timeline.json', function(oResult, bStatus) {
                console.log(oResult);
            }, {"uid" : config.uid}, {method: 'get', cache_time: 0});
        });
    } else {
        
        loginEle.addEventListener('click', function() {
            WB2.login();
        })
        loginEle.innerText = '退出';
    }
}()