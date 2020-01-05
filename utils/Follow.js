import {
    Requests
} from "./Requests"

export class Follow {
    static coursewares;

    static init() {
        let that = this
        Requests.get({
            url: "/favorites/courseware",
            success(data) {
                that.coursewares = data
            }
        })
    }

    // 传入一个课件对象 返回是否关注
    static checkFollow(
        cw,
    ) {
        for (var index in this.coursewares) {
            if (this.coursewares[index]._id == cw["_id"]) {
                return true
            }
        }
        return false
    }

    // 增加一个关注
    static add({
        cw,
        success
    }) {
        Requests.put({
            url: "/favorites/courseware",
            data: {
                _id: cw["_id"]
            },
            success(data) {
                success()
            }
        })
    }

    // 清除一个课件收藏
    static remove({
        cw,
        success
    }) {
        Requests.delete({
            url: "/favorites/courseware",
            data: {
                _id: cw["_id"]
            },
            success(data) {
                success()
            }
        })
    }
}