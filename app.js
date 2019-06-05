//app.js

import {
  myURL
} from "setting.js"

App({
  globalData:{
  },
  onLaunch:function(){
    wx.cloud.init()
  }
})