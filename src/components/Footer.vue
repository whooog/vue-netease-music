<template>
    <el-footer style="height: auto;padding:0;">
        <Aplayer
                showLrc
                ref="aplayer"
                repeat="list"
                :music="music"
                :list="queue"

        />
    </el-footer>
</template>

<script>
    import Aplayer from 'm-vue-aplayer'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "Footer",
        components: {
            Aplayer
        },
        computed: {
            ...mapState({
                music: state => state.music.current,
                queue: state => state.music.queue
            })
        },
        watch: {
            music() {
                setTimeout(() => {
                    this.$refs.aplayer.play();
                }, 100)
            }
        }
    }
</script>

<style lang="scss">
    .el-footer {
        z-index: 9;
        position: absolute;
        display: flex;
        left: 0;
        bottom: 0;
        width: 100%;
        line-height: 60px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .aplayer-list {
        box-shadow: rgb(204, 204, 204) 0px -2px 4px 1px;
    }
    .aplayer {
        width: 100%;
        height: 100%;

        .aplayer-pic .aplayer-pause {
            top: 21px;
            right: 0;
            left: 0;
            margin: 0 auto;
        }
    }
</style>
