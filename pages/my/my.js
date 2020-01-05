// pages/my/my.js

import {
  Requests
} from "../../utils/Requests";

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: "onetechteam@163.com",
    showModalStatus: false,
  },

  onLoad: function () {
    let that = this
    Requests.getWithCache({
      url: "/user",
      cacheTime: Requests.day * 10,
      success(data) {
        that.setData({
          userInfo: data
        })
      }
    })
    // 请求校网数据
    Requests.getWithCache({
      url: "/net",
      success(data) {
        that.setData({
          wifiUsage: (parseFloat(data[7]) / 1024).toFixed(2)
        })
      },
      cacheTime: Requests.hour * 2
    })
  },

  showModal: function () {
    var that = this
    var popWindow = wx.createAnimation({
      duration: 100,
      TimingFunction: 'ease-in-out'
    })
    popWindow.scale(0.85).opacity(1).step()
    that.setData({
      showModalStatus: true,
      popWindow: popWindow.export(),
    })
    setTimeout(function () {
      popWindow.duration = 100;
      popWindow.scale(1).opacity(1).step()
      that.setData({
        popWindow: popWindow.export()
      })
    }.bind(that), 200)
  },

  closeTap: function () {
    var that = this;
    that.setData({
      showModalStatus: false
    })
  },

  copyText: function () {
    console.log(12)
    wx.setClipboardData({
      data: this.data.contents,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
          }
        })
      }
    })
  }

})