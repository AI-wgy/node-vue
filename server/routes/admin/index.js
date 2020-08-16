module.exports = app => {
    const express = require('express')
    //定义子路由，用于各种增删改查，并且绑定在app.use上
    const router = express.Router()

    const Category = require('../../models/Category')

    //创建分类
    router.post('/categories', async (req, res) => {
       //创建数据，数据来源是客户端提供过来的数据
       //body是数据来源
       //async 和 await 要想使用必须在index.js 加上一个中间件
       const model = await Category.create(req.body)
       //发送信息回客户端
       res.send(model)
    })

    //分类列表
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        res.send(items)
    })

    app.use('/admin/api',router)
}


//回到前端发起这个页面请求，在CategoryEdit.vue 的methods中