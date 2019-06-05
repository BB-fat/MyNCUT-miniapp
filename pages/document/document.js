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
    inform_loading: true,
    searchInfo: false,
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let that = this
    that.data.nowData = JSON.parse(options.nowData)
    // 设定标题显示课程名，如果是文件夹显示文件夹名
    if (that.data.nowData.course_name!=undefined){
      wx.setNavigationBarTitle({
        title: that.data.nowData.course_name,
      })
    }else{
      wx.setNavigationBarTitle({
        title: that.data.nowData.file_name,
      })
    }
    var reqData = {
      openid: app.globalData.openid,
      mode: options.type
    }
    if (options.type == 'all') {
      reqData['course_code'] = that.data.nowData.course_code
    } else if (options.type == 'dir') {
      reqData['courseware'] = options.nowData
    }
    wx.request({
      url: myURL + '/coursewarelist',
      data: reqData,
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
            coursewareList_tmp: res.data, //为搜索做准备            
            inform_loading: false,
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
        path: '/pages/index/index?courseware=' + JSON.stringify(courseware),
        imageUrl: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/share.png"
      }
    }
  },

  lookFile: function(e) {
    var index = e.currentTarget.dataset.index
    lookFile(this.data.coursewareList[index])
  },

  downFile: function(e) { //下载课件
    let that = this
    var index = e.currentTarget.dataset.index
    downloadFile(that.data.coursewareList[index])
  },

  favourites: function(e) {
    console.log(e.currentTarget.dataset)
    var that = this
    var filename = e.currentTarget.dataset.filename
    console.log(filename)
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
        if (name.search(inputValue) != -1) {
          queryList.push(myStore[i])
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