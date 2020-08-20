module.exports = options => {
    const jwt = require('jsonwebtoken')     // 需要安装一个jsonwebtoken模块
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async (req, res, next) => {
        
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const {id} = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')       
        req.user = await AdminUser.findById(id)     //为了后续能继续使用，可以挂载到req上，不用const
        assert(req.user, 401, '请先登录')

        await next()
        
    }
}