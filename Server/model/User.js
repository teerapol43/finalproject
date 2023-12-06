const mongoose = require('mongoose')

const uesrSchema = mongoose.Schema({
    username: String,
    password: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('users', uesrSchema)