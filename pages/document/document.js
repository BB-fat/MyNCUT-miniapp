// pages/document/document.js
var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"
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
      // url: "http://v.ncut.edu.cn/document?code=2019_S_7002501_2019S510015",
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
          // console.log(res.data)
          that.setData({
            courseList: res.data,
          })
          console.log(that.data.courseList)
        // console.log(that.data.courseList[2].favourite)
        }        
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {


  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function(res) {     //转发课件
    if (res.from === 'button') {
      console.log(res.target)
      console.log(this.data.id)
    }
    return {
      title: '我的课件',
      path: '/pages/document/document?id=' + this.data.id, 
      success: function(res) {      
        console.log(res);
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  lookFile: function(e) { //预览课件
    wx.showToast({
      icon: 'loading',
      title: '请稍等',
      duration: 2000
    })

    var index = e.currentTarget.dataset.index
    let that = this
    console.log('saveFile called')
    console.log(that.data.courseList[index])
    // console.log('testnow:'+JSON.stringify(that.data.courseList))
    //
    if (that.data.courseList[index].type === 'dir') {
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.courseList[index].sign
      })
    } else {
      wx.downloadFile({

        url: myURL + '/courseware?openid=' + app.globalData.openid + '&courseware=' + JSON.stringify(that.data.courseList[index]),

        success(res) {
          console.log(res.statusCode)
          const filePath = res.tempFilePath
          var fileType = that.data.courseList[index].type

          wx.openDocument({
            filePath,
            fileType: fileType,
            success(res) {
              console.log(res)
              console.log('打开文档成功')
            },
            fail(res) {
              console.log(res)
              wx.showToast({
                title: '该文件类型不支持预览，请下载',
                icon: 'none',
                duratin: 2500
              })
              console.log('打开文档失败')
            }
          })
        },
      })
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

  sendFile:function(e){   //转发课件
    util.windowInfo()
  },


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