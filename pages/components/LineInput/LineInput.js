// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      icon:String,
      placeholder:String,
      type:String,
      onInput:{
        type:Function,
        value:(e)=>{
          console.log(e)
        }
      }
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
    onInput:function(e){
      this.data.onInput(e.detail.value)
    }
  }
})