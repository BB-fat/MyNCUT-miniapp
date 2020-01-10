import {
  Requests
} from "../../utils/Requests"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.mode == "yunschool") {
      wx.login({
        success(res1) {
          if (res1.code) {
            setTimeout(() => {
              that.setData({
                url: "https://ucpay.ncut.edu.cn/open/user/oauth/index?redirect=" + Requests.baseUrl + "/auth&appid=31b1e992583074382&state=" + res1.code,
                show: 1
              })
            }, 2000)
          } else {
            console.log('登录失败！' + res1.errMsg)
          }
        }
      })
    } else if (options.mode == "wechat") {
      if (Requests.token == null) {
        Requests.refreshToken(() => {})
      }
      that.setData({
        show: 2
      })
    }
  },

  tapButton: function (e) {
    Requests.put({
      url: "/user",
      data: {
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
      },
      success(data) {
        wx.navigateBack()
      }
    })
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