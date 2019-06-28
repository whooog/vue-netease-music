import Vue from 'vue'
import Router from 'vue-router'

import Discover from '../views/findMusic/Index.vue'
import Playlist from '../views/findMusic/Playlist.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'discover',
            component:Discover
        },
        {
            path: '/playlist/:id',
            name:'playlist',
            component:Playlist,
            props:true
        }
    ]
})