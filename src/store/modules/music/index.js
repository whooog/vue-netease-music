
export default {
    state:{
        // 当前歌曲信息
        current:{
            id:-1,
            title:'',
            artist:'',
            pic:'',
            src:''
        },
        queue:[{
            id:-1,
            title:'',
            artist:'',
            pic:'',
            src:''
        }]
    },

    mutations:{
        play(state,value={}) {
            state.current = value;
        },
        addQueue(state,value={}){
            state.queue.push(value)
        }

    },

    actions:{
       async play({commit}, value) {
           value.src = 'https://music.163.com/song/media/outer/url?id={ID}.mp3'.replace('{ID}', value.id)
            commit('play',value)
            commit('addQuere',value)
        },

        addQueue({commit},value) {
           commit('addQueue',value)
        }
    },

    getters:{

    }
}