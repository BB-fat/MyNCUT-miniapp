// pages/homework/homework.js
import {
  myURL
} from "../../setting.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // homeList_all:'',
    homeList: '',
    course_name: '',
    // joint: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // console.log(options.homeList_all)
    var temp=JSON.parse(options.homeList_all)
    console.log(temp)
    that.setData({
      course_name: options.course_name,
      homeList_all: temp
    })
    console.log(that.data.homeList_all)
    wx.setNavigationBarTitle({
      title: that.data.course_name,
    })
    console.log(app.globalData.openid)

    for (var key in that.data.homeList_all) {
      console.log(that.data.course_name)
      console.log(key)
      if (that.data.course_name == key) {       
        that.setData({
          homeList: that.data.homeList_all[key],
          // end_date: that.data.homeList_all[key].end_date
        })
        break
      }
    }
    console.log(that.data.homeList)
  },


/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

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

}
})