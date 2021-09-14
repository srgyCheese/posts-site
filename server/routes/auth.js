const {Router} = require('express')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

const router = Router()

router.post('/', async (req, res) => {
    try {
        if (!req.body.login) {
            return res.status(400).json({error: 'Введите логин'})
        }

        const [user, created] = await User.findOrCreate({ where: { login: req.body.login } })

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_LIFETIME}
        )

        return res.json({token})
    } catch (e) {
        res.status(500).send({error: e})
    }
})

module.exports = router