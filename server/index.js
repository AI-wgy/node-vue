const express = require("express")

const app = express()

//async和await的中间件
app.use(express.json())
//跨域模块一起引进来
app.use(require('cors')())

require('./plugins/db/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})