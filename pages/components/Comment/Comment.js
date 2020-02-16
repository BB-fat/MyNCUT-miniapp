// components/component-tag-name.js
import {
  Requests
} from "../../../utils/Requests"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapComment: function () {
      wx.navigateTo({
        url:Requests.makeUrl("/pages/idel-comment/idel-comment",{
          _id:this.data.comment._id
        })
      })
    },
  }
})