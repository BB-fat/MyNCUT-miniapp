// components/component-tag-name.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: {
            type: String,
            value: ""
        },
        search: {
            type: Function,
            value: function (e) {
                console.log(e)
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        inputValue:""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        input: function (e) {
            this.setData({
                inputValue: e.detail.value
            })
        },
        tapSearch: function () {
            this.data.search(this.data.inputValue)
        },
        tapCancel:function(){
            console.log(111)
            this.setData({
                inputValue: ""
            })
            this.data.search("")
        }
    }
})