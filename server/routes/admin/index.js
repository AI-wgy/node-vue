// module.exports = app => {
//     const express = require('express')
//     //定义子路由，用于各种增删改查，并且绑定在app.use上
//     const router = express.Router()

//     const Category = require('../../models/Category')

//     //保存创建分类接口
//     router.post('/categories', async (req, res) => {
//        //创建数据，数据来源是客户端提供过来的数据
//        //body是数据来源
//        //async 和 await 要想使用必须在index.js 加上一个中间件
//        const model = await Category.create(req.body)
//        //发送信息回客户端
//        res.send(model)
//     })
    
//     //保存编辑分类接口
//     router.put('/categories/:id', async (req, res) => {
//         const model = await Category.findByIdAndUpdate(req.params.id, req.body)
//         res.send(model)
//     })

//     //删除分类接口
//     router.delete('/categories/:id', async (req, res) => {
//         const model = await Category.findByIdAndDelete(req.params.id, req.body)
//         res.send({
//             success: true
//         })
//     })

//     //分类列表
//     router.get('/categories', async (req, res) => {
//         //populate表示关联取出什么东西，中间填一个字段，当数据库中又关联字段，想要查出这个字段就可以用populate
//         const items = await Category.find().populate('parent').limit(10)
//         res.send(items)
//     })

//     //获取详情页，某一个详情数据分类的接口
//     router.get('/categories/:id', async (req, res) => {
//         const model = await Category.findById(req.params.id)
//         res.send(model)
//     })

//     app.use('/admin/api',router)
// }


// //回到前端发起这个页面请求，在CategoryEdit.vue 的methods中




//下面是进行改进后的一个通用的SRUD接口
//
//
module.exports = app => {
    const express = require('express')
    //定义子路由，用于各种增删改查，并且绑定在app.use上
    const router = express.Router({
        mergeParams: true
        //合并url参数
    })


    //保存创建分类接口
    router.post('/', async (req, res) => {

       //创建数据，数据来源是客户端提供过来的数据
       //body是数据来源
       //async 和 await 要想使用必须在index.js 加上一个中间件
       const model = await req.Model.create(req.body)
       //发送信息回客户端
       res.send(model)
    })
    
    //保存编辑分类接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除分类接口
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //分类列表
    router.get('/', async (req, res) => {
        //parent这里同样也要修改，并不是每个地方都需要请求parent，所以应该有一个条件
        const queryOptions = {}
        if (req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)

        //populate表示关联取出什么东西，中间填一个字段，当数据库中又关联字段，想要查出这个字段就可以用populate
        // const items = await req.Model.find().populate('parent').limit(10)
        res.send(items)
    })

    //获取详情页，某一个详情数据分类的接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //定义一个叫resource的动态参数
    //增加一个中间件，在请求前面这一段的时候会先处理中间件，当里边有next（）方法时在处理后边的router
    app.use('/admin/api/rest/:resource',async (req, res, next) => {
        
        //下载npm i inflection 专门处理单复数的转换或者是一些单词的格式转换
        const modelName = require('inflection').classify(req.params.resource)

        //这里的resource拿过来之后变成了models里面一个小写的，但是模型都是大写开头，
        // 所以需要先把他转换成一个类名的形式，先在一开始的Router合并url参数，这里才能取到resource
        // const Model = require(`../../models/${req.params.resource}`)

        //小写复数形式转换成大写单数形式
        req.Model = require(`../../models/${modelName}`)

        next()
    },router)

    //获取上传的图片，因为express本身是获取不到上传图片的数据，需要创建一个中间件multer，专门用来处理上传数据的
    //npm i multer
    //dirname 表示当前文件所在的文件夹
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        //本身express没有req.file 但是添加了upload这个中间件之后就有了
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}
