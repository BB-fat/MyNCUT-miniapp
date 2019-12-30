// pages/document/document.js
import {
  Requests
} from "../../utils/Requests";

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
    showLoading: true,
    searchInfo: false,
    showDownloadGuide: false,
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      course_code: options.course_code,
      course_name: options.course_name
    })
    wx.setNavigationBarTitle({
      title: options.course_name
    })
    Requests.getWithCache({
      url: "/v1/iclass/courseware",
      data: {
        course_code: options.course_code
      },
      success(data) {
        that.setData({
          coursewareList: data,
          coursewareList_tmp: data, //为搜索做准备            
          showLoading: false,
        })
      },
      cacheTime: Requests.hour,
    })
  },

  onPullDownRefresh: function () {
    let that = this
    Requests.getWithCache({
      url: "/v1/iclass/courseware",
      data: {
        course_code: that.data.course_code
      },
      success(data) {
        that.setData({
          coursewareList: data,
          coursewareList_tmp: data, //为搜索做准备            
          showLoading: false,
        })
        wx.stopPullDownRefresh()
      },
      cacheTime: Requests.hour,
      forceRefresh: true
    })
  },

  lookFile: function (e) {
    var index = e.currentTarget.dataset.index
    lookFile(this.data.coursewareList[index])
  },

  favourites: function (e) {
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

  unfavourites: function (e) {
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

  search: function (e) { //搜索   
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

  ignorePrompting: function (e) {
    this.setData({
      ignore: !!e.detail.value.length
    });
  },
})