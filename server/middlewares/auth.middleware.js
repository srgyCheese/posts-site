const jwt = require('jsonwebtoken')
const {User} = require('../models')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(403).json({error: "Пользователь не авторизован"})
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findOne({where: {id: decodedData.id}})

        if (!next) {
            return
        }

        next()
    } catch (e) {
        return res.status(403).json({error: "Пользователь не авторизован"})
    }
}

module.exports = authMiddleware