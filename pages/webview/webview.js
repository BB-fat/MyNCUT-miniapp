// pages/webview/webview.js
import{
  myURL
}from '../../setting.js'
Page({

  /**
   * Page initial data
   */
  data: {
    oauthUrl: 'https://ucpay.ncut.edu.cn/open/user/oauth/index?redirect='+myURL+'/login/oauth&appid=31b1e992583074382&state=',
    schoolLifeAuthUrl:'https://ucpay.ncut.edu.cn/open/user/oauth/index?redirect='+myURL+'/schoollifeauth&appid=31b1e992583074382&state='
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    if (options.mode == "oauth") {
      this.setData({
        url: this.data.oauthUrl + options.openid
      })
    } else if (options.mode == "normal") {
      this.setData({
        url: options.url
      })
    }else if(options.mode == "2019"){
      this.setData({
        url: myURL+"/schoollife?openid="+ options.openid
      })
    }else if(options.mode == "2019Auth"){
      this.setData({
        url: this.data.schoolLifeAuthUrl + options.openid
      })
    }
  },
})