// pages/iclass/iclass.js
const app = getApp()
import { myURL} from "../../setting.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this
    //todo：要获取openid
    wx.request({
      url: myURL +'/courselist',
      // url:"http://v.ncut.edu.cn/course?sno=17152010120",
      data:{
        openid:app.globalData.openid
      },
      success:function(res){
        that.setData({
          courseList:res.data.data
        })
        console.log(res.data.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getDocument:function(e){
    var course_code=e.currentTarget.dataset.course_code
    wx.navigateTo({
      url: '/pages/document/document?course_code='+course_code,
    })
  }
})