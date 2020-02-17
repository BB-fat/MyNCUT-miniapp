// components/component-tag-name.js
import {
  Requests
} from "../../../utils/Requests"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good: Object,
    type: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    attached: function () {
      let that = this
      Requests.getWithCache({
        url: "/user/" + this.data.good.owner,
        success(data) {
          that.setData({
            owner: data
          })
        }
      })
      this.setData({
        time: this.data.good.time.split(".")[0]
      })
    },
  },

  // 数据监听器
  // 为了在good发生变化的时候同时改变owner
  observers:{
    "good":function(){
      let that = this
      Requests.getWithCache({
        url: "/user/" + this.data.good.owner,
        success(data) {
          that.setData({
            owner: data
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapCard: function () {
      wx.navigateTo({
        url: '/pages/idel-detail/idel-detail?_id=' + this.data.good._id,
      })
    },
    sell: function () {
      let that = this
      wx.showModal({
        content: "这件商品确定售出了么？",
        success(res) {
          if (res.confirm) {
            Requests.put({
              url: "/idle/" + that.data.good._id,
              data: {
                state: 2
              },
              success(data) {
                that.data.good.state = 2
                that.setData({
                  good: that.data.good
                })
              }
            })
          }
        }
      })
    },
    edit:function(){
      wx.navigateTo({
        url: '/pages/idel-create/idel-create?mode=edit&_id='+this.data.good._id,
      })
    },
    off:function(){
      let that = this
      wx.showModal({
        content: "确定要下架么？",
        success(res) {
          if (res.confirm) {
            Requests.put({
              url:"/idle/" + that.data.good._id,
              data:{
                state:0
              },
              success(data){
                that.data.good.state = 0
                that.setData({
                  good: that.data.good
                })
              }
            })
          }
        }
      })
    }
  }
})