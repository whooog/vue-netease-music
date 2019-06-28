import { getStatus } from '@/api/user'
import {ACTION_GET_USER_STATUS, ACTION_SET_USER, MUTATIONS_SET_USER} from "./types";

export default {
    //存储状态(变量)
    state:{
        id: -1,
        name:'未登录',
        avatarUrl: 'http://resource.talei.me/music/anonmouse.svg%E7%94%A8%E6%88%B7.svg',
        birthday:''
    },

    // 修改状态
    mutations:{
        [MUTATIONS_SET_USER](state, user = {}) {
            const {
                id,
                name,
                avatarUrl,
                birthday
            } = user

            state.id = id
            state.name = name
            state.avatarUrl = avatarUrl
            state.birthday = birthday

        }
    },

    // 异步操作
    actions:{
        /**
         * 在app初始化时获取用户登陆状态,如果登陆了则会获取到用户的基本信息
         * @param commit
         * @returns {Promise<void>}
         */
        async [ACTION_GET_USER_STATUS] ({commit}) {
            const res = await getStatus()
            commit(MUTATIONS_SET_USER,res)
        },
        /**
         * 在用户登录成功后存储用户的基本信息
         * @param commit
         * @param user
         */
        [ACTION_SET_USER] ({commit}, user) {
            commit(MUTATIONS_SET_USER,user)
        }
    },

    // 对数据获取之前的再次编译，类似于计算属性
    getters:{
        enumActive(state) {
            return state.id !== -1
        }
    }

}