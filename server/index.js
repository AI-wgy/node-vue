const express = require("express")

const app = express()

//全局设置秘钥
app.set('secret','miyao')

//async和await的中间件
app.use(express.json())
//跨域模块一起引进来
app.use(require('cors')())

require('./plugins/db/db')(app)
require('./routes/admin')(app)

//托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(3000, () => {
    console.log('http://localhost:3000')
})