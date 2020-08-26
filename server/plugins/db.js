//数据库插件的写法
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-master',{
        useNewUrlParser: true ,
        useUnifiedTopology: true
    })

    require('require-all')(__dirname + '/../models')
}
