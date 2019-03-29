//app.js
App({
  onLaunch: function () {
    let that=this
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 获取用户信息
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log('已从缓存中以获取openid：' + res.data)
        // that.setData({
        //   openid: res.data
        // })
        that.globalData.openid = res.data
      },
      fail: function (res) {
        //get openid
        that.getInfo()
      }
    })
  },

  getInfo: function (success) {
    let that = this
    //获取微信小程序code
    wx.login({
      success(res) {
        //发出请求
        console.log('code:' + res.code)
        wx.request({
          //todo: http???要求https
          url: 'http://myncut.ncut.edu.cn/login/openid',
          data: {
            code: res.code
          },
          //请求成功
          success(res) {
            //要返回用户基本信息和openid
            // that.setData({
            //   openid: res.data.openid
            // })
            that.globalData.openid = res.data.openid
            // console.log(app.globalData.openid)
            //完成后导航另一个页面
            that.storeInfo('openid',res.data.openid)
            if(res.data.userInfo!==null){
              that.storeInfo('userInfo',res.data.userInfo)
            }else{
              wx.navigateTo({
                url: '../webview/webview?url=' + 'https://ucpay.ncut.edu.cn/open/user/oauth/index?redirect=http://myncut.ncut.edu.cn/login/oauth&appid=31b1e992583074382&state='+res.data.openid,
              })
            }
            // console.log(res.data.userInfo)
          },
          fail: function (res) {
            console.log("登录失败")
          }
        })
      },
      fail(res) {
        //todo：给出首次链接连校网的警告
        console.log('未能与服务器取得链接')
      }
    })
  },


  storeInfo: function (key, info) {
    let that = this
    wx.setStorage({
      key: key,
      data: info,
      success(res) {
        console.log(key + "存储成功")
      },
      fail(res) {
        console.log(key + "存储失败，尝试第刷新页面")
        that.onLoad()
      }
    })
  },


  globalData: {
    userInfo: null,
    openid: ''
  }
})