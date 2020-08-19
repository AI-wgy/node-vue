const mongoose = require('mongoose')
//定义一些模型的字段
const schema = new mongoose.Schema({

    name: { type: String },
    items: [{
        image: { type: String },
        url: { type: String } 
    }]      

})

module.exports = mongoose.model('Ad',schema)
