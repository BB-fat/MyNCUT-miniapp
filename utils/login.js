import {
  myURL
} from "../setting.js"

var app = getApp()

export function checkAuth(that) {
  // 尝试从缓存中读取openid
  if (app.globalData.openid == undefined) {
    wx.getStorage({
      key: 'openid',
      // 读取成功，写入全局变量备用
      success: function(res) {
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
                checkUserInfo(res, that)
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
  if (app.globalData.userInfo == null) {
    wx.request({
      url: myURL + '/login/openid',
      data: {
        openid: app.globalData.openid
      },
      success(res) {
        if (res.data.disable == true) {
          wx.hideTabBar({})
          that.setData({
            disable: true
          })
        } else {
          checkUserInfo(res, that)
        }
      }
    })
  } else {
    wx.showTabBar()
    that.setData({
      authed: true
    })
    app.globalData.authed = true
  }
}

function checkUserInfo(res, that) {
  if (res.data.userid == null) {
    //数据库中没有认证数据
    wx.hideTabBar()
    that.setData({
      authed: false
    })
    app.globalData.authed = false
  } else {
    wx.showTabBar()
    that.setData({
      authed: true
    })
    app.globalData.authed = true
    app.globalData.userInfo = res.data
  }
}

export function goAuth() {
  wx.navigateTo({
    url: '../webview/webview?mode=oauth&openid=' + app.globalData.openid,
  })
}