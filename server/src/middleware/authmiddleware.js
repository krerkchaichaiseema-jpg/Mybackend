const jwt = require('jsonwebtoken')
require('dotenv').config()

const userprotect = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'กรุณา login'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'token ไม่ถูกต้องหรือหมดอายุ'
        })
    }
}

module.exports = userprotect