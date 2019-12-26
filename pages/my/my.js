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

  onShow: function () {
    var that = this
    // 首次加载流量条
    if (this.data.wifiProgress == undefined) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      Requests.get("/v1/net", null, (data) => {
        that.setData({
          wifiProgress: parseInt(parseFloat(data[7]) / (30 * 1024) * 100),
          wifiLeft: (30 - parseFloat(data[7]) / 1024).toFixed(2)
        })
      })
    } else {
      // 让进度条每一次切换到这个页面都能加载动画
      var wifiProgress = this.data.wifiProgress
      this.setData({
        wifiProgress: 0,
      })
      this.setData({
        wifiProgress: wifiProgress
      })
    }
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