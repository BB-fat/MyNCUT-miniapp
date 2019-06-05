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
  myMap
} from "../../utils/myMap.js"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInfo: false,
    isCourse: true,
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
    if (that.data.isCourse == true) {
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
    }
  },

  onShareAppMessage: function(res) {
    var courseware = this.data.favorList[res.target.dataset.index]
    if (res.from === 'button') {
      return {
        title: courseware.file_name,
        path: '/pages/index/index?courseware=' + JSON.stringify(courseware),
        imageUrl: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/share.png"
      }
    }
  },

  goNext: function(e) {
    let that = this
    var course_code = e.currentTarget.dataset.course_code
    var course_name = e.currentTarget.dataset.course_name
    var temp = JSON.stringify(that.data.favorList)
    wx.navigateTo({
      url: '../singleFavor/singleFavor?course_code=' + course_code + '&course_name=' + course_name + '&favorList=' + temp,
    })
  },

  search: function(e) {
    let that = this
    that.setData({
      isCourse: false
    })
    var myStore = that.data.favorList_tmp
    if (e.detail.value.length == 0) {
      myMap(that)
      that.setData({
        isCourse: true,
        searchInfo: false,
        favorList: myStore,
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
          favorList: queryList,
        })
      }
    }
  },

  lookFile: function(e) {
    var index = e.currentTarget.dataset.index
    lookFile(this.data.favorList[index])
  },

  downFile: function(e) {
    let that = this
    var index = e.currentTarget.dataset.index
    downloadFile(that.data.favorList[index])
  },

  favourites: function(e) {
    var filename = e.currentTarget.dataset.filename
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.favorList[index].favourite = true
    that.setData({
      favorList: that.data.favorList,
    })
    for (var i in that.data.favorList_tmp) {
      if (that.data.favorList_tmp[i].file_name == filename) {
        that.data.favorList_tmp[i].favourite = true
        break
      }
    }
    onFavor(that.data.favorList[index])
  },

  unfavourites: function(e) {
    var filename = e.currentTarget.dataset.filename
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.favorList[index].favourite = false
    that.setData({
      favorList: that.data.favorList,
    })
    for (var i in that.data.favorList_tmp) {
      if (that.data.favorList_tmp[i].file_name == filename) {
        that.data.favorList_tmp[i].favourite = false
        break
      }
    }
    offFavor(that.data.favorList[index])
  },
})