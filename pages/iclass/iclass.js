// pages/iclass/iclass.js
const app = getApp()
import {
  myURL
} from "../../setting.js"

import {
  login
} from '../../utils/login.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: {},
    courwareList: '',
    homeList_all: '',
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function() {
    let that = this
    //todo：要获取openid
    wx.getStorage({
      key: 'courseList',
      success: function(res) {
        console.log(res.data)
        that.setData({
          courseList: res.data
        })
        console.log('getstorage success')
      },
      fail: function(res) {
        wx.request({
          url: myURL + '/courselist',
          // url:"http://v.ncut.edu.cn/course?sno=17152010120",
          data: {
            openid: app.globalData.openid
          },
          success: function(res) {
            // console.log(res.data[0])
            that.setData({
              courseList: res.data
            })
            console.log('request success')
            console.log(that.data.courseList)
            wx.setStorage({
              key: "courseList",
              data: that.data.courseList
            })
            console.log('setstorage success')
          }
        })
      }
    })
  },

  onReady:function(){
    login(this)
    console.log("do login()")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // login(this)
    // console.log("do login()")
    let that = this
    wx.request({
      url: myURL + '/homework',
      data: {
        openid: app.globalData.openid,
        // coursecode: that.data.course_code,
      },
      success(res) {
        console.log(res.data)
        that.setData({
          homeList_all: res.data
        })
        console.log(that.data.homeList_all)
      },
      fail(res) {
        console.log('没作业')
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this
    wx.request({
      url: myURL + '/courselist',
      // url:"http://v.ncut.edu.cn/course?sno=17152010120",
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getDocument: function(e) {      //课件资料
    var course_code = e.currentTarget.dataset.course_code
    var course_name = e.currentTarget.dataset.course_name
    wx.navigateTo({
      url: '../document/document?course_code=' + course_code + '&course_name=' + course_name,
    })    
  },

  getHomework: function(e) { //课程作业
    let that = this
    // var course_code = e.currentTarget.dataset.course_code
    var course_name = e.currentTarget.dataset.course_name
    // var course_class = e.currentTarget.dataset.course_class
    // var joint = course_name + '：' + course_class
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
      // var temp = that.data.homeList_all
      var temp = JSON.stringify(that.data.homeList_all)
      console.log(temp)
      wx.navigateTo({
        url: '../homework/homework?course_name=' + course_name + '&homeList_all=' + temp,
      })
      // console.log()
    }
  },

  toTop: function(e) { //置顶
    console.log(e)
    var index = e.currentTarget.dataset.index
    var tmp = this.data.courseList.splice(index, 1)
    console.log(tmp)
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