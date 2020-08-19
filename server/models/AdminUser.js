const mongoose = require('mongoose')
//定义一些模型的字段
const schema = new mongoose.Schema({

    username: { type: String },
    password: { 
        type: String , 

        //默认查询的时候不要带有这个密码数据
        select: false ,

        //npm i bcrypt 散列 保护用户信息
        set(val){
            return require('bcrypt').hashSync(val, 10)
            //hashSync(生成散列名，散列指数10-12)  指数越高越安全
        }
    },
    

})

module.exports = mongoose.model('AdminUser',schema)
