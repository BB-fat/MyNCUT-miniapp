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
      text: "荣誉奖项"
    },
    btn3: {
      tapFun: "tapBtn3",
      iconHeight: 63,
      iconWidth: 66,
      iconSrc: "../../imgs/my/My_collection_active_icon.png",
      text: "问题反馈"
    },
    btn4: {
      tapFun: "tapBtn4",
      iconHeight: 60,
      iconWidth: 60,
      iconSrc: "../../imgs/my/My_message_active_icon.png",
      text: "关于我们"
    },
    btn5: {
      btnWidth: 280,
      btnHeight: 120,
      mgtopbtn: 6,
      fontsize: 35,
      tapFunc: "tapBtn5",
      mgtopimg: 25,
      imgWidth: 60,
      imgHeight: 60,
      imgUrl: "../../imgs/index/course.png",
      pdtoptxt: 0,
      mglefttxt: 22,
      btnTxt: "我的消息"
    },
    btn6: {
      btnWidth: 280,
      btnHeight: 120,
      mgtopbtn: 6,
      fontsize: 35,
      tapFunc: "tapBtn6",
      mgtopimg: 25,
      imgWidth: 60,
      imgHeight: 60,
      imgUrl: "../../imgs/index/course.png",
      pdtoptxt: 0,
      mglefttxt: 22,
      btnTxt: "我的收藏"
    },
  },

  tapBtn1: function() {
  },
  tapBtn2: function() {
  },
  tapBtn3: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  tapBtn4: function () {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  tapBtn5: function () {
  },
  tapBtn6: function () {
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