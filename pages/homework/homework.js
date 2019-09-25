// pages/homework/homework.js
import {
  myURL
} from "../../setting.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // homeList_all:'',
    homeList: '',
    course_name: '',
    // joint: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      course_name: options.course_name,
      homeList_all: app.globalData.homeList_all
    })
    wx.setNavigationBarTitle({
      title: that.data.course_name,
    })
    for (var key in that.data.homeList_all) {
      if (that.data.course_name == key) {
        that.setData({
          homeList: that.data.homeList_all[key],
        })
        break
      }
    }
  },
})