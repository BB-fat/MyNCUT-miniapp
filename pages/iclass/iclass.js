// pages/iclass/iclass.js
const app = getApp()
import {
  myURL
} from "../../setting.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this
    //todo：要获取openid
    wx.request({
      url: myURL + '/courselist',
      // url:"http://v.ncut.edu.cn/course?sno=17152010120",
      data: {
        openid: app.globalData.openid
      },
      success: function(res) {
        // console.log(res.data[0])
        that.setData({
          courseList: res.data
        })
        console.log(res.data)
      }
    })

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

  },

  getDocument: function(e) {
    // let that = this
    // console.log(that.data.courseList)
    var course_code = e.currentTarget.dataset.course_code
    var course_name = e.currentTarget.dataset.course_name
    wx.navigateTo({
      url: '../document/document?course_code=' + course_code + '&course_name=' + course_name,
    })
  },

  toTop:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    var tmp=this.data.courseList.splice(index,1)
    console.log(tmp)
    this.data.courseList.unshift(tmp[0])
    this.setData({
      courseList:this.data.courseList
    })
  },
})