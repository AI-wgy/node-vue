module.exports = app => {
    const express = require('express')
    //定义子路由，用于各种增删改查，并且绑定在app.use上
    const router = express.Router()

    const Category = require('../../models/Category')

    //保存创建分类接口
    router.post('/categories', async (req, res) => {
       //创建数据，数据来源是客户端提供过来的数据
       //body是数据来源
       //async 和 await 要想使用必须在index.js 加上一个中间件
       const model = await Category.create(req.body)
       //发送信息回客户端
       res.send(model)
    })
    
    //保存编辑分类接口
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除分类接口
    router.delete('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //分类列表
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        res.send(items)
    })

    //获取详情页，某一个详情数据分类的接口
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api',router)
}


//回到前端发起这个页面请求，在CategoryEdit.vue 的methods中