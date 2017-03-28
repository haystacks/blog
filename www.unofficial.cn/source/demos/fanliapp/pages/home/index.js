Page({
    data: {
        msg: ''
    },
    onLoad() {
        wx.getClipboardData({
            success(res) {
                console.log(res.data);
            }
        });
    },
    getCoupon() {
        // 获取变化数据
        let msg = this.msg;
        wx.request({
            url: 'http://fanli.unofficial.cn/api/app/index.php',
            data: {
                "msg": msg
            },
            header: {
                "X-Requested-With": "XMLHttpRequest"
            },
            msthod: 'post',
            success(res) {
                console.log(res.data);
            },
            fail(res) {

            }
        })
    }
})
