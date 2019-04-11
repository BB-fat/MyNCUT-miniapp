// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn1: {
      tapFun: "tapBtn1",
      iconHeight: 57,
      iconWidth: 74,
      iconSrc: "../../imgs/my/Graduation_qualification_active_icon.png",
      text: "毕业资格"
    },
    btn2: {
      tapFun: "tapBtn2",
      iconHeight: 63,
      iconWidth: 66,
      iconSrc: "../../imgs/my/My_award_active_icon.png",
      text: "我的奖项"
    },
    btn3: {
      tapFun: "tapBtn3",
      iconHeight: 63,
      iconWidth: 66,
      iconSrc: "../../imgs/my/My_collection_active_icon.png",
      text: "我的收藏"
    },
    btn4: {
      tapFun: "tapBtn4",
      iconHeight: 60,
      iconWidth: 60,
      iconSrc: "../../imgs/my/My_message_active_icon.png",
      text: "我的消息"
    },
    btn5: {
      tapFun: "tapBtn5",
      iconHeight: 59,
      iconWidth: 59,
      iconSrc: "../../imgs/my/Feedback_active_icon.png",
      text: "问题反馈"
    },
    btn6: {
      tapFun: "tapBtn6",
      iconHeight: 60,
      iconWidth: 60,
      iconSrc: "../../imgs/my/About_us_active_icon.png",
      text: "关于我们"
    },
  },

  tapBtn1: function() {
  },
  tapBtn2: function() {
  },
  tapBtn3: function() {
  },
  tapBtn4: function () {
  },
  tapBtn5: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  tapBtn6: function () {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo:res.data
        })
      },
    })
  },
})