const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
)

// Models
const User = require('./models/User')(sequelize, Sequelize)
const Post = require('./models/Post')(sequelize, Sequelize)
const Comment = require('./models/Comment')(sequelize, Sequelize)

let connection= {}
let Models = {
    User, 
    Post,
    Comment
}

/**
 * Creating Associations
 */
Object.keys(Models).forEach(function(modelName) {
    if (Models[modelName].associate) {
      Models[modelName].associate(Models);
    }
})

module.exports = async () => {
    if(connection.isConnected){
        console.log("use existing connection")
        return Models
    } 

    try {
        // await sequelize.sync()
        await sequelize.authenticate()
        connection.isConnected = true
        console.log("use new connection")
        
        return Models
    } catch (error) {
        console.log(`Connection Error: ${error}`)
    }
}

