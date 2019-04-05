const express = require('express')
const dbConn = require('../dbConn')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')

const app = express()

/* Body Parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Get All Comment */
app.get('/comment', async (req, res) => {
    const { User, Post, Comment } = await dbConn()

    let query = {
        limit: 10,
        include: [{
            as: 'user',
            model: User
        }, {
            as: 'post',
            model: Post
        }]
    }

    try {
        let response = await Comment.findAndCountAll(query)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

/* Get One Comment */
app.get('/comment/:id', async (req, res) => {
    const { id } = req.params
    const { User, Post, Comment } = await dbConn()

    let query = {
        where: { id },
        include: [{
            as: 'user',
            model: User
        }, {
            as: 'post',
            model: Post
        }]
    }

    try {
        let response = await Comment.findAndCountAll(query)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

/* Create Comment */
app.post('/comment', async (req, res) => {
    const { Comment } = await dbConn()

    try {
        let response = await Comment.create(req.body)
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports.index = serverless(app)