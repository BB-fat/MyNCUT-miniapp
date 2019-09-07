// pages/document/document.js
import {
  myURL
} from "../../setting.js"

import {
  lookFile,
  downloadFile,
  onFavor,
  offFavor
} from "../../utils/document.js"

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    inform_loading: true,
    searchInfo: false,
    showDownloadGuide:false,
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let that = this

    //控制下载指引显示
    wx.getStorage({
      key: 'DownloadGuide',
      fail () {
        that.setData({
          DownloadGuide:true
        })
      }
    })

    //检测显示首次访问的引导
    wx.getStorage({
      key: 'HaveVisited',
      fail () {
        that.setData({
          FirstVisit:true
        })
      }
    })

    that.data.nowData = JSON.parse(options.nowData)
    // 设定标题显示课程名，如果是文件夹显示文件夹名
    if (that.data.nowData.course_name!=undefined){
      wx.setNavigationBarTitle({
        title: that.data.nowData.course_name,
      })
    }else{
      wx.setNavigationBarTitle({
        title: that.data.nowData.file_name,
      })
    }
    var reqData = {
      openid: app.globalData.openid,
      mode: options.type
    }
    if (options.type == 'all') {
      reqData['course_code'] = that.data.nowData.course_code
    } else if (options.type == 'dir') {
      reqData['courseware'] = options.nowData
    }
    wx.request({
      url: myURL + '/coursewarelist',
      data: reqData,
      success: function(res) {
        if (res.data == null) {
          wx.showToast({
            title: '该课程无课件',
            icon: 'none',
          })
          setTimeout(function() {
            wx.navigateBack()
          }, 1500)
        } else {
          that.setData({
            coursewareList: res.data,
            coursewareList_tmp: res.data, //为搜索做准备            
            inform_loading: false,
          })
          //检测首次引导，是否启动动画
          if(that.data.FirstVisit){
            //控制view渐变出现
            var ani_FirstVisitView=wx.createAnimation({
              duration:900,
              timingFunction:"ease"
            })
            ani_FirstVisitView.opacity(1).step()
            that.setData({
              ani_FirstVisitView:ani_FirstVisitView.export()
            })
            //控制手动作
            setTimeout(function(){
              var ani_FirstVisitHand=wx.createAnimation({
                duration:600,
                timingFunction:"linear"
              })
              ani_FirstVisitHand.top("140rpx").step()
              ani_FirstVisitHand.scale(0.9).step()
              ani_FirstVisitHand.scale(1).step()
              that.setData({
                ani_FirstVisitHand:ani_FirstVisitHand.export()
              })
            },900)
            //控制view渐变消失
            setTimeout(function(){
              var ani_FirstVisitView=wx.createAnimation({
                duration:900,
                timingFunction:"ease"
              })
              ani_FirstVisitView.opacity(0).step()
              that.setData({
                ani_FirstVisitView:ani_FirstVisitView.export()
              })
            },2200)
            // 设定用户不是第一次访问的状态
            setTimeout(function(){
              that.setData({
                FirstVisit:false
              })
              wx.setStorage({
                key:"HaveVisited",
                data:true
              })
            },3100)
          }
        }
      }
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function(res) {
    var courseware = this.data.coursewareList[res.target.dataset.index]
    if (res.from === 'button') {
      return {
        title: courseware.file_name,
        path: '/pages/index/index?courseware=' + JSON.stringify(courseware),
        imageUrl: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/share.png"
      }
    }
  },

  lookFile: function(e) {
    var index = e.currentTarget.dataset.index
    lookFile(this.data.coursewareList[index])
  },

  downFile: function(e) { //下载课件
    let that = this
    if(that.data.DownloadGuide){
      that.setData({
        showDownloadGuide:true
      })
      var ani_DownloadGuide=wx.createAnimation({
        duration:500,
        timingFunction:"ease"
      })
      ani_DownloadGuide.scale(1).opacity(1).step()
      this.setData({
        ani_DownloadGuide:ani_DownloadGuide.export()
      })
    }else{
      var index = e.currentTarget.dataset.index
      downloadFile(that.data.coursewareList[index])  
    }
  },

  favourites: function(e) {
    var that = this
    var filename = e.currentTarget.dataset.filename
    var index = e.currentTarget.dataset.index
    that.data.coursewareList[index].favourite = true
    that.setData({
      coursewareList: that.data.coursewareList,
    })
    for (var i in that.data.coursewareList_tmp) {
      if (that.data.coursewareList_tmp[i].file_name == filename) {
        that.data.coursewareList_tmp[i].favourite = true
        break
      }
    }
    onFavor(that.data.coursewareList[index])
  },

  unfavourites: function(e) {
    var that = this
    var filename = e.currentTarget.dataset.filename
    var index = e.currentTarget.dataset.index
    that.data.coursewareList[index].favourite = false
    that.setData({
      coursewareList: that.data.coursewareList,
    })
    for (var i in that.data.coursewareList_tmp) {
      if (that.data.coursewareList_tmp[i].file_name == filename) {
        that.data.coursewareList_tmp[i].favourite = false
        break
      }
    }
    offFavor(that.data.coursewareList[index])
  },

  search: function(e) { //搜索   
    let that = this
    var myStore = that.data.coursewareList_tmp
    if (e.detail.value.length == 0) {
      that.setData({
        searchInfo: false,
        coursewareList: myStore,
      })
    } else {
      var queryList = []
      var inputValue = e.detail.value
      for (var i = 0; i < myStore.length; i++) {
        var name = myStore[i].file_name
        if (name.search(inputValue) != -1) {
          queryList.push(myStore[i])
        }
      }
      if (queryList.length == 0) {
        that.setData({
          searchInfo: true
        })
      } else {
        that.setData({
          searchInfo: false,
          coursewareList: queryList,
        })
      }
    }
  },

  ignorePrompting: function (e) {
    this.setData({
        ignore: !!e.detail.value.length
    });
  },

  tapGuide:function(){
    let that=this
    if(that.data.ignore==true){
      wx.setStorage({
        key:"DownloadGuide",
        data:true
      })
    }
    that.setData({
      showDownloadGuide:false,
      DownloadGuide:false
    })
  },
})