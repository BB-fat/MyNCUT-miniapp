// pages/my/my.js
const app = getApp()
var util = require('../../utils/util.js')

import {myURL} from "../../setting.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authed: true,
    btn1: {
      tapFun: "tapBtn1",
      iconHeight: 63,
      iconWidth: 74,
      iconSrc: "../../imgs/my/Graduation_qualification_active_icon.png",
      text: "毕业资格"
    },
    btn2: {
      tapFun: "tapBtn2",
      iconHeight: 63,
      iconWidth: 66,
      iconSrc: "../../imgs/my/My_award_active_icon.png",
      text: "荣誉奖项"
    },
    btn3: {
      tapFun: "tapBtn3",
      iconHeight: 63,
      iconWidth: 66,
      iconSrc: "../../imgs/my/Feedback_active_icon.png",
      text: "问题反馈"
    },
    btn4: {
      tapFun: "tapBtn4",
      iconHeight: 60,
      iconWidth: 60,
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow:function(){
    var that=this
    // 让进度条每一次切换到这个页面都能加载动画
    this.setData({
      wifiProgress:0
    })
    wx.request({
      url: myURL+'/wifi',
      data:{
        openid:app.globalData.openid
      },
      success(res){
        that.setData({
          wifiProgress:parseInt(parseFloat(res.data)/(30*1024)*100)
        })
      }
    })
  },
})