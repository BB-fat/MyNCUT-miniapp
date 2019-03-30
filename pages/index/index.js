// pages/index/index.js

import {myURL} from "../../setting.js"

var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    // 在缓存中查找userInfo
    wx.getStorage({
      key: 'userInfo',
      // 没有userInfo向服务器请求用户数据
      success(res){
        console.log("success get userInfo")
        console.log(res.data)
      },
      fail(){
        wx.request({
          url: myURL +'/login/openid',
          data:{
            openid: app.globalData.openid
          },
          success(res){
            console.log(res.data)
            // 返回值非空时设定缓存
            if(res.data!=null){
              wx.setStorage({
                key: 'userInfo',
                data: res.data.userInfo,
              })
              wx.setStorage({
                key: 'openid',
                data: app.globalData.openid,
              })
            }
          }
        })
      }
    })
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