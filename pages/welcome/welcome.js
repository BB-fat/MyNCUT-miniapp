import {
  myURL
} from "../../setting.js"

Page({
  data: {
    banner: [{
      image: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/b1.png",
      url: myURL+'/static/html/zuzhi/jingguan.html'
    }, {
      image: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/b2.jpg",
      url: myURL+'/static/html/zuzhi/jingguan.html'
    }, {
      image: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/b3.png",
      url: myURL+'/static/html/zuzhi/jingguan.html'
    }
    
    ],
    zhengjian: {
      img: 'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/证件.jpg', 
      text: '证件', 
      url: myURL+'/static/html/test.html'
    },
    ruzhu:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/入住.jpg',
      text:'入住'
    },
    xuexi:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/学习.jpg',
      text:'学习'
    },
    gaikuang:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/概况.jpg',
      text:'概况',
      width:276
    },
    ditu:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/地图.jpg',
      text:'地图',
      width:276
    },
    zuzhi:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/学生组织.jpg',
      text:'学生组织',
      url:"../zuzhi/zuzhi"
    },
    shitang:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/食堂.jpg',
      text:'食堂'
    },
    gongyu:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/公寓.jpg',
      text:'公寓'
    },
    fuwu:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/服务.jpg',
      text:'服务'
    },
    jiaotong:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/交通.jpg',
      text:'交通'
    },
    tushuguan:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/图书馆.jpg',
      text:'图书馆'
    },
    tiyuguan:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/体育馆.jpg',
      text:'体育馆'
    },
    chihe:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/吃喝.jpg',
      text:'吃喝',
      width:276,
      url:myURL+"/static/html/zhoubian/chihe.html"
    },
    wanle:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/玩乐.jpg',
      text:'玩乐',
      width:276,
      url:myURL+"/static/html/zhoubian/wanle.html"
    },
    jianshen:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/健身.jpg',
      text:'健身',
      width:276,
      url:myURL+"/static/html/zhoubian/jianshen.html"
    },
    yiliao:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/医疗.jpg',
      text:'医疗',
      width:276,
      url:myURL+"/static/html/zhoubian/yiliao.html"
    },
    huodong:{
      img:'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/welcome/精品活动.jpg',
      text:'精品活动',
      url:"../huodong/huodong"
    }
  },

  jump: function (e) {
    wx.navigateTo({
      url: '../webview/webview?mode=normal&url=' + e.currentTarget.dataset.url,
    })
  },
  jump2page:function(e){
    wx.navigateTo({
      url:e.currentTarget.dataset.url
    })
  }
})