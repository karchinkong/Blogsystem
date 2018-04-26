<template>
    <div>
        <Card class="BlogsPublish-Wrap">
            <router-link to="/blog/publish" class="BlogsPublish">
                <Icon type="ios-compose-outline"></Icon>
                <span>发布新博客文章</span>
            </router-link>
        </Card>
        <Card class="BlogsItem" v-for="item in BlogsArticlesList" :key="item.id">
            <router-link :to="`/blog/article/${item.id}`">
                <h4 class="BlogsItem-Types">热门内容,来自:{{item.type}}</h4>
                <div class="BlogsItem-Author">
                    <Avatar shape="square" icon="person" size="small" />
                    <span class="BlogsItem-Author-content">
                        <h4>{{item.author}}</h4>
                        <span>坚持真实，不编故事。欢迎关注来私～</span>
                    </span>
                </div>
                <h3 class="BlogsItem-Title">{{item.title}}</h3>
                <div class="BlogsItem-ContentWrap">
                    <div class="BlogsItem-Thumb" v-if="item.thumb">
                        <img :src="item.thumb" />
                    </div>
                    <p :class="item.thumb ? 'BlogsItem-Content BlogsItem-HasThumbContent' : 'BlogsItem-Content'">{{item.content}}</p>
                </div>
                <div class="BlogsItem-Controller">
                    <div>
                        <Icon type="chatbubble-working"></Icon>
                        <span>{{item.momentCount}}条评论</span>
                    </div>
                    <div>
                        <Icon type="ios-glasses"></Icon>
                        <span>{{item.readCount}}人浏览过</span>
                    </div>
                    <div>
                        <Icon type="android-share-alt"></Icon>
                        <span>分享</span>
                    </div>
                    <div>
                        <Icon type="android-star"></Icon>
                        <span>收藏</span>
                    </div>
                    <div @click.prevent="abc">
                        <Icon type="ios-heart"></Icon>
                        <span>点赞</span>
                    </div>
                </div>
            </router-link>
        </Card>
    </div>
</template>

<script>

    import {mapState} from 'vuex';

    export default {

        mounted() {

            this.$store.commit('getBlogsArticles')

        },

        methods: {
            abc() {
            },
            GoB() {
            }
        },

        computed: {

            ...mapState({

                BlogsArticlesList: state => state.blogs.blogsArticles

            })

        }

    }

</script>

<style lang="less" scoped>
    @import '../../resources/less/Blog/Blog.less';
</style>

