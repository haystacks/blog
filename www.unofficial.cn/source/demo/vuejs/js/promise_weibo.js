
function weiboJs(param) {
    return new Promise(function(resolve, reject) {
        var _this = this;
        WB2.anyWhere(function(W){
            //数据交互
            W.parseCMD(param.url, function(oResult, bStatus) {
                if(bStatus) {
                    resolve(oResult);
                } else {
                    reject(oResult);
                }
            }, param.req[0], param.req[1]);
        })
    })
}


// 获取用户发布的微博
/** 
 * count:5 一次最多只能5条，接口限制
 */

function userTimelineIds() { // 获取用户发布的微博
    return weiboJs({
        url: '/statuses/user_timeline/ids.json',
        req: [
            {"count": 5},
            {method: 'get', cache_time: 0}
        ]
    })
}

// 根据微博ID删除指定微博

function statusDestroy(e) {
    return weiboJs({
        url: '/statuses/destroy.json',
        req: [
            {"id" : e.id},
            {method: 'POST', cache_time: 0}
        ]
    })
}

// 批量删除微博

function statusDestroyBatch() {
    var total = 1; // 初始化假装至少有一条微博
    userTimelineIds().then(function(e) {
        total = e.total_number; // 更新实际微博数量
        for(var i in e.statuses) {
            statusDestroy({
                id: e.statuses[i]
            }).catch(function(e) {
                console.log(e.error);
            })
        }
        total >= 200 && setTimeout(function() {
            statusDestroyBatch();    
        }, 3000);
    })
}

// 获取用户关注列表
function friendshipFriends() {
    return weiboJs({
        url: '/friendships/friends.json',
        req: [
            {"count": 200},
            {method: 'get', cache_time: 0}
        ]
    })
}

// 取消关注用户

function friendshipDestroy(e) {
    return weiboJs({
        url: '/friendships/destroy.json',
        req: [
            {"id" : e.id},
            {method: 'POST', cache_time: 0}
        ]
    })
}

// 批量取消关注用户

function friendshipDestroyBatch() {
    var total = 1; // 初始化假装至少有一条微博
    friendshipFriends().then(function(e) {
        total = e.total_number; // 更新实际微博数量
        for(var i in e.users) {
            friendshipDestroy({
                id: e.users[i].id
            }).catch(function(e) {
                console.log(e.error);
            })
        }
        total >= 50 && setTimeout(function() {
            friendshipDestroyBatch();    
        }, 3000);
    })
}