var express = require('express')
var router = express.Router()

var mysql = require('mysql')
var dbConfig = require('../db/dbconfig')
var userSQL = require('../db/usersql')

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql);

// 响应一个JSON数据
var responseJSON = function (res, ret) {

    if(typeof ret === 'undefined') {

        res.json({ code:'-200', msg: '操作失败' });

    } else {

        res.json(ret);

    }

}


router
    .get('/', function(req, res, next) {

        if(req.session.username){

            res.render('index', { username: req.session.username });

        }else{

            res.redirect('./login');

        }

    })

router
    .get('/login', function(req, res, next){

        res.render('login')

    })
    .post('/login', function(req, res, next){

        var param = req.body;

        pool.getConnection(function(err, connection) {

            connection.query(userSQL.getUserById, [param.name] , function(err, result){

                if(result.length > 0) {

                    if(result[0].password == param.password){

                        result = {

                            code: 200,

                            msg:'登录成功',

                            success: true,

                            info: result[0].real_name

                        }

                        req.session.username = result.info

                    }else{

                        result = {

                            code: 200,

                            msg: '密码错误',

                            success: false

                        }

                    }

                }else{

                    result = {

                        code: 200,

                        msg: '账号不存在',

                        success: false

                    }

                }

                responseJSON(res, result);

                connection.release();

            });

        })

    })

module.exports = router;
