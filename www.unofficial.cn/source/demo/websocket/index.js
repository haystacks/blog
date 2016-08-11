var uri = 'ws://ws.duoshuo.com:8201/';
var ws = new WebSocket(uri);
ws.onopen = function() {
    console.log('connected');
    ws.send('{"logged_user_id": "13252307"}');
    ws.send('{"visit_thread_id":"1221878475854447527"}')
}

// 发送消息
ws.onmessage = function(e) {
    console.log(e);
}

// 错误信息
ws.onerror = function(e) {
    console.log(e);
}

// 关闭信息
ws.onclose = function(e) {
    console.log(e);
}