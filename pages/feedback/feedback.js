
import { myURL } from "../../setting.js"
const app = getApp()
const types = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showUp: false,
    showUp1: true,
    nowTxtlen: 0,  // 当前文本长度
    nowTxt: "",   // 文本内容
    types: [0, 1, 2],
    myChoice: 0
  },

  getNum(e) {   //意见框数字更新
  // console.log(e)
    let that = this
    that.setData({
      nowTxtlen: e.detail.cursor,
      nowTxt: e.detail.value
    })
  },

  bindChange: function (e) {  //反馈类型切换
    let that = this
    var val = e.detail.value
    that.setData({
      myChoice: this.data.types[val]
    })
  },

  toNoname: function (e) {  //匿名提交
    let that = this
    that.setData({
      time: new Date().toLocaleString(),
      showUp: true,
      showUp1: false
    })
    wx.request({
      url: myURL + '/feedback',
      data: {
        type: that.data.myChoice,
        openid: "None",
        time: that.data.time,
        text: that.data.nowTxt
      },
      success: function (res) {
        console.log("匿名提交成功")
      },
      fail: function (res) {
        console.log("匿名提交失败")
      },
    })
  },

  toYesname: function (e) {  //直接提交文本和类型
    let that = this    
    that.setData({
      time: new Date().toLocaleString(),
      showUp: true,
      showUp1: false
    })
    console.log(that.data.time)
    wx.request({
      url: myURL + '/feedback',
      data: {
        type: that.data.myChoice,
        openid: app.globalData.openid,
        time: that.data.time,
        text: that.data.nowTxt
      },
      success: function (res) {
        console.log("实名提交成功")
        wx.showToast({
          title: '提交成功',
          icon:'success'
        })
      },
      fail: function (res) {
        console.log("实名提交失败")
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "问题反馈",
    })
  },
})