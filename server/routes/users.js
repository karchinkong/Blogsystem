var express = require('express')
var router = express.Router()

var mysql = require('mysql')
var dbConfig = require('../db/dbconfig')
var goodsSQL = require('../db/goodssql')
var cateSQL = require('../db/catesql')
var feedbackSQL = require('../db/feedbacksql')
var userSQL = require('../db/usersql')
var buyershowSQL = require('../db/buyershowsql')
var comarticleSQL = require('../db/comarticle')
var siteSQL = require('../db/sitesql')
var ucenterSQL = require('../db/ucenter')
var refundSQL = require('../db/refundsql')
var groupSQL = require('../db/groupsql')
var roleSQL = require('../db/rolesql')


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


var connectionSqlQuery = function(url, res, params) {

    var Params = params || [];

    pool.getConnection(function(err, connection) {

        connection.query(url, Params,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

}


router.get('/getGoodsByType', function(req, res, next) {

    connectionSqlQuery(goodsSQL.getGoodsByType, res, [req.query.typeId]);

})

router.get('/getInfoById', function(req, res, next) {

    pool.getConnection(function(err, connection) {

        connection.query(goodsSQL.getInfoById, [req.query.id],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

router.get('/getSizeById', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(goodsSQL.getSizeById, [req.query.id],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

router.get('/getAllCate', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(cateSQL.getAllCate, function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

router.get('/getProductByCateId', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query("SELECT * FROM py_goods WHERE cat_id = " + req.query.id + " limit " + req.query.page + "," + req.query.pageSize , function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

router.get('/getChildrenInfoByPid', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(goodsSQL.getChildrenInfoByPid, [req.query.pid],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})




/* -------------- 微商城Start -------------- */

// 获取用户反馈（分页）
router.get('/getFeedbackList', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query('SELECT * FROM py_feedback LIMIT ' + (req.query.page - 1) * 10 + ',10', function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 删除用户反馈
router.get('/delFeedback', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(feedbackSQL.delFeedbacksql, [req.query.id], function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 根据用户ID更新用户反馈信息
router.get('/udFeedback', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(feedbackSQL.updateFeedbacksql, [req.query.userInfo.user, req.query.userInfo.content, req.query.userInfo.id], function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 通过ID获取用户信息
router.post('/getUserById', function(req, res, next){

    console.log(req.body.name)

    pool.getConnection(function(err, connection) {

        connection.query(userSQL.getUserById, [req.body.name], function(err, result){

            console.log(result)

            if(result){

                if(result.is_open) {

                    result = {

                        code: 0,

                        msg: '没权限登录'

                    }

                } else{

                    if(req.body.password == result[0].password){

                        console.log(result)

                        result = {

                            code: 1,

                            msg: '登录成功',

                            info: result

                        }

                    }else{

                        result = {

                            code: 0,

                            msg: '密码错误'

                        }

                    }

                }

            } else{

                result = {

                    code: 0,

                    msg: '查无此人'

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 修改用户信息
router.post('/saveUserInfo', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(userSQL.saveUserInfo, [req.body.real_name,req.body.password,req.body.user_id],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'修改成功',

                    info: req.body

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取买家秀（分页）
router.get('/getAllBuyershow', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(buyershowSQL.getAll, [(req.query.page-1)*10],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取买家秀总数量操作
router.get('/getBuyershowCount', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(buyershowSQL.getCount,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    count: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 买家秀通过不通过审核操作
router.post('/PassBuyershow', function(req, res, next){

    var idArray = req.body.info.join(',')

    pool.getConnection(function(err, connection) {

        connection.query('UPDATE py_community SET is_verify=' + req.body.is_verify + ' WHERE id in (' + idArray + ')', function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '修改成功',

                    id: req.body.info

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 删除买家秀操作
router.post('/DeleteBuyershow', function(req, res, next){

    var idArray = req.body.info.join(',')

    pool.getConnection(function(err, connection) {

        connection.query('DELETE FROM py_community WHERE id in (' + idArray + ')', function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '删除成功',

                    id: req.body.info

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取社区文章（分页）
router.get('/getComArticle', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(comarticleSQL.getAll, [(req.query.page-1)*10],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取社区文章总数量操作
router.get('/getComArticleCount', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(comarticleSQL.getCount,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    count: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取站点信息
router.get('/getSite', function(req, res, next){

    connectionSqlQuery(siteSQL.getSite, res);
    
})

// 更改社区文章操作
router.post('/saveCommunArticle', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(comarticleSQL.saveComArticle, [req.body.title,req.body.content,req.body.article_type,req.body.is_open,req.body.thumb_url,req.body.update_time,req.body.id], function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '修改成功',

                    updateInfo: req.body

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取用户信息（分页）
router.get('/getUcenterList', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(ucenterSQL.getUser, [(req.query.page-1)*10],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取用户总数量操作
router.get('/getUcenterCount', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(ucenterSQL.getUserCount,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    count: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 删除用户操作
router.post('/DeleteUcenter', function(req, res, next){

    var idArray = req.body.join(',')

    pool.getConnection(function(err, connection) {

        connection.query('DELETE FROM py_user WHERE user_id in (' + idArray + ')', function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '删除成功',

                    id: req.body

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取售后列表（分页）
router.get('/getRefundList', function(req, res, next){

    var RefundTypeSql,RefundParams;

    if(req.query.data.searchVal) {

        RefundTypeSql = refundSQL.getRefundById

        RefundParams = ['%' + req.query.data.searchVal + '%',(req.query.data.page-1)*10]

    }else{

        RefundTypeSql = refundSQL.getRefund

        RefundParams = [(req.query.data.page-1)*10]

    }

    pool.getConnection(function(err, connection) {

        connection.query(RefundTypeSql, RefundParams,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取售后列表数量
router.get('/getRefundCount', function(req, res, next){

    var refundCountSQL;

    if(req.query.data.search == 'true') {

        refundCountSQL  = 'SELECT count(id) as count FROM py_refund WHERE order_sn LIKE "%' + req.query.data.searchVal + '%"'

    }else{

        refundCountSQL  = refundSQL.getRefundCount

    }

    pool.getConnection(function(err, connection) {

        connection.query(refundCountSQL,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    count: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 删除售后
router.post('/delRefund', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(refundSQL.delRefund, [req.body.id], function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '删除成功',

                    id: req.body.id

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取组织表
router.get('/getGroup', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(groupSQL.getGroup,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    result: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 更改组织操作
router.post('/saveGroup', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(groupSQL.saveGroup, [req.body.text, req.body.pid, req.body.remark, req.body.locked, req.body.orderby, req.body.update_time, req.body.id], function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '修改成功',

                    updateInfo: req.body

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取角色表
router.get('/getRoleList', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(roleSQL.getRole,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    result: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 更改角色操作
router.post('/saveRole', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(roleSQL.saveRole, [req.body.text, req.body.pid, req.body.remark, req.body.locked, req.body.orderby, req.body.update_time, req.body.id], function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg: '修改成功',

                    updateInfo: req.body

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取商品类型
router.get('/getGoodsType', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(goodsSQL.getAllGoodsType,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    result: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取商品列表（分页）
router.post('/getGoodsList', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query('SELECT * FROM py_goods WHERE site_id LIKE "%' + req.body.site_id + '%" AND goods_name LIKE "%' + req.body.searchVal + '%" LIMIT ' + ((req.body.page-1)*10) + ',10',function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    info: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取商品分类
router.get('/getGoodsCateList', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(goodsSQL.getAllGoodsCate,function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    result: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取商品总数
router.post('/getGoodsCount', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query("SELECT count(goods_id) AS count FROM py_goods WHERE goods_name LIKE '%" + req.body.searchVal + "%' AND site_id LIKE '%" + req.body.site_id + "%'", function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    count: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})

// 获取商品总数
router.post('/lockGoods', function(req, res, next){

    pool.getConnection(function(err, connection) {

        connection.query(goodsSQL.lockGoods, [req.body.lockState],function(err, result){

            if(result) {

                result = {

                    code: 200,

                    msg:'查询成功',

                    count: result

                }

            }

            responseJSON(res, result);

            connection.release();

        });

    })

})



/* -------------- 微商城End -------------- */


module.exports = router;
