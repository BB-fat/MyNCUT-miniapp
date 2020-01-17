// pages/idel-detail/idel-detail.js
import {
  Requests
} from "../../utils/Requests"
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
    let that = this
    Requests.get({
      url: "/idle",
      data: {
        _id: options._id
      },
      success(data) {
        data[0].time=data[0].time.split(".")[0]
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

  tapImg:function(e){
    wx.previewImage({
      urls: this.data.good.photos,
      current:e.currentTarget.dataset.url
    })
  },

  contact:function(){
    let that=this
    wx.showModal({
      title:"联系方式",
      content:this.data.good.contact,
      confirmText:"复制",
      confirmColor:"#276DED",
      success(res){
        if(res.confirm){
          wx.setClipboardData({
            data:that.data.good.contact,
            success(res){
              wx.showToast({
                title: '已复制联系方式',
              })
            }
          })
        }
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