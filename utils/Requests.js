export class Requests {
    // static baseUrl = "http://127.0.0.1:8080/v1"
    // static baseUrl = "https://myncutdev.ncut.edu.cn/v1"
    // static baseUrl = "https://myncut.ncut.edu.cn/v1"
    // static baseUrl = "http://10.211.55.3:8080/v1"
    static baseUrl = "http://192.168.0.101/v1"

    // 请求日志
    static console = true

    static token

    static minute = 60000
    static hour = 3600000
    static day = 86400000

    // 由对象生成队列参数
    static makeUrl(url, data) {
        var params = []
        for (var key in data) {
            params.push(key + "=" + data[key])
        }
        return params.length > 0 ? (url + "?" + params.join("&")) : url
    }

    static refreshToken(success) {
        let that = this
        wx.login({
            success(res1) {
                if (res1.code) {
                    //发起网络请求
                    wx.request({
                        method: "POST",
                        url: that.baseUrl + '/auth',
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            code: res1.code
                        },
                        success(res2) {
                            if (res2.data.code == 200) {
                                that.token = res2.data.data.Token
                                success()
                            } else if (res2.data.code == 401) {
                                wx.navigateTo({
                                    url: "/pages/auth/auth?mode=yunschool"
                                })
                            } else if (res2.data.code == 402) {
                                that.token = res2.data.data.Token
                                var pages = getCurrentPages()
                                if (pages[pages.length - 1].route != "pages/auth/auth")
                                    wx.navigateTo({
                                        url: "/pages/auth/auth?mode=wechat"
                                    })
                            }
                        }
                    })
                } else {
                    console.log('登录失败！' + res1.errMsg)
                }
            }
        })
    }

    static doRequest({
        method,
        url,
        header = {},
        data,
        success = null
    }) {
        let that = this
        header["Token"] = this.token
        if (this.console)
            console.log("开始请求:", method, this.baseUrl + url)
        wx.request({
            method: method,
            url: this.baseUrl + url,
            header: header,
            data: data,
            success(res) {
                if (that.console) {
                    console.log("响应:", method, that.baseUrl + url)
                    console.log(res.data)
                }
                if (res.data.code == 200) {
                    if (success != null)
                        success(res.data.data)
                } else if (res.data.code == 401) {
                    that.refreshToken(() => {
                        that.doRequest({
                            method: method,
                            url: url,
                            header: header,
                            data: data,
                            success: success
                        })
                    })
                } else {
                    console.log(res)
                    wx.showToast({
                        title: '网络异常',
                        icon: "none"
                    })
                }
            },
            fail(res) {
                console.log(res)
                wx.showToast({
                    title: '网络异常',
                    icon: "none"
                })
            }
        })
    }

    static get({
        url,
        data = null,
        success,
    }) {
        this.doRequest({
            method: "GET",
            url: url,
            data: data,
            success: success
        })
    }

    static getWithCache({
        url,
        data = null,
        success,
        cacheTime = this.hour * 5,
        forceRefresh = false
    }) {
        let that = this
        // 执行请求
        var doGet = function () {
            that.get({
                url: url,
                data: data,
                success(resData) {
                    wx.setStorage({
                        key: that.makeUrl(url, data),
                        data: {
                            data: resData,
                            validTime: (new Date()).getTime() + cacheTime
                        },
                        // 创建失败尝试清空缓存
                        fail(res) {
                            console.log(res.data)
                            wx.clearStorage()
                        }
                    })
                    success(resData)
                }
            })
        }

        if (forceRefresh) {
            doGet()
        } else {
            wx.getStorage({
                key: that.makeUrl(url, data),
                success(res) {
                    if (res.data.validTime > (new Date()).getTime()) {
                        // 缓存有效
                        success(res.data.data)
                    } else {
                        doGet()
                    }
                },
                // 没有缓存
                fail() {
                    doGet()
                }
            })
        }
    }

    static post({
        url,
        data = null,
        success
    }) {
        this.doRequest({
            method: "POST",
            url: url,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data,
            success: success
        })
    }

    static put({
        url,
        data = null,
        success
    }) {
        this.doRequest({
            method: "PUT",
            url: url,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data,
            success: success
        })
    }

    static delete({
        url,
        data = null,
        success
    }) {
        this.doRequest({
            method: "DELETE",
            url: url,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data,
            success: success
        })
    }

    // 返回downloadtask
    static download({
        url,
        success
    }) {
        return wx.downloadFile({
            header: {
                Token: this.token
            },
            url: this.baseUrl + url,
            success(res) {
                success(res)
            }
        })
    }
}