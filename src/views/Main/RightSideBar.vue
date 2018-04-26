<template>
    <div class="App-Main-FixedRight" id="AppMain-FixedRight">
        <Card class="App-Main-FixedRight-userInfo">
            <div>
                <Avatar icon="person" size="large" :src="userInfo.potrait" />
                <h3 class="App-Main-FixedRight-userInfo-name">{{userInfo.username}}</h3>
                <div class="App-Main-FixedRight-userInfo-fans">
                    <div>关注：{{userInfo.focusCount}}</div>
                    <div>粉丝：{{userInfo.fansCount}}</div>
                </div>
                <div>
                    <div>职业：{{userInfo.job}}</div>
                </div>
            </div>
        </Card>
        <Card class="App-Main-FixedRight-blogsType">
            <p slot="title">
                <Icon type="social-github"></Icon>
                话题类型
            </p>
            <div class="App-Main-FixedRight-blogsType-Item">
                <p><router-link to='/blog/type/0'>全部</router-link></p>
                <p v-for="item in blogsType" :key="item.type_id"><router-link :to="`/blog/type/${item.type_id}`">{{item.type_name}}({{item.count}})</router-link></p>
            </div>
        </Card>
        <Card class="App-Main-FixedRight-introduce">
            <h3>如需联系我,扫下方二维码</h3>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525161908&di=3010f4f714835a0e19f6c3af28db5049&imgtype=jpg&er=1&src=http%3A%2F%2Fp3.gexing.com%2Ftouxiang%2F20120728%2F1146%2F501360b28b76a_200x200_3.jpg%3Frecache%3D20131108" />
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                blogsType: [],
                userInfo: {}
            }
        },
        mounted() {
            const _self = this;
            this.$store.commit('getBlogsType', {
                successCb(res) {
                    _self.blogsType = res.data;
                }
            });
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
    }
</script>

<style lang="less" scoped>
    @import '../../resources/less/Main/RightSidebar.less';
</style>
