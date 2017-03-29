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
    setMsg(event) {
        this.setData({
            msg: event.detail.value 
        });
    },
    getCoupon() {
        // 获取变化数据
        let msg = this.data.msg;
        console.log(this.data);
        wx.request({
            url: 'https://fanli.unofficial.cn/api/app/index.php',
            data: {
                "msg": msg
            },
            header: {
                "X-Requested-With": "XMLHttpRequest"
            },
            method: 'post',
            success(res) {
                console.log(res.data);
            },
            fail(res) {

            }
        })
    }
})
