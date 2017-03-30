Page({
    data: {
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
          success: function(res){
              let detail = JSON.parse(res.data);
                self.setData({
                    detail: detail.status
                })
          },
          fail: function(res) {
                wx.redirectTo({
                      url: '../home/index'
                })
          }
        })
    }
})
