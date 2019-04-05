const express = require('express')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')

const app = express()

/* Body Parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Get All Comment */
app.get('/comment', async (req, res) => {
    
})

/* Get One Comment */
app.get('/comment/:id', async (req, res) => {
    
})

/* Create Comment */
app.post('/comment', async (req, res) => {
    
})

module.exports.index = serverless(app)