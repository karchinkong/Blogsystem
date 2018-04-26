

var roleSQL = {

    getRole: 'SELECT * FROM py_role ORDER BY pid ASC',

    saveRole: 'UPDATE py_role SET text=?,pid=?,remark=?,locked=?,orderby=?,update_time=? WHERE id=?',

};

module.exports = roleSQL;
