import {
  myURL
} from "../../setting.js"

Page({
  data: {
    banner: [{
      image:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/b1.png",
      url:myURL+"/static/html/test.html"
    }, {
      image:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/b2.jpg",
      url:myURL+"/static/html/test.html"
    }, {
      image:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/b3.png",
      url:myURL+"/static/html/test.html"
    }
  ]
  },

  jump:function(e){
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=' + e.currentTarget.dataset.url,
    })
  }
})