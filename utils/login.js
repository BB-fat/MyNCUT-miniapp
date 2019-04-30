import { myURL } from "../setting.js"

var app = getApp()
export function login(that) {
  // 尝试从缓存中读取openid
  if (app.globalData.openid == undefined) {
    wx.getStorage({
      key: 'openid',
      // 读取成功，写入全局变量备用
      success: function (res) {
        console.log("success get openid")
        app.globalData.openid = res.data
        getUserInfo(that)
      },
      // 读取失败，调用登陆函数请求
      fail() {
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
                app.globalData.openid = res.data.openid
                wx.setStorage({
                  key: 'openid',
                  data: res.data.openid,
                })
                // 个人信息为空，跳转至认证网页
                if (res.data.userInfo == null) {
                  wx.navigateTo({
                    url: '../webview/webview?mode=oauth&openid=' + res.data.openid,
                  })
                }
                else {
                  that.setData({
                    userInfo: res.data.userInfo
                  })
                }
              }
            })
          }
        })
      }
    })
  } else {
    getUserInfo(that)
  }
}

function getUserInfo(that) {
  wx.request({
    url: myURL + '/login/openid',
    data: {
      openid: app.globalData.openid
    },
    success(res) {
      console.log(res.data)
      if (res.data.userInfo == null) {
        wx.navigateTo({
          url: '../webview/webview?mode=oauth&openid=' + res.data.openid,
        })
      }
      else {
        that.setData({
          userInfo: res.data.userInfo
        })
      }
    }
  })
}