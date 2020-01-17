// pages/idel-my/idel-my.js
import {Requests} from "../../utils/Requests"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let that=this
    Requests.getWithCache({
      url:"/user",
      success(data){
        Requests.get({
          url:"/idle",
          data:{
            owner:data.sno
          },
          success(data){
            that.setData({
              goods:data
            })
          }
        })
      }
    })
  },
})