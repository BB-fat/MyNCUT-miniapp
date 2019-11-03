// pages/flow/flow.js
const app = getApp()
import {
  myURL
} from "../../setting.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'fst', value: '20.0' },
      { name: 'scd', value: '50.0'},
      { name: 'trd', value: '100.0' },
      { name: 'fth', value: '200.0'}
    ],
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  state: function (e){
    console.log(e.detail.value)
  },
  pay: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log(inputValue),
    wx.request({
      url: myURL + '/pay/reqpay/wifi',
      data: {
        openid: 'o1Glo5FQa6e4gzMi76pm-RPxz0kw',
        paymoney: inputValue,
        sign: ''
      },
      method: "get",
      success(res) {
        console.log(res.data)

      }
    })
  } ,  
  onLoad: function (options) {
      
      
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})