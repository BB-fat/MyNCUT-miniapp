import {
  myURL
} from "../../setting.js"

Page({
  data: {
    xiaoji: [
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/团委_icon.jpg",
        url: myURL + "/static/html/zuzhi/xiaotuanwei.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/校会logo_icon.jpg",
        url: myURL + "/static/html/zuzhi/xiaohui.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/社联_icon.jpg",
        url: myURL + "/static/html/zuzhi/shelian.html"
      },
      {
        img:"cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/艺术团_icon.png",
        url: myURL + "/static/html/zuzhi/yishutuan.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/国旗班_icon.jpg",
        url: myURL + "/static/html/zuzhi/guoqiban.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/广播台_icon.jpg",
        url: myURL + "/static/html/zuzhi/guangbotai.html"
      },
    ],
    yuanji: [
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/信息_icon.jpg",
        url: myURL + "/static/html/zuzhi/xinxi.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/电控_icon.jpg",
        url: myURL + "/static/html/zuzhi/diankong.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/机材_icon.jpg",
        url: myURL + "/static/html/zuzhi/jicai.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/建艺_icon.jpg",
        url: myURL + "/static/html/zuzhi/jianyi.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/土木_icon.jpg",
        url: myURL + "/static/html/zuzhi/tumu.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/经管_icon.jpg",
        url: myURL + "/static/html/zuzhi/jingguan.html"
      }, {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/文法_icon.jpg",
        url: myURL + "/static/html/zuzhi/wenfa.html"
      },
      {
        img: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/system/理学院_icon.jpg",
        url: myURL + "/static/html/zuzhi/lixueyuan.html"
      },
    ]
  },

  jump: function (e) {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=' + e.currentTarget.dataset.url,
    })
  },

  showPoster:function(){
    var ani=wx.createAnimation({
      duration:1000,
      timingFunction:"ease"
    })
    ani.scale(1).opacity(1).step()
    this.setData({
      ani:ani.export()
    })
  },
  hidePoster:function(){
    var ani=wx.createAnimation({
      duration:1000,
      timingFunction:"ease"
    })
    ani.scale(0).opacity(0).step()
    this.setData({
      ani:ani.export()
    })
  }
})