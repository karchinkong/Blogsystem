<template>
    <div class="BlogsDetails-Wrap">
        <div class="BlogsDetails-Left"></div>
        <div class="BlogsDetails-Right"></div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {

        data() {
            return {
                BlogsDetailsInfo: {}
            }
        },

        mounted() {
            this.BlogsDetailsInfo = this.BlogArticlesArray[this.$route.params.id];
        },

        computed: {
            ...mapState({
                BlogArticlesArray: state => state.blogs.blogsArticles
            })
        }

    }
</script>

<style lang="less" scoped>
    @import '../../resources/less/Blog/Details.less';
</style>

