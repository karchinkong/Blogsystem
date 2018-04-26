

var BlogsSQL = {

    getBlogsType: 'SELECT * FROM blogs_articles_type',

    getBlogsTags: 'SELECT * FROM blogs_articles_tags',

    addBlogsTags: 'INSERT INTO blogs_articles_tags(name) VALUES(?)',

    getBlogsUsers: 'SELECT * FROM blogs_users WHERE username=?'

};

module.exports = BlogsSQL;
