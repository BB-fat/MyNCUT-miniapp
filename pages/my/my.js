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
    btn2: {
      tapFun: "tapBtn6",
      iconHeight: 72,
      iconWidth: 72,
      iconSrc: "../../imgs/my/myFavor.png",
      text: "我的收藏"
    },
    btn1: {
      tapFun: "tapBtn1",
      iconHeight: 72,
      iconWidth: 72,
      iconSrc: "../../imgs/my/Graduation_qualification_active_icon.png",
      text: "毕业资格"
    },    
    btn3: {
      tapFun: "tapBtn3",
      iconHeight: 72,
      iconWidth: 72,
      iconSrc: "../../imgs/my/Feedback_active_icon.png",
      text: "问题反馈"
    },
    btn4: {
      tapFun: "tapBtn4",
      iconHeight: 72,
      iconWidth: 72,
      iconSrc: "../../imgs/my/About_us_active_icon.png",
      text: "关于我们"
    },
    btn5: {
      btnWidth: 280,
      btnHeight: 120,
      mgtopbtn: 6,
      fontsize: 35,
      tapFunc: "tapBtn5",
      mgtopimg: 30,
      imgWidth: 80,
      imgHeight: 75,
      imgUrl: "../../imgs/my/message.png",
      pdtoptxt: 0,
      mglefttxt: 0,
      btnTxt: "我的消息"
    },
    btn6: {
      btnWidth: 280,
      btnHeight: 120,
      mgtopbtn: 6,
      fontsize: 35,
      tapFunc: "tapBtn6",
      mgtopimg: 25,
      imgWidth: 80,
      imgHeight: 65,
      imgUrl: "../../imgs/my/collection.png",
      pdtoptxt: 0,
      mglefttxt: 0,
      btnTxt: "我的收藏"
    },
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
  tapBtn5: function() {
    util.windowInfo()
  },
  tapBtn6: function(e) {
    wx.navigateTo({
      url: '../myFavor/myFavor',
    })
  },

  onLoad: function() {
    var that = this


  },

  onShow: function() {
    var that = this
    // 没有认证
    // app.globalData.userInfo=["me","you"]
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
})