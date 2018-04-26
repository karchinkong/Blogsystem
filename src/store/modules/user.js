import qs from 'qs'
import NetUtils from '@/utils/NetUtils'
import ApiPath from '@/api/ApiPath'

const blogs = {

    state: {

    

    },

    mutations: {

        login(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: ApiPath.Blogs.GetUserInfoById,

                data: stringData,

                method: 'POST'

            }, (res) => {

                localStorage.setItem('userInfo', JSON.stringify(res.data.data[0]));

                if(typeof data === 'object') {

                    if(data.hasOwnProperty("successCb")) data.successCb(res.data);

                }  

            });

        },

        ExitAccount(state, data) {

            localStorage.removeItem('userInfo');

            data.successCb();

        }

    }

}


export default blogs;
