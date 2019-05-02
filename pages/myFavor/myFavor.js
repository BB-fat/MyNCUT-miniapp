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

import {
  mySearch,
} from "../../utils/search.js"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    searchInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "我的收藏",
    })
  },

  onShow: function(res) {
    let that = this
    wx.request({
      url: myURL + '/favourite/get',
      data: {
        openid: app.globalData.openid
      },
      success(res) {
        console.log(res.data)
        that.setData({
          courseList: res.data
        })
        wx.setStorage({
          key: 'courseList',
          data: that.data.courseList,
        })
      }
    })
  },

  onShareAppMessage: function(res) {
    var courseware = this.data.courseList[res.target.dataset.index]
    if (res.from === 'button') {
      return {
        title: courseware.file_name,
        path: '/pages/iclass/iclass?courseware=' + JSON.stringify(courseware),
        imageUrl: "../../imgs/share.png"
      }
    }
  },

  lookFile: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    if (that.data.courseList[index].type === 'dir') {
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.courseList[index].sign
      })
    } else {
      lookFile(that.data.courseList[index])
    }
  },

  downFile: function(e) { //下载课件
    let that = this
    var index = e.currentTarget.dataset.index
    downloadFile(that.data.courseList[index])
  },

  favourites: function(e) {
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.courseList[index].favourite = true
    that.setData({
      courseList: that.data.courseList
    })
    onFavor(that.data.courseList[index])
  },

  unfavourites: function(e) {
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.courseList[index].favourite = false
    that.setData({
      courseList: that.data.courseList
    })
    offFavor(that.data.courseList[index])
  },


  search: function(e) {     //搜索
    mySearch(this,e)   
  },

})