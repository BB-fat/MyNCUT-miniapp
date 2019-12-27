// pages/iclass/iclass.js
const app = getApp()

import {
  Requests
} from "../../utils/Requests";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
  },

  onShow: function () {
    var that = this
    if (this.data.courseList == undefined) {
      wx.getStorage({
        key: 'courseList',
        success: function (res) {
          that.setData({
            courseList: res.data
          })
        },
        fail: function () {
          Requests.getWithCache({
            url: "/v1/iclass/course",
            success(data) {
              that.setData({
                courseList: data
              })
              wx.setStorage({
                key: "courseList",
                data: that.data.courseList
              })
            },
            cacheTime: Requests.day * 10
          })
        }
      }) //end getstorge
      // 请求作业
      // wx.request({
      //   url: myURL + '/homework',
      //   data: {
      //     openid: app.globalData.openid,
      //   },
      //   success(res) {
      //     that.setData({
      //       homeList_all: res.data
      //     })
      //   },
      // })
    }
  },

  getDocument: function (e) { //课件资料
    var that = this
    wx.navigateTo({
      url: '../document/document?type=all&nowData=' + JSON.stringify(that.data.courseList[e.currentTarget.dataset.index]),
    })
  },

  getHomework: function (e) { //课程作业
    let that = this
    var course_name = e.currentTarget.dataset.course_name
    if (that.data.homeList_all[course_name] == undefined) {
      wx.showToast({
        icon: 'none',
        title: '此课程无作业',
        duration: 2000
      })
    } else {
      app.globalData.homeList_all = that.data.homeList_all
      wx.navigateTo({
        url: '../homework/homework?course_name=' + course_name,
      })
    }
  },

  //置顶
  toTop: function (e) {
    var that = this
    setTimeout(function () {
      var index = e.currentTarget.dataset.index
      var tmp = that.data.courseList.splice(index, 1)
      that.data.courseList.unshift(tmp[0])
      that.setData({
        courseList: that.data.courseList
      })
      wx.setStorage({
        key: "courseList",
        data: that.data.courseList
      })
    }, 300)
  },

  onPullDownRefresh: function () {
    let that = this
    // wx.request({
    //   url: myURL + '/courselist',
    //   data: {
    //     openid: app.globalData.openid
    //   },
    //   success: function (res) {
    //     that.setData({
    //       courseList: res.data
    //     })
    //     console.log(that.data.courseList)
    //     wx.setStorage({
    //       key: "courseList",
    //       data: that.data.courseList
    //     })
    //     wx.stopPullDownRefresh()
    //   }
    // })
  },

  toFavor: function () {
    wx.navigateTo({
      url: '../myFavor/myFavor'
    })
  },
})