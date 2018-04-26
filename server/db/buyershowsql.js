

var BuyershowSQL = {

    getAll:'SELECT * FROM py_community LIMIT ?,10',

    getCount: 'SELECT count(id) as count FROM py_community',

    CtrlBuyershow: 'UPDATE py_community SET is_verify=? WHERE id in (?)'

};

module.exports = BuyershowSQL;
