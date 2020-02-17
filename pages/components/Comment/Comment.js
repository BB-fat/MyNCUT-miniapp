// components/component-tag-name.js
import {
  Requests
} from "../../../utils/Requests"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: Object,
    onDelete:{
      type:Function,
      value:function(){}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    tapComment: function () {
      wx.navigateTo({
        url: Requests.makeUrl("/pages/idel-comment/idel-comment", {
          _id: this.data.comment._id
        })
      })
    },

    delete: function () {
      let that = this
      // 超级管理员用户学号
      var su = [
        "17152010921",
        "16104050207"
      ]
      var ask = function () {
        wx.showModal({
          content: "确定删除这条留言么?",
          success(res) {
            if (res.confirm) {
              Requests.delete({
                url: "/idel-comment",
                data: {
                  _id: that.data.comment._id
                },
                success(data) {
                  that.data.onDelete()
                }
              })
            }
          }
        })
      }
      Requests.getWithCache({
        url: '/user',
        success(data) {
          if (data.openid == that.data.comment.from_openid || su.indexOf(data.sno) != -1) {
            ask()
          }
        }
      })
    }
  }
})