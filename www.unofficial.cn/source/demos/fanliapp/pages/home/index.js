var common = require('../../utils/config.js');
Page({
    data: {
        isok: false,
        msg: ''
    },
    onLoad() {
        let self = this;
        if(wx.getClipboardData) {
            wx.getClipboardData({
                success: function(res){
                    res.data && self.openConfirm(res.data);
                }
            })
        }
    },
    setMsg(event) {
        if(/手机淘宝|^https?:\/\/((item|h5\.m)\.taobao|detail\.(m\.)?tmall)\.com/.test(event.detail.value)) {
            this.setData({
                isok: true,
                msg: event.detail.value 
            })
        } else {
            this.setData({
                isok: false,
                msg: event.detail.value
            })
        }
    },
    getCoupon() {
        // 获取变化数据
        let self = this;
        let msg = this.data.msg;
        if(!this.data.isok) {
            wx.showToast({
                title: '链接不合法',
                image: '../../dist/images/error.png',
                duration: 2000
            })
            return false;
        }
        wx.request({
            url: common.origin+'index.php',
            data: {
                "msg": msg
            },
            header: {
                "X-Requested-With": "XMLHttpRequest"
            },
            method: 'post',
            success(res) {
                if(res.data.code === 1007) {
                    wx.showToast({
                        title: res.data.status,
                        image: '../../dist/images/error.png',
                        duration: 3000
                    })
                    return false;
                }
                wx.setStorage({
                    key: "detail",
                    data: res.data,
                    success() {
                        wx.navigateTo({
                            url: '../detail/index?k=detail'
                        })
                    }
                })
            }
        })
    },
    openConfirm(content) {
        let self = this;
        wx.showModal({
            title: '我的购物链接',
            content: content,
            confirmText: "粘贴",
            cancelText: "取消",
            success(res) {
                if (res.confirm) {
                    self.setData({
                        msg: content 
                    });
                }
            }
        });
    },
})
