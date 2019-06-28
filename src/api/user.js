import request from '@/common/request'
// 手机登录
export const login = (data) => request.get('/login/cellphone', {
    params: {
        phone: data.phone,
        password: data.password
    }
})

// 登陆状态
export const getStatus = () => request.get('/login/status').then(res => {
    return {
        id: res.data.profile.userId,
        name: res.data.profile.nickname,
        avatarUrl: res.data.profile.avatarUrl,
        birthday: new Date(Number(res.data.profile.birthday)).toLocaleDateString()
    }
})


