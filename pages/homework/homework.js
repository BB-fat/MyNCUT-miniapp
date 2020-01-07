// pages/homework/homework.js
import {
  Requests
} from "../../utils/Requests"

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    Requests.getWithCache({
      url: "/iclass/homework",
      data: {
        course_code: options.course_code,
      },
      cacheTime: Requests.day,
      success(data) {
        that.setData({
          homework: data[options.course_code]
        })
      }
    })
  },
})