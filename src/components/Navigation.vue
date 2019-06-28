<template>
    <el-header>
       <router-link to="/">
           <div class="logo-box">
               <el-image :src="static.logo" class="logo">
                   <div slot="placeholder" class="image-slot">
                       加载中<span class="dot">...</span>
                   </div>
               </el-image>
               <span class="logotit">{{static.title}}</span>
           </div>
       </router-link>

        <div class="search-box">
            <el-button type="text" @click="$router.go(-1)">
                <i class="el-icon-arrow-left"></i>
            </el-button>
            <el-button type="text" @click="$router.go(1)">
                <i class="el-icon-arrow-right"></i>
            </el-button>
            <div class="demo-input-size">
                <el-input
                        size="mini"
                        placeholder="搜索音乐，视频，歌词，电台"
                        suffix-icon="el-icon-search"
                        v-model="search">
                </el-input>
            </div>
        </div>

        <div class="land-box">
            <el-image :src="avatarUrl"></el-image>

            <el-popover
                    v-if="active"
                    placement="bottom"
                    width="250"
                    trigger="click"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-container>
                </el-container>
                    <el-button
                            slot="reference"
                            type="text"
                            @click="showDialog"
                    >
                        {{name}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
            </el-popover>


            <el-button
                    v-else
                    slot="reference"
                    type="text"
                    @click="showDialog"
            >
                {{name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dialog :visible.sync="loginForm.showLoginDialog"
                       :modal="false"
                       :close-on-click-modal="false"
                       width="15%"
            >
                <el-form :model="loginForm">
                        <el-input v-model="loginForm.phone" type="text" placeholder="请输入手机号码"></el-input>
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary"  @click="login()" style="width: 100%;">登 陆</el-button>
                    <el-button type="primary" @click="loginForm.showLoginDialog = false" style="width: 100%;margin: 0;">注 册</el-button>
                </div>
            </el-dialog>

            <i class="el-icon-user"></i>
            <i class="el-icon-message"></i>
            <i class="el-icon-setting"></i>
        </div>


    </el-header>
</template>

<script>
    import logo from '@/assets/music.svg'
    import { login } from '@/api/user'

    import { mapGetters, mapState } from 'vuex'
    import { ACTION_SET_USER } from "../store/modules/user/types";

    export default {
        name: "Navigation",
        data() {
           return{
               search:'',
               static:{
                   logo:logo,
                   title:"网易云音乐"
               },
               loginForm:{
                   showLoginDialog: false,
                   validPhone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                   phone:'',
                   password:''
               }
           }
        },
        computed:{
            ...mapState({
              id:state => state.user.id,
              name:state => state.user.name,
              avatarUrl:state => state.user.avatarUrl
            }),
            ...mapGetters(['active'])
        },
        methods:{
            login(){
                let phone = this.loginForm.phone.trim();
                let pwd = this.loginForm.password.trim();

                //使用正则匹配手机号码
                if(!this.loginForm.validPhone.test(phone)){
                    this.$message.warning('手机号码格式不正确，请重新输入。')
                    return;
                }

                // 判断密码格式
                if(null === pwd || 6 > pwd.length){
                    this.$message.warning('密码格式错误。')
                    return;
                }

                login({
                    phone:phone,
                    password:pwd
                }).then(response => {
                    this.$message.success('登陆成功'+ response.data.profile.nickname)
                    this.loginForm.phone=''
                    this.loginForm.password=''
                    this.loginForm.showLoginDialog= false

                    //存入vuex
                    this.$store.dispatch(ACTION_SET_USER, {
                        id:response.data.account.id,
                        name:response.data.profile.nickname,
                        avatarUrl:response.data.profile.avatarUrl,
                        birthday:response.data.profile.birthday
                    })
                }).catch(error => {
                    console.log(error)
                })

            },
            showDialog(){
                if (!this.active){
                    this.loginForm.showLoginDialog = true;
                }
            }
        }
    }
</script>
<style lang="scss">
    .logo {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        padding: 5px;
        background: #ffffff;
        border-radius: 50%;
        vertical-align: middle;
    }

   .search-box{
       .demo-input-size{
           display: inline-block;
           margin-left: 25px;
           width: 230px;
       }

       .el-input--mini .el-input__inner {
           height: 25px !important;
           line-height: 25px !important;
           border-radius: 15px;
           border:0;
       }
       .el-input__inner{
           background-color: #498DD4 !important;
       }
   }
</style>
<style lang="scss" scoped>
    .el-header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 60px;
        background-color: #5CB8FB;
        .logo-box{
            display: inline-block;
            line-height: 60px;
            height: 60px;
            overflow: hidden;
            margin-right: 105px;

            .logotit {
                color: #fff;
                font-size: 19px;
                vertical-align: middle;
                font-weight: 500;
                letter-spacing: .65px;
            }
        }
        .search-box{
            display: inline-block;
            line-height: 60px;
            height: 60px;
            overflow: hidden;
            .el-button--text{
                color: #ffffff;
                cursor: pointer;
            }

        }
        .land-box{
            display: inline-block;
            float: right;
            .el-image {
                border-radius: 50%;
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin-right: 10px;
            }
            .el-button--text {
                color: #fff;
                margin-right: 10px;
                font-size: 14px;
            }
            .el-icon-user, .el-icon-message, .el-icon-setting{
                color: #fff;
                margin:0px 10px;
                font-size: 19px;
            }
        }
    }
</style>