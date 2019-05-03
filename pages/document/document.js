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
    coursewareList: '',
    course_code: '',
    course_name: '',
    inform_loading: true,
    searchInfo: false,
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
        if (res.data == null) {
          wx.showToast({
            title: '该课程无课件',
            icon: 'none',
          })
          setTimeout(function() {
            wx.navigateBack()
          }, 1500)
        } else {
          that.setData({
            coursewareList: res.data,
            coursewareList_tmp : res.data, //为搜索做准备            
            inform_loading: false,
            // searchBan:true
          })
        }
      }
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function(res) {
    var courseware = this.data.coursewareList[res.target.dataset.index]
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
    if (that.data.coursewareList[index].type === 'dir') {
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.coursewareList[index].sign
      })
    } else {
      lookFile(that.data.coursewareList[index])
    }
  },

  downFile: function(e) { //下载课件
    let that = this
    var index = e.currentTarget.dataset.index
    downloadFile(that.data.coursewareList[index])
  },

  favourites: function(e) {
    var that = this
    var filename = e.currentTarget.dataset.filename
    var index = e.currentTarget.dataset.index
    that.data.coursewareList[index].favourite = true
    that.setData({
      coursewareList: that.data.coursewareList,      
    })
    for (var i in that.data.coursewareList_tmp) {
      if (that.data.coursewareList_tmp[i].file_name == filename) {
        that.data.coursewareList_tmp[i].favourite = true
        break
      }
    }
    onFavor(that.data.coursewareList[index])
  },

  unfavourites: function(e) {
    var that = this
    var filename = e.currentTarget.dataset.filename
    var index = e.currentTarget.dataset.index
    that.data.coursewareList[index].favourite = false
    that.setData({
      coursewareList: that.data.coursewareList,
    })
    for (var i in that.data.coursewareList_tmp) {
      if (that.data.coursewareList_tmp[i].file_name == filename) {
        that.data.coursewareList_tmp[i].favourite = false
        break
      }
    }
    offFavor(that.data.coursewareList[index])
  },

  search: function(e) { //搜索   
    let that = this
    var myStore = that.data.coursewareList_tmp    
    if (e.detail.value.length == 0) {
      that.setData({
        searchInfo: false,
        coursewareList: myStore,
      })
    } else {
      var queryList = []
      var inputValue = e.detail.value
      for (var i = 0; i < myStore.length; i++) {
        var name = myStore[i].file_name
        for (var j = 0; j <= name.length - inputValue.length; j++) {
          if (name.substr(j, inputValue.length) == inputValue) {
            queryList.push(myStore[i])
            break
          }
        }
      }
      if (queryList.length == 0) {
        that.setData({
          searchInfo: true
        })
      } else {
        that.setData({
          searchInfo: false,
          coursewareList: queryList,
        })
      }
    }
  },
})