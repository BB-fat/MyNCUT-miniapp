// pages/myFavor/myFavor.js
var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"

import {
  lookFile,
  downloadFile,
  onFavor,
  offFavor
} from "../../utils/document.js"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的收藏",
    })
    let that = this
    wx.request({
      url: myURL + '/favourite/get',
      data: {
        openid: app.globalData.openid
      },
      success(res) {
        console.log(res.data)
        that.setData({
          favorList: res.data
        })
      }
    })
  },

  onShareAppMessage: function (res) {
    var courseware = this.data.favorList[res.target.dataset.index]
    if (res.from === 'button') {
      return {
        title: courseware.file_name,
        path: '/pages/iclass/iclass?courseware=' + JSON.stringify(courseware),
        imageUrl: "../../imgs/share.png"
      }
    }
  },

  lookFile: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    if (that.data.favorList[index].type === 'dir') {
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.favorList[index].sign
      })
    } else {
      lookFile(that.data.favorList[index])
    }
  },

  downFile: function (e) { //下载课件
    let that = this
    var index = e.currentTarget.dataset.index
    downloadFile(that.data.favorList[index])
  },

  favourites: function (e) {
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.favorList[index].favourite = true
    that.setData({
      favorList: that.data.favorList
    })
    onFavor(that.data.favorList[index])
  },
  
  unfavourites: function (e) {
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.favorList[index].favourite = false
    that.setData({
      favorList: that.data.favorList
    })
    offFavor(that.data.favorList[index])
  },
})