Page({
    data: {
        origin: '',
        detail: ''
    },
    onLoad(e) {
        let k = e.k;
        this.getDetail(k);
    },
    getDetail(k) {
        // 获取k
        let self = this;
        wx.getStorage({
          key: k,
          success(res){
              let detail = JSON.parse(res.data);
                self.setData({
                    origin: detail.origin,
                    detail: detail.status
                })
          },
          fail(res) {
                wx.redirectTo({
                      url: '../home/index'
                })
          }
        })
    },
    toBuy() {
        let tpwd = this.data.detail.tpwd;
        if(wx.setClipboardData) {
            wx.setClipboardData({
                data: tpwd,
                success() {
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                    })
                } 
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '不支持自动复制淘口令，手动复制一下，立享优惠',
                showCancel: false
            })
        }
    }
})
