// pages/document/document.js
var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"

import {
  lookFile
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
    console.log(app.globalData.openid)
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
          console.log('warelist success')
          that.setData({
            courseList: res.data,
          })
          console.log(that.data.courseList)
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
    console.log(that.data.courseList[index])
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
    wx.request({
      url: myURL + '/reqdownload',
      data: {
        openid: app.globalData.openid,
        courseware: JSON.stringify(that.data.courseList[index]),
      },
      success(res) {
        that.setData({
            wareURL: myURL + '/download?id=' + res.data
          }),
          wx.showModal({
            title: '复制以下链接到浏览器下载',
            content: that.data.wareURL,
            confirmText: '复制',
            success(res) {
              if (res.confirm) {
                console.log('用户点击复制')
                wx.setClipboardData({
                  data: that.data.wareURL,
                  success() {
                    wx.showToast({
                      title: '复制成功',
                      icon: 'success'
                    })
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
      },
      fail(res) {
        wx.showToast({
          title: '下载链接消失了',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // sendFile:function(e){   //转发课件
  //   util.windowInfo()
  // },


  favourites: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    var that = this
    that.data.courseList[index].favourite = true
    that.setData({
      courseList: that.data.courseList
    })
    wx.request({
      url: myURL + '/favourite/courseware',
      data: {
        openid: app.globalData.openid,
        courseware: JSON.stringify(that.data.courseList[index]),
        mode: 'add'
      },
      success: function(res) {
        //收藏课件成功
        console.log("收藏课件成功")
        console.log(res)
      }
    })
  },
  unfavourites: function(e) {
    var index = e.currentTarget.dataset.index
    var that = this
    that.data.courseList[index].favourite = false
    that.setData({
      courseList: that.data.courseList
    })
    wx.request({
      url: myURL + '/favourite/courseware',
      data: {
        openid: app.globalData.openid,
        courseware: JSON.stringify(that.data.courseList[index]),
        mode: 'del',
      },
      success: function(res) {
        //取消收藏成功
        console.log("取消收藏课件成功")
        console.log(res)
      }
    })
  }
})