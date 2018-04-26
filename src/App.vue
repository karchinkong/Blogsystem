<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    body{
        font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif!important;
        font-size: 15px;
        color: #1a1a1a;
        background: #f6f6f6;
        -webkit-tap-highlight-color: rgba(26,26,26,0);
    }
    #app{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    /*滚动条样式*/
    ::-webkit-scrollbar {/*滚动条整体样式*/
        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 50px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(7, 115, 148, 0.2);
    }
    ::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 50px;
        background: rgba(9, 170, 219, 0.2);
    }
</style>
