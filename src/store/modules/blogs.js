import qs from 'qs'
import NetUtils from '@/utils/NetUtils'
import ApiPath from '@/api/ApiPath'

const blogs = {

    state: {

        blogsArticles: []

    },

    mutations: {

        getBlogsType(state, data) {

            NetUtils.ajaxRequest({

                url: ApiPath.Blogs.GetBlogsTypes,

                method: 'GET'

            }, (res) => {

                if(typeof data === 'object') {

                    if(data.hasOwnProperty("successCb")) data.successCb(res.data);

                }

            });

        },

        getBlogsArticles(state, data) {

            NetUtils.ajaxRequest({

                url: ApiPath.Blogs.getBlogsArticles,

                method: 'GET'

            }, (res) => {

                state.blogsArticles = res.data.data;

                if(typeof data === Object) {

                    if(data.hasOwnProperty("successCb")) data.successCb(res.data);

                }
                
            });

        },

        getBlogsTags(state, data) {

            NetUtils.ajaxRequest({

                url: ApiPath.Blogs.GetBlogsTags,

                method: 'GET'

            }, (res) => {

                if(typeof data === 'object') {

                    if(data.hasOwnProperty("successCb")) data.successCb(res.data);

                }

            });

        },

        addBlogsTags(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: ApiPath.Blogs.AddBlogsTags,

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(typeof data === 'object') {

                    if(data.hasOwnProperty("successCb")) data.successCb(res.data);

                }

            });

        }

    }

}


export default blogs;
