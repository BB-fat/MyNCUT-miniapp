// pages/document/document.js
import {
  myURL
} from "../../setting.js"
const app = getApp()
const array = []
for (var i = 0; i < 100; i++) {
  array.push(0);
}

Page({

  /**
   * Page initial data
   */
  data: {
    windowShow: 0,
    array: array, //存课件标号，给收藏判断
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
        console.log('warelist success')
        // console.log(res.data)
        that.setData({
          courseList: res.data,
        })
        console.log(that.data.courseList)
        // console.log(that.data.courseList[2].favourite)
        console.log(that.data.array)
        for (var i = 0; i < that.data.courseList.length; i++) {
          if (that.data.courseList[i].favourite == true) {
            var item = 'array[' + i + ']'
            that.setData({
              [item]: 101,
            })
          }
        }
        console.log(that.data.array)
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
  onShareAppMessage: function() {

  },

  lookFile: function(e) { //预览
    wx.showLoading({
      title: '打开中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 3000)

    var index = e.currentTarget.dataset.index
    let that = this
    console.log('saveFile called')
    console.log('array :' + that.data.array)
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
          const filePath = res.tempFilePath
          var fileType = that.data.courseList[index].type

          wx.openDocument({
            filePath,
            // fileType:'pdf',
            fileType: fileType,
            success(res) {
              // console.log(fileType)
              console.log('打开文档成功')
            }
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '打开文件失败',
            icon: none
          })
          console.log('download fail')
        }
      })
    }
  },

  downFile: function(e) { //下载
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
          windowShow: 1,
          wareURL: myURL + '/download?id=' + res.data
        })
      }
    })

  },

  copyURL: function() {
    wx.setClipboardData({
      data: this.data.wareURL,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
    this.setData({
      windowShow:0
    })
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