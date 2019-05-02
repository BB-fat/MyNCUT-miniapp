// pages/document/document.js
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
   * Page initial data
   */
  data: {
    courseList: '',
    course_code: '',
    course_name: '',
    status: ''
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {    
    wx.setNavigationBarTitle({
      title: options.course_name,
    })
    let that = this
    that.setData({
      course_code: options.course_code,
      course_name: options.course_name
    })
    wx.request({
      url: myURL + '/coursewarelist',
      data: {
        openid: app.globalData.openid,
        coursecode: that.data.course_code,
        mode: 'all'
      },
      success: function(res) {
        if(res.data==null)
        {
          wx.showToast({
            title: '该课程无课件',
            icon:'none',
          })
          setTimeout(function(){
            wx.navigateBack()
          },1500)    
        }
        else{
          that.setData({
            courseList: res.data,
          })
        }        
      }
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function(res) {
    var courseware=this.data.courseList[res.target.dataset.index]
    if (res.from === 'button'){
      return {
        title: courseware.file_name,
        path: '/pages/iclass/iclass?courseware='+JSON.stringify(courseware),
        imageUrl:"../../imgs/share.png"
      }
    }
  },

  lookFile:function(e){
    var that=this
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
    var that = this
    var index = e.currentTarget.dataset.index
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
  }
})