document.addEventListener('mouseup', function() {
    var str = window.getSelection().toString();
    str && fanyi(str);
})

function fanyi(query) {
    var url = "http://fanyi.baidu.com/v2transapi?query="+ query +"&trantype=realtime&simple_means_flag=3";
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(res) {
        // 
        var options = {
            icon: 'http://blog.unofficial.cn/assets/imgs/avatar.jpg',
            body: res.trans_result.data[0].dst
        };
        // if (Notification.permission === "granted") {
        //     var notification = new Notification('翻译', options);
        //     setTimeout(function() {
        //         notification.close();
        //     }, 3000);
        // } else if (Notification.permission !== 'denied') {
        //     Notification.requestPermission(function (permission) {
        //         if (permission === "granted") {
        //             var notification = new Notification('翻译', options);
        //             setTimeout(function() {
        //                 notification.close();
        //             }, 3000);
        //         }
        //     });
        // }
        console.log(res.trans_result.data[0].dst);
    })
}