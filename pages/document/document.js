// pages/document/document.js
import { myURL} from "../../setting.js"
const app=getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    courseList:'',
    course_code:'',
    status:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that=this
    that.setData({
      course_code:options.course_code
    })
    wx.request({
      url: myURL +'/coursewarelist',
      // url: "http://v.ncut.edu.cn/document?code=2019_S_7002501_2019S510015",
      data:{
        openid: app.globalData.openid,
        coursecode:that.data.course_code
      },
      success:function(res){
        var courseTemp=[]
        Object.keys(res.data.data).forEach(function(key){
          courseTemp.push(Object.assign({"file_name":key.slice(1)},res.data.data[key]))
        })
        that.setData({
          courseList:courseTemp
        })
        console.log(courseTemp)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  saveFile:function(e){
    var index = e.currentTarget.dataset.index
    var that=this
    var file_type = that.data.courseList[index].file_name.match(/[^.]*(\.*)$/g)
    console.log(file_type[0])
    //
    console.log('testnow:'+JSON.stringify(that.data.courseList[index]))
    //
    if(that.data.courseList[index].type==='dir'){
      wx.navigateTo({
        url: '/pages/document/document?code=' + course_code + 'item' + that.data.courseList[index].sign
      })
    }else{
      wx.downloadFile({
        // 示例 url，并非真实存在
        // url: that.data.courseList[index].url,
        url: myURL + '/courseware?openid=' + app.globalData.openid + '&course=' + JSON.stringify(that.data.courseList[index]),
        // data:{
        //   openid:app.globalData.openid,
        //   // course: that.data.courseList[index]
        //   course: JSON.stringify(that.data.courseList[index])
        // },
        success(res) {
          console.log("success")
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath,
            fileType: 'ppt',
            success(res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  favourites:function(e){
    var index = e.currentTarget.dataset.index
    var that = this
    wx.request({
      url: myURL + '/favourites/courseware',
      data: {
        openid: app.globalData.openid,
        course: JSON.stringify(that.data.courseList[index]),
        mode: 'del'
      },
      success: function (res) {
        //收藏课件成功
        console.log("收藏课件成功")
      }
    })
  },
  unfavourites:function(e){
    var index = e.currentTarget.dataset.index
    var that = this
    wx.request({
      url: myURL +'/favourites/courseware',
      data:{
        openid: app.globalData.openid,
        course: JSON.stringify(that.data.courseList[index]),
        mode:'del'
      },
      success:function(res){
        //取消收藏成功
        console.log("取消收藏课件成功")
      }
    })
  }
})