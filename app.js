//app.js
import {
  Follow
} from "./utils/Follow"

App({
  globalData: {},
  onLaunch: function () {
    let that = this
    Follow.init()
    wx.cloud.init()
    wx.getSystemInfo({
      success(res) {
        that.globalData.systemInfo = res
      },
    })
  }
})