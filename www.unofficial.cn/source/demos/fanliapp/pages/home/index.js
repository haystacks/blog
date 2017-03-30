Page({
    data: {
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
        this.setData({
            msg: event.detail.value 
        });
    },
    getCoupon() {
        // 获取变化数据
        let self = this;
        let msg = this.data.msg;
        // wx.request({
        //     url: 'https://fanli.unofficial.cn/api/app/index.php',
        //     data: {
        //         "msg": msg
        //     },
        //     header: {
        //         "X-Requested-With": "XMLHttpRequest"
        //     },
        //     method: 'post',
        //     success(res) {
        //         console.log(res.data);
        //     },
        //     fail(res) {

        //     }
        // })
        // self.globalData.detail = 123;
        let detail = '{"status":{"id":"315234","sid":"543241171193","name":"\u673a\u4e50\u5802 iphone6\u94a2\u5316\u819c\u82f9\u679c6s\u5168\u5c4f\u5168\u8986\u76d66plus\u6297\u84dd\u51497\u624b\u673a\u8d34\u819c4.7","image":"http:\/\/img01.taobaocdn.com\/bao\/uploaded\/i1\/TB1QJYBPFXXXXcXXXXXXXXXXXXX_!!0-item_pic.jpg","price1":"12.90","price2":"9.90","coupon":"\u6ee110\u5143\u51cf3\u5143","url":"https:\/\/uland.taobao.com\/coupon\/edetail?e=VSuKetnvAutt3vqbdXnGlk73b7ZrA6f9nxGOiCCvGTODspHV8GnrGhpBwAz9u2FrjXakjuN%2BxOPRI8biuE7b6x0HgBdG%2FDDL%2F1M%2FBw7Sf%2FfogZfN5BSWPZo%2FGZ9VNJrdHOJcvEtjugOhhLzQdGr%2FpVY34%2BjX348h&pid=mm_27010006_21086165_71160355&af=1","starttime":"2017-03-02","endtime":"2017-06-01","coupon_id":"ff01fe30e3f749ae86965b22d87a8f1a","sd_sid":"543241171193","tpwd":"\uffe5fkhBZHONZOY\uffe5","appid":"10237","urltotoken":"https:\/\/uland.taobao.com\/coupon\/edetail?e=VSuKetnvAutt3vqbdXnGlk73b7ZrA6f9nxGOiCCvGTODspHV8GnrGhpBwAz9u2FrjXakjuN%2BxOPRI8biuE7b6x0HgBdG%2FDDL%2F1M%2FBw7Sf%2FfogZfN5BSWPZo%2FGZ9VNJrdHOJcvEtjugOhhLzQdGr%2FpVY34%2BjX348h&pid=mm_27010006_21086165_71160355&af=1"}}';

        wx.setStorage({
            key: "detail",
            data: detail,
            success() {
                wx.navigateTo({
                    url: '../detail/index?k=detail'
                })
            }
        })
    },
    openConfirm: function (content) {
        let self = this;
        wx.showModal({
            title: '我的购物链接',
            content: content,
            confirmText: "粘贴",
            cancelText: "取消",
            success: function (res) {
                if (res.confirm) {
                    self.setData({
                        msg: content 
                    });
                }
            }
        });
    },
})
