// pages/myFavor/myFavor.js
var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"

import {
  myMap
} from "../../utils/myMap.js"

const app = getApp()
const numArray = new Array()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInfo:false,
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
    // var courseArray = []
    // var favorArray = []
    wx.getStorage({
      key: 'courseList',
      success: function(res) {
        that.setData({
          courseList: res.data
        })        
        myMap(that)
      },
      fail: function(res) {
        wx.request({
          url: myURL + '/courselist',
          data: {
            openid: app.globalData.openid
          },
          success: function(res) {            
            that.setData({
              courseList: res.data
            })
            myMap(that)
            wx.setStorage({
              key: "courseList",
              data: that.data.courseList
            })
          }
        })
      }
    }) //end getstorge of courselist 
  },

  goNext: function(e) {
    let that = this
    var course_code = e.currentTarget.dataset.course_code
    var course_name = e.currentTarget.dataset.course_name
    var temp = JSON.stringify(that.data.favorList)
    // console.log(course_code)
    wx.navigateTo({
      url: '../singleFavor/singleFavor?course_code=' + course_code + '&course_name=' + course_name + '&favorList=' + temp,
    })
  },

})