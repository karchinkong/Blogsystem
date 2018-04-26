

var UserSQL = {

    insert:'INSERT INTO py_admin(user_id,userName) VALUES(?,?)',

    queryAll:'SELECT * FROM py_admin',

    getUserById:'SELECT ad.* FROM py_admin as ad JOIN py_role as role ON ad.role_id = role.id JOIN py_group as pyGroup ON ad.group_id = pyGroup.id WHERE ad.user_name=?',

    saveUserInfo: 'UPDATE py_admin SET real_name=?,password=? WHERE user_id=?'

};

module.exports = UserSQL;
