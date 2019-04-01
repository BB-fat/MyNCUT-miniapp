//app.js

import {
  myURL
} from "setting.js"

App({
  onLaunch: function() {
    var that = this
    // 尝试从缓存中读取openid
    wx.getStorage({
      key: 'openid',
      // 读取成功，写入全局变量备用
      success: function(res) {
        console.log("success get openid")
        that.globalData.openid = res.data
      },
      // 读取失败，调用登陆函数请求
      /*fail() {
        wx.login({
          success(res) {
            wx.request({
              url: myURL + '/login/code',
              data: {
                code: res.code
              },
              success(res) {
                console.log(res.data)
                // 将openid写入全局变量
                that.globalData.openid = res.data.openid
                // 个人信息为空，跳转至认证网页
                if (res.data.userInfo == null) {
                  wx.navigateTo({
                    url: '../webview/webview?mode=oauth&openid=' + res.data.openid,
                  })
                }
                // 如果传回用户信息，存入缓存
                else {
                  wx.setStorage({
                    key: 'openid',
                    data: res.data.openid,
                  })
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data.userInfo,
                  })
                }
              }
            })
          }
        })
      }*/
    })
  },

  globalData: {}
})