const express = require('express')
const dbConn = require('../dbConn')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')

const app = express()

/* Body Parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Get All Users */
app.get('/user', async (req, res) => {
    const { User, Post, Comment } = await dbConn()

    let query = {
        limit: 10,
        include: [{
            as: 'posts',
            model: Post
        }, {
            as: 'comments',
            model: Comment
        }]
    }

    try {
        let response = await User.findAndCountAll(query)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

/* Get One User */
app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const { User, Post, Comment } = await dbConn()

    let query = {
        where: { id },
        include: [{
            as: 'posts',
            model: Post
        }, {
            as: 'comments',
            model: Comment
        }]
    }

    try {
        let response = await User.findAndCountAll(query)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

/* Create User */
app.post('/user', async (req, res) => {
    const { User } = await dbConn()

    try {
        let response = await User.create(req.body)
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports.index = serverless(app)