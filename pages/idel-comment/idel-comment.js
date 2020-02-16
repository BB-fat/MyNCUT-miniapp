import {
  Requests
} from "../../utils/Requests"

// pages/idel-comment/idel-comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    placeholder: "请输入评论"
  },

  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options._id != undefined) {
      Requests.get({
        url: "/idel-comment",
        data: {
          _id: options._id
        },
        success(data) {
          that.setData({
            comment: data,
            placeholder: "回复@" + data.from.nickName
          })
        }
      })
    } else if (options.good_id != undefined) {
      that.setData({
        good_id: options.good_id
      })
    }
  },

  submit: function () {
    let that = this
    if (that.data.good_id == undefined) {
      Requests.post({
        url: "/idel-comment/" + that.data.comment.good_id,
        data: {
          reply_id: that.data.comment._id,
          to_openid: that.data.comment.from_openid,
          content: that.data.content
        },
        success(data) {
          wx.showToast({
            title: '成功',
          })
          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
        }
      })
    } else {
      Requests.post({
        url: "/idel-comment/" + that.data.good_id,
        data: {
          reply_id: 0,
          to_openid: 0,
          content: that.data.content
        },
        success(data) {
          wx.showToast({
            title: '成功',
          })
          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
        }
      })
    }
  },
})