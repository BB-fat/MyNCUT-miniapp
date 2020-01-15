// pages/idel-create/idel-create.js
import {
  Requests
} from "../../utils/Requests"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    describe: "",
    photos: []
  },

  input: function (e) {
    this.setData({
      describe: e.detail.value
    })
  },


  upload: function (e) {
    this.data.photos.push(e)
    this.setData({
      photos: this.data.photos
    })
  },

  delete: function (e) {
    this.data.photos.pop(this.data.photos.indexOf(e))
    this.setData({
      photos: this.data.photos
    })
  },

  inputPrice: function (e) {
    this.setData({
      price: e
    })
  },

  inputTitle: function (e) {
    this.setData({
      title: e
    })
  },

  inputContact: function (e) {
    this.setData({
      contact: e
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      upload: that.upload,
      delete: that.delete,
      inputPrice: that.inputPrice,
      inputTitle: that.inputTitle,
      inputContact: that.inputContact
    })
  },

  submit: function () {
    if (this.data.describe.length < 15) {
      wx.showToast({
        title: '请输入至少15字描述',
        icon: "none"
      })
      return
    } else if (this.data.photos.length == 0) {
      wx.showToast({
        title: '请至少上传一张图片',
        icon: "none"
      })
      return
    } else if (this.data.price == undefined) {
      wx.showToast({
        title: '请输入价格',
        icon: "none"
      })
      return
    } else if (this.data.title == undefined) {
      wx.showToast({
        title: '请输入标题',
        icon: "none"
      })
      return
    } else if (this.data.contact == undefined) {
      wx.showToast({
        title: '请输入联系方式',
        icon: "none"
      })
      return
    }
    Requests.post({
      url: "/idle",
      data: {
        title: this.data.title,
        price: this.data.price,
        contact: this.data.contact,
        photos: this.data.photos,
        describe: this.data.describe
      },
      success(data) {
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(() => {
          wx.navigateBack({})
        }, 1000)
      }
    })
  }
})