export class Requests {
    static baseUrl = "http://127.0.0.1:8080"

    static token

    static refreshToken(success) {
        let that = this
        wx.login({
            success(res1) {
                if (res1.code) {
                    //发起网络请求
                    wx.request({
                        method: "POST",
                        url: that.baseUrl + '/v1/auth',
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
                                // TODO 跳转到云校认证
                            }
                        }
                    })
                } else {
                    console.log('登录失败！' + res1.errMsg)
                }
            }
        })
    }

    static get(url, data = null, success) {
        let that = this
        wx.request({
            method: "GET",
            url: this.baseUrl + url,
            header: {
                "Token": this.token
            },
            data: data,
            success(res) {
                if (res.data.code == 200) {
                    success(res.data.data)
                } else if (res.data.code == 401) {
                    that.refreshToken(() => {
                        that.get(url, data, success)
                    })
                }
            }
        })
    }

    static post(url, data = null, success) {
        let that = this
        wx.request({
            method: "POST",
            url: this.baseUrl + url,
            header: {
                "Token": this.token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data,
            success(res) {
                if (res.data.code == 200) {
                    success(res.data.data)
                } else if (res.data.code == 401) {
                    that.refreshToken(() => {
                        that.post(url, data, success)
                    })
                }
            }
        })
    }

    static put(url, data = null, success) {
        let that = this
        wx.request({
            method: "PUT",
            url: this.baseUrl + url,
            header: {
                "Token": this.token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data,
            success(res) {
                if (res.data.code == 200) {
                    success(res.data.data)
                } else if (res.data.code == 401) {
                    that.refreshToken(() => {
                        that.put(url, data, success)
                    })
                }
            }
        })
    }

    static delete(url, data = null, success) {
        let that = this
        wx.request({
            method: "DELETE",
            url: this.baseUrl + url,
            header: {
                "Token": this.token,
            },
            data: data,
            success(res) {
                if (res.data.code == 200) {
                    success(res.data.data)
                } else if (res.data.code == 401) {
                    that.refreshToken(() => {
                        that.delete(url, data, success)
                    })
                }
            }
        })
    }

    static download(url, success) {
        wx.downloadFile({
            header: {
                Token: this.token
            },
            url: url, //仅为示例，并非真实的资源
            success(res) {
                success(res)
            }
        })
    }
}