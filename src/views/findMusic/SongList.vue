<template>
    <div id="songList">
        <el-table
                style="width: 99.9%;cursor: pointer"
                :header-row-style="tableStyle.rowStyle"
                :header-cell-style="tableStyle.cellStyle"
                :row-style="tableStyle.rowStyle"
                :cell-style="tableStyle.cellStyle"
                :data="musics"
                stripe
                highlight-current-row
                @row-dblclick="playMusic">

            <el-table-column
                    label=" "
                    type="index"
                    width="60px"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作"
                    width="80px"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button type="text">
                        <i class="fa fa-heart-o" style="color: #ccc;"></i>
                    </el-button>
                    <el-button type="text">
                        <i class="fa fa-download" style="color: #ccc;"></i>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="音乐标题"
                    prop="name"
                    sortable/>
            <el-table-column
                    prop="artists"
                    label="歌手"
                    sortable/>
            <el-table-column
                    prop="album.name"
                    label="专辑"
                    sortable/>
            <el-table-column
                    prop="time"
                    label="时长"
                    width="150px"
            />

        </el-table>
    </div>
</template>

<script>
    import { getSongDetailed } from '@/api'

    export default {
        name: "songList",
        data() {
            return {
                musics: [
                    // {
                    //     id: 0,
                    //     name: '',
                    //     artists: {},
                    //     album: {
                    //         name: ''
                    //     },
                    //     time: '',
                    //     picUrl:''
                    //
                    // }
                ],
                tableStyle:{
                    rowStyle:{
                        height:0
                    },
                    cellStyle:{
                        padding:0
                    }
                }
            }
        },
        watch:{
            ids(){
                this.init()
            }
        },
        props: {
            ids: String
        },
        methods: {
            artists(artists) {
                return artists.map(item => item.name).join()
            },
            convertTime(millisecond) {
                if (null == millisecond) {
                    return null;
                }

                let second = Math.floor(millisecond / 1000);

                // 时:分:秒

                // 时: >= 60 * 60 * 60
                // 分: >= 60 * 60            分 = second 320 / 60

                let result;
                if (second > 59) {
                    let minute = Math.floor(second / 60);
                    let number = second % 60;

                    let mstr = minute < 10 ? '0' + minute : minute;
                    let sstr = number < 10 ? '0' + number : number;

                    result = mstr + ":" + sstr;
                } else {
                    result = '00:' + (second < 10 ? '0' + second : second);
                }
                return result;
            },
            init(){
                getSongDetailed(this.ids).then(response => {

                    this.musics = response.data.songs.map(item => {
                        return {
                            id:item.id,
                            name:item.name,
                            artists:item.ar.map(item => item.name).join('/'),
                            album: {
                                name:item.al.name
                            },
                            time: this.convertTime(item.dt),
                            picUrl:item.al.picUrl
                        }
                    })
                }).catch(error =>{
                    console.log(error);
                })
            },
            playMusic(row){
                this.$store.dispatch('play',{
                    id:row.id,
                    title:row.name,
                    artist:row.artists,
                    pic:row.picUrl
                })
            }
        },
        created() {
            if(null === this.ids || '' === this.ids){
                return
            }
            this.init();
        }

    }
</script>

<style lang="scss">

    #songList .el-tabs__nav-wrap::after {
        background-color: transparent;
    }

    #songList .el-tabs__nav {
        transform: translateX(60px);
    }
</style>
