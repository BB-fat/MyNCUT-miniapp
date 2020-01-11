import {
  Requests
} from "../../utils/Requests"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   let that = this
  //   if (options.mode == "yunschool") {
  //     wx.login({
  //       success(res1) {
  //         if (res1.code) {
  //           setTimeout(() => {
  //             that.setData({
  //               url: "https://ucpay.ncut.edu.cn/open/user/oauth/index?redirect=" + Requests.baseUrl + "/auth&appid=31b1e992583074382&state=" + res1.code,
  //               show: 1
  //             })
  //           }, 2000)
  //         } else {
  //           console.log('登录失败！' + res1.errMsg)
  //         }
  //       }
  //     })
  //   } else if (options.mode == "wechat") {
  //     if (Requests.token == null) {
  //       Requests.refreshToken(() => {})
  //     }
  //     that.setData({
  //       show: 2
  //     })
  //   }
  // },

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
})