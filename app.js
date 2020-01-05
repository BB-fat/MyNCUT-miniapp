//app.js
import {
  Follow
} from "./utils/Follow"
App({
  globalData: {},
  onLaunch: function () {
    Follow.init()
  }
})