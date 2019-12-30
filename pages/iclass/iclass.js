// pages/iclass/iclass.js
const app = getApp()

import {
  Requests
} from "../../utils/Requests";

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  onLoad: function () {
    var that = this
    // 请求作业数据
    var getHomework = function () {
      var course_codes = []
      that.data.courseList.forEach(element => {
        course_codes.push(element.course_code)
      });
      Requests.getWithCache({
        url: "/v1/iclass/homework",
        cacheTime: Requests.hour,
        data: {
          course_code: course_codes.join(",")
        },
        success(data) {
          that.setData({
            homework: data
          })
        }
      })
    }

    wx.getStorage({
      key: 'courseList',
      success: function (res) {
        that.setData({
          courseList: res.data
        })
        getHomework()
      },
      fail: function () {
        Requests.get({
          url: "/v1/iclass/course",
          success(data) {
            that.setData({
              courseList: data
            })
            wx.setStorage({
              key: "courseList",
              data: that.data.courseList
            })
            getHomework()
          },
        })
      }
    }) //end getstorge
  },

  toCourseware: function (e) { //课件资料
    var that = this
    wx.navigateTo({
      url: Requests.makeUrl("../courseware/courseware", {
        course_code: that.data.courseList[e.currentTarget.dataset.index].course_code,
        course_name: that.data.courseList[e.currentTarget.dataset.index].course_name
      }),
    })
  },

  tapHomework: function (e) { //课程作业
    let that = this
    var course_code = e.currentTarget.dataset.course_code
    if (that.data.homework[course_code].length == 0) {
      wx.showToast({
        icon: 'none',
        title: '此课程无作业',
      })
    } else {
      app.globalData.homework = that.data.homework
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
    Requests.get({
      url: "/v1/iclass/course",
      success(data) {
        that.setData({
          courseList: data
        })
        wx.setStorage({
          key: "courseList",
          data: that.data.courseList
        })
        wx.stopPullDownRefresh()
      },
    })
  },

  toFavor: function () {
    wx.navigateTo({
      url: '../myFavor/myFavor'
    })
  },
})