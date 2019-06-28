<template>
    <div id="recommend">
        <el-carousel :interval="4000" type="card" height="220px">
            <el-carousel-item v-for="item in images" :key="item">
               <el-image :src="item" style="width: 100%;height: 100%;"></el-image>
            </el-carousel-item>
        </el-carousel>

        <div class="songList">
            <span class="title">{{static.title}}</span>
            <span class="more">{{static.more}}</span>
        </div>

        <el-row :gutter="20">
            <el-col :xs="6" :sm="6" :lg="6" :xl="4" :key="item.id" v-for="item in playlist" class="items">
                <router-link :to="'/playlist/' + item.id">
                    <el-card :body-style="{ padding: '0px'}">
                        <img :src="item.picUrl" class="image">
                        <div style="padding: 10px;font-size: 15px;line-height: 23px;min-height: 45px;">
                            <span>{{item.name}}</span>
                        </div>
                    </el-card>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getPlaylist } from "../../api";

    export default {
        name: "Recommend",
        data(){
            return{
                images: [
                    "http://p1.music.126.net/T3ZjY4zoXQy5JGUBzAgnCw==/109951164130090245.jpg",
                    "http://p1.music.126.net/FZ3Bk_AR1aNmMvOWfN08bQ==/109951164128635962.jpg",
                    "http://p1.music.126.net/GLYHEyF62pIWouDonitm3g==/109951164128249082.jpg",
                    "http://p1.music.126.net/MXZqdfks3q8S-7ohc8k5-Q==/109951164128249182.jpg",
                    "http://p1.music.126.net/rKtRT78q7CO9VOKZ7rHWgQ==/109951164128237555.jpg"
                ],
                static:{
                    title:'推荐歌单',
                    more:"更多>"
                },
                limit:99,
                playlist:[]
            }
        },
        methods:{
            init(){
                getPlaylist().then(response => {
                    this.playlist = response.data.result.slice(0,this.limit).map(item => {
                        return{
                            id:item.id,
                            name:item.name,
                            copywriter:item.copywriter,
                            picUrl:item.picUrl

                        }
                    })
                    // console.log(this.plalist)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        created(){
            this.init();
        }
    }
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .songList {
        line-height: 45px;
        border-bottom: 1px solid #e6e6e6;
        .title {
            font-size: 18px;
        }
        .more {
            float: right;
            font-size: 14px;
        }
    }

    .items{
        height: 320px;
        margin-top: 50px;
    }
    .image {
        width: 100%;
        display: block;
    }
</style>