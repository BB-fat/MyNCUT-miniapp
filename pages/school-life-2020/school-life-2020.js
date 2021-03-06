// pages/school-life-2020/school-life-2020.js
import {
  Requests
} from "../../utils/Requests";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    判断是否已经授权个人信息
    如果已经授权就更新一次信息
    没有授权弹出提示授权框
    不允许不让过！！！
    */

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        console.log(userInfo);
        // 向服务器提交用户最新的数据
        Requests.put({
          url: "/user",
          data: {
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
          },
          success(data) {
            wx.navigateTo({
              url: '../school-life-2020-web/school-life-2020-web?token=' + Requests.token,
            })
          }
        });
      },
      fail: function (res) {
        console.log("getUserInfo fail");
      }
    })
  },

  // 获取用户信息回调
  tapGetUserInfo: function (e) {
    let that = this;
    if (e.detail.userInfo === undefined) {
      console.log("user refused getUserInfo");
      // 未同意
      wx.showToast({
        title: '请同意后进入点滴校园',
        icon: "none"
      })
    } else {
      // 同意后向服务器提交userInfo
      // 然后将页面切换成H5
      console.log("user agreed getUserInfo");
      console.log(e.detail.userInfo);
      Requests.put({
        url: "/user",
        data: {
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
        },
        success(data) {
          wx.navigateTo({
            url: '../school-life-2020-web/school-life-2020-web?token=' + Requests.token,
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})