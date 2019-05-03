import {
  myURL
} from "../setting.js"
const app = getApp()

export function myMap(that) {
  var courseArray = []
  var favorArray = []
  for (let i in that.data.courseList) {
    courseArray.push(that.data.courseList[i].course_code)
  }
  wx.request({ //数字实时更新 每次onshow请求
    url: myURL + '/favourite/get',
    data: {
      openid: app.globalData.openid
    },
    success(res) {
      if(res.data.length==0)
      {
        that.setData({
          showInfo:true
        })
      }
      favorArray = courseArray.map(function(item, index) {
        var num = 0
        for (var i in res.data) {
          if (item == res.data[i].coursecode)
            num++
        }
        return num
      })
      that.setData({
        favorArray: favorArray,
        favorList: res.data,
        favorList_tmp:res.data,
      })
    }
  })
}