var express = require('express')
var router = express.Router()

var mysql = require('mysql')
var dbConfig = require('../db/dbconfig')
var goodsSQL = require('../db/goodssql')
var BlogsSQL = require('../db/Blogsql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.BlogsMysql);

/**
 * 响应JSON数据
 * @param {*} res            
 * @param {*} ret            @响应返回的数据
 */
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({ code:'-200', msg: '操作失败' });
    } else {
        res.json(ret);
    }
}

/**
 * 连接数据库获取对应的数据
 * @param {*} url           @sql语句
 * @param {*} res           @响应返回的数据
 * @param {*} params        @请求所需的参数
 */
var connectionSqlQuery = function(url, res, params, notice) {

    var Params = params || [];

    var Notice = notice || '查询成功';

    pool.getConnection(function(err, connection) {

        connection.query(url, Params,function(err, result){

            if(result.length > 0) {

                result = {

                    code: 0,

                    msg: Notice,

                    data: result

                }

            } else {

                result = {

                    code: 1101,

                    msg: Notice,

                    data: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

}

var pushData = function(resArray, curItem) {
    for(var i=0; i<resArray.length; i++) {
        if(curItem.pid == resArray[i].id) {
            if(resArray[i].hasOwnProperty("children")) {
                resArray[i].children.push(curItem)
            } else {
                resArray[i].children = [];
                resArray[i].children.push(curItem);
            }
        } else {
            if(resArray[i].hasOwnProperty("children")) {
                pushData(resArray[i].children, curItem);
            }
        }
    }

    return resArray;
}

// 获取博客分类
router.get('/getBlogsType', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(BlogsSQL.getBlogsType, function(err, result){

            var resArray = new Array();

            for(var i=0; i<result.length; i++) {

                result[i].title = result[i].type_name;

                result[i].expand = true;

                if(result[i].pid === '0') {

                    resArray.push(result[i]);

                } else {

                    resArray = pushData(resArray, result[i]);

                }

            }

            if(result) {

                result = {

                    code: 0,

                    msg:'查询成功',

                    data: resArray

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

});

// 获取博客标签
router.get('/getBlogsTags', function(req, res, next){

    connectionSqlQuery(BlogsSQL.getBlogsTags, res);

});

// 添加博客标签
router.post('/addBlogsTags', function(req, res, next){

    connectionSqlQuery(BlogsSQL.addBlogsTags, res, [req.body.tagsName], '新增成功');

});

// 登录博客账号
router.post('/loginBlogs', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(BlogsSQL.getBlogsUsers, [req.body.username], function(err, result){

            if(result.length > 0) {

                if(result[0].password === req.body.password) {

                    result = {

                        code: 0,

                        msg: '查询成功',

                        data: result

                    }

                } else {

                    result = {

                        code: 1101,

                        msg: '密码错误',

                        data: result

                    }

                }

            } else {

                result = {

                    code: 1101,

                    msg: '暂无此用户',

                    data: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

});

module.exports = router;
