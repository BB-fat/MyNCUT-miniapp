import { myURL } from "../setting.js"
const app = getApp()

export function lookFile(courseware) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  var supportList=['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt']
  if(supportList.indexOf(courseware.type)==-1){
    wx.showToast({
      title: '该文件类型不支持预览',
      icon:"none"
    })
    return
  }
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
      })
    },
  })
}

export function downloadFile(courseware) {
  wx.request({
    url: myURL + '/reqdownload',
    data: {
      openid: app.globalData.openid,
      courseware: JSON.stringify(courseware)
    },
    success(res) {
      console.log(res.data)
      var wareURL = myURL + '/download?id=' + res.data
      wx.showModal({
        title: '复制以下链接到浏览器下载',
        content: wareURL,
        confirmText: '复制',
        success(res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: wareURL,
              success() {
                wx.showToast({
                  title: '复制成功',
                  icon: 'success'
                })
              }
            })
          }
        }
      })
    },
    fail(res) {
      wx.showToast({
        title: '下载链接消失了',
        icon: 'none',
      })
    }
  })
}

export function onFavor(courseware){
  wx.request({
    url: myURL + '/favourite/courseware',
    data: {
      openid: app.globalData.openid,
      courseware: JSON.stringify(courseware),
      mode: 'add'
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}

export function offFavor(courseware){
  wx.request({
    url: myURL + '/favourite/courseware',
    data: {
      openid: app.globalData.openid,
      courseware: JSON.stringify(courseware),
      mode: 'del',
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}