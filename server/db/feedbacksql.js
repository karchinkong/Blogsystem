

var FeedbackSQL = {

    delFeedbacksql: 'DELETE FROM py_feedback WHERE id=?',

    updateFeedbacksql: 'UPDATE py_feedback SET user=?,content=? WHERE id=?'

};

module.exports = FeedbackSQL;
