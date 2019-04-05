const express = require('express')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')

const app = express()

/* Body Parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Get All Post */
app.get('/post', async (req, res) => {
    
})

/* Get One Post */
app.get('/post/:id', async (req, res) => {
    
})

/* Create Post */
app.post('/post', async (req, res) => {
    
})

module.exports.index = serverless(app)