// pages/index/index.js

var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"
import {
  checkAuth,
  goAuth
} from '../../utils/login.js'

import {
  lookFile,
} from "../../utils/document.js"

var app = getApp()


Page({
  data: {
    authed: true,
    btn_kebiao:{
      icon:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/index/课表.svg",
      text:"课表",
      url:"../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_kecheng"
    },
    btn_jiaoshi:{
      icon:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/index/教室.svg",
      text:"教室",
      url:"../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_room/emroom/index"
    },
    btn_chengji:{
      icon:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/index/成绩.svg",
      text:"成绩",
      url:"../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_score"
    },
    btn_jidian:{
      icon:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/index/绩点.svg",
      text:"绩点",
      url:"../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_kecheng/grade/list"
    },
    btn_xuefen:{
      icon:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/index/学分.svg",
      text:"学分",
      url:"../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_exam/default/graduate"
    },
    btn_gengduo:{
      icon:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/index/更多.svg",
      text:"更多",
      url:""
    },
  },

  // 查看使用许可
  seeLicense: function () {
    wx.downloadFile({
      url: myURL + "/static/license.pdf",
      success(res) {
        wx.openDocument({
          filePath: res.tempFilePath,
          fileType: "pdf"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.courseware != null) {
      lookFile(JSON.parse(options.courseware))
    }
    wx.request({
      url: myURL + '/publicinfo',
      success(res) {
        that.setData({
          indexBanner: res.data.indexBanner,
          indexNotice: res.data.indexNotice
        })
      },
      fail(res) {
        console.log('banner&notice fail')
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    checkAuth(this)
  },

  toAuth: function () {
    goAuth()
  },


  //轮播图点击事件
  swipclick: function (e) {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=' + this.data.indexBanner[e.currentTarget.dataset.index]['msgUrl']
    })
  },

  //跳转到迎新页面
  toWelcome: function () {
    wx.navigateTo({
      url: '../welcome/welcome'
    })
  }
})