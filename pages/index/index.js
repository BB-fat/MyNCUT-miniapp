// pages/index/index.js
import {
  Requests
} from "../../utils/Requests";

Page({
  data: {
    showCat: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.courseware != null) {
      lookFile(JSON.parse(options.courseware))
    }
    // 获取Banner和Notice数据
    Requests.getWithCache({
      url: "/banner",
      success(data) {
        that.setData({
          indexBanner: data.indexBanner,
          indexNotice: data.indexNotice
        })
      },
      cacheTime: Requests.hour * 5
    })
  },

  //彩蛋
  tapCat: function () {
    if (this.data.showCat) {
      this.setData({
        showCat: false
      })
    } else {
      this.setData({
        showCat: true
      })
    }
  },

  //清除缓存
  clearStorage: function () {
    wx.clearStorage({
      success() {
        wx.showToast({
          icon: "success",
          title: "成功"
        })
      }
    })
  },
})