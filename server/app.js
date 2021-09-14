require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./models/db')

const app = express()
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

app.use('/api/login', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))

app.post('/upload-image', (req, res) => {
    try {
        if(!req.files?.image) {
            res.status(400).send({
                error: true,
                message: 'No file uploaded'
            })
        } else {
            const {image} = req.files
            const name = Date.now() + path.extname(image.name)

            image.mv('./uploads/' + name)

            return res.json({
                data: {
                    url: process.env.SERVER_URL + '/uploads/' + name
                }
            })
        }
    } catch (e) {
        res.status(500).send({error: e})
    }

})

const start = async () => {
    try {
        await sequelize.authenticate()
    } catch (e) {
        console.log('Ошибка подключения к БД: ', e)
    }

    await sequelize.sync()

    app.listen(process.env.PORT, () => console.log(`App listening at port ${process.env.PORT}`))
}

start()
