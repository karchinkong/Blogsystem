

var UserSQL = {

    getUser:'SELECT * FROM py_user LIMIT ?,10',

    getUserCount: 'SELECT count(user_id) as count FROM py_user'

};

module.exports = UserSQL;
