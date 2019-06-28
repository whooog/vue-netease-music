<template>
    <div id="playlist" style="margin: 30px 0px;">
        <el-row style="min-width: 750px;" class="row">
            <div class="songList-logo">
                <el-image :src="detail.picUrl" ></el-image>
            </div>
            <div class="detail">
                <div class="title">
                    <span>歌单</span>
                    {{detail.name}}
                </div>

                <div class="user">
                    <el-image :src="detail.user.picUrl" class="userLogo"></el-image>
                    {{detail.user.name}}
                    <span>{{detail.creatTime}} 创建</span>
                </div>

                <div class="btn">
                    <el-button size="mini" type="primary">播放全部</el-button>
                    <el-button size="mini">收藏({{ detail.collectCount }})</el-button>
                    <el-button size="mini">分享({{ detail.shareCount }})</el-button>
                    <el-button size="mini">下载全部</el-button>
                </div>

                <div class="label">
                    标签：<span v-for="(item, index) in detail.tags">
                        <el-button type="text" class="tag">{{item}}</el-button>
                        <span v-if="index !== detail.tags.length - 1">
                            /
                        </span>
                    </span>
                </div>

                <div class="pres">
                   简介：<p v-html="detail.desc" style="display: inline;"></p>
                </div>
            </div>
        </el-row>

        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 40px">
            <el-tab-pane label="歌曲列表" name="first">
                <ISongList :ids="detail.music.ids"></ISongList>
            </el-tab-pane>
            <el-tab-pane label="评论" name="second">评论</el-tab-pane>
            <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane></el-tabs>
    </div>
</template>

<script>
    import SongList from './SongList.vue'
    import {getPlayListDetailed} from "@/api";

    export default {
        name: "playList",
        components:{
            ISongList:SongList
        },
        data(){
            return{
                detail:{
                    id:0,
                    picUrl:'',
                    name:'',
                    tags:[],
                    desc:'',
                    collectCount:0,
                    shareCount:0,
                    playCount:0,
                    songCount:0,
                    creatTime:0,
                    user:{
                        id:0,
                        picUrl:'',
                        name:''
                    },
                    music:{
                        ids: ''
                    }
                },
                activeName:'first'
            }
        },
        props:{
            id:String
        },
        computed:{
        },
        methods:{
            creatTime(time){
                return new Date(time).toLocaleDateString().replace(/\//g, '-');
            },
            handleClick(){},
            init() {
                getPlayListDetailed(this.id).then(response => {
                    this.detail = {
                        id:response.data.playlist.id,
                        picUrl:response.data.playlist.coverImgUrl,
                        tags:response.data.playlist.tags,
                        name:response.data.playlist.name,
                        desc:response.data.playlist.description,
                        collectCount:response.data.playlist.subscribedCount,
                        shareCount:response.data.playlist.shareCount,
                        creatTime:this.creatTime(response.data.playlist.createTime),
                        user:{
                            id:response.data.playlist.creator.userId,
                            picUrl:response.data.playlist.creator.avatarUrl,
                            name:response.data.playlist.creator.nickname
                        },
                        music:{
                            ids:response.data.playlist.trackIds.map(item => item.id).join()
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style lang="scss">
    #playlist {

    }
    .songList-logo {
        width: 200px;
        height: 200px;
        border: 1px solid #ccc;
        display: inline-block;
        margin-right: 30px;
        vertical-align: top;
    }
    .row{
        margin: 0px 30px;
    }
    .detail {
        display: inline-block;
        width: calc(100% - 250px);

        .title {
            font-size: 22px;
            font-weight: 500;
            line-height: 40px;
            span {
                color: red;
                border: 1px solid;
                padding: 0 5px;
                font-size: 14px;
                vertical-align: top;
            }
        }
        .user {
            line-height: 50px;
            .userLogo {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right:10px;
            }
            span{
                margin-left: 20px;
                font-size: 13px;
                color: #aba2a2;
            }
        }
        .btn{
            line-height: 50px;
        }
        .label{
            line-height: 30px;
            margin-top: 10px;
            font-size: 15px;
            tag{
                color: deepskyblue;
            }
        }
        .pres{
            font-size: 15px;
        }
    }
    #playlist .el-tabs__nav-wrap::after {
        background-color: transparent;
    }
    #playlist .el-tabs__nav {
        transform: translateX(60px) !important;
    }
</style>