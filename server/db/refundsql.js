

var RefundSQL = {

    getRefund: 'SELECT refund.*,orderInfo.consignee,orderInfo.address,orderInfo.mobile,goods.goods_name FROM py_refund as refund LEFT JOIN py_order_info as orderInfo ON refund.order_sn=orderInfo.order_sn LEFT JOIN py_goods as goods ON refund.goods_id=goods.goods_id LIMIT ?,10',

    getRefundCount: 'SELECT count(id) as count FROM py_refund',

    getRefundCountById: 'SELECT count(id) as count FROM py_refund WHERE order_sn LIKE ?',

    getRefundById: 'SELECT refund.*,orderInfo.consignee,orderInfo.address,orderInfo.mobile,goods.goods_name FROM py_refund as refund LEFT JOIN py_order_info as orderInfo ON refund.order_sn=orderInfo.order_sn LEFT JOIN py_goods as goods ON refund.goods_id=goods.goods_id WHERE refund.order_sn LIKE ? LIMIT ?,10',

    delRefund: 'DELETE FROM py_refund WHERE id=?'

};

module.exports = RefundSQL;
