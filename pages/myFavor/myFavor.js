// pages/myFavor/myFavor.js
var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "我的收藏",
    })
    let that = this
    wx.request({
      url: myURL + '/favourite/get',
      data: {
        openid: app.globalData.openid
      },
      success(res) {
        console.log(res.data)
        that.setData({
          favorList: res.data
        })
      }
    })
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
    console.log(that.data.favorList[index])
    // console.log('testnow:'+JSON.stringify(that.data.favorList))
    //
    if (that.data.favorList[index].type === 'dir') {
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.favorList[index].sign
      })
    } else {
      wx.downloadFile({

        url: myURL + '/courseware?openid=' + app.globalData.openid + '&courseware=' + JSON.stringify(that.data.favorList[index]),

        success(res) {
          console.log(res.statusCode)
          const filePath = res.tempFilePath
          var fileType = that.data.favorList[index].type

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
        courseware: JSON.stringify(that.data.favorList[index]),
      },
      success(res) {
        console.log(res.data)
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

  sendFile: function(e) { //转发课件
    util.windowInfo()
  },


  favourites: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    var that = this
    that.data.favorList[index].favourite = true
    that.setData({
      favorList: that.data.favorList
    })
    wx.request({
      url: myURL + '/favourite/courseware',
      data: {
        openid: app.globalData.openid,
        courseware: JSON.stringify(that.data.favorList[index]),
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
    that.data.favorList[index].favourite = false
    that.setData({
      favorList: that.data.favorList
    })
    wx.request({
      url: myURL + '/favourite/courseware',
      data: {
        openid: app.globalData.openid,
        courseware: JSON.stringify(that.data.favorList[index]),
        mode: 'del',
      },
      success: function(res) {
        //取消收藏成功
        console.log("取消收藏课件成功")
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  }
})