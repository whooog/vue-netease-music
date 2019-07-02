<template>
    <div id="home">
        <INavigation></INavigation>
        <el-container class="content">
            <ISidebar width="200px"></ISidebar>
            <el-scrollbar wrap-class="list" wrap-style="overflow-x: hidden;" view-class="view-box" :native="false" style="min-width: calc(100% - 270px)">
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-scrollbar>
        </el-container>
        <IFooter></IFooter>
    </div>
</template>

<script>
    import Navigation from '../components/Navigation.vue'
    import Sidebar from '../components/Sidebar.vue'
    import Footer from '../components/Footer.vue'

    import {ACTION_GET_USER_STATUS} from '@/store/modules/user/types.js'

    export default {
        name: "Home",
        components:{
            INavigation : Navigation,
            ISidebar : Sidebar,
            IFooter : Footer
        },
        created(){
            console.log('初始化')
            this.$store.dispatch(ACTION_GET_USER_STATUS)
        }
    }
</script>


<style lang="scss" scoped>
#home.el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
}
.el-main{
    padding: 0px;
}
 #home{
    .content{
        position: absolute;
        top: 60px;
        bottom: 90px;
        left: 0;
        width: 100%;
    }
 }
</style>