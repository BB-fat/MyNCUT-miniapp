// pages/login/login.js

import {myURL} from "../../setting.js"

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showError: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // console.log(res.data)
      },
      fail(){
        wx.login({
          success(res){
            wx.request({
              url: myURL+'/login/openid',
              data:{
                code:res.code
              },
              success(res){
                console.log(res.data)
                wx.setStorage({
                  key: 'openid',
                  data: res.data['openid'],
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: res.data['userInfo'],
                })
              }
            })
          }
        })
      }
    })
  },

  // 隐藏错误提示
  closeError: function() {
    this.setData({
      showError: false
    })
  },

  // 登陆
  login: function() {
    this.setData({
      showError: true
    })
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