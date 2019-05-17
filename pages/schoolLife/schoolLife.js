// pages/schoolLife/schoolLife.js
import {
  myURL
} from "../../setting.js"

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTwice: false
  },

  seeLicense: function () {
    wx.downloadFile({
      url: myURL + "/static/license.pdf",
      success(res) {
        wx.openDocument({
          filePath: res.tempFilePath,
          fileType: "pdf"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
            // 个人信息为空，跳转至认证网页
            if (res.data.userInfo == null) {
              app.globalData.authed=false
            } else {
              app.globalData.authed=true
              //
              //跳转点滴校园
              //
            }         
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.showTwice) {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },
})