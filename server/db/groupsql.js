

var groupSQL = {

    getGroup: 'SELECT * FROM py_group ORDER BY pid ASC',

    saveGroup: 'UPDATE py_group SET text=?,pid=?,remark=?,locked=?,orderby=?,update_time=? WHERE id=?'

};

module.exports = groupSQL;
