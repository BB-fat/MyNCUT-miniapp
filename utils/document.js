import {myURL} from "../setting.js"
const app=getApp()

export function lookFile(courseware) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.downloadFile({
    url: myURL + '/courseware?openid=' + app.globalData.openid + '&courseware=' + JSON.stringify(courseware),

    success(res) {
      const filePath = res.tempFilePath
      var fileType = courseware.type
      wx.openDocument({
        filePath,
        fileType: fileType,
        success(res) {
          wx.hideLoading()
          console.log('打开文档成功')
        },
        fail(res) {
          wx.showToast({
            title: '该文件类型不支持预览，请下载',
            icon: 'none',
          })
          console.log('打开文档失败')
        }
      })
    },
  })
}