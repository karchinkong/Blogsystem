import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import Main from '@/views/Main/Main'

Vue.use(Router);
Vue.use(iView);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            redirect: '/blog',
            component: Main,
            children: [
                { path: 'blog', name: 'blog_index', title: '博客', component: resolve => { require(['@/views/Blog/Blog_index.vue'], resolve)} },
                { path: 'blog/articles/:id', name: 'blog_details', title: '博客详情页', component: resolve => { require(['@/views/Blog/Blog_Details.vue'], resolve)} },
                { path: 'blog/type/:id', name: 'blog_type', title: '博客分类', component: resolve => { require(['@/views/Blog/Blog_index.vue'], resolve)} }                
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => { require(['@/views/Login/Login.vue'], resolve)}
        },
        {
            path: '/blog/publish',
            name: 'publish',
            component: resolve => { require(['@/views/Blog/Blog_Publish.vue'], resolve)}
        },
        {
            path: '/settings',
            name: 'settings',
            component: resolve => { require(['@/views/Settings/Settings.vue'], resolve)}
        }
    ]
}) 

export default router;

router.beforeEach((to, from, next) => {

    iView.LoadingBar.start();

    const userInfo = localStorage.getItem('userInfo');

    if(to.name !== 'login') {

        if(userInfo !== null) {

            next();
            
        } else {
    
            next('/login')
    
        }

    } else {

        next();

    }

});

router.afterEach((to) => {  // 路由跳转完成后操作

    iView.LoadingBar.finish();

});