const {Router} = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const {Post, User} = require('../models')

const router = Router()

router.post('/', authMiddleware, async (req, res) => {
    try {
        const {title, content} = req.body
        const {user} = req

        if (!title || !content) {
            return res.status(400).json({error: 'Не введены обязательные поля'})
        }

        const candidate = await Post.findOne({where: {title}})

        if (candidate) {
            return res.json({error: 'Запись с таким заголовком уже существует'})
        }

        const post = await Post.create({
            title,
            content,
            userId: user.id,
            date: Date.now()
        })

        return res.json({message: 'Запись создана'})
    } catch (e) {
        res.status(500).send({error: e})
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({include: User})

        return res.json({posts})
    } catch (e) {
        res.status(500).send({error: e})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params

        const post = await Post.findOne({where: {id}, include: User})

        if (!post) {
            return res.json({error: 'Записи не существует'})
        }

        return res.json({post})
    } catch (e) {
        res.status(500).send({error: e})
    }
})

module.exports = router