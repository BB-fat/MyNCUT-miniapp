// pages/uploadPic/uploadPic.js

import {
  myURL
} from "../../setting.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  upload: function() {
    wx.chooseImage({
      sizeType: ['original'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '上传中',
        })
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: myURL + '/uploadpic', // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'wenyipic',
            success(res) {
              if (i == tempFilePaths.length) {
                wx.showToast({
                  title: '上传成功',
                  icon: "success",
                })
                setTimeout(function() {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 1000)
              }
            }
          })
        }
      }
    })
  },
})