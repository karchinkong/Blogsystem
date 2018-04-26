

var ComArticleSQL = {

    getAll:'SELECT u.user_name,w.*,ur.rank_name,u.email,u.user_id FROM py_wscarticle as w JOIN py_user as u ON w.author_id = u.user_id JOIN py_user_rank as ur ON u.rank_id = ur.rank_id LIMIT ?,10',

    getCount: 'SELECT count(id) as count FROM py_wscarticle',

    saveComArticle: 'UPDATE py_wscarticle SET title=?,content=?,article_type=?,is_open=?,thumb_url=?,update_time=? WHERE id=?'

};

module.exports = ComArticleSQL;
