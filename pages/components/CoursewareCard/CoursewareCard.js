// components/component-tag-name.js
import {
    Follow
} from "../../../utils/Follow"

import {
    Requests
} from "../../../utils/Requests"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        courseware: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        downloading: false,
        progress: 0,
        task: null,
        icons: {
            "doc": "/img/CoursewareCard/word.png",
            "docx": "/img/CoursewareCard/word.png",
            "pdf": "/img/CoursewareCard/pdf.png",
            "zip": "/img/CoursewareCard/zip.png",
            "rar": "/img/CoursewareCard/zip.png",
            "7z": "/img/CoursewareCard/zip.png",
            "xls": "/img/CoursewareCard/excel.png",
            "xlsx": "/img/CoursewareCard/excel.png",
            "mp4": "/img/CoursewareCard/video.png",
            "rmvb": "/img/CoursewareCard/video.png",
            "avi": "/img/CoursewareCard/video.png",
            "others": "/img/CoursewareCard/others.png"
        },
        openType: ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf"]
    },

    attached: function () {
        // 计算显示文件大小
        let size = this.data.courseware.size
        if (size >= 1000000) {
            this.setData({
                size: (size / 1000000).toFixed(2) + "MB",
            })
        } else {
            this.setData({
                size: (size / 1000).toFixed(2) + "KB"
            })
        }
        this.setData({
            followed: Follow.checkFollow(this.data.courseware)
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 重制下载数据
        resetDownload: function () {
            this.setData({
                downloading: false,
                progress: 0,
                task: null
            })
        },

        tapCard: function () {
            let that = this
            if (that.data.task != null) return
            if (that.data.openType.indexOf(that.data.courseware.type) == -1) {
                wx.showToast({
                    title: '暂时不支持此种文件',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            var task = Requests.download({
                url: "/iclass/courseware/download?id=" + this.data.courseware._id,
                success(res) {
                    that.resetDownload()
                    wx.openDocument({
                        filePath: res.tempFilePath,
                        fileType: that.data.courseware.type,
                        fail(res) {
                            console.log(res)
                        }
                    })
                }
            })
            task.onProgressUpdate((res) => {
                that.setData({
                    progress: res.progress
                })
            })
            this.setData({
                task: task,
                downloading: true
            })
        },

        //终止下载
        abort: function () {
            this.data.task.abort()
            this.resetDownload()
        },
        // 点击关注
        tapStar: function () {
            let that = this
            if (this.data.followed) {
                Follow.remove({
                    cw: this.data.courseware,
                    success() {
                        wx.showToast({
                            title: '已取消',
                            icon: 'none',
                        })
                        that.setData({
                            followed: false
                        })
                    }
                })
            } else {
                Follow.add({
                    cw: this.data.courseware,
                    success() {
                        wx.showToast({
                            title: '已收藏',
                            icon: 'success',
                        })
                        that.setData({
                            followed: true
                        })
                    }
                })
            }
        }
    }
})