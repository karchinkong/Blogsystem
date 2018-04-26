<template>
    <div class="Main">
        <nav-top></nav-top>
        <main class="App-Main">
            <div class="App-Main-Wrap">
                <div class="App-Main-Inner" id="Main">
                    <div class="App-Main-Content"><router-view /></div>
                    <right-sidebar></right-sidebar>
                </div>
            </div>
        </main>
        <BackTop></BackTop>
    </div>
</template>

<script>

    import navTop from '@/views/Main/Navigation'

    import rightSidebar from '@/views/Main/RightSideBar'

    export default{
        data() {
            return {
                
            }
        },
        methods: {
            watchUserInfoPosition() {
                const userInfoLeft = document.getElementById('Main').offsetLeft + 720;
                document.getElementById('AppMain-FixedRight').style.left = userInfoLeft + 'px';
            }
        },
        mounted() {
            const _self = this;
            _self.watchUserInfoPosition();
            window.onresize = function () {
                _self.watchUserInfoPosition();
            }

        },
        components: {
            navTop,
            rightSidebar
        }
    }
</script>

<style lang="less" scoped>
    @import '../../resources/less/Main/Main.less';
</style>
