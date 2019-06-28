<template>
    <el-scrollbar wrap-class="list" wrap-style="overflow-x: hidden;" view-class="view-box" :native="false" style=" min-width: 260px;border-right: solid 1px #e6e6e6;">
        <el-aside width="260px">
            <el-col :span="24">
                <el-menu
                        :default-active="enumActive"
                        router
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                >
                    <el-menu-item-group>
                        <template slot="title">推荐</template>
                        <el-menu-item index="/">
                            <i class="el-icon-setting"></i>
                            <span slot="title">发现音乐</span>
                        </el-menu-item>
                        <el-menu-item index="/b">
                            <i class="el-icon-setting"></i>
                            <span slot="title">私人FM</span>
                        </el-menu-item>
                        <el-menu-item index="/c">
                            <i class="el-icon-setting"></i>
                            <span slot="title">视频</span>
                        </el-menu-item>
                        <el-menu-item index="/d">
                            <i class="el-icon-setting"></i>
                            <span slot="title">朋友</span>
                        </el-menu-item>
                    </el-menu-item-group>

                    <el-menu-item-group>
                        <template slot="title">我的音乐</template>
                        <el-menu-item index="/e">
                            <i class="el-icon-setting"></i>
                            <span slot="title">本地音乐</span>
                        </el-menu-item>
                        <el-menu-item index="/f">
                            <i class="el-icon-setting"></i>
                            <span slot="title">下载管理</span>
                        </el-menu-item>
                        <el-menu-item index="/g">
                            <i class="el-icon-setting"></i>
                            <span slot="title">我的音乐盘</span>
                        </el-menu-item>
                        <el-menu-item index="/h">
                            <i class="el-icon-setting"></i>
                            <span slot="title">我的收藏</span>
                        </el-menu-item>
                    </el-menu-item-group>


                    <el-submenu index="1-4" class="el-menu-vertical-demo">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>创建的歌单</span>
                        </template>
                        <el-menu-item index="1-4-1" :key="item.id" v-for="item in my">
                            <i class="el-icon-setting"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="1-5">
                        <i class="el-menu-vertical-demo"></i>
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>收藏的歌单</span>
                        </template>
                        <el-menu-item index="1-4-1" :key="item.id" v-for="item in collects">
                            <i class="el-icon-setting"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-aside>
    </el-scrollbar>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {getUserPlaylist} from "../api";

    export default {
        name: "Sidebar",
        data() {
            return {
                my: [],
                collects: [],
                enumActive:'/'
            }
        },
        computed: {
            ...mapState({
                id: state => state.user.id
            }),
            ...mapGetters(['active'])
        },
        watch: {
            id() {
                this.init()
            },
            enumActive(val){
                console.log('active:' + val);
            }
        },
        methods: {
            init() {
                if(-1 === this.id){
                    return;
                }
                getUserPlaylist(this.id).then(response => {
                    const filter = (item) => {
                        {
                            item.name = this.filterName(item.name)
                            return item;
                        }
                    }

                    this.my = response.data.playlist.filter(item => item.userId === this.id).map(filter)
                    this.collects = response.data.playlist.filter(item => item.userId !== this.id).map(filter)
                }).catch(error => {
                    console.log(error)
                })
            },
            filterName(name) {
                /*
                * 中文：24个字符，一个中文算2个
                * 英文：12个字符，一个英文算1个
                * */
                let len = 0;
                for (var i = 0; i < name.length; i++) {
                    if (name.charCodeAt(i) < 127) {
                        len++;
                    } else {
                        len += 2;
                    }
                }
                if (len > 24) {
                    name = name.substring(0, 11) + '...';
                }

                return name;
            },
            handleOpen() {
            },
            handleClose() {
            }
        },
        created() {
            this.init();
        }
    }
</script>
<style lang="scss">
    .el-menu {
        border-right: none !important;
    }

    .el-menu-item-group__title {
        padding: 16px 0 16px 20px !important;
        font-size: 14px !important;
    }
</style>

<style scoped>
    .el-aside {
        background-color: #fff;
        color: #333;
        line-height: 200px;
        overflow-x: hidden;
    }
</style>