import request from '@/common/request'

/**
 * 获取用户歌单
 */
export const getUserPlaylist = (uid) => request.get('/user/playlist', {
    params: {
        uid: uid
    }
})

/**
 * 获取推荐歌单
 */
export const getPlaylist = () => request.get('/personalized')

/**
 *
 * 获取歌单详情
 *
 */
export const getPlayListDetailed = (id) => request.get('/playlist/detail', {
    params: {
        id: id
    }
})

/**
 * 获取歌曲详情
 */
export const getSongDetailed = (ids) => request.get('/song/detail', {
    params: {
        ids: ids
    }
})

/*
* 获取歌词
*/
export const getLyric = (id) => request.get('/lyric', {
    params: {
        id: id
    }
}).then(response => {
    return response.data.lrc.lyric
}).catch(error => {
    console.log(error)
})
