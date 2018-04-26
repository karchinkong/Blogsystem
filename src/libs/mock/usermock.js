import ApiPath from "@/api/ApiPath"

const Mock = require("mockjs")

Mock.mock(ApiPath.Blogs.getUserInfo, "get", {

    "code": 0,

    "data": {

        "username": "@FIRST", // 随机生成中文人名

        "userId|1-100": 100,

        "fansCount|1-100": 1,

        "focusCount|1-100": 1,

        "potrait": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524559115577&di=5c93efcd288485fd1b79dbf739ce8cab&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-06%2F195035496.jpg",

        "position": "Web Designer"

    },

    "msg": "success"

});
