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
    var that = this
    this.data.btn1.taped = true
    this.setData({
      btn1: this.data.btn1
    })
    setTimeout(function() {
      that.data.btn1.taped = false
      that.setData({
        btn1: that.data.btn1
      })
    }, 400)
  },
  tapBtn2: function() {
    var that = this
    this.data.btn2.taped = true
    this.setData({
      btn2: this.data.btn2
    })
    setTimeout(function() {
      that.data.btn2.taped = false
      that.setData({
        btn2: that.data.btn2
      })
    }, 400)
  },
  tapBtn3: function() {
    var that = this
    this.data.btn3.taped = true
    this.setData({
      btn3: this.data.btn3
    })
    setTimeout(function() {
      that.data.btn3.taped = false
      that.setData({
        btn3: that.data.btn3
      })
    }, 300)
  },
  tapBtn4: function () {
    var that = this
    this.data.btn4.taped = true
    this.setData({
      btn4: this.data.btn4
    })
    setTimeout(function () {
      that.data.btn4.taped = false
      that.setData({
        btn4: that.data.btn4
      })
    }, 400)
  },
  tapBtn5: function () {
    var that = this
    this.data.btn5.taped = true
    this.setData({
      btn5: this.data.btn5
    })
    setTimeout(function () {
      that.data.btn5.taped = false
      that.setData({
        btn5: that.data.btn5
      })
    }, 400)
  },
  tapBtn6: function () {
    var that = this
    this.data.btn6.taped = true
    this.setData({
      btn6: this.data.btn6
    })
    setTimeout(function () {
      that.data.btn6.taped = false
      that.setData({
        btn6: that.data.btn6
      })
    }, 400)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})