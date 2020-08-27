import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // 接口需要根据开发和编译进行替换，VUE-APP有一种方法就是在编译的时候可以添加一些变量/环境
    // 必须以VUE_APP开头API_URL自定义名字
    //生产环境第一步
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    // baseURL:'http://localhost:3000/admin/api'

    // 第二步添加一个环境变量文件
})

//查授权信息
http.interceptors.request.use(function(config) {
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(res =>{
    return res
}, err => {
    // console.log(err.response.data.message)
    //返回给客户端的一个信息，提示错误信息
    //通用的一个错误处理
    if(err.response.data.message){
        Vue.prototype.$message({
            type: 'error' ,
            message: err.response.data.message
        })
        if(err.response.status === 401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http
