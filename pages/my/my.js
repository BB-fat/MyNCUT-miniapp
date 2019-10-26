// pages/my/my.js
const app = getApp()
var util = require('../../utils/util.js')

import {
  myURL
} from "../../setting.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: "",
    showModalStatus: false,
    btn2: {
      tapFun: "tapBtn6",
      iconSrc: "/img/my/myfavor.svg",
      text: "我的收藏"
    },
    btn1: {
      tapFun: "tapBtn1",
      iconSrc: "/img/my/graduation.svg",
      text: "毕业资格"
    },    
    btn3: {
      tapFun: "tapBtn3",
      iconSrc: "/img/my/feedback.svg",
      text: "问题反馈",
      isContact:true
    },
    btn5: {
      tapFun: "showModal",
      iconSrc: "/img/my/extend.svg",
      text: "合作推广",
    },
    btn4: {
      tapFun: "tapBtn4",
      iconSrc: "/img/my/about.svg",
      text: "关于我们",
    },
    flowTap:function() {
      wx.navigateTo({
        url: '../flow/flow',
      })
    }
  },

  onShow: function() {
    var that = this
    if (app.globalData.userInfo == null) {
      wx.switchTab({
        url: '../index/index',
      })
    } 
    // 首次加载流量条
    else if (this.data.wifiProgress == undefined) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      wx.request({
        url: myURL + '/wifi',
        data: {
          openid: app.globalData.openid
        },
        success(res) {
          that.setData({
            wifiProgress: parseInt(parseFloat(res.data) / (30 * 1024) * 100),
            wifiLeft: (30 - parseFloat(res.data) / 1024).toFixed(2)
          })
        }
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
 
  tapBtn1: function() {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_graduation/graduate/list',
    })
  },
  tapBtn2: function() {
    util.windowInfo()
  },
  tapBtn3: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  tapBtn4: function() {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  tapBtn6: function() {
    wx.navigateTo({
      url: '../myFavor/myFavor',
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
    setTimeout(function() {
      popWindow.duration = 100;
      popWindow.scale(1).opacity(1).step()
      that.setData({
        popWindow:popWindow.export()
      })
    }.bind(that),200)
  },
  closeTap:function() {
    var that = this;
    that.setData({
      showModalStatus: false
    })
  }
  
})