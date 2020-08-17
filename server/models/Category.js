const mongoose = require('mongoose')
//定义一些模型的字段
const schema = new mongoose.Schema({
    name: { type: String },
    //添加父级分类字段，数据类型不能是String，虽然看着像是，但是这里必须使用特殊类型
    //mongoose.SchemaTypes.ObjectId 表示是数据库里的一个ObjectID
    //ref表示关联的哪一个数据类型，集合关联
    parent: { type: mongoose.SchemaTypes.ObjectId , ref: `Category`}
})

module.exports = mongoose.model('Category',schema)
