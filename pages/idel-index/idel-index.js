// pages/idel-index/idel-index.js
import {
  Requests
} from "../../utils/Requests"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  search: function (e) {
    let that = this
    Requests.get({
      url: "/idle",
      data: {
        title: e,
        state: 1
      },
      success(data) {
        that.setData({
          goods: data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    this.setData({
      search: this.search
    })
    wx.startPullDownRefresh({})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that=this
    Requests.get({
      url:"/idle",
      data:{
        state:1
      },
      success(data){
        wx.stopPullDownRefresh({})
        that.setData({
          goods: data
        })
      }
    })
  },
})