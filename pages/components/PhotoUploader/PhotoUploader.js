// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    photos: {
      type: Array,
      value: []
    },
    onUpload: {
      type: Function,
      value: (e) => {
        console.log(e)
      }
    },
    onDelete: {
      type: Function,
      value: (e) => {
        console.log(e)
      }
    },
    max: {
      type: Number,
      value: 99
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
    onUpload: function () {
      let that = this
      wx.chooseImage({
        count: that.data.max - that.data.photos.length,
        success(res1) {
          wx.showLoading({
            title: '上传中',
          })
          for (var i in res1.tempFilePaths) {
            var tmp = res1.tempFilePaths[i].split("/")
            var filename = tmp[tmp.length - 1]
            wx.cloud.uploadFile({
              cloudPath: 'IDEL/' + filename,
              filePath: res1.tempFilePaths[i], // 文件路径
              success: res2 => {
                if (i == res1.tempFilePaths.length - 1)
                wx.hideLoading({})
                that.data.onUpload(res2.fileID)
                // get resource ID

              },
              fail: err => {
                wx.showToast({
                  title: '上传失败',
                  icon: "none"
                })
                console.log(err)
                // handle error
              },
            })
          }
        }
      })
    },

    preview:function(e){
      wx.previewImage({
        urls: this.data.photos,
        current:e.currentTarget.dataset.url
      })
    },

    delete:function(e){
      let that=this
      wx.showActionSheet({
        itemList: ["删除"],
        itemColor:"#FF7878",
        success(res){
          if(res.tapIndex==0){
            wx.cloud.deleteFile({
              fileList: [e.currentTarget.dataset.url],
              success: res => {
                that.data.onDelete(e.currentTarget.dataset.url)
              },
              fail: err => {
                // handle error
              },
            })
          }
        }
      })
    }
    
  }
})