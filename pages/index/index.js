// pages/index/index.js

import {
  myURL
} from "../../setting.js"

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn1:{
      btnWidth:299,
      btnHeight:192,
      mgtopbtn:6,
      fontsize:35,
      tapFunc:"toClassTable",
      mgtopimg:10,
      imgWidth:95,
      imgHeight:106,
      imgUrl:"../../imgs/index/course.png",
      pdtoptxt:40,
      mglefttxt:22,          
      btnTxt:"课表"
    },
    btn2: {
      btnWidth: 302,
      btnHeight: 152,
      mgleftbtn: 44,
      fontsize: 30,
      tapFunc: "toGradePoint",
      imgWidth: 69,
      imgHeight: 69,
      mgtopimg: 15,     
      imgUrl: "../../imgs/index/average.png",      
      mglefttxt: 22,
      pdtoptxt: 10,
      btnTxt: "绩点"
    },
    btn3: {
      position:"absolute",
      btnWidth: 299,
      btnHeight: 105,
      mgtopbtn: 36,
      fontsize: 30,
      tapFunc: "toGrade",
      imgWidth: 51,
      imgHeight: 51,
      mgtopimg: 22,
      imgUrl: "../../imgs/index/grade.png",
      mglefttxt: 11,
      pdtoptxt: 5,
      btnTxt: "成绩"
    },
    btn4: {
      position: "absolute",
      btnWidth: 129,
      btnHeight: 135,
      mgtopbtn: 7,
      mgleftbtn:345,
      fontsize: 25,
      tapFunc: "toGraduate",
      imgWidth: 77,
      imgHeight: 57,
      imgViewW:120,
      imgViewH:50,
      mgtopimgView: 19,
      imgUrl: "../../imgs/index/graduate.png",
      txtWidth:120,
      btnTxt: "毕业要求"
    },
    btn5: {
      position: "absolute",
      btnWidth: 129,
      btnHeight: 135,
      mgtopbtn: 7,
      mgleftbtn: 518,
      fontsize: 25,
      tapFunc: "toClassroom",
      imgWidth: 64,
      imgHeight: 56,
      imgViewW: 120,
      imgViewH: 50,
      mgtopimgView: 19,
      imgUrl: "../../imgs/index/room.png",
      txtWidth: 120,
      mgtoptxt:2,
      btnTxt: "教室"
    },
    indidots: true,
    idcolor: "#FFFFFF",
    autoplay: true,
    circular: true,    
    interval: 2600,
    duration: 1000,
    notice: '../../imgs/index/notice.png',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    wx.request({

      url: myURL+'/publicinfo',
      success(res){        
        that.setData({
          indexBanner:res.data.indexBanner,
          indexNotice:res.data.indexNotice
        })
      }
    })

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
    // 在缓存中查找userInfo
    wx.getStorage({
      key: 'userInfo',
      // 没有userInfo向服务器请求用户数据
      success(res) {
        console.log("success get userInfo")
        console.log(res.data)
      },
      fail() {
        wx.request({
          url: myURL + '/login/openid',
          data: {
            openid: app.globalData.openid
          },
          success(res) {
            console.log(res.data)
            // 返回值非空时设定缓存
            if (res.data != null) {
              wx.setStorage({
                key: 'userInfo',
                data: res.data.userInfo,
              })
              wx.setStorage({
                key: 'openid',
                data: app.globalData.openid,
              })
            }
          }
        })
      }
    })
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

  },

  //轮播图点击事件
  swipclick: function(e) {    
    var url = '../webview/webview?mode=normal&url='+this.data.indexBanner
    wx.navigateTo({
      url: url
    })
  },

  // 跳转至课表
  toClassTable: function() {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_kecheng',
    })
  },

  // 跳转至绩点
  toGradePoint: function() {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_kecheng/grade/list',
    })
  },

  // 跳转至成绩
  toGrade: function() {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_score',
    })
  },

  // 跳转至毕业要求
  toGraduate: function() {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_exam/default/graduate',
    })
  },

  // 跳转至教室
  toClassroom: function() {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=https://app.ncut.edu.cn/w_room/emroom/index',
    })
  },

})