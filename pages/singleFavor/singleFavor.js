// pages/singleFavor/singleFavor.js
var util = require('../../utils/util.js')
import {
  myURL
} from "../../setting.js"

import {
  lookFile,
  downloadFile,
  onFavor,
  offFavor
} from "../../utils/document.js"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfo: false,   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.course_name,
    })
    that.setData({
      course_code: options.course_code,
      favorList: JSON.parse(options.favorList),
      favorList_tmp: JSON.parse(options.favorList)
    })
  },

//   timeTransform: function (timestamp) {
//     var date = new Date(timestamp * 1000)
//     var Y = date.getFullYear() + '-'
//     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
//     var D = date.getDate() + ' '
//     var h = date.getHours() + ':'
//     var m = date.getMinutes() + ':'
//     var s = date.getSeconds()
//     return Y + M + D + h + m + s    
// },

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
  if (that.data.favorList[index].type === 'dir') {
    wx.navigateTo({
      url: '/pages/document/document?code=' + course_code + 'item' + that.data.favorList[index].sign
    })
  } else {
    var flag =false
    for (var i in app.globalData.supportList)
    {
      if (that.data.favorList[index].type == app.globalData.supportList[i])
      {
        flag = true
        break
      }        
    }
    if(flag==true)
       lookFile(that.data.favorList[index])
    else{
      wx.showToast({
        title: '该文件类型不支持预览，请下载',
        icon: 'none',
      })
      console.log('打开文档失败')
    }
  }
},

downFile: function(e) { //下载课件
  let that = this
  var index = e.currentTarget.dataset.index
  downloadFile(that.data.favorList[index])
},

favourites: function(e) {
  var filename = e.currentTarget.dataset.filename
  var index = e.currentTarget.dataset.index
  var that = this
  that.data.favorList[index].favourite = true
  that.setData({
    favorList: that.data.favorList,
  })
  for (var i in that.data.favorList_tmp) {
    if (that.data.favorList_tmp[i].file_name == filename) {
      that.data.favorList_tmp[i].favourite = true
      break
    }
  }
  onFavor(that.data.favorList[index])
},

unfavourites: function(e) {
  var filename = e.currentTarget.dataset.filename
  var index = e.currentTarget.dataset.index
  var that = this
  that.data.favorList[index].favourite = false
  that.setData({
    favorList: that.data.favorList,
  })
  for (var i in that.data.favorList_tmp) {
    if (that.data.favorList_tmp[i].file_name == filename) {
      that.data.favorList_tmp[i].favourite = false
      break
    }
  }
  offFavor(that.data.favorList[index])
},

search: function(e) { //搜索
  let that = this
  var myStore = that.data.favorList_tmp
  if (e.detail.value.length == 0) {
    that.setData({
      searchInfo: false,
      favorList: myStore,
    })
  } else {
    var queryList = []
    var inputValue = e.detail.value
    for (var i = 0; i < myStore.length; i++) {
      if (myStore[i].coursecode == that.data.course_code) {
        var name = myStore[i].file_name
        for (var j = 0; j <= name.length - inputValue.length; j++) {
          if (name.substr(j, inputValue.length) == inputValue) {
            queryList.push(myStore[i])
            break
          }
        }
      }
    }
    // console.log(queryList)
    if (queryList.length == 0) {
      that.setData({
        searchInfo: true
      })
    } else {
      that.setData({
        searchInfo: false,
        favorList: queryList,
      })
    }
  }
}
})