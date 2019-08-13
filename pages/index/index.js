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
    btn_kebiao: {
      icon: "/img/index/kebiao.svg",
      text: "课表",
      url: "../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_kecheng"
    },
    btn_jiaoshi: {
      icon: "/img/index/jiaoshi.svg",
      text: "教室",
      url: "../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_room/emroom/index"
    },
    btn_chengji: {
      icon: "/img/index/chengji.svg",
      text: "成绩",
      url: "../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_score"
    },
    btn_jidian: {
      icon: "/img/index/jidian.svg",
      text: "绩点",
      url: "../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_kecheng/grade/list"
    },
    btn_xuefen: {
      icon: "/img/index/xuefen.svg",
      text: "学分",
      url: "../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_exam/default/graduate"
    },
    btn_gengduo: {
      icon: "/img/index/xinshengbibei.svg",
      text: "新生必备",
      url: "../welcome/welcome"
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

  //跳转到迎新页面
  toWelcome: function () {
    wx.navigateTo({
      url: '../welcome/welcome'
    })
  }
})