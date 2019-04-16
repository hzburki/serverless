const express = require('express')
const dbConn = require('../dbConn')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')

const app = express()

/* Body Parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Get All Post */
app.get('/post', async (req, res) => {
    const { User, Post, Comment } = await dbConn()

    let query = {
        limit: 10,
        include: [{
            as: 'user',
            model: User
        }, {
            as: 'comments',
            model: Comment
        }]
    }

    try {
        let response = await Post.findAndCountAll(query)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

/* Get One Post */
app.get('/post/:id', async (req, res) => {
    const { id } = req.params
    const { User, Post, Comment } = await dbConn()

    let query = {
        where: { id },
        include: [{
            as: 'user',
            model: User
        }, {
            as: 'comments',
            model: Comment
        }]
    }

    try {
        let response = await Post.findAndCountAll(query)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

/* Create Post */
app.post('/post', async (req, res) => {
    const { Post } = await dbConn()

    try {
        let response = await Post.create(req.body)
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports.index = serverless(app, {
    request: function (_, _, context) {
        context.callbackWaitsForEmptyEventLoop = false;
    },
})