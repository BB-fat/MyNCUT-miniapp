// pages/myFavor/myFavor.js
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

  onShareAppMessage: function(res) {
    var courseware = this.data.favorList[res.target.dataset.index]
    if (res.from === 'button') {
      return {
        title: courseware.file_name,
        path: '/pages/iclass/iclass?courseware=' + JSON.stringify(courseware),
        imageUrl: "../../imgs/share.png"
      }
    }
  },

  lookFile: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(that.data.favorList[index])
    if (that.data.favorList[index].type === 'dir') {
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.favorList[index].sign
      })
    } else {
      lookFile(that.data.favorList[index])
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
})