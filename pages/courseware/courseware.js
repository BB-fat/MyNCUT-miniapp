// pages/document/document.js
import {
  Requests
} from "../../utils/Requests";

Page({

  /**
   * Page initial data
   */
  data: {},

  // 搜索课件
  search: function (e) {
    var tmp = []
    for (var i in this.data.all) {
      if (this.data.all[i].filename.indexOf(e) != -1)
        tmp.push(this.data.all[i])
    }
    this.setData({
      coursewareList: tmp
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      course_code: options.course_code,
      course_name: options.course_name,
      search: that.search
    })
    wx.setNavigationBarTitle({
      title: options.course_name
    })
    wx.showLoading({
      title: "加载中",
      mask: true
    })
    Requests.getWithCache({
      url: "/iclass/courseware",
      data: {
        course_code: options.course_code
      },
      success(data) {
        that.setData({
          coursewareList: data,
          all: data
        })
        wx.hideLoading()
      },
      cacheTime: Requests.hour,
    })
  },

  onPullDownRefresh: function () {
    let that = this
    Requests.getWithCache({
      url: "/iclass/courseware",
      data: {
        course_code: that.data.course_code
      },
      success(data) {
        that.setData({
          coursewareList: data,
          all: data
        })
        wx.stopPullDownRefresh()
      },
      cacheTime: Requests.hour,
      forceRefresh: true
    })
  },
})