<template>
    <div id="discover">
        <el-tabs v-model="activeName">
            <el-tab-pane label="个性推荐" name="first">
                <IRecommend></IRecommend>
            </el-tab-pane>
            <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
            <el-tab-pane label="主播电台" name="third">主播电台</el-tab-pane>
            <el-tab-pane label="排行榜" name="fourth">排行榜</el-tab-pane>
            <el-tab-pane label="歌手" name="5">歌手</el-tab-pane>
            <el-tab-pane label="最新音乐" name="6">最新音乐</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Recommend from './Recommend.vue'
    export default {
        name: "discover",
        components:{
            IRecommend:Recommend
        },
        data(){
            return{
                activeName:'first'
            }
        }
    }
</script>

<style lang="scss">
    #discover .el-main[data-v-fae5bece]{
        line-height: 55px;
        padding: 0px 30px 50px 30px;
        text-align: left;
    }
    #discover {
        padding: 0px 30px;
    }
    #discover .el-tabs__nav-scroll{
        display: flex;
        justify-content: center;
    }
    #discover .el-tabs__nav{
        line-height: 55px;
    }
    .el-tabs__item{
        padding: 0 25px;
    }
    .el-tabs__content{
        /*padding: 0 10%;*/
    }
</style>
<style lang="scss" scoped>

</style>