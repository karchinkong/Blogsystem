

var GoodsSQL = {

    getGoodsByType: 'SELECT * FROM py_goods WHERE type_id = ? AND parent_id = 0 limit 6',

    getInfoById: 'SELECT * FROM py_goods WHERE goods_id = ?',

    getSizeById: 'SELECT * FROM py_goods_size WHERE goods_id = ? ',

    getProductByCateId: 'SELECT * FROM py_goods WHERE cat_id = ? limit ?,?',

    getChildrenInfoByPid: 'SELECT a.*,b.attr_value FROM py_goods a LEFT JOIN `py_goods_attr` b ON a.goods_id = b.goods_id WHERE parent_id = ? GROUP BY goods_id',

    getAllGoodsType: 'SELECT * FROM py_goods_type',

    getGoodsList: 'SELECT * FROM py_goods WHERE site_id LIKE "%?%" AND goods_name LIKE "%?%" LIMIT ?,10',

    getAllGoodsCate: 'SELECT * FROM py_goods_category ORDER BY pid ASC',

    getGoodsCount: 'SELECT count(goods_id) AS count FROM py_goods WHERE goods_name LIKE "%?%" AND site_id LIKE "%?%"',

    lockGoods: 'UPDATE py_goods SET is_on_sale=? WHERE goods_id IN ()'

};

module.exports = GoodsSQL;
