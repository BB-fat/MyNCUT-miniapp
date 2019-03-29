//index.js
//获取应用实例
let app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },


  onLoad: function() {
    let that = this

    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log('已从缓存中以获取openid：' + res.data)
        // that.setData({
        //   openid: res.data
        // })
        app.globalData.openid=res.data
      },
      fail: function(res) {
        //get openid
        that.getUserInfo()
      }
    })
  },


  storeInfo: function(key, info) {
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



  getUserInfo: function(success) {
    let that=this
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
            app.globalData.openid=res.data.openid
            // console.log(app.globalData.openid)
            //完成后导航另一个页面
            wx.navigateTo({
              url: '../login/login',
            })
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
  }
})