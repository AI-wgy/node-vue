const mongoose = require('mongoose')
//定义一些模型的字段
const schema = new mongoose.Schema({

    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],         //文章分类
    title: { type: String },         //文章标题
    body: { type: String }          //内容区

},{
    timestamps: true
})

module.exports = mongoose.model('Article',schema)
