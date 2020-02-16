// pages/idel-detail/idel-detail.js
import {
  Requests
} from "../../utils/Requests"

const app=getApp()

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
    this.setData({
      _id: options._id,
      contentHeight:app.globalData.systemInfo.windowHeight
    })
    let that = this
    //请求商品信息
    Requests.get({
      url: "/idle",
      data: {
        _id: that.data._id
      },
      success(data) {
        data[0].time = data[0].time.split(".")[0]
        that.setData({
          good: data[0]
        })
        Requests.getWithCache({
          url: "/user/" + that.data.good.owner,
          success(data) {
            that.setData({
              owner: data
            })
          }
        })
      }
    })
  },

  onShow: function () {
    let that = this
    // 请求评论数据
    Requests.get({
      url: "/idel-comment/" + that.data._id,
      success(data) {
        for (var i = 0; i < data.length; i++) {
          data[i].create_time = data[i].create_time.split(".")[0]
        }
        that.setData({
          comments: data
        })
      }
    })
  },

  tapImg: function (e) {
    wx.previewImage({
      urls: this.data.good.photos,
      current: e.currentTarget.dataset.url
    })
  },

  contact: function () {
    let that = this
    wx.showModal({
      title: "联系方式",
      content: this.data.good.contact,
      confirmText: "复制",
      confirmColor: "#276DED",
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: that.data.good.contact,
            success(res) {
              wx.showToast({
                title: '已复制联系方式',
              })
            }
          })
        }
      }
    })
  },

  toComment:function(){
    wx.navigateTo({
      url: Requests.makeUrl("/pages/idel-comment/idel-comment",{
        good_id:this.data._id
      }),
    })
  }
})