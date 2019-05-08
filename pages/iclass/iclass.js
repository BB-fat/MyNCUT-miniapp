// pages/iclass/iclass.js
const app = getApp()
import {
  myURL
} from "../../setting.js"

import {
  lookFile
} from "../../utils/document.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
  },

  onShow:function(){
    var that=this
    if (app.globalData.userInfo == null) {
      wx.switchTab({
        url: '../index/index',
      })
    }else if(this.data.courseList==undefined){
      wx.getStorage({
        key: 'courseList',
        success: function (res) {
          that.setData({
            courseList: res.data
          })
        },
        fail: function (res) {
          wx.request({
            url: myURL + '/courselist',
            data: {
              openid: app.globalData.openid
            },
            success: function (res) {
              that.setData({
                courseList: res.data
              })
              console.log(that.data.courseList)
              wx.setStorage({
                key: "courseList",
                data: that.data.courseList
              })
            }
          })
        }
      }) //end getstorge
      // 请求作业
      wx.request({
        url: myURL + '/homework',
        data: {
          openid: app.globalData.openid,
        },
        success(res) {
          that.setData({
            homeList_all: res.data
          })
          console.log(that.data.homeList_all)
        },
        fail(res) {
          console.log('没作业')
        }
      })
    }
  },

  toAuth: function() {
    goAuth()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  doRefresh: function() {
    wx.startPullDownRefresh()
    let that = this
    wx.request({
      url: myURL + '/courselist',
      data: {
        openid: app.globalData.openid
      },
      success: function(res) {
        // console.log(res.data[0])
        that.setData({
          courseList: res.data
        })
        console.log(that.data.courseList)
        wx.setStorage({
          key: "courseList",
          data: that.data.courseList
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  getDocument: function(e) { //课件资料
    var that=this
    wx.navigateTo({
      url: '../document/document?type=all&nowData=' + JSON.stringify(that.data.courseList[e.currentTarget.dataset.index]),
    })
  },

  getHomework: function(e) { //课程作业
    let that = this
    var course_name = e.currentTarget.dataset.course_name
    console.log(course_name)
    var flag = false
    for (var key in that.data.homeList_all) {
      if (course_name == key) {
        flag = true
        break
      }
    }
    if (flag == false) {
      wx.showToast({
        icon: 'none',
        title: '此课程无作业',
        duration: 2000
      })
    } else {
      console.log(that.data.homeList_all)
      var temp = JSON.stringify(that.data.homeList_all)
      wx.navigateTo({
        url: '../homework/homework?course_name=' + course_name + '&homeList_all=' + temp,
      })
      // console.log()
    }
  },

  toTop: function(e) { //置顶
    // console.log(e)
    var index = e.currentTarget.dataset.index
    var tmp = this.data.courseList.splice(index, 1)
    // console.log(tmp)
    this.data.courseList.unshift(tmp[0])
    this.setData({
      courseList: this.data.courseList
    })
    wx.setStorage({
      key: "courseList",
      data: this.data.courseList
    })
  },
})