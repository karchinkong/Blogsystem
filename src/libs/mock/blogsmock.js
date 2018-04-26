import ApiPath from "@/api/ApiPath"

const Mock = require("mockjs")

Mock.mock(ApiPath.Blogs.getBlogsTypes, "get", {

    "code": 0,

    "data|1-3": [{

        "type_name": "@FIRST", // 随机生成中文人名

        "type_id|1-100": 100,

        "count|1-20": 1 

    }],

    "msg": "success"

});


Mock.mock(ApiPath.Blogs.getBlogsArticles, "get", {

    "code": 0,

    "data|5-7": [
        {
            "content": "@paragraph",
            "thumb": "http://mammothmedia.tv/admin/wp-content/uploads/2018/01/Eight-Years-of-Mammoth-Reel-thumbnail-Medium.jpg",
            "author": "@name",
            "type": "Front End",
            "title": "@ctitle(8)",
            "date": '@datetime',
            "momentCount|1-50": 1,
            "readCount|1-50": 1,
            "id|+1": 1 
        }
    ],

    "msg": "success"

});
