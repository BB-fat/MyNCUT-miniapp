import {
  myURL
} from "../../setting.js"
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowTxtlen: 0, // 当前文本长度
    nowTxt: "", // 文本内容
  },

  //意见框数字更新
  getNum(e) {
    let that = this
    that.setData({
      nowTxtlen: e.detail.cursor,
      nowTxt: e.detail.value
    })
  },

  submit: function(e) { //直接提交文本和类型
    console.log(e)
    let that = this
    wx.showLoading({
      title: "发送中",
      mask: true
    }); 
    var time=new Date().toLocaleString()
    wx.request({
      url: myURL + '/feedback',
      data: {
        formId:e.detail.formId,
        openid: app.globalData.openid,
        time: time,
        text: that.data.nowTxt
      },
      success: function(res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        setTimeout(function(){
          wx.navigateBack()
        },1000)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "问题反馈",
    })
  },
})