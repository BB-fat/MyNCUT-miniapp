const app = getApp()
 
export function mySearch(that, e) {      //搜索 
  var courseList_tmp = []
  wx.getStorage({
    key: 'coursewareList',
    success: function(res) {
      courseList_tmp = res.data
      if (courseList_tmp.length != 0) {
        if (e.detail.value.length == 0) {
          that.setData({
            searchInfo: false,
            coursewareList: courseList_tmp,
          })
        } else {
          var queryList = []
          var inputValue = e.detail.value          
          for (var i = 0; i < courseList_tmp.length; i++) {
            var name = courseList_tmp[i].file_name
            for (var j = 0; j <= name.length - inputValue.length; j++) {
              if (name.substr(j, inputValue.length) == inputValue) {
                queryList.push(courseList_tmp[i])
                break
              }
            }
          }          
          if (queryList.length == 0) {
            that.setData({
              searchInfo: true
            })            
          } else {
            that.setData({
              searchInfo: false,
              coursewareList: queryList,
            })
          }
        }
      }
    },
  })
}