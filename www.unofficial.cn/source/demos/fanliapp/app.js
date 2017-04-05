//app.js
var common = require('./utils/config.js');
App({
    onLaunch() {
        wx.login({
            success(res) {
                wx.getUserInfo({
                    success(res) {
                        var userInfo = res.userInfo;
                        wx.request({
                            url: common.origin+'login.php',
                            data: {
                                msg: userInfo
                            },
                            header: {
                                "X-Requested-With": "XMLHttpRequest"
                            },
                            method: 'post'
                        })
                    }
                })
            }
        });
    },
    globalData: {
        detail: ''
    }
})
